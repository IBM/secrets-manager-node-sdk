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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const SecretsManagerV2 = require("../../dist/secrets-manager/v2");
const {readExternalSources} = require("ibm-cloud-sdk-core");
const authHelper = require("../resources/auth-helper.js");

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = "secrets_manager_v2.env";

const describe = authHelper.prepareTests(configFile);

describe("SecretsManagerV2_integration", () => {
    jest.setTimeout(timeout);
    // Service instance
    let secretsManagerService;
    let privateCertSecretId;
    let iamCredSecretId;
    let config;

    const privateCertSecretName1 = "integration-js-private-certificate1";
    const privateCertSecretName2 = "integration-js-private-certificate2";
    const rootCaConfigType = "private_cert_configuration_root_ca";
    const rootCaConfigName = "root-CA-integration-js";
    const interCaConfigType = "private_cert_configuration_intermediate_ca";
    const interCaConfigName = "intermediate-CA-integration-js";
    const templateConfigType = "private_cert_configuration_template";
    const templateConfigName1 = "template1-integration-js";
    const templateConfigName2 = "template1-integration-js";
    const iamConfigType = "iam_credentials_configuration";
    const iamConfigName = "iam-config-integration";
    let cleanupFunc = async () => {
    };

    afterEach(async () => {
        return await cleanupFunc();
    });

    test("Initialize service", async () => {
        secretsManagerService = SecretsManagerV2.newInstance();

        expect(secretsManagerService).not.toBeNull();

        config = readExternalSources(SecretsManagerV2.DEFAULT_SERVICE_NAME);
        expect(config).not.toBeNull();

        secretsManagerService.enableRetries();
    });

    test("createSecretAction()", async () => {
        cleanupFunc = async () => {
            await deleteSecret(privateCertSecretId);
            await deleteConfig(templateConfigName1, templateConfigType);
            await deleteConfig(interCaConfigName, interCaConfigType);
            await deleteConfig(rootCaConfigName, rootCaConfigType);
        };
        // Prepare models needed by this operation.
        await createRootCaConfig();
        await createIntermediateConfig();
        await signIntermediate();
        await createTemplateConfig(templateConfigName1);
        await createPrivateCert(privateCertSecretName1, templateConfigName1);

        // PublicCertificateActionValidateManualDNSPrototype
        const secretActionPrototypeModel = {
            action_type: "private_cert_action_revoke_certificate"
        };

        const params = {
            id: privateCertSecretId,
            secretActionPrototype: secretActionPrototypeModel
        };

        const res = await secretsManagerService.createSecretAction(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(201);
        expect(res.result).toBeDefined();

    });

    test("createSecretVersionAction()", async () => {
        cleanupFunc = async () => {
            await deleteSecret(privateCertSecretId);
            await deleteConfig(templateConfigName2, templateConfigType);
            await deleteConfig(interCaConfigName, interCaConfigType);
            await deleteConfig(rootCaConfigName, rootCaConfigType);
        };
        // Prepare models needed by this operation.
        await createRootCaConfig();
        await createIntermediateConfig();
        await signIntermediate();
        await createTemplateConfig(templateConfigName2);
        await createPrivateCert(privateCertSecretName2, templateConfigName2);

        // PrivateCertificateVersionActionRevokePrototype
        const secretVersionActionPrototypeModel = {
            action_type: "private_cert_action_revoke_certificate"
        };

        const params = {
            secretId: privateCertSecretId,
            id: "current",
            secretVersionActionPrototype: secretVersionActionPrototypeModel
        };

        const res = await secretsManagerService.createSecretVersionAction(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(201);
        expect(res.result).toBeDefined();

    });

    test("createConfigurationAction()", async () => {
        cleanupFunc = async () => {
            await deleteConfig(rootCaConfigName, rootCaConfigType);
        };
        // Prepare models needed by this operation.
        await createRootCaConfig();

        // PrivateCertificateConfigurationActionRotateCRLPrototype
        const configurationActionPrototypeModel = {
            action_type: "private_cert_configuration_action_rotate_crl"
        };

        const params = {
            name: rootCaConfigName,
            configActionPrototype: configurationActionPrototypeModel,
            xSmAcceptConfigurationType: "private_cert_configuration_root_ca"
        };

        const res = await secretsManagerService.createConfigurationAction(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(201);
        expect(res.result).toBeDefined();
    });

    test("deleteSecretVersionData()", async () => {
        cleanupFunc = async () => {
            await deleteSecret(iamCredSecretId);
        };
        // Prepare models needed by this operation.
        await createIAMConfig();
        await createIAMCredSecret();
        await getIAMCredSecret();

        const params = {
            secretId: iamCredSecretId,
            id: "current"
        };

        const res = await secretsManagerService.deleteSecretVersionData(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(204);
        expect(res.result).toBeDefined();

    });

    async function createRootCaConfig() {
        const configurationPrototypeModel = {
            config_type: rootCaConfigType,
            name: rootCaConfigName,
            max_ttl: "43830h",
            common_name: "ibm.com"
        };
        await createConfiguration(configurationPrototypeModel);
    }

    async function createIntermediateConfig() {
        const configurationPrototypeModel = {
            config_type: interCaConfigType,
            name: interCaConfigName,
            max_ttl: "87600h",
            common_name: "ibm.com",
            issuer: rootCaConfigName,
            signing_method: "internal",
            issuing_certificates_urls_encoded: true
        };
        await createConfiguration(configurationPrototypeModel);
    }

    async function signIntermediate() {
        // PrivateCertificateConfigurationActionRotateCRLPrototype
        const configurationActionPrototypeModel = {
            action_type: "private_cert_configuration_action_sign_intermediate",
            intermediate_certificate_authority: interCaConfigName
        };
        const params = {
            name: rootCaConfigName,
            configActionPrototype: configurationActionPrototypeModel,
            xSmAcceptConfigurationType: rootCaConfigType
        };
        try {
            const res = await secretsManagerService.createConfigurationAction(params);
            expect(res).toBeDefined();
            expect(res.status).toBe(201);
            expect(res.result).toBeDefined();
        } catch (err) {
            expect(err).toBeNull();
        }
    }

    async function createTemplateConfig(configName) {
        const configurationPrototypeModel = {
            config_type: templateConfigType,
            name: configName,
            allow_any_name: true,
            certificate_authority: interCaConfigName
        };
        await createConfiguration(configurationPrototypeModel);
    }

    async function createConfiguration(configurationPrototypeModel) {
        const params = {configurationPrototype: configurationPrototypeModel};
        try {
            let res = await secretsManagerService.createConfiguration(params);
            expect(res).toBeDefined();
            expect(res.status).toBe(201);
            expect(res.result).toBeDefined();
        } catch (err) {
            if (err.status === 400 && (err.message.includes("already exists") ||
                err.message.includes("reached the maximum") && configurationPrototypeModel.config_type == iamConfigType)) {
                console.log(`Config of type ${configurationPrototypeModel.config_type} with name ${configurationPrototypeModel.name} already exists`);
                return;
            }
            expect(err).toBeNull();
        }
    }

    async function createSecret(secretPrototypeModel) {
        const params = {
            secretPrototype: secretPrototypeModel
        };

        const res = await secretsManagerService.createSecret(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(201);
        expect(res.result).toBeDefined();
        return res.result.id;
    }

    async function createPrivateCert(secretName, templateName) {
        const secretPrototypeModel = {
            description: "Description of my private certificate",
            labels: ["integration", "test"],
            name: secretName,
            secret_type: "private_cert",
            certificate_template: templateName,
            common_name: "localhost",
            ttl: "1h",
            custom_metadata: {metadata_custom_key: "metadata_custom_value"},
            version_custom_metadata: {custom_version_key: "custom_version_value"}
        };
        privateCertSecretId = await createSecret(secretPrototypeModel);
    }

    async function createIAMConfig() {
        const configurationPrototypeModel = {
            name: iamConfigName,
            config_type: iamConfigType,
            api_key: config["apikey"]
        };
        await createConfiguration(configurationPrototypeModel);
    }

    async function createIAMCredSecret() {
        const secretPrototypeModel = {
            description: "Description of my iam credentials",
            labels: ["integration", "test"],
            name: "integration-iam-credentials",
            secret_type: "iam_credentials",
            ttl: "1h",
            reuse_api_key: false,
            access_groups: [config["accessGroup"]],
            custom_metadata: {metadata_custom_key: "metadata_custom_value"},
            version_custom_metadata: {custom_version_key: "custom_version_value"}
        };
        iamCredSecretId = await createSecret(secretPrototypeModel);
    }

    async function getIAMCredSecret() {
        const params = {
            id: iamCredSecretId
        };
        const res = await secretsManagerService.getSecret(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        expect(res.result).toBeDefined();
    }

    async function deleteSecret(secretId) {
        const params = {
            id: secretId
        };
        const res = await secretsManagerService.deleteSecret(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(204);
        expect(res.result).toBeDefined();
    }

    async function deleteConfig(name, type) {
        const params = {
            name: name,
            xSmAcceptConfigurationType: type
        };

        const res = await secretsManagerService.deleteConfiguration(params);
        expect(res).toBeDefined();
        expect(res.status).toBe(204);
        expect(res.result).toBeDefined();
    }
});
