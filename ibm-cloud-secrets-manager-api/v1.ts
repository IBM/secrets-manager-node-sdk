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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.21.0-a45d89ef-20201207-220514
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * With IBM Cloud® Secrets Manager, you can create, lease, and centrally manage secrets that are used in IBM Cloud
 * services or your custom-built applications. Secrets are stored in a dedicated instance of open source HashiCorp
 * Vault, built on IBM Cloud.
 */

class IbmCloudSecretsManagerApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://ibm-cloud-secrets-manager-api.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'ibm_cloud_secrets_manager_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of IbmCloudSecretsManagerApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {IbmCloudSecretsManagerApiV1}
   */

  public static newInstance(options: UserOptions): IbmCloudSecretsManagerApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new IbmCloudSecretsManagerApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /**
   * Construct a IbmCloudSecretsManagerApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {IbmCloudSecretsManagerApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * config
   ************************/

  /**
   * Configure secrets of a given type.
   *
   * Updates the configuration for the given secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {EngineConfigOneOf} params.engineConfigOneOf -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.Empty>>}
   */
  public putConfig(params: IbmCloudSecretsManagerApiV1.PutConfigParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'engineConfigOneOf'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.engineConfigOneOf;
    const path = {
      'secret_type': _params.secretType
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'putConfig');

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get the configuration for a secret type.
   *
   * Retrieves the configuration that is associated with the given secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.EngineConfigOneOf>>}
   */
  public getConfig(params: IbmCloudSecretsManagerApiV1.GetConfigParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.EngineConfigOneOf>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfig');

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * policies
   ************************/

  /**
   * Set secret policies.
   *
   * Creates or updates one or more policies for the specified secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretPolicyRotation[]} params.resources - A collection of resources.
   * @param {string} [params.policy] - The type of policy that is associated with the specified secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecretPoliciesOneOf>>}
   */
  public putPolicy(params: IbmCloudSecretsManagerApiV1.PutPolicyParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecretPoliciesOneOf>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'id', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources
    };

    const query = {
      'policy': _params.policy
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'putPolicy');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/policies',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List secret policies.
   *
   * Retrieves a list of policies that are associated with a specified secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {string} [params.policy] - The type of policy that is associated with the specified secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecretPoliciesOneOf>>}
   */
  public getPolicy(params: IbmCloudSecretsManagerApiV1.GetPolicyParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecretPoliciesOneOf>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'policy': _params.policy
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getPolicy');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/policies',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * secretGroups
   ************************/

  /**
   * Create a secret group.
   *
   * Creates a secret group that you can use to organize secrets and control who on your team has access to them.
   *
   * A successful `POST /api/v1/secret_groups` request returns the ID value of the secret group, along with other
   * metadata. To learn more about secret groups, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-secret-groups).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretGroupResource[]} params.resources - A collection of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>>}
   */
  public createSecretGroup(params: IbmCloudSecretsManagerApiV1.CreateSecretGroupParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createSecretGroup');

    const parameters = {
      options: {
        url: '/api/v1/secret_groups',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List secret groups.
   *
   * Retrieves the list of secret groups that are available in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>>}
   */
  public listSecretGroups(params?: IbmCloudSecretsManagerApiV1.ListSecretGroupsParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>> {
    const _params = Object.assign({}, params);

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listSecretGroups');

    const parameters = {
      options: {
        url: '/api/v1/secret_groups',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get a secret group.
   *
   * Retrieves the metadata of an existing secret group by specifying the ID of the group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>>}
   */
  public getSecretGroup(params: IbmCloudSecretsManagerApiV1.GetSecretGroupParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecretGroup');

    const parameters = {
      options: {
        url: '/api/v1/secret_groups/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update a secret group.
   *
   * Updates the metadata of an existing secret group, such as its name or description.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret group.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretGroupMetadataUpdatable[]} params.resources - A collection of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>>}
   */
  public updateSecretGroupMetadata(params: IbmCloudSecretsManagerApiV1.UpdateSecretGroupMetadataParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources
    };

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecretGroupMetadata');

    const parameters = {
      options: {
        url: '/api/v1/secret_groups/{id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a secret group.
   *
   * Deletes a secret group by specifying the ID of the secret group.
   *
   * **Note:** To delete a secret group, it must be empty. If you need to remove a secret group that contains secrets,
   * you must first [delete the secrets](#delete-secret) that are associated with the group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>>}
   */
  public deleteSecretGroup(params: IbmCloudSecretsManagerApiV1.DeleteSecretGroupParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretGroupDef>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSecretGroup');

    const parameters = {
      options: {
        url: '/api/v1/secret_groups/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * secrets
   ************************/

  /**
   * Create a secret.
   *
   * Creates a secret that you can use to access or authenticate to a protected resource.
   *
   * A successful `POST /api/v1/secrets` request stores the secret in your dedicated instance based on the secret type
   * and data that you specify. The response returns the ID value of the secret, along with other metadata.
   *
   * To learn more about the types of secrets that you can create with Secrets Manager, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-secret-basics).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretResource[]} params.resources - A collection of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.CreateSecret>>}
   */
  public createSecret(params: IbmCloudSecretsManagerApiV1.CreateSecretParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.CreateSecret>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources
    };

    const path = {
      'secret_type': _params.secretType
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createSecret');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List secrets by type.
   *
   * Retrieves a list of secrets based on the type that you specify.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {number} [params.limit] - The number of secrets to retrieve. By default, `GET /secrets/{secret-type}`
   * returns the first 200 secrets. To retrieve a different set of secrets, use `limit` with `offset` to page through
   * your available resources. The maximum value for `limit` is 5000.
   *
   * **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
   * `../secrets/{secret-type}?limit=5`.
   * @param {number} [params.offset] - The number of secrets to skip. By specifying `offset`, you retrieve a subset of
   * secrets that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
   * `../secrets/{secret-type}?offset=25&limit=25`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.ListSecrets>>}
   */
  public listSecrets(params: IbmCloudSecretsManagerApiV1.ListSecretsParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.ListSecrets>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset
    };

    const path = {
      'secret_type': _params.secretType
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listSecrets');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List all secrets.
   *
   * Retrieves a list of all secrets in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - The number of secrets to retrieve. By default, `GET /secrets/{secret-type}`
   * returns the first 200 secrets. To retrieve a different set of secrets, use `limit` with `offset` to page through
   * your available resources. The maximum value for `limit` is 5000.
   *
   * **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
   * `../secrets/{secret-type}?limit=5`.
   * @param {number} [params.offset] - The number of secrets to skip. By specifying `offset`, you retrieve a subset of
   * secrets that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
   * `../secrets/{secret-type}?offset=25&limit=25`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.ListSecrets>>}
   */
  public listAllSecrets(params?: IbmCloudSecretsManagerApiV1.ListAllSecretsParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.ListSecrets>> {
    const _params = Object.assign({}, params);

    const query = {
      'limit': _params.limit,
      'offset': _params.offset
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllSecrets');

    const parameters = {
      options: {
        url: '/api/v1/secrets',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get a secret.
   *
   * Retrieves a secret and its details by specifying the ID of the secret.
   *
   * A successful `GET /api/v1/secrets/{secret_type}/{id}` returns the secret data that is associated with your secret,
   * along with other metadata.
   *
   * **Tip:** If you need to view only the details of a specified secret without retrieving its value, use
   * [`GET /api/v1/secrets/{secret_type}/{id}/metadata`](#get-secret-metadata).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecret>>}
   */
  public getSecret(params: IbmCloudSecretsManagerApiV1.GetSecretParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecret>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecret');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Invoke an action on a secret.
   *
   * Invokes an action on a specified secret. This method supports the following actions:
   *
   * - `rotate`: Replace the value of an `arbitrary` or `username_password` secret.
   * - `delete_credentials`: Delete the API key that is associated with an `iam_credentials` secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {string} params.action - The action to perform on the specified secret.
   * @param {SecretActionOneOf} params.secretActionOneOf - The base request for invoking an action on a secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecret>>}
   */
  public updateSecret(params: IbmCloudSecretsManagerApiV1.UpdateSecretParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.GetSecret>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'id', 'action', 'secretActionOneOf'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.secretActionOneOf;
    const query = {
      'action': _params.action
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecret');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete a secret.
   *
   * Deletes a secret by specifying the ID of the secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.Empty>>}
   */
  public deleteSecret(params: IbmCloudSecretsManagerApiV1.DeleteSecretParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSecret');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get secret metadata.
   *
   * Retrieves the details of a secret by specifying the ID.
   *
   * A successful `GET /api/v1/secrets/{secret_type}/{id}/metadata` request returns only metadata about the secret, such
   * as its name and creation date. To retrieve the value of a secret, use the [Get a secret](#get-secret) method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretMetadataRequest>>}
   */
  public getSecretMetadata(params: IbmCloudSecretsManagerApiV1.GetSecretMetadataParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretMetadataRequest>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecretMetadata');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/metadata',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update secret metadata.
   *
   * Updates the metadata of a secret, such as its name or description.
   *
   * To update the actual contents of a secret, rotate the secret by using the [Invoke an action on a
   * secret](#update-secret) method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretMetadata[]} params.resources - A collection of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretMetadataRequest>>}
   */
  public updateSecretMetadata(params: IbmCloudSecretsManagerApiV1.UpdateSecretMetadataParams): Promise<IbmCloudSecretsManagerApiV1.Response<IbmCloudSecretsManagerApiV1.SecretMetadataRequest>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['secretType', 'id', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id
    };

    const sdkHeaders = getSdkHeaders(IbmCloudSecretsManagerApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecretMetadata');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/metadata',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace IbmCloudSecretsManagerApiV1 {

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `putConfig` operation. */
  export interface PutConfigParams {
    /** The secret type. */
    secretType: PutConfigConstants.SecretType | string;
    engineConfigOneOf: EngineConfigOneOf;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `putConfig` operation. */
  export namespace PutConfigConstants {
    /** The secret type. */
    export enum SecretType {
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /** Parameters for the `getConfig` operation. */
  export interface GetConfigParams {
    /** The secret type. */
    secretType: GetConfigConstants.SecretType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getConfig` operation. */
  export namespace GetConfigConstants {
    /** The secret type. */
    export enum SecretType {
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /** Parameters for the `putPolicy` operation. */
  export interface PutPolicyParams {
    /** The secret type. */
    secretType: PutPolicyConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretPolicyRotation[];
    /** The type of policy that is associated with the specified secret. */
    policy?: PutPolicyConstants.Policy | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `putPolicy` operation. */
  export namespace PutPolicyConstants {
    /** The secret type. */
    export enum SecretType {
      USERNAME_PASSWORD = 'username_password',
    }
    /** The type of policy that is associated with the specified secret. */
    export enum Policy {
      ROTATION = 'rotation',
    }
  }

  /** Parameters for the `getPolicy` operation. */
  export interface GetPolicyParams {
    /** The secret type. */
    secretType: GetPolicyConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    /** The type of policy that is associated with the specified secret. */
    policy?: GetPolicyConstants.Policy | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getPolicy` operation. */
  export namespace GetPolicyConstants {
    /** The secret type. */
    export enum SecretType {
      USERNAME_PASSWORD = 'username_password',
    }
    /** The type of policy that is associated with the specified secret. */
    export enum Policy {
      ROTATION = 'rotation',
    }
  }

  /** Parameters for the `createSecretGroup` operation. */
  export interface CreateSecretGroupParams {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretGroupResource[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretGroups` operation. */
  export interface ListSecretGroupsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretGroup` operation. */
  export interface GetSecretGroupParams {
    /** The v4 UUID that uniquely identifies the secret group. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecretGroupMetadata` operation. */
  export interface UpdateSecretGroupMetadataParams {
    /** The v4 UUID that uniquely identifies the secret group. */
    id: string;
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretGroupMetadataUpdatable[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecretGroup` operation. */
  export interface DeleteSecretGroupParams {
    /** The v4 UUID that uniquely identifies the secret group. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecret` operation. */
  export interface CreateSecretParams {
    /** The secret type. */
    secretType: CreateSecretConstants.SecretType | string;
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretResource[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSecret` operation. */
  export namespace CreateSecretConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      USERNAME_PASSWORD = 'username_password',
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /** Parameters for the `listSecrets` operation. */
  export interface ListSecretsParams {
    /** The secret type. */
    secretType: ListSecretsConstants.SecretType | string;
    /** The number of secrets to retrieve. By default, `GET /secrets/{secret-type}` returns the first 200 secrets.
     *  To retrieve a different set of secrets, use `limit` with `offset` to page through your available resources. The
     *  maximum value for `limit` is 5000.
     *
     *  **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
     *  `../secrets/{secret-type}?limit=5`.
     */
    limit?: number;
    /** The number of secrets to skip. By specifying `offset`, you retrieve a subset of secrets that starts with the
     *  `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
     *  `../secrets/{secret-type}?offset=25&limit=25`.
     */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listSecrets` operation. */
  export namespace ListSecretsConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      USERNAME_PASSWORD = 'username_password',
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /** Parameters for the `listAllSecrets` operation. */
  export interface ListAllSecretsParams {
    /** The number of secrets to retrieve. By default, `GET /secrets/{secret-type}` returns the first 200 secrets.
     *  To retrieve a different set of secrets, use `limit` with `offset` to page through your available resources. The
     *  maximum value for `limit` is 5000.
     *
     *  **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
     *  `../secrets/{secret-type}?limit=5`.
     */
    limit?: number;
    /** The number of secrets to skip. By specifying `offset`, you retrieve a subset of secrets that starts with the
     *  `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
     *  `../secrets/{secret-type}?offset=25&limit=25`.
     */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecret` operation. */
  export interface GetSecretParams {
    /** The secret type. */
    secretType: GetSecretConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSecret` operation. */
  export namespace GetSecretConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      USERNAME_PASSWORD = 'username_password',
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /** Parameters for the `updateSecret` operation. */
  export interface UpdateSecretParams {
    /** The secret type. */
    secretType: UpdateSecretConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    /** The action to perform on the specified secret. */
    action: UpdateSecretConstants.Action | string;
    /** The base request for invoking an action on a secret. */
    secretActionOneOf: SecretActionOneOf;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateSecret` operation. */
  export namespace UpdateSecretConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      USERNAME_PASSWORD = 'username_password',
      IAM_CREDENTIALS = 'iam_credentials',
    }
    /** The action to perform on the specified secret. */
    export enum Action {
      ROTATE = 'rotate',
      DELETE_CREDENTIALS = 'delete_credentials',
    }
  }

  /** Parameters for the `deleteSecret` operation. */
  export interface DeleteSecretParams {
    /** The secret type. */
    secretType: DeleteSecretConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteSecret` operation. */
  export namespace DeleteSecretConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      USERNAME_PASSWORD = 'username_password',
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /** Parameters for the `getSecretMetadata` operation. */
  export interface GetSecretMetadataParams {
    /** The secret type. */
    secretType: GetSecretMetadataConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSecretMetadata` operation. */
  export namespace GetSecretMetadataConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      USERNAME_PASSWORD = 'username_password',
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /** Parameters for the `updateSecretMetadata` operation. */
  export interface UpdateSecretMetadataParams {
    /** The secret type. */
    secretType: UpdateSecretMetadataConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretMetadata[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateSecretMetadata` operation. */
  export namespace UpdateSecretMetadataConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      USERNAME_PASSWORD = 'username_password',
      IAM_CREDENTIALS = 'iam_credentials',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** The metadata that describes the resource array. */
  export interface CollectionMetadata {
    /** The type of resources in the resource array. */
    collection_type: string;
    /** The number of elements in the resource array. */
    collection_total: number;
  }

  /** The base schema for creating secrets. */
  export interface CreateSecret {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretResource[];
  }

  /** EngineConfigOneOf. */
  export interface EngineConfigOneOf {
  }

  /** The base schema for retrieving a secret. */
  export interface GetSecret {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretResource[];
  }

  /** GetSecretPoliciesOneOf. */
  export interface GetSecretPoliciesOneOf {
  }

  /** Properties that are associated with a rotation policy. */
  export interface GetSecretPoliciesOneOfGetSecretPolicyRotationResourcesItem {
    /** The v4 UUID used to uniquely identify the policy resource, as specified by RFC 4122. */
    id: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies your cloud resources. */
    crn?: string;
    /** The date the policy was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the policy. */
    created_by?: string;
    /** Updates when the policy is replaced or modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The unique identifier for the entity that updated the policy. */
    updated_by?: string;
    /** Specifies the MIME type that represents the policy resource. Currently, only the default is supported. */
    type: string;
    /** The secret rotation time interval. */
    rotation: SecretPolicyRotationRotation;
  }

  /** The base schema for listing secrets. */
  export interface ListSecrets {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources?: SecretResource[];
  }

  /** SecretActionOneOf. */
  export interface SecretActionOneOf {
  }

  /** The base schema definition for a secret group. */
  export interface SecretGroupDef {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretGroupResource[];
  }

  /** Metadata properties that describe a secret group. */
  export interface SecretGroupMetadataUpdatable {
    /** A human-readable name to assign to your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret
     *  group.
     */
    name?: string;
    /** A text field that is used to provide a more detailed description of the secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
  }

  /** Properties that describe a secret group. */
  export interface SecretGroupResource {
    /** The v4 UUID used to uniquely identify the resource, as specified by RFC 4122. */
    id?: string;
    /** A human-readable name to assign to your secret group. To protect your privacy, do not use personal data,
     *  such as your name or location, as a name for your secret group.
     */
    name?: string;
    /** A text field that is used to provide a more detailed description of the secret group. To protect your
     *  privacy, do not use personal data, such as your name or location, as a description for your secret group.
     */
    description?: string;
    /** The date the secret-group was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** Updates when the metadata of the secret-group is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** Specifies the MIME type that represents the secret-group resource. */
    type?: string;
    /** SecretGroupResource accepts additional properties. */
    [propName: string]: any;
  }

  /** Metadata properties that describe a secret. */
  export interface SecretMetadata {
    /** The unique ID of the secret. */
    id?: string;
    /** Labels that you can use to filter for secrets in your instance.
     *
     *  Up to 30 labels can be created. Labels can be between 2-30 characters, including spaces. Special characters not
     *  permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** A text field that is used to provide a more detailed description of the secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret.
     */
    description?: string;
    /** The v4 UUID that uniquely identifies the secret group to assign to this secret.
     *
     *  If you omit this parameter, your secret is assigned to the `default` secret group.
     */
    secret_group_id?: string;
    /** The secret state based on NIST SP 800-57. States are integers and correspond to the Pre-activation = 0,
     *  Active = 1,  Suspended = 2, Deactivated = 3, and Destroyed = 5 values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The secret type. */
    secret_type?: string;
    /** The date the secret material expires. The date format follows RFC 3339.
     *
     *  You can set an expiration date on supported secret types at their creation. If you create a secret without
     *  specifying an expiration date, the secret does not expire. The `expiration_date` field is supported for the
     *  following secret types:
     *
     *  - `arbitrary`
     *  - `username_password`.
     */
    expiration_date?: string;
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration,  such as
     *  `120m` or `24h`.
     */
    ttl?: any;
    /** The Cloud Resource Name (CRN) that uniquely identifies the resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when any part of the secret metadata is modified. The date format follows RFC 3339. */
    last_update_date?: string;
  }

  /** The metadata of a secret. */
  export interface SecretMetadataRequest {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretMetadata[];
  }

  /** Properties that are associated with a rotation policy. */
  export interface SecretPolicyRotation {
    /** Specifies the MIME type that represents the policy resource. Currently, only the default is supported. */
    type: string;
    /** The secret rotation time interval. */
    rotation: SecretPolicyRotationRotation;
  }

  /** The secret rotation time interval. */
  export interface SecretPolicyRotationRotation {
    /** Specifies the length of the secret rotation time interval. */
    interval: number;
    /** Specifies the units for the secret rotation time interval. */
    unit: string;
  }

  /** Properties that describe a secret. */
  export interface SecretResource {
    /** Specifies the MIME type that represents the secret resource. */
    type?: string;
    /** The v4 UUID used to uniquely identify the resource, as specified by RFC 4122. */
    id?: string;
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** A text field that is used to provide a more detailed description of the secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret.
     */
    description?: string;
    /** The v4 UUID that uniquely identifies the secret group to assign to this secret.
     *
     *  If you omit this parameter, your secret is assigned to the `default` secret group.
     */
    secret_group_id?: string;
    /** Labels that you can use to filter for secrets in your instance.
     *
     *  Up to 30 labels can be created. Labels can be between 2-30 characters, including spaces. Special characters not
     *  permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret state based on NIST SP 800-57. States are integers and correspond to the Pre-activation = 0,
     *  Active = 1,  Suspended = 2, Deactivated = 3, and Destroyed = 5 values.
     */
    state?: number;
    /** The date the secret material expires. The date format follows RFC 3339.
     *
     *  You can set an expiration date on supported secret types at their creation. If you create a secret without
     *  specifying an expiration date, the secret does not expire. The `expiration_date` field is supported for the
     *  following secret types:
     *
     *  - `arbitrary`
     *  - `username_password`.
     */
    expiration_date?: string;
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration,  such as
     *  `120m` or `24h`.
     */
    ttl?: any;
    /** The access groups that define the capabilities of the service ID and API key that are generated for an
     *  `iam_credentials` secret.
     *
     *  **Tip:** To find the ID of an access group, go to **Manage > Access (IAM) > Access groups** in the IBM Cloud
     *  console. Select the access group to inspect, and click **Details** to view its ID.
     */
    access_groups?: string[];
    /** The Cloud Resource Name (CRN) that uniquely identifies your cloud resources. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when the actual secret is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The date the next rotation of the secret will be performed at. This field exists only for secrets that can
     *  be auto-rotated.
     */
    next_rotation_date?: string;
    /** An array that contains metadata for each secret version. */
    versions?: SecretVersion[];
    /** SecretResource accepts additional properties. */
    [propName: string]: any;
  }

  /** Properties that are associated with a specific secret version. */
  export interface SecretVersion {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Indicates if the version of the secret was created by auto-rotation. */
    auto_rotated?: boolean;
  }

  /** Configuration that is used to generate IAM credentials. */
  export interface EngineConfigOneOfIAMSecretEngineRootConfig extends EngineConfigOneOf {
    /** An IBM Cloud API key that has the capability to create and manage service IDs.
     *
     *  The API key must be assigned the Editor platform role on the Access Groups Service and the Operator platform
     *  role on the IAM Identity Service. For more information, see [Enabling the IAM secrets
     *  engine](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-secret-engines#configure-iam-engine).
     */
    api_key: string;
    /** The hash value of the IBM Cloud API key that is used to create and manage service IDs. */
    api_key_hash?: string;
  }

  /** The base schema for retrieving a policy that is associated with a secret. */
  export interface GetSecretPoliciesOneOfGetSecretPolicyRotation extends GetSecretPoliciesOneOf {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: GetSecretPoliciesOneOfGetSecretPolicyRotationResourcesItem[];
  }

  /** Delete the credentials that are associated with an `iam_credentials` secret. */
  export interface SecretActionOneOfDeleteCredentialsForIAMSecret extends SecretActionOneOf {
    /** The service ID that you want to delete. It is deleted together with its API key. */
    service_id: string;
  }

  /** The request body of a `rotate` action. */
  export interface SecretActionOneOfRotateArbitrarySecretBody extends SecretActionOneOf {
    /** The new secret data to assign to an `arbitrary` secret. */
    payload: string;
  }

  /** The request body of a `rotate` action. */
  export interface SecretActionOneOfRotateUsernamePasswordSecretBody extends SecretActionOneOf {
    /** The new password to assign to a `username_password` secret. */
    password: string;
  }

}

export = IbmCloudSecretsManagerApiV1;
