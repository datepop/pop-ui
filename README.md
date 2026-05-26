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

`@pop-ui/core`와 `@pop-ui/foundation`은 같은 버전으로 배포합니다.

1. `release/*` 브랜치에서 두 패키지의 `package.json` 버전을 같은 값으로 올립니다.
2. `datepop-deploy/pop-ui/release/*`에서 Chromatic staging 검증을 통과시킵니다.
3. release 브랜치를 `main`에 머지합니다.
4. `main` 커밋에 `vX.Y.Z` 태그를 push하면 Jenkins가 npm에 아직 없는 패키지만 publish합니다.

예: `v1.2.3` 태그를 push하려면 `@pop-ui/core`와 `@pop-ui/foundation`의 버전도 모두 `1.2.3`이어야 합니다.
