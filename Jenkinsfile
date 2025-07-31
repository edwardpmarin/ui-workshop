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
                sh 'npx nx run swag-labs:e2e:dev'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html', 
                    reportName: 'Playwright Test Report', 
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true
                ])
                }
        }
    }
}