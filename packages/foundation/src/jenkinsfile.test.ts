import { readFileSync } from 'node:fs';

const jenkinsfile = readFileSync('Jenkinsfile', 'utf8');

describe('Jenkins GitHub release policy', () => {
  it('uses the shared App-token release helper', () => {
    expect(jenkinsfile).not.toContain('github' + '-pat');
    expect(jenkinsfile).not.toContain('GH_' + 'PAT');
    expect(jenkinsfile).not.toContain('gh release create');
    expect(jenkinsfile).toContain('createGithubReleaseIfMissing(');
    expect(jenkinsfile).toContain('tagName: env.TAG_NAME,');
    expect(jenkinsfile).toContain('title: "Release ${env.TAG_NAME}",');
    expect(jenkinsfile).toContain('generateNotes: true');
  });
});
