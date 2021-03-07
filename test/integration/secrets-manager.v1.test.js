/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const SecretsManager = require('../../dist/secrets-manager/v1');
const IamAuthenticator = require('../../dist/auth').IamAuthenticator;

// testcase timeout value (200s).
const timeout = 200000;

function generateName() {
  return 'test-integration-' + Date.now() + Math.random();
}

describe('IbmCloudSecretsManagerApiV1_integration', () => {
  jest.setTimeout(timeout);

  const secretsManager = new SecretsManager({
    authenticator: new IamAuthenticator({
      apikey: process.env.SECRETS_MANAGER_API_APIKEY,
      url: process.env.AUTH_URL,
    }),
    serviceUrl: process.env.SERVICE_URL,
  });

  expect(secretsManager).not.toBeNull();

  test('Should create an arbitrary secret', async () => {
    // Create a new arbitrary secret
    let res = await secretsManager.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: 'arbitrary',
      resources: [
        {
          name: generateName(),
          description: 'Integration test generated',
          payload: 'secret-data',
          labels: ['label1', 'label2'],
          expiration_date: '2030-04-01T09:30:00Z',
        },
      ],
    });
    expect(res.status).toBe(200);
    const secretId = res.result.resources[0].id;
    // get arbitrary secret
    res = await secretsManager.getSecret({
      secretType: 'arbitrary',
      id: secretId,
    });
    expect(res.status).toBe(200);
    expect(res.result.resources[0].secret_data.payload).toEqual('secret-data');
    // Delete the secret.
    res = await secretsManager.deleteSecret({
      secretType: 'arbitrary',
      id: secretId,
    });
    expect(res.status).toBe(204);
  });

  test('Should create a secret group and a secret belonging to this group', async () => {
    // Create a secret group
    const createGroupParams = {
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret.group+json',
        collection_total: 1,
      },
      resources: [{ name: generateName(), description: 'Integration test generated' }],
    };

    let res = await secretsManager.createSecretGroup(createGroupParams);
    expect(res.status).toBe(200);
    const secretGroupId = res.result.resources[0].id;

    // Create a secrete and associate it with our secret group
    res = await secretsManager.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: 'username_password',
      resources: [
        {
          secret_group_id: secretGroupId,
          name: generateName(),
          description: 'Integration test generated',
          username: 'test_user',
          password: 'test_password',
          labels: ['label1'],
          expiration_date: '2030-04-01T09:30:00Z',
        },
      ],
    });
    expect(res.status).toBe(200);
    const secretId = res.result.resources[0].id;

    // Delete the secret secret.
    res = await secretsManager.deleteSecret({
      secretType: 'username_password',
      id: secretId,
    });
    expect(res.status).toBe(204);

    // Delete the secret group
    res = await secretsManager.deleteSecretGroup({ id: secretGroupId });
    expect(res.status).toBe(204);
  });

  test('Should be able to set a rotation policy for a secret', async () => {
    let res = await secretsManager.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: 'username_password',
      resources: [
        {
          name: generateName(),
          description: 'Integration test generated',
          username: 'test_user',
          password: 'test_password',
          labels: ['label1'],
          expiration_date: '2030-04-01T09:30:00Z',
        },
      ],
    });
    expect(res.status).toBe(200);
    const secretId = res.result.resources[0].id;

    // Create a rotation policy for the username_password secret type we have just created.
    const testInterval = 1;

    res = await secretsManager.putPolicy({
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
            interval: testInterval,
            unit: 'month',
          },
        },
      ],
    });

    expect(res.status).toBe(200);
    expect(res.result.resources[0].rotation.interval).toBe(testInterval);
    // get username_password secret
    res = await secretsManager.getSecret({
      secretType: 'username_password',
      id: secretId,
    });
    expect(res.result.resources[0].secret_data.username).toEqual('test_user');
    expect(res.result.resources[0].secret_data.password).toEqual('test_password');
    expect(res.result.resources[0].next_rotation_date).not.toBeNull();
    // Delete the secret secret.
    res = await secretsManager.deleteSecret({
      secretType: 'username_password',
      id: secretId,
    });
    expect(res.status).toBe(204);
  });

  test('Creating a secret with the same name should result in a conflict', async () => {
    const secretName = 'conflict_integration_test_secret';

    // Create a new arbitrary secret
    let res = await secretsManager.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: 'arbitrary',
      resources: [
        {
          name: secretName,
          description: 'Integration test generated',
          payload: 'secret-data',
          labels: ['label1', 'label2'],
          expiration_date: '2030-04-01T09:30:00Z',
        },
      ],
    });
    expect(res.status).toBe(200);
    const secretId = res.result.resources[0].id;

    // Now reuse the same secret name under the same secret type, should result in a conflict error.
    try {
      res = await secretsManager.createSecret({
        metadata: {
          collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
          collection_total: 1,
        },
        secretType: 'arbitrary',
        resources: [
          {
            name: secretName,
            description: 'Integration test generated',
            payload: 'secret-data',
            labels: ['label1', 'label2'],
            expiration_date: '2030-04-01T09:30:00Z',
          },
        ],
      });
      throw Error('Should not reach this point');
    } catch (errorResponse) {
      expect(errorResponse.name).toBe('Conflict');
      expect(errorResponse.status).toBe(409);
    }

    // Delete the secret.
    res = await secretsManager.deleteSecret({
      secretType: 'arbitrary',
      id: secretId,
    });
    expect(res.status).toBe(204);
  });
});
