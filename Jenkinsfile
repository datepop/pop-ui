@Library('datepop-shared') _

def checkoutPopUi(Map args = [:]) {
    int depth = (args.depth ?: 1) as int
    String branchName = (env.BRANCH_NAME ?: '')
        .replace('%2F', '/')
        .replace('%2f', '/')
    String refspec
    String branchSpec

    if (env.CHANGE_ID?.trim()) {
        refspec = "+refs/pull/${env.CHANGE_ID}/merge:refs/remotes/origin/PR-${env.CHANGE_ID}"
        branchSpec = "refs/remotes/origin/PR-${env.CHANGE_ID}"
    } else if (branchName?.trim()) {
        refspec = "+refs/heads/${branchName}:refs/remotes/origin/${branchName}"
        branchSpec = "refs/remotes/origin/${branchName}"
    } else {
        error('Cannot determine git ref to checkout')
    }

    checkout([
        $class: 'GitSCM',
        branches: [[name: branchSpec]],
        extensions: [
            [$class: 'CloneOption', depth: depth, shallow: true, noTags: true, honorRefspec: true, timeout: 10],
            [$class: 'CheckoutOption', timeout: 10]
        ],
        userRemoteConfigs: [[
            url: 'https://github.com/datepop/pop-ui.git',
            credentialsId: 'github-app',
            refspec: refspec
        ]]
    ])
}

pipeline {
    agent { label 'jenkins-worker' }

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
                        script {
                            checkoutPopUi(depth: 1)
                        }
                    }
                }
                stage('Install & Build') {
                    steps {
                        sh '''
                            set -eu
                            yarn install
                            yarn token-transform
                            yarn token-build
                            yarn typecheck
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
                        script {
                            checkoutPopUi(depth: 50)
                        }
                    }
                }
                stage('Install & Build') {
                    steps {
                        sh '''
                            set -eu
                            yarn install
                            yarn token-transform
                            yarn token-build
                            yarn typecheck
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
    }

    post {
        always {
            cleanWs()
        }
    }
}
