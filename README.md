# IBM Cloud Secrets Manager Node.js SDK

A Node.js client library to use the IBM Secrets Manager APIs.

<details>
<summary>Table of Contents</summary>

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Authentication](#authentication)
* [Using the SDK](#using-the-sdk)
  * [Basic Usage](#basic-usage)
  * [Setting the Service URL](#setting-the-service-url)
  * [Sending request headers](#sending-request-headers)
* [Configuring the HTTPS Agent](#configuring-the-https-agent)
  * [Use behind a corporate proxy](#use-behind-a-corporate-proxy)
  * [Sending custom certificates](#sending-custom-certificates)
  * [Disabling SSL Verification](#disabling-ssl-verification---discouraged)
* [Documentation](#documentation)
* [Debug](#debug)
* [Tests](#tests)
</details>

## Overview

The IBM Cloud Secrets Manager Node.js SDK allows developers to programmatically interact with the IBM Cloud Secrets Manager.

## Prerequisites
- You need an IBM Cloud account.

- **Node >=10**: This SDK is tested with Node versions 10 and up. It may work on previous versions but this is not officially supported.

## Installation

```sh
npm install @ibm-cloud/secrets-manager
```

## Authentication

IBM Cloud Secrets Manager uses token-based Identity and Access Management (IAM) authentication.

IAM authentication uses a service API key to get an access token that is passed with the call.
Access tokens are valid for a limited amount of time and must be regenerated.

Authentication is accomplished using dedicated Authenticators for each authentication scheme. Import authenticators from `@ibm-cloud/secrets-manager/auth`.

### Examples
#### Programmatic credentials
```js
import { IamAuthenticator } from '@ibm-cloud/secrets-manager/auth';

const authenticator = new IamAuthenticator({
  apikey: '{apikey}',
});
```

#### External configuration
```js
import { getAuthenticatorFromEnvironment } from '@ibm-cloud/secrets-manager/auth';

// env vars
// SECRETS_MANAGER_API_AUTH_TYPE=iam
// SECRETS_MANAGER_API_APIKEY==<apikey>
const iamAuthenticator = getAuthenticatorFromEnvironment('SECRETS_MANAGER_API');
```

To learn more about the Authenticators and how to use them with your services, see [the detailed documentation](#).

## Using the SDK
### Basic Usage

All methods return a Promise that either resolves with the response from the service or rejects with an Error. The response contains the body, the headers, the status code, and the status text.

```js
const IbmCloudSecretsManagerApiV1 =  require('@ibm-cloud/secrets-manager/ibm-cloud-secrets-manager-api/v1');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');


async function secretsManagerSdkExample() {
  // Authenticate with IAM using your IBM Cloud IAM Api Key.
  const authenticator = new IamAuthenticator({
    apikey: process.env.SECRETS_MANAGER_API_APIKEY,
  });

  // Create an instance of the SDK, providing with authentication mechanism and your Secrets Manager instance URL.
  const secretsManagerApi = new IbmCloudSecretsManagerApiV1({
    authenticator,
    serviceUrl:
      'https://example-instance.us-south.secrets-manager.appdomain.cloud',
  });

  // Use Secrets Manager API to create a secret.
  let res = await secretsManagerApi.createSecret({
    secretType: 'username_password',
    'metadata': {
      'collection_type': 'application/vnd.ibm.secrets-manager.secret+json',
      'collection_total': 1,
    },
    'resources': [
      {
        'name': 'example-username-password-secret',
        'description': 'text describing the secret',
        'username': 'user123',
        'password': '123456789',
        'labels': ['label1', 'label2'],
        'expiration_date': '2030-04-01T09:30:00Z',
      },
    ],
  });

  console.log('Secret created\n' + JSON.stringify(res.result.resources[0], null, 2));

  // Get the ID of the newly created secret
  const secretId = res.result.resources[0].id;

  // Use Secrets Manager API to get the secret using the secretId
  res = await secretsManagerApi.getSecret({
    secretType: 'username_password',
    id: secretId,
  });

  console.log('\n\nGet Secret\n\n', JSON.stringify(res.result.resources, null, 2));
}

secretsManagerSdkExample();

```

## Tests
Running all the tests:
```sh
npm test
```

Running a specific test:
```sh
npm run jest -- '<path to test>'
```

