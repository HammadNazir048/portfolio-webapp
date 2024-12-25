pipeline {
  agent any
  environment {
    AZURE_RESOURCE_GROUP = 'portfolio-webapp'
    WEBAPP_NAME = "portfolio-webapp"
    PACKAGE_NAME = "python-app-package.zip"
  }

  stages {
    stage('Workspace Cleanup') {
      steps {
        // Clean before build
        cleanWs()
        echo 'cleaning workspace...'
      }
    }

    stage('Checkout Git Branch') {
      steps {
        script {
          // Increase Git buffer size
          sh 'git config --global http.postBuffer 1048576000' // 1 GB
          // Disable HTTP/2 (using HTTP/1.1 instead)
          sh 'git config --global http.version HTTP/1.1'
          // Checkout with shallow clone to reduce size
          git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/HammadNazir048/portfolio-webapp.git', extensions: [[$class: 'CloneOption', depth: 1, noTags: false]]
        }
      }
    }

    stage('Build Application') {
      steps {
        sh 'python3 -m pip install --upgrade pip'
        sh 'pip3 install -r requirements.txt'
      }
    }

    stage('Package Application') {
      steps {
        script {
          /* Zip all contents inside code folder, excluding the root folder (code folder itself). */
          sh "cd code && zip -r ../${PACKAGE_NAME} ./*"
          // Print the contents of the current directory to verify the zip
          sh "zipinfo ${PACKAGE_NAME}"
        }
      }
    }

    stage('Login to Azure') {
      steps {
        script {
          withCredentials([azureServicePrincipal('jenkins-pipeline-sp')]) {
            sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
            // Deploy to Azure WebApp
            sh 'az webapp deploy --resource-group ${AZURE_RESOURCE_GROUP} --name ${WEBAPP_NAME} --src-path "${WORKSPACE}/${PACKAGE_NAME}"'
          }
        }
      }
    }
  }
}
