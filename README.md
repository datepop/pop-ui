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

### Deploy major, minor version of package

main branch에 push되면 patch version이 하나씩 상승하며 배포됩니다. 다만, major와 minor version을 배포해야 하는 경우는 아래의 커맨드를 사용하여 로컬에서 배포합니다.

```bash
yarn lerna publish
```
