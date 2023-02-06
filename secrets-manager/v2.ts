/**
 * (C) Copyright IBM Corp. 2023.
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
 * IBM OpenAPI SDK Code Generator Version: 3.60.2-95dc7721-20221102-203229
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

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
import { getQueryParam } from 'ibm-cloud-sdk-core';

/**
 * With IBM Cloud® Secrets Manager, you can create, lease, and centrally manage secrets that are used in IBM Cloud
 * services or your custom-built applications.
 *
 * API Version: 2.0.0
 * See: https://cloud.ibm.com/docs/secrets-manager
 */

class SecretsManagerV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://secrets-manager.cloud.ibm.com/api';

  static DEFAULT_SERVICE_NAME: string = 'secrets_manager';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SecretsManagerV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {SecretsManagerV2}
   */

  public static newInstance(options: UserOptions): SecretsManagerV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SecretsManagerV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a SecretsManagerV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {SecretsManagerV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(SecretsManagerV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * secretGroups
   ************************/

  /**
   * Create a new secret group.
   *
   * Create a secret group that you can use to organize secrets and control who can access them.
   *
   * A successful request returns the ID value of the secret group, along with other properties. To learn more about
   * secret groups, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-secret-groups).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of your secret group.
   * @param {string} [params.description] - An extended description of your secret group.
   *
   * To protect your privacy, do not use personal data, such as your name or location, as a description for your secret
   * group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroup>>}
   */
  public createSecretGroup(
    params: SecretsManagerV2.CreateSecretGroupParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroup>> {
    const _params = { ...params };
    const _requiredParams = ['name'];
    const _validParams = ['name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSecretGroup'
    );

    const parameters = {
      options: {
        url: '/v2/secret_groups',
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
   * List the secret groups that are available in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroupCollection>>}
   */
  public listSecretGroups(
    params?: SecretsManagerV2.ListSecretGroupsParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroupCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listSecretGroups'
    );

    const parameters = {
      options: {
        url: '/v2/secret_groups',
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
   * Get the properties of an existing secret group by specifying the ID of the group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroup>>}
   */
  public getSecretGroup(
    params: SecretsManagerV2.GetSecretGroupParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroup>> {
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
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getSecretGroup'
    );

    const parameters = {
      options: {
        url: '/v2/secret_groups/{id}',
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
   * Update the properties of an existing secret group, such as its name or description.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret group.
   * @param {string} [params.name] - The name of your secret group.
   * @param {string} [params.description] - An extended description of your secret group.
   *
   * To protect your privacy, do not use personal data, such as your name or location, as a description for your secret
   * group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroup>>}
   */
  public updateSecretGroup(
    params: SecretsManagerV2.UpdateSecretGroupParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretGroup>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateSecretGroup'
    );

    const parameters = {
      options: {
        url: '/v2/secret_groups/{id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
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
   * Delete a secret group by specifying the ID of the secret group.
   *
   * **Note:** To delete a secret group, it must be empty. If you need to remove a secret group that contains secrets,
   * you must first [delete the secrets](#delete-secret) that are associated with the group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>>}
   */
  public deleteSecretGroup(
    params: SecretsManagerV2.DeleteSecretGroupParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>> {
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
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteSecretGroup'
    );

    const parameters = {
      options: {
        url: '/v2/secret_groups/{id}',
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
   * Create a new secret.
   *
   * Create a secret or import an existing value that you can use to access or authenticate to a protected resource.
   *
   * Use this operation to either generate or import an existing secret, such as a TLS certificate, that you can manage
   * in your Secrets Manager service instance. A successful request stores the secret in your dedicated instance, based
   * on the secret type and data that you specify. The response returns the ID value of the secret, along with other
   * metadata.
   *
   * To learn more about the types of secrets that you can create with Secrets Manager, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-what-is-secret).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {SecretPrototype} params.secretPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.Secret>>}
   */
  public createSecret(
    params: SecretsManagerV2.CreateSecretParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.Secret>> {
    const _params = { ...params };
    const _requiredParams = ['secretPrototype'];
    const _validParams = ['secretPrototype', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.secretPrototype;
    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSecret'
    );

    const parameters = {
      options: {
        url: '/v2/secrets',
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
   * List secrets.
   *
   * List the secrets that are available in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.offset] - The number of secrets to skip. By specifying `offset`, you retrieve a subset of
   * items that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
   * `..?offset=25&limit=25`.
   * @param {number} [params.limit] - The number of secrets to retrieve. By default, list operations return the first
   * 200 items. To retrieve a different set of items, use `limit` with `offset` to page through your available
   * resources. Maximum limit allowed is 1000 secrets.
   *
   * **Usage:** If you want to retrieve only the first 25 secrets in your instance, use
   * `..?limit=25`.
   * @param {string} [params.sort] - Sort a collection of secrets by the specified field in ascending order. To sort in
   * descending order use the `-` character
   *
   *
   * **Available values:** id | created_at | updated_at | expiration_date | secret_type | name
   *
   * **Usage:** To sort a list of secrets by their creation date, use
   * `../secrets?sort=created_at`.
   * @param {string} [params.search] - Obtain a collection of secrets that contain the specified string in one or more
   * of the fields: `id`, `name`, `description`,
   * `labels`, `secret_type`.
   *
   * **Usage:** If you want to list only the secrets that contain the string `text`, use
   * `../secrets?search=text`.
   * @param {string[]} [params.groups] - Filter secrets by groups.
   *
   * You can apply multiple filters by using a comma-separated list of secret group IDs. If you need to filter secrets
   * that are in the default secret group, use the `default` keyword.
   *
   * **Usage:** To retrieve a list of secrets that are associated with an existing secret group or the default group,
   * use `..?groups={secret_group_ID},default`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadataPaginatedCollection>>}
   */
  public listSecrets(
    params?: SecretsManagerV2.ListSecretsParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadataPaginatedCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['offset', 'limit', 'sort', 'search', 'groups', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
      'sort': _params.sort,
      'search': _params.search,
      'groups': _params.groups,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listSecrets'
    );

    const parameters = {
      options: {
        url: '/v2/secrets',
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
   * metadata](#get-secret-metadata) operation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.Secret>>}
   */
  public getSecret(
    params: SecretsManagerV2.GetSecretParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.Secret>> {
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
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getSecret'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}',
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
   * Delete a secret.
   *
   * Delete a secret by specifying the ID of the secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>>}
   */
  public deleteSecret(
    params: SecretsManagerV2.DeleteSecretParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>> {
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
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteSecret'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}',
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
   * Get the metadata of a secret.
   *
   * Get the metadata of a secret by specifying the ID of the secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadata>>}
   */
  public getSecretMetadata(
    params: SecretsManagerV2.GetSecretMetadataParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadata>> {
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
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getSecretMetadata'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}/metadata',
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
   * Update the metadata of a secret.
   *
   * Update the metadata of a secret, such as its name or description.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {SecretMetadataPatch} params.secretMetadataPatch -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadata>>}
   */
  public updateSecretMetadata(
    params: SecretsManagerV2.UpdateSecretMetadataParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadata>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'secretMetadataPatch'];
    const _validParams = ['id', 'secretMetadataPatch', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.secretMetadataPatch;
    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateSecretMetadata'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}/metadata',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a secret action.
   *
   * Create a secret action. This operation supports the following actions:.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {SecretActionPrototype} params.secretActionPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretAction>>}
   */
  public createSecretAction(
    params: SecretsManagerV2.CreateSecretActionParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretAction>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'secretActionPrototype'];
    const _validParams = ['id', 'secretActionPrototype', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.secretActionPrototype;
    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSecretAction'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}/actions',
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
  /*************************
   * secretVersions
   ************************/

  /**
   * Create a new secret version.
   *
   * Create a new secret version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {SecretVersionPrototype} params.secretVersionPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersion>>}
   */
  public createSecretVersion(
    params: SecretsManagerV2.CreateSecretVersionParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersion>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'secretVersionPrototype'];
    const _validParams = ['secretId', 'secretVersionPrototype', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.secretVersionPrototype;
    const path = {
      'secret_id': _params.secretId,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSecretVersion'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions',
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
   * List versions of a secret.
   *
   * List the versions of a secret.
   *
   * A successful request returns the list of versions of a secret, along with the metadata of each version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionMetadataCollection>>}
   */
  public listSecretVersions(
    params: SecretsManagerV2.ListSecretVersionsParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionMetadataCollection>> {
    const _params = { ...params };
    const _requiredParams = ['secretId'];
    const _validParams = ['secretId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_id': _params.secretId,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listSecretVersions'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions',
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
   * Get a version of a secret by specifying the ID of the version. You can use the `current` or `previous` aliases to
   * refer to the current or previous secret version.
   *
   * A successful request returns the secret data that is associated with the specified version of your secret, along
   * with other metadata.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersion>>}
   */
  public getSecretVersion(
    params: SecretsManagerV2.GetSecretVersionParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersion>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id'];
    const _validParams = ['secretId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getSecretVersion'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}',
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
   * Delete the data of a secret version.
   *
   * Delete the data of a secret version by specifying the ID of the version.
   *
   * This operation is available for secret type: iam_credentials.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>>}
   */
  public deleteSecretVersionData(
    params: SecretsManagerV2.DeleteSecretVersionDataParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id'];
    const _validParams = ['secretId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteSecretVersionData'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}/secret_data',
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
   * Get the metadata of a secret version.
   *
   * Get the metadata of a secret version by specifying the ID of the version. You can use the `current` or `previous`
   * aliases to refer to the current or previous secret version.
   *
   * A successful request returns the metadata that is associated with the specified version of your secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionMetadata>>}
   */
  public getSecretVersionMetadata(
    params: SecretsManagerV2.GetSecretVersionMetadataParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionMetadata>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id'];
    const _validParams = ['secretId', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getSecretVersionMetadata'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}/metadata',
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
   * Update the metadata of a secret version.
   *
   * Update the custom metadata of a secret version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {JsonObject} [params.versionCustomMetadata] - The secret version metadata that a user can customize.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionMetadata>>}
   */
  public updateSecretVersionMetadata(
    params: SecretsManagerV2.UpdateSecretVersionMetadataParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionMetadata>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id'];
    const _validParams = ['secretId', 'id', 'versionCustomMetadata', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'version_custom_metadata': _params.versionCustomMetadata,
    };

    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateSecretVersionMetadata'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}/metadata',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a version action.
   *
   * Create a secret version action. This operation supports the following actions:
   *
   * - `private_cert_action_revoke_certificate`: Revoke a version of a private certificate.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {SecretVersionActionPrototype} params.secretVersionActionPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.VersionAction>>}
   */
  public createSecretVersionAction(
    params: SecretsManagerV2.CreateSecretVersionActionParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.VersionAction>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id', 'secretVersionActionPrototype'];
    const _validParams = ['secretId', 'id', 'secretVersionActionPrototype', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.secretVersionActionPrototype;
    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSecretVersionAction'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}/actions',
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
  /*************************
   * secretLocks
   ************************/

  /**
   * List secrets and their locks.
   *
   * List the secrets and their locks in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.offset] - The number of secrets to skip. By specifying `offset`, you retrieve a subset of
   * items that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
   * `..?offset=25&limit=25`.
   * @param {number} [params.limit] - The number of secrets to retrieve. By default, list operations return the first
   * 200 items. To retrieve a different set of items, use `limit` with `offset` to page through your available
   * resources. Maximum limit allowed is 1000 secrets.
   *
   * **Usage:** If you want to retrieve only the first 25 secrets in your instance, use
   * `..?limit=25`.
   * @param {string} [params.search] - Filter locks that contain the specified string in the field "name".
   *
   * **Usage:** If you want to list only the locks that contain the string "text" in the field "name", use
   * `..?search=text`.
   * @param {string[]} [params.groups] - Filter secrets by groups.
   *
   * You can apply multiple filters by using a comma-separated list of secret group IDs. If you need to filter secrets
   * that are in the default secret group, use the `default` keyword.
   *
   * **Usage:** To retrieve a list of secrets that are associated with an existing secret group or the default group,
   * use `..?groups={secret_group_ID},default`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretsLocksPaginatedCollection>>}
   */
  public listSecretsLocks(
    params?: SecretsManagerV2.ListSecretsLocksParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretsLocksPaginatedCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['offset', 'limit', 'search', 'groups', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
      'search': _params.search,
      'groups': _params.groups,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listSecretsLocks'
    );

    const parameters = {
      options: {
        url: '/v2/secrets_locks',
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
   * List secret locks.
   *
   * List the locks that are associated with a specified secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {number} [params.offset] - The number of locks to skip. By specifying `offset`, you retrieve a subset of
   * items that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 locks on your secret, and you want to retrieve locks 26 through 50, use
   * `..?offset=25&limit=25`.
   * @param {number} [params.limit] - The number of locks with associated secret to retrieve. By default, list
   * operations return the first 25 items. To retrieve a different set of items, use `limit` with `offset` to page
   * through your available resources.
   *
   * **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5, use
   * `..?limit=5`.
   * @param {string} [params.sort] - Sort a collection of locks by the specified field in ascending order. To sort in
   * descending order use the `-` character
   *
   * **Available values:** created_at | updated_at | name
   *
   * **Usage:** To sort a list of locks by their creation date, use
   * `../locks?sort=created_at`.
   * @param {string} [params.search] - Filter locks that contain the specified string in the field "name".
   *
   * **Usage:** If you want to list only the locks that contain the string "text" in the field "name", use
   * `..?search=text`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocksPaginatedCollection>>}
   */
  public listSecretLocks(
    params: SecretsManagerV2.ListSecretLocksParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocksPaginatedCollection>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'offset', 'limit', 'sort', 'search', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
      'sort': _params.sort,
      'search': _params.search,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listSecretLocks'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}/locks',
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
   * Create secret locks.
   *
   * Create a lock on the current version of a secret.
   *
   * A lock can be used to prevent a secret from being deleted or modified while it's in use by your applications. A
   * successful request attaches a new lock to your secret, or replaces a lock of the same name if it already exists.
   * Additionally, you can use this operation to clear any matching locks on a secret by using one of the following
   * optional lock modes:
   *
   * - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the
   * secret.\n
   * - `exclusive_delete`: Carries out the same function as `exclusive`, but also permanently deletes the data of the
   * previous secret version if it doesn't have any locks.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {SecretLockPrototype[]} params.locks - The locks data to be attached to a secret version.
   * @param {string} [params.mode] - An optional lock mode. When you create a lock, you can set one of the following
   * modes to clear any matching locks on a secret version.
   * - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the secret.
   * - `exclusive_delete`: Completes the same action as `exclusive`, but also permanently deletes the data of the
   * previous secret version if it doesn't have any locks.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>>}
   */
  public createSecretLocksBulk(
    params: SecretsManagerV2.CreateSecretLocksBulkParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'locks'];
    const _validParams = ['id', 'locks', 'mode', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'locks': _params.locks,
    };

    const query = {
      'mode': _params.mode,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSecretLocksBulk'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}/locks_bulk',
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
   * Delete secret locks.
   *
   * Delete all the locks or a subset of the locks that are associated with a version of a secret.
   *
   * To delete only a subset of the locks, add a query param with a comma to separate the list of lock names:
   *
   * Example: `?name=lock-example-1,lock-example-2`.
   *
   * **Note:** A secret is considered unlocked and able to be deleted only after you remove all of its locks. To
   * determine whether a secret contains locks, check the `locks_total` field that is returned as part of the metadata
   * of your secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret.
   * @param {string[]} [params.name] - Specify the names of the secret locks to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>>}
   */
  public deleteSecretLocksBulk(
    params: SecretsManagerV2.DeleteSecretLocksBulkParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'name': _params.name,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteSecretLocksBulk'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{id}/locks_bulk',
        method: 'DELETE',
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
   * List secret version locks.
   *
   * List the locks that are associated with a specified secret version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {number} [params.offset] - The number of locks to skip. By specifying `offset`, you retrieve a subset of
   * items that starts with the `offset` value. Use `offset` with `limit` to page through your available resources.
   *
   * **Usage:** If you have 100 locks on your secret, and you want to retrieve locks 26 through 50, use
   * `..?offset=25&limit=25`.
   * @param {number} [params.limit] - The number of locks with associated secret to retrieve. By default, list
   * operations return the first 25 items. To retrieve a different set of items, use `limit` with `offset` to page
   * through your available resources.
   *
   * **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5, use
   * `..?limit=5`.
   * @param {string} [params.sort] - Sort a collection of locks by the specified field in ascending order. To sort in
   * descending order use the `-` character
   *
   * **Available values:** created_at | updated_at | name
   *
   * **Usage:** To sort a list of locks by their creation date, use
   * `../locks?sort=created_at`.
   * @param {string} [params.search] - Filter locks that contain the specified string in the field "name".
   *
   * **Usage:** If you want to list only the locks that contain the string "text" in the field "name", use
   * `..?search=text`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionLocksPaginatedCollection>>}
   */
  public listSecretVersionLocks(
    params: SecretsManagerV2.ListSecretVersionLocksParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretVersionLocksPaginatedCollection>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id'];
    const _validParams = ['secretId', 'id', 'offset', 'limit', 'sort', 'search', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
      'sort': _params.sort,
      'search': _params.search,
    };

    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listSecretVersionLocks'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}/locks',
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
   * Create secret version locks.
   *
   * Create a lock on the specified version of a secret.
   *
   * A lock can be used to prevent a secret from being deleted or modified while it's in use by your applications. A
   * successful request attaches a new lock to your secret, or replaces a lock of the same name if it already exists.
   * Additionally, you can use this operation to clear any matching locks on a secret by using one of the following
   * optional lock modes:
   *
   * - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the secret.
   * - `exclusive_delete`: Carries out the same function as `exclusive`, but also permanently deletes the data of the
   * previous secret version if it doesn't have any locks.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {SecretLockPrototype[]} params.locks - The locks data to be attached to a secret version.
   * @param {string} [params.mode] - An optional lock mode. When you create a lock, you can set one of the following
   * modes to clear any matching locks on a secret version.
   * - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the secret.
   * - `exclusive_delete`: Completes the same action as `exclusive`, but also permanently deletes the data of the
   * previous secret version if it doesn't have any locks.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>>}
   */
  public createSecretVersionLocksBulk(
    params: SecretsManagerV2.CreateSecretVersionLocksBulkParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id', 'locks'];
    const _validParams = ['secretId', 'id', 'locks', 'mode', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'locks': _params.locks,
    };

    const query = {
      'mode': _params.mode,
    };

    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createSecretVersionLocksBulk'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}/locks_bulk',
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
   * Delete locks on a secret version.
   *
   * Delete all the locks or a subset of the locks that are associated with the specified version of a secret.
   *
   * To delete only a subset of the locks, add a query param with a comma to separate the list of lock names:
   *
   * Example: `?name=lock-example-1,lock-example-2`.
   *
   * **Note:** A secret is considered unlocked and able to be deleted only after all of its locks are removed. To
   * determine whether a secret contains locks, check the `locks_total` field that is returned as part of the metadata
   * of your secret.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The v4 UUID that uniquely identifies your secret.
   * @param {string} params.id - The v4 UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {string[]} [params.name] - Specify the names of the secret locks to be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>>}
   */
  public deleteSecretVersionLocksBulk(
    params: SecretsManagerV2.DeleteSecretVersionLocksBulkParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretLocks>> {
    const _params = { ...params };
    const _requiredParams = ['secretId', 'id'];
    const _validParams = ['secretId', 'id', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'name': _params.name,
    };

    const path = {
      'secret_id': _params.secretId,
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteSecretVersionLocksBulk'
    );

    const parameters = {
      options: {
        url: '/v2/secrets/{secret_id}/versions/{id}/locks_bulk',
        method: 'DELETE',
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
   * configurations
   ************************/

  /**
   * Create a new configuration.
   *
   * Add a configuration to the specified secret type.
   *
   * Use this operation to define the configurations that are required to create public certificates (`public_cert`),
   * private certificates (`private_cert`) and IAM Credentials secrets (`iam_credentials`).
   *
   * You can add multiple configurations for your instance as follows:
   *
   * - A single configuration for IAM Credentials.
   * - Up to 10 CA configurations for public certificates.
   * - Up to 10 DNS configurations for public certificates.
   * - Up to 10 Root CA configurations for private certificates.
   * - Up to 10 Intermediate CA configurations for private certificates.
   * - Up to 10 Certificate Template configurations for private certificates.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {ConfigurationPrototype} params.configurationPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.Configuration>>}
   */
  public createConfiguration(
    params: SecretsManagerV2.CreateConfigurationParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.Configuration>> {
    const _params = { ...params };
    const _requiredParams = ['configurationPrototype'];
    const _validParams = ['configurationPrototype', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.configurationPrototype;
    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createConfiguration'
    );

    const parameters = {
      options: {
        url: '/v2/configurations',
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
   * List configurations.
   *
   * List the configurations that are available in your Secrets Manager instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {number} [params.offset] - The number of configurations to skip. By specifying `offset`, you retrieve a
   * subset of items that starts with the `offset` value. Use `offset` with `limit` to page through your available
   * resources.
   *
   * **Usage:** If you have 100 configurations in your instance, and you want to retrieve configurations 26 through 50,
   * use
   * `..?offset=25&limit=25`.
   * @param {number} [params.limit] - The number of configurations to retrieve. By default, list operations return the
   * first 200 items. To retrieve a different set of items, use `limit` with `offset` to page through your available
   * resources. Maximum limit allowed is 1000 secrets.
   *
   * **Usage:** If you want to retrieve only the first 25 configurations in your instance, use
   * `..?limit=25`.
   * @param {string} [params.sort] - Sort a collection of configurations by the specified field in ascending order. To
   * sort in descending order use the `-` character
   *
   *
   * **Available values:**  config_type | secret_type | name
   *
   * **Usage:** To sort a list of configurations by their creation date, use
   * `../configurations?sort=config_type`.
   * @param {string} [params.search] - Obtain a collection of configurations that contain the specified string in one or
   * more of the fields: `name`, `config_type`, `secret_type`.
   *
   * **Usage:** If you want to list only the configurations that contain the string `text`, use
   * `../secrets?search=text`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.ConfigurationMetadataPaginatedCollection>>}
   */
  public listConfigurations(
    params?: SecretsManagerV2.ListConfigurationsParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.ConfigurationMetadataPaginatedCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['offset', 'limit', 'sort', 'search', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
      'sort': _params.sort,
      'search': _params.search,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listConfigurations'
    );

    const parameters = {
      options: {
        url: '/v2/configurations',
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
   * Get a configuration.
   *
   * Get a configuration by specifying its name.
   *
   * A successful request returns the details of your configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name that uniquely identifies a configuration.
   * @param {string} [params.xSmAcceptConfigurationType] - The configuration type of this configuration - use this
   * header to resolve 300 error responses.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.Configuration>>}
   */
  public getConfiguration(
    params: SecretsManagerV2.GetConfigurationParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.Configuration>> {
    const _params = { ...params };
    const _requiredParams = ['name'];
    const _validParams = ['name', 'xSmAcceptConfigurationType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getConfiguration'
    );

    const parameters = {
      options: {
        url: '/v2/configurations/{name}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Sm-Accept-Configuration-Type': _params.xSmAcceptConfigurationType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update configuration.
   *
   * Update a configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name that uniquely identifies a configuration.
   * @param {ConfigurationPatch} params.configurationPatch -
   * @param {string} [params.xSmAcceptConfigurationType] - The configuration type of this configuration - use this
   * header to resolve 300 error responses.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.Configuration>>}
   */
  public updateConfiguration(
    params: SecretsManagerV2.UpdateConfigurationParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.Configuration>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'configurationPatch'];
    const _validParams = ['name', 'configurationPatch', 'xSmAcceptConfigurationType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.configurationPatch;
    const path = {
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateConfiguration'
    );

    const parameters = {
      options: {
        url: '/v2/configurations/{name}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/merge-patch+json',
            'X-Sm-Accept-Configuration-Type': _params.xSmAcceptConfigurationType,
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
   * Delete a configuration by specifying its name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name that uniquely identifies a configuration.
   * @param {string} [params.xSmAcceptConfigurationType] - The configuration type of this configuration - use this
   * header to resolve 300 error responses.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>>}
   */
  public deleteConfiguration(
    params: SecretsManagerV2.DeleteConfigurationParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['name'];
    const _validParams = ['name', 'xSmAcceptConfigurationType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteConfiguration'
    );

    const parameters = {
      options: {
        url: '/v2/configurations/{name}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Sm-Accept-Configuration-Type': _params.xSmAcceptConfigurationType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a configuration action.
   *
   * Create a configuration action. This operation supports the following actions:
   *
   * - `private_cert_configuration_action_sign_intermediate`: Sign an intermediate certificate authority.
   * - `private_cert_configuration_action_sign_csr`: Sign a certificate signing request.
   * - `private_cert_configuration_action_set_signed`: Set a signed intermediate certificate authority.
   * - `private_cert_configuration_action_revoke_ca_certificate`: Revoke an internally signed intermediate certificate
   * authority certificate.
   * - `private_cert_configuration_action_rotate_crl`: Rotate the certificate revocation list (CRL) of an intermediate
   * certificate authority.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name that uniquely identifies a configuration.
   * @param {ConfigurationActionPrototype} params.configActionPrototype -
   * @param {string} [params.xSmAcceptConfigurationType] - The configuration type of this configuration - use this
   * header to resolve 300 error responses.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.ConfigurationAction>>}
   */
  public createConfigurationAction(
    params: SecretsManagerV2.CreateConfigurationActionParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.ConfigurationAction>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'configActionPrototype'];
    const _validParams = ['name', 'configActionPrototype', 'xSmAcceptConfigurationType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.configActionPrototype;
    const path = {
      'name': _params.name,
    };

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createConfigurationAction'
    );

    const parameters = {
      options: {
        url: '/v2/configurations/{name}/actions',
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
            'X-Sm-Accept-Configuration-Type': _params.xSmAcceptConfigurationType,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * notifications
   ************************/

  /**
   * Register with Event Notifications instance.
   *
   * Create a registration between a Secrets Manager instance and [Event
   * Notifications](https://cloud.ibm.com/apidocs/event-notifications).
   *
   * A successful request adds Secrets Manager as a source that you can reference from your Event Notifications
   * instance. For more information about enabling notifications for Secrets Manager, check out the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-event-notifications).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.eventNotificationsInstanceCrn - A CRN that uniquely identifies an IBM Cloud resource.
   * @param {string} params.eventNotificationsSourceName - The name that is displayed as a source that is in your Event
   * Notifications instance.
   * @param {string} [params.eventNotificationsSourceDescription] - An optional description for the source  that is in
   * your Event Notifications instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.NotificationsRegistration>>}
   */
  public createNotificationsRegistration(
    params: SecretsManagerV2.CreateNotificationsRegistrationParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.NotificationsRegistration>> {
    const _params = { ...params };
    const _requiredParams = ['eventNotificationsInstanceCrn', 'eventNotificationsSourceName'];
    const _validParams = ['eventNotificationsInstanceCrn', 'eventNotificationsSourceName', 'eventNotificationsSourceDescription', 'headers'];
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
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createNotificationsRegistration'
    );

    const parameters = {
      options: {
        url: '/v2/notifications/registration',
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
   * Get the details of the registration between your Secrets Manager instance and Event Notifications.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.NotificationsRegistration>>}
   */
  public getNotificationsRegistration(
    params?: SecretsManagerV2.GetNotificationsRegistrationParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.NotificationsRegistration>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getNotificationsRegistration'
    );

    const parameters = {
      options: {
        url: '/v2/notifications/registration',
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
   * Unregister from Event Notifications instance.
   *
   * Delete the registration between your Secrets Manager instance and Event Notifications.
   *
   * A successful request removes your Secrets Manager instance as a source in Event Notifications.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>>}
   */
  public deleteNotificationsRegistration(
    params?: SecretsManagerV2.DeleteNotificationsRegistrationParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteNotificationsRegistration'
    );

    const parameters = {
      options: {
        url: '/v2/notifications/registration',
        method: 'DELETE',
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
   * Send a test event for Event Notifications registrations.
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
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>>}
   */
  public getNotificationsRegistrationTest(
    params?: SecretsManagerV2.GetNotificationsRegistrationTestParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(
      SecretsManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getNotificationsRegistrationTest'
    );

    const parameters = {
      options: {
        url: '/v2/notifications/registration/test',
        method: 'GET',
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
}

/*************************
 * interfaces
 ************************/

namespace SecretsManagerV2 {
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
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `createSecretGroup` operation. */
  export interface CreateSecretGroupParams {
    /** The name of your secret group. */
    name: string;
    /** An extended description of your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretGroups` operation. */
  export interface ListSecretGroupsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretGroup` operation. */
  export interface GetSecretGroupParams {
    /** The v4 UUID that uniquely identifies your secret group. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecretGroup` operation. */
  export interface UpdateSecretGroupParams {
    /** The v4 UUID that uniquely identifies your secret group. */
    id: string;
    /** The name of your secret group. */
    name?: string;
    /** An extended description of your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecretGroup` operation. */
  export interface DeleteSecretGroupParams {
    /** The v4 UUID that uniquely identifies your secret group. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecret` operation. */
  export interface CreateSecretParams {
    secretPrototype: SecretPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecrets` operation. */
  export interface ListSecretsParams {
    /** The number of secrets to skip. By specifying `offset`, you retrieve a subset of items that starts with the
     *  `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
     *  `..?offset=25&limit=25`.
     */
    offset?: number;
    /** The number of secrets to retrieve. By default, list operations return the first 200 items. To retrieve a
     *  different set of items, use `limit` with `offset` to page through your available resources. Maximum limit
     *  allowed is 1000 secrets.
     *
     *  **Usage:** If you want to retrieve only the first 25 secrets in your instance, use
     *  `..?limit=25`.
     */
    limit?: number;
    /** Sort a collection of secrets by the specified field in ascending order. To sort in descending order use the
     *  `-` character
     *
     *
     *  **Available values:** id | created_at | updated_at | expiration_date | secret_type | name
     *
     *  **Usage:** To sort a list of secrets by their creation date, use
     *  `../secrets?sort=created_at`.
     */
    sort?: string;
    /** Obtain a collection of secrets that contain the specified string in one or more of the fields: `id`, `name`,
     *  `description`,
     *  `labels`, `secret_type`.
     *
     *  **Usage:** If you want to list only the secrets that contain the string `text`, use
     *  `../secrets?search=text`.
     */
    search?: string;
    /** Filter secrets by groups.
     *
     *  You can apply multiple filters by using a comma-separated list of secret group IDs. If you need to filter
     *  secrets that are in the default secret group, use the `default` keyword.
     *
     *  **Usage:** To retrieve a list of secrets that are associated with an existing secret group or the default group,
     *  use `..?groups={secret_group_ID},default`.
     */
    groups?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecret` operation. */
  export interface GetSecretParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecret` operation. */
  export interface DeleteSecretParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretMetadata` operation. */
  export interface GetSecretMetadataParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecretMetadata` operation. */
  export interface UpdateSecretMetadataParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    secretMetadataPatch: SecretMetadataPatch;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecretAction` operation. */
  export interface CreateSecretActionParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    secretActionPrototype: SecretActionPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecretVersion` operation. */
  export interface CreateSecretVersionParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    secretVersionPrototype: SecretVersionPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretVersions` operation. */
  export interface ListSecretVersionsParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretVersion` operation. */
  export interface GetSecretVersionParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecretVersionData` operation. */
  export interface DeleteSecretVersionDataParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretVersionMetadata` operation. */
  export interface GetSecretVersionMetadataParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecretVersionMetadata` operation. */
  export interface UpdateSecretVersionMetadataParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    /** The secret version metadata that a user can customize. */
    versionCustomMetadata?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecretVersionAction` operation. */
  export interface CreateSecretVersionActionParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    secretVersionActionPrototype: SecretVersionActionPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretsLocks` operation. */
  export interface ListSecretsLocksParams {
    /** The number of secrets to skip. By specifying `offset`, you retrieve a subset of items that starts with the
     *  `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 secrets in your instance, and you want to retrieve secrets 26 through 50, use
     *  `..?offset=25&limit=25`.
     */
    offset?: number;
    /** The number of secrets to retrieve. By default, list operations return the first 200 items. To retrieve a
     *  different set of items, use `limit` with `offset` to page through your available resources. Maximum limit
     *  allowed is 1000 secrets.
     *
     *  **Usage:** If you want to retrieve only the first 25 secrets in your instance, use
     *  `..?limit=25`.
     */
    limit?: number;
    /** Filter locks that contain the specified string in the field "name".
     *
     *  **Usage:** If you want to list only the locks that contain the string "text" in the field "name", use
     *  `..?search=text`.
     */
    search?: string;
    /** Filter secrets by groups.
     *
     *  You can apply multiple filters by using a comma-separated list of secret group IDs. If you need to filter
     *  secrets that are in the default secret group, use the `default` keyword.
     *
     *  **Usage:** To retrieve a list of secrets that are associated with an existing secret group or the default group,
     *  use `..?groups={secret_group_ID},default`.
     */
    groups?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretLocks` operation. */
  export interface ListSecretLocksParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    /** The number of locks to skip. By specifying `offset`, you retrieve a subset of items that starts with the
     *  `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 locks on your secret, and you want to retrieve locks 26 through 50, use
     *  `..?offset=25&limit=25`.
     */
    offset?: number;
    /** The number of locks with associated secret to retrieve. By default, list operations return the first 25
     *  items. To retrieve a different set of items, use `limit` with `offset` to page through your available resources.
     *
     *  **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5, use
     *  `..?limit=5`.
     */
    limit?: number;
    /** Sort a collection of locks by the specified field in ascending order. To sort in descending order use the
     *  `-` character
     *
     *  **Available values:** created_at | updated_at | name
     *
     *  **Usage:** To sort a list of locks by their creation date, use
     *  `../locks?sort=created_at`.
     */
    sort?: string;
    /** Filter locks that contain the specified string in the field "name".
     *
     *  **Usage:** If you want to list only the locks that contain the string "text" in the field "name", use
     *  `..?search=text`.
     */
    search?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecretLocksBulk` operation. */
  export interface CreateSecretLocksBulkParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    /** The locks data to be attached to a secret version. */
    locks: SecretLockPrototype[];
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching
     *  locks on a secret version.
     *  - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the
     *  secret. - `exclusive_delete`: Completes the same action as `exclusive`, but also permanently deletes the data of
     *  the previous secret version if it doesn't have any locks.
     */
    mode?: CreateSecretLocksBulkConstants.Mode | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSecretLocksBulk` operation. */
  export namespace CreateSecretLocksBulkConstants {
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching locks on a secret version. - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the secret. - `exclusive_delete`: Completes the same action as `exclusive`, but also permanently deletes the data of the previous secret version if it doesn't have any locks. */
    export enum Mode {
      EXCLUSIVE = 'exclusive',
      EXCLUSIVE_DELETE = 'exclusive_delete',
    }
  }

  /** Parameters for the `deleteSecretLocksBulk` operation. */
  export interface DeleteSecretLocksBulkParams {
    /** The v4 UUID that uniquely identifies your secret. */
    id: string;
    /** Specify the names of the secret locks to be deleted. */
    name?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretVersionLocks` operation. */
  export interface ListSecretVersionLocksParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    /** The number of locks to skip. By specifying `offset`, you retrieve a subset of items that starts with the
     *  `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 locks on your secret, and you want to retrieve locks 26 through 50, use
     *  `..?offset=25&limit=25`.
     */
    offset?: number;
    /** The number of locks with associated secret to retrieve. By default, list operations return the first 25
     *  items. To retrieve a different set of items, use `limit` with `offset` to page through your available resources.
     *
     *  **Usage:** If you have 20 secrets in your instance, and you want to retrieve only the first 5, use
     *  `..?limit=5`.
     */
    limit?: number;
    /** Sort a collection of locks by the specified field in ascending order. To sort in descending order use the
     *  `-` character
     *
     *  **Available values:** created_at | updated_at | name
     *
     *  **Usage:** To sort a list of locks by their creation date, use
     *  `../locks?sort=created_at`.
     */
    sort?: string;
    /** Filter locks that contain the specified string in the field "name".
     *
     *  **Usage:** If you want to list only the locks that contain the string "text" in the field "name", use
     *  `..?search=text`.
     */
    search?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecretVersionLocksBulk` operation. */
  export interface CreateSecretVersionLocksBulkParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    /** The locks data to be attached to a secret version. */
    locks: SecretLockPrototype[];
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching
     *  locks on a secret version.
     *  - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the
     *  secret. - `exclusive_delete`: Completes the same action as `exclusive`, but also permanently deletes the data of
     *  the previous secret version if it doesn't have any locks.
     */
    mode?: CreateSecretVersionLocksBulkConstants.Mode | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSecretVersionLocksBulk` operation. */
  export namespace CreateSecretVersionLocksBulkConstants {
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching locks on a secret version. - `exclusive`: Removes any other locks with matching names if they are found in the previous version of the secret. - `exclusive_delete`: Completes the same action as `exclusive`, but also permanently deletes the data of the previous secret version if it doesn't have any locks. */
    export enum Mode {
      EXCLUSIVE = 'exclusive',
      EXCLUSIVE_DELETE = 'exclusive_delete',
    }
  }

  /** Parameters for the `deleteSecretVersionLocksBulk` operation. */
  export interface DeleteSecretVersionLocksBulkParams {
    /** The v4 UUID that uniquely identifies your secret. */
    secretId: string;
    /** The v4 UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    /** Specify the names of the secret locks to be deleted. */
    name?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createConfiguration` operation. */
  export interface CreateConfigurationParams {
    configurationPrototype: ConfigurationPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listConfigurations` operation. */
  export interface ListConfigurationsParams {
    /** The number of configurations to skip. By specifying `offset`, you retrieve a subset of items that starts
     *  with the `offset` value. Use `offset` with `limit` to page through your available resources.
     *
     *  **Usage:** If you have 100 configurations in your instance, and you want to retrieve configurations 26 through
     *  50, use
     *  `..?offset=25&limit=25`.
     */
    offset?: number;
    /** The number of configurations to retrieve. By default, list operations return the first 200 items. To
     *  retrieve a different set of items, use `limit` with `offset` to page through your available resources. Maximum
     *  limit allowed is 1000 secrets.
     *
     *  **Usage:** If you want to retrieve only the first 25 configurations in your instance, use
     *  `..?limit=25`.
     */
    limit?: number;
    /** Sort a collection of configurations by the specified field in ascending order. To sort in descending order
     *  use the `-` character
     *
     *
     *  **Available values:**  config_type | secret_type | name
     *
     *  **Usage:** To sort a list of configurations by their creation date, use
     *  `../configurations?sort=config_type`.
     */
    sort?: string;
    /** Obtain a collection of configurations that contain the specified string in one or more of the fields:
     *  `name`, `config_type`, `secret_type`.
     *
     *  **Usage:** If you want to list only the configurations that contain the string `text`, use
     *  `../secrets?search=text`.
     */
    search?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConfiguration` operation. */
  export interface GetConfigurationParams {
    /** The name that uniquely identifies a configuration. */
    name: string;
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    xSmAcceptConfigurationType?: GetConfigurationConstants.XSmAcceptConfigurationType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getConfiguration` operation. */
  export namespace GetConfigurationConstants {
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    export enum XSmAcceptConfigurationType {
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
    }
  }

  /** Parameters for the `updateConfiguration` operation. */
  export interface UpdateConfigurationParams {
    /** The name that uniquely identifies a configuration. */
    name: string;
    configurationPatch: ConfigurationPatch;
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    xSmAcceptConfigurationType?: UpdateConfigurationConstants.XSmAcceptConfigurationType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateConfiguration` operation. */
  export namespace UpdateConfigurationConstants {
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    export enum XSmAcceptConfigurationType {
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
    }
  }

  /** Parameters for the `deleteConfiguration` operation. */
  export interface DeleteConfigurationParams {
    /** The name that uniquely identifies a configuration. */
    name: string;
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    xSmAcceptConfigurationType?: DeleteConfigurationConstants.XSmAcceptConfigurationType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteConfiguration` operation. */
  export namespace DeleteConfigurationConstants {
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    export enum XSmAcceptConfigurationType {
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
    }
  }

  /** Parameters for the `createConfigurationAction` operation. */
  export interface CreateConfigurationActionParams {
    /** The name that uniquely identifies a configuration. */
    name: string;
    configActionPrototype: ConfigurationActionPrototype;
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    xSmAcceptConfigurationType?: CreateConfigurationActionConstants.XSmAcceptConfigurationType | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createConfigurationAction` operation. */
  export namespace CreateConfigurationActionConstants {
    /** The configuration type of this configuration - use this header to resolve 300 error responses. */
    export enum XSmAcceptConfigurationType {
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
    }
  }

  /** Parameters for the `createNotificationsRegistration` operation. */
  export interface CreateNotificationsRegistrationParams {
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    eventNotificationsInstanceCrn: string;
    /** The name that is displayed as a source that is in your Event Notifications instance. */
    eventNotificationsSourceName: string;
    /** An optional description for the source  that is in your Event Notifications instance. */
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

  /** Parameters for the `getNotificationsRegistrationTest` operation. */
  export interface GetNotificationsRegistrationTestParams {
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Issuance information that is associated with your certificate. */
  export interface CertificateIssuanceInfo {
    /** Indicates whether the issued certificate is configured with an automatic rotation policy. */
    auto_rotated?: boolean;
    /** The set of challenges. It is returned only when ordering public certificates by using manual DNS
     *  configuration.
     */
    challenges?: ChallengeResource[];
    /** The date that a user requests to validate DNS challenges for certificates that are ordered with a manual DNS
     *  provider. The date format follows RFC 3339.
     */
    dns_challenge_validation_time?: string;
    /** A code that identifies an issuance error.
     *
     *  This field, along with `error_message`, is returned when Secrets Manager successfully processes your request,
     *  but the certificate authority is unable to issue a certificate.
     */
    error_code?: string;
    /** A human-readable message that provides details about the issuance error. */
    error_message?: string;
    /** The date when the certificate is ordered. The date format follows RFC 3339. */
    ordered_on?: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
  }

  /** The date and time that the certificate validity period begins and ends. */
  export interface CertificateValidity {
    /** The date-time format follows RFC 3339. */
    not_before: string;
    /** The date-time format follows RFC 3339. */
    not_after: string;
  }

  /** Properties that describe a challenge. */
  export interface ChallengeResource {
    /** The challenge domain. */
    domain?: string;
    /** The challenge expiration date. The date format follows RFC 3339. */
    expiration?: string;
    /** The challenge status. */
    status?: string;
    /** The TXT record name. */
    txt_record_name?: string;
    /** The TXT record value. */
    txt_record_value?: string;
  }

  /** Your configuration. */
  export interface Configuration {
  }

  /** The response body to specify the properties of the action to create a configuration. */
  export interface ConfigurationAction {
  }

  /** The request body to specify the properties of the action to create a configuration. */
  export interface ConfigurationActionPrototype {
  }

  /** Your configuration metadata properties. */
  export interface ConfigurationMetadata {
  }

  /** Properties that describe a paginated collection of secret locks. */
  export interface ConfigurationMetadataPaginatedCollection {
    /** The total number of resources in a collection. */
    total_count: number;
    /** The number of items that are retrieved in a collection. */
    limit: number;
    /** The number of items that are skipped in a collection. */
    offset: number;
    /** A URL that points to the first page in a collection. */
    first: PaginatedCollectionFirst;
    /** A URL that points to the next page in a collection. */
    next?: PaginatedCollectionNext;
    /** A URL that points to the previous page in a collection. */
    previous?: PaginatedCollectionPrevious;
    /** A URL that points to the last page in a collection. */
    last: PaginatedCollectionLast;
    /** A collection of configuration metadata. */
    configurations: ConfigurationMetadata[];
  }

  /** Your configuration update data. */
  export interface ConfigurationPatch {
  }

  /** The details of your configuration. */
  export interface ConfigurationPrototype {
  }

  /** The details of the Event Notifications registration. */
  export interface NotificationsRegistration {
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    event_notifications_instance_crn: string;
  }

  /** A URL that points to the first page in a collection. */
  export interface PaginatedCollectionFirst {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /** A URL that points to the last page in a collection. */
  export interface PaginatedCollectionLast {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /** A URL that points to the next page in a collection. */
  export interface PaginatedCollectionNext {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /** A URL that points to the previous page in a collection. */
  export interface PaginatedCollectionPrevious {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /** The configuration data of your Private Certificate. */
  export interface PrivateCertificateCAData {
  }

  /** Defines the rotation object that is used to manually rotate public certificates. */
  export interface PublicCertificateRotationObject {
    /** Determines whether Secrets Manager rotates the private key for your public certificate automatically.
     *
     *  Default is `false`. If it is set to `true`, the service generates and stores a new private key for your rotated
     *  certificate.
     */
    rotate_keys?: boolean;
  }

  /** Determines whether Secrets Manager rotates your secrets automatically. */
  export interface RotationPolicy {
  }

  /** Your secret. */
  export interface Secret {
  }

  /** The response body to specify the properties of the action to create a secret. */
  export interface SecretAction {
  }

  /** Specify the properties for your secret action. */
  export interface SecretActionPrototype {
  }

  /** Properties that describe a secret group. */
  export interface SecretGroup {
    /** A v4 UUID identifier, or `default` secret group. */
    id: string;
    /** The name of your existing secret group. */
    name?: string;
    /** An extended description of your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** Properties that describe a collection of secret groups. */
  export interface SecretGroupCollection {
    /** A collection of secret groups. */
    secret_groups: SecretGroup[];
    /** The total number of resources in a collection. */
    total_count: number;
  }

  /** SecretLock. */
  export interface SecretLock {
    /** A human-readable name to assign to the lock. The lock name must be unique per secret version.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret
     *  lock.
     */
    name: string;
    /** An extended description of the lock.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret lock.
     */
    description?: string;
    /** Optional information to associate with a lock, such as resources CRNs to be used by automation. */
    attributes?: JsonObject;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** A v4 UUID identifier. */
    secret_version_id: string;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    secret_version_alias: string;
  }

  /** SecretLockPrototype. */
  export interface SecretLockPrototype {
    /** A human-readable name to assign to the lock. The lock name must be unique per secret version.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret
     *  lock.
     */
    name: string;
    /** An extended description of the lock.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret lock.
     */
    description?: string;
    /** Optional information to associate with a lock, such as resources CRNs to be used by automation. */
    attributes?: JsonObject;
  }

  /** Create locks response body containing a collection of locks that are attached to a secret. */
  export interface SecretLocks {
    /** A v4 UUID identifier. */
    secret_id: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type?: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** A collection of locks that are attached to a secret. */
    versions: SecretVersionLocks[];
  }

  /** Properties that describe a paginated collection of your secret locks. */
  export interface SecretLocksPaginatedCollection {
    /** The total number of resources in a collection. */
    total_count: number;
    /** The number of items that are retrieved in a collection. */
    limit: number;
    /** The number of items that are skipped in a collection. */
    offset: number;
    /** A URL that points to the first page in a collection. */
    first: PaginatedCollectionFirst;
    /** A URL that points to the next page in a collection. */
    next?: PaginatedCollectionNext;
    /** A URL that points to the previous page in a collection. */
    previous?: PaginatedCollectionPrevious;
    /** A URL that points to the last page in a collection. */
    last: PaginatedCollectionLast;
    /** A collection of secret locks. */
    locks: SecretLock[];
  }

  /** Properties of your secret metadata. */
  export interface SecretMetadata {
  }

  /** Properties that describe a paginated collection of your secret metadata. */
  export interface SecretMetadataPaginatedCollection {
    /** The total number of resources in a collection. */
    total_count: number;
    /** The number of items that are retrieved in a collection. */
    limit: number;
    /** The number of items that are skipped in a collection. */
    offset: number;
    /** A URL that points to the first page in a collection. */
    first: PaginatedCollectionFirst;
    /** A URL that points to the next page in a collection. */
    next?: PaginatedCollectionNext;
    /** A URL that points to the previous page in a collection. */
    previous?: PaginatedCollectionPrevious;
    /** A URL that points to the last page in a collection. */
    last: PaginatedCollectionLast;
    /** A collection of secret metadata. */
    secrets: SecretMetadata[];
  }

  /** Update your secret metadata. */
  export interface SecretMetadataPatch {
  }

  /** Specify the properties for your secret. */
  export interface SecretPrototype {
  }

  /** Your secret version. */
  export interface SecretVersion {
  }

  /** The request body to specify the properties of the action to create a secret version. */
  export interface SecretVersionActionPrototype {
  }

  /** SecretVersionLocks. */
  export interface SecretVersionLocks {
    /** A v4 UUID identifier. */
    version_id: string;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    version_alias: string;
    /** The names of all locks that are associated with this secret version. */
    locks: string[];
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available?: boolean;
  }

  /** Properties that describe a paginated collection of your secret version locks. */
  export interface SecretVersionLocksPaginatedCollection {
    /** The total number of resources in a collection. */
    total_count: number;
    /** The number of items that are retrieved in a collection. */
    limit: number;
    /** The number of items that are skipped in a collection. */
    offset: number;
    /** A URL that points to the first page in a collection. */
    first: PaginatedCollectionFirst;
    /** A URL that points to the next page in a collection. */
    next?: PaginatedCollectionNext;
    /** A URL that points to the previous page in a collection. */
    previous?: PaginatedCollectionPrevious;
    /** A URL that points to the last page in a collection. */
    last: PaginatedCollectionLast;
    /** A collection of secret version locks. */
    locks: SecretLock[];
  }

  /** Properties of the version metadata of your secret. */
  export interface SecretVersionMetadata {
  }

  /** Properties that describe a collection of your secret version metadata. */
  export interface SecretVersionMetadataCollection {
    /** A collection of secret version metadata. */
    versions: SecretVersionMetadata[];
    /** The total number of resources in a collection. */
    total_count: number;
  }

  /** Specify the properties for your new secret version. */
  export interface SecretVersionPrototype {
  }

  /** Properties that describe a paginated collection of your secrets locks. */
  export interface SecretsLocksPaginatedCollection {
    /** The total number of resources in a collection. */
    total_count: number;
    /** The number of items that are retrieved in a collection. */
    limit: number;
    /** The number of items that are skipped in a collection. */
    offset: number;
    /** A URL that points to the first page in a collection. */
    first: PaginatedCollectionFirst;
    /** A URL that points to the next page in a collection. */
    next?: PaginatedCollectionNext;
    /** A URL that points to the previous page in a collection. */
    previous?: PaginatedCollectionPrevious;
    /** A URL that points to the last page in a collection. */
    last: PaginatedCollectionLast;
    /** A collection of secrets and their locks. */
    secrets_locks: SecretLocks[];
  }

  /** The request body to specify the properties of the action to create a secret version. */
  export interface VersionAction {
  }

  /** Your arbitrary secret. */
  export interface ArbitrarySecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The arbitrary secret's data payload. */
    payload?: string;
  }

  /** Properties of the metadata of your arbitrary secret.. */
  export interface ArbitrarySecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
  }

  /** ArbitrarySecretMetadataPatch. */
  export interface ArbitrarySecretMetadataPatch extends SecretMetadataPatch {
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
  }

  /** ArbitrarySecretPrototype. */
  export interface ArbitrarySecretPrototype extends SecretPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The arbitrary secret's data payload. */
    payload: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your arbitrary secret version. */
  export interface ArbitrarySecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The arbitrary secret's data payload. */
    payload?: string;
  }

  /** Properties of the version metadata of your arbitrary secret. */
  export interface ArbitrarySecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
  }

  /** ArbitrarySecretVersionPrototype. */
  export interface ArbitrarySecretVersionPrototype extends SecretVersionPrototype {
    /** The arbitrary secret's data payload. */
    payload: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Determines whether Secrets Manager rotates your secrets automatically. */
  export interface CommonRotationPolicy extends RotationPolicy {
    /** Determines whether Secrets Manager rotates your secret automatically.
     *
     *  Default is `false`. If `auto_rotate` is set to `true` the service rotates your secret based on the defined
     *  interval.
     */
    auto_rotate: boolean;
    /** The length of the secret rotation time interval. */
    interval?: number;
    /** The units for the secret rotation time interval. */
    unit?: string;
  }

  /** Properties that describe a Classic Infrastructure DNS configuration. */
  export interface IAMCredentialsConfiguration extends Configuration {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease (see the `ttl` field), the API key is deleted automatically. If
     *  you want to continue to use the same API key for future read operations, see the `reuse_api_key` field.
     */
    api_key?: string;
  }

  /** Your IAMCredentials Configuration metadata properties. */
  export interface IAMCredentialsConfigurationMetadata extends ConfigurationMetadata {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** The configuration update of the IAM Credentials engine. */
  export interface IAMCredentialsConfigurationPatch extends ConfigurationPatch {
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease (see the `ttl` field), the API key is deleted automatically. If
     *  you want to continue to use the same API key for future read operations, see the `reuse_api_key` field.
     */
    api_key: string;
  }

  /** IAMCredentialsConfigurationPrototype. */
  export interface IAMCredentialsConfigurationPrototype extends ConfigurationPrototype {
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** Th configuration type. */
    config_type: string;
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease (see the `ttl` field), the API key is deleted automatically. If
     *  you want to continue to use the same API key for future read operations, see the `reuse_api_key` field.
     */
    api_key: string;
  }

  /** Your IAM credentials secret. */
  export interface IAMCredentialsSecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration, such as
     *  `120m` or `24h`.
     *
     *  Minimum duration is 1 minute. Maximum is 90 days.
     */
    ttl: string;
    /** Access Groups that you can use for an `iam_credentials` secret.
     *
     *  Up to 10 Access Groups can be used for each secret.
     */
    access_groups?: string[];
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
     *  If it is set to `true`, the service ID for the secret was provided by the user at secret creation. If it is set
     *  to `false`, the service ID was generated by Secrets Manager.
     */
    service_id_is_static?: boolean;
    /** Determines whether to use the same service ID and API key for future read operations on an
     *  `iam_credentials` secret.
     *
     *  If it is set to `true`, the service reuses the current credentials. If it is set to `false`, a new service ID
     *  and API key are generated each time that the secret is read or accessed.
     */
    reuse_api_key: boolean;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that have an existing rotation policy.
     */
    next_rotation_date?: string;
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease (see the `ttl` field), the API key is deleted automatically. If
     *  you want to continue to use the same API key for future read operations, see the `reuse_api_key` field.
     */
    api_key?: string;
  }

  /** Properties of the metadata of your IAM credentials secret. */
  export interface IAMCredentialsSecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration, such as
     *  `120m` or `24h`.
     *
     *  Minimum duration is 1 minute. Maximum is 90 days.
     */
    ttl: string;
    /** Access Groups that you can use for an `iam_credentials` secret.
     *
     *  Up to 10 Access Groups can be used for each secret.
     */
    access_groups?: string[];
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
     *  If it is set to `true`, the service ID for the secret was provided by the user at secret creation. If it is set
     *  to `false`, the service ID was generated by Secrets Manager.
     */
    service_id_is_static?: boolean;
    /** Determines whether to use the same service ID and API key for future read operations on an
     *  `iam_credentials` secret.
     *
     *  If it is set to `true`, the service reuses the current credentials. If it is set to `false`, a new service ID
     *  and API key are generated each time that the secret is read or accessed.
     */
    reuse_api_key: boolean;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that have an existing rotation policy.
     */
    next_rotation_date?: string;
  }

  /** IAMCredentialsSecretMetadataPatch. */
  export interface IAMCredentialsSecretMetadataPatch extends SecretMetadataPatch {
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration, such as
     *  `120m` or `24h`.
     *
     *  Minimum duration is 1 minute. Maximum is 90 days.
     */
    ttl?: string;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
  }

  /** IAMCredentialsSecretPrototype. */
  export interface IAMCredentialsSecretPrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The time-to-live (TTL) or lease duration to assign to generated credentials.
     *
     *  For `iam_credentials` secrets, the TTL defines for how long each generated API key remains valid. The value can
     *  be either an integer that specifies the number of seconds, or the string representation of a duration, such as
     *  `120m` or `24h`.
     *
     *  Minimum duration is 1 minute. Maximum is 90 days.
     */
    ttl: string;
    /** Access Groups that you can use for an `iam_credentials` secret.
     *
     *  Up to 10 Access Groups can be used for each secret.
     */
    access_groups?: string[];
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
    /** Determines whether to use the same service ID and API key for future read operations on an
     *  `iam_credentials` secret.
     *
     *  If it is set to `true`, the service reuses the current credentials. If it is set to `false`, a new service ID
     *  and API key are generated each time that the secret is read or accessed.
     */
    reuse_api_key: boolean;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** IAMCredentialsSecretRestoreFromVersionPrototype. */
  export interface IAMCredentialsSecretRestoreFromVersionPrototype extends SecretVersionPrototype {
    /** A v4 UUID identifier, or `current` or `previous` secret version aliases. */
    restore_from_version: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your IAM credentials version. */
  export interface IAMCredentialsSecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
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
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease (see the `ttl` field), the API key is deleted automatically. If
     *  you want to continue to use the same API key for future read operations, see the `reuse_api_key` field.
     */
    api_key?: string;
  }

  /** Properties of the version metadata of your IAM credentials secret. */
  export interface IAMCredentialsSecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
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
  }

  /** IAMCredentialsSecretVersionPrototype. */
  export interface IAMCredentialsSecretVersionPrototype extends SecretVersionPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your imported certificate. */
  export interface ImportedCertificate extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (AKA CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** Indicates whether the certificate was imported with an associated intermediate certificate. */
    intermediate_included: boolean;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer: string;
    /** The identifier for the cryptographic algorithm used to generate the public key that is associated with the
     *  certificate.
     */
    key_algorithm?: string;
    /** Indicates whether the certificate was imported with an associated private key. */
    private_key_included: boolean;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
    /** The PEM-encoded intermediate certificate that is associated with the root certificate. The data must be
     *  formatted on a single line with embedded newline characters.
     */
    intermediate?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
  }

  /** Properties of the secret metadata of your imported certificate. */
  export interface ImportedCertificateMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (AKA CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** Indicates whether the certificate was imported with an associated intermediate certificate. */
    intermediate_included: boolean;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer: string;
    /** The identifier for the cryptographic algorithm used to generate the public key that is associated with the
     *  certificate.
     */
    key_algorithm?: string;
    /** Indicates whether the certificate was imported with an associated private key. */
    private_key_included: boolean;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
  }

  /** ImportedCertificateMetadataPatch. */
  export interface ImportedCertificateMetadataPatch extends SecretMetadataPatch {
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
  }

  /** ImportedCertificatePrototype. */
  export interface ImportedCertificatePrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
    /** The PEM-encoded intermediate certificate that is associated with the root certificate. The data must be
     *  formatted on a single line with embedded newline characters.
     */
    intermediate?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Versions of your imported certificate. */
  export interface ImportedCertificateVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
    /** The PEM-encoded intermediate certificate that is associated with the root certificate. The data must be
     *  formatted on a single line with embedded newline characters.
     */
    intermediate?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
  }

  /** Properties of the version metadata of your imported certificate. */
  export interface ImportedCertificateVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
  }

  /** ImportedCertificateVersionPrototype. */
  export interface ImportedCertificateVersionPrototype extends SecretVersionPrototype {
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
    /** The PEM-encoded intermediate certificate that is associated with the root certificate. The data must be
     *  formatted on a single line with embedded newline characters.
     */
    intermediate?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your key-value secret. */
  export interface KVSecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The payload data of a key-value secret. */
    data: JsonObject;
  }

  /** Properties of the metadata of your key-value secret metadata. */
  export interface KVSecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
  }

  /** KVSecretMetadataPatch. */
  export interface KVSecretMetadataPatch extends SecretMetadataPatch {
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
  }

  /** KVSecretPrototype. */
  export interface KVSecretPrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The payload data of a key-value secret. */
    data: JsonObject;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your key-value secret version. */
  export interface KVSecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The payload data of a key-value secret. */
    data: JsonObject;
  }

  /** Properties of the version metadata of your key-value secret. */
  export interface KVSecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
  }

  /** KVSecretVersionPrototype. */
  export interface KVSecretVersionPrototype extends SecretVersionPrototype {
    /** The payload data of a key-value secret. */
    data: JsonObject;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your private certificate. */
  export interface PrivateCertificate extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The intermediate certificate authority that signed this certificate. */
    certificate_authority?: string;
    /** The name of the certificate template. */
    certificate_template: string;
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer: string;
    /** The identifier for the cryptographic algorithm used to generate the public key that is associated with the
     *  certificate.
     */
    key_algorithm?: string;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that have an existing rotation policy.
     */
    next_rotation_date?: string;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
    /** The date and time that the certificate was revoked. The date format follows RFC 3339. */
    revocation_time_rfc3339?: string;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key: string;
    /** The PEM-encoded certificate of the certificate authority that signed and issued this certificate. */
    issuing_ca?: string;
    /** The chain of certificate authorities that are associated with the certificate. */
    ca_chain?: string[];
  }

  /** The response body of the action to revoke the private certificate. */
  export interface PrivateCertificateActionRevoke extends SecretAction {
    /** The type of secret action. */
    action_type: string;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
  }

  /** The request body to specify the properties of the action to revoke the private certificate. */
  export interface PrivateCertificateActionRevokePrototype extends SecretActionPrototype {
    /** The type of secret action. */
    action_type: string;
  }

  /** The response body to specify the properties of the action to revoke the private certificate. */
  export interface PrivateCertificateConfigurationActionRevoke extends ConfigurationAction {
    /** The type of configuration action. */
    action_type: string;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
  }

  /** The request body to specify the properties of the action to revoke the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionRevokePrototype extends ConfigurationActionPrototype {
    /** The type of configuration action. */
    action_type: string;
  }

  /** The response body of the action to rotate the CRL of an intermediate certificate authority for the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionRotateCRL extends ConfigurationAction {
    /** The type of configuration action. */
    action_type: string;
    /** Determines whether the request to rotate the CRL for the private certificate configuration was successful. */
    success: boolean;
  }

  /** The request body of the action to rotate the CRL of an intermediate certificate authority for the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionRotateCRLPrototype extends ConfigurationActionPrototype {
    /** The type of configuration action. */
    action_type: string;
  }

  /** The response body of the action to set a signed intermediate certificate authority for the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionSetSigned extends ConfigurationAction {
    /** The type of configuration action. */
    action_type: string;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
  }

  /** The request body of the action to set a signed intermediate certificate authority for the private certificate consideration. */
  export interface PrivateCertificateConfigurationActionSetSignedPrototype extends ConfigurationActionPrototype {
    /** The type of configuration action. */
    action_type: string;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
  }

  /** The response body of the action to sign the CSR for the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionSignCSR extends ConfigurationAction {
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The time-to-live (TTL) to assign to a private certificate.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '12h'. The value can't
     *  exceed the `max_ttl` that is defined in the associated certificate template.
     */
    ttl?: string;
    /** The format of the returned data. */
    format?: string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** Determines whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that are requested in the CSR are added to the basic set of key
     *  usages used for CA certificates that are signed by the intermediate authority.
     *
     *  3) Extensions that are requested in the CSR are copied into the issued private certificate.
     */
    use_csr_values?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: string;
    /** The certificate signing request. */
    csr: string;
    /** The data that is associated with the root certificate authority. */
    data?: PrivateCertificateConfigurationCACertificate;
  }

  /** The request body to specify the properties of the action to sign a CSR for the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionSignCSRPrototype extends ConfigurationActionPrototype {
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The time-to-live (TTL) to assign to a private certificate.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '12h'. The value can't
     *  exceed the `max_ttl` that is defined in the associated certificate template.
     */
    ttl?: string;
    /** The format of the returned data. */
    format?: string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** Determines whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that are requested in the CSR are added to the basic set of key
     *  usages used for CA certificates that are signed by the intermediate authority.
     *
     *  3) Extensions that are requested in the CSR are copied into the issued private certificate.
     */
    use_csr_values?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: string;
    /** The certificate signing request. */
    csr: string;
  }

  /** The response body of the action to sign the intermediate certificate authority for the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionSignIntermediate extends ConfigurationAction {
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The time-to-live (TTL) to assign to a private certificate.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '12h'. The value can't
     *  exceed the `max_ttl` that is defined in the associated certificate template.
     */
    ttl?: string;
    /** The format of the returned data. */
    format?: string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** Determines whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that are requested in the CSR are added to the basic set of key
     *  usages used for CA certificates that are signed by the intermediate authority.
     *
     *  3) Extensions that are requested in the CSR are copied into the issued private certificate.
     */
    use_csr_values?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: string;
    /** The unique name of your configuration. */
    intermediate_certificate_authority?: string;
  }

  /** The request body to specify the properties of the action to sign an intermediate certificate authority for the private certificate configuration. */
  export interface PrivateCertificateConfigurationActionSignIntermediatePrototype extends ConfigurationActionPrototype {
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The time-to-live (TTL) to assign to a private certificate.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '12h'. The value can't
     *  exceed the `max_ttl` that is defined in the associated certificate template.
     */
    ttl?: string;
    /** The format of the returned data. */
    format?: string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** Determines whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that are requested in the CSR are added to the basic set of key
     *  usages used for CA certificates that are signed by the intermediate authority.
     *
     *  3) Extensions that are requested in the CSR are copied into the issued private certificate.
     */
    use_csr_values?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: string;
    /** The unique name of your configuration. */
    intermediate_certificate_authority?: string;
  }

  /** The data that is associated with the root certificate authority. */
  export interface PrivateCertificateConfigurationCACertificate extends PrivateCertificateCAData {
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
    /** The PEM-encoded certificate of the certificate authority that signed and issued this certificate. */
    issuing_ca?: string;
    /** The chain of certificate authorities that are associated with the certificate. */
    ca_chain?: string[];
    /** The certificate expiration time. */
    expiration?: number;
  }

  /** The configuration of the root certificate authority. */
  export interface PrivateCertificateConfigurationIntermediateCA extends Configuration {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA in seconds. */
    max_ttl_seconds?: number;
    /** The signing method to use with this certificate authority to generate private certificates.
     *
     *  You can choose between internal or externally signed options. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-intermediate-certificate-authorities).
     */
    signing_method: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The time until the certificate revocation list (CRL) expires, in seconds. */
    crl_expiry_seconds?: number;
    /** Disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when downloading the CRL. If CRL building
     *  is enabled, it will rebuild the CRL.
     */
    crl_disable?: boolean;
    /** Determines whether to encode the certificate revocation list (CRL) distribution points in the certificates
     *  that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** Determines whether to encode the URL of the issuing certificate in the certificates that are issued by this
     *  certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The format of the returned data. */
    format?: string;
    /** The format of the generated private key. */
    private_key_format?: string;
    /** The type of private key to generate. */
    key_type?: string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** The status of the certificate authority. The status of a root certificate authority is either `configured`
     *  or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`,
     *  `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`.
     */
    status?: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The configuration data of your Private Certificate. */
    data?: PrivateCertificateCAData;
  }

  /** The data that is associated with the intermediate certificate authority. */
  export interface PrivateCertificateConfigurationIntermediateCACSR extends PrivateCertificateCAData {
    /** The certificate signing request. */
    csr?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
    /** The type of private key to generate. */
    private_key_type?: string;
    /** The certificate expiration time. */
    expiration?: number;
  }

  /** The configuration of the metadata properties of the intermediate certificate authority. */
  export interface PrivateCertificateConfigurationIntermediateCAMetadata extends ConfigurationMetadata {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** The configuration patch of the intermediate certificate authority. */
  export interface PrivateCertificateConfigurationIntermediateCAPatch extends ConfigurationPatch {
    /** The maximum time-to-live (TTL) for certificates that are created by this CA.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     *
     *  Minimum value is one hour (`1h`). Maximum value is 100 years (`876000h`).
     */
    max_ttl?: string;
    /** The time until the certificate revocation list (CRL) expires.
     *
     *  The value can be supplied as a string representation of a duration in hours, such as `48h`. The default is 72
     *  hours. In the API response, this value is returned in seconds (integer).
     *
     *  **Note:** The CRL is rotated automatically before it expires.
     */
    crl_expiry?: string;
    /** Disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when downloading the CRL. If CRL building
     *  is enabled, it will rebuild the CRL.
     */
    crl_disable?: boolean;
    /** Determines whether to encode the certificate revocation list (CRL) distribution points in the certificates
     *  that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** Determines whether to encode the URL of the issuing certificate in the certificates that are issued by this
     *  certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
  }

  /** The configuration of the intermediate certificate authority. */
  export interface PrivateCertificateConfigurationIntermediateCAPrototype extends ConfigurationPrototype {
    /** Th configuration type. */
    config_type: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     *
     *  Minimum value is one hour (`1h`). Maximum value is 100 years (`876000h`).
     */
    max_ttl: string;
    /** The signing method to use with this certificate authority to generate private certificates.
     *
     *  You can choose between internal or externally signed options. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-intermediate-certificate-authorities).
     */
    signing_method: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The time until the certificate revocation list (CRL) expires.
     *
     *  The value can be supplied as a string representation of a duration in hours, such as `48h`. The default is 72
     *  hours. In the API response, this value is returned in seconds (integer).
     *
     *  **Note:** The CRL is rotated automatically before it expires.
     */
    crl_expiry?: string;
    /** Disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when downloading the CRL. If CRL building
     *  is enabled, it will rebuild the CRL.
     */
    crl_disable?: boolean;
    /** Determines whether to encode the certificate revocation list (CRL) distribution points in the certificates
     *  that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** Determines whether to encode the URL of the issuing certificate in the certificates that are issued by this
     *  certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The format of the returned data. */
    format?: string;
    /** The format of the generated private key. */
    private_key_format?: string;
    /** The type of private key to generate. */
    key_type?: string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
  }

  /** The root certificate authority . */
  export interface PrivateCertificateConfigurationRootCA extends Configuration {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA in seconds. */
    max_ttl_seconds?: number;
    /** The time until the certificate revocation list (CRL) expires, in seconds. */
    crl_expiry_seconds?: number;
    /** Disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when downloading the CRL. If CRL building
     *  is enabled, it will rebuild the CRL.
     */
    crl_disable?: boolean;
    /** Determines whether to encode the certificate revocation list (CRL) distribution points in the certificates
     *  that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** Determines whether to encode the URL of the issuing certificate in the certificates that are issued by this
     *  certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The requested time-to-live (TTL) for certificates that are created by this CA. This field's value cannot be
     *  longer than the `max_ttl` limit.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     */
    ttl?: string;
    /** The format of the returned data. */
    format?: string;
    /** The format of the generated private key. */
    private_key_format?: string;
    /** The type of private key to generate. */
    key_type?: string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** The status of the certificate authority. The status of a root certificate authority is either `configured`
     *  or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`,
     *  `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`.
     */
    status?: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The configuration data of your Private Certificate. */
    data?: PrivateCertificateCAData;
  }

  /** The configuration of the metadata properties of the root certificate authority. */
  export interface PrivateCertificateConfigurationRootCAMetadata extends ConfigurationMetadata {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** The configuration of the metadata patch for the root certificate authority. */
  export interface PrivateCertificateConfigurationRootCAPatch extends ConfigurationPatch {
    /** The maximum time-to-live (TTL) for certificates that are created by this CA.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     *
     *  Minimum value is one hour (`1h`). Maximum value is 100 years (`876000h`).
     */
    max_ttl?: string;
    /** The time until the certificate revocation list (CRL) expires.
     *
     *  The value can be supplied as a string representation of a duration in hours, such as `48h`. The default is 72
     *  hours. In the API response, this value is returned in seconds (integer).
     *
     *  **Note:** The CRL is rotated automatically before it expires.
     */
    crl_expiry?: string;
    /** Disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when downloading the CRL. If CRL building
     *  is enabled, it will rebuild the CRL.
     */
    crl_disable?: boolean;
    /** Determines whether to encode the certificate revocation list (CRL) distribution points in the certificates
     *  that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** Determines whether to encode the URL of the issuing certificate in the certificates that are issued by this
     *  certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
  }

  /** The configuration of the root certificate authority. */
  export interface PrivateCertificateConfigurationRootCAPrototype extends ConfigurationPrototype {
    /** Th configuration type. */
    config_type: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     *
     *  Minimum value is one hour (`1h`). Maximum value is 100 years (`876000h`).
     */
    max_ttl: string;
    /** The time until the certificate revocation list (CRL) expires.
     *
     *  The value can be supplied as a string representation of a duration in hours, such as `48h`. The default is 72
     *  hours. In the API response, this value is returned in seconds (integer).
     *
     *  **Note:** The CRL is rotated automatically before it expires.
     */
    crl_expiry?: string;
    /** Disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when downloading the CRL. If CRL building
     *  is enabled, it will rebuild the CRL.
     */
    crl_disable?: boolean;
    /** Determines whether to encode the certificate revocation list (CRL) distribution points in the certificates
     *  that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** Determines whether to encode the URL of the issuing certificate in the certificates that are issued by this
     *  certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The requested time-to-live (TTL) for certificates that are created by this CA. This field's value cannot be
     *  longer than the `max_ttl` limit.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     */
    ttl?: string;
    /** The format of the returned data. */
    format?: string;
    /** The format of the generated private key. */
    private_key_format?: string;
    /** The type of private key to generate. */
    key_type?: string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
  }

  /** The configuration of the private certificate template. */
  export interface PrivateCertificateConfigurationTemplate extends Configuration {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The name of the intermediate certificate authority. */
    certificate_authority: string;
    /** Scopes the creation of private certificates to only the secret groups that you specify.
     *
     *  This field can be supplied as a comma-delimited list of secret group IDs.
     */
    allowed_secret_groups?: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA in seconds. */
    max_ttl_seconds?: number;
    /** The requested Time To Live, after which the certificate will be expired. */
    ttl_seconds?: number;
    /** Determines whether to allow `localhost` to be included as one of the requested common names. */
    allow_localhost?: boolean;
    /** The domains to define for the certificate template. This property is used along with the
     *  `allow_bare_domains` and `allow_subdomains` options.
     */
    allowed_domains?: string[];
    /** Determines whether to allow the domains that are supplied in the `allowed_domains` field to contain access
     *  control list (ACL) templates.
     */
    allowed_domains_template?: boolean;
    /** Determines whether to allow clients to request private certificates that match the value of the actual
     *  domains on the final certificate.
     *
     *  For example, if you specify `example.com` in the `allowed_domains` field, you grant clients the ability to
     *  request a certificate that contains the name `example.com` as one of the DNS values on the final certificate.
     *
     *  **Important:** In some scenarios, allowing bare domains can be considered a security risk.
     */
    allow_bare_domains?: boolean;
    /** Determines whether to allow clients to request private certificates with common names (CN) that are
     *  subdomains of the CNs that are allowed by the other certificate template options. This includes wildcard
     *  subdomains.
     *
     *  For example, if `allowed_domains` has a value of `example.com` and `allow_subdomains`is set to `true`, then the
     *  following subdomains are allowed: `foo.example.com`, `bar.example.com`, `*.example.com`.
     *
     *  **Note:** This field is redundant if you use the `allow_any_name` option.
     */
    allow_subdomains?: boolean;
    /** Determines whether to allow glob patterns, for example, `ftp*.example.com`, in the names that are specified
     *  in the `allowed_domains` field.
     *
     *  If set to `true`, clients are allowed to request private certificates with names that match the glob patterns.
     */
    allow_glob_domains?: boolean;
    /** Determines whether to allow clients to request a private certificate that matches any common name. */
    allow_any_name?: boolean;
    /** Determines whether to enforce only valid host names for common names, DNS Subject Alternative Names, and the
     *  host section of email addresses.
     */
    enforce_hostnames?: boolean;
    /** Determines whether to allow clients to request a private certificate with IP Subject Alternative Names. */
    allow_ip_sans?: boolean;
    /** The URI Subject Alternative Names to allow for private certificates.
     *
     *  Values can contain glob patterns, for example `spiffe://hostname/_*`.
     */
    allowed_uri_sans?: string[];
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names (SANs) to allow for private
     *  certificates.
     *
     *  The format for each element in the list is the same as OpenSSL: `<oid>:<type>:<value>` where the current valid
     *  type is `UTF8`. To allow any value for an OID, use `*` as its value. Alternatively, specify a single `*` to
     *  allow any `other_sans` input.
     */
    allowed_other_sans?: string[];
    /** Determines whether private certificates are flagged for server use. */
    server_flag?: boolean;
    /** Determines whether private certificates are flagged for client use. */
    client_flag?: boolean;
    /** Determines whether private certificates are flagged for code signing use. */
    code_signing_flag?: boolean;
    /** Determines whether private certificates are flagged for email protection use. */
    email_protection_flag?: boolean;
    /** The type of private key to generate. */
    key_type?: string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The allowed key usage constraint to define for private certificates.
     *
     *  You can find valid values in the [Go x509 package documentation](https://pkg.go.dev/crypto/x509#KeyUsage). Omit
     *  the `KeyUsage` part of the value. Values are not case-sensitive. To specify no key usage constraints, set this
     *  field to an empty list.
     */
    key_usage?: string[];
    /** The allowed extended key usage constraint on private certificates.
     *
     *  You can find valid values in the [Go x509 package
     *  documentation](https://golang.org/pkg/crypto/x509/#ExtKeyUsage). Omit the `ExtKeyUsage` part of the value.
     *  Values are not case-sensitive. To specify no key usage constraints, set this field to an empty list.
     */
    ext_key_usage?: string[];
    /** A list of extended key usage Object Identifiers (OIDs). */
    ext_key_usage_oids?: string[];
    /** When used with the `private_cert_configuration_action_sign_csr` action, this field determines whether to use
     *  the common name (CN) from a certificate signing request (CSR) instead of the CN that's included in the data of
     *  the certificate.
     *
     *  Does not include any requested Subject Alternative Names (SANs) in the CSR. To use the alternative names,
     *  include the `use_csr_sans` property.
     */
    use_csr_common_name?: boolean;
    /** When used with the `private_cert_configuration_action_sign_csr` action, this field determines whether to use
     *  the Subject Alternative Names
     *  (SANs) from a certificate signing request (CSR) instead of the SANs that are included in the data of the
     *  certificate.
     *
     *  Does not include the common name in the CSR. To use the common name, include the `use_csr_common_name` property.
     */
    use_csr_sans?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** Determines whether to require a common name to create a private certificate.
     *
     *  By default, a common name is required to generate a certificate. To make the `common_name` field optional, set
     *  the `require_cn` option to `false`.
     */
    require_cn?: boolean;
    /** A list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string[];
    /** Determines whether to mark the Basic Constraints extension of an issued private certificate as valid for
     *  non-CA certificates.
     */
    basic_constraints_valid_for_non_ca?: boolean;
    /** The duration in seconds by which to backdate the `not_before` property of an issued private certificate. */
    not_before_duration_seconds?: number;
  }

  /** The metadata properties of the configuration of the private certificate template. */
  export interface PrivateCertificateConfigurationTemplateMetadata extends ConfigurationMetadata {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** Properties that describe a certificate template. You can use a certificate template to control the parameters that are applied to your issued private certificates. For more information, see the [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-certificate-templates). */
  export interface PrivateCertificateConfigurationTemplatePatch extends ConfigurationPatch {
    /** Scopes the creation of private certificates to only the secret groups that you specify.
     *
     *  This field can be supplied as a comma-delimited list of secret group IDs.
     */
    allowed_secret_groups?: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     *
     *  Minimum value is one hour (`1h`). Maximum value is 100 years (`876000h`).
     */
    max_ttl?: string;
    /** The requested time-to-live (TTL) for certificates that are created by this CA. This field's value cannot be
     *  longer than the `max_ttl` limit.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     */
    ttl?: string;
    /** Determines whether to allow `localhost` to be included as one of the requested common names. */
    allow_localhost?: boolean;
    /** The domains to define for the certificate template. This property is used along with the
     *  `allow_bare_domains` and `allow_subdomains` options.
     */
    allowed_domains?: string[];
    /** Determines whether to allow the domains that are supplied in the `allowed_domains` field to contain access
     *  control list (ACL) templates.
     */
    allowed_domains_template?: boolean;
    /** Determines whether to allow clients to request private certificates that match the value of the actual
     *  domains on the final certificate.
     *
     *  For example, if you specify `example.com` in the `allowed_domains` field, you grant clients the ability to
     *  request a certificate that contains the name `example.com` as one of the DNS values on the final certificate.
     *
     *  **Important:** In some scenarios, allowing bare domains can be considered a security risk.
     */
    allow_bare_domains?: boolean;
    /** Determines whether to allow clients to request private certificates with common names (CN) that are
     *  subdomains of the CNs that are allowed by the other certificate template options. This includes wildcard
     *  subdomains.
     *
     *  For example, if `allowed_domains` has a value of `example.com` and `allow_subdomains`is set to `true`, then the
     *  following subdomains are allowed: `foo.example.com`, `bar.example.com`, `*.example.com`.
     *
     *  **Note:** This field is redundant if you use the `allow_any_name` option.
     */
    allow_subdomains?: boolean;
    /** Determines whether to allow glob patterns, for example, `ftp*.example.com`, in the names that are specified
     *  in the `allowed_domains` field.
     *
     *  If set to `true`, clients are allowed to request private certificates with names that match the glob patterns.
     */
    allow_glob_domains?: boolean;
    /** Determines whether to allow clients to request a private certificate that matches any common name. */
    allow_any_name?: boolean;
    /** Determines whether to enforce only valid host names for common names, DNS Subject Alternative Names, and the
     *  host section of email addresses.
     */
    enforce_hostnames?: boolean;
    /** Determines whether to allow clients to request a private certificate with IP Subject Alternative Names. */
    allow_ip_sans?: boolean;
    /** The URI Subject Alternative Names to allow for private certificates.
     *
     *  Values can contain glob patterns, for example `spiffe://hostname/_*`.
     */
    allowed_uri_sans?: string[];
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names (SANs) to allow for private
     *  certificates.
     *
     *  The format for each element in the list is the same as OpenSSL: `<oid>:<type>:<value>` where the current valid
     *  type is `UTF8`. To allow any value for an OID, use `*` as its value. Alternatively, specify a single `*` to
     *  allow any `other_sans` input.
     */
    allowed_other_sans?: string[];
    /** Determines whether private certificates are flagged for server use. */
    server_flag?: boolean;
    /** Determines whether private certificates are flagged for client use. */
    client_flag?: boolean;
    /** Determines whether private certificates are flagged for code signing use. */
    code_signing_flag?: boolean;
    /** Determines whether private certificates are flagged for email protection use. */
    email_protection_flag?: boolean;
    /** The type of private key to generate. */
    key_type?: string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The allowed key usage constraint to define for private certificates.
     *
     *  You can find valid values in the [Go x509 package documentation](https://pkg.go.dev/crypto/x509#KeyUsage). Omit
     *  the `KeyUsage` part of the value. Values are not case-sensitive. To specify no key usage constraints, set this
     *  field to an empty list.
     */
    key_usage?: string[];
    /** The allowed extended key usage constraint on private certificates.
     *
     *  You can find valid values in the [Go x509 package
     *  documentation](https://golang.org/pkg/crypto/x509/#ExtKeyUsage). Omit the `ExtKeyUsage` part of the value.
     *  Values are not case-sensitive. To specify no key usage constraints, set this field to an empty list.
     */
    ext_key_usage?: string[];
    /** A list of extended key usage Object Identifiers (OIDs). */
    ext_key_usage_oids?: string[];
    /** When used with the `private_cert_configuration_action_sign_csr` action, this field determines whether to use
     *  the common name (CN) from a certificate signing request (CSR) instead of the CN that's included in the data of
     *  the certificate.
     *
     *  Does not include any requested Subject Alternative Names (SANs) in the CSR. To use the alternative names,
     *  include the `use_csr_sans` property.
     */
    use_csr_common_name?: boolean;
    /** When used with the `private_cert_configuration_action_sign_csr` action, this field determines whether to use
     *  the Subject Alternative Names
     *  (SANs) from a certificate signing request (CSR) instead of the SANs that are included in the data of the
     *  certificate.
     *
     *  Does not include the common name in the CSR. To use the common name, include the `use_csr_common_name` property.
     */
    use_csr_sans?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** Determines whether to require a common name to create a private certificate.
     *
     *  By default, a common name is required to generate a certificate. To make the `common_name` field optional, set
     *  the `require_cn` option to `false`.
     */
    require_cn?: boolean;
    /** A list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string[];
    /** Determines whether to mark the Basic Constraints extension of an issued private certificate as valid for
     *  non-CA certificates.
     */
    basic_constraints_valid_for_non_ca?: boolean;
    /** The duration in seconds by which to backdate the `not_before` property of an issued private certificate.
     *
     *  The value can be supplied as a string representation of a duration, such as `30s`. In the API response, this
     *  value is returned in seconds (integer).
     */
    not_before_duration?: string;
  }

  /** Properties that describe a certificate template. You can use a certificate template to control the parameters that are applied to your issued private certificates. For more information, see the [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-certificate-templates). */
  export interface PrivateCertificateConfigurationTemplatePrototype extends ConfigurationPrototype {
    /** Th configuration type. */
    config_type: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The name of the intermediate certificate authority. */
    certificate_authority: string;
    /** Scopes the creation of private certificates to only the secret groups that you specify.
     *
     *  This field can be supplied as a comma-delimited list of secret group IDs.
     */
    allowed_secret_groups?: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     *
     *  Minimum value is one hour (`1h`). Maximum value is 100 years (`876000h`).
     */
    max_ttl?: string;
    /** The requested time-to-live (TTL) for certificates that are created by this CA. This field's value cannot be
     *  longer than the `max_ttl` limit.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     */
    ttl?: string;
    /** Determines whether to allow `localhost` to be included as one of the requested common names. */
    allow_localhost?: boolean;
    /** The domains to define for the certificate template. This property is used along with the
     *  `allow_bare_domains` and `allow_subdomains` options.
     */
    allowed_domains?: string[];
    /** Determines whether to allow the domains that are supplied in the `allowed_domains` field to contain access
     *  control list (ACL) templates.
     */
    allowed_domains_template?: boolean;
    /** Determines whether to allow clients to request private certificates that match the value of the actual
     *  domains on the final certificate.
     *
     *  For example, if you specify `example.com` in the `allowed_domains` field, you grant clients the ability to
     *  request a certificate that contains the name `example.com` as one of the DNS values on the final certificate.
     *
     *  **Important:** In some scenarios, allowing bare domains can be considered a security risk.
     */
    allow_bare_domains?: boolean;
    /** Determines whether to allow clients to request private certificates with common names (CN) that are
     *  subdomains of the CNs that are allowed by the other certificate template options. This includes wildcard
     *  subdomains.
     *
     *  For example, if `allowed_domains` has a value of `example.com` and `allow_subdomains`is set to `true`, then the
     *  following subdomains are allowed: `foo.example.com`, `bar.example.com`, `*.example.com`.
     *
     *  **Note:** This field is redundant if you use the `allow_any_name` option.
     */
    allow_subdomains?: boolean;
    /** Determines whether to allow glob patterns, for example, `ftp*.example.com`, in the names that are specified
     *  in the `allowed_domains` field.
     *
     *  If set to `true`, clients are allowed to request private certificates with names that match the glob patterns.
     */
    allow_glob_domains?: boolean;
    /** Determines whether the issuance of certificates with RFC 6125 wildcards in the CN field.
     *
     *  When set to false, this field prevents wildcards from being issued even if they can be allowed by an option
     *  `allow_glob_domains`.
     */
    allow_wildcard_certificates?: boolean;
    /** Determines whether to allow clients to request a private certificate that matches any common name. */
    allow_any_name?: boolean;
    /** Determines whether to enforce only valid host names for common names, DNS Subject Alternative Names, and the
     *  host section of email addresses.
     */
    enforce_hostnames?: boolean;
    /** Determines whether to allow clients to request a private certificate with IP Subject Alternative Names. */
    allow_ip_sans?: boolean;
    /** The URI Subject Alternative Names to allow for private certificates.
     *
     *  Values can contain glob patterns, for example `spiffe://hostname/_*`.
     */
    allowed_uri_sans?: string[];
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names (SANs) to allow for private
     *  certificates.
     *
     *  The format for each element in the list is the same as OpenSSL: `<oid>:<type>:<value>` where the current valid
     *  type is `UTF8`. To allow any value for an OID, use `*` as its value. Alternatively, specify a single `*` to
     *  allow any `other_sans` input.
     */
    allowed_other_sans?: string[];
    /** Determines whether private certificates are flagged for server use. */
    server_flag?: boolean;
    /** Determines whether private certificates are flagged for client use. */
    client_flag?: boolean;
    /** Determines whether private certificates are flagged for code signing use. */
    code_signing_flag?: boolean;
    /** Determines whether private certificates are flagged for email protection use. */
    email_protection_flag?: boolean;
    /** The type of private key to generate. */
    key_type?: string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The allowed key usage constraint to define for private certificates.
     *
     *  You can find valid values in the [Go x509 package documentation](https://pkg.go.dev/crypto/x509#KeyUsage). Omit
     *  the `KeyUsage` part of the value. Values are not case-sensitive. To specify no key usage constraints, set this
     *  field to an empty list.
     */
    key_usage?: string[];
    /** The allowed extended key usage constraint on private certificates.
     *
     *  You can find valid values in the [Go x509 package
     *  documentation](https://golang.org/pkg/crypto/x509/#ExtKeyUsage). Omit the `ExtKeyUsage` part of the value.
     *  Values are not case-sensitive. To specify no key usage constraints, set this field to an empty list.
     */
    ext_key_usage?: string[];
    /** A list of extended key usage Object Identifiers (OIDs). */
    ext_key_usage_oids?: string[];
    /** When used with the `private_cert_configuration_action_sign_csr` action, this field determines whether to use
     *  the common name (CN) from a certificate signing request (CSR) instead of the CN that's included in the data of
     *  the certificate.
     *
     *  Does not include any requested Subject Alternative Names (SANs) in the CSR. To use the alternative names,
     *  include the `use_csr_sans` property.
     */
    use_csr_common_name?: boolean;
    /** When used with the `private_cert_configuration_action_sign_csr` action, this field determines whether to use
     *  the Subject Alternative Names
     *  (SANs) from a certificate signing request (CSR) instead of the SANs that are included in the data of the
     *  certificate.
     *
     *  Does not include the common name in the CSR. To use the common name, include the `use_csr_common_name` property.
     */
    use_csr_sans?: boolean;
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou?: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization?: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country?: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality?: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province?: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address?: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code?: string[];
    /** The serial number to assign to the generated certificate. To assign a random serial number, you can omit
     *  this field.
     */
    serial_number?: string;
    /** Determines whether to require a common name to create a private certificate.
     *
     *  By default, a common name is required to generate a certificate. To make the `common_name` field optional, set
     *  the `require_cn` option to `false`.
     */
    require_cn?: boolean;
    /** A list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string[];
    /** Determines whether to mark the Basic Constraints extension of an issued private certificate as valid for
     *  non-CA certificates.
     */
    basic_constraints_valid_for_non_ca?: boolean;
    /** The duration in seconds by which to backdate the `not_before` property of an issued private certificate.
     *
     *  The value can be supplied as a string representation of a duration, such as `30s`. In the API response, this
     *  value is returned in seconds (integer).
     */
    not_before_duration?: string;
  }

  /** Properties of the metadata of your private certificate. */
  export interface PrivateCertificateMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The intermediate certificate authority that signed this certificate. */
    certificate_authority?: string;
    /** The name of the certificate template. */
    certificate_template: string;
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer: string;
    /** The identifier for the cryptographic algorithm used to generate the public key that is associated with the
     *  certificate.
     */
    key_algorithm?: string;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that have an existing rotation policy.
     */
    next_rotation_date?: string;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
    /** The date and time that the certificate was revoked. The date format follows RFC 3339. */
    revocation_time_rfc3339?: string;
  }

  /** PrivateCertificateMetadataPatch. */
  export interface PrivateCertificateMetadataPatch extends SecretMetadataPatch {
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
  }

  /** PrivateCertificatePrototype. */
  export interface PrivateCertificatePrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The name of the certificate template. */
    certificate_template: string;
    /** The Common Name (AKA CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The IP Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the CA certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the CA
     *  certificate.
     *
     *  The alternative names must match the values that are specified in the `allowed_other_sans` field in the
     *  associated certificate template. The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current
     *  valid type is `UTF8`.
     */
    other_sans?: string[];
    /** The certificate signing request. */
    csr?: string;
    /** The format of the returned data. */
    format?: string;
    /** The format of the generated private key. */
    private_key_format?: string;
    /** Controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name set to `true`, it is not included in DNS or Email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The time-to-live (TTL) to assign to a private certificate.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '12h'. The value can't
     *  exceed the `max_ttl` that is defined in the associated certificate template.
     */
    ttl?: string;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your private certificate version. */
  export interface PrivateCertificateVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key: string;
    /** The PEM-encoded certificate of the certificate authority that signed and issued this certificate. */
    issuing_ca?: string;
    /** The chain of certificate authorities that are associated with the certificate. */
    ca_chain?: string[];
  }

  /** The response body to specify the properties of the action to revoke the private certificate. */
  export interface PrivateCertificateVersionActionRevoke extends VersionAction {
    /** The type of secret version action. */
    action_type: string;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
  }

  /** The request body to specify the properties of the action to revoke the private certificate. */
  export interface PrivateCertificateVersionActionRevokePrototype extends SecretVersionActionPrototype {
    /** The type of secret version action. */
    action_type: string;
  }

  /** Properties of the version metadata of your private certificate. */
  export interface PrivateCertificateVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
  }

  /** PrivateCertificateVersionPrototype. */
  export interface PrivateCertificateVersionPrototype extends SecretVersionPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** The certificate signing request. */
    csr?: string;
  }

  /** Your public certificate. */
  export interface PublicCertificate extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm?: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (AKA CN) represents the server name protected by the SSL certificate. */
    common_name: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** Issuance information that is associated with your certificate. */
    issuance_info?: CertificateIssuanceInfo;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The identifier for the cryptographic algorithm to be used to generate the public key that is associated with
     *  the certificate.
     *
     *  The algorithm that you select determines the encryption algorithm (`RSA` or `ECDSA`) and key size to be used to
     *  generate keys and sign certificates. For longer living certificates, it is recommended to use longer keys to
     *  provide more encryption protection. Allowed values:  RSA2048, RSA4096, EC256, EC384.
     */
    key_algorithm: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation: RotationPolicy;
    /** Indicates whether the issued certificate is bundled with intermediate certificates. */
    bundle_certs?: boolean;
    /** The name that is assigned to the certificate authority configuration. */
    ca?: string;
    /** The name that is assigned to the DNS provider configuration. */
    dns?: string;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate?: string;
    /** The PEM-encoded intermediate certificate that is associated with the root certificate. The data must be
     *  formatted on a single line with embedded newline characters.
     */
    intermediate?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
  }

  /** The response body of the action to validate manual DNS challenges for the public certificate. */
  export interface PublicCertificateActionValidateManualDNS extends SecretAction {
    /** The type of secret action. */
    action_type: string;
  }

  /** The request body to specify the properties of the action to validate manual DNS challenges for the public certificate. */
  export interface PublicCertificateActionValidateManualDNSPrototype extends SecretActionPrototype {
    /** The type of secret action. */
    action_type: string;
  }

  /** Properties that describe a Let's Encrypt CA configuration. */
  export interface PublicCertificateConfigurationCALetsEncrypt extends Configuration {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The configuration of the Let's Encrypt CA environment. */
    lets_encrypt_environment: string;
    /** The PEM-encoded private key of your Let's Encrypt account. The data must be formatted on a single line with
     *  embedded newline characters.
     */
    lets_encrypt_private_key: string;
    /** If the CA offers multiple certificate chains, prefer the chain with an issuer matching this Subject Common
     *  Name. If no match, the default offered chain will be used.
     */
    lets_encrypt_preferred_chain?: string;
  }

  /** Your Let's Encrypt CA metadata properties. */
  export interface PublicCertificateConfigurationCALetsEncryptMetadata extends ConfigurationMetadata {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** The configuration update of the Let's Encrypt Certificate Authority. */
  export interface PublicCertificateConfigurationCALetsEncryptPatch extends ConfigurationPatch {
    /** The configuration of the Let's Encrypt CA environment. */
    lets_encrypt_environment: string;
    /** The PEM-encoded private key of your Let's Encrypt account. The data must be formatted on a single line with
     *  embedded newline characters.
     */
    lets_encrypt_private_key?: string;
    /** If the CA offers multiple certificate chains, prefer the chain with an issuer matching this Subject Common
     *  Name. If no match, the default offered chain will be used.
     */
    lets_encrypt_preferred_chain?: string;
  }

  /** The properties of the Let's Encrypt CA configuration. */
  export interface PublicCertificateConfigurationCALetsEncryptPrototype extends ConfigurationPrototype {
    /** Th configuration type. */
    config_type: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The configuration of the Let's Encrypt CA environment. */
    lets_encrypt_environment: string;
    /** The PEM-encoded private key of your Let's Encrypt account. The data must be formatted on a single line with
     *  embedded newline characters.
     */
    lets_encrypt_private_key: string;
    /** If the CA offers multiple certificate chains, prefer the chain with an issuer matching this Subject Common
     *  Name. If no match, the default offered chain will be used.
     */
    lets_encrypt_preferred_chain?: string;
  }

  /** Properties that describe a Classic Infrastructure DNS configuration. */
  export interface PublicCertificateConfigurationDNSClassicInfrastructure extends Configuration {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
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

  /** Your Classic Infrastructure DNS metadata properties. */
  export interface PublicCertificateConfigurationDNSClassicInfrastructureMetadata extends ConfigurationMetadata {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** Properties that describe the configuration update of an IBM Cloud classic infrastructure (SoftLayer). */
  export interface PublicCertificateConfigurationDNSClassicInfrastructurePatch extends ConfigurationPatch {
    /** The username that is associated with your classic infrastructure account.
     *
     *  In most cases, your classic infrastructure username is your `<account_id>_<email_address>`. For more
     *  information, see the [docs](https://cloud.ibm.com/docs/account?topic=account-classic_keys).
     */
    classic_infrastructure_username?: string;
    /** Your classic infrastructure API key.
     *
     *  For information about viewing and accessing your classic infrastructure API key, see the
     *  [docs](https://cloud.ibm.com/docs/account?topic=account-classic_keys).
     */
    classic_infrastructure_password?: string;
  }

  /** PublicCertificateConfigurationDNSClassicInfrastructurePrototype. */
  export interface PublicCertificateConfigurationDNSClassicInfrastructurePrototype extends ConfigurationPrototype {
    /** Th configuration type. */
    config_type: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
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

  /** Properties that describe a Cloud Internet Services DNS configuration. */
  export interface PublicCertificateConfigurationDNSCloudInternetServices extends Configuration {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** An IBM Cloud API key that can to list domains in your Cloud Internet Services instance.
     *
     *  To grant Secrets Manager the ability to view the Cloud Internet Services instance and all of its domains, the
     *  API key must be assigned the Reader service role on Internet Services (`internet-svcs`).
     *
     *  If you need to manage specific domains, you can assign the Manager role. For production environments, it is
     *  recommended that you assign the Reader access role, and then use the
     *  [IAM Policy Management API](https://cloud.ibm.com/apidocs/iam-policy-management#create-policy) to control
     *  specific domains. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#authorize-specific-domains).
     */
    cloud_internet_services_apikey?: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    cloud_internet_services_crn: string;
  }

  /** Your Cloud Internet Services DNS metadata properties. */
  export interface PublicCertificateConfigurationDNSCloudInternetServicesMetadata extends ConfigurationMetadata {
    /** Th configuration type. */
    config_type: string;
    /** The unique name of your configuration. */
    name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
  }

  /** The configuration update of the Cloud Internet Services DNS. */
  export interface PublicCertificateConfigurationDNSCloudInternetServicesPatch extends ConfigurationPatch {
    /** An IBM Cloud API key that can to list domains in your Cloud Internet Services instance.
     *
     *  To grant Secrets Manager the ability to view the Cloud Internet Services instance and all of its domains, the
     *  API key must be assigned the Reader service role on Internet Services (`internet-svcs`).
     *
     *  If you need to manage specific domains, you can assign the Manager role. For production environments, it is
     *  recommended that you assign the Reader access role, and then use the
     *  [IAM Policy Management API](https://cloud.ibm.com/apidocs/iam-policy-management#create-policy) to control
     *  specific domains. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#authorize-specific-domains).
     */
    cloud_internet_services_apikey: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    cloud_internet_services_crn?: string;
  }

  /** Specify the properties for Cloud Internet Services DNS configuration. */
  export interface PublicCertificateConfigurationDNSCloudInternetServicesPrototype extends ConfigurationPrototype {
    /** Th configuration type. */
    config_type: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** An IBM Cloud API key that can to list domains in your Cloud Internet Services instance.
     *
     *  To grant Secrets Manager the ability to view the Cloud Internet Services instance and all of its domains, the
     *  API key must be assigned the Reader service role on Internet Services (`internet-svcs`).
     *
     *  If you need to manage specific domains, you can assign the Manager role. For production environments, it is
     *  recommended that you assign the Reader access role, and then use the
     *  [IAM Policy Management API](https://cloud.ibm.com/apidocs/iam-policy-management#create-policy) to control
     *  specific domains. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#authorize-specific-domains).
     */
    cloud_internet_services_apikey?: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    cloud_internet_services_crn: string;
  }

  /** Properties of the metadata of your public certificate. */
  export interface PublicCertificateMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** The identifier for the cryptographic algorithm that was used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm?: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (AKA CN) represents the server name protected by the SSL certificate. */
    common_name: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** Issuance information that is associated with your certificate. */
    issuance_info?: CertificateIssuanceInfo;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The identifier for the cryptographic algorithm to be used to generate the public key that is associated with
     *  the certificate.
     *
     *  The algorithm that you select determines the encryption algorithm (`RSA` or `ECDSA`) and key size to be used to
     *  generate keys and sign certificates. For longer living certificates, it is recommended to use longer keys to
     *  provide more encryption protection. Allowed values:  RSA2048, RSA4096, EC256, EC384.
     */
    key_algorithm: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation: RotationPolicy;
    /** Indicates whether the issued certificate is bundled with intermediate certificates. */
    bundle_certs?: boolean;
    /** The name that is assigned to the certificate authority configuration. */
    ca?: string;
    /** The name that is assigned to the DNS provider configuration. */
    dns?: string;
  }

  /** PublicCertificateMetadataPatch. */
  export interface PublicCertificateMetadataPatch extends SecretMetadataPatch {
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
  }

  /** PublicCertificatePrototype. */
  export interface PublicCertificatePrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The Common Name (AKA CN) represents the server name protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional host names to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The identifier for the cryptographic algorithm to be used to generate the public key that is associated with
     *  the certificate.
     *
     *  The algorithm that you select determines the encryption algorithm (`RSA` or `ECDSA`) and key size to be used to
     *  generate keys and sign certificates. For longer living certificates, it is recommended to use longer keys to
     *  provide more encryption protection. Allowed values:  RSA2048, RSA4096, EC256, EC384.
     */
    key_algorithm?: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    ca: string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    dns: string;
    /** Determines whether your issued certificate is bundled with intermediate certificates. Set to `false` for the
     *  certificate file to contain only the issued certificate.
     */
    bundle_certs?: boolean;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Determines whether Secrets Manager rotates your secrets automatically. For public certificates, if `auto_rotate` is set to `true`, the service reorders your certificate for 31 days, before it expires. */
  export interface PublicCertificateRotationPolicy extends RotationPolicy {
    /** Determines whether Secrets Manager rotates your secret automatically.
     *
     *  Default is `false`. If `auto_rotate` is set to `true` the service rotates your secret based on the defined
     *  interval.
     */
    auto_rotate: boolean;
    /** The length of the secret rotation time interval. */
    interval?: number;
    /** The units for the secret rotation time interval. */
    unit?: string;
    /** Determines whether Secrets Manager rotates the private key for your public certificate automatically.
     *
     *  Default is `false`. If it is set to `true`, the service generates and stores a new private key for your rotated
     *  certificate.
     */
    rotate_keys?: boolean;
  }

  /** Versions of your public certificate. */
  export interface PublicCertificateVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate?: string;
    /** The PEM-encoded intermediate certificate that is associated with the root certificate. The data must be
     *  formatted on a single line with embedded newline characters.
     */
    intermediate?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
  }

  /** Properties of the version metadata of your public certificate. */
  export interface PublicCertificateVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
  }

  /** PublicCertificateVersionPrototype. */
  export interface PublicCertificateVersionPrototype extends SecretVersionPrototype {
    /** Defines the rotation object that is used to manually rotate public certificates. */
    rotation: PublicCertificateRotationObject;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /** Your user credentials secret. */
  export interface UsernamePasswordSecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation: RotationPolicy;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that have an existing rotation policy.
     */
    next_rotation_date?: string;
    /** The username that is assigned to the secret. */
    username: string;
    /** The password that is assigned to the secret. */
    password: string;
  }

  /** Properties of the metadata of your user credentials secret. */
  export interface UsernamePasswordSecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    crn: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** The secret state that is based on NIST SP 800-57. States are integers and correspond to the `Pre-activation
     *  = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: string;
    /** The date when a resource was recently modified. The date format follows RFC 3339. */
    updated_at: string;
    /** The number of versions of the secret. */
    versions_total: number;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation: RotationPolicy;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that have an existing rotation policy.
     */
    next_rotation_date?: string;
  }

  /** UsernamePasswordSecretMetadataPatch. */
  export interface UsernamePasswordSecretMetadataPatch extends SecretMetadataPatch {
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
  }

  /** UsernamePasswordSecretPrototype. */
  export interface UsernamePasswordSecretPrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search for secrets in your instance.
     *
     *  Up to 30 labels can be created.
     */
    labels?: string[];
    /** The username that is assigned to the secret. */
    username: string;
    /** The password that is assigned to the secret. */
    password: string;
    /** The date a secret is expired. The date format follows RFC 3339. */
    expiration_date?: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** Determines whether Secrets Manager rotates your secrets automatically. */
    rotation?: RotationPolicy;
  }

  /** Your user credentials secret version. */
  export interface UsernamePasswordSecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
    /** The username that is assigned to the secret. */
    username: string;
    /** The password that is assigned to the secret. */
    password: string;
  }

  /** Properties of the version metadata of your user credentials secret. */
  export interface UsernamePasswordSecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was created. The date format follows RFC 3339. */
    created_at: string;
    /** Indicates whether the secret data that is associated with a secret version was retrieved in a call to the
     *  service API.
     */
    downloaded?: boolean;
    /** A v4 UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, certificates (imported, public, and private), IAM
     *  credentials, key-value, and user credentials.
     */
    secret_type: string;
    /** A v4 UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A v4 UUID identifier. */
    secret_id: string;
  }

  /** UsernamePasswordSecretVersionPrototype. */
  export interface UsernamePasswordSecretVersionPrototype extends SecretVersionPrototype {
    /** The password that is assigned to the secret. */
    password: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * SecretsPager can be used to simplify the use of listSecrets().
   */
  export class SecretsPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: SecretsManagerV2;

    protected params: SecretsManagerV2.ListSecretsParams;

    /**
     * Construct a SecretsPager object.
     *
     * @param {SecretsManagerV2}  client - The service client instance used to invoke listSecrets()
     * @param {Object} [params] - The parameters to be passed to listSecrets()
     * @constructor
     * @returns {SecretsPager}
     */
    constructor(
      client: SecretsManagerV2,
      params?: SecretsManagerV2.ListSecretsParams
    ) {
      if (params && params.offset) {
        throw new Error(`the params.offset field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listSecrets().
     * @returns {Promise<SecretsManagerV2.SecretMetadata[]>}
     */
    public async getNext(): Promise<SecretsManagerV2.SecretMetadata[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listSecrets(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'offset');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.secrets;
    }

    /**
     * Returns all results by invoking listSecrets() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecretsManagerV2.SecretMetadata[]>}
     */
    public async getAll(): Promise<SecretsManagerV2.SecretMetadata[]> {
      const results: SecretMetadata[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * SecretsLocksPager can be used to simplify the use of listSecretsLocks().
   */
  export class SecretsLocksPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: SecretsManagerV2;

    protected params: SecretsManagerV2.ListSecretsLocksParams;

    /**
     * Construct a SecretsLocksPager object.
     *
     * @param {SecretsManagerV2}  client - The service client instance used to invoke listSecretsLocks()
     * @param {Object} [params] - The parameters to be passed to listSecretsLocks()
     * @constructor
     * @returns {SecretsLocksPager}
     */
    constructor(
      client: SecretsManagerV2,
      params?: SecretsManagerV2.ListSecretsLocksParams
    ) {
      if (params && params.offset) {
        throw new Error(`the params.offset field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listSecretsLocks().
     * @returns {Promise<SecretsManagerV2.SecretLocks[]>}
     */
    public async getNext(): Promise<SecretsManagerV2.SecretLocks[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listSecretsLocks(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'offset');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.secrets_locks;
    }

    /**
     * Returns all results by invoking listSecretsLocks() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecretsManagerV2.SecretLocks[]>}
     */
    public async getAll(): Promise<SecretsManagerV2.SecretLocks[]> {
      const results: SecretLocks[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * SecretLocksPager can be used to simplify the use of listSecretLocks().
   */
  export class SecretLocksPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: SecretsManagerV2;

    protected params: SecretsManagerV2.ListSecretLocksParams;

    /**
     * Construct a SecretLocksPager object.
     *
     * @param {SecretsManagerV2}  client - The service client instance used to invoke listSecretLocks()
     * @param {Object} params - The parameters to be passed to listSecretLocks()
     * @constructor
     * @returns {SecretLocksPager}
     */
    constructor(
      client: SecretsManagerV2,
      params: SecretsManagerV2.ListSecretLocksParams
    ) {
      if (params && params.offset) {
        throw new Error(`the params.offset field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listSecretLocks().
     * @returns {Promise<SecretsManagerV2.SecretLock[]>}
     */
    public async getNext(): Promise<SecretsManagerV2.SecretLock[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listSecretLocks(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'offset');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.locks;
    }

    /**
     * Returns all results by invoking listSecretLocks() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecretsManagerV2.SecretLock[]>}
     */
    public async getAll(): Promise<SecretsManagerV2.SecretLock[]> {
      const results: SecretLock[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * SecretVersionLocksPager can be used to simplify the use of listSecretVersionLocks().
   */
  export class SecretVersionLocksPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: SecretsManagerV2;

    protected params: SecretsManagerV2.ListSecretVersionLocksParams;

    /**
     * Construct a SecretVersionLocksPager object.
     *
     * @param {SecretsManagerV2}  client - The service client instance used to invoke listSecretVersionLocks()
     * @param {Object} params - The parameters to be passed to listSecretVersionLocks()
     * @constructor
     * @returns {SecretVersionLocksPager}
     */
    constructor(
      client: SecretsManagerV2,
      params: SecretsManagerV2.ListSecretVersionLocksParams
    ) {
      if (params && params.offset) {
        throw new Error(`the params.offset field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listSecretVersionLocks().
     * @returns {Promise<SecretsManagerV2.SecretLock[]>}
     */
    public async getNext(): Promise<SecretsManagerV2.SecretLock[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listSecretVersionLocks(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'offset');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.locks;
    }

    /**
     * Returns all results by invoking listSecretVersionLocks() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecretsManagerV2.SecretLock[]>}
     */
    public async getAll(): Promise<SecretsManagerV2.SecretLock[]> {
      const results: SecretLock[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ConfigurationsPager can be used to simplify the use of listConfigurations().
   */
  export class ConfigurationsPager {
    protected _hasNext: boolean;
    protected pageContext: any;

    protected client: SecretsManagerV2;

    protected params: SecretsManagerV2.ListConfigurationsParams;

    /**
     * Construct a ConfigurationsPager object.
     *
     * @param {SecretsManagerV2}  client - The service client instance used to invoke listConfigurations()
     * @param {Object} [params] - The parameters to be passed to listConfigurations()
     * @constructor
     * @returns {ConfigurationsPager}
     */
    constructor(
      client: SecretsManagerV2,
      params?: SecretsManagerV2.ListConfigurationsParams
    ) {
      if (params && params.offset) {
        throw new Error(`the params.offset field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listConfigurations().
     * @returns {Promise<SecretsManagerV2.ConfigurationMetadata[]>}
     */
    public async getNext(): Promise<SecretsManagerV2.ConfigurationMetadata[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listConfigurations(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next) {
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'offset');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.configurations;
    }

    /**
     * Returns all results by invoking listConfigurations() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<SecretsManagerV2.ConfigurationMetadata[]>}
     */
    public async getAll(): Promise<SecretsManagerV2.ConfigurationMetadata[]> {
      const results: ConfigurationMetadata[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = SecretsManagerV2;
