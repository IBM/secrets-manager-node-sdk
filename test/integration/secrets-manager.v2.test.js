/**
 * (C) Copyright IBM Corp. 2022.
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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const SecretsManagerV2 = require('../../dist/secrets-manager/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'secrets_manager_v2.env';

const describe = authHelper.prepareTests(configFile);

describe('SecretsManagerV2_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let secretsManagerService;

  // Variables to hold link values
  let configurationNameForGetConfigurationLink;
  let secretGroupIdForGetSecretGroupLink;
  let secretIdForCreateSecretVersionLink;
  let secretIdForCreateSecretVersionLocksLink;
  let secretIdForGetSecretLink;
  let secretIdForGetSecretVersionLink;
  let secretVersionIdForCreateSecretVersionLocksLink;
  let secretVersionIdForGetSecretVersionLink;

  test('Initialize service', async () => {
    secretsManagerService = SecretsManagerV2.newInstance();

    expect(secretsManagerService).not.toBeNull();

    const config = readExternalSources(SecretsManagerV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
  
    secretsManagerService.enableRetries();
  });

  test('createSecretGroup()', async () => {
    const params = {
      name: 'my-secret-group',
      description: 'Extended description for this group.',
    };

    const res = await secretsManagerService.createSecretGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    secretGroupIdForGetSecretGroupLink = res.result.id;
  });

  test('createSecret()', async () => {
    // Request models needed by this operation.

    // ArbitrarySecretPrototype
    const secretPrototypeModel = {
      custom_metadata: { metadata_custom_key: 'metadata_custom_value' },
      description: 'description of my arbitrary secret.',
      expiration_date: '2022-10-05T11:49:42Z',
      labels: ['dev', 'us-south'],
      name: 'example-arbitrary-secret',
      secret_group_id: '67d025e1-0248-418f-83ba-deb0ebfb9b4a',
      secret_type: 'arbitrary',
      payload: 'secret-data',
      version_custom_metadata: { custom_version_key: 'custom_version_value' },
    };

    const params = {
      secretPrototype: secretPrototypeModel,
    };

    const res = await secretsManagerService.createSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    secretIdForGetSecretLink = res.result.id;
    secretIdForGetSecretVersionLink = res.result.id;
    secretIdForCreateSecretVersionLink = res.result.id;
  });

  test('listSecretVersions()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
    };

    const res = await secretsManagerService.listSecretVersions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    secretVersionIdForGetSecretVersionLink = res.result.versions[0].id;
    secretIdForCreateSecretVersionLocksLink = res.result.versions[0].secret_id;
    secretVersionIdForCreateSecretVersionLocksLink = res.result.versions[0].id;
  });

  test('createConfiguration()', async () => {
    // Request models needed by this operation.

    // IAMCredentialsConfigurationPrototype
    const configurationPrototypeModel = {
      name: 'iam-configuration',
      config_type: 'iam_credentials_configuration',
    };

    const params = {
      configurationPrototype: configurationPrototypeModel,
    };

    const res = await secretsManagerService.createConfiguration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    configurationNameForGetConfigurationLink = res.result.name;
  });

  test('listSecretGroups()', async () => {
    const res = await secretsManagerService.listSecretGroups();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getSecretGroup()', async () => {
    const params = {
      id: secretGroupIdForGetSecretGroupLink,
    };

    const res = await secretsManagerService.getSecretGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateSecretGroup()', async () => {
    const params = {
      id: secretGroupIdForGetSecretGroupLink,
      name: 'my-secret-group',
      description: 'Extended description for this group.',
    };

    const res = await secretsManagerService.updateSecretGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSecrets()', async () => {
    const params = {
      offset: 0,
      limit: 1,
      sort: 'created_at',
      search: 'testString',
      groups: ['67d025e1-0248-418f-83ba-deb0ebfb9b4a', 'cac40995-c37a-4dcb-9506-472869077634'],
    };

    const res = await secretsManagerService.listSecrets(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSecrets() via SecretsPager', async () => {
    const params = {
      limit: 10,
      sort: 'created_at',
      search: 'testString',
      groups: ['67d025e1-0248-418f-83ba-deb0ebfb9b4a', 'cac40995-c37a-4dcb-9506-472869077634'],
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecretsManagerV2.SecretsPager(secretsManagerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecretsManagerV2.SecretsPager(secretsManagerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getSecret()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
    };

    const res = await secretsManagerService.getSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getSecretMetadata()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
    };

    const res = await secretsManagerService.getSecretMetadata(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateSecretMetadata()', async () => {
    // Request models needed by this operation.

    // ArbitrarySecretMetadataPatch
    const secretMetadataPatchModel = {
      name: 'updated-arbitrary-secret-name',
      description: 'updated Arbitrary Secret description',
      labels: ['dev', 'us-south'],
      custom_metadata: { metadata_custom_key: 'metadata_custom_value' },
    };

    const params = {
      id: secretIdForGetSecretLink,
      secretMetadataPatch: secretMetadataPatchModel,
    };

    const res = await secretsManagerService.updateSecretMetadata(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSecretAction()', async () => {
    // Request models needed by this operation.

    // PrivateCertificateActionRevokePrototype
    const secretActionPrototypeModel = {
      action_type: 'private_cert_action_revoke_certificate',
      serial_number: '38:eb:01:a3:22:e9:de:55:24:56:9b:14:cb:e2:f3:e3:e2:fb:f5:18',
    };

    const params = {
      id: secretIdForGetSecretLink,
      secretActionPrototype: secretActionPrototypeModel,
    };

    const res = await secretsManagerService.createSecretAction(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createSecretVersion()', async () => {
    // Request models needed by this operation.

    // ArbitrarySecretVersionPrototype
    const secretVersionPrototypeModel = {
      payload: 'updated secret credentials',
      custom_metadata: { metadata_custom_key: 'metadata_custom_value' },
      version_custom_metadata: { custom_version_key: 'custom_version_value' },
    };

    const params = {
      id: secretIdForCreateSecretVersionLink,
      secretVersionPrototype: secretVersionPrototypeModel,
    };

    const res = await secretsManagerService.createSecretVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getSecretVersion()', async () => {
    const params = {
      id: secretIdForGetSecretVersionLink,
      versionId: secretVersionIdForGetSecretVersionLink,
    };

    const res = await secretsManagerService.getSecretVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getSecretVersionMetadata()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      versionId: secretVersionIdForGetSecretVersionLink,
    };

    const res = await secretsManagerService.getSecretVersionMetadata(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateSecretVersionMetadata()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      versionId: secretVersionIdForGetSecretVersionLink,
      versionCustomMetadata: { key: 'value' },
    };

    const res = await secretsManagerService.updateSecretVersionMetadata(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSecretVersionAction()', async () => {
    // Request models needed by this operation.

    // PrivateCertificateVersionActionRevokePrototype
    const secretVersionActionPrototypeModel = {
      action_type: 'private_cert_action_revoke_certificate',
      serial_number: '38:eb:01:a3:22:e9:de:55:24:56:9b:14:cb:e2:f3:e3:e2:fb:f5:18',
    };

    const params = {
      id: secretIdForGetSecretLink,
      versionId: secretVersionIdForGetSecretVersionLink,
      secretVersionActionPrototype: secretVersionActionPrototypeModel,
    };

    const res = await secretsManagerService.createSecretVersionAction(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listSecretsLocks()', async () => {
    const params = {
      offset: 0,
      limit: 1,
      search: 'testString',
      groups: ['67d025e1-0248-418f-83ba-deb0ebfb9b4a', 'cac40995-c37a-4dcb-9506-472869077634'],
    };

    const res = await secretsManagerService.listSecretsLocks(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSecretsLocks() via SecretsLocksPager', async () => {
    const params = {
      limit: 10,
      search: 'testString',
      groups: ['67d025e1-0248-418f-83ba-deb0ebfb9b4a', 'cac40995-c37a-4dcb-9506-472869077634'],
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecretsManagerV2.SecretsLocksPager(secretsManagerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecretsManagerV2.SecretsLocksPager(secretsManagerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createSecretLocks()', async () => {
    // Request models needed by this operation.

    // SecretLockPrototype
    const secretLockPrototypeModel = {
      name: 'lock-1',
      description: 'lock for consumer 1',
      attributes: { key: 'value' },
    };

    const params = {
      id: secretIdForGetSecretLink,
      locks: [secretLockPrototypeModel],
      mode: 'exclusive',
    };

    const res = await secretsManagerService.createSecretLocks(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listSecretLocks()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      offset: 0,
      limit: 1,
      sort: 'name',
      search: 'testString',
    };

    const res = await secretsManagerService.listSecretLocks(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSecretLocks() via SecretLocksPager', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      limit: 10,
      sort: 'name',
      search: 'testString',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecretsManagerV2.SecretLocksPager(secretsManagerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecretsManagerV2.SecretLocksPager(secretsManagerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('createSecretVersionLocks()', async () => {
    // Request models needed by this operation.

    // SecretLockPrototype
    const secretLockPrototypeModel = {
      name: 'lock-1',
      description: 'lock for consumer 1',
      attributes: { key: 'value' },
    };

    const params = {
      id: secretIdForCreateSecretVersionLocksLink,
      versionId: secretVersionIdForGetSecretVersionLink,
      locks: [secretLockPrototypeModel],
      mode: 'exclusive',
    };

    const res = await secretsManagerService.createSecretVersionLocks(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listSecretVersionLocks()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      versionId: secretVersionIdForGetSecretVersionLink,
      offset: 0,
      limit: 1,
      sort: 'name',
      search: 'testString',
    };

    const res = await secretsManagerService.listSecretVersionLocks(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listSecretVersionLocks() via SecretVersionLocksPager', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      versionId: secretVersionIdForGetSecretVersionLink,
      limit: 10,
      sort: 'name',
      search: 'testString',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecretsManagerV2.SecretVersionLocksPager(secretsManagerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecretsManagerV2.SecretVersionLocksPager(secretsManagerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('listConfigurations()', async () => {
    const params = {
      offset: 0,
      limit: 1,
      sort: 'created_at',
      search: 'testString',
    };

    const res = await secretsManagerService.listConfigurations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listConfigurations() via ConfigurationsPager', async () => {
    const params = {
      limit: 10,
      sort: 'created_at',
      search: 'testString',
    };

    const allResults = [];

    // Test getNext().
    let pager = new SecretsManagerV2.ConfigurationsPager(secretsManagerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new SecretsManagerV2.ConfigurationsPager(secretsManagerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getConfiguration()', async () => {
    const params = {
      name: configurationNameForGetConfigurationLink,
      xSmAcceptConfigurationType: 'private_cert_configuration_root_ca',
    };

    const res = await secretsManagerService.getConfiguration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateConfiguration()', async () => {
    // Request models needed by this operation.

    // PrivateCertificateConfigurationRootCAPatch
    const configurationPatchModel = {
      max_ttl: '26300h',
      crl_expiry: '36h',
      crl_disable: false,
      crl_distribution_points_encoded: false,
      issuing_certificates_urls_encoded: false,
    };

    const params = {
      name: configurationNameForGetConfigurationLink,
      configurationPatch: configurationPatchModel,
      xSmAcceptConfigurationType: 'private_cert_configuration_root_ca',
    };

    const res = await secretsManagerService.updateConfiguration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createConfigurationAction()', async () => {
    // Request models needed by this operation.

    // PrivateCertificateConfigurationActionRevokePrototype
    const configurationActionPrototypeModel = {
      action_type: 'private_cert_configuration_action_revoke_ca_certificate',
    };

    const params = {
      name: configurationNameForGetConfigurationLink,
      configActionPrototype: configurationActionPrototypeModel,
    };

    const res = await secretsManagerService.createConfigurationAction(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createNotificationsRegistration()', async () => {
    const params = {
      eventNotificationsInstanceCrn: 'crn:v1:bluemix:public:event-notifications:us-south:a/22018f3c34ff4ff193698d15ca316946:578ad1a4-2fd8-4e66-95d5-79a842ba91f8::',
      eventNotificationsSourceName: 'My Secrets Manager',
      eventNotificationsSourceDescription: 'Optional description of this source in an Event Notifications instance.',
    };

    const res = await secretsManagerService.createNotificationsRegistration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getNotificationsRegistration()', async () => {
    const res = await secretsManagerService.getNotificationsRegistration();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getNotificationsRegistrationTest()', async () => {
    const res = await secretsManagerService.getNotificationsRegistrationTest();
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSecretGroup()', async () => {
    const params = {
      id: secretGroupIdForGetSecretGroupLink,
    };

    const res = await secretsManagerService.deleteSecretGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSecretVersionData()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      versionId: secretVersionIdForGetSecretVersionLink,
    };

    const res = await secretsManagerService.deleteSecretVersionData(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteSecretLocks()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      name: ['lock-1'],
    };

    const res = await secretsManagerService.deleteSecretLocks(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteSecretVersionLocks()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
      versionId: secretVersionIdForGetSecretVersionLink,
      name: ['lock-1'],
    };

    const res = await secretsManagerService.deleteSecretVersionLocks(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteSecret()', async () => {
    const params = {
      id: secretIdForGetSecretLink,
    };

    const res = await secretsManagerService.deleteSecret(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteConfiguration()', async () => {
    const params = {
      name: configurationNameForGetConfigurationLink,
      xSmAcceptConfigurationType: 'private_cert_configuration_root_ca',
    };

    const res = await secretsManagerService.deleteConfiguration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteNotificationsRegistration()', async () => {
    const res = await secretsManagerService.deleteNotificationsRegistration();
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
