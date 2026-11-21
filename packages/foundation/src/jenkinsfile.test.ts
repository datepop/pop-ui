import { readFileSync } from 'node:fs';

const jenkinsfile = readFileSync('Jenkinsfile', 'utf8');
const publishWorkflow = readFileSync('.github/workflows/publish.yml', 'utf8');

describe('GitHub Release ownership', () => {
  it('keeps release creation and personal access tokens out of Jenkins', () => {
    expect(jenkinsfile).not.toContain('github' + '-pat');
    expect(jenkinsfile).not.toContain('GH_' + 'PAT');
    expect(jenkinsfile).not.toContain('gh release create');
    expect(jenkinsfile).not.toContain('createGithubReleaseIfMissing(');
  });

  it('uses the workflow token and generates notes for a missing release', () => {
    const releaseStep = publishWorkflow.split('- name: Create GitHub Release')[1];
    expect(releaseStep).toContain('GH_TOKEN: ${{ github.token }}');
    expect(releaseStep).toMatch(
      /if gh release view "\$TAG_NAME"[^\n]*; then\b[\s\S]*?\belse\s+gh release create "\$TAG_NAME" --title "Release \$TAG_NAME" --generate-notes/,
    );
  });
});

describe('Jenkins agent policy', () => {
  it('runs on the shared worker without activating corepack globally', () => {
    expect(jenkinsfile).toContain("pipeline {\n    agent { label 'jenkins-worker' }");
    expect(jenkinsfile).not.toContain('agent any');
    expect(jenkinsfile).not.toContain('corepack enable');
  });
});
