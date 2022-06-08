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
  url: 'ibm.com/123456',
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
        const createSecretGroupParams = {
          metadata,
          resources,
        };

        const createSecretGroupResult =
          secretsManagerService.createSecretGroup(createSecretGroupParams);

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
        const createSecretGroupParams = {
          metadata,
          resources,
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

        const listSecretGroupsResult =
          secretsManagerService.listSecretGroups(listSecretGroupsParams);

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
        const id = 'testString';
        const getSecretGroupParams = {
          id,
        };

        const getSecretGroupResult = secretsManagerService.getSecretGroup(getSecretGroupParams);

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
        const updateSecretGroupMetadataParams = {
          id,
          metadata,
          resources,
        };

        const updateSecretGroupMetadataResult = secretsManagerService.updateSecretGroupMetadata(
          updateSecretGroupMetadataParams
        );

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
        const updateSecretGroupMetadataParams = {
          id,
          metadata,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.updateSecretGroupMetadata(updateSecretGroupMetadataParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.updateSecretGroupMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.updateSecretGroupMetadata();
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
        const id = 'testString';
        const deleteSecretGroupParams = {
          id,
        };

        const deleteSecretGroupResult =
          secretsManagerService.deleteSecretGroup(deleteSecretGroupParams);

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

      // CollectionMetadata
      const collectionMetadataModel = {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      };

      // ArbitrarySecretResource
      const secretResourceModel = {
        name: 'example-arbitrary-secret',
        description: 'Extended description for this secret.',
        secret_group_id: 'bc656587-8fda-4d05-9ad8-b1de1ec7e712',
        labels: ['dev', 'us-south'],
        expiration_date: '2030-01-01T00:00:00Z',
        payload: 'secret-data',
      };

      function __createSecretTest() {
        // Construct the params object for operation createSecret
        const secretType = 'arbitrary';
        const metadata = collectionMetadataModel;
        const resources = [secretResourceModel];
        const createSecretParams = {
          secretType,
          metadata,
          resources,
        };

        const createSecretResult = secretsManagerService.createSecret(createSecretParams);

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
        const createSecretParams = {
          secretType,
          metadata,
          resources,
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
        const secretType = 'arbitrary';
        const limit = 1;
        const offset = 0;
        const listSecretsParams = {
          secretType,
          limit,
          offset,
        };

        const listSecretsResult = secretsManagerService.listSecrets(listSecretsParams);

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
        const listSecretsParams = {
          secretType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.listSecrets(listSecretsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.listSecrets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.listSecrets();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        const listAllSecretsParams = {
          limit,
          offset,
          search,
          sortBy,
          groups,
        };

        const listAllSecretsResult = secretsManagerService.listAllSecrets(listAllSecretsParams);

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
        const listAllSecretsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.listAllSecrets(listAllSecretsParams);
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
        const getSecretParams = {
          secretType,
          id,
        };

        const getSecretResult = secretsManagerService.getSecret(getSecretParams);

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
        const getSecretParams = {
          secretType,
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
        const updateSecretParams = {
          secretType,
          id,
          action,
          secretAction,
        };

        const updateSecretResult = secretsManagerService.updateSecret(updateSecretParams);

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
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSecretParams = {
          secretType,
          id,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.updateSecret(updateSecretParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.updateSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.updateSecret();
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const deleteSecretParams = {
          secretType,
          id,
        };

        const deleteSecretResult = secretsManagerService.deleteSecret(deleteSecretParams);

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
        const deleteSecretParams = {
          secretType,
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
  describe('listSecretVersions', () => {
    describe('positive tests', () => {
      function __listSecretVersionsTest() {
        // Construct the params object for operation listSecretVersions
        const secretType = 'arbitrary';
        const id = 'testString';
        const listSecretVersionsParams = {
          secretType,
          id,
        };

        const listSecretVersionsResult =
          secretsManagerService.listSecretVersions(listSecretVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listSecretVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/secrets/{secret_type}/{id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSecretVersionsParams = {
          secretType,
          id,
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const getSecretVersionParams = {
          secretType,
          id,
          versionId,
        };

        const getSecretVersionResult =
          secretsManagerService.getSecretVersion(getSecretVersionParams);

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
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecretVersionParams = {
          secretType,
          id,
          versionId,
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
  describe('updateSecretVersion', () => {
    describe('positive tests', () => {
      function __updateSecretVersionTest() {
        // Construct the params object for operation updateSecretVersion
        const secretType = 'private_cert';
        const id = 'testString';
        const versionId = 'testString';
        const action = 'revoke';
        const updateSecretVersionParams = {
          secretType,
          id,
          versionId,
          action,
        };

        const updateSecretVersionResult =
          secretsManagerService.updateSecretVersion(updateSecretVersionParams);

        // all methods should return a Promise
        expectToBePromise(updateSecretVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/secrets/{secret_type}/{id}/versions/{version_id}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.action).toEqual(action);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version_id).toEqual(versionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSecretVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __updateSecretVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __updateSecretVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'private_cert';
        const id = 'testString';
        const versionId = 'testString';
        const action = 'revoke';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSecretVersionParams = {
          secretType,
          id,
          versionId,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.updateSecretVersion(updateSecretVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.updateSecretVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.updateSecretVersion();
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
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const getSecretVersionMetadataParams = {
          secretType,
          id,
          versionId,
        };

        const getSecretVersionMetadataResult = secretsManagerService.getSecretVersionMetadata(
          getSecretVersionMetadataParams
        );

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
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecretVersionMetadataParams = {
          secretType,
          id,
          versionId,
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
  describe('getSecretMetadata', () => {
    describe('positive tests', () => {
      function __getSecretMetadataTest() {
        // Construct the params object for operation getSecretMetadata
        const secretType = 'arbitrary';
        const id = 'testString';
        const getSecretMetadataParams = {
          secretType,
          id,
        };

        const getSecretMetadataResult =
          secretsManagerService.getSecretMetadata(getSecretMetadataParams);

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
        const getSecretMetadataParams = {
          secretType,
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

      // CollectionMetadata
      const collectionMetadataModel = {
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      };

      // ArbitrarySecretMetadata
      const secretMetadataModel = {
        labels: ['dev', 'us-south'],
        name: 'updated-secret-name',
        description: 'Updated description for this secret.',
        expiration_date: '2030-04-01T09:30:00Z',
      };

      function __updateSecretMetadataTest() {
        // Construct the params object for operation updateSecretMetadata
        const secretType = 'arbitrary';
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretMetadataModel];
        const updateSecretMetadataParams = {
          secretType,
          id,
          metadata,
          resources,
        };

        const updateSecretMetadataResult = secretsManagerService.updateSecretMetadata(
          updateSecretMetadataParams
        );

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
        const updateSecretMetadataParams = {
          secretType,
          id,
          metadata,
          resources,
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
  describe('getLocks', () => {
    describe('positive tests', () => {
      function __getLocksTest() {
        // Construct the params object for operation getLocks
        const secretType = 'arbitrary';
        const id = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const getLocksParams = {
          secretType,
          id,
          limit,
          offset,
          search,
        };

        const getLocksResult = secretsManagerService.getLocks(getLocksParams);

        // all methods should return a Promise
        expectToBePromise(getLocksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/locks/{secret_type}/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLocksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __getLocksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __getLocksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLocksParams = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getLocks(getLocksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.getLocks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.getLocks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('lockSecret', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LockSecretBodyLocksItem
      const lockSecretBodyLocksItemModel = {
        name: 'lock-1',
        description: 'lock for consumer-1',
        attributes: { foo: 'bar' },
      };

      function __lockSecretTest() {
        // Construct the params object for operation lockSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const locks = [lockSecretBodyLocksItemModel];
        const mode = 'exclusive';
        const lockSecretParams = {
          secretType,
          id,
          locks,
          mode,
        };

        const lockSecretResult = secretsManagerService.lockSecret(lockSecretParams);

        // all methods should return a Promise
        expectToBePromise(lockSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/locks/{secret_type}/{id}/lock', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.locks).toEqual(locks);
        expect(mockRequestOptions.qs.mode).toEqual(mode);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __lockSecretTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __lockSecretTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __lockSecretTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const lockSecretParams = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.lockSecret(lockSecretParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.lockSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.lockSecret();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('unlockSecret', () => {
    describe('positive tests', () => {
      function __unlockSecretTest() {
        // Construct the params object for operation unlockSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const locks = ['testString'];
        const unlockSecretParams = {
          secretType,
          id,
          locks,
        };

        const unlockSecretResult = secretsManagerService.unlockSecret(unlockSecretParams);

        // all methods should return a Promise
        expectToBePromise(unlockSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/locks/{secret_type}/{id}/unlock', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.locks).toEqual(locks);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unlockSecretTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __unlockSecretTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __unlockSecretTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unlockSecretParams = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.unlockSecret(unlockSecretParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.unlockSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.unlockSecret();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getSecretVersionLocks', () => {
    describe('positive tests', () => {
      function __getSecretVersionLocksTest() {
        // Construct the params object for operation getSecretVersionLocks
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const getSecretVersionLocksParams = {
          secretType,
          id,
          versionId,
          limit,
          offset,
          search,
        };

        const getSecretVersionLocksResult = secretsManagerService.getSecretVersionLocks(
          getSecretVersionLocksParams
        );

        // all methods should return a Promise
        expectToBePromise(getSecretVersionLocksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/locks/{secret_type}/{id}/versions/{version_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version_id).toEqual(versionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSecretVersionLocksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __getSecretVersionLocksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __getSecretVersionLocksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSecretVersionLocksParams = {
          secretType,
          id,
          versionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getSecretVersionLocks(getSecretVersionLocksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.getSecretVersionLocks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.getSecretVersionLocks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('lockSecretVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // LockSecretBodyLocksItem
      const lockSecretBodyLocksItemModel = {
        name: 'lock-1',
        description: 'lock for consumer-1',
        attributes: { foo: 'bar' },
      };

      function __lockSecretVersionTest() {
        // Construct the params object for operation lockSecretVersion
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const locks = [lockSecretBodyLocksItemModel];
        const mode = 'exclusive';
        const lockSecretVersionParams = {
          secretType,
          id,
          versionId,
          locks,
          mode,
        };

        const lockSecretVersionResult =
          secretsManagerService.lockSecretVersion(lockSecretVersionParams);

        // all methods should return a Promise
        expectToBePromise(lockSecretVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/locks/{secret_type}/{id}/versions/{version_id}/lock',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.locks).toEqual(locks);
        expect(mockRequestOptions.qs.mode).toEqual(mode);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version_id).toEqual(versionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __lockSecretVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __lockSecretVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __lockSecretVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const lockSecretVersionParams = {
          secretType,
          id,
          versionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.lockSecretVersion(lockSecretVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.lockSecretVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.lockSecretVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('unlockSecretVersion', () => {
    describe('positive tests', () => {
      function __unlockSecretVersionTest() {
        // Construct the params object for operation unlockSecretVersion
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const locks = ['testString'];
        const unlockSecretVersionParams = {
          secretType,
          id,
          versionId,
          locks,
        };

        const unlockSecretVersionResult =
          secretsManagerService.unlockSecretVersion(unlockSecretVersionParams);

        // all methods should return a Promise
        expectToBePromise(unlockSecretVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/locks/{secret_type}/{id}/versions/{version_id}/unlock',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.locks).toEqual(locks);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.version_id).toEqual(versionId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unlockSecretVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __unlockSecretVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __unlockSecretVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const versionId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unlockSecretVersionParams = {
          secretType,
          id,
          versionId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.unlockSecretVersion(unlockSecretVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.unlockSecretVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.unlockSecretVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listInstanceSecretsLocks', () => {
    describe('positive tests', () => {
      function __listInstanceSecretsLocksTest() {
        // Construct the params object for operation listInstanceSecretsLocks
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const groups = ['testString'];
        const listInstanceSecretsLocksParams = {
          limit,
          offset,
          search,
          groups,
        };

        const listInstanceSecretsLocksResult = secretsManagerService.listInstanceSecretsLocks(
          listInstanceSecretsLocksParams
        );

        // all methods should return a Promise
        expectToBePromise(listInstanceSecretsLocksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/locks', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.qs.groups).toEqual(groups);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listInstanceSecretsLocksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __listInstanceSecretsLocksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __listInstanceSecretsLocksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listInstanceSecretsLocksParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.listInstanceSecretsLocks(listInstanceSecretsLocksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        secretsManagerService.listInstanceSecretsLocks({});
        checkForSuccessfulExecution(createRequestMock);
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
        const putPolicyParams = {
          secretType,
          id,
          metadata,
          resources,
          policy,
        };

        const putPolicyResult = secretsManagerService.putPolicy(putPolicyParams);

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
        const putPolicyParams = {
          secretType,
          id,
          metadata,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.putPolicy(putPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.putPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.putPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        const getPolicyParams = {
          secretType,
          id,
          policy,
        };

        const getPolicyResult = secretsManagerService.getPolicy(getPolicyParams);

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
        const getPolicyParams = {
          secretType,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getPolicy(getPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.getPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.getPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('putConfig', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateIAMCredentialsSecretEngineRootConfig
      const engineConfigModel = {
        api_key: 'API_KEY',
      };

      function __putConfigTest() {
        // Construct the params object for operation putConfig
        const secretType = 'iam_credentials';
        const engineConfig = engineConfigModel;
        const putConfigParams = {
          secretType,
          engineConfig,
        };

        const putConfigResult = secretsManagerService.putConfig(putConfigParams);

        // all methods should return a Promise
        expectToBePromise(putConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/config/{secret_type}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(engineConfig);
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
        const engineConfig = engineConfigModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const putConfigParams = {
          secretType,
          engineConfig,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.putConfig(putConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.putConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.putConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getConfig', () => {
    describe('positive tests', () => {
      function __getConfigTest() {
        // Construct the params object for operation getConfig
        const secretType = 'iam_credentials';
        const getConfigParams = {
          secretType,
        };

        const getConfigResult = secretsManagerService.getConfig(getConfigParams);

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
        const getConfigParams = {
          secretType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getConfig(getConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.getConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.getConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createConfigElement', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ConfigElementDefConfigCloudInternetServicesConfig
      const configElementDefConfigModel = {
        cis_crn: 'crn:v1:bluemix:public:internet-svcs:global:a/<account-id>:<service-instance>::',
        cis_apikey: 'cis_apikey_value',
      };

      function __createConfigElementTest() {
        // Construct the params object for operation createConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const name = 'cis-example-config';
        const type = 'cis';
        const config = configElementDefConfigModel;
        const createConfigElementParams = {
          secretType,
          configElement,
          name,
          type,
          config,
        };

        const createConfigElementResult =
          secretsManagerService.createConfigElement(createConfigElementParams);

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
        const name = 'cis-example-config';
        const type = 'cis';
        const config = configElementDefConfigModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createConfigElementParams = {
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

        secretsManagerService.createConfigElement(createConfigElementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.createConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.createConfigElement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getConfigElements', () => {
    describe('positive tests', () => {
      function __getConfigElementsTest() {
        // Construct the params object for operation getConfigElements
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const getConfigElementsParams = {
          secretType,
          configElement,
        };

        const getConfigElementsResult =
          secretsManagerService.getConfigElements(getConfigElementsParams);

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
        const getConfigElementsParams = {
          secretType,
          configElement,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getConfigElements(getConfigElementsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.getConfigElements({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.getConfigElements();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        const getConfigElementParams = {
          secretType,
          configElement,
          configName,
        };

        const getConfigElementResult =
          secretsManagerService.getConfigElement(getConfigElementParams);

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
        const getConfigElementParams = {
          secretType,
          configElement,
          configName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.getConfigElement(getConfigElementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.getConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.getConfigElement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        const type = 'cis';
        const config = { foo: 'bar' };
        const updateConfigElementParams = {
          secretType,
          configElement,
          configName,
          type,
          config,
        };

        const updateConfigElementResult =
          secretsManagerService.updateConfigElement(updateConfigElementParams);

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
        const type = 'cis';
        const config = { foo: 'bar' };
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateConfigElementParams = {
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

        secretsManagerService.updateConfigElement(updateConfigElementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.updateConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.updateConfigElement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('actionOnConfigElement', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SignCsrAction
      const configActionModel = {
        common_name: 'example.com',
        alt_names: 'testString',
        ip_sans: 'testString',
        uri_sans: 'testString',
        other_sans: ['testString'],
        ttl: '12h',
        format: 'pem',
        max_path_length: 38,
        exclude_cn_from_sans: false,
        permitted_dns_domains: ['testString'],
        use_csr_values: false,
        ou: ['testString'],
        organization: ['testString'],
        country: ['testString'],
        locality: ['testString'],
        province: ['testString'],
        street_address: ['testString'],
        postal_code: ['testString'],
        serial_number: 'd9:be:fe:35:ba:09:42:b5',
        csr: 'testString',
      };

      function __actionOnConfigElementTest() {
        // Construct the params object for operation actionOnConfigElement
        const secretType = 'private_cert';
        const configElement = 'root_certificate_authorities';
        const configName = 'testString';
        const action = 'sign_intermediate';
        const config = configActionModel;
        const actionOnConfigElementParams = {
          secretType,
          configElement,
          configName,
          action,
          config,
        };

        const actionOnConfigElementResult = secretsManagerService.actionOnConfigElement(
          actionOnConfigElementParams
        );

        // all methods should return a Promise
        expectToBePromise(actionOnConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/api/v1/config/{secret_type}/{config_element}/{config_name}',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.config).toEqual(config);
        expect(mockRequestOptions.qs.action).toEqual(action);
        expect(mockRequestOptions.path.secret_type).toEqual(secretType);
        expect(mockRequestOptions.path.config_element).toEqual(configElement);
        expect(mockRequestOptions.path.config_name).toEqual(configName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __actionOnConfigElementTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __actionOnConfigElementTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __actionOnConfigElementTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'private_cert';
        const configElement = 'root_certificate_authorities';
        const configName = 'testString';
        const action = 'sign_intermediate';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const actionOnConfigElementParams = {
          secretType,
          configElement,
          configName,
          action,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.actionOnConfigElement(actionOnConfigElementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.actionOnConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.actionOnConfigElement();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
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
        const deleteConfigElementParams = {
          secretType,
          configElement,
          configName,
        };

        const deleteConfigElementResult =
          secretsManagerService.deleteConfigElement(deleteConfigElementParams);

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
        const deleteConfigElementParams = {
          secretType,
          configElement,
          configName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.deleteConfigElement(deleteConfigElementParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await secretsManagerService.deleteConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await secretsManagerService.deleteConfigElement();
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
        const eventNotificationsInstanceCrn =
          'crn:v1:bluemix:public:event-notifications:us-south:a/<account-id>:<service-instance>::';
        const eventNotificationsSourceName = 'My Secrets Manager';
        const eventNotificationsSourceDescription =
          'Optional description of this source in an Event Notifications instance.';
        const createNotificationsRegistrationParams = {
          eventNotificationsInstanceCrn,
          eventNotificationsSourceName,
          eventNotificationsSourceDescription,
        };

        const createNotificationsRegistrationResult =
          secretsManagerService.createNotificationsRegistration(
            createNotificationsRegistrationParams
          );

        // all methods should return a Promise
        expectToBePromise(createNotificationsRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/notifications/registration', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.event_notifications_instance_crn).toEqual(
          eventNotificationsInstanceCrn
        );
        expect(mockRequestOptions.body.event_notifications_source_name).toEqual(
          eventNotificationsSourceName
        );
        expect(mockRequestOptions.body.event_notifications_source_description).toEqual(
          eventNotificationsSourceDescription
        );
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
        const eventNotificationsInstanceCrn =
          'crn:v1:bluemix:public:event-notifications:us-south:a/<account-id>:<service-instance>::';
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

        secretsManagerService.createNotificationsRegistration(
          createNotificationsRegistrationParams
        );
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

        const getNotificationsRegistrationResult =
          secretsManagerService.getNotificationsRegistration(getNotificationsRegistrationParams);

        // all methods should return a Promise
        expectToBePromise(getNotificationsRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/notifications/registration', 'GET');
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

        const deleteNotificationsRegistrationResult =
          secretsManagerService.deleteNotificationsRegistration(
            deleteNotificationsRegistrationParams
          );

        // all methods should return a Promise
        expectToBePromise(deleteNotificationsRegistrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/notifications/registration', 'DELETE');
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

        secretsManagerService.deleteNotificationsRegistration(
          deleteNotificationsRegistrationParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        secretsManagerService.deleteNotificationsRegistration({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('sendTestNotification', () => {
    describe('positive tests', () => {
      function __sendTestNotificationTest() {
        // Construct the params object for operation sendTestNotification
        const sendTestNotificationParams = {};

        const sendTestNotificationResult = secretsManagerService.sendTestNotification(
          sendTestNotificationParams
        );

        // all methods should return a Promise
        expectToBePromise(sendTestNotificationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/api/v1/notifications/test', 'GET');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __sendTestNotificationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.enableRetries();
        __sendTestNotificationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        secretsManagerService.disableRetries();
        __sendTestNotificationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const sendTestNotificationParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        secretsManagerService.sendTestNotification(sendTestNotificationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        secretsManagerService.sendTestNotification({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
