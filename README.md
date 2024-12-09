# Widget Chrome Extension

custom new tab!

# Stack

- yarn 4.2.2
- React
- TypeScript
- Vite
- Emotion
- eslint
- prettier
- manifest-v3

# Dev

## Dependency

```bash
yarn install
```

## dev

```bash
yarn dev
```

- newtab: http://localhost:5173
- popup: http://localhost:5173/popup.html

## lint, prettier, tsc

```bash
yarn lint
yarn format
yarn tsc
```

### prettier only check

```bash
yarn format:check
```

### run all lint (`eslint`, `prettier`, `tsc`)

```bash
yarn check
```

## test

```bash
yarn test
```

### test: watch

```bash
yarn test:watch
```

### test: coverage

```bash
yarn test:coverage
```

## build

```bash
yarn build
```

### build with mode (lint, prettier, tsc)

```bash
yarn build:prod
```

```bash
yarn build:stage
```

## product publish

```bash
yarn build:prod
```

1. open [chrome://extensions/](chrome://extensions/)
2. `압축해제된 확장 프로그램을 로드합니다` 클릭
3. `dist` 폴더 선택
