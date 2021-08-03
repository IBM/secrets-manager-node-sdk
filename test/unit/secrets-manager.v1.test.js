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
  describe('createSecretConfigElement', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createSecretConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const name = 'testString';
        const type = 'testString';
        const config = { foo: 'bar' };
        const params = {
          secretType: secretType,
          configElement: configElement,
          name: name,
          type: type,
          config: config,
        };

        const createSecretConfigElementResult = secretsManagerService.createSecretConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(createSecretConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}/{config_element}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.name).toEqual(name);
        expect(options.body.type).toEqual(type);
        expect(options.body.config).toEqual(config);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.config_element).toEqual(configElement);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const name = 'testString';
        const type = 'testString';
        const config = { foo: 'bar' };
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

        secretsManagerService.createSecretConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.createSecretConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createSecretConfigElementPromise = secretsManagerService.createSecretConfigElement();
        expectToBePromise(createSecretConfigElementPromise);

        createSecretConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSecretConfigElement', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecretConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const params = {
          secretType: secretType,
          configElement: configElement,
        };

        const getSecretConfigElementResult = secretsManagerService.getSecretConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(getSecretConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}/{config_element}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.config_element).toEqual(configElement);
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

        secretsManagerService.getSecretConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getSecretConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSecretConfigElementPromise = secretsManagerService.getSecretConfigElement();
        expectToBePromise(getSecretConfigElementPromise);

        getSecretConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateSecretConfigElement', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSecretConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const type = 'testString';
        const config = { foo: 'bar' };
        const params = {
          secretType: secretType,
          configElement: configElement,
          configName: configName,
          type: type,
          config: config,
        };

        const updateSecretConfigElementResult = secretsManagerService.updateSecretConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}/{config_element}/{config_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.type).toEqual(type);
        expect(options.body.config).toEqual(config);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.config_element).toEqual(configElement);
        expect(options.path.config_name).toEqual(configName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const type = 'testString';
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

        secretsManagerService.updateSecretConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.updateSecretConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateSecretConfigElementPromise = secretsManagerService.updateSecretConfigElement();
        expectToBePromise(updateSecretConfigElementPromise);

        updateSecretConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteSecretConfigElement', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecretConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const params = {
          secretType: secretType,
          configElement: configElement,
          configName: configName,
        };

        const deleteSecretConfigElementResult = secretsManagerService.deleteSecretConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecretConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}/{config_element}/{config_name}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.config_element).toEqual(configElement);
        expect(options.path.config_name).toEqual(configName);
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

        secretsManagerService.deleteSecretConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.deleteSecretConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteSecretConfigElementPromise = secretsManagerService.deleteSecretConfigElement();
        expectToBePromise(deleteSecretConfigElementPromise);

        deleteSecretConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getSingleSecretConfigElement', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSingleSecretConfigElement
        const secretType = 'public_cert';
        const configElement = 'certificate_authorities';
        const configName = 'testString';
        const params = {
          secretType: secretType,
          configElement: configElement,
          configName: configName,
        };

        const getSingleSecretConfigElementResult = secretsManagerService.getSingleSecretConfigElement(params);

        // all methods should return a Promise
        expectToBePromise(getSingleSecretConfigElementResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}/{config_element}/{config_name}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.config_element).toEqual(configElement);
        expect(options.path.config_name).toEqual(configName);
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

        secretsManagerService.getSingleSecretConfigElement(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await secretsManagerService.getSingleSecretConfigElement({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getSingleSecretConfigElementPromise = secretsManagerService.getSingleSecretConfigElement();
        expectToBePromise(getSingleSecretConfigElementPromise);

        getSingleSecretConfigElementPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('putConfig', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation putConfig
        const secretType = 'iam_credentials';
        const apiKey = 'API_KEY';
        const params = {
          secretType: secretType,
          apiKey: apiKey,
        };

        const putConfigResult = secretsManagerService.putConfig(params);

        // all methods should return a Promise
        expectToBePromise(putConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.api_key).toEqual(apiKey);
        expect(options.path.secret_type).toEqual(secretType);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getConfig
        const secretType = 'iam_credentials';
        const params = {
          secretType: secretType,
        };

        const getConfigResult = secretsManagerService.getConfig(params);

        // all methods should return a Promise
        expectToBePromise(getConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/config/{secret_type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
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

        const putPolicyResult = secretsManagerService.putPolicy(params);

        // all methods should return a Promise
        expectToBePromise(putPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/policies', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.metadata).toEqual(metadata);
        expect(options.body.resources).toEqual(resources);
        expect(options.qs.policy).toEqual(policy);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
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

        const getPolicyResult = secretsManagerService.getPolicy(params);

        // all methods should return a Promise
        expectToBePromise(getPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.policy).toEqual(policy);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
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

        const createSecretGroupResult = secretsManagerService.createSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(createSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.metadata).toEqual(metadata);
        expect(options.body.resources).toEqual(resources);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listSecretGroups
        const params = {};

        const listSecretGroupsResult = secretsManagerService.listSecretGroups(params);

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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecretGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getSecretGroupResult = secretsManagerService.getSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(getSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.id).toEqual(id);
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

        const updateSecretGroupMetadataResult = secretsManagerService.updateSecretGroupMetadata(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretGroupMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.metadata).toEqual(metadata);
        expect(options.body.resources).toEqual(resources);
        expect(options.path.id).toEqual(id);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecretGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteSecretGroupResult = secretsManagerService.deleteSecretGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecretGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secret_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.id).toEqual(id);
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

        const createSecretResult = secretsManagerService.createSecret(params);

        // all methods should return a Promise
        expectToBePromise(createSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.metadata).toEqual(metadata);
        expect(options.body.resources).toEqual(resources);
        expect(options.path.secret_type).toEqual(secretType);
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

        const listSecretsResult = secretsManagerService.listSecrets(params);

        // all methods should return a Promise
        expectToBePromise(listSecretsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.limit).toEqual(limit);
        expect(options.qs.offset).toEqual(offset);
        expect(options.path.secret_type).toEqual(secretType);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listAllSecrets
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const sortBy = 'id';
        const groups = ['testString'];
        const params = {
          limit: limit,
          offset: offset,
          search: search,
          sortBy: sortBy,
          groups: groups,
        };

        const listAllSecretsResult = secretsManagerService.listAllSecrets(params);

        // all methods should return a Promise
        expectToBePromise(listAllSecretsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.limit).toEqual(limit);
        expect(options.qs.offset).toEqual(offset);
        expect(options.qs.search).toEqual(search);
        expect(options.qs.sort_by).toEqual(sortBy);
        expect(options.qs.groups).toEqual(groups);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType: secretType,
          id: id,
        };

        const getSecretResult = secretsManagerService.getSecret(params);

        // all methods should return a Promise
        expectToBePromise(getSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
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

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const action = 'rotate';
        const secretAction = secretActionModel;
        const params = {
          secretType: secretType,
          id: id,
          action: action,
          secretAction: secretAction,
        };

        const updateSecretResult = secretsManagerService.updateSecret(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(secretAction);
        expect(options.qs.action).toEqual(action);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteSecret
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType: secretType,
          id: id,
        };

        const deleteSecretResult = secretsManagerService.deleteSecret(params);

        // all methods should return a Promise
        expectToBePromise(deleteSecretResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecretVersion
        const secretType = 'imported_cert';
        const id = 'testString';
        const versionId = 'testString';
        const params = {
          secretType: secretType,
          id: id,
          versionId: versionId,
        };

        const getSecretVersionResult = secretsManagerService.getSecretVersion(params);

        // all methods should return a Promise
        expectToBePromise(getSecretVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/versions/{version_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
        expect(options.path.version_id).toEqual(versionId);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecretVersionMetadata
        const secretType = 'imported_cert';
        const id = 'testString';
        const versionId = 'testString';
        const params = {
          secretType: secretType,
          id: id,
          versionId: versionId,
        };

        const getSecretVersionMetadataResult = secretsManagerService.getSecretVersionMetadata(params);

        // all methods should return a Promise
        expectToBePromise(getSecretVersionMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/versions/{version_id}/metadata', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
        expect(options.path.version_id).toEqual(versionId);
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
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSecretMetadata
        const secretType = 'arbitrary';
        const id = 'testString';
        const params = {
          secretType: secretType,
          id: id,
        };

        const getSecretMetadataResult = secretsManagerService.getSecretMetadata(params);

        // all methods should return a Promise
        expectToBePromise(getSecretMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/metadata', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
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

        const updateSecretMetadataResult = secretsManagerService.updateSecretMetadata(params);

        // all methods should return a Promise
        expectToBePromise(updateSecretMetadataResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/secrets/{secret_type}/{id}/metadata', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.metadata).toEqual(metadata);
        expect(options.body.resources).toEqual(resources);
        expect(options.path.secret_type).toEqual(secretType);
        expect(options.path.id).toEqual(id);
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
});
