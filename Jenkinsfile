pipeline {
    agent any
	options {
        timeout(time: 1, unit: 'HOURS') 
    }
    stages {
        stage('Build') {
			input {
                message "Should we continue?"
                ok "Yes, we should."
                submitter "alice,bob"
                parameters {
                    string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
                }
            }
            steps {
                echo 'Building'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
	post { 
        always { 
            echo 'I will always say Hello again!'
        }
    }
}