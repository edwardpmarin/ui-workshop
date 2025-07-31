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


Jenkins:
Run docker compose
docker compose -f 'docker-compose.yml' up -d --build 
Open server:
cd /var/jenkins_home/secrets/
and get password
cat initialAdminPassword
1a8272d0c93b4cf19a42197825f74b21
Go to  http://localhost:8080 and put the password to access to jenkins
Install recomended plugins
Create First Admin User
User: ui-workshop
Pass: workshop
Define jenkins Url
http://localhost:8080/

Install nodesj and configure tool
install html reporter Plugin
