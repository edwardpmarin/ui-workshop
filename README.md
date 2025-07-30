# ui-workshop
Learning UI atuomation


Run tests:
$ npx playwright test

Run test using UI
$ npx playwright test --ui

Run specify test:
$ npx playwright test tests/swag-lagbs/purchase-flow.spec.ts 

Show report:
$ npx playwright show-report

Environment:
$ ENV=dev npx playwright test tests/swag-lagbs/purchase-flow.spec.ts
ENV=dev npx playwright test tests/swag-lagbs/loginUsingFixture.spec.ts


To run only one app in a specific environment
$ ENV=dev npm run test:swag-labs

Using nx:
npm run test:swag-labs:dev
npm run test:herokuapp:dev