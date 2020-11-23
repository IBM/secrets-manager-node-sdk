![tests](https://github.com/IBM/secrets-manager-nodejs-sdk/workflows/run-tests/badge.svg)

# IBM Cloud Secrets Manager Node.js SDK

A Node.js client library to use the IBM Cloud® Secrets Manager APIs.

<details>
<summary>Table of Contents</summary>

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Authentication](#authentication)
* [Using the SDK](#using-the-sdk)
* [Documentation](#documentation)
* [Tests](#tests)
</details>

## Overview

The IBM Cloud Secrets Manager Node.js SDK allows developers to programmatically interact with IBM Cloud Secrets Manager.

## Prerequisites
- You need an [IBM Cloud account](https://cloud.ibm.com/registration).

- **Node >=12**: This SDK is tested with Node versions 12 and up. It may work on previous versions but this is not officially supported.

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

To learn more about the Authenticators and how to use them with your services, see [the detailed documentation](https://github.com/IBM/node-sdk-core/blob/master/AUTHENTICATION.md).

## Using the SDK
### Basic usage

- All methods return a Promise that either resolves with the response from the service or rejects with an Error. The response contains the body, the headers, the status code, and the status text.
If using async/await, use try/catch for handling errors.

- Use the `serviceUrl` parameter to pass the URL of your Secrets Manager to `IbmCloudSecretsManagerApiV1`.

#### Examples
Create an instance of the Secrets Manager API and then use it to create and retrieve a secret.
```js
const IbmCloudSecretsManagerApiV1 =  require('@ibm-cloud/secrets-manager/ibm-cloud-secrets-manager-api/v1');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');


async function secretsManagerSdkExample() {
  // Authenticate with IAM using your IBM Cloud API key
  const authenticator = new IamAuthenticator({
    apikey: process.env.SECRETS_MANAGER_API_APIKEY,
  });

  // Create an instance of the SDK by providing an authentication mechanism and your Secrets Manager instance URL
  const secretsManagerApi = new IbmCloudSecretsManagerApiV1({
    authenticator,
    serviceUrl:
      'https://example-instance.us-south.secrets-manager.appdomain.cloud',
  });

  // Use the Secrets Manager API to create a secret
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

  console.log('Secret created:\n' + JSON.stringify(res.result.resources[0], null, 2));

  // Get the ID of the newly created secret
  const secretId = res.result.resources[0].id;

  // Use the Secrets Manager API to get the secret using the secret ID
  res = await secretsManagerApi.getSecret({
    secretType: 'username_password',
    id: secretId,
  });

  console.log('Get Secret:\n', JSON.stringify(res.result.resources, null, 2));
}

secretsManagerSdkExample();

```

To delete a secret, specify the `secretType` and its `id`.
```js
  res = await secretsManagerApi.deleteSecret({
    secretType: 'username_password',
    id: secretId,
  });

  console.log('Secret deleted.');

```

Create a secret group, and then add a new secret to this group.
```js
 // Create a secret group
    const createGroupParams = {
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret.group+json',
        collection_total: 1,
      },
      resources: [{ name: 'Test Group', description: 'Group my test secrets' }],
    };

    let res = await ibmCloudSecretsManagerApiService.createSecretGroup(createGroupParams);
    const secretGroupId = res.result.resources[0].id;

    // Create a secret and associate it with your secret group
    res = await ibmCloudSecretsManagerApiService.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: 'username_password',
      resources: [
        {
          secret_group_id: secretGroupId,
          name: "Test secret",
          description: 'Secret used for testing',
          username: 'test_user',
          password: 'test_password',
          labels: ['label1'],
          expiration_date: '2030-04-01T09:30:00Z',
        },
      ],
    });
```

Create a rotation policy of one month for a secret.
```js
    let res = await ibmCloudSecretsManagerApiService.putPolicy({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret.policy+json',
        collection_total: 1,
      },
      secretType: 'username_password',
      id: secretId,
      resources: [
        {
          type: 'application/vnd.ibm.secrets-manager.secret.policy+json',
          rotation: {
            interval: 1,
            unit: 'month',
          },
        },
      ],
    });
```

## Documentation

For more information about Secrets Manager, check out the [Secrets Manager documentation](https://cloud.ibm.com/docs/secrets-manager) and [API reference](https://cloud.ibm.com/apidocs/secrets-manager). 

## Tests

This project includes unit tests `test/unit` and integration tests `test/integration`.

The integration test are running against an actual instance of a Secrets Manager and require the following environment variables to be set:
```
SECRETS_MANAGER_API_AUTH_TYPE=iam;
SECRETS_MANAGER_API_APIKEY=<api key>
SERVICE_URL=<url to a secrets manager instance>
```

Running all the tests:
```sh
npm test
```

