@Library('datepop-shared') _

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout()
        timeout(time: 60, unit: 'MINUTES')
    }

    environment {
        HUSKY = '0'
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
    }

    stages {
        stage('Validate Branch') {
            when {
                beforeAgent true
                anyOf {
                    branch 'develop'
                    branch 'main'
                    changeRequest()
                }
                expression { !isBranchIndexingBuild() }
            }
            stages {
                stage('Checkout') {
                    steps {
                        checkout scm
                    }
                }
                stage('Install & Build') {
                    steps {
                        sh '''
                            set -eu
                            yarn install
                            yarn token-transform
                            yarn token-build
                            yarn build
                        '''
                    }
                }
            }
        }

        stage('Staging Chromatic') {
            when {
                beforeAgent true
                expression {
                    def branchName = (env.BRANCH_NAME ?: '')
                        .replace('%2F', '/')
                        .replace('%2f', '/')

                    return branchName ==~ /^release\/.+$/
                }
                not { changeRequest() }
                expression { !isBranchIndexingBuild() }
            }
            stages {
                stage('Checkout') {
                    steps {
                        checkout scm
                    }
                }
                stage('Install & Build') {
                    steps {
                        sh '''
                            set -eu
                            yarn install
                            yarn token-transform
                            yarn token-build
                            yarn build
                        '''
                    }
                }
                stage('Chromatic') {
                    steps {
                        withCredentials([string(credentialsId: 'chromatic-token', variable: 'CHROMATIC_PROJECT_TOKEN')]) {
                            sh '''
                                set -eu
                                npx chromatic \
                                    --project-token="$CHROMATIC_PROJECT_TOKEN" \
                                    --exit-zero-on-changes \
                                    || (echo "[chromatic] baseline not found in shallow history; fetching full history and retrying" \
                                        && (git fetch --unshallow || git fetch --depth=1000 origin) \
                                        && npx chromatic \
                                            --project-token="$CHROMATIC_PROJECT_TOKEN" \
                                            --exit-zero-on-changes)
                            '''
                        }
                    }
                }
            }
        }

        stage('Check Latest Tag') {
            when {
                beforeAgent true
                tag pattern: "v.*", comparator: "REGEXP"
                expression { !isBranchIndexingBuild() }
            }
            steps {
                checkLatestTagStep(repo: 'datepop/pop-ui')
            }
        }

        stage('Publish to NPM') {
            when {
                beforeAgent true
                allOf {
                    tag pattern: "v.*", comparator: "REGEXP"
                    expression { env.SHOULD_DEPLOY_PROD == 'true' }
                    expression { !isBranchIndexingBuild() }
                }
            }
            stages {
                stage('Checkout') {
                    steps {
                        checkout scm
                    }
                }
                stage('Validate Release Version') {
                    steps {
                        sh '''
                            set -eu
                            node <<'NODE'
const fs = require('fs');

const tagName = process.env.TAG_NAME || '';
if (!/^v\\d+\\.\\d+\\.\\d+(?:-[0-9A-Za-z.-]+)?$/.test(tagName)) {
  throw new Error(`TAG_NAME must be a semver tag like v1.2.3, got '${tagName}'`);
}

const releaseVersion = tagName.slice(1);
const packages = [
  { name: '@pop-ui/foundation', dir: 'packages/foundation', required: true },
  { name: '@pop-ui/core', dir: 'packages/core', required: true },
  { name: '@pop-ui/editor-core', dir: 'packages/editor-core', required: false },
  { name: '@pop-ui/editor', dir: 'packages/editor', required: false },
];

function readPackageJson(dir) {
  return JSON.parse(fs.readFileSync(`${dir}/package.json`, 'utf8'));
}

const publishRows = [];
for (const pkg of packages) {
  const manifest = readPackageJson(pkg.dir);

  if (manifest.name !== pkg.name) {
    throw new Error(`${pkg.dir}/package.json name mismatch: expected ${pkg.name}, got ${manifest.name}`);
  }

  if (pkg.required && manifest.version !== releaseVersion) {
    throw new Error(`${pkg.name} version must match ${tagName}: expected ${releaseVersion}, got ${manifest.version}`);
  }

  if (!pkg.required && manifest.version !== releaseVersion) {
    console.log(`[release] skip ${pkg.name}@${manifest.version}; tag ${tagName} targets ${releaseVersion}`);
    continue;
  }

  if (manifest.private) {
    console.log(`[release] skip private package ${pkg.name}`);
    continue;
  }

  publishRows.push(`${manifest.name}|${pkg.dir}|${manifest.version}`);
}

const core = readPackageJson('packages/core');
const foundationDependency = core.dependencies && core.dependencies['@pop-ui/foundation'];
if (foundationDependency && foundationDependency !== 'workspace:*' && foundationDependency !== releaseVersion) {
  throw new Error(`@pop-ui/core must depend on @pop-ui/foundation ${releaseVersion} or workspace:*, got ${foundationDependency}`);
}

const newline = String.fromCharCode(10);
fs.writeFileSync('publish-plan.txt', publishRows.length ? `${publishRows.join(newline)}${newline}` : '');
console.log(`[release] publish candidates: ${publishRows.length ? publishRows.join(', ') : 'none'}`);
NODE
                        '''
                    }
                }
                stage('Install & Build') {
                    steps {
                        sh '''
                            set -eu
                            yarn install
                            yarn token-transform
                            yarn token-build
                            yarn build
                        '''
                    }
                }
                stage('Publish Packages') {
                    steps {
                        withCredentials([string(credentialsId: 'npm-token', variable: 'NPM_TOKEN')]) {
                            sh '''
                                set -eu

                                if [ ! -s publish-plan.txt ]; then
                                    echo '[publish] no package matched this release tag'
                                    exit 0
                                fi

                                while IFS='|' read -r PKG_NAME PKG_DIR PKG_VERSION; do
                                    if npm view "${PKG_NAME}@${PKG_VERSION}" version >/dev/null 2>&1; then
                                        echo "[publish] skip ${PKG_NAME}@${PKG_VERSION}; already published"
                                        continue
                                    fi

                                    echo "[publish] publishing ${PKG_NAME}@${PKG_VERSION}"
                                    (cd "${PKG_DIR}" && YARN_NPM_AUTH_TOKEN="${NPM_TOKEN}" yarn npm publish --access public)
                                done < publish-plan.txt
                            '''
                        }
                    }
                }
                stage('Create GitHub Release') {
                    steps {
                        withCredentials([string(credentialsId: 'github-pat', variable: 'GH_PAT')]) {
                            sh '''
                                set -eu
                                export GH_TOKEN="$GH_PAT"
                                gh release create "$TAG_NAME" \
                                    --title "Release $TAG_NAME" \
                                    --generate-notes \
                                    || echo "[release] GitHub release already exists or could not be created"
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
