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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.98.0-8be2046a-20241205-162752
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  constructServiceUrl,
  getAuthenticatorFromEnvironment,
  getQueryParam,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * With IBM Cloud® Secrets Manager, you can create, lease, and centrally manage secrets that are used in IBM Cloud
 * services or your custom-built applications.
 *
 * API Version: 2.0.0
 * See: https://cloud.ibm.com/docs/secrets-manager
 */

class SecretsManagerV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://provide-here-your-smgr-instanceuuid.us-south.secrets-manager.appdomain.cloud';

  static DEFAULT_SERVICE_NAME: string = 'secrets_manager';

  static PARAMETERIZED_SERVICE_URL: string = 'https://{instance_id}.{region}.secrets-manager.appdomain.cloud';

  private static defaultUrlVariables = new Map([
    ['instance_id', 'provide-here-your-smgr-instanceuuid'],
    ['region', 'us-south'],
  ]);

  /**
   * Constructs a service URL by formatting the parameterized service URL.
   *
   * The parameterized service URL is:
   * 'https://{instance_id}.{region}.secrets-manager.appdomain.cloud'
   *
   * The default variable values are:
   * - 'instance_id': 'provide-here-your-smgr-instanceuuid'
   * - 'region': 'us-south'
   *
   * @param {Map<string, string>} | null providedUrlVariables Map from variable names to desired values.
   *  If a variable is not provided in this map,
   *  the default variable value will be used instead.
   * @returns {string} The formatted URL with all variable placeholders replaced by values.
   */
  static constructServiceUrl(providedUrlVariables: Map<string, string> | null): string {
    return constructServiceUrl(
      SecretsManagerV2.PARAMETERIZED_SERVICE_URL, 
      SecretsManagerV2.defaultUrlVariables, 
      providedUrlVariables
    );
  }

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of SecretsManagerV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
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
   * @param {string} [options.serviceUrl] - The base URL for the service
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecretGroup');

    const parameters = {
      options: {
        url: '/api/v2/secret_groups',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'listSecretGroups');

    const parameters = {
      options: {
        url: '/api/v2/secret_groups',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret group.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecretGroup');

    const parameters = {
      options: {
        url: '/api/v2/secret_groups/{id}',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret group.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'updateSecretGroup');

    const parameters = {
      options: {
        url: '/api/v2/secret_groups/{id}',
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
   * you must first delete the secrets that are associated with the group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The UUID that uniquely identifies your secret group.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSecretGroup');

    const parameters = {
      options: {
        url: '/api/v2/secret_groups/{id}',
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
    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecret');

    const parameters = {
      options: {
        url: '/api/v2/secrets',
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
   * @param {string[]} [params.secretTypes] - Filter secrets by types.
   *
   * You can apply multiple filters by using a comma-separated list of secret types.
   *
   * **Usage:** To retrieve a list of imported certificates and public certificates use
   * `..?secret_types=imported_cert,public_cert`.
   * @param {string[]} [params.matchAllLabels] - Filter secrets by labels.
   *
   * You can use a comma-separated list of labels to filter secrets that include all of the labels in the list.
   *
   * **Usage:** To retrieve a list of secrets that include both the label "dev" and the label "us-south" in their list
   * of labels, use `..?labels=dev,us-south`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadataPaginatedCollection>>}
   */
  public listSecrets(
    params?: SecretsManagerV2.ListSecretsParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.SecretMetadataPaginatedCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['offset', 'limit', 'sort', 'search', 'groups', 'secretTypes', 'matchAllLabels', 'headers'];
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
      'secret_types': _params.secretTypes,
      'match_all_labels': _params.matchAllLabels,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'listSecrets');

    const parameters = {
      options: {
        url: '/api/v2/secrets',
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
   * view only the details of a specified secret without retrieving its value, use the Get secret metadata operation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecret');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSecret');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecretMetadata');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}/metadata',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'updateSecretMetadata');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}/metadata',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecretAction');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}/actions',
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
   * Get a secret by name.
   *
   * Get a secret and its details by specifying the Name and Type of the secret.
   *
   * A successful request returns the secret data that is associated with your secret, along with other metadata. To
   * view only the details of a specified secret without retrieving its value, use the Get secret metadata operation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretType - The secret type. Supported types are arbitrary, imported_cert, public_cert,
   * private_cert, iam_credentials, service_credentials, kv, and username_password.
   * @param {string} params.name - A human-readable name to assign to your secret. To protect your privacy, do not use
   * personal data, such as your name or location, as a name for your secret.
   * @param {string} params.secretGroupName - The name of your secret group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.Secret>>}
   */
  public getSecretByNameType(
    params: SecretsManagerV2.GetSecretByNameTypeParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.Secret>> {
    const _params = { ...params };
    const _requiredParams = ['secretType', 'name', 'secretGroupName'];
    const _validParams = ['secretType', 'name', 'secretGroupName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'secret_type': _params.secretType,
      'name': _params.name,
      'secret_group_name': _params.secretGroupName,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecretByNameType');

    const parameters = {
      options: {
        url: '/api/v2/secret_groups/{secret_group_name}/secret_types/{secret_type}/secrets/{name}',
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
   * secretVersions
   ************************/

  /**
   * Create a new secret version.
   *
   * Create a new secret version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecretVersion');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions',
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
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'listSecretVersions');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions',
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
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecretVersion');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}',
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
   * This operation is available for secret type: iam_credentials current version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSecretVersionData');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}/secret_data',
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
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getSecretVersionMetadata');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}/metadata',
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
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'updateSecretVersionMetadata');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}/metadata',
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
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecretVersionAction');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}/actions',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'listSecretsLocks');

    const parameters = {
      options: {
        url: '/api/v2/secrets_locks',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'listSecretLocks');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}/locks',
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
   * - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of the
   * secret.\n
   * - `remove_previous_and_delete`: Carries out the same function as `remove_previous`, but also permanently deletes
   * the data of the previous secret version if it doesn't have any locks.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The UUID that uniquely identifies your secret.
   * @param {SecretLockPrototype[]} params.locks - The locks data to be attached to a secret version.
   * @param {string} [params.mode] - An optional lock mode. When you create a lock, you can set one of the following
   * modes to clear any matching locks on a secret version.
   * - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of the
   * secret. - `remove_previous_and_delete`: Completes the same action as `remove_previous`, but also permanently
   * deletes the data of the previous secret version if it doesn't have any locks.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecretLocksBulk');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}/locks_bulk',
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
   * @param {string} params.id - The UUID that uniquely identifies your secret.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSecretLocksBulk');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{id}/locks_bulk',
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
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'listSecretVersionLocks');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}/locks',
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
   * - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of the
   * secret.
   * - `remove_previous_and_delete`: Carries out the same function as `remove_previous`, but also permanently deletes
   * the data of the previous secret version if it doesn't have any locks.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
   * `previous` aliases to refer to the current or previous secret version.
   * @param {SecretLockPrototype[]} params.locks - The locks data to be attached to a secret version.
   * @param {string} [params.mode] - An optional lock mode. When you create a lock, you can set one of the following
   * modes to clear any matching locks on a secret version.
   * - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of the
   * secret. - `remove_previous_and_delete`: Completes the same action as `remove_previous`, but also permanently
   * deletes the data of the previous secret version if it doesn't have any locks.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createSecretVersionLocksBulk');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}/locks_bulk',
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
   * @param {string} params.secretId - The UUID that uniquely identifies your secret.
   * @param {string} params.id - The UUID that uniquely identifies your secret version. You can use the `current` or
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteSecretVersionLocksBulk');

    const parameters = {
      options: {
        url: '/api/v2/secrets/{secret_id}/versions/{id}/locks_bulk',
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
    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createConfiguration');

    const parameters = {
      options: {
        url: '/api/v2/configurations',
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
   * `../configurations?search=text`.
   * @param {string[]} [params.secretTypes] - Filter configurations by secret types, iam_credentials, public_cert or
   * private_cert.
   *
   * You can apply multiple filters by using a comma-separated list of secret types.
   *
   * **Usage:** To retrieve a list of configurations that are associated with all secret types, use
   * `..?secret_types=iam_credentials,public_cert,private_cert`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SecretsManagerV2.Response<SecretsManagerV2.ConfigurationMetadataPaginatedCollection>>}
   */
  public listConfigurations(
    params?: SecretsManagerV2.ListConfigurationsParams
  ): Promise<SecretsManagerV2.Response<SecretsManagerV2.ConfigurationMetadataPaginatedCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['offset', 'limit', 'sort', 'search', 'secretTypes', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'offset': _params.offset,
      'limit': _params.limit,
      'sort': _params.sort,
      'search': _params.search,
      'secret_types': _params.secretTypes,
    };

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'listConfigurations');

    const parameters = {
      options: {
        url: '/api/v2/configurations',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getConfiguration');

    const parameters = {
      options: {
        url: '/api/v2/configurations/{name}',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'updateConfiguration');

    const parameters = {
      options: {
        url: '/api/v2/configurations/{name}',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteConfiguration');

    const parameters = {
      options: {
        url: '/api/v2/configurations/{name}',
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
   * - `private_cert_configuration_action_rotate_intermediate`: Rotate an internally signed intermediate certificate
   * authority certificate.
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createConfigurationAction');

    const parameters = {
      options: {
        url: '/api/v2/configurations/{name}/actions',
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
   * @param {string} [params.eventNotificationsSourceDescription] - An optional description for the source that is in
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'createNotificationsRegistration');

    const parameters = {
      options: {
        url: '/api/v2/notifications/registration',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getNotificationsRegistration');

    const parameters = {
      options: {
        url: '/api/v2/notifications/registration',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'deleteNotificationsRegistration');

    const parameters = {
      options: {
        url: '/api/v2/notifications/registration',
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

    const sdkHeaders = getSdkHeaders(SecretsManagerV2.DEFAULT_SERVICE_NAME, 'v2', 'getNotificationsRegistrationTest');

    const parameters = {
      options: {
        url: '/api/v2/notifications/registration/test',
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
    /** The UUID that uniquely identifies your secret group. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecretGroup` operation. */
  export interface UpdateSecretGroupParams {
    /** The UUID that uniquely identifies your secret group. */
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
    /** The UUID that uniquely identifies your secret group. */
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
    /** Filter secrets by types.
     *
     *  You can apply multiple filters by using a comma-separated list of secret types.
     *
     *  **Usage:** To retrieve a list of imported certificates and public certificates use
     *  `..?secret_types=imported_cert,public_cert`.
     */
    secretTypes?: ListSecretsConstants.SecretTypes[] | string[];
    /** Filter secrets by labels.
     *
     *  You can use a comma-separated list of labels to filter secrets that include all of the labels in the list.
     *
     *  **Usage:** To retrieve a list of secrets that include both the label "dev" and the label "us-south" in their
     *  list of labels, use `..?labels=dev,us-south`.
     */
    matchAllLabels?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listSecrets` operation. */
  export namespace ListSecretsConstants {
    /** Filter secrets by types. You can apply multiple filters by using a comma-separated list of secret types. **Usage:** To retrieve a list of imported certificates and public certificates use `..?secret_types=imported_cert,public_cert`. */
    export enum SecretTypes {
      ARBITRARY = 'arbitrary',
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      KV = 'kv',
      PRIVATE_CERT = 'private_cert',
      PUBLIC_CERT = 'public_cert',
      SERVICE_CREDENTIALS = 'service_credentials',
      USERNAME_PASSWORD = 'username_password',
    }
  }

  /** Parameters for the `getSecret` operation. */
  export interface GetSecretParams {
    /** The UUID that uniquely identifies your secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecret` operation. */
  export interface DeleteSecretParams {
    /** The UUID that uniquely identifies your secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretMetadata` operation. */
  export interface GetSecretMetadataParams {
    /** The UUID that uniquely identifies your secret. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecretMetadata` operation. */
  export interface UpdateSecretMetadataParams {
    /** The UUID that uniquely identifies your secret. */
    id: string;
    secretMetadataPatch: SecretMetadataPatch;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecretAction` operation. */
  export interface CreateSecretActionParams {
    /** The UUID that uniquely identifies your secret. */
    id: string;
    secretActionPrototype: SecretActionPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretByNameType` operation. */
  export interface GetSecretByNameTypeParams {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secretType: GetSecretByNameTypeConstants.SecretType | string;
    /** A human-readable name to assign to your secret. To protect your privacy, do not use personal data, such as
     *  your name or location, as a name for your secret.
     */
    name: string;
    /** The name of your secret group. */
    secretGroupName: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getSecretByNameType` operation. */
  export namespace GetSecretByNameTypeConstants {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
    export enum SecretType {
      ARBITRARY = 'arbitrary',
      IAM_CREDENTIALS = 'iam_credentials',
      IMPORTED_CERT = 'imported_cert',
      KV = 'kv',
      PRIVATE_CERT = 'private_cert',
      PUBLIC_CERT = 'public_cert',
      SERVICE_CREDENTIALS = 'service_credentials',
      USERNAME_PASSWORD = 'username_password',
    }
  }

  /** Parameters for the `createSecretVersion` operation. */
  export interface CreateSecretVersionParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    secretVersionPrototype: SecretVersionPrototype;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretVersions` operation. */
  export interface ListSecretVersionsParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretVersion` operation. */
  export interface GetSecretVersionParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteSecretVersionData` operation. */
  export interface DeleteSecretVersionDataParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSecretVersionMetadata` operation. */
  export interface GetSecretVersionMetadataParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateSecretVersionMetadata` operation. */
  export interface UpdateSecretVersionMetadataParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    /** The secret version metadata that a user can customize. */
    versionCustomMetadata?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createSecretVersionAction` operation. */
  export interface CreateSecretVersionActionParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
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
    /** The UUID that uniquely identifies your secret. */
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
    /** The UUID that uniquely identifies your secret. */
    id: string;
    /** The locks data to be attached to a secret version. */
    locks: SecretLockPrototype[];
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching
     *  locks on a secret version.
     *  - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of
     *  the secret. - `remove_previous_and_delete`: Completes the same action as `remove_previous`, but also permanently
     *  deletes the data of the previous secret version if it doesn't have any locks.
     */
    mode?: CreateSecretLocksBulkConstants.Mode | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSecretLocksBulk` operation. */
  export namespace CreateSecretLocksBulkConstants {
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching locks on a secret version. - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of the secret. - `remove_previous_and_delete`: Completes the same action as `remove_previous`, but also permanently deletes the data of the previous secret version if it doesn't have any locks. */
    export enum Mode {
      REMOVE_PREVIOUS = 'remove_previous',
      REMOVE_PREVIOUS_AND_DELETE = 'remove_previous_and_delete',
    }
  }

  /** Parameters for the `deleteSecretLocksBulk` operation. */
  export interface DeleteSecretLocksBulkParams {
    /** The UUID that uniquely identifies your secret. */
    id: string;
    /** Specify the names of the secret locks to be deleted. */
    name?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listSecretVersionLocks` operation. */
  export interface ListSecretVersionLocksParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
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
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
     *  refer to the current or previous secret version.
     */
    id: string;
    /** The locks data to be attached to a secret version. */
    locks: SecretLockPrototype[];
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching
     *  locks on a secret version.
     *  - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of
     *  the secret. - `remove_previous_and_delete`: Completes the same action as `remove_previous`, but also permanently
     *  deletes the data of the previous secret version if it doesn't have any locks.
     */
    mode?: CreateSecretVersionLocksBulkConstants.Mode | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createSecretVersionLocksBulk` operation. */
  export namespace CreateSecretVersionLocksBulkConstants {
    /** An optional lock mode. When you create a lock, you can set one of the following modes to clear any matching locks on a secret version. - `remove_previous`: Removes any other locks with matching names if they are found in the previous version of the secret. - `remove_previous_and_delete`: Completes the same action as `remove_previous`, but also permanently deletes the data of the previous secret version if it doesn't have any locks. */
    export enum Mode {
      REMOVE_PREVIOUS = 'remove_previous',
      REMOVE_PREVIOUS_AND_DELETE = 'remove_previous_and_delete',
    }
  }

  /** Parameters for the `deleteSecretVersionLocksBulk` operation. */
  export interface DeleteSecretVersionLocksBulkParams {
    /** The UUID that uniquely identifies your secret. */
    secretId: string;
    /** The UUID that uniquely identifies your secret version. You can use the `current` or `previous` aliases to
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
     *  `../configurations?search=text`.
     */
    search?: string;
    /** Filter configurations by secret types, iam_credentials, public_cert or private_cert.
     *
     *  You can apply multiple filters by using a comma-separated list of secret types.
     *
     *  **Usage:** To retrieve a list of configurations that are associated with all secret types, use
     *  `..?secret_types=iam_credentials,public_cert,private_cert`.
     */
    secretTypes?: ListConfigurationsConstants.SecretTypes[] | string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listConfigurations` operation. */
  export namespace ListConfigurationsConstants {
    /** Filter configurations by secret types, iam_credentials, public_cert or private_cert. You can apply multiple filters by using a comma-separated list of secret types. **Usage:** To retrieve a list of configurations that are associated with all secret types, use `..?secret_types=iam_credentials,public_cert,private_cert`. */
    export enum SecretTypes {
      IAM_CREDENTIALS = 'iam_credentials',
      PRIVATE_CERT = 'private_cert',
      PUBLIC_CERT = 'public_cert',
    }
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
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
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
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
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
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
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
      PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
      PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
      PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
      PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
      PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
      PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
      IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
    }
  }

  /** Parameters for the `createNotificationsRegistration` operation. */
  export interface CreateNotificationsRegistrationParams {
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    eventNotificationsInstanceCrn: string;
    /** The name that is displayed as a source that is in your Event Notifications instance. */
    eventNotificationsSourceName: string;
    /** An optional description for the source that is in your Event Notifications instance. */
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

  /**
   * Issuance information that is associated with your certificate.
   */
  export interface CertificateIssuanceInfo {
    /** This parameter indicates whether the issued certificate is configured with an automatic rotation policy. */
    auto_rotated?: boolean;
    /** The set of challenges. It is returned only when ordering public certificates by using manual DNS
     *  configuration.
     */
    challenges?: ChallengeResource[];
    /** The date that a user requests to validate DNS challenges for certificates that are ordered with a manual DNS
     *  provider. The date format follows `RFC 3339`.
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
    /** The date when the certificate is ordered. The date format follows `RFC 3339`. */
    ordered_on?: string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: CertificateIssuanceInfo.Constants.StateDescription | string;
  }
  export namespace CertificateIssuanceInfo {
    export namespace Constants {
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * The date and time that the certificate validity period begins and ends.
   */
  export interface CertificateValidity {
    /** The date-time format follows `RFC 3339`. */
    not_before: string;
    /** The date-time format follows `RFC 3339`. */
    not_after: string;
  }

  /**
   * Properties that describe a challenge.
   */
  export interface ChallengeResource {
    /** The challenge domain. */
    domain?: string;
    /** The challenge expiration date. The date format follows `RFC 3339`. */
    expiration?: string;
    /** The challenge status. */
    status?: string;
    /** The TXT record name. */
    txt_record_name?: string;
    /** The TXT record value. */
    txt_record_value?: string;
  }

  /**
   * Your configuration.
   */
  export interface Configuration {
  }

  /**
   * The response body to specify the properties of the action to create a configuration.
   */
  export interface ConfigurationAction {
  }

  /**
   * The request body to specify the properties of the action to create a configuration.
   */
  export interface ConfigurationActionPrototype {
  }

  /**
   * Your configuration metadata properties.
   */
  export interface ConfigurationMetadata {
  }

  /**
   * Properties that describe a paginated collection of secret locks.
   */
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

  /**
   * Your configuration update data.
   */
  export interface ConfigurationPatch {
  }

  /**
   * The details of your configuration.
   */
  export interface ConfigurationPrototype {
  }

  /**
   * The data specified to create the CSR and the private key.
   */
  export interface ImportedCertificateManagedCsr {
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
    /** If set to false, makes the common_name field optional while generating a certificate. */
    require_cn?: boolean;
    /** The Common Name (CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string;
    /** The IP Subject Alternative Names to define for the certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the certificate,
     *  in a comma-delimited list.
     *
     *  The alternative names must The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current valid
     *  type is `UTF8`.
     */
    other_sans?: string;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** Specifies the list of requested User ID (OID 0.9.2342.19200300.100.1.1) Subject values to be placed on the
     *  signed certificate.
     */
    user_ids?: string;
    /** This field indicates whether certificate is flagged for server use. */
    server_flag?: boolean;
    /** This field indicates whether certificate is flagged for client use. */
    client_flag?: boolean;
    /** This field indicates whether certificate is flagged for code signing use. */
    code_signing_flag?: boolean;
    /** This field indicates whether certificate is flagged for email protection use. */
    email_protection_flag?: boolean;
    /** The type of private key to generate. */
    key_type?: ImportedCertificateManagedCsr.Constants.KeyType | string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048`, `3072`, `4096` and `8192`. Allowable values for EC keys are: `224`,
     *  `256`, `384`, and `521`. The default for RSA keys is `2048`. The default for EC keys is `256`. Ignored for
     *  ed25519 key.
     */
    key_bits?: number;
    /** The allowed key usage constraint to define for certificate, in a comma-delimited list.
     *
     *  You can find valid values in the [Go x509 package documentation](https://pkg.go.dev/crypto/x509#KeyUsage). Omit
     *  the `KeyUsage` part of the value. Values are not case-sensitive. To specify no key usage constraints, set this
     *  field to an empty string.
     */
    key_usage?: string;
    /** The allowed extended key usage constraint on certificate, in a comma-delimited list.
     *
     *  You can find valid values in the [Go x509 package
     *  documentation](https://golang.org/pkg/crypto/x509/#ExtKeyUsage). Omit the `ExtKeyUsage` part of the value.
     *  Values are not case-sensitive. To specify no key usage constraints, set this field to an empty string.
     */
    ext_key_usage?: string;
    /** A comma-delimited list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string;
    /** A comma-delimited list of extended key usage Object Identifiers (OIDs). */
    ext_key_usage_oids?: string;
    /** This field indicates whether the private key will be rotated. */
    rotate_keys?: boolean;
  }
  export namespace ImportedCertificateManagedCsr {
    export namespace Constants {
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
        ED25519 = 'ed25519',
      }
    }
  }

  /**
   * The data specified to create the CSR and the private key.
   */
  export interface ImportedCertificateManagedCsrResponse {
    /** The Organizational Unit (OU) values to define in the subject field of the resulting certificate. */
    ou: string[];
    /** The Organization (O) values to define in the subject field of the resulting certificate. */
    organization: string[];
    /** The Country (C) values to define in the subject field of the resulting certificate. */
    country: string[];
    /** The Locality (L) values to define in the subject field of the resulting certificate. */
    locality: string[];
    /** The Province (ST) values to define in the subject field of the resulting certificate. */
    province: string[];
    /** The street address values to define in the subject field of the resulting certificate. */
    street_address: string[];
    /** The postal code values to define in the subject field of the resulting certificate. */
    postal_code: string[];
    /** If set to false, makes the common_name field optional while generating a certificate. */
    require_cn: boolean;
    /** The Common Name (CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string;
    /** The IP Subject Alternative Names to define for the certificate, in a comma-delimited list. */
    ip_sans?: string;
    /** The URI Subject Alternative Names to define for the certificate, in a comma-delimited list. */
    uri_sans?: string;
    /** The custom Object Identifier (OID) or UTF8-string Subject Alternative Names to define for the certificate,
     *  in a comma-delimited list.
     *
     *  The alternative names must The format is the same as OpenSSL: `<oid>:<type>:<value>` where the current valid
     *  type is `UTF8`.
     */
    other_sans?: string;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans: boolean;
    /** Specifies the list of requested User ID (OID 0.9.2342.19200300.100.1.1) Subject values to be placed on the
     *  signed certificate.
     */
    user_ids?: string;
    /** This field indicates whether certificate is flagged for server use. */
    server_flag: boolean;
    /** This field indicates whether certificate is flagged for client use. */
    client_flag: boolean;
    /** This field indicates whether certificate is flagged for code signing use. */
    code_signing_flag: boolean;
    /** This field indicates whether certificate is flagged for email protection use. */
    email_protection_flag: boolean;
    /** The type of private key to generate. */
    key_type: ImportedCertificateManagedCsrResponse.Constants.KeyType | string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048`, `3072`, `4096` and `8192`. Allowable values for EC keys are: `224`,
     *  `256`, `384`, and `521`. The default for RSA keys is `2048`. The default for EC keys is `256`. Ignored for
     *  ed25519 key.
     */
    key_bits: number;
    /** The allowed key usage constraint to define for certificate, in a comma-delimited list.
     *
     *  You can find valid values in the [Go x509 package documentation](https://pkg.go.dev/crypto/x509#KeyUsage). Omit
     *  the `KeyUsage` part of the value. Values are not case-sensitive. To specify no key usage constraints, set this
     *  field to an empty string.
     */
    key_usage?: string;
    /** The allowed extended key usage constraint on certificate, in a comma-delimited list.
     *
     *  You can find valid values in the [Go x509 package
     *  documentation](https://golang.org/pkg/crypto/x509/#ExtKeyUsage). Omit the `ExtKeyUsage` part of the value.
     *  Values are not case-sensitive. To specify no key usage constraints, set this field to an empty string.
     */
    ext_key_usage?: string;
    /** A comma-delimited list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string;
    /** A comma-delimited list of extended key usage Object Identifiers (OIDs). */
    ext_key_usage_oids?: string;
    /** This field indicates whether the private key will be rotated. */
    rotate_keys?: boolean;
    /** The certificate signing request. */
    csr: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key: string;
  }
  export namespace ImportedCertificateManagedCsrResponse {
    export namespace Constants {
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
        ED25519 = 'ed25519',
      }
    }
  }

  /**
   * The details of the Event Notifications registration.
   */
  export interface NotificationsRegistration {
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    event_notifications_instance_crn: string;
  }

  /**
   * A URL that points to the first page in a collection.
   */
  export interface PaginatedCollectionFirst {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /**
   * A URL that points to the last page in a collection.
   */
  export interface PaginatedCollectionLast {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /**
   * A URL that points to the next page in a collection.
   */
  export interface PaginatedCollectionNext {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /**
   * A URL that points to the previous page in a collection.
   */
  export interface PaginatedCollectionPrevious {
    /** A URL that points to a page in a collection. */
    href: string;
  }

  /**
   * Policy for auto-generated passwords.
   */
  export interface PasswordGenerationPolicy {
    /** The length of auto-generated passwords. */
    length?: number;
    /** Include digits in auto-generated passwords. */
    include_digits?: boolean;
    /** Include symbols in auto-generated passwords. */
    include_symbols?: boolean;
    /** Include uppercase letters in auto-generated passwords. */
    include_uppercase?: boolean;
  }

  /**
   * Policy patch for auto-generated passwords. Policy properties that are included in the patch are updated. Properties
   * that are not included in the patch remain unchanged.
   */
  export interface PasswordGenerationPolicyPatch {
    /** The length of auto-generated passwords. */
    length?: number;
    /** Include digits in auto-generated passwords. */
    include_digits?: boolean;
    /** Include symbols in auto-generated passwords. */
    include_symbols?: boolean;
    /** Include uppercase letters in auto-generated passwords. */
    include_uppercase?: boolean;
  }

  /**
   * Policy for auto-generated passwords.
   */
  export interface PasswordGenerationPolicyRO {
    /** The length of auto-generated passwords. */
    length?: number;
    /** Include digits in auto-generated passwords. */
    include_digits?: boolean;
    /** Include symbols in auto-generated passwords. */
    include_symbols?: boolean;
    /** Include uppercase letters in auto-generated passwords. */
    include_uppercase?: boolean;
  }

  /**
   * The configuration data of your Private Certificate.
   */
  export interface PrivateCertificateCAData {
  }

  /**
   * The response body of the action to rotate an intermediate certificate authority for the private certificate
   * configuration.
   */
  export interface PrivateCertificateConfigurationRotateAction {
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    /** he requested TTL, after which the certificate expires. */
    ttl?: number;
    /** The format of the returned data. */
    format?: PrivateCertificateConfigurationRotateAction.Constants.Format | string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** This field indicates whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that is requested in the CSR are added to the basic set of key
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
    /** The requested value for the [`serialNumber`](https://datatracker.ietf.org/doc/html/rfc4519#section-2.31)
     *  attribute that is in the certificate's distinguished name (DN).
     *
     *  **Note:** This field is not related to the `serial_number` field that is returned in the API response. The
     *  `serial_number` field represents the certificate's randomly assigned serial number.
     */
    serial_number?: string;
    /** The certificate signing request. */
    csr?: string;
    /** The data that is associated with the root certificate authority. */
    data?: PrivateCertificateConfigurationCACertificate;
  }
  export namespace PrivateCertificateConfigurationRotateAction {
    export namespace Constants {
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
    }
  }

  /**
   * The data that is associated with a cryptographic key.
   */
  export interface PrivateCertificateCryptoKey {
    /** The ID of a PKCS#11 key to use. If the key does not exist and generation is enabled, this ID is given to the
     *  generated key.  If the key exists, and generation is disabled, then this ID is used to look up the key. This
     *  value or the crypto key label must be specified.
     */
    id?: string;
    /** The label of the key to use. If the key does not exist and generation is enabled, this field is the label
     *  that is given to the generated key.  If the key exists, and generation is disabled, then this label is used to
     *  look up the key. This value or the crypto key ID must be specified.
     */
    label?: string;
    /** The indication of whether a new key is generated by the crypto provider if the given key name cannot be
     *  found.
     */
    allow_generate_key?: boolean;
    /** The data that is associated with a cryptographic provider. */
    provider: PrivateCertificateCryptoProvider;
  }

  /**
   * The data that is associated with a cryptographic provider.
   */
  export interface PrivateCertificateCryptoProvider {
  }

  /**
   * Defines the rotation object that is used to manually rotate public certificates.
   */
  export interface PublicCertificateRotationObject {
    /** This field indicates whether Secrets Manager rotates the private key for your public certificate
     *  automatically.
     *
     *  The default is `false`. If it is set to `true`, the service generates and stores a new private key for your
     *  rotated certificate.
     */
    rotate_keys?: boolean;
  }

  /**
   * This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
   * username_password, private_cert, public_cert, iam_credentials.
   */
  export interface RotationPolicy {
  }

  /**
   * Your secret.
   */
  export interface Secret {
  }

  /**
   * The response body to specify the properties of the action to create a secret.
   */
  export interface SecretAction {
  }

  /**
   * The request body to specify the properties for your secret action.
   */
  export interface SecretActionPrototype {
  }

  /**
   * Properties that describe a secret group.
   */
  export interface SecretGroup {
    /** A UUID identifier, or `default` secret group. */
    id: string;
    /** The name of your existing secret group. */
    name?: string;
    /** An extended description of your secret group.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
  }

  /**
   * Properties that describe a collection of secret groups.
   */
  export interface SecretGroupCollection {
    /** A collection of secret groups. */
    secret_groups: SecretGroup[];
    /** The total number of resources in a collection. */
    total_count: number;
  }

  /**
   * SecretLock.
   */
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
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** A UUID identifier. */
    secret_id: string;
    /** A UUID identifier. */
    secret_version_id: string;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    secret_version_alias: SecretLock.Constants.SecretVersionAlias | string;
  }
  export namespace SecretLock {
    export namespace Constants {
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum SecretVersionAlias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * SecretLockPrototype.
   */
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

  /**
   * Create locks response body containing a collection of locks that are attached to a secret.
   */
  export interface SecretLocks {
    /** A UUID identifier. */
    secret_id: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: SecretLocks.Constants.SecretType | string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** A collection of locks that are attached to a secret. */
    versions: SecretVersionLocks[];
  }
  export namespace SecretLocks {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Properties that describe a paginated collection of your secret locks.
   */
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

  /**
   * Properties of your secret metadata.
   */
  export interface SecretMetadata {
  }

  /**
   * Properties that describe a paginated collection of your secret metadata.
   */
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

  /**
   * Update your secret metadata.
   */
  export interface SecretMetadataPatch {
  }

  /**
   * Specify the properties for your secret.
   */
  export interface SecretPrototype {
  }

  /**
   * Your secret version.
   */
  export interface SecretVersion {
  }

  /**
   * The request body to specify the properties of the action to create a secret version.
   */
  export interface SecretVersionActionPrototype {
  }

  /**
   * SecretVersionLocks.
   */
  export interface SecretVersionLocks {
    /** A UUID identifier. */
    version_id: string;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    version_alias: SecretVersionLocks.Constants.VersionAlias | string;
    /** The names of all locks that are associated with this secret version. */
    locks: string[];
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available?: boolean;
  }
  export namespace SecretVersionLocks {
    export namespace Constants {
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum VersionAlias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * Properties that describe a paginated collection of your secret version locks.
   */
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

  /**
   * Properties of the version metadata of your secret.
   */
  export interface SecretVersionMetadata {
  }

  /**
   * Properties that describe a collection of your secret version metadata.
   */
  export interface SecretVersionMetadataCollection {
    /** A collection of secret version metadata. */
    versions: SecretVersionMetadata[];
    /** The total number of resources in a collection. */
    total_count: number;
  }

  /**
   * Specify the properties for your new secret version.
   */
  export interface SecretVersionPrototype {
  }

  /**
   * Properties that describe a paginated collection of your secrets locks.
   */
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

  /**
   * The source service resource key data of the generated service credentials.
   */
  export interface ServiceCredentialsResourceKey {
    /** The resource key CRN of the generated service credentials. */
    crn?: string;
    /** The resource key name of the generated service credentials. */
    name?: string;
  }

  /**
   * The properties of the service credentials secret payload.
   *
   * This type supports additional properties of type any.
   */
  export interface ServiceCredentialsSecretCredentials {
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease, the API key is deleted automatically. See the `time-to-live`
     *  field to understand the duration of the lease.
     */
    apikey?: string;
    /** The IAM API key description for the generated service credentials. */
    iam_apikey_description?: string;
    /** The IAM API key id for the generated service credentials. */
    iam_apikey_id?: string;
    /** The IAM API key name for the generated service credentials. */
    iam_apikey_name?: string;
    /** The IAM role CRN assigned to the generated service credentials. */
    iam_role_crn?: string;
    /** The IAM Service ID CRN. */
    iam_serviceid_crn?: string;

    /**
     * ServiceCredentialsSecretCredentials accepts additional properties of type any.
     */
    [propName: string]: any;
  }

  /**
   * The properties that are required to create the service credentials for the specified source service instance.
   */
  export interface ServiceCredentialsSecretSourceService {
    /** The source service instance identifier. */
    instance: ServiceCredentialsSourceServiceInstance;
    /** Configuration options represented as key-value pairs. Service-defined options are used in the generation of
     *  credentials for some services. For example, Cloud Object Storage accepts the optional boolean parameter HMAC for
     *  creating specific kind of credentials.
     */
    parameters?: ServiceCredentialsSourceServiceParameters;
    /** The service-specific custom role. CRN is accepted. The role is assigned as part of an access policy to any
     *  auto-generated IAM service ID.  If you provide an existing service ID, it is added to the access policy for that
     *  ID.  If a role is not provided, any new service IDs that are autogenerated, will not have an assigned access
     *  policy and provided service IDs are not changed in any way.  Refer to the service documentation for supported
     *  roles.
     */
    role?: ServiceCredentialsSourceServiceRole;
  }

  /**
   * The properties of the resource key that was created for this source service instance.
   */
  export interface ServiceCredentialsSecretSourceServiceRO {
    /** The source service instance identifier. */
    instance: ServiceCredentialsSourceServiceInstance;
    /** Configuration options represented as key-value pairs. Service-defined options are used in the generation of
     *  credentials for some services. For example, Cloud Object Storage accepts the optional boolean parameter HMAC for
     *  creating specific kind of credentials.
     */
    parameters?: ServiceCredentialsSourceServiceParameters;
    /** The service-specific custom role. CRN is accepted. The role is assigned as part of an access policy to any
     *  auto-generated IAM service ID.  If you provide an existing service ID, it is added to the access policy for that
     *  ID.  If a role is not provided, any new service IDs that are autogenerated, will not have an assigned access
     *  policy and provided service IDs are not changed in any way.  Refer to the service documentation for supported
     *  roles.
     */
    role?: ServiceCredentialsSourceServiceRole;
    /** The source service IAM data is returned in case IAM credentials where created for this secret. */
    iam?: ServiceCredentialsSourceServiceIam;
    /** The source service resource key data of the generated service credentials. */
    resource_key?: ServiceCredentialsResourceKey;
  }

  /**
   * The source service IAM data is returned in case IAM credentials where created for this secret.
   */
  export interface ServiceCredentialsSourceServiceIam {
    /** The IAM apikey metadata for the IAM credentials that were generated. */
    apikey?: ServiceCredentialsSourceServiceIamApikey;
    /** The IAM role for the generate service credentials. */
    role?: ServiceCredentialsSourceServiceIamRole;
    /** The IAM serviceid for the generated service credentials. */
    serviceid?: ServiceCredentialsSourceServiceIamServiceid;
  }

  /**
   * The IAM apikey metadata for the IAM credentials that were generated.
   */
  export interface ServiceCredentialsSourceServiceIamApikey {
    /** The IAM API key description for the generated service credentials. */
    description?: string;
    /** The IAM API key id for the generated service credentials. */
    id?: string;
    /** The IAM API key name for the generated service credentials. */
    name?: string;
  }

  /**
   * The IAM role for the generate service credentials.
   */
  export interface ServiceCredentialsSourceServiceIamRole {
    /** The IAM role CRN assigned to the generated service credentials. */
    crn?: string;
  }

  /**
   * The IAM serviceid for the generated service credentials.
   */
  export interface ServiceCredentialsSourceServiceIamServiceid {
    /** The IAM Service ID CRN. */
    crn?: string;
  }

  /**
   * The source service instance identifier.
   */
  export interface ServiceCredentialsSourceServiceInstance {
    /** A CRN that uniquely identifies a service credentials source. */
    crn?: string;
  }

  /**
   * Configuration options represented as key-value pairs. Service-defined options are used in the generation of
   * credentials for some services. For example, Cloud Object Storage accepts the optional boolean parameter HMAC for
   * creating specific kind of credentials.
   *
   * This type supports additional properties of type any.
   */
  export interface ServiceCredentialsSourceServiceParameters {
    /** An optional platform defined option to reuse an existing IAM Service ID for the role assignment. */
    serviceid_crn?: string;

    /**
     * ServiceCredentialsSourceServiceParameters accepts additional properties of type any.
     */
    [propName: string]: any;
  }

  /**
   * The service-specific custom role. CRN is accepted. The role is assigned as part of an access policy to any
   * auto-generated IAM service ID.  If you provide an existing service ID, it is added to the access policy for that
   * ID.  If a role is not provided, any new service IDs that are autogenerated, will not have an assigned access policy
   * and provided service IDs are not changed in any way.  Refer to the service documentation for supported roles.
   */
  export interface ServiceCredentialsSourceServiceRole {
    /** The service role CRN. */
    crn: string;
  }

  /**
   * The request body to specify the properties of the action to create a secret version.
   */
  export interface VersionAction {
  }

  /**
   * Your arbitrary secret.
   */
  export interface ArbitrarySecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ArbitrarySecret.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: ArbitrarySecret.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The secret data that is assigned to an `arbitrary` secret. */
    payload?: string;
  }
  export namespace ArbitrarySecret {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * Properties of the metadata of your arbitrary secret..
   */
  export interface ArbitrarySecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ArbitrarySecretMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: ArbitrarySecretMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
  }
  export namespace ArbitrarySecretMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * ArbitrarySecretMetadataPatch.
   */
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
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
  }

  /**
   * ArbitrarySecretPrototype.
   */
  export interface ArbitrarySecretPrototype extends SecretPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ArbitrarySecretPrototype.Constants.SecretType | string;
    /** The secret data that is assigned to an `arbitrary` secret. */
    payload: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }
  export namespace ArbitrarySecretPrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Your arbitrary secret version.
   */
  export interface ArbitrarySecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ArbitrarySecretVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: ArbitrarySecretVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The secret data that is assigned to an `arbitrary` secret. */
    payload?: string;
  }
  export namespace ArbitrarySecretVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * Properties of the version metadata of your arbitrary secret.
   */
  export interface ArbitrarySecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ArbitrarySecretVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: ArbitrarySecretVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
  }
  export namespace ArbitrarySecretVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * ArbitrarySecretVersionPrototype.
   */
  export interface ArbitrarySecretVersionPrototype extends SecretVersionPrototype {
    /** The secret data that is assigned to an `arbitrary` secret. */
    payload: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /**
   * This field indicates whether Secrets Manager rotates your secrets automatically.
   */
  export interface CommonRotationPolicy extends RotationPolicy {
    /** This field indicates whether Secrets Manager rotates your secret automatically.
     *
     *  The default is `false`. If `auto_rotate` is set to `true` the service rotates your secret based on the defined
     *  interval.
     */
    auto_rotate: boolean;
    /** The length of the secret rotation time interval. */
    interval?: number;
    /** The units for the secret rotation time interval. */
    unit?: CommonRotationPolicy.Constants.Unit | string;
  }
  export namespace CommonRotationPolicy {
    export namespace Constants {
      /** The units for the secret rotation time interval. */
      export enum Unit {
        DAY = 'day',
        MONTH = 'month',
      }
    }
  }

  /**
   * Properties that describe a Classic Infrastructure DNS configuration.
   */
  export interface IAMCredentialsConfiguration extends Configuration {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: IAMCredentialsConfiguration.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: IAMCredentialsConfiguration.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** This parameter indicates whether the API key configuration is disabled. */
    disabled?: boolean;
    /** An IBM Cloud API key that can create and manage service IDs. The API key must be assigned the Editor
     *  platform role on the Access Groups Service and the Operator platform role on the IAM Identity Service.  For more
     *  information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-configure-iam-engine).
     */
    api_key?: string;
  }
  export namespace IAMCredentialsConfiguration {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Your IAMCredentials Configuration metadata properties.
   */
  export interface IAMCredentialsConfigurationMetadata extends ConfigurationMetadata {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: IAMCredentialsConfigurationMetadata.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: IAMCredentialsConfigurationMetadata.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** This parameter indicates whether the API key configuration is disabled. */
    disabled?: boolean;
  }
  export namespace IAMCredentialsConfigurationMetadata {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * The configuration update of the IAM Credentials engine.
   */
  export interface IAMCredentialsConfigurationPatch extends ConfigurationPatch {
    /** An IBM Cloud API key that can create and manage service IDs. The API key must be assigned the Editor
     *  platform role on the Access Groups Service and the Operator platform role on the IAM Identity Service.  For more
     *  information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-configure-iam-engine).
     */
    api_key?: string;
    /** This parameter indicates whether the API key configuration is disabled.
     *
     *  If it is set to `disabled`, the IAM credentials engine doesn't use the configured API key for credentials
     *  management.
     */
    disabled?: boolean;
  }

  /**
   * IAMCredentialsConfigurationPrototype.
   */
  export interface IAMCredentialsConfigurationPrototype extends ConfigurationPrototype {
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: IAMCredentialsConfigurationPrototype.Constants.ConfigType | string;
    /** The API key that is used to set the iam_credentials engine. */
    api_key: string;
    /** This parameter indicates whether the API key configuration is disabled.
     *
     *  If it is set to `true`, the IAM credentials engine doesn't use the configured API key for credentials
     *  management.
     */
    disabled?: boolean;
  }
  export namespace IAMCredentialsConfigurationPrototype {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
    }
  }

  /**
   * Your IAM credentials secret.
   */
  export interface IAMCredentialsSecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: IAMCredentialsSecret.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: IAMCredentialsSecret.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
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
     *  If you omit this parameter, Secrets Manager generates a new service ID for your secret at its creation, and adds
     *  it to the access groups that you assign.
     *
     *  Optionally, you can use this field to provide your own service ID if you prefer to manage its access directly or
     *  retain the service ID after your secret expires, is rotated, or deleted. If you provide a service ID, do not
     *  include the `access_groups` parameter.
     */
    service_id?: string;
    /** The ID of the account in which the IAM credentials are created. Use this field only if the target account is
     *  not the same as the account of the Secrets Manager instance. Otherwise, the field can be omitted.
     */
    account_id?: string;
    /** Indicates whether an `iam_credentials` secret was created with a static service ID.
     *
     *  If it is set to `true`, the service ID for the secret was provided by the user at secret creation. If it is set
     *  to `false`, the service ID was generated by Secrets Manager.
     */
    service_id_is_static?: boolean;
    /** (IAM credentials) This parameter indicates whether to reuse the service ID and API key for future read
     *  operations.
     *
     *  If it is set to `true`, the service reuses the current credentials. If it is set to `false`, a new service ID
     *  and API key are generated each time that the secret is read or accessed.
     */
    reuse_api_key: boolean;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease, the API key is deleted automatically. See the `time-to-live`
     *  field to understand the duration of the lease. If you want to continue to use the same API key for future read
     *  operations, see the `reuse_api_key` field.
     */
    api_key?: string;
  }
  export namespace IAMCredentialsSecret {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * Properties of the metadata of your IAM credentials secret.
   */
  export interface IAMCredentialsSecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: IAMCredentialsSecretMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: IAMCredentialsSecretMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
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
     *  If you omit this parameter, Secrets Manager generates a new service ID for your secret at its creation, and adds
     *  it to the access groups that you assign.
     *
     *  Optionally, you can use this field to provide your own service ID if you prefer to manage its access directly or
     *  retain the service ID after your secret expires, is rotated, or deleted. If you provide a service ID, do not
     *  include the `access_groups` parameter.
     */
    service_id?: string;
    /** The ID of the account in which the IAM credentials are created. Use this field only if the target account is
     *  not the same as the account of the Secrets Manager instance. Otherwise, the field can be omitted.
     */
    account_id?: string;
    /** Indicates whether an `iam_credentials` secret was created with a static service ID.
     *
     *  If it is set to `true`, the service ID for the secret was provided by the user at secret creation. If it is set
     *  to `false`, the service ID was generated by Secrets Manager.
     */
    service_id_is_static?: boolean;
    /** (IAM credentials) This parameter indicates whether to reuse the service ID and API key for future read
     *  operations.
     *
     *  If it is set to `true`, the service reuses the current credentials. If it is set to `false`, a new service ID
     *  and API key are generated each time that the secret is read or accessed.
     */
    reuse_api_key: boolean;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
  }
  export namespace IAMCredentialsSecretMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * IAMCredentialsSecretMetadataPatch.
   */
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
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
     */
    ttl?: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
  }

  /**
   * IAMCredentialsSecretPrototype.
   */
  export interface IAMCredentialsSecretPrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: IAMCredentialsSecretPrototype.Constants.SecretType | string;
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
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
     */
    ttl: string;
    /** Access Groups that you can use for an `iam_credentials` secret.
     *
     *  Up to 10 Access Groups can be used for each secret.
     */
    access_groups?: string[];
    /** The service ID under which the API key (see the `api_key` field) is created.
     *
     *  If you omit this parameter, Secrets Manager generates a new service ID for your secret at its creation, and adds
     *  it to the access groups that you assign.
     *
     *  Optionally, you can use this field to provide your own service ID if you prefer to manage its access directly or
     *  retain the service ID after your secret expires, is rotated, or deleted. If you provide a service ID, do not
     *  include the `access_groups` parameter.
     */
    service_id?: string;
    /** The ID of the account in which the IAM credentials are created. Use this field only if the target account is
     *  not the same as the account of the Secrets Manager instance. Otherwise, the field can be omitted.
     */
    account_id?: string;
    /** (IAM credentials) This parameter indicates whether to reuse the service ID and API key for future read
     *  operations.
     *
     *  If it is set to `true`, the service reuses the current credentials. If it is set to `false`, a new service ID
     *  and API key are generated each time that the secret is read or accessed.
     */
    reuse_api_key: boolean;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }
  export namespace IAMCredentialsSecretPrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * IAMCredentialsSecretRestoreFromVersionPrototype.
   */
  export interface IAMCredentialsSecretRestoreFromVersionPrototype extends SecretVersionPrototype {
    /** A UUID identifier, or `current` or `previous` secret version aliases. */
    restore_from_version: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /**
   * Your IAM credentials version.
   */
  export interface IAMCredentialsSecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: IAMCredentialsSecretVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: IAMCredentialsSecretVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The ID of the API key that is generated for this secret. */
    api_key_id?: string;
    /** The service ID under which the API key (see the `api_key` field) is created.
     *
     *  If you omit this parameter, Secrets Manager generates a new service ID for your secret at its creation, and adds
     *  it to the access groups that you assign.
     *
     *  Optionally, you can use this field to provide your own service ID if you prefer to manage its access directly or
     *  retain the service ID after your secret expires, is rotated, or deleted. If you provide a service ID, do not
     *  include the `access_groups` parameter.
     */
    service_id?: string;
    /** The API key that is generated for this secret.
     *
     *  After the secret reaches the end of its lease, the API key is deleted automatically. See the `time-to-live`
     *  field to understand the duration of the lease. If you want to continue to use the same API key for future read
     *  operations, see the `reuse_api_key` field.
     */
    api_key?: string;
  }
  export namespace IAMCredentialsSecretVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * Properties of the version metadata of your IAM credentials secret.
   */
  export interface IAMCredentialsSecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: IAMCredentialsSecretVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: IAMCredentialsSecretVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The ID of the API key that is generated for this secret. */
    api_key_id?: string;
    /** The service ID under which the API key (see the `api_key` field) is created.
     *
     *  If you omit this parameter, Secrets Manager generates a new service ID for your secret at its creation, and adds
     *  it to the access groups that you assign.
     *
     *  Optionally, you can use this field to provide your own service ID if you prefer to manage its access directly or
     *  retain the service ID after your secret expires, is rotated, or deleted. If you provide a service ID, do not
     *  include the `access_groups` parameter.
     */
    service_id?: string;
  }
  export namespace IAMCredentialsSecretVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * IAMCredentialsSecretVersionPrototype.
   */
  export interface IAMCredentialsSecretVersionPrototype extends SecretVersionPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /**
   * Your imported certificate.
   */
  export interface ImportedCertificate extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ImportedCertificate.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: ImportedCertificate.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The identifier for the cryptographic algorithm that is used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** Indicates whether the certificate was imported with an associated intermediate certificate. */
    intermediate_included?: boolean;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The identifier for the cryptographic algorithm used to generate the public key that is associated with the
     *  certificate.
     */
    key_algorithm?: string;
    /** Indicates whether the certificate was imported with an associated private key. */
    private_key_included?: boolean;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
    /** The data specified to create the CSR and the private key. */
    managed_csr?: ImportedCertificateManagedCsrResponse;
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
    /** The certificate signing request. */
    csr?: string;
  }
  export namespace ImportedCertificate {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * Properties of the secret metadata of your imported certificate.
   */
  export interface ImportedCertificateMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ImportedCertificateMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: ImportedCertificateMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The identifier for the cryptographic algorithm that is used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** Indicates whether the certificate was imported with an associated intermediate certificate. */
    intermediate_included?: boolean;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The identifier for the cryptographic algorithm used to generate the public key that is associated with the
     *  certificate.
     */
    key_algorithm?: string;
    /** Indicates whether the certificate was imported with an associated private key. */
    private_key_included?: boolean;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
    /** The data specified to create the CSR and the private key. */
    managed_csr?: ImportedCertificateManagedCsrResponse;
  }
  export namespace ImportedCertificateMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * ImportedCertificateMetadataPatch.
   */
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
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The data specified to create the CSR and the private key. */
    managed_csr?: ImportedCertificateManagedCsr;
  }

  /**
   * ImportedCertificatePrototype.
   */
  export interface ImportedCertificatePrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ImportedCertificatePrototype.Constants.SecretType | string;
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
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
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
    /** The data specified to create the CSR and the private key. */
    managed_csr?: ImportedCertificateManagedCsr;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }
  export namespace ImportedCertificatePrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Versions of your imported certificate.
   */
  export interface ImportedCertificateVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ImportedCertificateVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: ImportedCertificateVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
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
    /** The certificate signing request. */
    csr?: string;
  }
  export namespace ImportedCertificateVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * Properties of the version metadata of your imported certificate.
   */
  export interface ImportedCertificateVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ImportedCertificateVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: ImportedCertificateVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
  }
  export namespace ImportedCertificateVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * ImportedCertificateVersionPrototype.
   */
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

  /**
   * Your key-value secret.
   */
  export interface KVSecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: KVSecret.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: KVSecret.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The payload data of a key-value secret. */
    data: JsonObject;
  }
  export namespace KVSecret {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * Properties of the metadata of your key-value secret metadata.
   */
  export interface KVSecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: KVSecretMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: KVSecretMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
  }
  export namespace KVSecretMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * KVSecretMetadataPatch.
   */
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
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
  }

  /**
   * KVSecretPrototype.
   */
  export interface KVSecretPrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: KVSecretPrototype.Constants.SecretType | string;
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
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The payload data of a key-value secret. */
    data: JsonObject;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }
  export namespace KVSecretPrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Your key-value secret version.
   */
  export interface KVSecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: KVSecretVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: KVSecretVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The payload data of a key-value secret. */
    data: JsonObject;
  }
  export namespace KVSecretVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * Properties of the version metadata of your key-value secret.
   */
  export interface KVSecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: KVSecretVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: KVSecretVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
  }
  export namespace KVSecretVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * KVSecretVersionPrototype.
   */
  export interface KVSecretVersionPrototype extends SecretVersionPrototype {
    /** The payload data of a key-value secret. */
    data: JsonObject;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /**
   * Your private certificate.
   */
  export interface PrivateCertificate extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificate.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: PrivateCertificate.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The identifier for the cryptographic algorithm that is used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The intermediate certificate authority that signed this certificate. */
    certificate_authority?: string;
    /** The name of the certificate template. */
    certificate_template: string;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
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
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
    /** The date and time that the certificate was revoked. The date format follows `RFC 3339`. */
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
  export namespace PrivateCertificate {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * The response body of the action to revoke the private certificate.
   */
  export interface PrivateCertificateActionRevoke extends SecretAction {
    /** The type of secret action. */
    action_type: PrivateCertificateActionRevoke.Constants.ActionType | string;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
  }
  export namespace PrivateCertificateActionRevoke {
    export namespace Constants {
      /** The type of secret action. */
      export enum ActionType {
        PUBLIC_CERT_ACTION_VALIDATE_DNS_CHALLENGE = 'public_cert_action_validate_dns_challenge',
        PRIVATE_CERT_ACTION_REVOKE_CERTIFICATE = 'private_cert_action_revoke_certificate',
      }
    }
  }

  /**
   * The request body to specify the properties of the action to revoke the private certificate.
   */
  export interface PrivateCertificateActionRevokePrototype extends SecretActionPrototype {
    /** The type of secret action. */
    action_type: PrivateCertificateActionRevokePrototype.Constants.ActionType | string;
  }
  export namespace PrivateCertificateActionRevokePrototype {
    export namespace Constants {
      /** The type of secret action. */
      export enum ActionType {
        PUBLIC_CERT_ACTION_VALIDATE_DNS_CHALLENGE = 'public_cert_action_validate_dns_challenge',
        PRIVATE_CERT_ACTION_REVOKE_CERTIFICATE = 'private_cert_action_revoke_certificate',
      }
    }
  }

  /**
   * The response body to specify the properties of the action to revoke the private certificate.
   */
  export interface PrivateCertificateConfigurationActionRevoke extends ConfigurationAction {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionRevoke.Constants.ActionType | string;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
  }
  export namespace PrivateCertificateConfigurationActionRevoke {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The request body to specify the properties of the action to revoke the private certificate configuration.
   */
  export interface PrivateCertificateConfigurationActionRevokePrototype extends ConfigurationActionPrototype {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionRevokePrototype.Constants.ActionType | string;
  }
  export namespace PrivateCertificateConfigurationActionRevokePrototype {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The response body to specify the properties of the action to rotate the private certificate.
   */
  export interface PrivateCertificateConfigurationActionRotate extends ConfigurationAction {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionRotate.Constants.ActionType | string;
    /** The name of the intermediate certificate authority configuration. */
    name: string;
    /** The response body of the action to rotate an intermediate certificate authority for the private certificate
     *  configuration.
     */
    config: PrivateCertificateConfigurationRotateAction;
  }
  export namespace PrivateCertificateConfigurationActionRotate {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The response body of the action to rotate the CRL of an intermediate certificate authority for the private
   * certificate configuration.
   */
  export interface PrivateCertificateConfigurationActionRotateCRL extends ConfigurationAction {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionRotateCRL.Constants.ActionType | string;
    /** This field indicates whether the request to rotate the CRL for the private certificate configuration was
     *  successful.
     */
    success: boolean;
  }
  export namespace PrivateCertificateConfigurationActionRotateCRL {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The request body of the action to rotate the CRL of an intermediate certificate authority for the private
   * certificate configuration.
   */
  export interface PrivateCertificateConfigurationActionRotateCRLPrototype extends ConfigurationActionPrototype {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionRotateCRLPrototype.Constants.ActionType | string;
  }
  export namespace PrivateCertificateConfigurationActionRotateCRLPrototype {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The request body to specify the properties of the action to rotate an intermediate CA certificate.
   */
  export interface PrivateCertificateConfigurationActionRotatePrototype extends ConfigurationActionPrototype {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionRotatePrototype.Constants.ActionType | string;
  }
  export namespace PrivateCertificateConfigurationActionRotatePrototype {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The response body of the action to set a signed intermediate certificate authority for the private certificate
   * configuration.
   */
  export interface PrivateCertificateConfigurationActionSetSigned extends ConfigurationAction {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionSetSigned.Constants.ActionType | string;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
  }
  export namespace PrivateCertificateConfigurationActionSetSigned {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The request body of the action to set a signed intermediate certificate authority for the private certificate
   * consideration.
   */
  export interface PrivateCertificateConfigurationActionSetSignedPrototype extends ConfigurationActionPrototype {
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionSetSignedPrototype.Constants.ActionType | string;
    /** Your PEM-encoded certificate. The data must be formatted on a single line with embedded newline characters. */
    certificate: string;
  }
  export namespace PrivateCertificateConfigurationActionSetSignedPrototype {
    export namespace Constants {
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The response body of the action to sign the CSR for the private certificate configuration.
   */
  export interface PrivateCertificateConfigurationActionSignCSR extends ConfigurationAction {
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    format?: PrivateCertificateConfigurationActionSignCSR.Constants.Format | string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** This field indicates whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that is requested in the CSR are added to the basic set of key
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
    /** The requested value for the [`serialNumber`](https://datatracker.ietf.org/doc/html/rfc4519#section-2.31)
     *  attribute that is in the certificate's distinguished name (DN).
     *
     *  **Note:** This field is not related to the `serial_number` field that is returned in the API response. The
     *  `serial_number` field represents the certificate's randomly assigned serial number.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionSignCSR.Constants.ActionType | string;
    /** The certificate signing request. */
    csr: string;
    /** The data that is associated with the root certificate authority. */
    data?: PrivateCertificateConfigurationCACertificate;
  }
  export namespace PrivateCertificateConfigurationActionSignCSR {
    export namespace Constants {
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The request body to specify the properties of the action to sign a CSR for the private certificate configuration.
   */
  export interface PrivateCertificateConfigurationActionSignCSRPrototype extends ConfigurationActionPrototype {
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    format?: PrivateCertificateConfigurationActionSignCSRPrototype.Constants.Format | string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** This field indicates whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that is requested in the CSR are added to the basic set of key
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
    /** The requested value for the [`serialNumber`](https://datatracker.ietf.org/doc/html/rfc4519#section-2.31)
     *  attribute that is in the certificate's distinguished name (DN).
     *
     *  **Note:** This field is not related to the `serial_number` field that is returned in the API response. The
     *  `serial_number` field represents the certificate's randomly assigned serial number.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionSignCSRPrototype.Constants.ActionType | string;
    /** The certificate signing request. */
    csr: string;
  }
  export namespace PrivateCertificateConfigurationActionSignCSRPrototype {
    export namespace Constants {
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The response body of the action to sign the intermediate certificate authority for the private certificate
   * configuration.
   */
  export interface PrivateCertificateConfigurationActionSignIntermediate extends ConfigurationAction {
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    format?: PrivateCertificateConfigurationActionSignIntermediate.Constants.Format | string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** This field indicates whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that is requested in the CSR are added to the basic set of key
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
    /** The requested value for the [`serialNumber`](https://datatracker.ietf.org/doc/html/rfc4519#section-2.31)
     *  attribute that is in the certificate's distinguished name (DN).
     *
     *  **Note:** This field is not related to the `serial_number` field that is returned in the API response. The
     *  `serial_number` field represents the certificate's randomly assigned serial number.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionSignIntermediate.Constants.ActionType | string;
    /** The name of the intermediate certificate authority configuration. */
    intermediate_certificate_authority: string;
  }
  export namespace PrivateCertificateConfigurationActionSignIntermediate {
    export namespace Constants {
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The request body to specify the properties of the action to sign an intermediate certificate authority for the
   * private certificate configuration.
   */
  export interface PrivateCertificateConfigurationActionSignIntermediatePrototype extends ConfigurationActionPrototype {
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    format?: PrivateCertificateConfigurationActionSignIntermediatePrototype.Constants.Format | string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The allowed DNS domains or subdomains for the certificates that are to be signed and issued by this CA
     *  certificate.
     */
    permitted_dns_domains?: string[];
    /** This field indicates whether to use values from a certificate signing request (CSR) to complete a
     *  `private_cert_configuration_action_sign_csr` action. If it is set to `true`, then:
     *
     *  1) Subject information, including names and alternate names, are preserved from the CSR rather than by using the
     *  values that are provided in the other parameters to this operation.
     *
     *  2) Any key usage, for example, non-repudiation, that is requested in the CSR are added to the basic set of key
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
    /** The requested value for the [`serialNumber`](https://datatracker.ietf.org/doc/html/rfc4519#section-2.31)
     *  attribute that is in the certificate's distinguished name (DN).
     *
     *  **Note:** This field is not related to the `serial_number` field that is returned in the API response. The
     *  `serial_number` field represents the certificate's randomly assigned serial number.
     */
    serial_number?: string;
    /** The type of configuration action. */
    action_type: PrivateCertificateConfigurationActionSignIntermediatePrototype.Constants.ActionType | string;
    /** The name of the intermediate certificate authority configuration. */
    intermediate_certificate_authority: string;
  }
  export namespace PrivateCertificateConfigurationActionSignIntermediatePrototype {
    export namespace Constants {
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The type of configuration action. */
      export enum ActionType {
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_CRL = 'private_cert_configuration_action_rotate_crl',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_INTERMEDIATE = 'private_cert_configuration_action_sign_intermediate',
        PRIVATE_CERT_CONFIGURATION_ACTION_SIGN_CSR = 'private_cert_configuration_action_sign_csr',
        PRIVATE_CERT_CONFIGURATION_ACTION_SET_SIGNED = 'private_cert_configuration_action_set_signed',
        PRIVATE_CERT_CONFIGURATION_ACTION_REVOKE_CA_CERTIFICATE = 'private_cert_configuration_action_revoke_ca_certificate',
        PRIVATE_CERT_CONFIGURATION_ACTION_ROTATE_INTERMEDIATE = 'private_cert_configuration_action_rotate_intermediate',
      }
    }
  }

  /**
   * The data that is associated with the root certificate authority.
   */
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

  /**
   * The configuration of the root certificate authority.
   */
  export interface PrivateCertificateConfigurationIntermediateCA extends Configuration {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationIntermediateCA.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateConfigurationIntermediateCA.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationIntermediateCA.Constants.KeyType | string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The signing method to use with this certificate authority to generate private certificates.
     *
     *  You can choose between internal or externally signed options. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-intermediate-certificate-authorities).
     */
    signing_method: PrivateCertificateConfigurationIntermediateCA.Constants.SigningMethod | string;
    /** The status of the certificate authority. The status of a root certificate authority is either `configured`
     *  or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`,
     *  `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`.
     */
    status?: PrivateCertificateConfigurationIntermediateCA.Constants.Status | string;
    /** The data that is associated with a cryptographic key. */
    crypto_key?: PrivateCertificateCryptoKey;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA in seconds. */
    max_ttl_seconds?: number;
    /** The time until the certificate revocation list (CRL) expires, in seconds. */
    crl_expiry_seconds?: number;
    /** This field disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when you're downloading the CRL. If CRL
     *  building is enabled, it rebuilds the CRL.
     */
    crl_disable?: boolean;
    /** This field determines whether to encode the URL of the issuing certificate in the certificates that are
     *  issued by this certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    format?: PrivateCertificateConfigurationIntermediateCA.Constants.Format | string;
    /** The format of the generated private key. */
    private_key_format?: PrivateCertificateConfigurationIntermediateCA.Constants.PrivateKeyFormat | string;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
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
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The configuration data of your Private Certificate. */
    data?: PrivateCertificateCAData;
  }
  export namespace PrivateCertificateConfigurationIntermediateCA {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
      /** The signing method to use with this certificate authority to generate private certificates. You can choose between internal or externally signed options. For more information, see the [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-intermediate-certificate-authorities). */
      export enum SigningMethod {
        INTERNAL = 'internal',
        EXTERNAL = 'external',
      }
      /** The status of the certificate authority. The status of a root certificate authority is either `configured` or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`, `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`. */
      export enum Status {
        SIGNING_REQUIRED = 'signing_required',
        SIGNED_CERTIFICATE_REQUIRED = 'signed_certificate_required',
        CERTIFICATE_TEMPLATE_REQUIRED = 'certificate_template_required',
        CONFIGURED = 'configured',
        EXPIRED = 'expired',
        REVOKED = 'revoked',
      }
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The format of the generated private key. */
      export enum PrivateKeyFormat {
        DER = 'der',
        PKCS8 = 'pkcs8',
      }
    }
  }

  /**
   * The data that is associated with the intermediate certificate authority.
   */
  export interface PrivateCertificateConfigurationIntermediateCACSR extends PrivateCertificateCAData {
    /** The certificate signing request. */
    csr?: string;
    /** The PEM-encoded private key that is associated with the certificate. The data must be formatted on a single
     *  line with embedded newline characters.
     */
    private_key?: string;
    /** The type of private key to generate. */
    private_key_type?: PrivateCertificateConfigurationIntermediateCACSR.Constants.PrivateKeyType | string;
    /** The certificate expiration time. */
    expiration?: number;
  }
  export namespace PrivateCertificateConfigurationIntermediateCACSR {
    export namespace Constants {
      /** The type of private key to generate. */
      export enum PrivateKeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
    }
  }

  /**
   * The configuration of the metadata properties of the intermediate certificate authority.
   */
  export interface PrivateCertificateConfigurationIntermediateCAMetadata extends ConfigurationMetadata {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationIntermediateCAMetadata.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateConfigurationIntermediateCAMetadata.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationIntermediateCAMetadata.Constants.KeyType | string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The signing method to use with this certificate authority to generate private certificates.
     *
     *  You can choose between internal or externally signed options. For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-intermediate-certificate-authorities).
     */
    signing_method: PrivateCertificateConfigurationIntermediateCAMetadata.Constants.SigningMethod | string;
    /** The status of the certificate authority. The status of a root certificate authority is either `configured`
     *  or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`,
     *  `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`.
     */
    status?: PrivateCertificateConfigurationIntermediateCAMetadata.Constants.Status | string;
    /** The data that is associated with a cryptographic key. */
    crypto_key?: PrivateCertificateCryptoKey;
  }
  export namespace PrivateCertificateConfigurationIntermediateCAMetadata {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
      /** The signing method to use with this certificate authority to generate private certificates. You can choose between internal or externally signed options. For more information, see the [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-intermediate-certificate-authorities). */
      export enum SigningMethod {
        INTERNAL = 'internal',
        EXTERNAL = 'external',
      }
      /** The status of the certificate authority. The status of a root certificate authority is either `configured` or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`, `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`. */
      export enum Status {
        SIGNING_REQUIRED = 'signing_required',
        SIGNED_CERTIFICATE_REQUIRED = 'signed_certificate_required',
        CERTIFICATE_TEMPLATE_REQUIRED = 'certificate_template_required',
        CONFIGURED = 'configured',
        EXPIRED = 'expired',
        REVOKED = 'revoked',
      }
    }
  }

  /**
   * The configuration patch of the intermediate certificate authority.
   */
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
    /** This field disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when you're downloading the CRL. If CRL
     *  building is enabled, it rebuilds the CRL.
     */
    crl_disable?: boolean;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** This field determines whether to encode the URL of the issuing certificate in the certificates that are
     *  issued by this certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
  }

  /**
   * The configuration of the intermediate certificate authority.
   */
  export interface PrivateCertificateConfigurationIntermediateCAPrototype extends ConfigurationPrototype {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationIntermediateCAPrototype.Constants.ConfigType | string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The data that is associated with a cryptographic key. */
    crypto_key?: PrivateCertificateCryptoKey;
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
    signing_method: PrivateCertificateConfigurationIntermediateCAPrototype.Constants.SigningMethod | string;
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
    /** This field disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when you're downloading the CRL. If CRL
     *  building is enabled, it rebuilds the CRL.
     */
    crl_disable?: boolean;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** This field determines whether to encode the URL of the issuing certificate in the certificates that are
     *  issued by this certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    format?: PrivateCertificateConfigurationIntermediateCAPrototype.Constants.Format | string;
    /** The format of the generated private key. */
    private_key_format?: PrivateCertificateConfigurationIntermediateCAPrototype.Constants.PrivateKeyFormat | string;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationIntermediateCAPrototype.Constants.KeyType | string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
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
    /** The requested value for the [`serialNumber`](https://datatracker.ietf.org/doc/html/rfc4519#section-2.31)
     *  attribute that is in the certificate's distinguished name (DN).
     *
     *  **Note:** This field is not related to the `serial_number` field that is returned in the API response. The
     *  `serial_number` field represents the certificate's randomly assigned serial number.
     */
    serial_number?: string;
  }
  export namespace PrivateCertificateConfigurationIntermediateCAPrototype {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The signing method to use with this certificate authority to generate private certificates. You can choose between internal or externally signed options. For more information, see the [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-intermediate-certificate-authorities). */
      export enum SigningMethod {
        INTERNAL = 'internal',
        EXTERNAL = 'external',
      }
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The format of the generated private key. */
      export enum PrivateKeyFormat {
        DER = 'der',
        PKCS8 = 'pkcs8',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
    }
  }

  /**
   * The root certificate authority .
   */
  export interface PrivateCertificateConfigurationRootCA extends Configuration {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationRootCA.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateConfigurationRootCA.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationRootCA.Constants.KeyType | string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The status of the certificate authority. The status of a root certificate authority is either `configured`
     *  or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`,
     *  `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`.
     */
    status?: PrivateCertificateConfigurationRootCA.Constants.Status | string;
    /** The data that is associated with a cryptographic key. */
    crypto_key?: PrivateCertificateCryptoKey;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA in seconds. */
    max_ttl_seconds?: number;
    /** The time until the certificate revocation list (CRL) expires, in seconds. */
    crl_expiry_seconds?: number;
    /** This field disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when you're downloading the CRL. If CRL
     *  building is enabled, it rebuilds the CRL.
     */
    crl_disable?: boolean;
    /** This field determines whether to encode the URL of the issuing certificate in the certificates that are
     *  issued by this certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    /** he requested TTL, after which the certificate expires. */
    ttl_seconds?: number;
    /** The format of the returned data. */
    format?: PrivateCertificateConfigurationRootCA.Constants.Format | string;
    /** The format of the generated private key. */
    private_key_format?: PrivateCertificateConfigurationRootCA.Constants.PrivateKeyFormat | string;
    /** The maximum path length to encode in the generated certificate. `-1` means no limit.
     *
     *  If the signing certificate has a maximum path length set, the path length is set to one less than that of the
     *  signing certificate. A limit of `0` means a literal path length of zero.
     */
    max_path_length?: number;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
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
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The configuration data of your Private Certificate. */
    data?: PrivateCertificateCAData;
  }
  export namespace PrivateCertificateConfigurationRootCA {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
      /** The status of the certificate authority. The status of a root certificate authority is either `configured` or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`, `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`. */
      export enum Status {
        SIGNING_REQUIRED = 'signing_required',
        SIGNED_CERTIFICATE_REQUIRED = 'signed_certificate_required',
        CERTIFICATE_TEMPLATE_REQUIRED = 'certificate_template_required',
        CONFIGURED = 'configured',
        EXPIRED = 'expired',
        REVOKED = 'revoked',
      }
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The format of the generated private key. */
      export enum PrivateKeyFormat {
        DER = 'der',
        PKCS8 = 'pkcs8',
      }
    }
  }

  /**
   * The configuration of the metadata properties of the root certificate authority.
   */
  export interface PrivateCertificateConfigurationRootCAMetadata extends ConfigurationMetadata {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationRootCAMetadata.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateConfigurationRootCAMetadata.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationRootCAMetadata.Constants.KeyType | string;
    /** The number of bits to use to generate the private key.
     *
     *  Allowable values for RSA keys are: `2048` and `4096`. Allowable values for EC keys are: `224`, `256`, `384`, and
     *  `521`. The default for RSA keys is `2048`. The default for EC keys is `256`.
     */
    key_bits?: number;
    /** The status of the certificate authority. The status of a root certificate authority is either `configured`
     *  or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`,
     *  `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`.
     */
    status?: PrivateCertificateConfigurationRootCAMetadata.Constants.Status | string;
    /** The data that is associated with a cryptographic key. */
    crypto_key?: PrivateCertificateCryptoKey;
  }
  export namespace PrivateCertificateConfigurationRootCAMetadata {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
      /** The status of the certificate authority. The status of a root certificate authority is either `configured` or `expired`. For intermediate certificate authorities, possible statuses include `signing_required`, `signed_certificate_required`, `certificate_template_required`, `configured`, `expired` or `revoked`. */
      export enum Status {
        SIGNING_REQUIRED = 'signing_required',
        SIGNED_CERTIFICATE_REQUIRED = 'signed_certificate_required',
        CERTIFICATE_TEMPLATE_REQUIRED = 'certificate_template_required',
        CONFIGURED = 'configured',
        EXPIRED = 'expired',
        REVOKED = 'revoked',
      }
    }
  }

  /**
   * The configuration of the metadata patch for the root certificate authority.
   */
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
    /** This field disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when you're downloading the CRL. If CRL
     *  building is enabled, it rebuilds the CRL.
     */
    crl_disable?: boolean;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** This field determines whether to encode the URL of the issuing certificate in the certificates that are
     *  issued by this certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
  }

  /**
   * The configuration of the root certificate authority.
   */
  export interface PrivateCertificateConfigurationRootCAPrototype extends ConfigurationPrototype {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationRootCAPrototype.Constants.ConfigType | string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The data that is associated with a cryptographic key. */
    crypto_key?: PrivateCertificateCryptoKey;
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
    /** This field disables or enables certificate revocation list (CRL) building.
     *
     *  If CRL building is disabled, a signed but zero-length CRL is returned when you're downloading the CRL. If CRL
     *  building is enabled, it rebuilds the CRL.
     */
    crl_disable?: boolean;
    /** This field determines whether to encode the certificate revocation list (CRL) distribution points in the
     *  certificates that are issued by this certificate authority.
     */
    crl_distribution_points_encoded?: boolean;
    /** This field determines whether to encode the URL of the issuing certificate in the certificates that are
     *  issued by this certificate authority.
     */
    issuing_certificates_urls_encoded?: boolean;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    /** The requested time-to-live (TTL) for certificates that are created by this CA. This field's value can't be
     *  longer than the `max_ttl` limit.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     */
    ttl?: string;
    /** The format of the returned data. */
    format?: PrivateCertificateConfigurationRootCAPrototype.Constants.Format | string;
    /** The format of the generated private key. */
    private_key_format?: PrivateCertificateConfigurationRootCAPrototype.Constants.PrivateKeyFormat | string;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationRootCAPrototype.Constants.KeyType | string;
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
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
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
    /** The requested value for the [`serialNumber`](https://datatracker.ietf.org/doc/html/rfc4519#section-2.31)
     *  attribute that is in the certificate's distinguished name (DN).
     *
     *  **Note:** This field is not related to the `serial_number` field that is returned in the API response. The
     *  `serial_number` field represents the certificate's randomly assigned serial number.
     */
    serial_number?: string;
  }
  export namespace PrivateCertificateConfigurationRootCAPrototype {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The format of the generated private key. */
      export enum PrivateKeyFormat {
        DER = 'der',
        PKCS8 = 'pkcs8',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
    }
  }

  /**
   * The configuration of the private certificate template.
   */
  export interface PrivateCertificateConfigurationTemplate extends Configuration {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationTemplate.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateConfigurationTemplate.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The name of the intermediate certificate authority. */
    certificate_authority: string;
    /** This field scopes the creation of private certificates to only the secret groups that you specify.
     *
     *  This field can be supplied as a comma-delimited list of secret group IDs.
     */
    allowed_secret_groups?: string;
    /** The maximum time-to-live (TTL) for certificates that are created by this CA in seconds. */
    max_ttl_seconds?: number;
    /** he requested TTL, after which the certificate expires. */
    ttl_seconds?: number;
    /** This field indicates whether to allow `localhost` to be included as one of the requested common names. */
    allow_localhost?: boolean;
    /** The domains to define for the certificate template. This property is used along with the
     *  `allow_bare_domains` and `allow_subdomains` options.
     */
    allowed_domains?: string[];
    /** This field indicates whether to allow the domains that are supplied in the `allowed_domains` field to
     *  contain access control list (ACL) templates.
     */
    allowed_domains_template?: boolean;
    /** This field indicates whether to allow clients to request private certificates that match the value of the
     *  actual domains on the final certificate.
     *
     *  For example, if you specify `example.com` in the `allowed_domains` field, you grant clients the ability to
     *  request a certificate that contains the name `example.com` as one of the DNS values on the final certificate.
     *
     *  **Important:** In some scenarios, allowing bare domains can be considered a security risk.
     */
    allow_bare_domains?: boolean;
    /** This field indicates whether to allow clients to request private certificates with common names (CN) that
     *  are subdomains of the CNs that are allowed by the other certificate template options. This includes wildcard
     *  subdomains.
     *
     *  For example, if `allowed_domains` has a value of `example.com` and `allow_subdomains`is set to `true`, then the
     *  following subdomains are allowed: `foo.example.com`, `bar.example.com`, `*.example.com`.
     *
     *  **Note:** This field is redundant if you use the `allow_any_name` option.
     */
    allow_subdomains?: boolean;
    /** This field indicates whether to allow glob patterns, for example, `ftp*.example.com`, in the names that are
     *  specified in the `allowed_domains` field.
     *
     *  If set to `true`, clients are allowed to request private certificates with names that match the glob patterns.
     */
    allow_glob_domains?: boolean;
    /** This field indicates whether to allow clients to request a private certificate that matches any common name. */
    allow_any_name?: boolean;
    /** This field indicates whether to enforce only valid hostnames for common names, DNS Subject Alternative
     *  Names, and the host section of email addresses.
     */
    enforce_hostnames?: boolean;
    /** This field indicates whether to allow clients to request a private certificate with IP Subject Alternative
     *  Names.
     */
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
    /** This field indicates whether private certificates are flagged for server use. */
    server_flag?: boolean;
    /** This field indicates whether private certificates are flagged for client use. */
    client_flag?: boolean;
    /** This field indicates whether private certificates are flagged for code signing use. */
    code_signing_flag?: boolean;
    /** This field indicates whether private certificates are flagged for email protection use. */
    email_protection_flag?: boolean;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationTemplate.Constants.KeyType | string;
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
     *  the common name (CN) from a certificate signing request (CSR) instead of the CN that is included in the data of
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
     *  This field does not include the common name in the CSR. To use the common name, include the
     *  `use_csr_common_name` property.
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
    /** This field is deprecated. You can ignore its value. */
    serial_number?: string;
    /** This field indicates whether to require a common name to create a private certificate.
     *
     *  By default, a common name is required to generate a certificate. To make the `common_name` field optional, set
     *  the `require_cn` option to `false`.
     */
    require_cn?: boolean;
    /** A list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string[];
    /** This field indicates whether to mark the Basic Constraints extension of an issued private certificate as
     *  valid for non-CA certificates.
     */
    basic_constraints_valid_for_non_ca?: boolean;
    /** The duration in seconds by which to backdate the `not_before` property of an issued private certificate. */
    not_before_duration_seconds?: number;
  }
  export namespace PrivateCertificateConfigurationTemplate {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
    }
  }

  /**
   * The metadata properties of the configuration of the private certificate template.
   */
  export interface PrivateCertificateConfigurationTemplateMetadata extends ConfigurationMetadata {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationTemplateMetadata.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateConfigurationTemplateMetadata.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The name of the intermediate certificate authority. */
    certificate_authority: string;
  }
  export namespace PrivateCertificateConfigurationTemplateMetadata {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Properties that describe a certificate template. You can use a certificate template to control the parameters that
   * are applied to your issued private certificates. For more information, see the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-certificate-templates).
   */
  export interface PrivateCertificateConfigurationTemplatePatch extends ConfigurationPatch {
    /** This field scopes the creation of private certificates to only the secret groups that you specify.
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
    /** The requested time-to-live (TTL) for certificates that are created by this CA. This field's value can't be
     *  longer than the `max_ttl` limit.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     */
    ttl?: string;
    /** This field indicates whether to allow `localhost` to be included as one of the requested common names. */
    allow_localhost?: boolean;
    /** The domains to define for the certificate template. This property is used along with the
     *  `allow_bare_domains` and `allow_subdomains` options.
     */
    allowed_domains?: string[];
    /** This field indicates whether to allow the domains that are supplied in the `allowed_domains` field to
     *  contain access control list (ACL) templates.
     */
    allowed_domains_template?: boolean;
    /** This field indicates whether to allow clients to request private certificates that match the value of the
     *  actual domains on the final certificate.
     *
     *  For example, if you specify `example.com` in the `allowed_domains` field, you grant clients the ability to
     *  request a certificate that contains the name `example.com` as one of the DNS values on the final certificate.
     *
     *  **Important:** In some scenarios, allowing bare domains can be considered a security risk.
     */
    allow_bare_domains?: boolean;
    /** This field indicates whether to allow clients to request private certificates with common names (CN) that
     *  are subdomains of the CNs that are allowed by the other certificate template options. This includes wildcard
     *  subdomains.
     *
     *  For example, if `allowed_domains` has a value of `example.com` and `allow_subdomains`is set to `true`, then the
     *  following subdomains are allowed: `foo.example.com`, `bar.example.com`, `*.example.com`.
     *
     *  **Note:** This field is redundant if you use the `allow_any_name` option.
     */
    allow_subdomains?: boolean;
    /** This field indicates whether to allow glob patterns, for example, `ftp*.example.com`, in the names that are
     *  specified in the `allowed_domains` field.
     *
     *  If set to `true`, clients are allowed to request private certificates with names that match the glob patterns.
     */
    allow_glob_domains?: boolean;
    /** This field indicates whether to allow clients to request a private certificate that matches any common name. */
    allow_any_name?: boolean;
    /** This field indicates whether to enforce only valid hostnames for common names, DNS Subject Alternative
     *  Names, and the host section of email addresses.
     */
    enforce_hostnames?: boolean;
    /** This field indicates whether to allow clients to request a private certificate with IP Subject Alternative
     *  Names.
     */
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
    /** This field indicates whether private certificates are flagged for server use. */
    server_flag?: boolean;
    /** This field indicates whether private certificates are flagged for client use. */
    client_flag?: boolean;
    /** This field indicates whether private certificates are flagged for code signing use. */
    code_signing_flag?: boolean;
    /** This field indicates whether private certificates are flagged for email protection use. */
    email_protection_flag?: boolean;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationTemplatePatch.Constants.KeyType | string;
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
     *  the common name (CN) from a certificate signing request (CSR) instead of the CN that is included in the data of
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
     *  This field does not include the common name in the CSR. To use the common name, include the
     *  `use_csr_common_name` property.
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
    /** This field is deprecated. You can ignore its value. */
    serial_number?: string;
    /** This field indicates whether to require a common name to create a private certificate.
     *
     *  By default, a common name is required to generate a certificate. To make the `common_name` field optional, set
     *  the `require_cn` option to `false`.
     */
    require_cn?: boolean;
    /** A list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string[];
    /** This field indicates whether to mark the Basic Constraints extension of an issued private certificate as
     *  valid for non-CA certificates.
     */
    basic_constraints_valid_for_non_ca?: boolean;
    /** The duration in seconds by which to backdate the `not_before` property of an issued private certificate.
     *
     *  The value can be supplied as a string representation of a duration, such as `30s`. In the API response, this
     *  value is returned in seconds (integer).
     */
    not_before_duration?: string;
  }
  export namespace PrivateCertificateConfigurationTemplatePatch {
    export namespace Constants {
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
    }
  }

  /**
   * Properties that describe a certificate template. You can use a certificate template to control the parameters that
   * are applied to your issued private certificates. For more information, see the
   * [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-certificate-templates).
   */
  export interface PrivateCertificateConfigurationTemplatePrototype extends ConfigurationPrototype {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PrivateCertificateConfigurationTemplatePrototype.Constants.ConfigType | string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The name of the intermediate certificate authority. */
    certificate_authority: string;
    /** This field scopes the creation of private certificates to only the secret groups that you specify.
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
    /** The requested time-to-live (TTL) for certificates that are created by this CA. This field's value can't be
     *  longer than the `max_ttl` limit.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '8760h'. In the API
     *  response, this value is returned in seconds (integer).
     */
    ttl?: string;
    /** This field indicates whether to allow `localhost` to be included as one of the requested common names. */
    allow_localhost?: boolean;
    /** The domains to define for the certificate template. This property is used along with the
     *  `allow_bare_domains` and `allow_subdomains` options.
     */
    allowed_domains?: string[];
    /** This field indicates whether to allow the domains that are supplied in the `allowed_domains` field to
     *  contain access control list (ACL) templates.
     */
    allowed_domains_template?: boolean;
    /** This field indicates whether to allow clients to request private certificates that match the value of the
     *  actual domains on the final certificate.
     *
     *  For example, if you specify `example.com` in the `allowed_domains` field, you grant clients the ability to
     *  request a certificate that contains the name `example.com` as one of the DNS values on the final certificate.
     *
     *  **Important:** In some scenarios, allowing bare domains can be considered a security risk.
     */
    allow_bare_domains?: boolean;
    /** This field indicates whether to allow clients to request private certificates with common names (CN) that
     *  are subdomains of the CNs that are allowed by the other certificate template options. This includes wildcard
     *  subdomains.
     *
     *  For example, if `allowed_domains` has a value of `example.com` and `allow_subdomains`is set to `true`, then the
     *  following subdomains are allowed: `foo.example.com`, `bar.example.com`, `*.example.com`.
     *
     *  **Note:** This field is redundant if you use the `allow_any_name` option.
     */
    allow_subdomains?: boolean;
    /** This field indicates whether to allow glob patterns, for example, `ftp*.example.com`, in the names that are
     *  specified in the `allowed_domains` field.
     *
     *  If set to `true`, clients are allowed to request private certificates with names that match the glob patterns.
     */
    allow_glob_domains?: boolean;
    /** This field indicates whether the issuance of certificates with RFC 6125 wildcards in the CN field.
     *
     *  When set to false, this field prevents wildcards from being issued even if they can be allowed by an option
     *  `allow_glob_domains`.
     */
    allow_wildcard_certificates?: boolean;
    /** This field indicates whether to allow clients to request a private certificate that matches any common name. */
    allow_any_name?: boolean;
    /** This field indicates whether to enforce only valid hostnames for common names, DNS Subject Alternative
     *  Names, and the host section of email addresses.
     */
    enforce_hostnames?: boolean;
    /** This field indicates whether to allow clients to request a private certificate with IP Subject Alternative
     *  Names.
     */
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
    /** This field indicates whether private certificates are flagged for server use. */
    server_flag?: boolean;
    /** This field indicates whether private certificates are flagged for client use. */
    client_flag?: boolean;
    /** This field indicates whether private certificates are flagged for code signing use. */
    code_signing_flag?: boolean;
    /** This field indicates whether private certificates are flagged for email protection use. */
    email_protection_flag?: boolean;
    /** The type of private key to generate. */
    key_type?: PrivateCertificateConfigurationTemplatePrototype.Constants.KeyType | string;
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
     *  the common name (CN) from a certificate signing request (CSR) instead of the CN that is included in the data of
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
     *  This field does not include the common name in the CSR. To use the common name, include the
     *  `use_csr_common_name` property.
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
    /** This field is deprecated. You can ignore its value. */
    serial_number?: string;
    /** This field indicates whether to require a common name to create a private certificate.
     *
     *  By default, a common name is required to generate a certificate. To make the `common_name` field optional, set
     *  the `require_cn` option to `false`.
     */
    require_cn?: boolean;
    /** A list of policy Object Identifiers (OIDs). */
    policy_identifiers?: string[];
    /** This field indicates whether to mark the Basic Constraints extension of an issued private certificate as
     *  valid for non-CA certificates.
     */
    basic_constraints_valid_for_non_ca?: boolean;
    /** The duration in seconds by which to backdate the `not_before` property of an issued private certificate.
     *
     *  The value can be supplied as a string representation of a duration, such as `30s`. In the API response, this
     *  value is returned in seconds (integer).
     */
    not_before_duration?: string;
  }
  export namespace PrivateCertificateConfigurationTemplatePrototype {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The type of private key to generate. */
      export enum KeyType {
        RSA = 'rsa',
        EC = 'ec',
      }
    }
  }

  /**
   * The data that is associated with Hyper Protect Crypto Services as the cryptographic provider.
   */
  export interface PrivateCertificateCryptoProviderHPCS extends PrivateCertificateCryptoProvider {
    /** The type of cryptographic provider. */
    type: PrivateCertificateCryptoProviderHPCS.Constants.Type | string;
    /** The HPCS instance CRN. */
    instance_crn: string;
    /** The secret Id of iam credentials with api key to access HPCS instance. */
    pin_iam_credentials_secret_id: string;
    /** The HPCS private key store space id. */
    private_keystore_id: string;
  }
  export namespace PrivateCertificateCryptoProviderHPCS {
    export namespace Constants {
      /** The type of cryptographic provider. */
      export enum Type {
        HYPER_PROTECT_CRYPTO_SERVICES = 'hyper_protect_crypto_services',
      }
    }
  }

  /**
   * Properties of the metadata of your private certificate.
   */
  export interface PrivateCertificateMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: PrivateCertificateMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The identifier for the cryptographic algorithm that is used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The intermediate certificate authority that signed this certificate. */
    certificate_authority?: string;
    /** The name of the certificate template. */
    certificate_template: string;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
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
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
    /** The date and time that the certificate was revoked. The date format follows `RFC 3339`. */
    revocation_time_rfc3339?: string;
  }
  export namespace PrivateCertificateMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * PrivateCertificateMetadataPatch.
   */
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
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
  }

  /**
   * PrivateCertificatePrototype.
   */
  export interface PrivateCertificatePrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificatePrototype.Constants.SecretType | string;
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
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The name of the certificate template. */
    certificate_template: string;
    /** The Common Name (CN) represents the server name that is protected by the SSL certificate. */
    common_name: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
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
    format?: PrivateCertificatePrototype.Constants.Format | string;
    /** The format of the generated private key. */
    private_key_format?: PrivateCertificatePrototype.Constants.PrivateKeyFormat | string;
    /** This parameter controls whether the common name is excluded from Subject Alternative Names (SANs).
     *
     *  If the common name is set to `true`, it is not included in DNS, or email SANs if they apply. This field can be
     *  useful if the common name is a human-readable identifier, instead of a hostname or an email address.
     */
    exclude_cn_from_sans?: boolean;
    /** The time-to-live (TTL) to assign to a private certificate.
     *
     *  The value can be supplied as a string representation of a duration in hours, for example '12h'. The value can't
     *  exceed the `max_ttl` that is defined in the associated certificate template.
     */
    ttl?: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }
  export namespace PrivateCertificatePrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The format of the returned data. */
      export enum Format {
        PEM = 'pem',
        PEM_BUNDLE = 'pem_bundle',
      }
      /** The format of the generated private key. */
      export enum PrivateKeyFormat {
        DER = 'der',
        PKCS8 = 'pkcs8',
      }
    }
  }

  /**
   * Your private certificate version.
   */
  export interface PrivateCertificateVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: PrivateCertificateVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
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
  export namespace PrivateCertificateVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * The response body to specify the properties of the action to revoke the private certificate.
   */
  export interface PrivateCertificateVersionActionRevoke extends VersionAction {
    /** The type of secret version action. */
    action_type: PrivateCertificateVersionActionRevoke.Constants.ActionType | string;
    /** The timestamp of the certificate revocation. */
    revocation_time_seconds?: number;
  }
  export namespace PrivateCertificateVersionActionRevoke {
    export namespace Constants {
      /** The type of secret version action. */
      export enum ActionType {
        PRIVATE_CERT_ACTION_REVOKE_CERTIFICATE = 'private_cert_action_revoke_certificate',
      }
    }
  }

  /**
   * The request body to specify the properties of the action to revoke the private certificate.
   */
  export interface PrivateCertificateVersionActionRevokePrototype extends SecretVersionActionPrototype {
    /** The type of secret version action. */
    action_type: PrivateCertificateVersionActionRevokePrototype.Constants.ActionType | string;
  }
  export namespace PrivateCertificateVersionActionRevokePrototype {
    export namespace Constants {
      /** The type of secret version action. */
      export enum ActionType {
        PRIVATE_CERT_ACTION_REVOKE_CERTIFICATE = 'private_cert_action_revoke_certificate',
      }
    }
  }

  /**
   * Properties of the version metadata of your private certificate.
   */
  export interface PrivateCertificateVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PrivateCertificateVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: PrivateCertificateVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity: CertificateValidity;
  }
  export namespace PrivateCertificateVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * PrivateCertificateVersionPrototype.
   */
  export interface PrivateCertificateVersionPrototype extends SecretVersionPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** The certificate signing request. */
    csr?: string;
  }

  /**
   * Your public certificate.
   */
  export interface PublicCertificate extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificate.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: PublicCertificate.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The identifier for the cryptographic algorithm that is used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** Issuance information that is associated with your certificate. */
    issuance_info?: CertificateIssuanceInfo;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The identifier for the cryptographic algorithm that is used to generate the public key that is associated
     *  with the certificate.
     *
     *  The algorithm that you select determines the encryption algorithm (`RSA` or `ECDSA`) and key size to be used to
     *  generate keys and sign certificates. For longer living certificates, it is recommended to use longer keys to
     *  provide more encryption protection. Allowed values:  `RSA2048`, `RSA4096`, `ECDSA256`, and `ECDSA384`.
     */
    key_algorithm: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation: RotationPolicy;
    /** Indicates whether the issued certificate is bundled with intermediate certificates. */
    bundle_certs?: boolean;
    /** The name of the certificate authority configuration. */
    ca?: string;
    /** The name of the DNS provider configuration. */
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
  export namespace PublicCertificate {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * The response body of the action to validate manual DNS challenges for the public certificate.
   */
  export interface PublicCertificateActionValidateManualDNS extends SecretAction {
    /** The type of secret action. */
    action_type: PublicCertificateActionValidateManualDNS.Constants.ActionType | string;
  }
  export namespace PublicCertificateActionValidateManualDNS {
    export namespace Constants {
      /** The type of secret action. */
      export enum ActionType {
        PUBLIC_CERT_ACTION_VALIDATE_DNS_CHALLENGE = 'public_cert_action_validate_dns_challenge',
        PRIVATE_CERT_ACTION_REVOKE_CERTIFICATE = 'private_cert_action_revoke_certificate',
      }
    }
  }

  /**
   * The request body to specify the properties of the action to validate manual DNS challenges for the public
   * certificate.
   */
  export interface PublicCertificateActionValidateManualDNSPrototype extends SecretActionPrototype {
    /** The type of secret action. */
    action_type: PublicCertificateActionValidateManualDNSPrototype.Constants.ActionType | string;
  }
  export namespace PublicCertificateActionValidateManualDNSPrototype {
    export namespace Constants {
      /** The type of secret action. */
      export enum ActionType {
        PUBLIC_CERT_ACTION_VALIDATE_DNS_CHALLENGE = 'public_cert_action_validate_dns_challenge',
        PRIVATE_CERT_ACTION_REVOKE_CERTIFICATE = 'private_cert_action_revoke_certificate',
      }
    }
  }

  /**
   * Properties that describe a Let's Encrypt CA configuration.
   */
  export interface PublicCertificateConfigurationCALetsEncrypt extends Configuration {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationCALetsEncrypt.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateConfigurationCALetsEncrypt.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The configuration of the Let's Encrypt CA environment. */
    lets_encrypt_environment: PublicCertificateConfigurationCALetsEncrypt.Constants.LetsEncryptEnvironment | string;
    /** This field supports only the chains that Let's Encrypt provides. Keep empty to use the default or supply a
     *  valid Let's Encrypt-provided value. For a list of supported chains, see: https://letsencrypt.org/certificates/.
     */
    lets_encrypt_preferred_chain?: string;
    /** The PEM-encoded private key of your Let's Encrypt account. The data must be formatted on a single line with
     *  embedded newline characters.
     */
    lets_encrypt_private_key: string;
  }
  export namespace PublicCertificateConfigurationCALetsEncrypt {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The configuration of the Let's Encrypt CA environment. */
      export enum LetsEncryptEnvironment {
        PRODUCTION = 'production',
        STAGING = 'staging',
      }
    }
  }

  /**
   * Your Let's Encrypt CA metadata properties.
   */
  export interface PublicCertificateConfigurationCALetsEncryptMetadata extends ConfigurationMetadata {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationCALetsEncryptMetadata.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateConfigurationCALetsEncryptMetadata.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The configuration of the Let's Encrypt CA environment. */
    lets_encrypt_environment: PublicCertificateConfigurationCALetsEncryptMetadata.Constants.LetsEncryptEnvironment | string;
    /** This field supports only the chains that Let's Encrypt provides. Keep empty to use the default or supply a
     *  valid Let's Encrypt-provided value. For a list of supported chains, see: https://letsencrypt.org/certificates/.
     */
    lets_encrypt_preferred_chain?: string;
  }
  export namespace PublicCertificateConfigurationCALetsEncryptMetadata {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** The configuration of the Let's Encrypt CA environment. */
      export enum LetsEncryptEnvironment {
        PRODUCTION = 'production',
        STAGING = 'staging',
      }
    }
  }

  /**
   * The configuration update of the Let's Encrypt Certificate Authority.
   */
  export interface PublicCertificateConfigurationCALetsEncryptPatch extends ConfigurationPatch {
    /** The configuration of the Let's Encrypt CA environment. */
    lets_encrypt_environment: PublicCertificateConfigurationCALetsEncryptPatch.Constants.LetsEncryptEnvironment | string;
    /** The PEM-encoded private key of your Let's Encrypt account. The data must be formatted on a single line with
     *  embedded newline characters.
     */
    lets_encrypt_private_key?: string;
    /** This field supports only the chains that Let's Encrypt provides. Keep empty to use the default or supply a
     *  valid Let's Encrypt-provided value. For a list of supported chains, see: https://letsencrypt.org/certificates/.
     */
    lets_encrypt_preferred_chain?: string;
  }
  export namespace PublicCertificateConfigurationCALetsEncryptPatch {
    export namespace Constants {
      /** The configuration of the Let's Encrypt CA environment. */
      export enum LetsEncryptEnvironment {
        PRODUCTION = 'production',
        STAGING = 'staging',
      }
    }
  }

  /**
   * The properties of the Let's Encrypt CA configuration.
   */
  export interface PublicCertificateConfigurationCALetsEncryptPrototype extends ConfigurationPrototype {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationCALetsEncryptPrototype.Constants.ConfigType | string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** The configuration of the Let's Encrypt CA environment. */
    lets_encrypt_environment: PublicCertificateConfigurationCALetsEncryptPrototype.Constants.LetsEncryptEnvironment | string;
    /** The PEM-encoded private key of your Let's Encrypt account. The data must be formatted on a single line with
     *  embedded newline characters.
     */
    lets_encrypt_private_key: string;
    /** This field supports only the chains that Let's Encrypt provides. Keep empty to use the default or supply a
     *  valid Let's Encrypt-provided value. For a list of supported chains, see: https://letsencrypt.org/certificates/.
     */
    lets_encrypt_preferred_chain?: string;
  }
  export namespace PublicCertificateConfigurationCALetsEncryptPrototype {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The configuration of the Let's Encrypt CA environment. */
      export enum LetsEncryptEnvironment {
        PRODUCTION = 'production',
        STAGING = 'staging',
      }
    }
  }

  /**
   * Properties that describe a Classic Infrastructure DNS configuration.
   */
  export interface PublicCertificateConfigurationDNSClassicInfrastructure extends Configuration {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationDNSClassicInfrastructure.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateConfigurationDNSClassicInfrastructure.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
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
  export namespace PublicCertificateConfigurationDNSClassicInfrastructure {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Your Classic Infrastructure DNS metadata properties.
   */
  export interface PublicCertificateConfigurationDNSClassicInfrastructureMetadata extends ConfigurationMetadata {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationDNSClassicInfrastructureMetadata.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateConfigurationDNSClassicInfrastructureMetadata.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
  }
  export namespace PublicCertificateConfigurationDNSClassicInfrastructureMetadata {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Properties that describe the configuration update of an IBM Cloud classic infrastructure (SoftLayer).
   */
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

  /**
   * PublicCertificateConfigurationDNSClassicInfrastructurePrototype.
   */
  export interface PublicCertificateConfigurationDNSClassicInfrastructurePrototype extends ConfigurationPrototype {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationDNSClassicInfrastructurePrototype.Constants.ConfigType | string;
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
  export namespace PublicCertificateConfigurationDNSClassicInfrastructurePrototype {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
    }
  }

  /**
   * Properties that describe a Cloud Internet Services DNS configuration.
   */
  export interface PublicCertificateConfigurationDNSCloudInternetServices extends Configuration {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationDNSCloudInternetServices.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateConfigurationDNSCloudInternetServices.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** An IBM Cloud API key that can list domains in your Cloud Internet Services instance and add DNS records.
     *
     *  To grant Secrets Manager the ability to view the Cloud Internet Services instance and all of its domains, the
     *  API key must be assigned the Reader service role on Internet Services (`internet-svcs`). In order to add DNS
     *  records you need to assign the Manager role.
     *
     *  If you want to manage specific domains, you can assign the Manager role for this specific domain.  For
     *  production environments, it is recommended that you assign the Reader access role, and then use the
     *  [IAM Policy Management API](https://cloud.ibm.com/apidocs/iam-policy-management#create-policy) to control
     *  specific domains.
     *
     *  If an IBM Cloud API key value is empty Secrets Manager tries to access your Cloud Internet Services instance
     *  with service-to-service authorization.
     *
     *  For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#authorize-cis).
     */
    cloud_internet_services_apikey?: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    cloud_internet_services_crn: string;
  }
  export namespace PublicCertificateConfigurationDNSCloudInternetServices {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Your Cloud Internet Services DNS metadata properties.
   */
  export interface PublicCertificateConfigurationDNSCloudInternetServicesMetadata extends ConfigurationMetadata {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationDNSCloudInternetServicesMetadata.Constants.ConfigType | string;
    /** The unique name of your configuration. */
    name: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateConfigurationDNSCloudInternetServicesMetadata.Constants.SecretType | string;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
  }
  export namespace PublicCertificateConfigurationDNSCloudInternetServicesMetadata {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * The configuration update of the Cloud Internet Services DNS.
   */
  export interface PublicCertificateConfigurationDNSCloudInternetServicesPatch extends ConfigurationPatch {
    /** An IBM Cloud API key that can list domains in your Cloud Internet Services instance and add DNS records.
     *
     *  To grant Secrets Manager the ability to view the Cloud Internet Services instance and all of its domains, the
     *  API key must be assigned the Reader service role on Internet Services (`internet-svcs`). In order to add DNS
     *  records you need to assign the Manager role.
     *
     *  If you want to manage specific domains, you can assign the Manager role for this specific domain.  For
     *  production environments, it is recommended that you assign the Reader access role, and then use the
     *  [IAM Policy Management API](https://cloud.ibm.com/apidocs/iam-policy-management#create-policy) to control
     *  specific domains.
     *
     *  If an IBM Cloud API key value is empty Secrets Manager tries to access your Cloud Internet Services instance
     *  with service-to-service authorization.
     *
     *  For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#authorize-cis).
     */
    cloud_internet_services_apikey: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    cloud_internet_services_crn?: string;
  }

  /**
   * Specify the properties for Cloud Internet Services DNS configuration.
   */
  export interface PublicCertificateConfigurationDNSCloudInternetServicesPrototype extends ConfigurationPrototype {
    /** The configuration type. Can be one of: iam_credentials_configuration,
     *  public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure,
     *  public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca,
     *  private_cert_configuration_intermediate_ca, private_cert_configuration_template.
     */
    config_type: PublicCertificateConfigurationDNSCloudInternetServicesPrototype.Constants.ConfigType | string;
    /** A human-readable unique name to assign to your configuration.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as an name for your secret.
     */
    name: string;
    /** An IBM Cloud API key that can list domains in your Cloud Internet Services instance and add DNS records.
     *
     *  To grant Secrets Manager the ability to view the Cloud Internet Services instance and all of its domains, the
     *  API key must be assigned the Reader service role on Internet Services (`internet-svcs`). In order to add DNS
     *  records you need to assign the Manager role.
     *
     *  If you want to manage specific domains, you can assign the Manager role for this specific domain.  For
     *  production environments, it is recommended that you assign the Reader access role, and then use the
     *  [IAM Policy Management API](https://cloud.ibm.com/apidocs/iam-policy-management#create-policy) to control
     *  specific domains.
     *
     *  If an IBM Cloud API key value is empty Secrets Manager tries to access your Cloud Internet Services instance
     *  with service-to-service authorization.
     *
     *  For more information, see the
     *  [docs](https://cloud.ibm.com/docs/secrets-manager?topic=secrets-manager-prepare-order-certificates#authorize-cis).
     */
    cloud_internet_services_apikey?: string;
    /** A CRN that uniquely identifies an IBM Cloud resource. */
    cloud_internet_services_crn: string;
  }
  export namespace PublicCertificateConfigurationDNSCloudInternetServicesPrototype {
    export namespace Constants {
      /** The configuration type. Can be one of: iam_credentials_configuration, public_cert_configuration_ca_lets_encrypt, public_cert_configuration_dns_classic_infrastructure, public_cert_configuration_dns_cloud_internet_services, private_cert_configuration_root_ca, private_cert_configuration_intermediate_ca, private_cert_configuration_template. */
      export enum ConfigType {
        PUBLIC_CERT_CONFIGURATION_DNS_CLOUD_INTERNET_SERVICES = 'public_cert_configuration_dns_cloud_internet_services',
        PUBLIC_CERT_CONFIGURATION_DNS_CLASSIC_INFRASTRUCTURE = 'public_cert_configuration_dns_classic_infrastructure',
        PUBLIC_CERT_CONFIGURATION_CA_LETS_ENCRYPT = 'public_cert_configuration_ca_lets_encrypt',
        PRIVATE_CERT_CONFIGURATION_ROOT_CA = 'private_cert_configuration_root_ca',
        PRIVATE_CERT_CONFIGURATION_INTERMEDIATE_CA = 'private_cert_configuration_intermediate_ca',
        PRIVATE_CERT_CONFIGURATION_TEMPLATE = 'private_cert_configuration_template',
        IAM_CREDENTIALS_CONFIGURATION = 'iam_credentials_configuration',
      }
    }
  }

  /**
   * Properties of the metadata of your public certificate.
   */
  export interface PublicCertificateMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: PublicCertificateMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The identifier for the cryptographic algorithm that is used by the issuing certificate authority to sign a
     *  certificate.
     */
    signing_algorithm?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The Common Name (CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** Issuance information that is associated with your certificate. */
    issuance_info?: CertificateIssuanceInfo;
    /** The distinguished name that identifies the entity that signed and issued the certificate. */
    issuer?: string;
    /** The identifier for the cryptographic algorithm that is used to generate the public key that is associated
     *  with the certificate.
     *
     *  The algorithm that you select determines the encryption algorithm (`RSA` or `ECDSA`) and key size to be used to
     *  generate keys and sign certificates. For longer living certificates, it is recommended to use longer keys to
     *  provide more encryption protection. Allowed values:  `RSA2048`, `RSA4096`, `ECDSA256`, and `ECDSA384`.
     */
    key_algorithm: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation: RotationPolicy;
    /** Indicates whether the issued certificate is bundled with intermediate certificates. */
    bundle_certs?: boolean;
    /** The name of the certificate authority configuration. */
    ca?: string;
    /** The name of the DNS provider configuration. */
    dns?: string;
  }
  export namespace PublicCertificateMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * PublicCertificateMetadataPatch.
   */
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
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
  }

  /**
   * PublicCertificatePrototype.
   */
  export interface PublicCertificatePrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificatePrototype.Constants.SecretType | string;
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
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The Common Name (CN) represents the server name protected by the SSL certificate. */
    common_name?: string;
    /** With the Subject Alternative Name field, you can specify additional hostnames to be protected by a single
     *  SSL certificate.
     */
    alt_names?: string[];
    /** The identifier for the cryptographic algorithm that is used to generate the public key that is associated
     *  with the certificate.
     *
     *  The algorithm that you select determines the encryption algorithm (`RSA` or `ECDSA`) and key size to be used to
     *  generate keys and sign certificates. For longer living certificates, it is recommended to use longer keys to
     *  provide more encryption protection. Allowed values:  `RSA2048`, `RSA4096`, `ECDSA256`, and `ECDSA384`.
     */
    key_algorithm?: string;
    /** The name of the certificate authority configuration. */
    ca: string;
    /** The name of the DNS provider configuration. */
    dns: string;
    /** This field indicates whether your issued certificate is bundled with intermediate certificates. Set to
     *  `false` for the certificate file to contain only the issued certificate.
     */
    bundle_certs?: boolean;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }
  export namespace PublicCertificatePrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * This field indicates whether Secrets Manager rotates your secrets automatically.
   *
   * For public certificates, if `auto_rotate` is set to `true`, the service reorders your certificate for 31 days,
   * before it expires.
   */
  export interface PublicCertificateRotationPolicy extends RotationPolicy {
    /** This field indicates whether Secrets Manager rotates your secret automatically.
     *
     *  The default is `false`. If `auto_rotate` is set to `true` the service rotates your secret based on the defined
     *  interval.
     */
    auto_rotate: boolean;
    /** This field indicates whether Secrets Manager rotates the private key for your public certificate
     *  automatically.
     *
     *  The default is `false`. If it is set to `true`, the service generates and stores a new private key for your
     *  rotated certificate.
     */
    rotate_keys: boolean;
  }

  /**
   * Versions of your public certificate.
   */
  export interface PublicCertificateVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: PublicCertificateVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
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
  export namespace PublicCertificateVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * Properties of the version metadata of your public certificate.
   */
  export interface PublicCertificateVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: PublicCertificateVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: PublicCertificateVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The unique serial number that was assigned to a certificate by the issuing certificate authority. */
    serial_number?: string;
    /** The date and time that the certificate validity period begins and ends. */
    validity?: CertificateValidity;
  }
  export namespace PublicCertificateVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * PublicCertificateVersionPrototype.
   */
  export interface PublicCertificateVersionPrototype extends SecretVersionPrototype {
    /** Defines the rotation object that is used to manually rotate public certificates. */
    rotation: PublicCertificateRotationObject;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /**
   * Your service credentials secret.
   */
  export interface ServiceCredentialsSecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ServiceCredentialsSecret.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: ServiceCredentialsSecret.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
     */
    ttl?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The properties of the resource key that was created for this source service instance. */
    source_service: ServiceCredentialsSecretSourceServiceRO;
    /** The properties of the service credentials secret payload. */
    credentials: ServiceCredentialsSecretCredentials;
  }
  export namespace ServiceCredentialsSecret {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * The metadata properties for your service credentials secret.
   */
  export interface ServiceCredentialsSecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ServiceCredentialsSecretMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: ServiceCredentialsSecretMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
     */
    ttl?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The properties of the resource key that was created for this source service instance. */
    source_service: ServiceCredentialsSecretSourceServiceRO;
  }
  export namespace ServiceCredentialsSecretMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * ServiceCredentialsSecretMetadataPatch.
   */
  export interface ServiceCredentialsSecretMetadataPatch extends SecretMetadataPatch {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name?: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
     */
    ttl?: string;
  }

  /**
   * ServiceCredentialsSecretPrototype.
   */
  export interface ServiceCredentialsSecretPrototype extends SecretPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** An extended description of your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a description for your
     *  secret group.
     */
    description?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** A human-readable name to assign to your secret.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a name for your secret.
     */
    name: string;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ServiceCredentialsSecretPrototype.Constants.SecretType | string;
    /** The properties that are required to create the service credentials for the specified source service
     *  instance.
     */
    source_service: ServiceCredentialsSecretSourceService;
    /** The time-to-live (TTL) or lease duration to assign to credentials that are generated. Supported secret
     *  types: iam_credentials, service_credentials. The TTL defines how long generated credentials remain valid. The
     *  value can be either an integer that specifies the number of seconds, or the string  representation of a
     *  duration, such as `1440m` or `24h`. For the iam_credentials secret type, the TTL field is mandatory. The minimum
     *  duration is 1 minute. The maximum is 90 days. For the service_credentials secret type, the TTL field is
     *  optional. If it is set the minimum duration is 1 day. The maximum is 90 days. By default, the TTL is set to 0.
     *  After the TTL is modified, it will be applied only on the next secret rotation.
     */
    ttl?: string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }
  export namespace ServiceCredentialsSecretPrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Your service credentials secret version.
   */
  export interface ServiceCredentialsSecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ServiceCredentialsSecretVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: ServiceCredentialsSecretVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The source service resource key data of the generated service credentials. */
    resource_key?: ServiceCredentialsResourceKey;
    /** The properties of the service credentials secret payload. */
    credentials: ServiceCredentialsSecretCredentials;
  }
  export namespace ServiceCredentialsSecretVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * The version metadata properties for your service credentials secret.
   */
  export interface ServiceCredentialsSecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: ServiceCredentialsSecretVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: ServiceCredentialsSecretVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The source service resource key data of the generated service credentials. */
    resource_key?: ServiceCredentialsResourceKey;
  }
  export namespace ServiceCredentialsSecretVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * ServiceCredentialsSecretVersionPrototype.
   */
  export interface ServiceCredentialsSecretVersionPrototype extends SecretVersionPrototype {
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
  }

  /**
   * Your user credentials secret.
   */
  export interface UsernamePasswordSecret extends Secret {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: UsernamePasswordSecret.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: UsernamePasswordSecret.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation: RotationPolicy;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** Policy for auto-generated passwords. */
    password_generation_policy?: PasswordGenerationPolicyRO;
    /** The username that is assigned to an `username_password` secret. */
    username: string;
    /** The password that is assigned to an `username_password` secret. */
    password: string;
  }
  export namespace UsernamePasswordSecret {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * Properties of the metadata of your user credentials secret.
   */
  export interface UsernamePasswordSecretMetadata extends SecretMetadata {
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
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
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The number of locks of the secret. */
    locks_total?: number;
    /** The human-readable name of your secret. */
    name?: string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: UsernamePasswordSecretMetadata.Constants.SecretType | string;
    /** The secret state that is based on `NIST SP 800-57`. States are integers and correspond to the
     *  `Pre-activation = 0`, `Active = 1`,  `Suspended = 2`, `Deactivated = 3`, and `Destroyed = 5` values.
     */
    state?: number;
    /** A text representation of the secret state. */
    state_description?: UsernamePasswordSecretMetadata.Constants.StateDescription | string;
    /** The date when a resource was modified. The date format follows `RFC 3339`. */
    updated_at: string;
    /** The number of versions of your secret. */
    versions_total: number;
    /** The list of configurations that have a reference to the secret. */
    referenced_by?: string[];
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation: RotationPolicy;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The date that the secret is scheduled for automatic rotation.
     *
     *  The service automatically creates a new version of the secret on its next rotation date. This field exists only
     *  for secrets that can be auto-rotated and an existing rotation policy.
     */
    next_rotation_date?: string;
    /** Policy for auto-generated passwords. */
    password_generation_policy?: PasswordGenerationPolicyRO;
  }
  export namespace UsernamePasswordSecretMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A text representation of the secret state. */
      export enum StateDescription {
        PRE_ACTIVATION = 'pre_activation',
        ACTIVE = 'active',
        SUSPENDED = 'suspended',
        DEACTIVATED = 'deactivated',
        DESTROYED = 'destroyed',
      }
    }
  }

  /**
   * UsernamePasswordSecretMetadataPatch.
   */
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
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** Policy patch for auto-generated passwords. Policy properties that are included in the patch are updated.
     *  Properties that are not included in the patch remain unchanged.
     */
    password_generation_policy?: PasswordGenerationPolicyPatch;
  }

  /**
   * UsernamePasswordSecretPrototype.
   */
  export interface UsernamePasswordSecretPrototype extends SecretPrototype {
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: UsernamePasswordSecretPrototype.Constants.SecretType | string;
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
    /** A UUID identifier, or `default` secret group. */
    secret_group_id?: string;
    /** Labels that you can use to search secrets in your instance. Only 30 labels can be created.
     *
     *  Label can be between 2-64 characters, including spaces.
     *
     *  To protect your privacy, do not use personal data, such as your name or location, as a label for your secret.
     */
    labels?: string[];
    /** The username that is assigned to an `username_password` secret. */
    username: string;
    /** The password that is assigned to an `username_password` secret. If you omit this parameter, Secrets Manager
     *  generates a new random password for your secret.
     */
    password?: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The secret metadata that a user can customize. */
    custom_metadata?: JsonObject;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** This field indicates whether Secrets Manager rotates your secrets automatically. Supported secret types:
     *  username_password, private_cert, public_cert, iam_credentials.
     */
    rotation?: RotationPolicy;
    /** Policy for auto-generated passwords. */
    password_generation_policy?: PasswordGenerationPolicy;
  }
  export namespace UsernamePasswordSecretPrototype {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
    }
  }

  /**
   * Your user credentials secret version.
   */
  export interface UsernamePasswordSecretVersion extends SecretVersion {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: UsernamePasswordSecretVersion.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: UsernamePasswordSecretVersion.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
    /** The username that is assigned to an `username_password` secret. */
    username: string;
    /** The password that is assigned to an `username_password` secret. */
    password: string;
  }
  export namespace UsernamePasswordSecretVersion {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * Properties of the version metadata of your user credentials secret.
   */
  export interface UsernamePasswordSecretVersionMetadata extends SecretVersionMetadata {
    /** Indicates whether the version of the secret was created by automatic rotation. */
    auto_rotated?: boolean;
    /** The unique identifier that is associated with the entity that created the secret. */
    created_by: string;
    /** The date when the resource was created. The date format follows `RFC 3339`. */
    created_at: string;
    /** This field indicates whether the secret data that is associated with a secret version was retrieved in a
     *  call to the service API.
     */
    downloaded?: boolean;
    /** A UUID identifier. */
    id: string;
    /** The human-readable name of your secret. */
    secret_name?: string;
    /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials,
     *  service_credentials, kv, and username_password.
     */
    secret_type: UsernamePasswordSecretVersionMetadata.Constants.SecretType | string;
    /** A UUID identifier, or `default` secret group. */
    secret_group_id: string;
    /** Indicates whether the secret payload is available in this secret version. */
    payload_available: boolean;
    /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous'
     *  is used for version `n-1`.
     */
    alias?: UsernamePasswordSecretVersionMetadata.Constants.Alias | string;
    /** The secret version metadata that a user can customize. */
    version_custom_metadata?: JsonObject;
    /** A UUID identifier. */
    secret_id: string;
    /** The date when the secret material expires. The date format follows the `RFC 3339` format. Supported secret
     *  types: Arbitrary, username_password.
     */
    expiration_date?: string;
  }
  export namespace UsernamePasswordSecretVersionMetadata {
    export namespace Constants {
      /** The secret type. Supported types are arbitrary, imported_cert, public_cert, private_cert, iam_credentials, service_credentials, kv, and username_password. */
      export enum SecretType {
        ARBITRARY = 'arbitrary',
        IAM_CREDENTIALS = 'iam_credentials',
        IMPORTED_CERT = 'imported_cert',
        KV = 'kv',
        PRIVATE_CERT = 'private_cert',
        PUBLIC_CERT = 'public_cert',
        SERVICE_CREDENTIALS = 'service_credentials',
        USERNAME_PASSWORD = 'username_password',
      }
      /** A human-readable alias that describes the secret version. 'Current' is used for version `n` and 'previous' is used for version `n-1`. */
      export enum Alias {
        CURRENT = 'current',
        PREVIOUS = 'previous',
      }
    }
  }

  /**
   * UsernamePasswordSecretVersionPrototype.
   */
  export interface UsernamePasswordSecretVersionPrototype extends SecretVersionPrototype {
    /** The password that is assigned to an `username_password` secret. If you omit this parameter, Secrets Manager
     *  generates a new random password for your secret.
     */
    password?: string;
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
    constructor(client: SecretsManagerV2, params?: SecretsManagerV2.ListSecretsParams) {
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

      let next;
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
    constructor(client: SecretsManagerV2, params?: SecretsManagerV2.ListSecretsLocksParams) {
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

      let next;
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
    constructor(client: SecretsManagerV2, params: SecretsManagerV2.ListSecretLocksParams) {
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

      let next;
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
    constructor(client: SecretsManagerV2, params: SecretsManagerV2.ListSecretVersionLocksParams) {
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

      let next;
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
    constructor(client: SecretsManagerV2, params?: SecretsManagerV2.ListConfigurationsParams) {
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

      let next;
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
