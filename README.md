![tests](https://github.com/IBM/secrets-manager-node-sdk/workflows/run-tests/badge.svg)

# IBM Cloud Secrets Manager Node SDK
A Node.js client library to interact with the [IBM Cloud® Secrets Manager APIs](https://cloud.ibm.com/apidocs/secrets-manager).

<details>
<summary>Table of Contents</summary>

* [Overview](#overview)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Authentication](#authentication)
* [Using the SDK](#using-the-sdk)
* [Tests](#tests)
* [Questions](#questions)
* [Issues](#issues)
* [Contributing](#contributing)
* [License](#license)

</details>

## Overview
The IBM Cloud Secrets Manager Node.js SDK allows developers to programmatically interact with the following IBM Cloud
services:

| Service name                                                     | Import path                                   |
|------------------------------------------------------------------|-----------------------------------------------|
| [Secrets Manager](https://cloud.ibm.com/apidocs/secrets-manager) | @ibm-cloud/secrets-manager/secrets-manager/v2 |

## Prerequisites

- An [IBM Cloud account](https://cloud.ibm.com/registration).
- A [Secrets Manager service instance](https://cloud.ibm.com/catalog/services/secrets-manager).
- An [IBM Cloud API key](https://cloud.ibm.com/iam/apikeys) that allows the SDK to access your account.
- Node.js version 16 or above.

  This SDK is tested with Node versions 14 and up. The SDK may work on previous versions, but this is not supported
  officially.

## Installation

```sh
npm install @ibm-cloud/secrets-manager
```

## Authentication
Secrets Manager uses token-based Identity and Access Management (IAM) authentication.

With IAM authentication, you supply an API key that is used to generate an access token. Then, the access token is
included in each API request to Secrets Manager. Access tokens are valid for a limited amount of time and must be
regenerated.

Authentication for this SDK is accomplished by using [IAM authenticators](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md#authentication). Import
authenticators from `@ibm-cloud/secrets-manager/auth`.

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
// SECRETS_MANAGER_API_APIKEY==<apikey>
const iamAuthenticator = getAuthenticatorFromEnvironment('SECRETS_MANAGER_API');
```

To learn more about IAM authenticators and how to use them in your Node.js application, see
the [IBM Node.js SDK Core documentation](https://github.com/IBM/node-sdk-core/blob/master/Authentication.md).

## Using the SDK

### Basic usage

- All methods return a Promise that either resolves with the response from the service or rejects with an Error. The
  response contains the body, the headers, the status code, and the status text. If using async/await, use try/catch for
  handling errors.
- Use the `serviceUrl` parameter to set the endpoint URL that is specific to your Secrets Manager service instance. To
  find your endpoint URL, you can copy it from the **Endpoints** page in the Secrets Manager UI.

#### Examples

Construct a service client and use it to create and retrieve a secret from your Secrets Manager instance.

```js
const SecretsManager = require('@ibm-cloud/secrets-manager/secrets-manager/v2');
const { IamAuthenticator } = require('@ibm-cloud/secrets-manager/auth');


async function secretsManagerSdkExample() {
  // Authenticate with IAM using your IBM Cloud API key
  const authenticator = new IamAuthenticator({
    apikey: process.env.SECRETS_MANAGER_API_APIKEY,
  });

  // Create an instance of the SDK by providing an authentication mechanism and your Secrets Manager instance URL
  const secretsManager = new SecretsManager({
    authenticator,
    serviceUrl:
      'https://example-instance.us-south.secrets-manager.appdomain.cloud',
  });

  // Use the Secrets Manager API to create a secret
  let res = await secretsManager.createSecret({
    secretPrototype:  {
      custom_metadata: { metadata_custom_key: 'metadata_custom_value' },
      description: 'Description of my arbitrary secret.',
      expiration_date: '2023-10-05T11:49:42Z',
      labels: ['dev', 'us-south'],
      name: 'example-arbitrary-secret',
      secret_group_id: 'default',
      secret_type: 'arbitrary',
      payload: 'secret-data',
      version_custom_metadata: { custom_version_key: 'custom_version_value' },
    }
  });

  console.log('Secret created:\n' + JSON.stringify(res.result, null, 2));

  // Get the ID of the newly created secret
  const secretId = res.result.id;

  // Use the Secrets Manager API to get the secret using the secret ID
  res = await secretsManager.getSecret({
    id: secretId,
  });

  console.log('Get secret:\n', JSON.stringify(res.result, null, 2));
}

secretsManagerSdkExample();

```

To delete a secret, specify its `id`.

```js
  res = await secretsManager.deleteSecret({
    id: secretId,
  });

  console.log('Secret deleted.');

```

Create a secret group, and then add a new secret to this group.

```js
 // Create a secret group
    const createGroupParams = { name: 'Test Group', description: 'Group my test secrets' };

    let res = await secretsManager.createSecretGroup(createGroupParams);
    const secretGroupId = res.result.id;

    // Create a secret and associate it with your secret group
    res = await secretsManager.createSecret({
      secretPrototype: {
          secret_group_id: secretGroupId,
          name: "Test secret",
          description: 'Secret used for testing.',
          username: 'test_user',
          password: 'test_password',
          labels: ['label1'],
          expiration_date: '2030-04-01T09:30:00Z',
        }
    });
```

Create a rotation policy of one month for a secret.

```js
    let res = await secretsManager.createSecret({
  secretPrototype:  {
    custom_metadata: { metadata_custom_key: 'metadata_custom_value' },
    description: 'Description of my arbitrary secret.',
    expiration_date: '2023-10-05T11:49:42Z',
    labels: ['dev', 'us-south'],
    name: 'example-arbitrary-secret',
    secret_group_id: 'default',
    secret_type: 'arbitrary',
    payload: 'secret-data',
    version_custom_metadata: { custom_version_key: 'custom_version_value' },
    rotation: {
      auto_rotate: true,
      interval: 1,
      unit: month,
    }
  }
});
```

For more information and IBM Cloud SDK usage examples for Node.js, see
the [IBM Cloud SDK Common documentation](https://github.com/IBM/ibm-cloud-sdk-common/blob/master/README.md)

## Tests

This project includes unit tests `test/unit` and integration tests `test/integration`.

The integration tests are run against an actual Secrets Manager instance and require the following environment variables
to be set:

```
SECRETS_MANAGER_API_APIKEY=<API_KEY>
SERVICE_URL=<SECRETS_MANAGER_ENDPOINT_URL>
```

To run the tests:

```sh
npm test
```

## Questions

If you're having difficulties using this SDK, you can ask questions about this project by using [Stack Overflow](https://stackoverflow.com/questions/tagged/ibm-secrets-manager). Be sure to include
the `ibm-cloud` and `ibm-secrets-manager` tags.

You can also check out the [Secrets Manager documentation](https://cloud.ibm.com/docs/secrets-manager)
and [API reference](https://cloud.ibm.com/apidocs/secrets-manager) for more information about the service.

## Issues

If you encounter an issue with the project, you're welcome to submit
a [bug report](https://github.com/IBM/secrets-manager-node-sdk/issues) to help us improve.

## Contributing

For general contribution guidelines, see [CONTRIBUTING](CONTRIBUTING.md).

## License

This SDK project is released under the Apache 2.0 license. The license's full text can be found in [LICENSE](LICENSE).
