# Widget Chrome Extension

welcome custom new tab!

product: [chorestore](https://chromewebstore.google.com/detail/widget-chrome-extension/eopjfnfchlnfeaglcplmblfagdoghbpc)

**Table of Contents**

- [Preview](#preview)
  - [Main](#main)
  - [Widget](#widget)
    - [Add Widget](#add)
    - [Add Clock Widget](#add-clock-widget)
    - [Edit](#edit)
  - [Setting](#setting)
    - [Dark Mode](#dark-mode)
    - [I18n](#i18n)
- [Development](#development)
  - [Stack](#stack)
  - [Dev](#dev)
    - [Dependency](#dependency)
    - [Development Setup](#development-setup)
      - [Dev Script](#dev-script)
      - [Lint, Prettier, Tsc Scripts](#lint-prettier-tsc-scripts)
      - [Prettier Only Check Scripts](#prettier-only-check-scripts)
      - [Run All Lint Scripts](#run-all-lint-scripts)
      - [Test](#test)
        - [Test: Watch](#test-watch)
        - [Test: Coverage](#test-coverage)
      - [Build](#build)
        - [Build with Mode](#build-with-mode)
  - [Publish](#publish)

# Preview

- create custom widget
  - history
  - clock
  - google search and mail
- manage user bookmarks
- setting dark mode, i18n(ko, en)

## Main

<img src="https://github.com/user-attachments/assets/41b10df0-2e57-4548-a377-3c400a2e767b" alt="widget-chrome-extension-main" width="1280" border="1" />

### Add Widget

<img src="https://github.com/user-attachments/assets/1773c093-b1c4-42af-b21d-5660310c8ffd" alt="widget-chrome-extension-demo-add" width="1280" border="1" />

### Add Clock Widget

<img src="https://github.com/user-attachments/assets/ee770e57-d132-4cd1-8f4a-5723dad198ed" alt="widget-chrome-extension-demo-add-clock-widget" width="1280" border="1" />

### Edit

<img src="https://github.com/user-attachments/assets/f5f845d1-da25-4808-a66e-f13ade0abaae" alt="widget-chrome-extension-context-menu" width="1280" border="1" />

<img src="https://github.com/user-attachments/assets/76df5ffb-0a96-4598-838f-af288513e9be" alt="widget-chrome-extension-demo-edit" width="1280" border="1" />

## Setting

<img src="https://github.com/user-attachments/assets/ed7a830a-16ca-4ea5-a0c0-fc02b64339d2" alt="widget-chrome-extension-demo-setting" width="1280" border="1" />

### Dark Mode

<img src="https://github.com/user-attachments/assets/62f390b3-6bbf-487a-bddd-cc1f68b35268" alt="widget-chrome-extension-demo-dark-mode" width="1280" border="1" />

### I18n

<img src="https://github.com/user-attachments/assets/acd96531-360d-490d-98fe-c8ca5a4b4ddb" alt="widget-chrome-extension-demo-i18n" width="1280" border="1" />

# Development

## Stack

- yarn 4.2.2
- React
- Vite
- TypeScript
- Emotion
- shadcn/ui
- eslint
- prettier
- manifest-v3
- chrome API

## Development Setup

### Dependency

```bash
yarn install
```

### dev script

```bash
yarn dev
```

- newtab: http://localhost:5173
- popup: http://localhost:5173/popup.html

### lint, prettier, tsc scripts

```bash
yarn lint
yarn format
yarn tsc
```

### prettier only check scripts

```bash
yarn format:check
```

### run all lint scripts (`eslint`, `prettier`, `tsc`)

```bash
yarn check
```

### test

```bash
yarn test
```

#### test: watch

```bash
yarn test:watch
```

#### test: coverage

```bash
yarn test:coverage
```

### build

```bash
yarn build
```

#### build with mode (lint, prettier, tsc)

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
