# Lerna / Vite / Storybook - Monorepo

This is a monorepo template for a project using Lerna, Vite and Storybook.

## Getting Started

### Install dependencies

```bash
yarn install
```

### Run Storybook

```bash
yarn start:core
```

### Run tests

```bash
yarn test
```

### Run lint

```bash
yarn lint
```

### Release packages

`@pop-ui/core`와 `@pop-ui/foundation`은 같은 버전으로 배포합니다(changeset `linked`로 잠금).

버전은 [changesets](https://github.com/changesets/changesets)로 관리합니다. `package.json` 버전을 수동 편집하지 마세요.

1. 변경을 담은 PR에서 `yarn changeset`을 실행해 changeset을 추가합니다(bump 종류·설명 입력). 두 패키지는 `linked`라 한쪽만 골라도 같이 올라갑니다.
2. `release/*` 브랜치에서 `yarn version-packages`(= `changeset version`)로 `package.json` 버전과 `CHANGELOG.md`를 일괄 갱신하고 커밋합니다.
3. `datepop-deploy/pop-ui/release/*`에서 Chromatic staging 검증을 통과시킵니다.
4. release 브랜치를 `main`에 머지합니다.
5. `main` 커밋에 `vX.Y.Z` 태그를 push하면 GitHub Actions(`.github/workflows/publish.yml`)가 npm에 아직 없는 패키지만 publish하고 GitHub Release를 만듭니다. 최신 태그가 아니면 건너뛰고, 태그가 `main` HEAD를 가리키지 않으면 실패합니다.

태그 버전은 두 패키지의 `package.json` 버전과 일치해야 합니다. 예: `v1.2.3` 태그를 push하려면 `@pop-ui/core`·`@pop-ui/foundation`이 모두 `1.2.3`이어야 하며, `version-packages`가 이를 맞춰줍니다.

npm 발행은 토큰 없이 [trusted publishing](https://docs.npmjs.com/trusted-publishers/)(OIDC)으로 합니다. npm의 패키지별 Settings → Trusted Publisher에 `datepop/pop-ui` 저장소의 `publish.yml`이 등록돼 있어야 하므로, workflow 파일 이름을 바꾸거나 발행 대상 패키지를 추가하면 npm 설정도 함께 바꿔야 합니다.
