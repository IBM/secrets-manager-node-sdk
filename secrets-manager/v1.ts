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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.46.0-a4e29da0-20220224-210428
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * With IBM Cloud® Secrets Manager, you can create, lease, and centrally manage secrets that are used in IBM Cloud
 * services or your custom-built applications. Secrets are stored in a dedicated instance of Secrets Manager, which is
 * built on open source HashiCorp Vault.
 *
 * API Version: 1.0.0
 * See: https://cloud.ibm.com/docs/secrets-manager
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
    const _requiredParams = ['metadata', 'resources'];
    const _validParams = ['metadata', 'resources', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

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
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecretGroup');

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
    const _requiredParams = ['id', 'metadata', 'resources'];
    const _validParams = ['id', 'metadata', 'resources', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
   * Create a secret or import an existing value that you can use to access or authenticate to a protected resource.
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
    const _requiredParams = ['secretType', 'metadata', 'resources'];
    const _validParams = ['secretType', 'metadata', 'resources', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'metadata': _params.metadata,
      'resources': _params.resources,
    };

    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'createSecret');

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
    const _requiredParams = ['secretType'];
    const _validParams = ['secretType', 'limit', 'offset', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'listSecrets');

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
    const _requiredParams = [];
    const _validParams = ['limit', 'offset', 'search', 'sortBy', 'groups', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
      'search': _params.search,
      'sort_by': _params.sortBy,
      'groups': _params.groups,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'listAllSecrets');

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
   * Get a secret and its details by specifying the ID of the secret.
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
    const _requiredParams = ['secretType', 'id'];
    const _validParams = ['secretType', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'getSecret');

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
   * - `rotate`: Replace the value of a secret.
   * - `restore`: Restore a previous version of an `iam_credentials` secret.
   * - `revoke`: Revoke a private certificate.
   * - `delete_credentials`: Delete the API key that is associated with an `iam_credentials` secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {string} params.action - The action to perform on the specified secret.
   * @param {SecretAction} [params.secretAction] - The properties to update for the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecret>>}
   */
  public updateSecret(
    params: SecretsManagerV1.UpdateSecretParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSecret>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'id', 'action'];
    const _validParams = ['secretType', 'id', 'action', 'secretAction', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.secretAction;
    const query = {
      'action': _params.action,
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'updateSecret');

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
    const _requiredParams = ['secretType', 'id'];
    const _validParams = ['secretType', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteSecret');

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List versions of a secret.
   *
   * Retrieves a list of the versions of a secret.
   *
   * A successful request returns the list of the versions along with the metadata of each version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.id - The v4 UUID that uniquely identifies the secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.ListSecretVersions>>}
   */
  public listSecretVersions(
    params: SecretsManagerV1.ListSecretVersionsParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.ListSecretVersions>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'id'];
    const _validParams = ['secretType', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listSecretVersions'
    );

    const parameters = {
      options: {
        url: '/api/v1/secrets/{secret_type}/{id}/versions',
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
   * Get a version of a secret.
   *
   * Retrieves a version of a secret by specifying the ID of the version or the alias `previous`.
   *
   * A successful request returns the secret data that is associated with the specified version of your secret, along
   * with other metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
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
    const _requiredParams = ['secretType', 'id', 'versionId'];
    const _validParams = ['secretType', 'id', 'versionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
   * @param {string} params.secretType - The secret type.
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
    const _requiredParams = ['secretType', 'id', 'versionId'];
    const _validParams = ['secretType', 'id', 'versionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['secretType', 'id'];
    const _validParams = ['secretType', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['secretType', 'id', 'metadata', 'resources'];
    const _validParams = ['secretType', 'id', 'metadata', 'resources', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
    const _requiredParams = ['secretType', 'id', 'metadata', 'resources'];
    const _validParams = ['secretType', 'id', 'metadata', 'resources', 'policy', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'putPolicy');

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
    const _requiredParams = ['secretType', 'id'];
    const _validParams = ['secretType', 'id', 'policy', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'policy': _params.policy,
    };

    const path = {
      'secret_type': _params.secretType,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'getPolicy');

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
   * config
   ************************/

  /**
   * Set the configuration of a secret type.
   *
   * Sets the configuration for the specified secret type.
   *
   * Use this method to configure the IAM credentials (`iam_credentials`) engine for your service instance. Looking to
   * set up certificate ordering? To configure the public certificates (`public_cert`) engine, use the [Add a
   * configuration](#create_config_element) method.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {EngineConfig} params.engineConfig - Properties to update for a secrets engine.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public putConfig(
    params: SecretsManagerV1.PutConfigParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'engineConfig'];
    const _validParams = ['secretType', 'engineConfig', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.engineConfig;
    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'putConfig');

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
   * Get the configuration of a secret type.
   *
   * Retrieves the configuration that is associated with the specified secret type.
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
    const _requiredParams = ['secretType'];
    const _validParams = ['secretType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV1.DEFAULT_SERVICE_NAME, 'v1', 'getConfig');

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

  /**
   * Add a configuration.
   *
   * Adds a configuration element to the specified secret type.
   *
   * Use this method to define the configurations that are required to enable the public certificates (`public_cert`)
   * engine and the private certificates (`private_cert`) engine.
   *
   * You can add multiple configurations for your instance as follows:
   *
   * - Up to 10 public certificate authority configurations
   * - Up to 10 DNS provider configurations
   * - Up to 10 private root certifiate authority configurations
   * - Up to 10 private intermediate certifiate authority configurations
   * - Up to 10 certificate templates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The configuration element to define or manage.
   * @param {string} params.name - The human-readable name to assign to your configuration.
   * @param {string} params.type - The type of configuration. Value options differ depending on the `config_element`
   * property that you want to define.
   * @param {ConfigElementDefConfig} params.config - The configuration to define for the specified secret type.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>>}
   */
  public createConfigElement(
    params: SecretsManagerV1.CreateConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'configElement', 'name', 'type', 'config'];
    const _validParams = ['secretType', 'configElement', 'name', 'type', 'config', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'createConfigElement'
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
   * List configurations.
   *
   * Lists the configuration elements that are associated with a specified secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The configuration element to define or manage.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetConfigElements>>}
   */
  public getConfigElements(
    params: SecretsManagerV1.GetConfigElementsParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetConfigElements>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'configElement'];
    const _validParams = ['secretType', 'configElement', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getConfigElements'
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
   * Get a configuration.
   *
   * Retrieves the details of a specific configuration that is associated with a secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The configuration element to define or manage.
   * @param {string} params.configName - The name of your configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>>}
   */
  public getConfigElement(
    params: SecretsManagerV1.GetConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'configElement', 'configName'];
    const _validParams = ['secretType', 'configElement', 'configName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
      'config_name': _params.configName,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getConfigElement'
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
   * Update a configuration.
   *
   * Updates a configuration element that is associated with the specified secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The configuration element to define or manage.
   * @param {string} params.configName - The name of your configuration.
   * @param {string} params.type - The type of configuration. Value options differ depending on the `config_element`
   * property that you want to define.
   * @param {JsonObject} params.config - Properties that describe a configuration, which depends on type.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>>}
   */
  public updateConfigElement(
    params: SecretsManagerV1.UpdateConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetSingleConfigElement>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'configElement', 'configName', 'type', 'config'];
    const _validParams = ['secretType', 'configElement', 'configName', 'type', 'config', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
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
      'updateConfigElement'
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
   * Delete a configuration.
   *
   * Deletes a configuration element from the specified secret type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type.
   * @param {string} params.configElement - The configuration element to define or manage.
   * @param {string} params.configName - The name of your configuration.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public deleteConfigElement(
    params: SecretsManagerV1.DeleteConfigElementParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'configElement', 'configName'];
    const _validParams = ['secretType', 'configElement', 'configName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
      'config_element': _params.configElement,
      'config_name': _params.configName,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteConfigElement'
    );

    const parameters = {
      options: {
        url: '/api/v1/config/{secret_type}/{config_element}/{config_name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * notifications
   ************************/

  /**
   * Register with Event Notifications.
   *
   * Creates a registration between a Secrets Manager instance and [Event
   * Notifications](https://cloud.ibm.com/apidocs/event-notifications).
   *
   * A successful request adds Secrets Manager as a source that you can reference from your Event Notifications
   * instance. For more information about enabling notifications for Secrets Manager, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-event-notifications).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.eventNotificationsInstanceCrn - The Cloud Resource Name (CRN) of the connected Event
   * Notifications instance.
   * @param {string} params.eventNotificationsSourceName - The name that is displayed as a source in your Event
   * Notifications instance.
   * @param {string} [params.eventNotificationsSourceDescription] - An optional description for the source in your Event
   * Notifications instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetNotificationsSettings>>}
   */
  public createNotificationsRegistration(
    params: SecretsManagerV1.CreateNotificationsRegistrationParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetNotificationsSettings>> {
    const _params = { ...params };
    const _requiredParams = ['eventNotificationsInstanceCrn', 'eventNotificationsSourceName'];
    const _validParams = [
      'eventNotificationsInstanceCrn',
      'eventNotificationsSourceName',
      'eventNotificationsSourceDescription',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'event_notifications_instance_crn': _params.eventNotificationsInstanceCrn,
      'event_notifications_source_name': _params.eventNotificationsSourceName,
      'event_notifications_source_description': _params.eventNotificationsSourceDescription,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createNotificationsRegistration'
    );

    const parameters = {
      options: {
        url: '/api/v1/notifications/registration',
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
   * Get Event Notifications registration details.
   *
   * Retrieves the details of an existing registration between a Secrets Manager instance and Event Notifications.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.GetNotificationsSettings>>}
   */
  public getNotificationsRegistration(
    params?: SecretsManagerV1.GetNotificationsRegistrationParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.GetNotificationsSettings>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getNotificationsRegistration'
    );

    const parameters = {
      options: {
        url: '/api/v1/notifications/registration',
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
   * Unregister from Event Notifications.
   *
   * Deletes a registration between a Secrets Manager instance and Event Notifications.
   *
   * A successful request removes your Secrets Manager instance as a source in Event Notifications.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public deleteNotificationsRegistration(
    params?: SecretsManagerV1.DeleteNotificationsRegistrationParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteNotificationsRegistration'
    );

    const parameters = {
      options: {
        url: '/api/v1/notifications/registration',
        method: 'DELETE',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Send test event.
   *
   * Send a test event from a Secrets Manager instance to a configured [Event
   * Notifications](https://cloud.ibm.com/apidocs/event-notifications) instance.
   *
   * A successful request sends a test event to the Event Notifications instance. For more information about enabling
   * notifications for Secrets Manager, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-event-notifications).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>>}
   */
  public sendTestNotification(
    params?: SecretsManagerV1.SendTestNotificationParams
  ): Promise<SecretsManagerV1.Response<SecretsManagerV1.Empty>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV1.DEFAULT_SERVICE_NAME,
      'v1',
      'sendTestNotification'
    );

    const parameters = {
      options: {
        url: '/api/v1/notifications/test',
        method: 'GET',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
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
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
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
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
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
    secretAction?: SecretAction;
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
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
    }
    /** The action to perform on the specified secret. */
    export enum Action {
      ROTATE = 'rotate',
      RESTORE = 'restore',
      REVOKE = 'revoke',
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
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
    }
  }

  /** Parameters for the `listSecretVersions` operation. */
  export interface ListSecretVersionsParams {
    /** The secret type. */
    secretType: ListSecretVersionsConstants.SecretType | string;
    /** The v4 UUID that uniquely identifies the secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listSecretVersions` operation. */
  export namespace ListSecretVersionsConstants {
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
    }
  }

  /** Parameters for the `getSecretVersion` operation. */
  export interface GetSecretVersionParams {
    /** The secret type. */
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
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
    }
  }

  /** Parameters for the `getSecretVersionMetadata` operation. */
  export interface GetSecretVersionMetadataParams {
    /** The secret type. */
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
    /** The secret type. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
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
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
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
      PRIVATE_CERT = 'private_cert',
      USERNAME_PASSWORD = 'username_password',
      KV = 'kv',
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
      PRIVATE_CERT = 'private_cert',
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
      PRIVATE_CERT = 'private_cert',
    }
    /** The type of policy that is associated with the specified secret. */
    export enum Policy {
      ROTATION = 'rotation',
    }
  }

  /** Parameters for the `putConfig` operation. */
  export interface PutConfigParams {
    /** The secret type. */
    secretType: PutConfigConstants.SecretType | string;
    /** Properties to update for a secrets engine. */
    engineConfig: EngineConfig;
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
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
    }
  }

  /** Parameters for the `createConfigElement` operation. */
  export interface CreateConfigElementParams {
    /** The secret type. */
    secretType: CreateConfigElementConstants.SecretType | string;
    /** The configuration element to define or manage. */
    configElement: CreateConfigElementConstants.ConfigElement | string;
    /** The human-readable name to assign to your configuration. */
    name: string;
    /** The type of configuration. Value options differ depending on the `config_element` property that you want to
     *  define.
     */
    type: CreateConfigElementConstants.Type | string;
    /** The configuration to define for the specified secret type. */
    config: ConfigElementDefConfig;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createConfigElement` operation. */
  export namespace CreateConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
    }
    /** The configuration element to define or manage. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
      ROOT_CERTIFICATE_AUTHORITIES = 'root_certificate_authorities',
      INTERMEDIATE_CERTIFICATE_AUTHORITIES = 'intermediate_certificate_authorities',
      CERTIFICATE_TEMPLATES = 'certificate_templates',
    }
    /** The type of configuration. Value options differ depending on the `config_element` property that you want to define. */
    export enum Type {
      LETSENCRYPT = 'letsencrypt',
      LETSENCRYPT_STAGE = 'letsencrypt-stage',
      CIS = 'cis',
      CLASSIC_INFRASTRUCTURE = 'classic_infrastructure',
      ROOT_CERTIFICATE_AUTHORITY = 'root_certificate_authority',
      INTERMEDIATE_CERTIFICATE_AUTHORITY = 'intermediate_certificate_authority',
      CERTIFICATE_TEMPLATE = 'certificate_template',
    }
  }

  /** Parameters for the `getConfigElements` operation. */
  export interface GetConfigElementsParams {
    /** The secret type. */
    secretType: GetConfigElementsConstants.SecretType | string;
    /** The configuration element to define or manage. */
    configElement: GetConfigElementsConstants.ConfigElement | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getConfigElements` operation. */
  export namespace GetConfigElementsConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
    }
    /** The configuration element to define or manage. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
      ROOT_CERTIFICATE_AUTHORITIES = 'root_certificate_authorities',
      INTERMEDIATE_CERTIFICATE_AUTHORITIES = 'intermediate_certificate_authorities',
      CERTIFICATE_TEMPLATES = 'certificate_templates',
    }
  }

  /** Parameters for the `getConfigElement` operation. */
  export interface GetConfigElementParams {
    /** The secret type. */
    secretType: GetConfigElementConstants.SecretType | string;
    /** The configuration element to define or manage. */
    configElement: GetConfigElementConstants.ConfigElement | string;
    /** The name of your configuration. */
    configName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getConfigElement` operation. */
  export namespace GetConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
    }
    /** The configuration element to define or manage. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
      ROOT_CERTIFICATE_AUTHORITIES = 'root_certificate_authorities',
      INTERMEDIATE_CERTIFICATE_AUTHORITIES = 'intermediate_certificate_authorities',
      CERTIFICATE_TEMPLATES = 'certificate_templates',
    }
  }

  /** Parameters for the `updateConfigElement` operation. */
  export interface UpdateConfigElementParams {
    /** The secret type. */
    secretType: UpdateConfigElementConstants.SecretType | string;
    /** The configuration element to define or manage. */
    configElement: UpdateConfigElementConstants.ConfigElement | string;
    /** The name of your configuration. */
    configName: string;
    /** The type of configuration. Value options differ depending on the `config_element` property that you want to
     *  define.
     */
    type: UpdateConfigElementConstants.Type | string;
    /** Properties that describe a configuration, which depends on type. */
    config: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateConfigElement` operation. */
  export namespace UpdateConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
    }
    /** The configuration element to define or manage. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
      ROOT_CERTIFICATE_AUTHORITIES = 'root_certificate_authorities',
      INTERMEDIATE_CERTIFICATE_AUTHORITIES = 'intermediate_certificate_authorities',
      CERTIFICATE_TEMPLATES = 'certificate_templates',
    }
    /** The type of configuration. Value options differ depending on the `config_element` property that you want to define. */
    export enum Type {
      LETSENCRYPT = 'letsencrypt',
      LETSENCRYPT_STAGE = 'letsencrypt-stage',
      CIS = 'cis',
      CLASSIC_INFRASTRUCTURE = 'classic_infrastructure',
      ROOT_CERTIFICATE_AUTHORITY = 'root_certificate_authority',
      INTERMEDIATE_CERTIFICATE_AUTHORITY = 'intermediate_certificate_authority',
      CERTIFICATE_TEMPLATE = 'certificate_template',
    }
  }

  /** Parameters for the `deleteConfigElement` operation. */
  export interface DeleteConfigElementParams {
    /** The secret type. */
    secretType: DeleteConfigElementConstants.SecretType | string;
    /** The configuration element to define or manage. */
    configElement: DeleteConfigElementConstants.ConfigElement | string;
    /** The name of your configuration. */
    configName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteConfigElement` operation. */
  export namespace DeleteConfigElementConstants {
    /** The secret type. */
    export enum SecretType {
      PUBLIC_CERT = 'public_cert',
      PRIVATE_CERT = 'private_cert',
    }
    /** The configuration element to define or manage. */
    export enum ConfigElement {
      CERTIFICATE_AUTHORITIES = 'certificate_authorities',
      DNS_PROVIDERS = 'dns_providers',
      ROOT_CERTIFICATE_AUTHORITIES = 'root_certificate_authorities',
      INTERMEDIATE_CERTIFICATE_AUTHORITIES = 'intermediate_certificate_authorities',
      CERTIFICATE_TEMPLATES = 'certificate_templates',
    }
  }

  /** Parameters for the `createNotificationsRegistration` operation. */
  export interface CreateNotificationsRegistrationParams {
    /** The Cloud Resource Name (CRN) of the connected Event Notifications instance. */
    eventNotificationsInstanceCrn: string;
    /** The name that is displayed as a source in your Event Notifications instance. */
    eventNotificationsSourceName: string;
    /** An optional description for the source in your Event Notifications instance. */
    eventNotificationsSourceDescription?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNotificationsRegistration` operation. */
  export interface GetNotificationsRegistrationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteNotificationsRegistration` operation. */
  export interface DeleteNotificationsRegistrationParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `sendTestNotification` operation. */
  export interface SendTestNotificationParams {
    headers?: OutgoingHttpHeaders;
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

  /** The configuration to add or update. */
  export interface ConfigElementDef {
    /** The human-readable name to assign to your configuration. */
    name: string;
    /** The type of configuration. Value options differ depending on the `config_element` property that you want to
     *  define.
     */
    type: string;
    /** The configuration to define for the specified secret type. */
    config: ConfigElementDefConfig;
  }

  /** The configuration to define for the specified secret type. */
  export interface ConfigElementDefConfig {}

  /** Properties that describe a configuration element. */
  export interface ConfigElementMetadata {
    /** The human-readable name to assign to your configuration. */
    name: string;
    /** The type of configuration. Value options differ depending on the `config_element` property that you want to
     *  define.
     */
    type: string;
  }

  /** Properties that describe a secret. */
  export interface CreateSecret {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretResource[];
  }

  /** EngineConfig. */
  export interface EngineConfig {}

  /** Configuration for the specified secret type. */
  export interface GetConfig {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: GetConfigResourcesItem[];
  }

  /** Properties that describe a list of configurations. */
  export interface GetConfigElements {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: GetConfigElementsResourcesItem[];
  }

  /** GetConfigElementsResourcesItem. */
  export interface GetConfigElementsResourcesItem {}

  /** GetConfigResourcesItem. */
  export interface GetConfigResourcesItem {}

  /** Properties that describe an existing registration with Event Notifications. */
  export interface GetNotificationsSettings {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: NotificationsSettings[];
  }

  /** Properties that describe a secret. */
  export interface GetSecret {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: SecretResource[];
  }

  /** GetSecretPolicies. */
  export interface GetSecretPolicies {}

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

  /** Properties that describe a configuration. */
  export interface GetSingleConfigElement {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: ConfigElementDef[];
  }

  /** Issuance information that is associated with your certificate. */
  export interface IssuanceInfo {
    /** The date the certificate was ordered. The date format follows RFC 3339. */
    ordered_on?: string;
    /** A code that identifies an issuance error.
     *
     *  This field, along with `error_message`, is returned when Secrets Manager successfully processes your request,
     *  but a certificate is unable to be issued by the certificate authority.
     */
    error_code?: string;
    /** A human-readable message that provides details about the issuance error. */
    error_message?: string;
    /** Indicates whether the issued certificate is bundled with intermediate certificates. */
    bundle_certs?: boolean;
    /** The secret state based on NIST SP 800-57. States are integers and correspond to the Pre-activation = 0,
     *  Active = 1,  Suspended = 2, Deactivated = 3, and Destroyed = 5 values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** Indicates whether the issued certificate is configured with an automatic rotation policy. */
    auto_rotated?: boolean;
    /** The name that was assigned to the certificate authority configuration. */
    ca?: string;
    /** The name that was assigned to the DNS provider configuration. */
    dns?: string;
  }

  /** Properties that describe a list of versions of a secret. */
  export interface ListSecretVersions {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources?: SecretVersionInfo[];
  }

  /** Properties that describe a list of secrets. */
  export interface ListSecrets {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources?: SecretResource[];
  }

  /** The Event Notifications details. */
  export interface NotificationsSettings {
    /** The Cloud Resource Name (CRN) of the connected Event Notifications instance. */
    event_notifications_instance_crn: string;
  }

  /** Rotation. */
  export interface Rotation {
    /** Determines whether Secrets Manager rotates your certificate automatically.
     *
     *  For public certificates, if `auto_rotate` is set to `true` the service reorders your certificate 31 days before
     *  it expires. For private certificates, the certificate is rotated according to the time interval specified in the
     *  `interval` and `unit` fields.
     *
     *  To access the previous version of the certificate, you can use the
     *  [Get a version of a secret](#get-secret-version) method.
     */
    auto_rotate?: boolean;
    /** Determines whether Secrets Manager rotates the private key for your certificate automatically.
     *
     *  If set to `true`, the service generates and stores a new private key for your rotated certificate.
     *
     *  **Note:** Use this field only for public certificates. Ignored for private certificates.
     */
    rotate_keys?: boolean;
    /** Used together with the `unit` field to specify the rotation interval. The minimum interval is one day, and
     *  the maximum interval is 3 years (1095 days). Required in case `auto_rotate` is set to `true`.
     *
     *  **Note:** Use this field only for private certificates Ignored for public certificates.
     */
    interval?: number;
    /** The time unit of the rotation interval.
     *
     *  **Note:** Use this field only for private certificates. Ignored for public certificates.
     */
    unit?: string;
  }

  /** SecretAction. */
  export interface SecretAction {}

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
  export interface SecretMetadata {}

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
  export interface SecretPolicyRotationRotation {}

  /** SecretResource. */
  export interface SecretResource {}

  /** SecretVersion. */
  export interface SecretVersion {}

  /** Properties that describe a secret version within a list of secret versions. */
  export interface SecretVersionInfo {}

  /** SecretVersionMetadata. */
  export interface SecretVersionMetadata {}

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
     *  Up to 30 labels can be created. Labels can be in the range 2 - 30 characters, including spaces. Special
     *  characters that are not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe
     *  character (|).
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
     *  Up to 30 labels can be created. Labels can be 2 - 30 characters, including spaces. Special characters that are
     *  not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
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
    /** The data that is associated with the secret version.
     *
     *  The data object contains the field `payload`.
     */
    secret_data?: JsonObject;
  }

  /** ArbitrarySecretVersion. */
  export interface ArbitrarySecretVersion extends SecretVersion {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** The data that is associated with the secret version.
     *
     *  The data object contains the field `payload`.
     */
    secret_data?: JsonObject;
  }

  /** ArbitrarySecretVersionInfo. */
  export interface ArbitrarySecretVersionInfo extends SecretVersionInfo {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
  }

  /** Properties that describe a secret version. */
  export interface ArbitrarySecretVersionMetadata extends SecretVersionMetadata {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
  }

  /** Metadata properties that describe a certificate secret. */
  export interface CertificateSecretMetadata extends SecretMetadata {
    /** The unique ID of the secret. */
    id?: string;
    /** Labels that you can use to filter for secrets in your instance.
     *
     *  Up to 30 labels can be created. Labels can be in the range 2 - 30 characters, including spaces. Special
     *  characters that are not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe
     *  character (|).
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
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign
     *  the certificate.
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
     *  Up to 30 labels can be created. Labels can be 2 - 30 characters, including spaces. Special characters that are
     *  not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
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
    /** The data that is associated with the secret. The data object contains the following fields:
     *
     *  `certificate`: The contents of the certificate.
     *
     *  `private_key`: The private key that is associated with the certificate.
     *
     *  `intermediate`: The intermediate certificate that is associated with the certificate.
     */
    secret_data?: JsonObject;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign
     *  the certificate.
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
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    validity?: CertificateValidity;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date that the certificate expires. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The data that is associated with the secret version. The data object contains the following fields:
     *
     *  `certificate`: The contents of the certificate.
     *
     *  `private_key`: The private key that is associated with the certificate.
     *
     *  `intermediate`: The intermediate certificate that is associated with the certificate.
     */
    secret_data?: JsonObject;
  }

  /** CertificateSecretVersionInfo. */
  export interface CertificateSecretVersionInfo extends SecretVersionInfo {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date that the certificate expires. The date format follows RFC 3339. */
    expiration_date?: string;
    validity?: CertificateValidity;
  }

  /** Properties that describe a secret version. */
  export interface CertificateSecretVersionMetadata extends SecretVersionMetadata {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date that the certificate expires. The date format follows RFC 3339. */
    expiration_date?: string;
    validity?: CertificateValidity;
  }

  /** Properties that describe an IBM Cloud classic infrastructure (SoftLayer) configuration. */
  export interface ConfigElementDefConfigClassicInfrastructureConfig
    extends ConfigElementDefConfig {
    /** The username that is associated with your classic infrastructure account.
     *
     *  In most cases, your classic infrastructure username is your `<account_id>_<email_address>`. For more
     *  information, see the [docs](https://cloud.ibm.com/docs/account?topic=account-classic_keys).
     */
    classic_infrastructure_username: string;
    /** Your classic infrastructure API key.
     *
     *  For information about viewing and accessing your classic infrastructure API key, see the
     *  [docs](https://cloud.ibm.com/docs/account?topic=account-classic_keys).
     */
    classic_infrastructure_password: string;
  }

  /** Properties that describe an IBM Cloud Internet Services (CIS) configuration. */
  export interface ConfigElementDefConfigCloudInternetServicesConfig
    extends ConfigElementDefConfig {
    /** The Cloud Resource Name (CRN) that is associated with the CIS instance. */
    cis_crn: string;
    /** An IBM Cloud API key that can to list domains in your CIS instance.
     *
     *  To grant Secrets Manager the ability to view the CIS instance and all of its domains, the API key must be
     *  assigned the Reader service role on Internet Services (`internet-svcs`).
     *
     *  If you need to manage specific domains, you can assign the Manager role. For production environments, it is
     *  recommended that you assign the Reader access role, and then use the
     *  [IAM Policy Management API](https://cloud.ibm.com/apidocs/iam-policy-management#create-policy) to control
     *  specific domains. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#authorize-specific-domains).
     */
    cis_apikey?: string;
  }

  /** Properties that describe a Let's Encrypt configuration. */
  export interface ConfigElementDefConfigLetsEncryptConfig extends ConfigElementDefConfig {
    /** The private key that is associated with your Automatic Certificate Management Environment (ACME) account.
     *
     *  If you have a working ACME client or account for Let's Encrypt, you can use the existing private key to enable
     *  communications with Secrets Manager. If you don't have an account yet, you can create one. For more information,
     *  see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#create-acme-account).
     */
    private_key: string;
  }

  /** Configuration for the IAM credentials engine. */
  export interface CreateIAMCredentialsSecretEngineRootConfig extends EngineConfig {
    /** An IBM Cloud API key that can create and manage service IDs.
     *
     *  The API key must be assigned the Editor platform role on the Access Groups Service and the Operator platform
     *  role on the IAM Identity Service. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-configure-iam-engine).
     */
    api_key: string;
    /** The hash value of the IBM Cloud API key that is used to create and manage service IDs. */
    api_key_hash?: string;
  }

  /** Delete the credentials that are associated with an `iam_credentials` secret. */
  export interface DeleteCredentialsForIAMCredentialsSecret extends SecretAction {
    /** The ID of the API key that you want to delete. If the secret was created with a static service ID, only the
     *  API key is deleted. Otherwise, the service ID is deleted together with its API key.
     */
    api_key_id?: string;
    /** The service ID that you want to delete. This property can be used instead of the `api_key_id` field, but
     *  only for secrets that were created with a service ID that was generated by Secrets Manager.
     *
     *  **Deprecated.** Use the `api_key_id` field instead.
     */
    service_id?: string;
  }

  /** Certificate authorities configuration. */
  export interface GetConfigElementsResourcesItemCertificateAuthoritiesConfig
    extends GetConfigElementsResourcesItem {
    certificate_authorities: ConfigElementMetadata[];
  }

  /** DNS providers configuration. */
  export interface GetConfigElementsResourcesItemDnsProvidersConfig
    extends GetConfigElementsResourcesItem {
    dns_providers: ConfigElementMetadata[];
  }

  /** Properties that describe a rotation policy. */
  export interface GetSecretPolicyRotation extends GetSecretPolicies {
    /** The metadata that describes the resource array. */
    metadata: CollectionMetadata;
    /** A collection of resources. */
    resources: JsonObject[];
  }

  /** Configuration for the IAM credentials engine. */
  export interface IAMCredentialsSecretEngineRootConfig extends GetConfigResourcesItem {
    /** An IBM Cloud API key that can create and manage service IDs.
     *
     *  The API key must be assigned the Editor platform role on the Access Groups Service and the Operator platform
     *  role on the IAM Identity Service. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-configure-iam-engine).
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
     *  Up to 30 labels can be created. Labels can be in the range 2 - 30 characters, including spaces. Special
     *  characters that are not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe
     *  character (|).
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
    /** Specifies the Time To Live value provided as a string duration with time suffix. */
    ttl?: string;
    /** Determines whether to use the same service ID and API key for future read operations on an
     *  `iam_credentials` secret.
     *
     *  If set to `true`, the service reuses the current credentials. If set to `false`, a new service ID and API key
     *  are generated each time that the secret is read or accessed.
     */
    reuse_api_key?: boolean;
    /** Indicates whether an `iam_credentials` secret was created with a static service ID.
     *
     *  If the value is `true`, the service ID for the secret was provided by the user at secret creation. If the value
     *  is `false`, the service ID was generated by Secrets Manager.
     */
    service_id_is_static?: boolean;
    /** The service ID under which the API key is created. The service ID is included in the metadata only if the
     *  secret was created with a static service ID.
     */
    service_id?: string;
    /** The access groups that define the capabilities of the service ID and API key that are generated for an
     *  `iam_credentials` secret. The access groups are included in the metadata only if the secret was created with a
     *  service ID that was generated by Secrets Manager.
     */
    access_groups?: string[];
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
     *  Up to 30 labels can be created. Labels can be 2 - 30 characters, including spaces. Special characters that are
     *  not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
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
     *
     *  Minimum duration is 1 minute. Maximum is 90 days.
     */
    ttl?: any;
    /** The access groups that define the capabilities of the service ID and API key that are generated for an
     *  `iam_credentials` secret. If you prefer to use an existing service ID that is already assigned the access
     *  policies that you require, you can omit this parameter and use the `service_id` field instead.
     *
     *  **Tip:** To list the access groups that are available in an account, you can use the [IAM Access Groups
     *  API](https://cloud.ibm.com/apidocs/iam-access-groups#list-access-groups). To find the ID of an access group in
     *  the console, go to **Manage > Access (IAM) > Access groups**. Select the access group to inspect, and click
     *  **Details** to view its ID.
     */
    access_groups?: string[];
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease (see the `ttl` field), the API key is deleted automatically. If
     *  you want to continue to use the same API key for future read operations, see the `reuse_api_key` field.
     */
    api_key?: string;
    /** The ID of the API key that is generated for this secret. */
    api_key_id?: string;
    /** The service ID under which the API key (see the `api_key` field) is created.
     *
     *  If you omit this parameter, Secrets Manager generates a new service ID for your secret at its creation and adds
     *  it to the access groups that you assign.
     *
     *  Optionally, you can use this field to provide your own service ID if you prefer to manage its access directly or
     *  retain the service ID after your secret expires, is rotated, or deleted. If you provide a service ID, do not
     *  include the `access_groups` parameter.
     */
    service_id?: string;
    /** Indicates whether an `iam_credentials` secret was created with a static service ID.
     *
     *  If `true`, the service ID for the secret was provided by the user at secret creation. If `false`, the service ID
     *  was generated by Secrets Manager.
     */
    service_id_is_static?: boolean;
    /** Determines whether to use the same service ID and API key for future read operations on an
     *  `iam_credentials` secret.
     *
     *  If set to `true`, the service reuses the current credentials. If set to `false`, a new service ID and API key
     *  are generated each time that the secret is read or accessed.
     */
    reuse_api_key?: boolean;
  }

  /** IAMCredentialsSecretVersion. */
  export interface IAMCredentialsSecretVersion extends SecretVersion {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** The data that is associated with the secret version. The data object contains the following fields:
     *
     *  `api_key`: The API key that is generated for this secret.
     *
     *  `api_key_id`: The ID of the API key that is generated for this secret.
     *
     *  `service_id`: The service ID under which the API key is created.
     */
    secret_data?: JsonObject;
  }

  /** IAMCredentialsSecretVersionInfo. */
  export interface IAMCredentialsSecretVersionInfo extends SecretVersionInfo {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
  }

  /** Properties that describe a secret version. */
  export interface IAMCredentialsSecretVersionMetadata extends SecretVersionMetadata {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
  }

  /** Metadata properties that describe a key-value secret. */
  export interface KvSecretMetadata extends SecretMetadata {
    /** The unique ID of the secret. */
    id?: string;
    /** Labels that you can use to filter for secrets in your instance.
     *
     *  Up to 30 labels can be created. Labels can be in the range 2 - 30 characters, including spaces. Special
     *  characters that are not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe
     *  character (|).
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
  }

  /** Properties that describe a secret. */
  export interface KvSecretResource extends SecretResource {
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
     *  Up to 30 labels can be created. Labels can be 2 - 30 characters, including spaces. Special characters that are
     *  not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
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
    payload?: JsonObject;
    /** The data that is associated with the secret version.
     *
     *  The data object contains the field `payload`.
     */
    secret_data?: JsonObject;
  }

  /** Metadata properties that describe a private certificate secret. */
  export interface PrivateCertificateSecretMetadata extends SecretMetadata {
    /** The unique ID of the secret. */
    id?: string;
    /** Labels that you can use to filter for secrets in your instance.
     *
     *  Up to 30 labels can be created. Labels can be in the range 2 - 30 characters, including spaces. Special
     *  characters that are not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe
     *  character (|).
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
  }

  /** Configuration for the public certificates engine. */
  export interface PublicCertSecretEngineRootConfig extends GetConfigResourcesItem {
    /** The certificate authority configurations that are associated with your instance. */
    certificate_authorities?: ConfigElementMetadata[];
    /** The DNS provider configurations that are associated with your instance. */
    dns_providers?: ConfigElementMetadata[];
  }

  /** Metadata properties that describe a public certificate secret. */
  export interface PublicCertificateSecretMetadata extends SecretMetadata {
    /** The unique ID of the secret. */
    id?: string;
    /** Labels that you can use to filter for secrets in your instance.
     *
     *  Up to 30 labels can be created. Labels can be in the range 2 - 30 characters, including spaces. Special
     *  characters that are not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe
     *  character (|).
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
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** Determines whether your issued certificate is bundled with intermediate certificates.
     *
     *  Set to `false` for the certificate file to contain only the issued certificate.
     */
    bundle_certs?: boolean;
    /** The identifier for the cryptographic algorithm to be used by the issuing certificate authority to sign the
     *  certificate.
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
    /** Indicates whether the certificate was ordered with an associated intermediate certificate. */
    intermediate_included?: boolean;
    /** Indicates whether the certificate was ordered with an associated private key. */
    private_key_included?: boolean;
    rotation?: Rotation;
    /** Issuance information that is associated with your certificate. */
    issuance_info?: IssuanceInfo;
    validity?: CertificateValidity;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
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
     *  Up to 30 labels can be created. Labels can be 2 - 30 characters, including spaces. Special characters that are
     *  not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
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
    /** Determines whether your issued certificate is bundled with intermediate certificates.
     *
     *  Set to `false` for the certificate file to contain only the issued certificate.
     */
    bundle_certs?: boolean;
    /** The name of the certificate authority configuration.
     *
     *  To view a list of your configured authorities, use the [List configurations API](#get-secret-config-element).
     */
    ca?: string;
    /** The name of the DNS provider configuration.
     *
     *  To view a list of your configured authorities, use the [List configurations API](#get-secret-config-element).
     */
    dns?: string;
    /** The identifier for the cryptographic algorithm to be used by the issuing certificate authority to sign the
     *  certificate.
     */
    algorithm?: string;
    /** The identifier for the cryptographic algorithm to be used to generate the public key that is associated with
     *  the certificate.
     *
     *  The algorithm that you select determines the encryption algorithm (`RSA` or `ECDSA`) and key size to be used to
     *  generate keys and sign certificates. For longer living certificates, it is recommended to use longer keys to
     *  provide more encryption protection.
     */
    key_algorithm?: string;
    /** The alternative names that are defined for the certificate. */
    alt_names?: string[];
    /** The fully qualified domain name or host domain name for the certificate. */
    common_name?: string;
    /** Indicates whether the issued certificate includes a private key. */
    private_key_included?: boolean;
    /** Indicates whether the issued certificate includes an intermediate certificate. */
    intermediate_included?: boolean;
    rotation?: Rotation;
    /** Issuance information that is associated with your certificate. */
    issuance_info?: IssuanceInfo;
    validity?: CertificateValidity;
    /** The unique serial number that was assigned to the certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The data that is associated with the secret. The data object contains the following fields:
     *
     *  `certificate`: The contents of the certificate.
     *
     *  `private_key`: The private key that is associated with the certificate.
     *
     *  `intermediate`: The intermediate certificate that is associated with the certificate.
     */
    secret_data?: JsonObject;
  }

  /** The request body of a `restore` action. */
  export interface RestoreIAMCredentialsSecretBody extends SecretAction {
    /** The ID of the target version or the alias `previous`. */
    version_id: string;
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
  export interface RotateKvSecretBody extends SecretAction {
    /** The new secret data to assign to a key-value secret. */
    payload: JsonObject;
  }

  /** The request body of a `rotate` action. */
  export interface RotatePublicCertBody extends SecretAction {
    /** Determine whether keys must be rotated. */
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
  export interface SecretPolicyRotationRotationPublicCertPolicyRotation
    extends SecretPolicyRotationRotation {
    auto_rotate: boolean;
    rotate_keys: boolean;
  }

  /** Metadata properties that describe a username_password secret. */
  export interface UsernamePasswordSecretMetadata extends SecretMetadata {
    /** The unique ID of the secret. */
    id?: string;
    /** Labels that you can use to filter for secrets in your instance.
     *
     *  Up to 30 labels can be created. Labels can be in the range 2 - 30 characters, including spaces. Special
     *  characters that are not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe
     *  character (|).
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
     *  Up to 30 labels can be created. Labels can be 2 - 30 characters, including spaces. Special characters that are
     *  not permitted include the angled bracket, comma, colon, ampersand, and vertical pipe character (|).
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
    /** The data that is associated with the secret version. The data object contains the following fields:
     *
     *  `username`: The username that is associated with the secret version.
     *
     *  `password`: The password that is associated with the secret version.
     */
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

  /** UsernamePasswordSecretVersion. */
  export interface UsernamePasswordSecretVersion extends SecretVersion {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The data that is associated with the secret version. The data object contains the following fields:
     *
     *  `username`: The username that is associated with the secret version.
     *
     *  `password`: The password that is associated with the secret version.
     */
    secret_data?: JsonObject;
  }

  /** UsernamePasswordSecretVersionInfo. */
  export interface UsernamePasswordSecretVersionInfo extends SecretVersionInfo {
    /** The ID of the secret version. */
    id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
  }

  /** Properties that describe a secret version. */
  export interface UsernamePasswordSecretVersionMetadata extends SecretVersionMetadata {
    /** The v4 UUID that uniquely identifies the secret. */
    id?: string;
    /** The ID of the secret version. */
    version_id?: string;
    /** The date that the version of the secret was created. */
    creation_date?: string;
    /** The unique identifier for the entity that created the secret version. */
    created_by?: string;
    /** Indicates whether the payload for the secret version is stored and available. */
    payload_available?: boolean;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
  }
}

export = SecretsManagerV1;
