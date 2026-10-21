pipeline {
    agent any

    // Nécessite : plugin NodeJS + un outil nommé « nodejs-20 » (Manage Jenkins > Tools)
    tools { nodejs 'nodejs-20' }

    environment {
        // Credentials Jenkins de type « Username with password » (ID : dockerhub-credentials)
        // Expose DOCKERHUB_CREDS_USR et DOCKERHUB_CREDS_PSW (masqués dans les logs)
        DOCKERHUB_CREDS = credentials('dockerhub-credentials')
        IMAGE_FRONTEND  = "${DOCKERHUB_CREDS_USR}/garderie-frontend"
        IMAGE_BACKEND   = "${DOCKERHUB_CREDS_USR}/garderie-backend"
        IMAGE_TAG       = "${env.BUILD_NUMBER}"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                dir('frontend') { sh 'npm ci' }
                dir('backend')  { sh 'npm ci' }
            }
        }

        stage('Test') {
            steps {
                // Un test en échec arrête le pipeline : les stages suivants ne sont pas exécutés
                dir('frontend') { sh 'npm test -- --ci' }
            }
        }

        stage('Build Frontend') {
            steps {
                sh """
                    docker build -t ${IMAGE_FRONTEND}:${IMAGE_TAG} -t ${IMAGE_FRONTEND}:latest ./frontend
                """
            }
        }

        stage('Build Backend') {
            steps {
                sh """
                    docker build -t ${IMAGE_BACKEND}:${IMAGE_TAG} -t ${IMAGE_BACKEND}:latest ./backend
                """
            }
        }

        stage('Push Frontend') {
            steps {
                sh 'echo "$DOCKERHUB_CREDS_PSW" | docker login -u "$DOCKERHUB_CREDS_USR" --password-stdin'
                sh """
                    docker push ${IMAGE_FRONTEND}:${IMAGE_TAG}
                    docker push ${IMAGE_FRONTEND}:latest
                """
            }
        }

        stage('Push Backend') {
            steps {
                sh 'echo "$DOCKERHUB_CREDS_PSW" | docker login -u "$DOCKERHUB_CREDS_USR" --password-stdin'
                sh """
                    docker push ${IMAGE_BACKEND}:${IMAGE_TAG}
                    docker push ${IMAGE_BACKEND}:latest
                """
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo "Images publiées : ${IMAGE_FRONTEND}:${IMAGE_TAG} et ${IMAGE_BACKEND}:${IMAGE_TAG}"
        }
        failure {
            echo 'Pipeline en échec : consultez les logs de l\'étape concernée.'
        }
    }
}
