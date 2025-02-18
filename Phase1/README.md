# Phase 1: Serverless Lambda Functions Project

## Description

This project demonstrates the deployment and usage of AWS Lambda functions using the Serverless Framework. It includes endpoints for creating, reading, updating, and deleting data in a MongoDB database. The project is designed to be deployed and tested within your own AWS account.

## Prerequisites

Before you get started, ensure you have the following installed and set up on your machine:

* Node.js (Ensure Node.js is installed on your computer. You can download it from Node.js Official Website)

* Serverless Framework (Install globally using npm install -g serverless if not already installed.)

* AWS Account (Required to deploy the Lambda functions.)

* AWS CLI (Optional but recommended to configure AWS credentials on your system.)

## Setup Instructions

### Step 1: Clone the Repository

Clone this repository to your local machine:

    git clone <repository_url>

### Step 2: Navigate to the Phase 1 Folder

Change directory into the Phase 1 folder:

    cd phase1

### Step 3: Install Dependencies

Install the required Node.js dependencies:

    npm install

### Step 4: Configure AWS Credentials

To deploy the functions, you must configure your AWS credentials. You can do this in one of two ways:

Using AWS CLI (Recommended):
Run the following command to set up your credentials:

    aws configure

Provide your AWS Access Key ID, Secret Access Key, region, and default output format when prompted.

Manually Configure in Environment File:
Create or edit the ~/.aws/credentials file on your system and add your credentials:

    [default]
    aws_access_key_id = YOUR_AWS_ACCESS_KEY_ID
    aws_secret_access_key = YOUR_AWS_SECRET_ACCESS_KEY

### Step 5: Deploy the Functions

Run the following command to deploy the functions to your AWS account:

    serverless deploy

This command will Package your code.

Deploy it to AWS Lambda using the Serverless Framework.

### Step 6: Verify Deployment

After deployment, you will see endpoint URLs for your deployed functions in the console output. You can use these endpoints to test your Lambda functions.

## Usage

You can use tools like Postman, curl, or any HTTP client to interact with the deployed Lambda functions. For example:

Create Function:

    POST https://<your-api-gateway-url>/create
    Content-Type: application/json

    {

     "field1": "value1",
     "field2": "value2"

    }


## Cleaning Up

To remove the deployed functions from your AWS account:

    serverless remove

This will clean up all resources created during deployment.

## Notes

Ensure that your AWS IAM role has sufficient permissions to deploy and execute Lambda functions.

Use .env files or environment variables for managing sensitive information securely.
