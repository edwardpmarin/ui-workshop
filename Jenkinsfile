pipeline {
    agent any

    tools {
    nodejs 'node21'  // Same name in Global Tool Configuration
  }

    // environment {
    //     ENV = "dev"
    // }

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
                sh 'git fetch origin main:origin/get-started' //Ensure we have the latest main branch
                sh 'ENV=dev npm run test:swag-labs'
                sh 'ENV=dev npm run test:herokuapp'
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
    }
}