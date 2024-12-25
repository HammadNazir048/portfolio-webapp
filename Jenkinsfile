pipeline {
  agent any
  environment {
    AZURE_RESOURCE_GROUP = 'portfolio-webapp'
    WEBAPP_NAME = "portfolio-webapp"
    PACKAGE_NAME = "python-app-package.zip"
    GIT_HTTP_MAX_REQUEST_BUFFER = '1048576000'  // Increase Git HTTP buffer size
    GIT_TERMINAL_PROMPT = '0'  // Disable terminal prompts during Git operations
    GIT_SSH_COMMAND = 'ssh -o ConnectTimeout=10 -o ServerAliveInterval=60 -o ServerAliveCountMax=5' // SSH timeout settings
  }

  stages {
    stage('Workspace Cleanup') {
      steps {
        // Clean before build
        cleanWs()
        echo 'Cleaning workspace...'
      }
    }

    stage('Checkout Git Branch') {
      steps {
        script {
          // Retry logic in case Git fetch fails due to network issues
          retry(3) {
            git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/HammadNazir048/portfolio-webapp.git'
          }
        }
      }
    }

    stage('Build Application') {
      steps {
        // Upgrade pip and install dependencies
        sh 'python3 -m pip install --upgrade pip'
        sh 'pip3 install -r requirements.txt'
      }
    }

    stage('Package Application') {
      steps {
        script {
          /* Zip all contents inside the code folder, excluding the root folder(code folder itself). */
          sh "cd code && zip -r ../${PACKAGE_NAME} ./*"
          // Print the contents of the current directory to verify the zip
          sh "zipinfo ${PACKAGE_NAME}"
        }
      }
    }

    stage('Login to Azure') {
      steps {
        script {
          // Login to Azure using Service Principal credentials
          withCredentials([azureServicePrincipal('jenkins-pipeline-sp')]) {
            sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
            sh 'az webapp deploy --resource-group ${AZURE_RESOURCE_GROUP} --name ${WEBAPP_NAME} --src-path "${WORKSPACE}/${PACKAGE_NAME}"'
          }
        }
      }
    }
  }
}
