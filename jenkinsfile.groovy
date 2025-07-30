pipeline {
    agent any

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
                // Put here your HTML reporter or Allure
            }
        }
    }
}