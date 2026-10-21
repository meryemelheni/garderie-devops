pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }
        stage('Install') {
            steps {
                echo 'Installation des dépendances...'
                dir('frontend') {
                    sh 'npm ci'
                }
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Exécution des tests...'
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                echo 'Construction de l\'image frontend...'
                sh 'docker build -t meryemelheni/garderie-frontend:latest ./frontend'
            }
        }
        stage('Build Backend') {
            steps {
                echo 'Construction de l\'image backend...'
                sh 'docker build -t meryemelheni/garderie-backend:latest ./backend'
            }
        }
        stage('Push Frontend') {
            steps {
                echo 'Push de l\'image frontend (simulation)'
            }
        }
        stage('Push Backend') {
            steps {
                echo 'Push de l\'image backend (simulation)'
            }
        }
    }
}