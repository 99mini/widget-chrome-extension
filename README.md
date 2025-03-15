# Widget Chrome Extension

welcome custom new tab!

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

<img src="https://github.com/user-attachments/assets/9c44dee6-66c1-4402-a0e2-55935e8624d8" alt="widget-chrome-extension-main" width="1024" border="1" />

### Add Widget

<img src="https://github.com/user-attachments/assets/00cd8198-5390-456f-8159-705e6165e975" alt="widget-chrome-extension-demo-add" width="1024" border="1" />

### Add Clock Widget

<img src="https://github.com/user-attachments/assets/0f5e2081-8fb2-4c8d-aaa2-0bee42cba4f5" alt="widget-chrome-extension-demo-add-clock-widget" width="1024" border="1" />

### Edit

<img src="https://github.com/user-attachments/assets/6f9f73dc-b83a-4d35-a98e-7a6bf707c3c5" alt="widget-chrome-extension-demo-edit" width="1024" border="1" />

## Setting

<img src="https://github.com/user-attachments/assets/be233926-b3b1-4dd0-a79f-b2438c0fbe13" alt="widget-chrome-extension-demo-setting" width="1024" border="1" />

### Dark Mode

<img src="https://github.com/user-attachments/assets/e0bf31ae-cb75-4e82-ae5a-4a332ddf28ca" alt="widget-chrome-extension-demo-dark-mode" width="1024" border="1" />

### I18n

<img src="https://github.com/user-attachments/assets/d8e61b4b-022d-4e80-a55c-3c2dd7feb970" alt="widget-chrome-extension-demo-i18n" width="1024" border="1" />

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
