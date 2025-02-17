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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const {NoAuthAuthenticator} = sdkCorePackage;
const SecretsManagerV2 = require('../../dist/secrets-manager/v2');

const {
    getOptions,
    checkUrlAndMethod,
    checkMediaHeaders,
    expectToBePromise,
    checkUserHeader,
    checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const secretsManagerServiceOptions = {
    authenticator: new NoAuthAuthenticator(),
    url: 'https://provide-here-your-smgr-instanceuuid.us-south.secrets-manager.appdomain.cloud',
};

const secretsManagerService = new SecretsManagerV2(secretsManagerServiceOptions);

let createRequestMock = null;

function mock_createRequest() {
    if (!createRequestMock) {
        createRequestMock = jest.spyOn(secretsManagerService, 'createRequest');
        createRequestMock.mockImplementation(() => Promise.resolve());
    }
}

function unmock_createRequest() {
    if (createRequestMock) {
        createRequestMock.mockRestore();
        createRequestMock = null;
    }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('SecretsManagerV2', () => {
    beforeEach(() => {
        mock_createRequest();
    });

    afterEach(() => {
        if (createRequestMock) {
            createRequestMock.mockClear();
        }
        getAuthenticatorMock.mockClear();
    });

    describe('the newInstance method', () => {
        test('should use defaults when options not provided', () => {
            const testInstance = SecretsManagerV2.newInstance();

            expect(getAuthenticatorMock).toHaveBeenCalled();
            expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
            expect(testInstance.baseOptions.serviceName).toBe(SecretsManagerV2.DEFAULT_SERVICE_NAME);
            expect(testInstance.baseOptions.serviceUrl).toBe(SecretsManagerV2.DEFAULT_SERVICE_URL);
            expect(testInstance).toBeInstanceOf(SecretsManagerV2);
        });

        test('should set serviceName, serviceUrl, and authenticator when provided', () => {
            const options = {
                authenticator: new NoAuthAuthenticator(),
                serviceUrl: 'custom.com',
                serviceName: 'my-service',
            };

            const testInstance = SecretsManagerV2.newInstance(options);

            expect(getAuthenticatorMock).not.toHaveBeenCalled();
            expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
            expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
            expect(testInstance.baseOptions.serviceName).toBe('my-service');
            expect(testInstance).toBeInstanceOf(SecretsManagerV2);
        });
    });

    describe('the constructor', () => {
        test('use user-given service url', () => {
            const options = {
                authenticator: new NoAuthAuthenticator(),
                serviceUrl: 'custom.com',
            };

            const testInstance = new SecretsManagerV2(options);

            expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
        });

        test('use default service url', () => {
            const options = {
                authenticator: new NoAuthAuthenticator(),
            };

            const testInstance = new SecretsManagerV2(options);

            expect(testInstance.baseOptions.serviceUrl).toBe(SecretsManagerV2.DEFAULT_SERVICE_URL);
        });
    });

    describe('constructServiceUrl', () => {
        describe('positive tests', () => {
            test('should use all default variable values if null is passed', () => {
                const defaultFormattedUrl = 'https://provide-here-your-smgr-instanceuuid.us-south.secrets-manager.appdomain.cloud';
                const formattedUrl = SecretsManagerV2.constructServiceUrl(null);

                expect(formattedUrl).toStrictEqual(defaultFormattedUrl);
            });
        });

        describe('negative tests', () => {
            test('should fail if an invalid variable name is provided', () => {
                expect(() => {
                    const providedUrlVariables = new Map([['invalid_variable_name', 'value']]);
                    SecretsManagerV2.constructServiceUrl(providedUrlVariables);
                }).toThrow();
            });
        });
    });

    describe('createSecretGroup', () => {
        describe('positive tests', () => {
            function __createSecretGroupTest() {
                // Construct the params object for operation createSecretGroup
                const name = 'my-secret-group';
                const description = 'Extended description for this group.';
                const createSecretGroupParams = {
                    name,
                    description,
                };

                const createSecretGroupResult = secretsManagerService.createSecretGroup(createSecretGroupParams);

                // all methods should return a Promise
                expectToBePromise(createSecretGroupResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secret_groups', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body.name).toEqual(name);
                expect(mockRequestOptions.body.description).toEqual(description);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createSecretGroupTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createSecretGroupTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createSecretGroupTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const name = 'my-secret-group';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createSecretGroupParams = {
                    name,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createSecretGroup(createSecretGroupParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretGroup({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretGroup();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('listSecretGroups', () => {
        describe('positive tests', () => {
            function __listSecretGroupsTest() {
                // Construct the params object for operation listSecretGroups
                const listSecretGroupsParams = {};

                const listSecretGroupsResult = secretsManagerService.listSecretGroups(listSecretGroupsParams);

                // all methods should return a Promise
                expectToBePromise(listSecretGroupsResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secret_groups', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __listSecretGroupsTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __listSecretGroupsTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __listSecretGroupsTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const listSecretGroupsParams = {
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.listSecretGroups(listSecretGroupsParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });

            test('should not have any problems when no parameters are passed in', () => {
                // invoke the method with no parameters
                secretsManagerService.listSecretGroups({});
                checkForSuccessfulExecution(createRequestMock);
            });
        });
    });

    describe('getSecretGroup', () => {
        describe('positive tests', () => {
            function __getSecretGroupTest() {
                // Construct the params object for operation getSecretGroup
                const id = 'd898bb90-82f6-4d61-b5cc-b079b66cfa76';
                const getSecretGroupParams = {
                    id,
                };

                const getSecretGroupResult = secretsManagerService.getSecretGroup(getSecretGroupParams);

                // all methods should return a Promise
                expectToBePromise(getSecretGroupResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secret_groups/{id}', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getSecretGroupTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getSecretGroupTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getSecretGroupTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = 'd898bb90-82f6-4d61-b5cc-b079b66cfa76';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getSecretGroupParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getSecretGroup(getSecretGroupParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretGroup({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretGroup();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('updateSecretGroup', () => {
        describe('positive tests', () => {
            function __updateSecretGroupTest() {
                // Construct the params object for operation updateSecretGroup
                const id = 'd898bb90-82f6-4d61-b5cc-b079b66cfa76';
                const name = 'my-secret-group';
                const description = 'Extended description for this group.';
                const updateSecretGroupParams = {
                    id,
                    name,
                    description,
                };

                const updateSecretGroupResult = secretsManagerService.updateSecretGroup(updateSecretGroupParams);

                // all methods should return a Promise
                expectToBePromise(updateSecretGroupResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secret_groups/{id}', 'PATCH');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/merge-patch+json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body.name).toEqual(name);
                expect(mockRequestOptions.body.description).toEqual(description);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __updateSecretGroupTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __updateSecretGroupTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __updateSecretGroupTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = 'd898bb90-82f6-4d61-b5cc-b079b66cfa76';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const updateSecretGroupParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.updateSecretGroup(updateSecretGroupParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.updateSecretGroup({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.updateSecretGroup();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('deleteSecretGroup', () => {
        describe('positive tests', () => {
            function __deleteSecretGroupTest() {
                // Construct the params object for operation deleteSecretGroup
                const id = 'd898bb90-82f6-4d61-b5cc-b079b66cfa76';
                const deleteSecretGroupParams = {
                    id,
                };

                const deleteSecretGroupResult = secretsManagerService.deleteSecretGroup(deleteSecretGroupParams);

                // all methods should return a Promise
                expectToBePromise(deleteSecretGroupResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secret_groups/{id}', 'DELETE');
                const expectedAccept = undefined;
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __deleteSecretGroupTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __deleteSecretGroupTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __deleteSecretGroupTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = 'd898bb90-82f6-4d61-b5cc-b079b66cfa76';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const deleteSecretGroupParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.deleteSecretGroup(deleteSecretGroupParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretGroup({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretGroup();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('createSecret', () => {
        describe('positive tests', () => {
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

            function __createSecretTest() {
                // Construct the params object for operation createSecret
                const secretPrototype = secretPrototypeModel;
                const createSecretParams = {
                    secretPrototype,
                };

                const createSecretResult = secretsManagerService.createSecret(createSecretParams);

                // all methods should return a Promise
                expectToBePromise(createSecretResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body).toEqual(secretPrototype);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createSecretTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createSecretTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createSecretTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretPrototype = secretPrototypeModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createSecretParams = {
                    secretPrototype,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createSecret(createSecretParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createSecret({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createSecret();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('listSecrets', () => {
        describe('positive tests', () => {
            function __listSecretsTest() {
                // Construct the params object for operation listSecrets
                const offset = 0;
                const limit = 200;
                const sort = 'created_at';
                const search = 'example';
                const groups = ['default', 'cac40995-c37a-4dcb-9506-472869077634'];
                const secretTypes = ['arbitrary', 'kv'];
                const matchAllLabels = ['dev', 'us-south'];
                const listSecretsParams = {
                    offset,
                    limit,
                    sort,
                    search,
                    groups,
                    secretTypes,
                    matchAllLabels,
                };

                const listSecretsResult = secretsManagerService.listSecrets(listSecretsParams);

                // all methods should return a Promise
                expectToBePromise(listSecretsResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.qs.offset).toEqual(offset);
                expect(mockRequestOptions.qs.limit).toEqual(limit);
                expect(mockRequestOptions.qs.sort).toEqual(sort);
                expect(mockRequestOptions.qs.search).toEqual(search);
                expect(mockRequestOptions.qs.groups).toEqual(groups);
                expect(mockRequestOptions.qs.secret_types).toEqual(secretTypes);
                expect(mockRequestOptions.qs.match_all_labels).toEqual(matchAllLabels);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __listSecretsTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __listSecretsTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __listSecretsTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const listSecretsParams = {
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.listSecrets(listSecretsParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });

            test('should not have any problems when no parameters are passed in', () => {
                // invoke the method with no parameters
                secretsManagerService.listSecrets({});
                checkForSuccessfulExecution(createRequestMock);
            });
        });

        describe('SecretsPager tests', () => {
            const serviceUrl = secretsManagerServiceOptions.url;
            const path = '/api/v2/secrets';
            const mockPagerResponse1 =
                '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"secrets":[{"created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","created_at":"2022-04-12T23:20:50.520Z","crn":"crn","custom_metadata":{"anyKey":"anyValue"},"description":"Extended description for this secret.","downloaded":true,"id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","labels":["my-label"],"locks_total":0,"name":"my-secret","secret_group_id":"default","secret_type":"arbitrary","state":0,"state_description":"active","updated_at":"2022-04-12T23:20:50.520Z","versions_total":0,"referenced_by":["my-example-engine-config"],"expiration_date":"2033-04-12T23:20:50.520Z"}]}';
            const mockPagerResponse2 =
                '{"total_count":2,"limit":1,"secrets":[{"created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","created_at":"2022-04-12T23:20:50.520Z","crn":"crn","custom_metadata":{"anyKey":"anyValue"},"description":"Extended description for this secret.","downloaded":true,"id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","labels":["my-label"],"locks_total":0,"name":"my-secret","secret_group_id":"default","secret_type":"arbitrary","state":0,"state_description":"active","updated_at":"2022-04-12T23:20:50.520Z","versions_total":0,"referenced_by":["my-example-engine-config"],"expiration_date":"2033-04-12T23:20:50.520Z"}]}';

            beforeEach(() => {
                unmock_createRequest();
                const scope = nock(serviceUrl)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse1)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse2);
            });

            afterEach(() => {
                nock.cleanAll();
                mock_createRequest();
            });

            test('getNext()', async () => {
                const params = {
                    limit: 10,
                    sort: 'created_at',
                    search: 'example',
                    groups: ['default', 'cac40995-c37a-4dcb-9506-472869077634'],
                    secretTypes: ['arbitrary', 'kv'],
                    matchAllLabels: ['dev', 'us-south'],
                };
                const allResults = [];
                const pager = new SecretsManagerV2.SecretsPager(secretsManagerService, params);
                while (pager.hasNext()) {
                    const nextPage = await pager.getNext();
                    expect(nextPage).not.toBeNull();
                    allResults.push(...nextPage);
                }
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });

            test('getAll()', async () => {
                const params = {
                    limit: 10,
                    sort: 'created_at',
                    search: 'example',
                    groups: ['default', 'cac40995-c37a-4dcb-9506-472869077634'],
                    secretTypes: ['arbitrary', 'kv'],
                    matchAllLabels: ['dev', 'us-south'],
                };
                const pager = new SecretsManagerV2.SecretsPager(secretsManagerService, params);
                const allResults = await pager.getAll();
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });
        });
    });

    describe('getSecret', () => {
        describe('positive tests', () => {
            function __getSecretTest() {
                // Construct the params object for operation getSecret
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const getSecretParams = {
                    id,
                };

                const getSecretResult = secretsManagerService.getSecret(getSecretParams);

                // all methods should return a Promise
                expectToBePromise(getSecretResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getSecretTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getSecretTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getSecretTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getSecretParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getSecret(getSecretParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.getSecret({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.getSecret();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('deleteSecret', () => {
        describe('positive tests', () => {
            function __deleteSecretTest() {
                // Construct the params object for operation deleteSecret
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const deleteSecretParams = {
                    id,
                };

                const deleteSecretResult = secretsManagerService.deleteSecret(deleteSecretParams);

                // all methods should return a Promise
                expectToBePromise(deleteSecretResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}', 'DELETE');
                const expectedAccept = undefined;
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __deleteSecretTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __deleteSecretTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __deleteSecretTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const deleteSecretParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.deleteSecret(deleteSecretParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecret({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecret();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('getSecretMetadata', () => {
        describe('positive tests', () => {
            function __getSecretMetadataTest() {
                // Construct the params object for operation getSecretMetadata
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const getSecretMetadataParams = {
                    id,
                };

                const getSecretMetadataResult = secretsManagerService.getSecretMetadata(getSecretMetadataParams);

                // all methods should return a Promise
                expectToBePromise(getSecretMetadataResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}/metadata', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getSecretMetadataTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getSecretMetadataTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getSecretMetadataTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getSecretMetadataParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getSecretMetadata(getSecretMetadataParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretMetadata({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretMetadata();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('updateSecretMetadata', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // ArbitrarySecretMetadataPatch
            const secretMetadataPatchModel = {
                name: 'updated-arbitrary-secret-name-example',
                description: 'updated Arbitrary Secret description',
                labels: ['dev', 'us-south'],
                custom_metadata: {metadata_custom_key: 'metadata_custom_value'},
                expiration_date: '2033-04-12T23:20:50.520Z',
            };

            function __updateSecretMetadataTest() {
                // Construct the params object for operation updateSecretMetadata
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const secretMetadataPatch = secretMetadataPatchModel;
                const updateSecretMetadataParams = {
                    id,
                    secretMetadataPatch,
                };

                const updateSecretMetadataResult = secretsManagerService.updateSecretMetadata(updateSecretMetadataParams);

                // all methods should return a Promise
                expectToBePromise(updateSecretMetadataResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}/metadata', 'PATCH');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/merge-patch+json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body).toEqual(secretMetadataPatch);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __updateSecretMetadataTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __updateSecretMetadataTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __updateSecretMetadataTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const secretMetadataPatch = secretMetadataPatchModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const updateSecretMetadataParams = {
                    id,
                    secretMetadataPatch,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.updateSecretMetadata(updateSecretMetadataParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.updateSecretMetadata({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.updateSecretMetadata();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('createSecretAction', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // PrivateCertificateActionRevokePrototype
            const secretActionPrototypeModel = {
                action_type: 'private_cert_action_revoke_certificate',
            };

            function __createSecretActionTest() {
                // Construct the params object for operation createSecretAction
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const secretActionPrototype = secretActionPrototypeModel;
                const createSecretActionParams = {
                    id,
                    secretActionPrototype,
                };

                const createSecretActionResult = secretsManagerService.createSecretAction(createSecretActionParams);

                // all methods should return a Promise
                expectToBePromise(createSecretActionResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}/actions', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body).toEqual(secretActionPrototype);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createSecretActionTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createSecretActionTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createSecretActionTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const secretActionPrototype = secretActionPrototypeModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createSecretActionParams = {
                    id,
                    secretActionPrototype,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createSecretAction(createSecretActionParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretAction({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretAction();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('getSecretByNameType', () => {
        describe('positive tests', () => {
            function __getSecretByNameTypeTest() {
                // Construct the params object for operation getSecretByNameType
                const secretType = 'arbitrary';
                const name = 'my-secret';
                const secretGroupName = 'default';
                const getSecretByNameTypeParams = {
                    secretType,
                    name,
                    secretGroupName,
                };

                const getSecretByNameTypeResult = secretsManagerService.getSecretByNameType(getSecretByNameTypeParams);

                // all methods should return a Promise
                expectToBePromise(getSecretByNameTypeResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secret_groups/{secret_group_name}/secret_types/{secret_type}/secrets/{name}', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.secret_type).toEqual(secretType);
                expect(mockRequestOptions.path.name).toEqual(name);
                expect(mockRequestOptions.path.secret_group_name).toEqual(secretGroupName);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getSecretByNameTypeTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getSecretByNameTypeTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getSecretByNameTypeTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretType = 'arbitrary';
                const name = 'my-secret';
                const secretGroupName = 'default';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getSecretByNameTypeParams = {
                    secretType,
                    name,
                    secretGroupName,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getSecretByNameType(getSecretByNameTypeParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretByNameType({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretByNameType();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('createSecretVersion', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // ArbitrarySecretVersionPrototype
            const secretVersionPrototypeModel = {
                payload: 'updated secret credentials',
                custom_metadata: {metadata_custom_key: 'metadata_custom_value'},
                version_custom_metadata: {custom_version_key: 'custom_version_value'},
            };

            function __createSecretVersionTest() {
                // Construct the params object for operation createSecretVersion
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const secretVersionPrototype = secretVersionPrototypeModel;
                const createSecretVersionParams = {
                    secretId,
                    secretVersionPrototype,
                };

                const createSecretVersionResult = secretsManagerService.createSecretVersion(createSecretVersionParams);

                // all methods should return a Promise
                expectToBePromise(createSecretVersionResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body).toEqual(secretVersionPrototype);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createSecretVersionTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createSecretVersionTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createSecretVersionTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const secretVersionPrototype = secretVersionPrototypeModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createSecretVersionParams = {
                    secretId,
                    secretVersionPrototype,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createSecretVersion(createSecretVersionParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretVersion({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretVersion();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('listSecretVersions', () => {
        describe('positive tests', () => {
            function __listSecretVersionsTest() {
                // Construct the params object for operation listSecretVersions
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const listSecretVersionsParams = {
                    secretId,
                };

                const listSecretVersionsResult = secretsManagerService.listSecretVersions(listSecretVersionsParams);

                // all methods should return a Promise
                expectToBePromise(listSecretVersionsResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __listSecretVersionsTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __listSecretVersionsTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __listSecretVersionsTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const listSecretVersionsParams = {
                    secretId,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.listSecretVersions(listSecretVersionsParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.listSecretVersions({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.listSecretVersions();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('getSecretVersion', () => {
        describe('positive tests', () => {
            function __getSecretVersionTest() {
                // Construct the params object for operation getSecretVersion
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const getSecretVersionParams = {
                    secretId,
                    id,
                };

                const getSecretVersionResult = secretsManagerService.getSecretVersion(getSecretVersionParams);

                // all methods should return a Promise
                expectToBePromise(getSecretVersionResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getSecretVersionTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getSecretVersionTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getSecretVersionTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getSecretVersionParams = {
                    secretId,
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getSecretVersion(getSecretVersionParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretVersion({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretVersion();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('deleteSecretVersionData', () => {
        describe('positive tests', () => {
            function __deleteSecretVersionDataTest() {
                // Construct the params object for operation deleteSecretVersionData
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const deleteSecretVersionDataParams = {
                    secretId,
                    id,
                };

                const deleteSecretVersionDataResult = secretsManagerService.deleteSecretVersionData(deleteSecretVersionDataParams);

                // all methods should return a Promise
                expectToBePromise(deleteSecretVersionDataResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}/secret_data', 'DELETE');
                const expectedAccept = undefined;
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __deleteSecretVersionDataTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __deleteSecretVersionDataTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __deleteSecretVersionDataTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const deleteSecretVersionDataParams = {
                    secretId,
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.deleteSecretVersionData(deleteSecretVersionDataParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretVersionData({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretVersionData();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('getSecretVersionMetadata', () => {
        describe('positive tests', () => {
            function __getSecretVersionMetadataTest() {
                // Construct the params object for operation getSecretVersionMetadata
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const getSecretVersionMetadataParams = {
                    secretId,
                    id,
                };

                const getSecretVersionMetadataResult = secretsManagerService.getSecretVersionMetadata(getSecretVersionMetadataParams);

                // all methods should return a Promise
                expectToBePromise(getSecretVersionMetadataResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}/metadata', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getSecretVersionMetadataTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getSecretVersionMetadataTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getSecretVersionMetadataTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getSecretVersionMetadataParams = {
                    secretId,
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getSecretVersionMetadata(getSecretVersionMetadataParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretVersionMetadata({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.getSecretVersionMetadata();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('updateSecretVersionMetadata', () => {
        describe('positive tests', () => {
            function __updateSecretVersionMetadataTest() {
                // Construct the params object for operation updateSecretVersionMetadata
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const versionCustomMetadata = {key: 'value'};
                const updateSecretVersionMetadataParams = {
                    secretId,
                    id,
                    versionCustomMetadata,
                };

                const updateSecretVersionMetadataResult = secretsManagerService.updateSecretVersionMetadata(updateSecretVersionMetadataParams);

                // all methods should return a Promise
                expectToBePromise(updateSecretVersionMetadataResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}/metadata', 'PATCH');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/merge-patch+json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body.version_custom_metadata).toEqual(versionCustomMetadata);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __updateSecretVersionMetadataTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __updateSecretVersionMetadataTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __updateSecretVersionMetadataTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const updateSecretVersionMetadataParams = {
                    secretId,
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.updateSecretVersionMetadata(updateSecretVersionMetadataParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.updateSecretVersionMetadata({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.updateSecretVersionMetadata();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('createSecretVersionAction', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // PrivateCertificateVersionActionRevokePrototype
            const secretVersionActionPrototypeModel = {
                action_type: 'private_cert_action_revoke_certificate',
            };

            function __createSecretVersionActionTest() {
                // Construct the params object for operation createSecretVersionAction
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const secretVersionActionPrototype = secretVersionActionPrototypeModel;
                const createSecretVersionActionParams = {
                    secretId,
                    id,
                    secretVersionActionPrototype,
                };

                const createSecretVersionActionResult = secretsManagerService.createSecretVersionAction(createSecretVersionActionParams);

                // all methods should return a Promise
                expectToBePromise(createSecretVersionActionResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}/actions', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body).toEqual(secretVersionActionPrototype);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createSecretVersionActionTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createSecretVersionActionTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createSecretVersionActionTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const secretVersionActionPrototype = secretVersionActionPrototypeModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createSecretVersionActionParams = {
                    secretId,
                    id,
                    secretVersionActionPrototype,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createSecretVersionAction(createSecretVersionActionParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretVersionAction({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretVersionAction();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('listSecretsLocks', () => {
        describe('positive tests', () => {
            function __listSecretsLocksTest() {
                // Construct the params object for operation listSecretsLocks
                const offset = 0;
                const limit = 200;
                const search = 'example';
                const groups = ['default', 'cac40995-c37a-4dcb-9506-472869077634'];
                const listSecretsLocksParams = {
                    offset,
                    limit,
                    search,
                    groups,
                };

                const listSecretsLocksResult = secretsManagerService.listSecretsLocks(listSecretsLocksParams);

                // all methods should return a Promise
                expectToBePromise(listSecretsLocksResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets_locks', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.qs.offset).toEqual(offset);
                expect(mockRequestOptions.qs.limit).toEqual(limit);
                expect(mockRequestOptions.qs.search).toEqual(search);
                expect(mockRequestOptions.qs.groups).toEqual(groups);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __listSecretsLocksTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __listSecretsLocksTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __listSecretsLocksTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const listSecretsLocksParams = {
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.listSecretsLocks(listSecretsLocksParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });

            test('should not have any problems when no parameters are passed in', () => {
                // invoke the method with no parameters
                secretsManagerService.listSecretsLocks({});
                checkForSuccessfulExecution(createRequestMock);
            });
        });

        describe('SecretsLocksPager tests', () => {
            const serviceUrl = secretsManagerServiceOptions.url;
            const path = '/api/v2/secrets_locks';
            const mockPagerResponse1 =
                '{"next":{"href":"https://myhost.com/somePath?offset=1"},"secrets_locks":[{"secret_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_group_id":"default","secret_type":"arbitrary","secret_name":"my-secret","versions":[{"version_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","version_alias":"current","locks":["lock-example"],"payload_available":false}]}],"total_count":2,"limit":1}';
            const mockPagerResponse2 =
                '{"secrets_locks":[{"secret_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_group_id":"default","secret_type":"arbitrary","secret_name":"my-secret","versions":[{"version_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","version_alias":"current","locks":["lock-example"],"payload_available":false}]}],"total_count":2,"limit":1}';

            beforeEach(() => {
                unmock_createRequest();
                const scope = nock(serviceUrl)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse1)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse2);
            });

            afterEach(() => {
                nock.cleanAll();
                mock_createRequest();
            });

            test('getNext()', async () => {
                const params = {
                    limit: 10,
                    search: 'example',
                    groups: ['default', 'cac40995-c37a-4dcb-9506-472869077634'],
                };
                const allResults = [];
                const pager = new SecretsManagerV2.SecretsLocksPager(secretsManagerService, params);
                while (pager.hasNext()) {
                    const nextPage = await pager.getNext();
                    expect(nextPage).not.toBeNull();
                    allResults.push(...nextPage);
                }
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });

            test('getAll()', async () => {
                const params = {
                    limit: 10,
                    search: 'example',
                    groups: ['default', 'cac40995-c37a-4dcb-9506-472869077634'],
                };
                const pager = new SecretsManagerV2.SecretsLocksPager(secretsManagerService, params);
                const allResults = await pager.getAll();
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });
        });
    });

    describe('listSecretLocks', () => {
        describe('positive tests', () => {
            function __listSecretLocksTest() {
                // Construct the params object for operation listSecretLocks
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const offset = 0;
                const limit = 25;
                const sort = 'name';
                const search = 'example';
                const listSecretLocksParams = {
                    id,
                    offset,
                    limit,
                    sort,
                    search,
                };

                const listSecretLocksResult = secretsManagerService.listSecretLocks(listSecretLocksParams);

                // all methods should return a Promise
                expectToBePromise(listSecretLocksResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}/locks', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.qs.offset).toEqual(offset);
                expect(mockRequestOptions.qs.limit).toEqual(limit);
                expect(mockRequestOptions.qs.sort).toEqual(sort);
                expect(mockRequestOptions.qs.search).toEqual(search);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __listSecretLocksTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __listSecretLocksTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __listSecretLocksTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const listSecretLocksParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.listSecretLocks(listSecretLocksParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.listSecretLocks({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.listSecretLocks();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });

        describe('SecretLocksPager tests', () => {
            const serviceUrl = secretsManagerServiceOptions.url;
            const path = '/api/v2/secrets/0b5571f7-21e6-42b7-91c5-3f5ac9793a46/locks';
            const mockPagerResponse1 =
                '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"locks":[{"name":"lock-example","description":"description","attributes":{"anyKey":"anyValue"},"created_at":"2022-04-12T23:20:50.520Z","updated_at":"2022-04-12T23:20:50.520Z","created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","secret_group_id":"default","secret_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_alias":"current"}]}';
            const mockPagerResponse2 =
                '{"total_count":2,"limit":1,"locks":[{"name":"lock-example","description":"description","attributes":{"anyKey":"anyValue"},"created_at":"2022-04-12T23:20:50.520Z","updated_at":"2022-04-12T23:20:50.520Z","created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","secret_group_id":"default","secret_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_alias":"current"}]}';

            beforeEach(() => {
                unmock_createRequest();
                const scope = nock(serviceUrl)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse1)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse2);
            });

            afterEach(() => {
                nock.cleanAll();
                mock_createRequest();
            });

            test('getNext()', async () => {
                const params = {
                    id: '0b5571f7-21e6-42b7-91c5-3f5ac9793a46',
                    limit: 10,
                    sort: 'name',
                    search: 'example',
                };
                const allResults = [];
                const pager = new SecretsManagerV2.SecretLocksPager(secretsManagerService, params);
                while (pager.hasNext()) {
                    const nextPage = await pager.getNext();
                    expect(nextPage).not.toBeNull();
                    allResults.push(...nextPage);
                }
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });

            test('getAll()', async () => {
                const params = {
                    id: '0b5571f7-21e6-42b7-91c5-3f5ac9793a46',
                    limit: 10,
                    sort: 'name',
                    search: 'example',
                };
                const pager = new SecretsManagerV2.SecretLocksPager(secretsManagerService, params);
                const allResults = await pager.getAll();
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });
        });
    });

    describe('createSecretLocksBulk', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // SecretLockPrototype
            const secretLockPrototypeModel = {
                name: 'lock-example-1',
                description: 'lock for consumer 1',
                attributes: {key: 'value'},
            };

            function __createSecretLocksBulkTest() {
                // Construct the params object for operation createSecretLocksBulk
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const locks = [secretLockPrototypeModel];
                const mode = 'remove_previous';
                const createSecretLocksBulkParams = {
                    id,
                    locks,
                    mode,
                };

                const createSecretLocksBulkResult = secretsManagerService.createSecretLocksBulk(createSecretLocksBulkParams);

                // all methods should return a Promise
                expectToBePromise(createSecretLocksBulkResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}/locks_bulk', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body.locks).toEqual(locks);
                expect(mockRequestOptions.qs.mode).toEqual(mode);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createSecretLocksBulkTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createSecretLocksBulkTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createSecretLocksBulkTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const locks = [secretLockPrototypeModel];
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createSecretLocksBulkParams = {
                    id,
                    locks,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createSecretLocksBulk(createSecretLocksBulkParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretLocksBulk({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretLocksBulk();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('deleteSecretLocksBulk', () => {
        describe('positive tests', () => {
            function __deleteSecretLocksBulkTest() {
                // Construct the params object for operation deleteSecretLocksBulk
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const name = ['lock-example-1'];
                const deleteSecretLocksBulkParams = {
                    id,
                    name,
                };

                const deleteSecretLocksBulkResult = secretsManagerService.deleteSecretLocksBulk(deleteSecretLocksBulkParams);

                // all methods should return a Promise
                expectToBePromise(deleteSecretLocksBulkResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{id}/locks_bulk', 'DELETE');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.qs.name).toEqual(name);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __deleteSecretLocksBulkTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __deleteSecretLocksBulkTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __deleteSecretLocksBulkTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const id = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const deleteSecretLocksBulkParams = {
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.deleteSecretLocksBulk(deleteSecretLocksBulkParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretLocksBulk({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretLocksBulk();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('listSecretVersionLocks', () => {
        describe('positive tests', () => {
            function __listSecretVersionLocksTest() {
                // Construct the params object for operation listSecretVersionLocks
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const offset = 0;
                const limit = 25;
                const sort = 'name';
                const search = 'example';
                const listSecretVersionLocksParams = {
                    secretId,
                    id,
                    offset,
                    limit,
                    sort,
                    search,
                };

                const listSecretVersionLocksResult = secretsManagerService.listSecretVersionLocks(listSecretVersionLocksParams);

                // all methods should return a Promise
                expectToBePromise(listSecretVersionLocksResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}/locks', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.qs.offset).toEqual(offset);
                expect(mockRequestOptions.qs.limit).toEqual(limit);
                expect(mockRequestOptions.qs.sort).toEqual(sort);
                expect(mockRequestOptions.qs.search).toEqual(search);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __listSecretVersionLocksTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __listSecretVersionLocksTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __listSecretVersionLocksTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const listSecretVersionLocksParams = {
                    secretId,
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.listSecretVersionLocks(listSecretVersionLocksParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.listSecretVersionLocks({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.listSecretVersionLocks();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });

        describe('SecretVersionLocksPager tests', () => {
            const serviceUrl = secretsManagerServiceOptions.url;
            const path = '/api/v2/secrets/0b5571f7-21e6-42b7-91c5-3f5ac9793a46/versions/eb4cf24d-9cae-424b-945e-159788a5f535/locks';
            const mockPagerResponse1 =
                '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"locks":[{"name":"lock-example","description":"description","attributes":{"anyKey":"anyValue"},"created_at":"2022-04-12T23:20:50.520Z","updated_at":"2022-04-12T23:20:50.520Z","created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","secret_group_id":"default","secret_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_alias":"current"}]}';
            const mockPagerResponse2 =
                '{"total_count":2,"limit":1,"locks":[{"name":"lock-example","description":"description","attributes":{"anyKey":"anyValue"},"created_at":"2022-04-12T23:20:50.520Z","updated_at":"2022-04-12T23:20:50.520Z","created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","secret_group_id":"default","secret_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_id":"b49ad24d-81d4-5ebc-b9b9-b0937d1c84d5","secret_version_alias":"current"}]}';

            beforeEach(() => {
                unmock_createRequest();
                const scope = nock(serviceUrl)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse1)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse2);
            });

            afterEach(() => {
                nock.cleanAll();
                mock_createRequest();
            });

            test('getNext()', async () => {
                const params = {
                    secretId: '0b5571f7-21e6-42b7-91c5-3f5ac9793a46',
                    id: 'eb4cf24d-9cae-424b-945e-159788a5f535',
                    limit: 10,
                    sort: 'name',
                    search: 'example',
                };
                const allResults = [];
                const pager = new SecretsManagerV2.SecretVersionLocksPager(secretsManagerService, params);
                while (pager.hasNext()) {
                    const nextPage = await pager.getNext();
                    expect(nextPage).not.toBeNull();
                    allResults.push(...nextPage);
                }
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });

            test('getAll()', async () => {
                const params = {
                    secretId: '0b5571f7-21e6-42b7-91c5-3f5ac9793a46',
                    id: 'eb4cf24d-9cae-424b-945e-159788a5f535',
                    limit: 10,
                    sort: 'name',
                    search: 'example',
                };
                const pager = new SecretsManagerV2.SecretVersionLocksPager(secretsManagerService, params);
                const allResults = await pager.getAll();
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });
        });
    });

    describe('createSecretVersionLocksBulk', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // SecretLockPrototype
            const secretLockPrototypeModel = {
                name: 'lock-example-1',
                description: 'lock for consumer 1',
                attributes: {key: 'value'},
            };

            function __createSecretVersionLocksBulkTest() {
                // Construct the params object for operation createSecretVersionLocksBulk
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const locks = [secretLockPrototypeModel];
                const mode = 'remove_previous';
                const createSecretVersionLocksBulkParams = {
                    secretId,
                    id,
                    locks,
                    mode,
                };

                const createSecretVersionLocksBulkResult = secretsManagerService.createSecretVersionLocksBulk(createSecretVersionLocksBulkParams);

                // all methods should return a Promise
                expectToBePromise(createSecretVersionLocksBulkResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}/locks_bulk', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body.locks).toEqual(locks);
                expect(mockRequestOptions.qs.mode).toEqual(mode);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createSecretVersionLocksBulkTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createSecretVersionLocksBulkTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createSecretVersionLocksBulkTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const locks = [secretLockPrototypeModel];
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createSecretVersionLocksBulkParams = {
                    secretId,
                    id,
                    locks,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createSecretVersionLocksBulk(createSecretVersionLocksBulkParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretVersionLocksBulk({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createSecretVersionLocksBulk();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('deleteSecretVersionLocksBulk', () => {
        describe('positive tests', () => {
            function __deleteSecretVersionLocksBulkTest() {
                // Construct the params object for operation deleteSecretVersionLocksBulk
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const name = ['lock-example-1'];
                const deleteSecretVersionLocksBulkParams = {
                    secretId,
                    id,
                    name,
                };

                const deleteSecretVersionLocksBulkResult = secretsManagerService.deleteSecretVersionLocksBulk(deleteSecretVersionLocksBulkParams);

                // all methods should return a Promise
                expectToBePromise(deleteSecretVersionLocksBulkResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/secrets/{secret_id}/versions/{id}/locks_bulk', 'DELETE');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.qs.name).toEqual(name);
                expect(mockRequestOptions.path.secret_id).toEqual(secretId);
                expect(mockRequestOptions.path.id).toEqual(id);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __deleteSecretVersionLocksBulkTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __deleteSecretVersionLocksBulkTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __deleteSecretVersionLocksBulkTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const secretId = '0b5571f7-21e6-42b7-91c5-3f5ac9793a46';
                const id = 'eb4cf24d-9cae-424b-945e-159788a5f535';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const deleteSecretVersionLocksBulkParams = {
                    secretId,
                    id,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.deleteSecretVersionLocksBulk(deleteSecretVersionLocksBulkParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretVersionLocksBulk({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.deleteSecretVersionLocksBulk();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('createConfiguration', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // PublicCertificateConfigurationDNSCloudInternetServicesPrototype
            const configurationPrototypeModel = {
                config_type: 'public_cert_configuration_dns_cloud_internet_services',
                name: 'example-cloud-internet-services-config',
                cloud_internet_services_apikey: '5ipu_ykv0PMp2MhxQnDMn7VzrkSlBwi3BOI8uthi_EXZ',
                cloud_internet_services_crn: 'crn:v1:bluemix:public:internet-svcs:global:a/128e84fcca45c1224aae525d31ef2b52:009a0357-1460-42b4-b903-10580aba7dd8::',
            };

            function __createConfigurationTest() {
                // Construct the params object for operation createConfiguration
                const configurationPrototype = configurationPrototypeModel;
                const createConfigurationParams = {
                    configurationPrototype,
                };

                const createConfigurationResult = secretsManagerService.createConfiguration(createConfigurationParams);

                // all methods should return a Promise
                expectToBePromise(createConfigurationResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/configurations', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body).toEqual(configurationPrototype);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createConfigurationTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createConfigurationTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createConfigurationTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const configurationPrototype = configurationPrototypeModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createConfigurationParams = {
                    configurationPrototype,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createConfiguration(createConfigurationParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createConfiguration({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createConfiguration();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('listConfigurations', () => {
        describe('positive tests', () => {
            function __listConfigurationsTest() {
                // Construct the params object for operation listConfigurations
                const offset = 0;
                const limit = 200;
                const sort = 'config_type';
                const search = 'example';
                const secretTypes = ['iam_credentials', 'public_cert', 'private_cert'];
                const listConfigurationsParams = {
                    offset,
                    limit,
                    sort,
                    search,
                    secretTypes,
                };

                const listConfigurationsResult = secretsManagerService.listConfigurations(listConfigurationsParams);

                // all methods should return a Promise
                expectToBePromise(listConfigurationsResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/configurations', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.qs.offset).toEqual(offset);
                expect(mockRequestOptions.qs.limit).toEqual(limit);
                expect(mockRequestOptions.qs.sort).toEqual(sort);
                expect(mockRequestOptions.qs.search).toEqual(search);
                expect(mockRequestOptions.qs.secret_types).toEqual(secretTypes);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __listConfigurationsTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __listConfigurationsTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __listConfigurationsTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const listConfigurationsParams = {
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.listConfigurations(listConfigurationsParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });

            test('should not have any problems when no parameters are passed in', () => {
                // invoke the method with no parameters
                secretsManagerService.listConfigurations({});
                checkForSuccessfulExecution(createRequestMock);
            });
        });

        describe('ConfigurationsPager tests', () => {
            const serviceUrl = secretsManagerServiceOptions.url;
            const path = '/api/v2/configurations';
            const mockPagerResponse1 =
                '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"configurations":[{"config_type":"iam_credentials_configuration","name":"my-secret-engine-config","secret_type":"arbitrary","created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","created_at":"2022-04-12T23:20:50.520Z","updated_at":"2022-04-12T23:20:50.520Z","disabled":true}],"limit":1}';
            const mockPagerResponse2 =
                '{"total_count":2,"configurations":[{"config_type":"iam_credentials_configuration","name":"my-secret-engine-config","secret_type":"arbitrary","created_by":"iam-ServiceId-e4a2f0a4-3c76-4bef-b1f2-fbeae11c0f21","created_at":"2022-04-12T23:20:50.520Z","updated_at":"2022-04-12T23:20:50.520Z","disabled":true}],"limit":1}';

            beforeEach(() => {
                unmock_createRequest();
                const scope = nock(serviceUrl)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse1)
                    .get((uri) => uri.includes(path))
                    .reply(200, mockPagerResponse2);
            });

            afterEach(() => {
                nock.cleanAll();
                mock_createRequest();
            });

            test('getNext()', async () => {
                const params = {
                    limit: 10,
                    sort: 'config_type',
                    search: 'example',
                    secretTypes: ['iam_credentials', 'public_cert', 'private_cert'],
                };
                const allResults = [];
                const pager = new SecretsManagerV2.ConfigurationsPager(secretsManagerService, params);
                while (pager.hasNext()) {
                    const nextPage = await pager.getNext();
                    expect(nextPage).not.toBeNull();
                    allResults.push(...nextPage);
                }
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });

            test('getAll()', async () => {
                const params = {
                    limit: 10,
                    sort: 'config_type',
                    search: 'example',
                    secretTypes: ['iam_credentials', 'public_cert', 'private_cert'],
                };
                const pager = new SecretsManagerV2.ConfigurationsPager(secretsManagerService, params);
                const allResults = await pager.getAll();
                expect(allResults).not.toBeNull();
                expect(allResults).toHaveLength(2);
            });
        });
    });

    describe('getConfiguration', () => {
        describe('positive tests', () => {
            function __getConfigurationTest() {
                // Construct the params object for operation getConfiguration
                const name = 'configuration-name';
                const xSmAcceptConfigurationType = 'public_cert_configuration_dns_cloud_internet_services';
                const getConfigurationParams = {
                    name,
                    xSmAcceptConfigurationType,
                };

                const getConfigurationResult = secretsManagerService.getConfiguration(getConfigurationParams);

                // all methods should return a Promise
                expectToBePromise(getConfigurationResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/configurations/{name}', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                checkUserHeader(createRequestMock, 'X-Sm-Accept-Configuration-Type', xSmAcceptConfigurationType);
                expect(mockRequestOptions.path.name).toEqual(name);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getConfigurationTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getConfigurationTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getConfigurationTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const name = 'configuration-name';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getConfigurationParams = {
                    name,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getConfiguration(getConfigurationParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.getConfiguration({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.getConfiguration();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('updateConfiguration', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // PublicCertificateConfigurationDNSCloudInternetServicesPatch
            const configurationPatchModel = {
                cloud_internet_services_apikey: '5ipu_ykv0PMp2MhxQnDMn7VzrkSlBwi3BOI8uthi_EXZ',
                cloud_internet_services_crn: 'crn:v1:bluemix:public:internet-svcs:global:a/128e84fcca45c1224aae525d31ef2b52:009a0357-1460-42b4-b903-10580aba7dd8::',
            };

            function __updateConfigurationTest() {
                // Construct the params object for operation updateConfiguration
                const name = 'configuration-name';
                const configurationPatch = configurationPatchModel;
                const xSmAcceptConfigurationType = 'public_cert_configuration_dns_cloud_internet_services';
                const updateConfigurationParams = {
                    name,
                    configurationPatch,
                    xSmAcceptConfigurationType,
                };

                const updateConfigurationResult = secretsManagerService.updateConfiguration(updateConfigurationParams);

                // all methods should return a Promise
                expectToBePromise(updateConfigurationResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/configurations/{name}', 'PATCH');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/merge-patch+json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                checkUserHeader(createRequestMock, 'X-Sm-Accept-Configuration-Type', xSmAcceptConfigurationType);
                expect(mockRequestOptions.body).toEqual(configurationPatch);
                expect(mockRequestOptions.path.name).toEqual(name);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __updateConfigurationTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __updateConfigurationTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __updateConfigurationTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const name = 'configuration-name';
                const configurationPatch = configurationPatchModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const updateConfigurationParams = {
                    name,
                    configurationPatch,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.updateConfiguration(updateConfigurationParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.updateConfiguration({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.updateConfiguration();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('deleteConfiguration', () => {
        describe('positive tests', () => {
            function __deleteConfigurationTest() {
                // Construct the params object for operation deleteConfiguration
                const name = 'configuration-name';
                const xSmAcceptConfigurationType = 'public_cert_configuration_dns_cloud_internet_services';
                const deleteConfigurationParams = {
                    name,
                    xSmAcceptConfigurationType,
                };

                const deleteConfigurationResult = secretsManagerService.deleteConfiguration(deleteConfigurationParams);

                // all methods should return a Promise
                expectToBePromise(deleteConfigurationResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/configurations/{name}', 'DELETE');
                const expectedAccept = undefined;
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                checkUserHeader(createRequestMock, 'X-Sm-Accept-Configuration-Type', xSmAcceptConfigurationType);
                expect(mockRequestOptions.path.name).toEqual(name);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __deleteConfigurationTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __deleteConfigurationTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __deleteConfigurationTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const name = 'configuration-name';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const deleteConfigurationParams = {
                    name,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.deleteConfiguration(deleteConfigurationParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.deleteConfiguration({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.deleteConfiguration();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('createConfigurationAction', () => {
        describe('positive tests', () => {
            // Request models needed by this operation.

            // PrivateCertificateConfigurationActionRotateCRLPrototype
            const configurationActionPrototypeModel = {
                action_type: 'private_cert_configuration_action_rotate_crl',
            };

            function __createConfigurationActionTest() {
                // Construct the params object for operation createConfigurationAction
                const name = 'configuration-name';
                const configActionPrototype = configurationActionPrototypeModel;
                const xSmAcceptConfigurationType = 'public_cert_configuration_dns_cloud_internet_services';
                const createConfigurationActionParams = {
                    name,
                    configActionPrototype,
                    xSmAcceptConfigurationType,
                };

                const createConfigurationActionResult = secretsManagerService.createConfigurationAction(createConfigurationActionParams);

                // all methods should return a Promise
                expectToBePromise(createConfigurationActionResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/configurations/{name}/actions', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                checkUserHeader(createRequestMock, 'X-Sm-Accept-Configuration-Type', xSmAcceptConfigurationType);
                expect(mockRequestOptions.body).toEqual(configActionPrototype);
                expect(mockRequestOptions.path.name).toEqual(name);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createConfigurationActionTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createConfigurationActionTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createConfigurationActionTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const name = 'configuration-name';
                const configActionPrototype = configurationActionPrototypeModel;
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createConfigurationActionParams = {
                    name,
                    configActionPrototype,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createConfigurationAction(createConfigurationActionParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createConfigurationAction({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createConfigurationAction();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('createNotificationsRegistration', () => {
        describe('positive tests', () => {
            function __createNotificationsRegistrationTest() {
                // Construct the params object for operation createNotificationsRegistration
                const eventNotificationsInstanceCrn = 'crn:v1:bluemix:public:event-notifications:us-south:a/22018f3c34ff4ff193698d15ca316946:578ad1a4-2fd8-4e66-95d5-79a842ba91f8::';
                const eventNotificationsSourceName = 'My Secrets Manager';
                const eventNotificationsSourceDescription = 'Optional description of this source in an Event Notifications instance.';
                const createNotificationsRegistrationParams = {
                    eventNotificationsInstanceCrn,
                    eventNotificationsSourceName,
                    eventNotificationsSourceDescription,
                };

                const createNotificationsRegistrationResult = secretsManagerService.createNotificationsRegistration(createNotificationsRegistrationParams);

                // all methods should return a Promise
                expectToBePromise(createNotificationsRegistrationResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/notifications/registration', 'POST');
                const expectedAccept = 'application/json';
                const expectedContentType = 'application/json';
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
                expect(mockRequestOptions.body.event_notifications_instance_crn).toEqual(eventNotificationsInstanceCrn);
                expect(mockRequestOptions.body.event_notifications_source_name).toEqual(eventNotificationsSourceName);
                expect(mockRequestOptions.body.event_notifications_source_description).toEqual(eventNotificationsSourceDescription);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __createNotificationsRegistrationTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __createNotificationsRegistrationTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __createNotificationsRegistrationTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const eventNotificationsInstanceCrn = 'crn:v1:bluemix:public:event-notifications:us-south:a/22018f3c34ff4ff193698d15ca316946:578ad1a4-2fd8-4e66-95d5-79a842ba91f8::';
                const eventNotificationsSourceName = 'My Secrets Manager';
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const createNotificationsRegistrationParams = {
                    eventNotificationsInstanceCrn,
                    eventNotificationsSourceName,
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.createNotificationsRegistration(createNotificationsRegistrationParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });
        });

        describe('negative tests', () => {
            test('should enforce required parameters', async () => {
                let err;
                try {
                    await secretsManagerService.createNotificationsRegistration({});
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });

            test('should reject promise when required params are not given', async () => {
                let err;
                try {
                    await secretsManagerService.createNotificationsRegistration();
                } catch (e) {
                    err = e;
                }

                expect(err.message).toMatch(/Missing required parameters/);
            });
        });
    });

    describe('getNotificationsRegistration', () => {
        describe('positive tests', () => {
            function __getNotificationsRegistrationTest() {
                // Construct the params object for operation getNotificationsRegistration
                const getNotificationsRegistrationParams = {};

                const getNotificationsRegistrationResult = secretsManagerService.getNotificationsRegistration(getNotificationsRegistrationParams);

                // all methods should return a Promise
                expectToBePromise(getNotificationsRegistrationResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/notifications/registration', 'GET');
                const expectedAccept = 'application/json';
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getNotificationsRegistrationTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getNotificationsRegistrationTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getNotificationsRegistrationTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getNotificationsRegistrationParams = {
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getNotificationsRegistration(getNotificationsRegistrationParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });

            test('should not have any problems when no parameters are passed in', () => {
                // invoke the method with no parameters
                secretsManagerService.getNotificationsRegistration({});
                checkForSuccessfulExecution(createRequestMock);
            });
        });
    });

    describe('deleteNotificationsRegistration', () => {
        describe('positive tests', () => {
            function __deleteNotificationsRegistrationTest() {
                // Construct the params object for operation deleteNotificationsRegistration
                const deleteNotificationsRegistrationParams = {};

                const deleteNotificationsRegistrationResult = secretsManagerService.deleteNotificationsRegistration(deleteNotificationsRegistrationParams);

                // all methods should return a Promise
                expectToBePromise(deleteNotificationsRegistrationResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/notifications/registration', 'DELETE');
                const expectedAccept = undefined;
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __deleteNotificationsRegistrationTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __deleteNotificationsRegistrationTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __deleteNotificationsRegistrationTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const deleteNotificationsRegistrationParams = {
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.deleteNotificationsRegistration(deleteNotificationsRegistrationParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });

            test('should not have any problems when no parameters are passed in', () => {
                // invoke the method with no parameters
                secretsManagerService.deleteNotificationsRegistration({});
                checkForSuccessfulExecution(createRequestMock);
            });
        });
    });

    describe('getNotificationsRegistrationTest', () => {
        describe('positive tests', () => {
            function __getNotificationsRegistrationTestTest() {
                // Construct the params object for operation getNotificationsRegistrationTest
                const getNotificationsRegistrationTestParams = {};

                const getNotificationsRegistrationTestResult = secretsManagerService.getNotificationsRegistrationTest(getNotificationsRegistrationTestParams);

                // all methods should return a Promise
                expectToBePromise(getNotificationsRegistrationTestResult);

                // assert that create request was called
                expect(createRequestMock).toHaveBeenCalledTimes(1);

                const mockRequestOptions = getOptions(createRequestMock);

                checkUrlAndMethod(mockRequestOptions, '/api/v2/notifications/registration/test', 'GET');
                const expectedAccept = undefined;
                const expectedContentType = undefined;
                checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
            }

            test('should pass the right params to createRequest with enable and disable retries', () => {
                // baseline test
                __getNotificationsRegistrationTestTest();

                // enable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.enableRetries();
                __getNotificationsRegistrationTestTest();

                // disable retries and test again
                createRequestMock.mockClear();
                secretsManagerService.disableRetries();
                __getNotificationsRegistrationTestTest();
            });

            test('should prioritize user-given headers', () => {
                // parameters
                const userAccept = 'fake/accept';
                const userContentType = 'fake/contentType';
                const getNotificationsRegistrationTestParams = {
                    headers: {
                        Accept: userAccept,
                        'Content-Type': userContentType,
                    },
                };

                secretsManagerService.getNotificationsRegistrationTest(getNotificationsRegistrationTestParams);
                checkMediaHeaders(createRequestMock, userAccept, userContentType);
            });

            test('should not have any problems when no parameters are passed in', () => {
                // invoke the method with no parameters
                secretsManagerService.getNotificationsRegistrationTest({});
                checkForSuccessfulExecution(createRequestMock);
            });
        });
    });
});
