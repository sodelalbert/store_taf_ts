# store_taf_ts

This repository contains automated tests for the Demo Web Shop application using Playwright and TypeScript.

## Configuration

Create a `.env` file in the root directory of the project based on `.env.sample` file and set the following environment variables:

```env
BASE_URL=https://demowebshop.tricentis.com/
HEADLESS=true
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

Failed test cases will contain screenshots,trace files and video recordings for further analysis.
