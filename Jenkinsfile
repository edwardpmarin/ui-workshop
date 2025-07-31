pipeline {
    agent any

    tools {
    nodejs 'node21'  // Same name in Global Tool Configuration
  }

    environment {
        ENV = "dev"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'git fetch origin main:origin/main' //Ensure we have the latest main branch
                // sh 'npx nx run swag-labs:e2e:dev'
                sh 'npx nx affected --target=e2e:dev --base=origin/main --head=HEAD'
                // nx affected --target=e2e --base=origin/main --head=HEAD
                // nx show projects --affected // To see affected projects

            }
        }

        stage('Publish Report') {
            steps {
                script {
                // App lists
                def reports = [
                    [name: 'Swag Labs Report', path: 'reports/swag-labs'],
                    [name: 'HerokuApp Report', path: 'reports/herokuapp']
                ]

                // Search for reports
                reports.each { report ->
                    publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: report.path,
                    reportFiles: 'index.html',
                    reportName: report.name
                    ])
                }
                }
            }
        }

        // stage('Publish Report') {
        //     steps {
        //         publishHTML([
        //             reportDir: 'playwright-report',
        //             reportFiles: 'index.html', 
        //             reportName: 'Playwright Test Report', 
        //             allowMissing: false,
        //             alwaysLinkToLastBuild: true,
        //             keepAll: true
        //         ])
        //         }
        // }
    }
}