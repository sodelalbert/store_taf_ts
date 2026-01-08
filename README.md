# store_taf_ts

This repository contains automated tests for the Demo Web Shop application using Playwright and TypeScript.

## Configuration

Create a `.env` file in the root directory of the project based on `sample/.env.example` file and set the following environment variables:

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

## Github Actions CI/CD

This project is set up with a GitHub Actions workflow for continuous integration and continuous deployment (CI/CD). The workflow is defined in the `.github/workflows/ci.yml` file and is triggered on push and pull request events.

### Static Code Analysis and Formatting

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

### Test Execution

The GitHub Actions workflow installs the necessary dependencies, sets up the environment, and runs the Playwright tests. It also generates and uploads test reports and artifacts for failed tests.

Test Report Artifacts (HTML report with embeded screenshots and videos from failed tests) can be accessed from the Actions tab in the GitHub repository after the workflow completes.
