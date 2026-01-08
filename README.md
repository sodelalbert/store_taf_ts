# store_taf_ts

This repository contains automated tests for the Demo Web Shop application using Playwright and TypeScript.

## Configuration

Create a `.env` file in the root directory of the project based on `sample/.env.sample` file and set the following environment variables:

```env
BASE_URL=https://demowebshop.tricentis.com/
HEADLESS=true
```

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Run Tests

To run the tests for the `store_taf_ts` package, you can use the following command:

```bash
npx playwright test
```

## Test Report

After executing the tests, you can view the test report by running the following command:

```bash
npx playwright show-report
```

## Static Code Analysis and Formatting

This project uses ESLint and Prettier for static code analysis and formatting. You can run the following commands to check and format the code:

```bash
npm run typecheck
npm run format
npm run lint
```

You can also run all checks at once using:

```bash
npm run check:all
```

Failed test cases will contain screenshots,trace files and video recordings for further analysis.
