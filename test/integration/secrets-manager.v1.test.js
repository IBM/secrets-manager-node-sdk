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

const SecretsManager = require('../../dist/secrets-manager/v1');
const { IamAuthenticator } = require('../../dist/auth');

// testcase timeout value (200s).
const timeout = 200000;

function generateName() {
  return `test-integration-${Date.now()}${Math.random()}`;
}

async function clearConfigs(secretsManager) {
  const res = await secretsManager.getConfig({
    secretType: SecretsManager.GetConfigConstants.SecretType.PUBLIC_CERT,
  });
  for (let i = 0; i < res.result.resources[0].certificate_authorities.length; i++) {
    const c = res.result.resources[0].certificate_authorities[i];
    const res2 = await secretsManager.deleteConfigElement({
      secretType: SecretsManager.DeleteConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement:
        SecretsManager.DeleteConfigElementConstants.ConfigElement.CERTIFICATE_AUTHORITIES,
      configName: c.name,
    });
    expect(res2.status).toBe(204);
  }

  for (let i = 0; i < res.result.resources[0].dns_providers.length; i++) {
    const c = res.result.resources[0].dns_providers[i];
    const res3 = await secretsManager.deleteConfigElement({
      secretType: SecretsManager.DeleteConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement: SecretsManager.DeleteConfigElementConstants.ConfigElement.DNS_PROVIDERS,
      configName: c.name,
    });
    expect(res3.status).toBe(204);
  }
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

  test('Should create a kv secret', async () => {
    // Create a new kv secret
    let res = await secretsManager.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: 'kv',
      resources: [
        {
          name: generateName(),
          description: 'Integration test generated',
          payload: `'foo':·'data'·`,
          labels: ['label1', 'label2'],
          expiration_date: '2030-04-01T09:30:00Z',
        },
      ],
    });
    expect(res.status).toBe(200);
    const secretId = res.result.resources[0].id;
    // get kv secret
    res = await secretsManager.getSecret({
      secretType: 'kv',
      id: secretId,
    });
    expect(res.status).toBe(200);
    expect(res.result.resources[0].secret_data.payload).toEqual("{'foo': 'data'}");
    // Delete the secret.
    res = await secretsManager.deleteSecret({
      secretType: 'kv',
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

  test('Should create, get and delete certificate secret', async () => {
    const testCertificate =
      '-----BEGIN CERTIFICATE-----\r\nMIICsDCCAhmgAwIBAgIJALrogcLQxAOqMA0GCSqGSIb3DQEBCwUAMHExCzAJBgNV\r\nBAYTAnVzMREwDwYDVQQIDAh1cy1zb3V0aDEPMA0GA1UEBwwGRGFsLTEwMQwwCgYD\r\nVQQKDANJQk0xEzARBgNVBAsMCkNsb3VkQ2VydHMxGzAZBgNVBAMMEiouY2VydG1n\r\nbXQtZGV2LmNvbTAeFw0xODA0MjUwODM5NTlaFw00NTA5MTAwODM5NTlaMHExCzAJ\r\nBgNVBAYTAnVzMREwDwYDVQQIDAh1cy1zb3V0aDEPMA0GA1UEBwwGRGFsLTEwMQww\r\nCgYDVQQKDANJQk0xEzARBgNVBAsMCkNsb3VkQ2VydHMxGzAZBgNVBAMMEiouY2Vy\r\ndG1nbXQtZGV2LmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAmy/4uEEw\r\nAn75rBuAIv5zi+1b2ycUnlw94x3QzYtY3QHQysFu73U3rczVHOsQNd9VIoC0z8py\r\npMZZu7W6dv6cjOSXlpiLfd7Y9TWzO43mNUH0qrnFpSgXM9ZXN3PJWjmTH3yxAsdK\r\nd5wtRdSv9AwrHWo8hHoTumoXYNMDuehyVJ8CAwEAAaNQME4wHQYDVR0OBBYEFMNC\r\nbcvQ+Smn8ikBDrMKhPc4C+f5MB8GA1UdIwQYMBaAFMNCbcvQ+Smn8ikBDrMKhPc4\r\nC+f5MAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADgYEAFe2fCmzTcmCHeijV\r\nq0+EOvMRVNF/FTYyjb24gUGTbouZOkfv7JK94lAt/u5mPhpftYX+b1wUlkz0Kyl5\r\n4IgM0XXpcPYDdxQ87c0l/nAUF7Pi++u7CVmJBlclyDOL6AmBpUE0HyquQT4rSp/K\r\n+5qcqSxVjznd5XgQrWQGHLI2tnY=\r\n-----END CERTIFICATE-----';
    const testPrivateKey =
      '-----BEGIN PRIVATE KEY-----\r\nMIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJsv+LhBMAJ++awb\r\ngCL+c4vtW9snFJ5cPeMd0M2LWN0B0MrBbu91N63M1RzrEDXfVSKAtM/KcqTGWbu1\r\nunb+nIzkl5aYi33e2PU1szuN5jVB9Kq5xaUoFzPWVzdzyVo5kx98sQLHSnecLUXU\r\nr/QMKx1qPIR6E7pqF2DTA7noclSfAgMBAAECgYBsFjd3rf+QXXvsQaM3vF4iIYoO\r\n0+NqgPihzUx3PQ0BsZgJAD0SD2ReawIsCBTcUNbtFxPYfjrnRTeOo/5hjujdq0ei\r\nx1PDh4qzDDPRxOdkCHjfMQb/FBNQvhSh+nQsylCm1qZeaOwgqiM8johDvQ8XLaql\r\n/uNcc1kGXHHd7hKQkQJBAMv04YfjtDxdfanrVtjz8Nm3QGklnAgmddRfY9AZB1Vw\r\nT4hpfvmRi0zOXn2KTaVjAcdqp0Irg+IyTQzd+q9dFG0CQQDCyVOEzUfLHotITqPy\r\nzN2EQ/e/YNnfsElBgNbL44V0Gy2vclLBt6hsvJrD0lSXHCo8aWplIvs2cRM/8uv3\r\nim27AkBrgcQTrgoGO72OgJeBumv9RuPzyLhLb4JylGl3eonsFkxF+l3MzVQhAzK5\r\nd9pf0CVS6TwK3AcjhyIoIyYNo8GtAkBUyi6A8Jr/4BvhLdpQJr2Ghc+ijxZIOQSq\r\nbtsRhcjh8bLBXJKJoNi//JmiBDyuSqRYB8s4mzGfUTl/7M6qwqdhAkEAnZEM+ZUV\r\nV0lZA18QsbwYHY1GVmaOi/dpZjS4ECl+7hbqhHfry88bgXzRKaITxe5Tss+lwQQ7\r\ncfLx+EZh+XOvRw==\r\n-----END PRIVATE KEY-----\r\n';
    // Create a new certificate secret
    let res = await secretsManager.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: 'imported_cert',
      resources: [
        {
          name: generateName(),
          description: 'Integration test generated',
          labels: ['label1', 'label2'],
          certificate: testCertificate,
          private_key: testPrivateKey,
        },
      ],
    });
    expect(res.status).toBe(200);
    const secretId = res.result.resources[0].id;
    // get certificate secret
    res = await secretsManager.getSecret({
      secretType: 'imported_cert',
      id: secretId,
    });
    expect(res.status).toBe(200);
    expect(res.result.resources[0].secret_data.certificate).toEqual(testCertificate);
    expect(res.result.resources[0].secret_data.private_key).toEqual(testPrivateKey);
    // Delete certificate secret.
    res = await secretsManager.deleteSecret({
      secretType: 'imported_cert',
      id: secretId,
    });
    expect(res.status).toBe(204);
  });

  beforeAll(async () => {
    await clearConfigs(secretsManager);
  });

  test('Should create configs, order certificate and delete configs', async () => {
    const caConfigName = `${generateName()}-ca`;
    // Create CA config
    let res = await secretsManager.createConfigElement({
      secretType: SecretsManager.CreateConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement:
        SecretsManager.CreateConfigElementConstants.ConfigElement.CERTIFICATE_AUTHORITIES,
      name: caConfigName,
      type: 'letsencrypt-stage',
      config: { private_key: process.env.CA_CONFIG_PRIVATE_KEY },
    });

    expect(res.status).toBe(201);

    // Create DNS config
    const dnsConfigName = `${generateName()}-dns`;
    res = await secretsManager.createConfigElement({
      secretType: SecretsManager.CreateConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement: SecretsManager.CreateConfigElementConstants.ConfigElement.DNS_PROVIDERS,
      name: dnsConfigName,
      type: 'cis',
      config: { cis_apikey: process.env.DNS_CONFIG_API_KEY, cis_crn: process.env.DNS_CONFIG_CRN },
    });

    expect(res.status).toBe(201);

    // Order certificate

    res = await secretsManager.createSecret({
      metadata: {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      },
      secretType: SecretsManager.CreateSecretConstants.SecretType.PUBLIC_CERT,
      resources: [
        {
          name: generateName(),
          description: 'Integration test public_cert generated',
          labels: ['label1', 'label2'],
          common_name: 'integration.secrets-manager.test.appdomain.cloud',
          alt_names: ['integration2.secrets-manager.test.appdomain.cloud'],
          key_algorithm: 'RSA2048',
          ca: caConfigName,
          dns: dnsConfigName,
          rotation: {
            auto_rotate: false,
            rotate_keys: false,
          },
        },
      ],
    });

    expect(res.status).toBe(202);

    const { id } = res.result.resources[0];

    // Get the secret
    res = await secretsManager.getSecret({
      secretType: SecretsManager.GetSecretConstants.SecretType.PUBLIC_CERT,
      id,
    });
    expect(res.status).toBe(200);
    expect(res.result.resources[0].id).toEqual(id);

    // delete the configs
    res = await secretsManager.deleteConfigElement({
      secretType: SecretsManager.DeleteConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement: SecretsManager.DeleteConfigElementConstants.ConfigElement.DNS_PROVIDERS,
      configName: dnsConfigName,
    });

    expect(res.status).toBe(204);

    // delete the configs
    res = await secretsManager.deleteConfigElement({
      secretType: SecretsManager.DeleteConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement:
        SecretsManager.DeleteConfigElementConstants.ConfigElement.CERTIFICATE_AUTHORITIES,
      configName: caConfigName,
    });

    expect(res.status).toBe(204);
  });

  test('Should create, get, list and delete configs', async () => {
    const caConfigName = `${generateName()}-ca`;
    // Create CA config
    let res = await secretsManager.createConfigElement({
      secretType: SecretsManager.CreateConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement:
        SecretsManager.CreateConfigElementConstants.ConfigElement.CERTIFICATE_AUTHORITIES,
      name: caConfigName,
      type: 'letsencrypt-stage',
      config: { private_key: process.env.CA_CONFIG_PRIVATE_KEY },
    });

    expect(res.status).toBe(201);

    // Create DNS config
    const dnsConfigName = `${generateName()}-dns`;
    res = await secretsManager.createConfigElement({
      secretType: SecretsManager.CreateConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement: SecretsManager.CreateConfigElementConstants.ConfigElement.DNS_PROVIDERS,
      name: dnsConfigName,
      type: 'cis',
      config: { cis_apikey: process.env.DNS_CONFIG_API_KEY, cis_crn: process.env.DNS_CONFIG_CRN },
    });

    expect(res.status).toBe(201);

    // get ca config
    res = await secretsManager.getConfigElement({
      secretType: SecretsManager.CreateConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement:
        SecretsManager.CreateConfigElementConstants.ConfigElement.CERTIFICATE_AUTHORITIES,
      configName: caConfigName,
    });
    expect(res.status).toBe(200);
    expect(res.result.resources[0].name).toBe(caConfigName);

    // get dns config
    res = await secretsManager.getConfigElement({
      secretType: SecretsManager.GetConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement: SecretsManager.GetConfigElementConstants.ConfigElement.DNS_PROVIDERS,
      configName: dnsConfigName,
    });
    expect(res.status).toBe(200);
    expect(res.result.resources[0].name).toBe(dnsConfigName);

    // Get all configs
    res = await secretsManager.getConfig({
      secretType: SecretsManager.GetConfigElementConstants.SecretType.PUBLIC_CERT,
    });
    expect(res.status).toBe(200);
    expect(res.result.resources[0].dns_providers).not.toBeNull();
    expect(res.result.resources[0].certificate_authorities).not.toBeNull();

    // delete the configs
    res = await secretsManager.deleteConfigElement({
      secretType: SecretsManager.DeleteConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement: SecretsManager.DeleteConfigElementConstants.ConfigElement.DNS_PROVIDERS,
      configName: dnsConfigName,
    });

    expect(res.status).toBe(204);

    // delete the configs
    res = await secretsManager.deleteConfigElement({
      secretType: SecretsManager.DeleteConfigElementConstants.SecretType.PUBLIC_CERT,
      configElement:
        SecretsManager.DeleteConfigElementConstants.ConfigElement.CERTIFICATE_AUTHORITIES,
      configName: caConfigName,
    });

    expect(res.status).toBe(204);
  });
});
