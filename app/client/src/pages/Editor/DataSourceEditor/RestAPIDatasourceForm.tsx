import {$t} from "locale/index";
import React from "react";
import styled from "styled-components";
import { DATASOURCE_REST_API_FORM } from "ee/constants/forms";
import type { Datasource } from "entities/Datasource";
import type { InjectedFormProps } from "redux-form";
import { getFormMeta, reduxForm } from "redux-form";
import AnalyticsUtil from "ee/utils/AnalyticsUtil";
import FormControl from "pages/Editor/FormControl";
import { StyledInfo } from "components/formControls/InputTextControl";
import { connect } from "react-redux";
import type { AppState } from "ee/reducers";
import { Callout } from "@appsmith/ads";
import {
  createDatasourceFromForm,
  toggleSaveActionFlag,
  updateDatasource,
} from "actions/datasourceActions";
import type { ReduxAction } from "ee/constants/ReduxActionConstants";
import {
  datasourceToFormValues,
  formValuesToDatasource,
} from "PluginActionEditor/transformers/RestAPIDatasourceFormTransformer";
import type {
  ApiDatasourceForm,
  AuthorizationCode,
  ClientCredentials,
} from "entities/Datasource/RestAPIForm";
import {
  ApiKeyAuthType,
  AuthType,
  GrantType,
} from "entities/Datasource/RestAPIForm";
import { createMessage, INVALID_URL } from "ee/constants/messages";
import Collapsible from "./Collapsible";
import _ from "lodash";
import FormLabel from "components/editorComponents/FormLabel";
import CopyToClipBoard from "components/designSystems/appsmith/CopyToClipBoard";
import { updateReplayEntity } from "actions/pageActions";
import { ENTITY_TYPE } from "ee/entities/AppsmithConsole/utils";
import { TEMP_DATASOURCE_ID } from "constants/Datasource";
import { Form } from "./DBForm";
import { selectFeatureFlagCheck } from "ee/selectors/featureFlagsSelectors";
import { getHasManageDatasourcePermission } from "ee/utils/BusinessFeatures/permissionPageHelpers";
import { FEATURE_FLAG } from "ee/entities/FeatureFlag";

interface DatasourceRestApiEditorProps {
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initializeReplayEntity: (id: string, data: any) => void;
  updateDatasource: (
    formValues: Datasource,
    currEditingEnvId: string,
    onSuccess?: ReduxAction<unknown>,
  ) => void;
  currentEnvironment: string;
  currentEnvironmentName: string;
  isSaving: boolean;
  applicationId: string;
  datasourceId: string;
  pageId: string;
  location: {
    search: string;
  };
  datasource: Datasource;
  formData: ApiDatasourceForm;
  formName: string;
  pluginName: string;
  pluginPackageName: string;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formMeta: any;
  messages?: Array<string>;
  datasourceName: string;
  createDatasource: (
    data: Datasource,
    onSuccess?: ReduxAction<unknown>,
  ) => void;
  toggleSaveActionFlag: (flag: boolean) => void;
  triggerSave?: boolean;
  datasourceDeleteTrigger: () => void;
  viewMode: boolean;
  isFeatureEnabled: boolean;
}

type Props = DatasourceRestApiEditorProps &
  InjectedFormProps<ApiDatasourceForm, DatasourceRestApiEditorProps>;

const FormInputContainer = styled.div`
  margin-top: 16px;
  .t--save-and-authorize-datasource {
    margin-left: 0;
  }
`;

class DatasourceRestAPIEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    // set replay data
    this.props.initializeReplayEntity(
      this.props.datasource.id,
      this.props.initialValues,
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.formData) return;

    const { authType } = this.props.formData;

    if (authType === AuthType.OAuth2) {
      this.ensureOAuthDefaultsAreCorrect();
    } else if (authType === AuthType.apiKey) {
      this.ensureAPIKeyDefaultsAreCorrect();
    }

    // if trigger save changed, save datasource
    if (
      prevProps.triggerSave !== this.props.triggerSave &&
      this.props.triggerSave
    ) {
      this.save();
    }
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDirty(prop: any) {
    const { formMeta } = this.props;

    return _.get(formMeta, prop + ".visited", false);
  }

  ensureAPIKeyDefaultsAreCorrect = () => {
    if (!this.props.formData) return;

    const { authentication } = this.props.formData;

    if (!authentication || !_.get(authentication, "addTo")) {
      this.props.change("authentication.addTo", ApiKeyAuthType.Header);
    }

    if (!authentication || !_.get(authentication, "headerPrefix")) {
      this.props.change("authentication.headerPefix", "ApiKeyAuthType.Header");
    }
  };

  ensureOAuthDefaultsAreCorrect = () => {
    if (!this.props.formData) return;

    const { authentication } = this.props.formData;

    if (!authentication || !_.get(authentication, "grantType")) {
      this.props.change(
        "authentication.grantType",
        GrantType.ClientCredentials,
      );
    }

    if (_.get(authentication, "isTokenHeader") === undefined) {
      this.props.change("authentication.isTokenHeader", true);
    }

    if (
      !this.isDirty("authentication.headerPrefix") &&
      _.get(authentication, "headerPrefix") === undefined
    ) {
      this.props.change("authentication.headerPrefix", $t('RestAPIDatasourceForm.7f9bd5f6533f2dde'));
    }

    if (_.get(authentication, "grantType") === GrantType.AuthorizationCode) {
      if (_.get(authentication, "isAuthorizationHeader") === undefined) {
        this.props.change("authentication.isAuthorizationHeader", true);
      }
    }

    if (_.get(authentication, "grantType") === GrantType.ClientCredentials) {
      if (_.get(authentication, "isAuthorizationHeader") === undefined) {
        this.props.change("authentication.isAuthorizationHeader", false);
      }
    }

    if (_.get(authentication, "grantType") === GrantType.AuthorizationCode) {
      if (
        _.get(authentication, "sendScopeWithRefreshToken") === undefined ||
        _.get(authentication, "sendScopeWithRefreshToken") === ""
      ) {
        this.props.change("authentication.sendScopeWithRefreshToken", false);
      }
    }

    if (_.get(authentication, "grantType") === GrantType.AuthorizationCode) {
      if (
        _.get(authentication, "refreshTokenClientCredentialsLocation") ===
          undefined ||
        _.get(authentication, "refreshTokenClientCredentialsLocation") === ""
      ) {
        this.props.change(
          "authentication.refreshTokenClientCredentialsLocation",
          "BODY",
        );
      }
    }
  };

  validate = (): boolean => {
    const { datasource, datasourceId, formData, isFeatureEnabled } = this.props;
    const createMode = datasourceId === TEMP_DATASOURCE_ID;
    const canManageDatasource = getHasManageDatasourcePermission(
      isFeatureEnabled,
      datasource?.userPermissions || [],
    );

    if (!formData) return true;

    return !formData.url || (!createMode && !canManageDatasource);
  };

  getSanitizedFormData = () =>
    formValuesToDatasource(
      this.props.datasource,
      this.props.formData,
      this.props.currentEnvironment,
    );

  save = (onSuccess?: ReduxAction<unknown>) => {
    this.props.toggleSaveActionFlag(true);
    const normalizedValues = this.getSanitizedFormData();

    AnalyticsUtil.logEvent("SAVE_DATA_SOURCE_CLICK", {
      pageId: this.props.pageId,
      appId: this.props.applicationId,
      environmentId: this.props.currentEnvironment,
      environmentName: this.props.currentEnvironmentName,
      pluginName: this.props.pluginName || "",
      pluginPackageName: this.props.pluginPackageName || "",
    });

    if (this.props.datasource.id !== TEMP_DATASOURCE_ID) {
      return this.props.updateDatasource(
        normalizedValues,
        this.props.currentEnvironment,
        onSuccess,
      );
    }

    this.props.createDatasource(
      {
        ...normalizedValues,
        name: this.props.datasourceName,
      },
      onSuccess,
    );
  };

  urlValidator = (value: string) => {
    const validationRegex = "^(http|https)://";

    if (value) {
      const regex = new RegExp(validationRegex);

      return regex.test(value)
        ? { isValid: true, message: "" }
        : {
            isValid: false,
            message: createMessage(INVALID_URL),
          };
    }

    return { isValid: true, message: "" };
  };

  render = () => {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        viewMode={this.props.viewMode}
      >
        {this.renderEditor()}
      </Form>
    );
  };

  renderEditor = () => {
    const { formData, messages } = this.props;

    if (!formData) return;

    return (
      <>
        {messages &&
          messages.map((msg, i) => (
            <Callout key={i} kind="warning">
              {msg}
            </Callout>
          ))}
        {this.renderGeneralSettings()}
        {this.renderOauth2AdvancedSettings()}
      </>
    );
  };

  renderGeneralSettings = () => {
    const { formData } = this.props;

    return (
      <section
        className="t--section-general"
        data-location-id="section-General"
        data-testid="section-General"
      >
        <FormInputContainer data-location-id={btoa("url")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "url",
            label: "URL",
            placeholderText: "https://example.com",
            dataType: "TEXT",
            encrypted: false,
            isRequired: true,
            fieldValidator: this.urlValidator,
          })}
        </FormInputContainer>
        <FormInputContainer data-location-id={btoa("isSendSessionEnabled")}>
          {this.renderCheckboxViaFormControl(
            "isSendSessionEnabled",
            "Send Appsmith signature header",
            "",
            false,
          )}
        </FormInputContainer>
        {formData.isSendSessionEnabled && (
          <FormInputContainer data-location-id={btoa("sessionSignatureKey")}>
            {this.renderInputTextControlViaFormControl({
              configProperty: "sessionSignatureKey",
              label: $t('RestAPIDatasourceForm.b7f7a4bb89677d47'),
              placeholderText: "",
              dataType: "TEXT",
              encrypted: false,
              isRequired: false,
            })}
          </FormInputContainer>
        )}
        <FormInputContainer data-location-id={btoa("ssl")}>
          {this.renderCheckboxViaFormControl(
            "connection.ssl.authTypeControl",
            $t('RestAPIDatasourceForm.7aca68d340a5d6b1'),
            "",
            false,
          )}
        </FormInputContainer>
        {this.renderSelfSignedCertificateFields()}
        <Collapsible title={$t('RestAPIDatasourceForm.6af17a1d975ad4d0')}>
          <FormInputContainer
            className="t--headers-array"
            data-location-id={btoa("headers")}
          >
            {this.renderKeyValueControlViaFormControl("headers", "", "", false)}
          </FormInputContainer>
        </Collapsible>
        <Collapsible title={$t('RestAPIDatasourceForm.7c9705c6f84600da')}>
          <FormInputContainer data-location-id={btoa("queryParameters")}>
            {this.renderKeyValueControlViaFormControl(
              "queryParameters",
              "",
              "",
              false,
            )}
          </FormInputContainer>
        </Collapsible>
        <Collapsible title={$t('RestAPIDatasourceForm.df73a84bf1cd1c59')}>
          <FormInputContainer data-location-id={btoa("authType")}>
            {this.renderDropdownControlViaFormControl(
              "authType",
              [
                {
                  label: $t('RestAPIDatasourceForm.1329d26af87de41a'),
                  value: AuthType.NONE,
                },
                {
                  label: $t('RestAPIDatasourceForm.1f640118bbdb1577'),
                  value: AuthType.basic,
                },
                {
                  label: $t('RestAPIDatasourceForm.2ccbf0ab5672ed01'),
                  value: AuthType.OAuth2,
                },
                {
                  label: $t('RestAPIDatasourceForm.249983efcd0d383b'),
                  value: AuthType.apiKey,
                },
                {
                  label: $t('RestAPIDatasourceForm.a3a51fc4864ce5ba'),
                  value: AuthType.bearerToken,
                },
              ],
              $t('RestAPIDatasourceForm.ad048e9f6f3024f2'),
              "",
              false,
              "",
            )}
            {this.renderAuthFields()}
          </FormInputContainer>
        </Collapsible>
      </section>
    );
  };

  renderSelfSignedCertificateFields = () => {
    const { connection } = this.props.formData;

    if (connection?.ssl.authTypeControl) {
      return (
        <div style={{ marginTop: "16px" }}>
          {this.renderFilePickerControlViaFormControl(
            "connection.ssl.certificateFile",
            $t('RestAPIDatasourceForm.94618023084cb573'),
            "",
            false,
            true,
          )}
        </div>
      );
    }
  };

  renderAuthFields = () => {
    const { authType } = this.props.formData;

    let content;

    if (authType === AuthType.OAuth2) {
      content = this.renderOauth2();
    } else if (authType === AuthType.basic) {
      content = this.renderBasic();
    } else if (authType === AuthType.apiKey) {
      content = this.renderApiKey();
    } else if (authType === AuthType.bearerToken) {
      content = this.renderBearerToken();
    }

    if (content) {
      return content;
    }
  };

  renderApiKey = () => {
    const { authentication } = this.props.formData;

    return (
      <>
        <FormInputContainer data-location-id={btoa("authentication.label")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.label",
            label: $t('RestAPIDatasourceForm.17907caea23597e0'),
            placeholderText: "api_key",
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>
        <FormInputContainer>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.value",
            label: $t('RestAPIDatasourceForm.09a95b427d3c8cca'),
            placeholderText: "value",
            dataType: "TEXT",
            encrypted: true,
            isRequired: false,
          })}
        </FormInputContainer>
        <FormInputContainer>
          {this.renderDropdownControlViaFormControl(
            "authentication.addTo",
            [
              {
                label: $t('RestAPIDatasourceForm.635904aa544635c9'),
                value: ApiKeyAuthType.QueryParams,
              },
              {
                label: $t('RestAPIDatasourceForm.93035adbb2e1d026'),
                value: ApiKeyAuthType.Header,
              },
            ],
            $t('RestAPIDatasourceForm.820a85de72df1521'),
            "",
            false,
            "",
          )}
        </FormInputContainer>
        {_.get(authentication, "addTo") == "header" && (
          <FormInputContainer
            data-location-id={btoa("authentication.headerPrefix")}
          >
            {this.renderInputTextControlViaFormControl({
              configProperty: "authentication.headerPrefix",
              label: $t('RestAPIDatasourceForm.ad590951203e433f'),
              placeholderText: "eg: Bearer ",
              dataType: "TEXT",
              encrypted: false,
              isRequired: false,
            })}
          </FormInputContainer>
        )}
      </>
    );
  };

  renderBearerToken = () => {
    return (
      <FormInputContainer data-location-id={btoa("authentication.bearerToken")}>
        {this.renderInputTextControlViaFormControl({
          configProperty: "authentication.bearerToken",
          label: $t('RestAPIDatasourceForm.a3a51fc4864ce5ba'),
          placeholderText: $t('RestAPIDatasourceForm.a3a51fc4864ce5ba'),
          dataType: "TEXT",
          encrypted: true,
          isRequired: false,
        })}
      </FormInputContainer>
    );
  };

  renderBasic = () => {
    return (
      <>
        <FormInputContainer data-location-id={btoa("authentication.username")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.username",
            label: $t('RestAPIDatasourceForm.2c1f2ded76ba0258'),
            placeholderText: $t('RestAPIDatasourceForm.2c1f2ded76ba0258'),
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>
        <FormInputContainer data-location-id={btoa("authentication.password")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.password",
            label: $t('RestAPIDatasourceForm.7dbb89e00d35f95a'),
            placeholderText: $t('RestAPIDatasourceForm.7dbb89e00d35f95a'),
            dataType: "PASSWORD",
            encrypted: true,
            isRequired: false,
            isSecretExistsPath: "authentication.secretExists.password",
          })}
        </FormInputContainer>
      </>
    );
  };

  renderOauth2 = () => {
    const authentication = this.props.formData.authentication as
      | ClientCredentials
      | AuthorizationCode
      | undefined;

    if (!authentication) return;

    let content;

    switch (authentication.grantType) {
      case GrantType.AuthorizationCode:
        content = this.renderOauth2AuthorizationCode();
        break;
      case GrantType.ClientCredentials:
        content = this.renderOauth2ClientCredentials();
        break;
    }

    return (
      <>
        <FormInputContainer data-location-id={btoa("authentication.grantType")}>
          {this.renderDropdownControlViaFormControl(
            "authentication.grantType",
            [
              {
                label: $t('RestAPIDatasourceForm.e91c0a2618728a65'),
                value: GrantType.ClientCredentials,
              },
              {
                label: $t('RestAPIDatasourceForm.e58cfc7847640748'),
                value: GrantType.AuthorizationCode,
              },
            ],
            $t('RestAPIDatasourceForm.855187f683747b22'),
            "",
            false,
            "",
          )}
        </FormInputContainer>
        {content}
      </>
    );
  };

  renderOauth2Common = () => {
    const { formData } = this.props;

    return (
      <>
        <FormInputContainer
          data-location-id={btoa("authentication.isTokenHeader")}
        >
          {this.renderDropdownControlViaFormControl(
            "authentication.isTokenHeader",
            [
              {
                label: $t('RestAPIDatasourceForm.1a904631563c3825'),
                value: true,
              },
              {
                label: $t('RestAPIDatasourceForm.88534afe0989a35d'),
                value: false,
              },
            ],
            $t('RestAPIDatasourceForm.8aef737fd3fc0786'),
            "",
            false,
            "",
            !!_.get(formData.authentication, "isTokenHeader"),
          )}
        </FormInputContainer>
        {_.get(formData.authentication, "isTokenHeader") && (
          <FormInputContainer
            data-location-id={btoa("authentication.headerPrefix")}
          >
            {this.renderInputTextControlViaFormControl({
              configProperty: "authentication.headerPrefix",
              label: $t('RestAPIDatasourceForm.ad590951203e433f'),
              placeholderText: "eg: Bearer ",
              dataType: "TEXT",
              encrypted: false,
              isRequired: false,
            })}
          </FormInputContainer>
        )}
        <FormInputContainer
          data-location-id={btoa("authentication.accessTokenUrl")}
        >
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.accessTokenUrl",
            label: $t('RestAPIDatasourceForm.5fd082ec4ddb6ddb'),
            placeholderText: "https://example.com/login/oauth/access_token",
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
            fieldValidator: this.urlValidator,
          })}
        </FormInputContainer>
        <FormInputContainer data-location-id={btoa("authentication.clientId")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.clientId",
            label: $t('RestAPIDatasourceForm.2adba6cb2e5a68fb'),
            placeholderText: $t('RestAPIDatasourceForm.2adba6cb2e5a68fb'),
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>
        <FormInputContainer
          data-location-id={btoa("authentication.clientSecret")}
        >
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.clientSecret",
            label: $t('RestAPIDatasourceForm.82fdefc7f5275553'),
            placeholderText: $t('RestAPIDatasourceForm.82fdefc7f5275553'),
            dataType: "PASSWORD",
            encrypted: true,
            isRequired: false,
            isSecretExistsPath: "authentication.secretExists.clientSecret",
          })}
        </FormInputContainer>
        <FormInputContainer
          data-location-id={btoa("authentication.scopeString")}
        >
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.scopeString",
            label: $t('RestAPIDatasourceForm.3130455e9556507a'),
            placeholderText: "e.g. read, write",
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>
        <FormInputContainer
          data-location-id={btoa("authentication.isAuthorizationHeader")}
        >
          {this.renderDropdownControlViaFormControl(
            "authentication.isAuthorizationHeader",
            [
              {
                label: $t('RestAPIDatasourceForm.4e904909305e3166'),
                value: true,
              },
              {
                label: $t('RestAPIDatasourceForm.567b0847dcdb3ce7'),
                value: false,
              },
            ],
            $t('RestAPIDatasourceForm.7214d4d22c3bb4ce'),
            "",
            false,
            "",
            !!_.get(formData.authentication, "isAuthorizationHeader"),
          )}
        </FormInputContainer>
      </>
    );
  };

  renderOauth2AdvancedSettings = () => {
    const { authentication, authType, connection } = this.props.formData;
    const isGrantTypeAuthorizationCode =
      _.get(authentication, "grantType") === GrantType.AuthorizationCode;
    const isAuthenticationTypeOAuth2 = authType === AuthType.OAuth2;
    const isConnectSelfSigned = _.get(connection, "ssl.authTypeControl");

    if (
      !isAuthenticationTypeOAuth2 ||
      !(isGrantTypeAuthorizationCode || isConnectSelfSigned)
    )
      return null;

    return (
      <Collapsible title={$t('RestAPIDatasourceForm.7e7037c164d6acac')}>
        {isGrantTypeAuthorizationCode && (
          <FormInputContainer
            data-location-id={btoa("authentication.sendScopeWithRefreshToken")}
          >
            {this.renderDropdownControlViaFormControl(
              "authentication.sendScopeWithRefreshToken",
              [
                {
                  label: $t('RestAPIDatasourceForm.c3ac2ae6e255b51b'),
                  value: true,
                },
                {
                  label: $t('RestAPIDatasourceForm.14dfb0846ab744b5'),
                  value: false,
                },
              ],
              $t('RestAPIDatasourceForm.45b4f87a3e054cce'),
              "",
              false,
              "",
              !!_.get(authentication, "sendScopeWithRefreshToken"),
            )}
          </FormInputContainer>
        )}
        {isGrantTypeAuthorizationCode && (
          <FormInputContainer
            data-location-id={btoa(
              "authentication.refreshTokenClientCredentialsLocation",
            )}
          >
            {this.renderDropdownControlViaFormControl(
              "authentication.refreshTokenClientCredentialsLocation",
              [
                {
                  label: $t('RestAPIDatasourceForm.fc684b8dbaae283f'),
                  value: "BODY",
                },
                {
                  label: $t('RestAPIDatasourceForm.93035adbb2e1d026'),
                  value: "HEADER",
                },
              ],
              $t('RestAPIDatasourceForm.0eae5710fdf23608'),
              "",
              false,
              "",
            )}
          </FormInputContainer>
        )}
        {isConnectSelfSigned && (
          <FormInputContainer
            data-location-id={btoa("authentication.useSelfSignedCert")}
          >
            {this.renderCheckboxViaFormControl(
              "authentication.useSelfSignedCert",
              $t('RestAPIDatasourceForm.ba0f11865629e019'),
              "",
              false,
            )}
          </FormInputContainer>
        )}
      </Collapsible>
    );
  };

  renderOauth2CommonAdvanced = () => {
    return (
      <>
        <FormInputContainer data-location-id={btoa("authentication.audience")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.audience",
            label: $t('RestAPIDatasourceForm.7068b7a84975bf7b'),
            placeholderText: "https://example.com/oauth/audience",
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>
        <FormInputContainer data-location-id={btoa("authentication.resource")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.resource",
            label: $t('RestAPIDatasourceForm.14b182a153f8605c'),
            placeholderText: "https://example.com/oauth/resource",
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>
      </>
    );
  };

  renderOauth2ClientCredentials = () => {
    return (
      <>
        {this.renderOauth2Common()}
        {this.renderOauth2CommonAdvanced()}
      </>
    );
  };

  renderOauth2AuthorizationCode = () => {
    const { formData } = this.props;

    const redirectURL =
      window.location.origin + "/api/v1/datasources/authorize";

    return (
      <>
        {this.renderOauth2Common()}
        <FormInputContainer
          data-location-id={btoa("authentication.authorizationUrl")}
        >
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.authorizationUrl",
            label: $t('RestAPIDatasourceForm.8f0b25ad67688ad4'),
            placeholderText: "https://example.com/login/oauth/authorize",
            dataType: "TEXT",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>
        <FormInputContainer>
          <div style={{ width: "20vw" }}>
            <FormLabel>
              Redirect URL
              <br />
              <StyledInfo>
                Url that the oauth server should redirect to
              </StyledInfo>
            </FormLabel>
            <CopyToClipBoard copyText={redirectURL} />
          </div>
        </FormInputContainer>
        <FormInputContainer
          data-location-id={btoa(
            "authentication.customAuthenticationParameters",
          )}
        >
          {this.renderKeyValueControlViaFormControl(
            "authentication.customAuthenticationParameters",
            $t('RestAPIDatasourceForm.4439597cfc27bb24'),
            "",
            false,
          )}
        </FormInputContainer>
        <FormInputContainer data-location-id={btoa("authentication.expiresIn")}>
          {this.renderInputTextControlViaFormControl({
            configProperty: "authentication.expiresIn",
            label: $t('RestAPIDatasourceForm.96e97ddc3587f96f'),
            placeholderText: "3600",
            dataType: "NUMBER",
            encrypted: false,
            isRequired: false,
          })}
        </FormInputContainer>

        {!_.get(formData.authentication, "isAuthorizationHeader", true) &&
          this.renderOauth2CommonAdvanced()}
      </>
    );
  };

  // All components in formControls must be rendered via FormControl.
  // FormControl is the common wrapper for all formcontrol components and contains common elements i.e. label, subtitle, helpertext
  renderInputTextControlViaFormControl({
    configProperty,
    dataType,
    encrypted,
    fieldValidator,
    isRequired,
    isSecretExistsPath,
    label,
    placeholderText,
  }: {
    configProperty: string;
    label: string;
    placeholderText: string;
    dataType: "TEXT" | "PASSWORD" | "NUMBER";
    encrypted: boolean;
    isRequired: boolean;
    fieldValidator?: (value: string) => { isValid: boolean; message: string };
    isSecretExistsPath?: string;
  }) {
    return (
      <FormControl
        config={{
          id: "",
          isValid: false,
          isRequired: isRequired,
          controlType: "INPUT_TEXT",
          dataType: dataType,
          configProperty: configProperty,
          encrypted: encrypted,
          label: label,
          conditionals: {},
          placeholderText: placeholderText,
          formName: this.props.formName,
          validator: fieldValidator,
          isSecretExistsPath,
        }}
        formName={this.props.formName}
        multipleConfig={[]}
      />
    );
  }

  renderDropdownControlViaFormControl(
    configProperty: string,
    options: {
      label: string;
      value: string | boolean;
    }[],
    label: string,
    placeholderText: string,
    isRequired: boolean,
    subtitle?: string,
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValue?: any,
  ) {
    const config = {
      id: "",
      isValid: false,
      isRequired: isRequired,
      controlType: "DROP_DOWN",
      configProperty: configProperty,
      options: options,
      subtitle: subtitle,
      label: label,
      conditionals: {},
      placeholderText: placeholderText,
      formName: this.props.formName,
      initialValue: initialValue,
    };

    return (
      <FormControl
        config={config}
        formName={this.props.formName}
        multipleConfig={[]}
      />
    );
  }

  renderKeyValueControlViaFormControl(
    configProperty: string,
    label: string,
    placeholderText: string,
    isRequired: boolean,
  ) {
    const config = {
      id: "",
      configProperty: configProperty,
      isValid: false,
      controlType: "KEYVALUE_ARRAY",
      placeholderText: placeholderText,
      label: label,
      conditionals: {},
      formName: this.props.formName,
      isRequired: isRequired,
    };

    return (
      <FormControl
        config={config}
        formName={this.props.formName}
        multipleConfig={[]}
      />
    );
  }

  renderFilePickerControlViaFormControl(
    configProperty: string,
    label: string,
    placeholderText: string,
    isRequired: boolean,
    encrypted: boolean,
  ) {
    const config = {
      id: "",
      configProperty: configProperty,
      isValid: false,
      controlType: "FILE_PICKER",
      placeholderText: placeholderText,
      encrypted: encrypted,
      label: label,
      conditionals: {},
      formName: this.props.formName,
      isRequired: isRequired,
    };

    return (
      <FormControl
        config={config}
        formName={this.props.formName}
        multipleConfig={[]}
      />
    );
  }

  renderCheckboxViaFormControl(
    configProperty: string,
    label: string,
    placeholderText: string,
    isRequired: boolean,
  ) {
    return (
      <FormControl
        config={{
          id: "",
          isValid: false,
          isRequired: isRequired,
          controlType: "CHECKBOX",
          configProperty: configProperty,
          label: label,
          conditionals: {},
          placeholderText: placeholderText,
          formName: this.props.formName,
        }}
        formName={this.props.formName}
      />
    );
  }
}

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: AppState, props: any) => {
  const { currentEnvironment, datasource, formName } = props;
  const hintMessages = datasource && datasource.messages;

  const isFeatureEnabled = selectFeatureFlagCheck(
    state,
    FEATURE_FLAG.license_gac_enabled,
  );

  return {
    initialValues: datasourceToFormValues(datasource, currentEnvironment),
    formMeta: getFormMeta(formName)(state),
    messages: hintMessages,
    datasourceName: datasource?.name ?? "",
    isFeatureEnabled,
  };
};

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => {
  return {
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initializeReplayEntity: (id: string, data: any) =>
      dispatch(updateReplayEntity(id, data, ENTITY_TYPE.DATASOURCE)),
    updateDatasource: (
      // TODO: Fix this the next time the file is edited
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData: any,
      currEditingEnvId: string,
      onSuccess?: ReduxAction<unknown>,
    ) => dispatch(updateDatasource(formData, currEditingEnvId, onSuccess)),
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createDatasource: (formData: any, onSuccess?: ReduxAction<unknown>) =>
      dispatch(createDatasourceFromForm(formData, onSuccess)),
    toggleSaveActionFlag: (flag: boolean) =>
      dispatch(toggleSaveActionFlag(flag)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm<ApiDatasourceForm, DatasourceRestApiEditorProps>({
    form: DATASOURCE_REST_API_FORM,
    enableReinitialize: true,
  })(DatasourceRestAPIEditor),
);
