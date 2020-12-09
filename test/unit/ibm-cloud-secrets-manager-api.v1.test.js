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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const IbmCloudSecretsManagerApiV1 = require('../../dist/ibm-cloud-secrets-manager-api/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://ibm-cloud-secrets-manager-api.cloud.ibm.com',
};

const ibmCloudSecretsManagerApiService = new IbmCloudSecretsManagerApiV1(service);

// dont actually create a request
const createRequestMock = jest.spyOn(ibmCloudSecretsManagerApiService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('IbmCloudSecretsManagerApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = IbmCloudSecretsManagerApiV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(IbmCloudSecretsManagerApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = IbmCloudSecretsManagerApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(IbmCloudSecretsManagerApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new IbmCloudSecretsManagerApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new IbmCloudSecretsManagerApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('putConfig', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EngineConfigOneOfIAMSecretEngineRootConfig
      const engineConfigOneOfModel = {
        api_key: 'API_KEY',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putConfig
        const secretType = 'iam_credentials';
        const engineConfigOneOf = engineConfigOneOfModel;
        const params = {
          secretType: secretType,
          engineConfigOneOf: engineConfigOneOf,
        };

        const putConfigResult = ibmCloudSecretsManagerApiService.putConfig(params);

        // all methods should return a Promise
        expectToBePromise(putConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(engineConfigOneOf);
        expect(options.path['secret_type']).toEqual(secretType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'iam_credentials';
        const engineConfigOneOf = engineConfigOneOfModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          engineConfigOneOf,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        ibmCloudSecretsManagerApiService.putConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.putConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putConfigPromise = ibmCloudSecretsManagerApiService.putConfig();
        expectToBePromise(putConfigPromise);

        putConfigPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getConfig', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getConfig
        const secretType = 'iam_credentials';
        const params = {
          secretType: secretType,
        };

        const getConfigResult = ibmCloudSecretsManagerApiService.getConfig(params);

        // all methods should return a Promise
        expectToBePromise(getConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['secret_type']).toEqual(secretType);
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

        ibmCloudSecretsManagerApiService.getConfig(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.getConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getConfigPromise = ibmCloudSecretsManagerApiService.getConfig();
        expectToBePromise(getConfigPromise);

        getConfigPromise.catch(err => {
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
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      };

      // SecretPolicyRotationRotation
      const secretPolicyRotationRotationModel = {
        interval: 1,
        unit: 'day',
      };

      // SecretPolicyRotation
      const secretPolicyRotationModel = {
        type: 'application/vnd.ibm.secrets-manager.secret.policy+json',
        rotation: secretPolicyRotationRotationModel,
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putPolicy
        const secretType = 'username_password';
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretPolicyRotationModel];
        const policy = 'rotation';
        const params = {
          secretType: secretType,
          id: id,
          metadata: metadata,
          resources: resources,
          policy: policy,
        };

        const putPolicyResult = ibmCloudSecretsManagerApiService.putPolicy(params);

        // all methods should return a Promise
        expectToBePromise(putPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/policies', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['resources']).toEqual(resources);
        expect(options.qs['policy']).toEqual(policy);
        expect(options.path['secret_type']).toEqual(secretType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.putPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.putPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const putPolicyPromise = ibmCloudSecretsManagerApiService.putPolicy();
        expectToBePromise(putPolicyPromise);

        putPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPolicy
        const secretType = 'username_password';
        const id = 'testString';
        const policy = 'rotation';
        const params = {
          secretType: secretType,
          id: id,
          policy: policy,
        };

        const getPolicyResult = ibmCloudSecretsManagerApiService.getPolicy(params);

        // all methods should return a Promise
        expectToBePromise(getPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['policy']).toEqual(policy);
        expect(options.path['secret_type']).toEqual(secretType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.getPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.getPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPolicyPromise = ibmCloudSecretsManagerApiService.getPolicy();
        expectToBePromise(getPolicyPromise);

        getPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSecretGroup
        const metadata = collectionMetadataModel;
        const resources = [secretGroupResourceModel];
        const params = {
          metadata: metadata,
          resources: resources,
        };

        const createSecretGroupResult = ibmCloudSecretsManagerApiService.createSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(createSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['resources']).toEqual(resources);
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

        ibmCloudSecretsManagerApiService.createSecretGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.createSecretGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSecretGroupPromise = ibmCloudSecretsManagerApiService.createSecretGroup();
        expectToBePromise(createSecretGroupPromise);

        createSecretGroupPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecretGroups', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSecretGroups
        const params = {};

        const listSecretGroupsResult = ibmCloudSecretsManagerApiService.listSecretGroups(params);

        // all methods should return a Promise
        expectToBePromise(listSecretGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        ibmCloudSecretsManagerApiService.listSecretGroups(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        ibmCloudSecretsManagerApiService.listSecretGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getSecretGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecretGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getSecretGroupResult = ibmCloudSecretsManagerApiService.getSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(getSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.getSecretGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.getSecretGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecretGroupPromise = ibmCloudSecretsManagerApiService.getSecretGroup();
        expectToBePromise(getSecretGroupPromise);

        getSecretGroupPromise.catch(err => {
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSecretGroupMetadata
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretGroupMetadataUpdatableModel];
        const params = {
          id: id,
          metadata: metadata,
          resources: resources,
        };

        const updateSecretGroupMetadataResult = ibmCloudSecretsManagerApiService.updateSecretGroupMetadata(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretGroupMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['resources']).toEqual(resources);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.updateSecretGroupMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.updateSecretGroupMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateSecretGroupMetadataPromise = ibmCloudSecretsManagerApiService.updateSecretGroupMetadata();
        expectToBePromise(updateSecretGroupMetadataPromise);

        updateSecretGroupMetadataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecretGroup', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecretGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteSecretGroupResult = ibmCloudSecretsManagerApiService.deleteSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups/{id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.deleteSecretGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.deleteSecretGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSecretGroupPromise = ibmCloudSecretsManagerApiService.deleteSecretGroup();
        expectToBePromise(deleteSecretGroupPromise);

        deleteSecretGroupPromise.catch(err => {
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
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      };

      // SecretVersion
      const secretVersionModel = {
      };

      // SecretResource
      const secretResourceModel = {
        type: 'testString',
        name: 'testString',
        description: 'testString',
        secret_group_id: 'testString',
        labels: ['testString'],
        expiration_date: '2019-01-01T12:00:00',
        ttl: '24h',
        access_groups: ['testString'],
        versions: [secretVersionModel],
        foo: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSecret
        const secretType = 'arbitrary';
        const metadata = collectionMetadataModel;
        const resources = [secretResourceModel];
        const params = {
          secretType: secretType,
          metadata: metadata,
          resources: resources,
        };

        const createSecretResult = ibmCloudSecretsManagerApiService.createSecret(params);

        // all methods should return a Promise
        expectToBePromise(createSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['resources']).toEqual(resources);
        expect(options.path['secret_type']).toEqual(secretType);
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

        ibmCloudSecretsManagerApiService.createSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.createSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createSecretPromise = ibmCloudSecretsManagerApiService.createSecret();
        expectToBePromise(createSecretPromise);

        createSecretPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listSecrets', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSecrets
        const secretType = 'arbitrary';
        const limit = 1;
        const offset = 0;
        const params = {
          secretType: secretType,
          limit: limit,
          offset: offset,
        };

        const listSecretsResult = ibmCloudSecretsManagerApiService.listSecrets(params);

        // all methods should return a Promise
        expectToBePromise(listSecretsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.path['secret_type']).toEqual(secretType);
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

        ibmCloudSecretsManagerApiService.listSecrets(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.listSecrets({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listSecretsPromise = ibmCloudSecretsManagerApiService.listSecrets();
        expectToBePromise(listSecretsPromise);

        listSecretsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listAllSecrets', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllSecrets
        const limit = 1;
        const offset = 0;
        const params = {
          limit: limit,
          offset: offset,
        };

        const listAllSecretsResult = ibmCloudSecretsManagerApiService.listAllSecrets(params);

        // all methods should return a Promise
        expectToBePromise(listAllSecretsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['offset']).toEqual(offset);
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

        ibmCloudSecretsManagerApiService.listAllSecrets(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        ibmCloudSecretsManagerApiService.listAllSecrets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getSecret', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType: secretType,
          id: id,
        };

        const getSecretResult = ibmCloudSecretsManagerApiService.getSecret(params);

        // all methods should return a Promise
        expectToBePromise(getSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['secret_type']).toEqual(secretType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.getSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.getSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecretPromise = ibmCloudSecretsManagerApiService.getSecret();
        expectToBePromise(getSecretPromise);

        getSecretPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSecret', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SecretActionOneOfRotateArbitrarySecretBody
      const secretActionOneOfModel = {
        payload: 'testString',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const action = 'rotate';
        const secretActionOneOf = secretActionOneOfModel;
        const params = {
          secretType: secretType,
          id: id,
          action: action,
          secretActionOneOf: secretActionOneOf,
        };

        const updateSecretResult = ibmCloudSecretsManagerApiService.updateSecret(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(secretActionOneOf);
        expect(options.qs['action']).toEqual(action);
        expect(options.path['secret_type']).toEqual(secretType);
        expect(options.path['id']).toEqual(id);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'arbitrary';
        const id = 'testString';
        const action = 'rotate';
        const secretActionOneOf = secretActionOneOfModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          secretType,
          id,
          action,
          secretActionOneOf,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        ibmCloudSecretsManagerApiService.updateSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.updateSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateSecretPromise = ibmCloudSecretsManagerApiService.updateSecret();
        expectToBePromise(updateSecretPromise);

        updateSecretPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecret', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType: secretType,
          id: id,
        };

        const deleteSecretResult = ibmCloudSecretsManagerApiService.deleteSecret(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['secret_type']).toEqual(secretType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.deleteSecret(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.deleteSecret({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteSecretPromise = ibmCloudSecretsManagerApiService.deleteSecret();
        expectToBePromise(deleteSecretPromise);

        deleteSecretPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecretMetadata', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecretMetadata
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType: secretType,
          id: id,
        };

        const getSecretMetadataResult = ibmCloudSecretsManagerApiService.getSecretMetadata(params);

        // all methods should return a Promise
        expectToBePromise(getSecretMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/metadata', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['secret_type']).toEqual(secretType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.getSecretMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.getSecretMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getSecretMetadataPromise = ibmCloudSecretsManagerApiService.getSecretMetadata();
        expectToBePromise(getSecretMetadataPromise);

        getSecretMetadataPromise.catch(err => {
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
        collection_type: 'application/vnd.ibm.secrets-manager.secret+json',
        collection_total: 1,
      };

      // SecretMetadata
      const secretMetadataModel = {
        labels: ['testString'],
        name: 'example-secret',
        description: 'Extended description for this secret.',
        expiration_date: '2019-01-01T12:00:00',
        ttl: '24h',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSecretMetadata
        const secretType = 'arbitrary';
        const id = 'testString';
        const metadata = collectionMetadataModel;
        const resources = [secretMetadataModel];
        const params = {
          secretType: secretType,
          id: id,
          metadata: metadata,
          resources: resources,
        };

        const updateSecretMetadataResult = ibmCloudSecretsManagerApiService.updateSecretMetadata(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/metadata', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['metadata']).toEqual(metadata);
        expect(options.body['resources']).toEqual(resources);
        expect(options.path['secret_type']).toEqual(secretType);
        expect(options.path['id']).toEqual(id);
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

        ibmCloudSecretsManagerApiService.updateSecretMetadata(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudSecretsManagerApiService.updateSecretMetadata({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateSecretMetadataPromise = ibmCloudSecretsManagerApiService.updateSecretMetadata();
        expectToBePromise(updateSecretMetadataPromise);

        updateSecretMetadataPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
