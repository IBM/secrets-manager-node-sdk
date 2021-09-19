/**
 * (C) Copyright IBM Corp. 2021.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const SecretsManagerV1 = require('../../dist/secrets-manager/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const secretsManagerServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://secrets-manager.cloud.ibm.com',
};

const secretsManagerService = new SecretsManagerV1(secretsManagerServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(secretsManagerService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('SecretsManagerV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = SecretsManagerV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(SecretsManagerV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(SecretsManagerV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(SecretsManagerV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = SecretsManagerV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(SecretsManagerV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new SecretsManagerV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new SecretsManagerV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(SecretsManagerV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('createSecretGroup', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CollectionMetadata
      const collectionMetadataModel = {
        collection_type: 'application/vnd.ibm.secrets-manager.secret.group+json',
        collection_total: 1,
      };

      // SecretGroupResource
      const secretGroupResourceModel = {
        name: 'my-secret-group',
        description: 'Extended description for this group.',
        foo: 'testString',
      };

      function __createSecretGroupTest() {
        // Construct the params object for operation createSecretGroup
        const metadata = collectionMetadataModel;
        const resources = [secretGroupResourceModel];
        const params = {
          metadata,
          resources,
        };

        const createSecretGroupResult = secretsManagerService.createSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(createSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secret_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.resources).toEqual(resources);
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
        const metadata = collectionMetadataModel;
        const resources = [secretGroupResourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          metadata,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.createSecretGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.createSecretGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createSecretGroupPromise = secretsManagerService.createSecretGroup();
        expectToBePromise(createSecretGroupPromise);

        createSecretGroupPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecretGroups', () => {
    describe('positive tests', () => {
      function __listSecretGroupsTest() {
        // Construct the params object for operation listSecretGroups
        const params = {};

        const listSecretGroupsResult = secretsManagerService.listSecretGroups(params);

        // all methods should return a Promise
        expectToBePromise(listSecretGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secret_groups', 'GET');
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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.listSecretGroups(params);
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
        const id = 'testString';
        const params = {
          id,
        };

        const getSecretGroupResult = secretsManagerService.getSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(getSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secret_groups/{id}', 'GET');
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getSecretGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getSecretGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSecretGroupPromise = secretsManagerService.getSecretGroup();
        expectToBePromise(getSecretGroupPromise);

        getSecretGroupPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSecretGroupMetadata', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CollectionMetadata
      const collectionMetadataModel = {
        collection_type: 'application/vnd.ibm.secrets-manager.secret.group+json',
        collection_total: 1,
      };

      // SecretGroupMetadataUpdatable
      const secretGroupMetadataUpdatableModel = {
        name: 'updated-secret-group-name',
        description: 'Updated description for this group.',
      };

      function __updateSecretGroupMetadataTest() {
        // Construct the params object for operation updateSecretGroupMetadata
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretGroupMetadataUpdatableModel];
        const params = {
          id,
          metadata,
          resources,
        };

        const updateSecretGroupMetadataResult =
          secretsManagerService.updateSecretGroupMetadata(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretGroupMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secret_groups/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSecretGroupMetadataTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __updateSecretGroupMetadataTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __updateSecretGroupMetadataTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretGroupMetadataUpdatableModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          metadata,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.updateSecretGroupMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.updateSecretGroupMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateSecretGroupMetadataPromise = secretsManagerService.updateSecretGroupMetadata();
        expectToBePromise(updateSecretGroupMetadataPromise);

        updateSecretGroupMetadataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecretGroup', () => {
    describe('positive tests', () => {
      function __deleteSecretGroupTest() {
        // Construct the params object for operation deleteSecretGroup
        const id = 'testString';
        const params = {
          id,
        };

        const deleteSecretGroupResult = secretsManagerService.deleteSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secret_groups/{id}', 'DELETE');
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
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.deleteSecretGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.deleteSecretGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteSecretGroupPromise = secretsManagerService.deleteSecretGroup();
        expectToBePromise(deleteSecretGroupPromise);

        deleteSecretGroupPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createSecret', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CollectionMetadata
      const collectionMetadataModel = {
        collection_type: 'application/vnd.ibm.secrets-manager.config+json',
        collection_total: 1,
      };

      // ArbitrarySecretResource
      const secretResourceModel = {
        name: 'testString',
        description: 'testString',
        secret_group_id: 'testString',
        labels: ['testString'],
        expiration_date: '2030-04-01T09:30:00.000Z',
        payload: 'testString',
      };

      function __createSecretTest() {
        // Construct the params object for operation createSecret
        const secretType = 'arbitrary';
        const metadata = collectionMetadataModel;
        const resources = [secretResourceModel];
        const params = {
          secretType,
          metadata,
          resources,
        };

        const createSecretResult = secretsManagerService.createSecret(params);

        // all methods should return a Promise
        expectToBePromise(createSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
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
        const secretType = 'arbitrary';
        const metadata = collectionMetadataModel;
        const resources = [secretResourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          metadata,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.createSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.createSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createSecretPromise = secretsManagerService.createSecret();
        expectToBePromise(createSecretPromise);

        createSecretPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecrets', () => {
    describe('positive tests', () => {
      function __listSecretsTest() {
        // Construct the params object for operation listSecrets
        const secretType = 'arbitrary';
        const limit = 1;
        const offset = 0;
        const params = {
          secretType,
          limit,
          offset,
        };

        const listSecretsResult = secretsManagerService.listSecrets(params);

        // all methods should return a Promise
        expectToBePromise(listSecretsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
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
        const secretType = 'arbitrary';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.listSecrets(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.listSecrets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const listSecretsPromise = secretsManagerService.listSecrets();
        expectToBePromise(listSecretsPromise);

        listSecretsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listAllSecrets', () => {
    describe('positive tests', () => {
      function __listAllSecretsTest() {
        // Construct the params object for operation listAllSecrets
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const sortBy = 'id';
        const groups = ['testString'];
        const params = {
          limit,
          offset,
          search,
          sortBy,
          groups,
        };

        const listAllSecretsResult = secretsManagerService.listAllSecrets(params);

        // all methods should return a Promise
        expectToBePromise(listAllSecretsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.qs.sort_by).toEqual(sortBy);
        expect(mockRequestOptions.qs.groups).toEqual(groups);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAllSecretsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __listAllSecretsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __listAllSecretsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.listAllSecrets(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        secretsManagerService.listAllSecrets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getSecret', () => {
    describe('positive tests', () => {
      function __getSecretTest() {
        // Construct the params object for operation getSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType,
          id,
        };

        const getSecretResult = secretsManagerService.getSecret(params);

        // all methods should return a Promise
        expectToBePromise(getSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSecretPromise = secretsManagerService.getSecret();
        expectToBePromise(getSecretPromise);

        getSecretPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSecret', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RotateArbitrarySecretBody
      const secretActionModel = {
        payload: 'testString',
      };

      function __updateSecretTest() {
        // Construct the params object for operation updateSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const action = 'rotate';
        const secretAction = secretActionModel;
        const params = {
          secretType,
          id,
          action,
          secretAction,
        };

        const updateSecretResult = secretsManagerService.updateSecret(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(secretAction);
        expect(mockRequestOptions.qs.action).toEqual(action);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSecretTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __updateSecretTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __updateSecretTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const action = 'rotate';
        const secretAction = secretActionModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          action,
          secretAction,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.updateSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.updateSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateSecretPromise = secretsManagerService.updateSecret();
        expectToBePromise(updateSecretPromise);

        updateSecretPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecret', () => {
    describe('positive tests', () => {
      function __deleteSecretTest() {
        // Construct the params object for operation deleteSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType,
          id,
        };

        const deleteSecretResult = secretsManagerService.deleteSecret(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.deleteSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.deleteSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteSecretPromise = secretsManagerService.deleteSecret();
        expectToBePromise(deleteSecretPromise);

        deleteSecretPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecretVersion', () => {
    describe('positive tests', () => {
      function __getSecretVersionTest() {
        // Construct the params object for operation getSecretVersion
        const secretType = 'imported_cert';
        const id = 'testString';
        const versionId = 'testString';
        const params = {
          secretType,
          id,
          versionId,
        };

        const getSecretVersionResult = secretsManagerService.getSecretVersion(params);

        // all methods should return a Promise
        expectToBePromise(getSecretVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/secrets/{secret_type}/{id}/versions/{version_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version_id).toEqual(versionId);
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
        const secretType = 'imported_cert';
        const id = 'testString';
        const versionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          versionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getSecretVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getSecretVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSecretVersionPromise = secretsManagerService.getSecretVersion();
        expectToBePromise(getSecretVersionPromise);

        getSecretVersionPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecretVersionMetadata', () => {
    describe('positive tests', () => {
      function __getSecretVersionMetadataTest() {
        // Construct the params object for operation getSecretVersionMetadata
        const secretType = 'imported_cert';
        const id = 'testString';
        const versionId = 'testString';
        const params = {
          secretType,
          id,
          versionId,
        };

        const getSecretVersionMetadataResult =
          secretsManagerService.getSecretVersionMetadata(params);

        // all methods should return a Promise
        expectToBePromise(getSecretVersionMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/secrets/{secret_type}/{id}/versions/{version_id}/metadata',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version_id).toEqual(versionId);
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
        const secretType = 'imported_cert';
        const id = 'testString';
        const versionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          versionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getSecretVersionMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getSecretVersionMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSecretVersionMetadataPromise = secretsManagerService.getSecretVersionMetadata();
        expectToBePromise(getSecretVersionMetadataPromise);

        getSecretVersionMetadataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecretMetadata', () => {
    describe('positive tests', () => {
      function __getSecretMetadataTest() {
        // Construct the params object for operation getSecretMetadata
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType,
          id,
        };

        const getSecretMetadataResult = secretsManagerService.getSecretMetadata(params);

        // all methods should return a Promise
        expectToBePromise(getSecretMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}/metadata', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getSecretMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getSecretMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSecretMetadataPromise = secretsManagerService.getSecretMetadata();
        expectToBePromise(getSecretMetadataPromise);

        getSecretMetadataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSecretMetadata', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CollectionMetadata
      const collectionMetadataModel = {
        collection_type: 'application/vnd.ibm.secrets-manager.config+json',
        collection_total: 1,
      };

      // ArbitrarySecretMetadata
      const secretMetadataModel = {
        labels: ['dev', 'us-south'],
        name: 'example-secret',
        description: 'Extended description for this secret.',
        expiration_date: '2030-04-01T09:30:00.000Z',
      };

      function __updateSecretMetadataTest() {
        // Construct the params object for operation updateSecretMetadata
        const secretType = 'arbitrary';
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretMetadataModel];
        const params = {
          secretType,
          id,
          metadata,
          resources,
        };

        const updateSecretMetadataResult = secretsManagerService.updateSecretMetadata(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}/metadata', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretMetadataModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          metadata,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.updateSecretMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.updateSecretMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateSecretMetadataPromise = secretsManagerService.updateSecretMetadata();
        expectToBePromise(updateSecretMetadataPromise);

        updateSecretMetadataPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CollectionMetadata
      const collectionMetadataModel = {
        collection_type: 'application/vnd.ibm.secrets-manager.config+json',
        collection_total: 1,
      };

      // SecretPolicyRotationRotationPolicyRotation
      const secretPolicyRotationRotationModel = {
        interval: 1,
        unit: 'day',
      };

      // SecretPolicyRotation
      const secretPolicyRotationModel = {
        type: 'application/vnd.ibm.secrets-manager.secret.policy+json',
        rotation: secretPolicyRotationRotationModel,
      };

      function __putPolicyTest() {
        // Construct the params object for operation putPolicy
        const secretType = 'username_password';
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretPolicyRotationModel];
        const policy = 'rotation';
        const params = {
          secretType,
          id,
          metadata,
          resources,
          policy,
        };

        const putPolicyResult = secretsManagerService.putPolicy(params);

        // all methods should return a Promise
        expectToBePromise(putPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}/policies', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.qs.policy).toEqual(policy);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __putPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __putPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'username_password';
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretPolicyRotationModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          metadata,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.putPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.putPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putPolicyPromise = secretsManagerService.putPolicy();
        expectToBePromise(putPolicyPromise);

        putPolicyPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPolicy', () => {
    describe('positive tests', () => {
      function __getPolicyTest() {
        // Construct the params object for operation getPolicy
        const secretType = 'username_password';
        const id = 'testString';
        const policy = 'rotation';
        const params = {
          secretType,
          id,
          policy,
        };

        const getPolicyResult = secretsManagerService.getPolicy(params);

        // all methods should return a Promise
        expectToBePromise(getPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}/policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.policy).toEqual(policy);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __getPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __getPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'username_password';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getPolicyPromise = secretsManagerService.getPolicy();
        expectToBePromise(getPolicyPromise);

        getPolicyPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putConfig', () => {
    describe('positive tests', () => {
      function __putConfigTest() {
        // Construct the params object for operation putConfig
        const secretType = 'iam_credentials';
        const apiKey = 'API_KEY';
        const params = {
          secretType,
          apiKey,
        };

        const putConfigResult = secretsManagerService.putConfig(params);

        // all methods should return a Promise
        expectToBePromise(putConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/config/{secret_type}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.api_key).toEqual(apiKey);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __putConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __putConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'iam_credentials';
        const apiKey = 'API_KEY';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          apiKey,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.putConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.putConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const putConfigPromise = secretsManagerService.putConfig();
        expectToBePromise(putConfigPromise);

        putConfigPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getConfig', () => {
    describe('positive tests', () => {
      function __getConfigTest() {
        // Construct the params object for operation getConfig
        const secretType = 'iam_credentials';
        const params = {
          secretType,
        };

        const getConfigResult = secretsManagerService.getConfig(params);

        // all methods should return a Promise
        expectToBePromise(getConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/config/{secret_type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __getConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __getConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'iam_credentials';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getConfigPromise = secretsManagerService.getConfig();
        expectToBePromise(getConfigPromise);

        getConfigPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createConfigElement', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigElementDefConfigLetsEncryptConfig
      const configElementDefConfigModel = {
        private_key: 'testString',
      };

      function __createConfigElementTest() {
        // Construct the params object for operation createConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const name = 'testString';
        const type = 'letsencrypt';
        const config = configElementDefConfigModel;
        const params = {
          secretType,
          configElement,
          name,
          type,
          config,
        };

        const createConfigElementResult = secretsManagerService.createConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(createConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/config/{secret_type}/{config_element}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.config).toEqual(config);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.config_element).toEqual(configElement);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createConfigElementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __createConfigElementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __createConfigElementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const name = 'testString';
        const type = 'letsencrypt';
        const config = configElementDefConfigModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          configElement,
          name,
          type,
          config,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.createConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.createConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createConfigElementPromise = secretsManagerService.createConfigElement();
        expectToBePromise(createConfigElementPromise);

        createConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getConfigElements', () => {
    describe('positive tests', () => {
      function __getConfigElementsTest() {
        // Construct the params object for operation getConfigElements
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const params = {
          secretType,
          configElement,
        };

        const getConfigElementsResult = secretsManagerService.getConfigElements(params);

        // all methods should return a Promise
        expectToBePromise(getConfigElementsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/config/{secret_type}/{config_element}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.config_element).toEqual(configElement);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigElementsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __getConfigElementsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __getConfigElementsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          configElement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getConfigElements(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getConfigElements({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getConfigElementsPromise = secretsManagerService.getConfigElements();
        expectToBePromise(getConfigElementsPromise);

        getConfigElementsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateConfigElement', () => {
    describe('positive tests', () => {
      function __updateConfigElementTest() {
        // Construct the params object for operation updateConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const type = 'letsencrypt';
        const config = { foo: 'bar' };
        const params = {
          secretType,
          configElement,
          configName,
          type,
          config,
        };

        const updateConfigElementResult = secretsManagerService.updateConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(updateConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/config/{secret_type}/{config_element}/{config_name}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.config).toEqual(config);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.config_element).toEqual(configElement);
        expect(mockRequestOptions.path.config_name).toEqual(configName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateConfigElementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __updateConfigElementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __updateConfigElementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const type = 'letsencrypt';
        const config = { foo: 'bar' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          configElement,
          configName,
          type,
          config,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.updateConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.updateConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateConfigElementPromise = secretsManagerService.updateConfigElement();
        expectToBePromise(updateConfigElementPromise);

        updateConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteConfigElement', () => {
    describe('positive tests', () => {
      function __deleteConfigElementTest() {
        // Construct the params object for operation deleteConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const params = {
          secretType,
          configElement,
          configName,
        };

        const deleteConfigElementResult = secretsManagerService.deleteConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(deleteConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/config/{secret_type}/{config_element}/{config_name}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.config_element).toEqual(configElement);
        expect(mockRequestOptions.path.config_name).toEqual(configName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteConfigElementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __deleteConfigElementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __deleteConfigElementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          configElement,
          configName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.deleteConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.deleteConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteConfigElementPromise = secretsManagerService.deleteConfigElement();
        expectToBePromise(deleteConfigElementPromise);

        deleteConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getConfigElement', () => {
    describe('positive tests', () => {
      function __getConfigElementTest() {
        // Construct the params object for operation getConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const params = {
          secretType,
          configElement,
          configName,
        };

        const getConfigElementResult = secretsManagerService.getConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(getConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/config/{secret_type}/{config_element}/{config_name}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.config_element).toEqual(configElement);
        expect(mockRequestOptions.path.config_name).toEqual(configName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConfigElementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __getConfigElementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __getConfigElementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          configElement,
          configName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getConfigElementPromise = secretsManagerService.getConfigElement();
        expectToBePromise(getConfigElementPromise);

        getConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
