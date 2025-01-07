/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2025.
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

const SecretsManagerV2 = require('../dist/secrets-manager/v2');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the secrets-manager service.
//
// The following configuration properties are assumed to be defined:
// SECRETS_MANAGER_URL=<service base url>
// SECRETS_MANAGER_AUTH_TYPE=iam
// SECRETS_MANAGER_APIKEY=<IAM apikey>
// SECRETS_MANAGER_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'secrets_manager_v2.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('SecretsManagerV2', () => {
    // Service instance
    let secretsManagerService;

    // Variables to hold link values
    let configurationNameForGetConfigurationLink;
    let secretGroupIdForGetSecretGroupLink;
    let secretIdForCreateSecretVersionLink;
    let secretIdForCreateSecretVersionLocksLink;
    let secretIdForGetSecretLink;
    let secretIdForGetSecretVersionLink;
    let secretIdForListSecretLocksLink;
    let secretIdForListSecretVersionLocksLink;
    let secretNameLink;
    let secretVersionIdForCreateSecretVersionLocksLink;
    let secretVersionIdForDeleteSecretVersionLocksLink;
    let secretVersionIdForGetSecretVersionLink;
    let secretVersionIdForGetSecretVersionMetadataLink;
    let secretVersionIdForListSecretVersionLocksLink;
    let secretVersionIdForUpdateSecretVersionMetadataLink;

    // To access additional configuration values, uncomment this line and extract the values from config
    // const config = readExternalSources(SecretsManagerV2.DEFAULT_SERVICE_NAME);

    test('Initialize service', async () => {
        // begin-common

        secretsManagerService = SecretsManagerV2.newInstance();

        // end-common
    });

    test('createSecretGroup request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createSecretGroup() result:');
        // begin-create_secret_group

        const params = {
            name: 'my-secret-group',
        };

        let res;
        try {
            res = await secretsManagerService.createSecretGroup(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_secret_group
        const responseBody = res.result;
        secretGroupIdForGetSecretGroupLink = responseBody.id;
    });

    test('createSecret request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createSecret() result:');
        // begin-create_secret

        // Request models needed by this operation.

        // ArbitrarySecretPrototype
        const secretPrototypeModel = {
            custom_metadata: {metadata_custom_key: 'metadata_custom_value'},
            description: 'Description of my arbitrary secret.',
            expiration_date: '2030-10-05T11:49:42Z',
            labels: ['dev', 'us-south'],
            name: 'example-arbitrary-secret',
            secret_group_id: 'default',
            secret_type: 'arbitrary',
            payload: 'secret-data',
            version_custom_metadata: {custom_version_key: 'custom_version_value'},
        };

        const params = {
            secretPrototype: secretPrototypeModel,
        };

        let res;
        try {
            res = await secretsManagerService.createSecret(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_secret
        const responseBody = res.result;
        secretIdForGetSecretLink = responseBody.id;
        secretIdForGetSecretVersionLink = responseBody.id;
    });

    test('updateSecretMetadata request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('updateSecretMetadata() result:');
        // begin-update_secret_metadata

        // Request models needed by this operation.

        // ArbitrarySecretMetadataPatch
        const secretMetadataPatchModel = {
            name: 'updated-arbitrary-secret-name-example',
            description: 'updated Arbitrary Secret description',
            labels: ['dev', 'us-south'],
            custom_metadata: {metadata_custom_key: 'metadata_custom_value'},
        };

        const params = {
            id: secretIdForGetSecretLink,
            secretMetadataPatch: secretMetadataPatchModel,
        };

        let res;
        try {
            res = await secretsManagerService.updateSecretMetadata(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-update_secret_metadata
        const responseBody = res.result;
        secretNameLink = responseBody.name;
    });

    test('listSecretVersions request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('listSecretVersions() result:');
        // begin-list_secret_versions

        const params = {
            secretId: secretIdForGetSecretLink,
        };

        let res;
        try {
            res = await secretsManagerService.listSecretVersions(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-list_secret_versions
        const responseBody = res.result;
        secretVersionIdForGetSecretVersionLink = responseBody.versions[0].id;
        secretIdForCreateSecretVersionLink = responseBody.versions[0].secret_id;
        secretVersionIdForGetSecretVersionMetadataLink = responseBody.versions[0].id;
        secretVersionIdForUpdateSecretVersionMetadataLink = responseBody.versions[0].id;
        secretIdForCreateSecretVersionLocksLink = responseBody.versions[0].secret_id;
        secretVersionIdForCreateSecretVersionLocksLink = responseBody.versions[0].id;
        secretVersionIdForDeleteSecretVersionLocksLink = responseBody.versions[0].id;
    });

    test('createSecretLocksBulk request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createSecretLocksBulk() result:');
        // begin-create_secret_locks_bulk

        // Request models needed by this operation.

        // SecretLockPrototype
        const secretLockPrototypeModel = {
            name: 'lock-example-1',
            description: 'lock for consumer 1',
            attributes: {key: 'value'},
        };

        const params = {
            id: secretIdForGetSecretLink,
            locks: [secretLockPrototypeModel],
        };

        let res;
        try {
            res = await secretsManagerService.createSecretLocksBulk(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_secret_locks_bulk
        const responseBody = res.result;
        secretIdForListSecretLocksLink = responseBody.secret_id;
        secretIdForListSecretVersionLocksLink = responseBody.secret_id;
        secretVersionIdForListSecretVersionLocksLink = responseBody.versions[0].version_id;
    });

    test('createConfiguration request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createConfiguration() result:');
        // begin-create_configuration

        // Request models needed by this operation.

        // PublicCertificateConfigurationDNSCloudInternetServicesPrototype
        const configurationPrototypeModel = {
            config_type: 'public_cert_configuration_dns_cloud_internet_services',
            name: 'example-cloud-internet-services-config',
            cloud_internet_services_apikey: '5ipu_ykv0PMp2MhxQnDMn7VzrkSlBwi3BOI8uthi_EXZ',
            cloud_internet_services_crn: 'crn:v1:bluemix:public:internet-svcs:global:a/128e84fcca45c1224aae525d31ef2b52:009a0357-1460-42b4-b903-10580aba7dd8::',
        };

        const params = {
            configurationPrototype: configurationPrototypeModel,
        };

        let res;
        try {
            res = await secretsManagerService.createConfiguration(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_configuration
        const responseBody = res.result;
        configurationNameForGetConfigurationLink = responseBody.name;
    });

    test('listSecretGroups request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('listSecretGroups() result:');
        // begin-list_secret_groups

        let res;
        try {
            res = await secretsManagerService.listSecretGroups({});
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-list_secret_groups
    });

    test('getSecretGroup request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getSecretGroup() result:');
        // begin-get_secret_group

        const params = {
            id: secretGroupIdForGetSecretGroupLink,
        };

        let res;
        try {
            res = await secretsManagerService.getSecretGroup(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_secret_group
    });

    test('updateSecretGroup request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('updateSecretGroup() result:');
        // begin-update_secret_group

        const params = {
            id: secretGroupIdForGetSecretGroupLink,
        };

        let res;
        try {
            res = await secretsManagerService.updateSecretGroup(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-update_secret_group
    });

    test('listSecrets request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('listSecrets() result:');
        // begin-list_secrets

        const params = {
            limit: 10,
            sort: 'created_at',
            search: 'example',
            groups: ['default', 'cac40995-c37a-4dcb-9506-472869077634'],
            secretTypes: ['arbitrary', 'kv'],
            matchAllLabels: ['dev', 'us-south'],
        };

        const allResults = [];
        try {
            const pager = new SecretsManagerV2.SecretsPager(secretsManagerService, params);
            while (pager.hasNext()) {
                const nextPage = await pager.getNext();
                expect(nextPage).not.toBeNull();
                allResults.push(...nextPage);
            }
            console.log(JSON.stringify(allResults, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-list_secrets
    });

    test('getSecret request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getSecret() result:');
        // begin-get_secret

        const params = {
            id: secretIdForGetSecretLink,
        };

        let res;
        try {
            res = await secretsManagerService.getSecret(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_secret
    });

    test('getSecretMetadata request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getSecretMetadata() result:');
        // begin-get_secret_metadata

        const params = {
            id: secretIdForGetSecretLink,
        };

        let res;
        try {
            res = await secretsManagerService.getSecretMetadata(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_secret_metadata
    });

    test('createSecretAction request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createSecretAction() result:');
        // begin-create_secret_action

        // Request models needed by this operation.

        // PrivateCertificateActionRevokePrototype
        const secretActionPrototypeModel = {
            action_type: 'private_cert_action_revoke_certificate',
        };

        const params = {
            id: secretIdForGetSecretLink,
            secretActionPrototype: secretActionPrototypeModel,
        };

        let res;
        try {
            res = await secretsManagerService.createSecretAction(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_secret_action
    });

    test('getSecretByNameType request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getSecretByNameType() result:');
        // begin-get_secret_by_name_type

        const params = {
            secretType: 'arbitrary',
            name: secretNameLink,
            secretGroupName: 'default',
        };

        let res;
        try {
            res = await secretsManagerService.getSecretByNameType(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_secret_by_name_type
    });

    test('createSecretVersion request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createSecretVersion() result:');
        // begin-create_secret_version

        // Request models needed by this operation.

        // ArbitrarySecretVersionPrototype
        const secretVersionPrototypeModel = {
            payload: 'updated secret credentials',
            custom_metadata: {metadata_custom_key: 'metadata_custom_value'},
            version_custom_metadata: {custom_version_key: 'custom_version_value'},
        };

        const params = {
            secretId: secretIdForGetSecretLink,
            secretVersionPrototype: secretVersionPrototypeModel,
        };

        let res;
        try {
            res = await secretsManagerService.createSecretVersion(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_secret_version
    });

    test('getSecretVersion request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getSecretVersion() result:');
        // begin-get_secret_version

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
        };

        let res;
        try {
            res = await secretsManagerService.getSecretVersion(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_secret_version
    });

    test('getSecretVersionMetadata request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getSecretVersionMetadata() result:');
        // begin-get_secret_version_metadata

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
        };

        let res;
        try {
            res = await secretsManagerService.getSecretVersionMetadata(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_secret_version_metadata
    });

    test('updateSecretVersionMetadata request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('updateSecretVersionMetadata() result:');
        // begin-update_secret_version_metadata

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
        };

        let res;
        try {
            res = await secretsManagerService.updateSecretVersionMetadata(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-update_secret_version_metadata
    });

    test('createSecretVersionAction request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createSecretVersionAction() result:');
        // begin-create_secret_version_action

        // Request models needed by this operation.

        // PrivateCertificateVersionActionRevokePrototype
        const secretVersionActionPrototypeModel = {
            action_type: 'private_cert_action_revoke_certificate',
        };

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
            secretVersionActionPrototype: secretVersionActionPrototypeModel,
        };

        let res;
        try {
            res = await secretsManagerService.createSecretVersionAction(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_secret_version_action
    });

    test('listSecretsLocks request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('listSecretsLocks() result:');
        // begin-list_secrets_locks

        const params = {
            limit: 10,
            search: 'example',
            groups: ['default', 'cac40995-c37a-4dcb-9506-472869077634'],
        };

        const allResults = [];
        try {
            const pager = new SecretsManagerV2.SecretsLocksPager(secretsManagerService, params);
            while (pager.hasNext()) {
                const nextPage = await pager.getNext();
                expect(nextPage).not.toBeNull();
                allResults.push(...nextPage);
            }
            console.log(JSON.stringify(allResults, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-list_secrets_locks
    });

    test('listSecretLocks request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('listSecretLocks() result:');
        // begin-list_secret_locks

        const params = {
            id: secretIdForGetSecretLink,
            limit: 10,
            sort: 'name',
            search: 'example',
        };

        const allResults = [];
        try {
            const pager = new SecretsManagerV2.SecretLocksPager(secretsManagerService, params);
            while (pager.hasNext()) {
                const nextPage = await pager.getNext();
                expect(nextPage).not.toBeNull();
                allResults.push(...nextPage);
            }
            console.log(JSON.stringify(allResults, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-list_secret_locks
    });

    test('createSecretVersionLocksBulk request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createSecretVersionLocksBulk() result:');
        // begin-create_secret_version_locks_bulk

        // Request models needed by this operation.

        // SecretLockPrototype
        const secretLockPrototypeModel = {
            name: 'lock-example-1',
            description: 'lock for consumer 1',
            attributes: {key: 'value'},
        };

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
            locks: [secretLockPrototypeModel],
        };

        let res;
        try {
            res = await secretsManagerService.createSecretVersionLocksBulk(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_secret_version_locks_bulk
    });

    test('listSecretVersionLocks request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('listSecretVersionLocks() result:');
        // begin-list_secret_version_locks

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
            limit: 10,
            sort: 'name',
            search: 'example',
        };

        const allResults = [];
        try {
            const pager = new SecretsManagerV2.SecretVersionLocksPager(secretsManagerService, params);
            while (pager.hasNext()) {
                const nextPage = await pager.getNext();
                expect(nextPage).not.toBeNull();
                allResults.push(...nextPage);
            }
            console.log(JSON.stringify(allResults, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-list_secret_version_locks
    });

    test('listConfigurations request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('listConfigurations() result:');
        // begin-list_configurations

        const params = {
            limit: 10,
            sort: 'config_type',
            search: 'example',
            secretTypes: ['iam_credentials', 'public_cert', 'private_cert'],
        };

        const allResults = [];
        try {
            const pager = new SecretsManagerV2.ConfigurationsPager(secretsManagerService, params);
            while (pager.hasNext()) {
                const nextPage = await pager.getNext();
                expect(nextPage).not.toBeNull();
                allResults.push(...nextPage);
            }
            console.log(JSON.stringify(allResults, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-list_configurations
    });

    test('getConfiguration request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getConfiguration() result:');
        // begin-get_configuration

        const params = {
            name: configurationNameForGetConfigurationLink,
            xSmAcceptConfigurationType: 'public_cert_configuration_dns_cloud_internet_services',
        };

        let res;
        try {
            res = await secretsManagerService.getConfiguration(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_configuration
    });

    test('updateConfiguration request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('updateConfiguration() result:');
        // begin-update_configuration

        // Request models needed by this operation.

        // PublicCertificateConfigurationDNSCloudInternetServicesPatch
        const configurationPatchModel = {
            cloud_internet_services_apikey: '5ipu_ykv0PMp2MhxQnDMn7VzrkSlBwi3BOI8uthi_EXZ',
            cloud_internet_services_crn: 'crn:v1:bluemix:public:internet-svcs:global:a/128e84fcca45c1224aae525d31ef2b52:009a0357-1460-42b4-b903-10580aba7dd8::',
        };

        const params = {
            name: configurationNameForGetConfigurationLink,
            configurationPatch: configurationPatchModel,
            xSmAcceptConfigurationType: 'public_cert_configuration_dns_cloud_internet_services',
        };

        let res;
        try {
            res = await secretsManagerService.updateConfiguration(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-update_configuration
    });

    test('createConfigurationAction request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createConfigurationAction() result:');
        // begin-create_configuration_action

        // Request models needed by this operation.

        // PrivateCertificateConfigurationActionRotateCRLPrototype
        const configurationActionPrototypeModel = {
            action_type: 'private_cert_configuration_action_rotate_crl',
        };

        const params = {
            name: configurationNameForGetConfigurationLink,
            configActionPrototype: configurationActionPrototypeModel,
            xSmAcceptConfigurationType: 'public_cert_configuration_dns_cloud_internet_services',
        };

        let res;
        try {
            res = await secretsManagerService.createConfigurationAction(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_configuration_action
    });

    test('createNotificationsRegistration request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('createNotificationsRegistration() result:');
        // begin-create_notifications_registration

        const params = {
            eventNotificationsInstanceCrn: 'crn:v1:bluemix:public:event-notifications:us-south:a/22018f3c34ff4ff193698d15ca316946:578ad1a4-2fd8-4e66-95d5-79a842ba91f8::',
            eventNotificationsSourceName: 'My Secrets Manager',
            eventNotificationsSourceDescription: 'Optional description of this source in an Event Notifications instance.',
        };

        let res;
        try {
            res = await secretsManagerService.createNotificationsRegistration(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-create_notifications_registration
    });

    test('getNotificationsRegistration request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('getNotificationsRegistration() result:');
        // begin-get_notifications_registration

        let res;
        try {
            res = await secretsManagerService.getNotificationsRegistration({});
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-get_notifications_registration
    });

    test('getNotificationsRegistrationTest request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        // begin-get_notifications_registration_test

        try {
            await secretsManagerService.getNotificationsRegistrationTest({});
        } catch (err) {
            console.warn(err);
        }

        // end-get_notifications_registration_test
    });

    test('deleteSecretGroup request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        // begin-delete_secret_group

        const params = {
            id: secretGroupIdForGetSecretGroupLink,
        };

        try {
            await secretsManagerService.deleteSecretGroup(params);
        } catch (err) {
            console.warn(err);
        }

        // end-delete_secret_group
    });

    test('deleteSecretVersionData request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        // begin-delete_secret_version_data

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
        };

        try {
            await secretsManagerService.deleteSecretVersionData(params);
        } catch (err) {
            console.warn(err);
        }

        // end-delete_secret_version_data
    });

    test('deleteSecretLocksBulk request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('deleteSecretLocksBulk() result:');
        // begin-delete_secret_locks_bulk

        const params = {
            id: secretIdForGetSecretLink,
            name: ['lock-example-1'],
        };

        let res;
        try {
            res = await secretsManagerService.deleteSecretLocksBulk(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-delete_secret_locks_bulk
    });

    test('deleteSecretVersionLocksBulk request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        originalLog('deleteSecretVersionLocksBulk() result:');
        // begin-delete_secret_version_locks_bulk

        const params = {
            secretId: secretIdForGetSecretLink,
            id: secretVersionIdForGetSecretVersionLink,
            name: ['lock-example-1'],
        };

        let res;
        try {
            res = await secretsManagerService.deleteSecretVersionLocksBulk(params);
            console.log(JSON.stringify(res.result, null, 2));
        } catch (err) {
            console.warn(err);
        }

        // end-delete_secret_version_locks_bulk
    });

    test('deleteSecret request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        // begin-delete_secret

        const params = {
            id: secretIdForGetSecretLink,
        };

        try {
            await secretsManagerService.deleteSecret(params);
        } catch (err) {
            console.warn(err);
        }

        // end-delete_secret
    });

    test('deleteConfiguration request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        // begin-delete_configuration

        const params = {
            name: configurationNameForGetConfigurationLink,
            xSmAcceptConfigurationType: 'public_cert_configuration_dns_cloud_internet_services',
        };

        try {
            await secretsManagerService.deleteConfiguration(params);
        } catch (err) {
            console.warn(err);
        }

        // end-delete_configuration
    });

    test('deleteNotificationsRegistration request example', async () => {
        consoleLogMock.mockImplementation((output) => {
            originalLog(output);
        });
        consoleWarnMock.mockImplementation((output) => {
            // if an error occurs, display the message and then fail the test
            originalWarn(output);
            expect(true).toBeFalsy();
        });

        // begin-delete_notifications_registration

        try {
            await secretsManagerService.deleteNotificationsRegistration({});
        } catch (err) {
            console.warn(err);
        }

        // end-delete_notifications_registration
    });
});
