pipeline {
    agent any  // Se ejecuta en cualquier máquina

    stages {
        stage('Clonar Repositorio') {
            steps {
                git 'https://github.com/usuario/mi-repositorio.git'  // Cambia por tu repo
            }
        }

        stage('Instalar Dependencias Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Ejecutar Backend') {
            steps {
                dir('backend') {
                    sh 'nohup npm start &'
                }
            }
        }

        stage('Instalar Dependencias Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Compilar Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Desplegar Frontend') {
            steps {
                sh 'cp -r frontend/dist/* /var/www/html/'  // Ajusta según tu servidor
            }
        }
    }
}
