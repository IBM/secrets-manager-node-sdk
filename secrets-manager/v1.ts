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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.37.0-a85661cd-20210802-190136
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * With IBM Cloud® Secrets Manager, you can create, lease, and centrally manage secrets that are used in IBM Cloud
 * services or your custom-built applications. Secrets are stored in a dedicated instance of Secrets Manager, built on
 * open source HashiCorp Vault.
 */

class SecretsManagerV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://secrets-manager.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'secrets_manager';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SecretsManagerV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {SecretsManagerV1}
   */

  public static newInstance(options: UserOptions): SecretsManagerV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SecretsManagerV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a SecretsManagerV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SecretsManagerV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(SecretsManagerV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * config
   ************************/

  /**
   * Create config element.
   *
   * Create a config element.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The Config element type.
   * @param {string} params.name - Config element name.
   * @param {string} params.type - Dns provider config type.
   * @param {JsonObject} params.config -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>>}
   */
  public createSecretConfigElement(
    params: SecretsManagerV1.CreateSecretConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'configElement', 'name', 'type', 'config'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'type': _params.type,
      'config': _params.config,
    };

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createSecretConfigElement'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}/{config_element}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get config elements by type.
   *
   * Get a config elements.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The Config element type.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetConfigElements>>}
   */
  public getSecretConfigElement(
    params: SecretsManagerV1.GetSecretConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetConfigElements>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'configElement'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSecretConfigElement'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}/{config_element}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update config element.
   *
   * Update a config element.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The Config element type.
   * @param {string} params.configName - Config name.
   * @param {string} params.type - Dns provider config type.
   * @param {JsonObject} params.config -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>>}
   */
  public updateSecretConfigElement(
    params: SecretsManagerV1.UpdateSecretConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'configElement', 'configName', 'type', 'config'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'type': _params.type,
      'config': _params.config,
    };

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
      'config_name': _params.configName,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateSecretConfigElement'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}/{config_element}/{config_name}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete config element.
   *
   * Delete a config element.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The Config element type.
   * @param {string} params.configName - Config name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public deleteSecretConfigElement(
    params: SecretsManagerV1.DeleteSecretConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'configElement', 'configName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
      'config_name': _params.configName,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteSecretConfigElement'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}/{config_element}/{config_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get config element.
   *
   * Get a config element.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The Config element type.
   * @param {string} params.configName - Config name.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>>}
   */
  public getSingleSecretConfigElement(
    params: SecretsManagerV1.GetSingleSecretConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'configElement', 'configName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
      'config_name': _params.configName,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSingleSecretConfigElement'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}/{config_element}/{config_name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Configure secrets of a given type.
   *
   * Updates the configuration for the given secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.apiKey - An IBM Cloud API key that has the capability to create and manage service IDs.
   *
   * The API key must be assigned the Editor platform role on the Access Groups Service and the Operator platform role
   * on the IAM Identity Service. For more information, see [Configuring the IAM secrets
   * engine](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-iam-credentials#configure-iam-secrets-engine-api).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public putConfig(
    params: SecretsManagerV1.PutConfigParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'apiKey'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'api_key': _params.apiKey,
    };

    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putConfig'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get the configuration for a secret type.
   *
   * Retrieves the configuration that is associated with the given secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetConfig>>}
   */
  public getConfig(
    params: SecretsManagerV1.GetConfigParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetConfig>> {
    const _params = { ...params };
    const requiredParams = ['secretType'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getConfig'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * policies
   ************************/

  /**
   * Set secret policies.
   *
   * Creates or updates one or more policies, such as an [automatic rotation
   * policy](http://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-rotate-secrets#auto-rotate-secret), for the
   * specified secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretPolicyRotation[]} params.resources - A collection of resources.
   * @param {string} [params.policy] - The type of policy that is associated with the specified secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretPolicies>>}
   */
  public putPolicy(
    params: SecretsManagerV1.PutPolicyParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretPolicies>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources,
    };

    const query = {
      'policy': _params.policy,
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'putPolicy'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/policies',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

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
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretPolicies>>}
   */
  public getPolicy(
    params: SecretsManagerV1.GetPolicyParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretPolicies>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'policy': _params.policy,
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPolicy'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/policies',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * secretGroups
   ************************/

  /**
   * Create a secret group.
   *
   * Creates a secret group that you can use to organize secrets and control who on your team has access to them.
   *
   * A successful request returns the ID value of the secret group, along with other metadata. To learn more about
   * secret groups, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-secret-groups).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretGroupResource[]} params.resources - A collection of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>>}
   */
  public createSecretGroup(
    params: SecretsManagerV1.CreateSecretGroupParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>> {
    const _params = { ...params };
    const requiredParams = ['metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createSecretGroup'
    );

    const parameters = {
      options: {
        url: '/api/v1/secret_groups',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List secret groups.
   *
   * Retrieves the list of secret groups that are available in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>>}
   */
  public listSecretGroups(
    params?: SecretsManagerV1.ListSecretGroupsParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>> {
    const _params = { ...params };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listSecretGroups'
    );

    const parameters = {
      options: {
        url: '/api/v1/secret_groups',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a secret group.
   *
   * Retrieves the metadata of an existing secret group by specifying the ID of the group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>>}
   */
  public getSecretGroup(
    params: SecretsManagerV1.GetSecretGroupParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>> {
    const _params = { ...params };
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSecretGroup'
    );

    const parameters = {
      options: {
        url: '/api/v1/secret_groups/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

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
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>>}
   */
  public updateSecretGroupMetadata(
    params: SecretsManagerV1.UpdateSecretGroupMetadataParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretGroupDef>> {
    const _params = { ...params };
    const requiredParams = ['id', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateSecretGroupMetadata'
    );

    const parameters = {
      options: {
        url: '/api/v1/secret_groups/{id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

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
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public deleteSecretGroup(
    params: SecretsManagerV1.DeleteSecretGroupParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteSecretGroup'
    );

    const parameters = {
      options: {
        url: '/api/v1/secret_groups/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * secrets
   ************************/

  /**
   * Create a secret.
   *
   * Creates a secret or imports an existing value that you can use to access or authenticate to a protected resource.
   *
   * Use this method to either generate or import an existing secret, such as an arbitrary value or a TLS certificate,
   * that you can manage in your Secrets Manager service instance. A successful request stores the secret in your
   * dedicated instance based on the secret type and data that you specify. The response returns the ID value of the
   * secret, along with other metadata.
   *
   * To learn more about the types of secrets that you can create with Secrets Manager, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-what-is-secret).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {CollectionMetadata} params.metadata - The metadata that describes the resource array.
   * @param {SecretResource[]} params.resources - A collection of resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.CreateSecret>>}
   */
  public createSecret(
    params: SecretsManagerV1.CreateSecretParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.CreateSecret>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources,
    };

    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createSecret'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List secrets by type.
   *
   * Retrieves a list of secrets based on the type that you specify.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {number} [params.limit] - The number of secrets to retrieve. By default, list operations return the first
   * 200 items. To retrieve a different set of items, use `limit` with `offset` to page through your available
   * resources.
   *
   * **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
   * `../secrets/{secret-type}?limit=5`.
   * @param {number} [params.offset] - The number of secrets to skip. By specifying `offset`, you retrieve a subset of
   * items that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
   * `../secrets/{secret-type}?offset=25&limit=25`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.ListSecrets>>}
   */
  public listSecrets(
    params: SecretsManagerV1.ListSecretsParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.ListSecrets>> {
    const _params = { ...params };
    const requiredParams = ['secretType'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listSecrets'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List all secrets.
   *
   * Retrieves a list of all secrets in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.limit] - The number of secrets to retrieve. By default, list operations return the first
   * 200 items. To retrieve a different set of items, use `limit` with `offset` to page through your available
   * resources.
   *
   * **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
   * `../secrets/{secret-type}?limit=5`.
   * @param {number} [params.offset] - The number of secrets to skip. By specifying `offset`, you retrieve a subset of
   * items that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
   * `../secrets/{secret-type}?offset=25&limit=25`.
   * @param {string} [params.search] - Filter secrets that contain the specified string. The fields that are searched
   * include: id, name, description, labels, secret_type.
   *
   * **Usage:** If you want to list only the secrets that contain the string "text", use
   * `../secrets/{secret-type}?search=text`.
   * @param {string} [params.sortBy] - Sort a list of secrets by the specified field.
   *
   * **Usage:** To sort a list of secrets by their creation date, use
   * `../secrets/{secret-type}?sort_by=creation_date`.
   * @param {string[]} [params.groups] - Filter secrets by groups.
   *
   * You can apply multiple filters by using a comma-separated list of secret group IDs. If you need to filter secrets
   * that are in the default secret group, use the `default` keyword.
   *
   * **Usage:** To retrieve a list of secrets that are associated with an existing secret group or the default group,
   * use `../secrets?groups={secret_group_ID},default`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.ListSecrets>>}
   */
  public listAllSecrets(
    params?: SecretsManagerV1.ListAllSecretsParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.ListSecrets>> {
    const _params = { ...params };

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
      'search': _params.search,
      'sort_by': _params.sortBy,
      'groups': _params.groups,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAllSecrets'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a secret.
   *
   * Retrieves a secret and its details by specifying the ID of the secret.
   *
   * A successful request returns the secret data that is associated with your secret, along with other metadata. To
   * view only the details of a specified secret without retrieving its value, use the [Get secret
   * metadata](#get-secret-metadata) method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecret>>}
   */
  public getSecret(
    params: SecretsManagerV1.GetSecretParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecret>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSecret'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Invoke an action on a secret.
   *
   * Invokes an action on a specified secret. This method supports the following actions:
   *
   * - `rotate`: Replace the value of an `arbitrary`, `username_password`, `public_cert` or `imported_cert` secret.
   * - `delete_credentials`: Delete the API key that is associated with an `iam_credentials` secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {string} params.action - The action to perform on the specified secret.
   * @param {SecretAction} params.secretAction - The properties to update for the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecret>>}
   */
  public updateSecret(
    params: SecretsManagerV1.UpdateSecretParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecret>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id', 'action', 'secretAction'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.secretAction;
    const query = {
      'action': _params.action,
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateSecret'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a secret.
   *
   * Deletes a secret by specifying the ID of the secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public deleteSecret(
    params: SecretsManagerV1.DeleteSecretParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteSecret'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a version of a secret.
   *
   * Retrieves a version of a secret by specifying the ID of the version or the alias `previous`.
   *
   * A successful request returns the secret data that is associated with the specified version of your secret, along
   * with other metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type. Supported options include: imported_cert.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {string} params.versionId - The v4 UUID that uniquely identifies the secret version. You can also use
   * `previous` to retrieve the previous version.
   *
   * **Note:** To find the version ID of a secret, use the [Get secret metadata](#get-secret-metadata) method and check
   * the response details.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretVersion>>}
   */
  public getSecretVersion(
    params: SecretsManagerV1.GetSecretVersionParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretVersion>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id', 'versionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
      'version_id': _params.versionId,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSecretVersion'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/versions/{version_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get secret version metadata.
   *
   * Retrieves secret version metadata by specifying the ID of the version or the alias `previous`.
   *
   * A successful request returns the metadata that is associated with the specified version of your secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type. Supported options include: imported_cert.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {string} params.versionId - The v4 UUID that uniquely identifies the secret version. You can also use
   * `previous` to retrieve the previous version.
   *
   * **Note:** To find the version ID of a secret, use the [Get secret metadata](#get-secret-metadata) method and check
   * the response details.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretVersionMetadata>>}
   */
  public getSecretVersionMetadata(
    params: SecretsManagerV1.GetSecretVersionMetadataParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecretVersionMetadata>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id', 'versionId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
      'version_id': _params.versionId,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSecretVersionMetadata'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/versions/{version_id}/metadata',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get secret metadata.
   *
   * Retrieves the details of a secret by specifying the ID.
   *
   * A successful request returns only metadata about the secret, such as its name and creation date. To retrieve the
   * value of a secret, use the [Get a secret](#get-secret) or [Get a version of a secret](#get-secret-version) methods.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretMetadataRequest>>}
   */
  public getSecretMetadata(
    params: SecretsManagerV1.GetSecretMetadataParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretMetadataRequest>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSecretMetadata'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/metadata',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

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
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretMetadataRequest>>}
   */
  public updateSecretMetadata(
    params: SecretsManagerV1.UpdateSecretMetadataParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.SecretMetadataRequest>> {
    const _params = { ...params };
    const requiredParams = ['secretType', 'id', 'metadata', 'resources'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources,
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateSecretMetadata'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/metadata',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace SecretsManagerV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createSecretConfigElement` operation. */
  export interface CreateSecretConfigElementParams {
    /** The secret type. */
    secretType: CreateSecretConfigElementConstants.SecretType | string;
    /** The Config element type. */
    configElement: CreateSecretConfigElementConstants.ConfigElement | string;
    /** Config element name. */
    name: string;
    /** Dns provider config type. */
    type: string;
    config: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSecretConfigElement` operation. */
  export namespace CreateSecretConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
    }
    /** The Config element type. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
    }
  }

  /** Parameters for the `getSecretConfigElement` operation. */
  export interface GetSecretConfigElementParams {
    /** The secret type. */
    secretType: GetSecretConfigElementConstants.SecretType | string;
    /** The Config element type. */
    configElement: GetSecretConfigElementConstants.ConfigElement | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSecretConfigElement` operation. */
  export namespace GetSecretConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
    }
    /** The Config element type. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
    }
  }

  /** Parameters for the `updateSecretConfigElement` operation. */
  export interface UpdateSecretConfigElementParams {
    /** The secret type. */
    secretType: UpdateSecretConfigElementConstants.SecretType | string;
    /** The Config element type. */
    configElement: UpdateSecretConfigElementConstants.ConfigElement | string;
    /** Config name. */
    configName: string;
    /** Dns provider config type. */
    type: string;
    config: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateSecretConfigElement` operation. */
  export namespace UpdateSecretConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
    }
    /** The Config element type. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
    }
  }

  /** Parameters for the `deleteSecretConfigElement` operation. */
  export interface DeleteSecretConfigElementParams {
    /** The secret type. */
    secretType: DeleteSecretConfigElementConstants.SecretType | string;
    /** The Config element type. */
    configElement: DeleteSecretConfigElementConstants.ConfigElement | string;
    /** Config name. */
    configName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteSecretConfigElement` operation. */
  export namespace DeleteSecretConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
    }
    /** The Config element type. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
    }
  }

  /** Parameters for the `getSingleSecretConfigElement` operation. */
  export interface GetSingleSecretConfigElementParams {
    /** The secret type. */
    secretType: GetSingleSecretConfigElementConstants.SecretType | string;
    /** The Config element type. */
    configElement: GetSingleSecretConfigElementConstants.ConfigElement | string;
    /** Config name. */
    configName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSingleSecretConfigElement` operation. */
  export namespace GetSingleSecretConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
    }
    /** The Config element type. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
    }
  }

  /** Parameters for the `putConfig` operation. */
  export interface PutConfigParams {
    /** The secret type. */
    secretType: PutConfigConstants.SecretType | string;
    /** An IBM Cloud API key that has the capability to create and manage service IDs.
     *
     *  The API key must be assigned the Editor platform role on the Access Groups Service and the Operator platform
     *  role on the IAM Identity Service. For more information, see [Configuring the IAM secrets
     *  engine](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-iam-credentials#configure-iam-secrets-engine-api).
     */
    apiKey: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `putConfig` operation. */
  export namespace PutConfigConstants {
    /** The secret type. */
    export enum SecretType {
      IAM_CREDENTIALS = 'iam_credentials',
      PUBLIC_CERT = 'public_cert',
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
      PUBLIC_CERT = 'public_cert',
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
      PUBLIC_CERT = 'public_cert',
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
      PUBLIC_CERT = 'public_cert',
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
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      USERNAME_PASSWORD = 'username_password',
    }
  }

  /** Parameters for the `listSecrets` operation. */
  export interface ListSecretsParams {
    /** The secret type. */
    secretType: ListSecretsConstants.SecretType | string;
    /** The number of secrets to retrieve. By default, list operations return the first 200 items. To retrieve a
     *  different set of items, use `limit` with `offset` to page through your available resources.
     *
     *  **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
     *  `../secrets/{secret-type}?limit=5`.
     */
    limit?: number;
    /** The number of secrets to skip. By specifying `offset`, you retrieve a subset of items that starts with the
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
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      USERNAME_PASSWORD = 'username_password',
    }
  }

  /** Parameters for the `listAllSecrets` operation. */
  export interface ListAllSecretsParams {
    /** The number of secrets to retrieve. By default, list operations return the first 200 items. To retrieve a
     *  different set of items, use `limit` with `offset` to page through your available resources.
     *
     *  **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5 secrets, use
     *  `../secrets/{secret-type}?limit=5`.
     */
    limit?: number;
    /** The number of secrets to skip. By specifying `offset`, you retrieve a subset of items that starts with the
     *  `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
     *  `../secrets/{secret-type}?offset=25&limit=25`.
     */
    offset?: number;
    /** Filter secrets that contain the specified string. The fields that are searched include: id, name,
     *  description, labels, secret_type.
     *
     *  **Usage:** If you want to list only the secrets that contain the string "text", use
     *  `../secrets/{secret-type}?search=text`.
     */
    search?: string;
    /** Sort a list of secrets by the specified field.
     *
     *  **Usage:** To sort a list of secrets by their creation date, use
     *  `../secrets/{secret-type}?sort_by=creation_date`.
     */
    sortBy?: ListAllSecretsConstants.SortBy | string;
    /** Filter secrets by groups.
     *
     *  You can apply multiple filters by using a comma-separated list of secret group IDs. If you need to filter
     *  secrets that are in the default secret group, use the `default` keyword.
     *
     *  **Usage:** To retrieve a list of secrets that are associated with an existing secret group or the default group,
     *  use `../secrets?groups={secret_group_ID},default`.
     */
    groups?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAllSecrets` operation. */
  export namespace ListAllSecretsConstants {
    /** Sort a list of secrets by the specified field. **Usage:** To sort a list of secrets by their creation date, use `../secrets/{secret-type}?sort_by=creation_date`. */
    export enum SortBy {
      ID = 'id',
      CREATION_DATE = 'creation_date',
      EXPIRATION_DATE = 'expiration_date',
      SECRET_TYPE = 'secret_type',
      NAME = 'name',
    }
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
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      USERNAME_PASSWORD = 'username_password',
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
    /** The properties to update for the secret. */
    secretAction: SecretAction;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateSecret` operation. */
  export namespace UpdateSecretConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      USERNAME_PASSWORD = 'username_password',
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
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      USERNAME_PASSWORD = 'username_password',
    }
  }

  /** Parameters for the `getSecretVersion` operation. */
  export interface GetSecretVersionParams {
    /** The secret type. Supported options include: imported_cert. */
    secretType: GetSecretVersionConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    /** The v4 UUID that uniquely identifies the secret version. You can also use `previous` to retrieve the
     *  previous version.
     *
     *  **Note:** To find the version ID of a secret, use the [Get secret metadata](#get-secret-metadata) method and
     *  check the response details.
     */
    versionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSecretVersion` operation. */
  export namespace GetSecretVersionConstants {
    /** The secret type. Supported options include: imported_cert. */
    export enum SecretType {
      IMPORTED_CERT = 'imported_cert',
    }
  }

  /** Parameters for the `getSecretVersionMetadata` operation. */
  export interface GetSecretVersionMetadataParams {
    /** The secret type. Supported options include: imported_cert. */
    secretType: GetSecretVersionMetadataConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    /** The v4 UUID that uniquely identifies the secret version. You can also use `previous` to retrieve the
     *  previous version.
     *
     *  **Note:** To find the version ID of a secret, use the [Get secret metadata](#get-secret-metadata) method and
     *  check the response details.
     */
    versionId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSecretVersionMetadata` operation. */
  export namespace GetSecretVersionMetadataConstants {
    /** The secret type. Supported options include: imported_cert. */
    export enum SecretType {
      IMPORTED_CERT = 'imported_cert',
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
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      USERNAME_PASSWORD = 'username_password',
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
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      USERNAME_PASSWORD = 'username_password',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /** CertificateSecretData. */
  export interface CertificateSecretData {
    /** The contents of the certificate. */
    certificate?: string;
    /** The private key that is associated with the certificate. */
    private_key?: string;
    /** The intermediate certificate that is associated with the certificate. */
    intermediate?: string;
  }

  /** The metadata that describes the resource array. */
  export interface CollectionMetadata {
    /** The type of resources in the resource array. */
    collection_type: string;
    /** The number of elements in the resource array. */
    collection_total: number;
  }

  /** Config element. */
  export interface ConfigElement {
    /** Config element name. */
    name: string;
    /** Dns provider config type. */
    type: string;
    config: JsonObject;
  }

  /** Dns provider config metadata. */
  export interface ConfigElementMetadata {
    /** Config element name. */
    name: string;
    /** Dns provider config type. */
    type: string;
  }

  /** Properties that describe a secret. */
  export interface CreateSecret {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretResource[];
  }

  /** Configuration that is used to generate IAM credentials. */
  export interface GetConfig {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: GetConfigResourcesItem[];
  }

  /** Config elements. */
  export interface GetConfigElements {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: GetConfigElementsResourcesItem[];
  }

  /** GetConfigElementsResourcesItem. */
  export interface GetConfigElementsResourcesItem {
  }

  /** GetConfigResourcesItem. */
  export interface GetConfigResourcesItem {
  }

  /** Properties that describe a secret. */
  export interface GetSecret {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretResource[];
  }

  /** GetSecretPolicies. */
  export interface GetSecretPolicies {
  }

  /** Properties that describe a rotation policy. */
  export interface GetSecretPolicyRotationResourcesItem {
    /** The v4 UUID that uniquely identifies the policy. */
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
    /** The MIME type that represents the policy. Currently, only the default is supported. */
    type: string;
    rotation: SecretPolicyRotationRotation;
  }

  /** Properties that describe the version of a secret. */
  export interface GetSecretVersion {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretVersion[];
  }

  /** Properties that describe the version of a secret. */
  export interface GetSecretVersionMetadata {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretVersionMetadata[];
  }

  /** Config element. */
  export interface GetSingleConfigElement {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: ConfigElement[];
  }

  /** Public certificate issuance info. */
  export interface IssuanceInfo {
    /** The date the certificate was ordered. The date format follows RFC 3339. */
    ordered_on?: string;
    /** The issuance info error code. */
    error_code?: string;
    /** The issuance info error message. */
    error_message?: string;
    bundle_certs?: boolean;
    /** The secret state based on NIST SP 800-57. States are integers and correspond to the Pre-activation = 0,
     *  Active = 1,  Suspended = 2, Deactivated = 3, and Destroyed = 5 values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    auto_rotated?: boolean;
    ca?: string;
    dns?: string;
  }

  /** Properties that describe a list of secrets. */
  export interface ListSecrets {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources?: SecretResource[];
  }

  /** Rotation. */
  export interface Rotation {
    auto_rotate?: boolean;
    rotate_keys?: boolean;
  }

  /** SecretAction. */
  export interface SecretAction {
  }

  /** Properties that describe a secret group. */
  export interface SecretGroupDef {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretGroupResource[];
  }

  /** Metadata properties to update for a secret group. */
  export interface SecretGroupMetadataUpdatable {
    /** A human-readable name to assign to your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret
     *  group.
     */
    name?: string;
    /** An extended description of your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
  }

  /** Properties that describe a secret group. */
  export interface SecretGroupResource {
    /** The v4 UUID that uniquely identifies the secret group. */
    id?: string;
    /** A human-readable name to assign to your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret
     *  group.
     */
    name?: string;
    /** An extended description of your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** The date the secret group was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** Updates when the metadata of the secret group is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The MIME type that represents the secret group. */
    type?: string;
    /** SecretGroupResource accepts additional properties. */
    [propName: string]: any;
  }

  /** SecretMetadata. */
  export interface SecretMetadata {
  }

  /** The metadata of a secret. */
  export interface SecretMetadataRequest {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretMetadata[];
  }

  /** Properties that describe a rotation policy. */
  export interface SecretPolicyRotation {
    /** The MIME type that represents the policy. Currently, only the default is supported. */
    type: string;
    rotation: SecretPolicyRotationRotation;
  }

  /** SecretPolicyRotationRotation. */
  export interface SecretPolicyRotationRotation {
  }

  /** SecretResource. */
  export interface SecretResource {
  }

  /** SecretVersion. */
  export interface SecretVersion {
  }

  /** SecretVersionMetadata. */
  export interface SecretVersionMetadata {
  }

  /** CertificateValidity. */
  export interface CertificateValidity {
    /** The date the certificate validity period begins. */
    not_before?: string;
    /** The date the certificate validity period ends. */
    not_after?: string;
  }

  /** Metadata properties that describe an arbitrary secret. */
  export interface ArbitrarySecretMetadata extends SecretMetadata {
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
    /** An extended description of your secret.
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
    /** The Cloud Resource Name (CRN) that uniquely identifies the resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when any part of the secret metadata is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions the secret has. */
    versions_total?: number;
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
  }

  /** Properties that describe a secret. */
  export interface ArbitrarySecretResource extends SecretResource {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** An extended description of your secret.
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
    /** A text representation of the secret state. */
    state_description?: string;
    /** The secret type. */
    secret_type?: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies your Secrets Manager resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when the actual secret is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions that are associated with a secret. */
    versions_total?: number;
    /** An array that contains metadata for each secret version. For more information on the metadata properties,
     *  see [Get secret version metadata](#get-secret-version-metadata).
     */
    versions?: JsonObject[];
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
    /** The new secret data to assign to the secret. */
    payload?: string;
    secret_data?: JsonObject;
  }

  /** Properties that describe a secret version. */
  export interface ArbitrarySecretVersionMetadata extends SecretVersionMetadata {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
  }

  /** Metadata properties that describe a certificate secret. */
  export interface CertificateSecretMetadata extends SecretMetadata {
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
    /** An extended description of your secret.
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
    /** The Cloud Resource Name (CRN) that uniquely identifies the resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when any part of the secret metadata is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions the secret has. */
    versions_total?: number;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The identifier for the cryptographic algorthim that was used by the issuing certificate authority to sign
     *  the ceritificate.
     */
    algorithm?: string;
    /** The identifier for the cryptographic algorithm that was used to generate the public key that is associated
     *  with the certificate.
     */
    key_algorithm?: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    validity?: CertificateValidity;
    /** The fully qualified domain name or host domain name that is defined for the certificate. */
    common_name?: string;
    /** Indicates whether the certificate was imported with an associated intermediate certificate. */
    intermediate_included?: boolean;
    /** Indicates whether the certificate was imported with an associated private key. */
    private_key_included?: boolean;
    /** The alternative names that are defined for the certificate. */
    alt_names?: string[];
    /** The date that the certificate expires. The date format follows RFC 3339. */
    expiration_date?: string;
  }

  /** Properties that describe a secret. */
  export interface CertificateSecretResource extends SecretResource {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** An extended description of your secret.
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
    /** A text representation of the secret state. */
    state_description?: string;
    /** The secret type. */
    secret_type?: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies your Secrets Manager resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when the actual secret is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions that are associated with a secret. */
    versions_total?: number;
    /** An array that contains metadata for each secret version. For more information on the metadata properties,
     *  see [Get secret version metadata](#get-secret-version-metadata).
     */
    versions?: JsonObject[];
    /** The contents of your certificate. The data must be formatted on a single line with embedded newline
     *  characters.
     */
    certificate?: string;
    /** The private key to associate with the certificate. The data must be formatted on a single line with embedded
     *  newline characters.
     */
    private_key?: string;
    /** The intermediate certificate to associate with the root certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    intermediate?: string;
    secret_data?: JsonObject;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The identifier for the cryptographic algorthim that was used by the issuing certificate authority to sign
     *  the ceritificate.
     */
    algorithm?: string;
    /** The identifier for the cryptographic algorithm that was used to generate the public key that is associated
     *  with the certificate.
     */
    key_algorithm?: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    validity?: CertificateValidity;
    /** The fully qualified domain name or host domain name that is defined for the certificate. */
    common_name?: string;
    /** Indicates whether the certificate was imported with an associated intermediate certificate. */
    intermediate_included?: boolean;
    /** Indicates whether the certificate was imported with an associated private key. */
    private_key_included?: boolean;
    /** The alternative names that are defined for the certificate. */
    alt_names?: string[];
    /** The date that the certificate expires. The date format follows RFC 3339. */
    expiration_date?: string;
  }

  /** CertificateSecretVersion. */
  export interface CertificateSecretVersion extends SecretVersion {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies the secret. */
    crn?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    validity?: CertificateValidity;
    serial_number?: string;
    /** The date that the certificate expires. The date format follows RFC 3339. */
    expiration_date?: string;
    secret_data?: CertificateSecretData;
  }

  /** Properties that describe a secret version. */
  export interface CertificateSecretVersionMetadata extends SecretVersionMetadata {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    serial_number?: string;
    /** The date that the certificate expires. The date format follows RFC 3339. */
    expiration_date?: string;
    validity?: CertificateValidity;
  }

  /** Delete the credentials that are associated with an `iam_credentials` secret. */
  export interface DeleteCredentialsForIAMCredentialsSecret extends SecretAction {
    /** The service ID that you want to delete. It is deleted together with its API key. */
    service_id: string;
  }

  /** Certificate authorities config. */
  export interface GetConfigElementsResourcesItemCertificateAuthoritiesConfig extends GetConfigElementsResourcesItem {
    certificate_authorities: ConfigElementMetadata[];
  }

  /** Dns providers config. */
  export interface GetConfigElementsResourcesItemDnsProvidersConfig extends GetConfigElementsResourcesItem {
    dns_providers: ConfigElementMetadata[];
  }

  /** Properties that describe a rotation policy. */
  export interface GetSecretPolicyRotation extends GetSecretPolicies {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: GetSecretPolicyRotationResourcesItem[];
  }

  /** Configuration that is used to generate IAM credentials. */
  export interface IAMCredentialsSecretEngineRootConfig extends GetConfigResourcesItem {
    /** An IBM Cloud API key that has the capability to create and manage service IDs.
     *
     *  The API key must be assigned the Editor platform role on the Access Groups Service and the Operator platform
     *  role on the IAM Identity Service. For more information, see [Configuring the IAM secrets
     *  engine](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-iam-credentials#configure-iam-secrets-engine-api).
     */
    api_key: string;
    /** The hash value of the IBM Cloud API key that is used to create and manage service IDs. */
    api_key_hash?: string;
  }

  /** Metadata properties that describe a iam_credentials secret. */
  export interface IAMCredentialsSecretMetadata extends SecretMetadata {
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
    /** An extended description of your secret.
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
    /** The Cloud Resource Name (CRN) that uniquely identifies the resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when any part of the secret metadata is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions the secret has. */
    versions_total?: number;
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration, such as
     *  `120m` or `24h`.
     */
    ttl?: any;
    /** For `iam_credentials` secrets, this field controls whether to use the same service ID and API key for future
     *  read operations on this secret. If set to `true`, the service reuses the current credentials. If set to `false`,
     *  a new service ID and API key is generated each time that the secret is read or accessed.
     */
    reuse_api_key?: boolean;
  }

  /** Properties that describe a secret. */
  export interface IAMCredentialsSecretResource extends SecretResource {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** An extended description of your secret.
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
    /** A text representation of the secret state. */
    state_description?: string;
    /** The secret type. */
    secret_type?: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies your Secrets Manager resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when the actual secret is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions that are associated with a secret. */
    versions_total?: number;
    /** An array that contains metadata for each secret version. For more information on the metadata properties,
     *  see [Get secret version metadata](#get-secret-version-metadata).
     */
    versions?: JsonObject[];
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration, such as
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
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease (see the `ttl` field), the API key is deleted automatically. If
     *  you want to continue to use the same API key for future read operations, see the `reuse_api_key` field.
     */
    api_key?: string;
    /** The service ID under which the API key (see the `api_key` field) is created. This service ID is added to the
     *  access groups that you assign for this secret.
     */
    service_id?: string;
    /** Set to `true` to reuse the service ID and API key for this secret.
     *
     *  Use this field to control whether to use the same service ID and API key for future read operations on this
     *  secret. If set to `true`, the service reuses the current credentials. If set to `false`, a new service ID and
     *  API key is generated each time that the secret is read or accessed.
     */
    reuse_api_key?: boolean;
  }

  /** Properties that describe a secret version. */
  export interface IAMCredentialsSecretVersionMetadata extends SecretVersionMetadata {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
  }

  /** Configuration for `public_cert` secret. */
  export interface PublicCertSecretEngineRootConfig extends GetConfigResourcesItem {
    /** `public_cert` certificate authorites configuration. */
    certificate_authorities?: ConfigElementMetadata[];
    /** `public_cert` dns provider configuration. */
    dns_providers?: ConfigElementMetadata[];
  }

  /** Metadata properties that describe a public certificate secret. */
  export interface PublicCertificateMetadataSecretResource extends SecretMetadata {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** An extended description of your secret.
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
    /** A text representation of the secret state. */
    state_description?: string;
    /** The secret type. */
    secret_type?: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies your Secrets Manager resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when the actual secret is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions that are associated with a secret. */
    versions_total?: number;
    /** An array that contains metadata for each secret version. For more information on the metadata properties,
     *  see [Get secret version metadata](#get-secret-version-metadata).
     */
    versions?: JsonObject[];
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    bundle_certs?: boolean;
    /** The configured ca name. */
    ca?: string;
    /** The configured dns provider. */
    dns?: string;
    /** The identifier for the cryptographic algorthim to be used by the issuing certificate authority to sign the
     *  ceritificate.
     */
    algorithm?: string;
    /** The identifier for the cryptographic algorithm to be used to generate the public key that is associated with
     *  the certificate.
     */
    key_algorithm?: string;
    /** The alternative names that are defined for the certificate. */
    alt_names?: string[];
    /** The fully qualified domain name or host domain name for the certificate. */
    common_name?: string;
    rotation?: Rotation;
    /** Public certificate issuance info. */
    issuance_info?: IssuanceInfo;
  }

  /** Properties that describe a secret. */
  export interface PublicCertificateSecretResource extends SecretResource {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** An extended description of your secret.
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
    /** A text representation of the secret state. */
    state_description?: string;
    /** The secret type. */
    secret_type?: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies your Secrets Manager resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when the actual secret is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions that are associated with a secret. */
    versions_total?: number;
    /** An array that contains metadata for each secret version. For more information on the metadata properties,
     *  see [Get secret version metadata](#get-secret-version-metadata).
     */
    versions?: JsonObject[];
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    bundle_certs?: boolean;
    /** The configured ca name. */
    ca?: string;
    /** The configured dns provider. */
    dns?: string;
    /** The identifier for the cryptographic algorthim to be used by the issuing certificate authority to sign the
     *  ceritificate.
     */
    algorithm?: string;
    /** The identifier for the cryptographic algorithm to be used to generate the public key that is associated with
     *  the certificate.
     */
    key_algorithm?: string;
    /** The alternative names that are defined for the certificate. */
    alt_names?: string[];
    /** The fully qualified domain name or host domain name for the certificate. */
    common_name?: string;
    rotation?: Rotation;
    /** Public certificate issuance info. */
    issuance_info?: IssuanceInfo;
    secret_data?: JsonObject;
  }

  /** The request body of a `rotate` action. */
  export interface RotateArbitrarySecretBody extends SecretAction {
    /** The new secret data to assign to an `arbitrary` secret. */
    payload: string;
  }

  /** The request body of a rotate certificate action. */
  export interface RotateCertificateBody extends SecretAction {
    /** The new data to associate with the certificate. */
    certificate: string;
    /** The new private key to associate with the certificate. */
    private_key?: string;
    /** The new intermediate certificate to associate with the certificate. */
    intermediate?: string;
  }

  /** The request body of a `rotate` action. */
  export interface RotatePublicCertBody extends SecretAction {
    /** Determine whether keys should be rotated. */
    rotate_keys: boolean;
  }

  /** The request body of a `rotate` action. */
  export interface RotateUsernamePasswordSecretBody extends SecretAction {
    /** The new password to assign to a `username_password` secret. */
    password: string;
  }

  /** The secret rotation time interval. */
  export interface SecretPolicyRotationRotationPolicyRotation extends SecretPolicyRotationRotation {
    /** Specifies the length of the secret rotation time interval. */
    interval: number;
    /** Specifies the units for the secret rotation time interval. */
    unit: string;
  }

  /** The `public_cert` secret rotation policy. */
  export interface SecretPolicyRotationRotationPublicCertPolicyRotation extends SecretPolicyRotationRotation {
    auto_rotate: boolean;
    rotate_keys: boolean;
  }

  /** Metadata properties that describe a username_password secret. */
  export interface UsernamePasswordSecretMetadata extends SecretMetadata {
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
    /** An extended description of your secret.
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
    /** The Cloud Resource Name (CRN) that uniquely identifies the resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when any part of the secret metadata is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions the secret has. */
    versions_total?: number;
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
  }

  /** Properties that describe a secret. */
  export interface UsernamePasswordSecretResource extends SecretResource {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** A human-readable alias to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an alias for your secret.
     */
    name: string;
    /** An extended description of your secret.
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
    /** A text representation of the secret state. */
    state_description?: string;
    /** The secret type. */
    secret_type?: string;
    /** The Cloud Resource Name (CRN) that uniquely identifies your Secrets Manager resource. */
    crn?: string;
    /** The date the secret was created. The date format follows RFC 3339. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret. */
    created_by?: string;
    /** Updates when the actual secret is modified. The date format follows RFC 3339. */
    last_update_date?: string;
    /** The number of versions that are associated with a secret. */
    versions_total?: number;
    /** An array that contains metadata for each secret version. For more information on the metadata properties,
     *  see [Get secret version metadata](#get-secret-version-metadata).
     */
    versions?: JsonObject[];
    /** The username to assign to this secret. */
    username?: string;
    /** The password to assign to this secret. */
    password?: string;
    secret_data?: JsonObject;
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
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that can be auto-rotated and have an existing rotation policy.
     */
    next_rotation_date?: string;
  }

  /** Properties that describe a secret version. */
  export interface UsernamePasswordSecretVersionMetadata extends SecretVersionMetadata {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
  }
}

export = SecretsManagerV1;
