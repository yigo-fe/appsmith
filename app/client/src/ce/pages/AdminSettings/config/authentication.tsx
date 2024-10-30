import {$t} from "locale/index";
import React from "react";
import {
  EMAIL_SETUP_DOC,
  GITHUB_SIGNUP_SETUP_DOC,
  GOOGLE_SIGNUP_SETUP_DOC,
} from "constants/ThirdPartyConstants";
import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingSubtype,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import type { AuthMethodType } from "pages/AdminSettings/Authentication/AuthPage";
import { AuthPage } from "pages/AdminSettings/Authentication/AuthPage";
import Google from "assets/images/Google.png";
import SamlSso from "assets/images/saml.svg";
import OIDC from "assets/images/oidc.svg";
import Github from "assets/images/Github.png";
import Lock from "assets/images/lock-password-line.svg";
import { useSelector } from "react-redux";
import {
  getThirdPartyAuths,
  getIsFormLoginEnabled,
} from "ee/selectors/tenantSelectors";
import {
  FORM_LOGIN_DESC,
  GITHUB_AUTH_DESC,
  GOOGLE_AUTH_DESC,
  OIDC_AUTH_DESC,
  SAML_AUTH_DESC,
  createMessage,
} from "ee/constants/messages";
import { isSAMLEnabled, isOIDCEnabled } from "ee/utils/planHelpers";
import { selectFeatureFlags } from "ee/selectors/featureFlagsSelectors";
import store from "store";
const featureFlags = selectFeatureFlags(store.getState());

import { getAppsmithConfigs } from "ee/configs";
const { mailEnabled } = getAppsmithConfigs();

const FormAuth: AdminConfigType = {
  type: SettingCategories.FORM_AUTH,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.GROUP,
  title: $t('authentication.59c0364fc3bd6467'),
  subText: createMessage(FORM_LOGIN_DESC),
  canSave: true,
  settings: [
    {
      id: "APPSMITH_FORM_LOGIN_DISABLED",
      category: SettingCategories.FORM_AUTH,
      controlType: SettingTypes.TOGGLE,
      label: $t('authentication.28e99f86221078e1'),
    },
    {
      id: "APPSMITH_SIGNUP_DISABLED",
      category: SettingCategories.FORM_AUTH,
      controlType: SettingTypes.TOGGLE,
      label: $t('authentication.ec2561337e42fa17'),
      toggleText: (value: boolean) =>
        value
          ? $t('authentication.76573db1e8137d59')
          : $t('authentication.52b333eb8c81893c'),
    },
    {
      id: "emailVerificationEnabled",
      category: SettingCategories.FORM_AUTH,
      controlType: SettingTypes.TOGGLE,
      label: $t('authentication.18f0a323dbde9393'),
      isDisabled: (settings) => {
        // Disabled when mail is not enabled, unless setting already enabled then enabled
        if (!settings) {
          return true;
        }

        if (settings.emailVerificationEnabled) {
          return false;
        }

        return !mailEnabled;
      },
    },
    {
      id: "APPSMITH_FORM_DISABLED_BANNER",
      category: SettingCategories.FORM_AUTH,
      controlType: SettingTypes.LINK,
      label:
        $t('authentication.5578d66d967647ee'),
      url: EMAIL_SETUP_DOC,
      calloutType: "warning",
      isVisible: (settings) => {
        // Visible when mail is disabled, unless setting already enabled then visible
        if (!settings) {
          return false;
        }

        if (settings.emailVerificationEnabled) {
          return false;
        }

        return !mailEnabled;
      },
    },
    {
      id: "APPSMITH_FORM_CALLOUT_BANNER",
      category: SettingCategories.FORM_AUTH,
      controlType: SettingTypes.CALLOUT,
      label:
        $t('authentication.3e5b34088d37c0db'),
      calloutType: "warning",
      isVisible: (settings) => {
        // Visible when mail is enabled and setting is true
        if (!settings) {
          return false;
        }

        return settings.emailVerificationEnabled && mailEnabled;
      },
    },
    {
      id: "APPSMITH_FORM_ERROR_BANNER",
      category: SettingCategories.FORM_AUTH,
      controlType: SettingTypes.LINK,
      label:
        $t('authentication.ae8cfb7418868dea'),
      calloutType: "error",
      isVisible: (settings) => {
        // Visible when mail is disabled but settings is true
        if (!settings) {
          return false;
        }

        if (!mailEnabled && settings.emailVerificationEnabled) {
          return true;
        }

        return false;
      },
    },
  ],
};

export const GoogleAuth: AdminConfigType = {
  type: SettingCategories.GOOGLE_AUTH,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.GROUP,
  title: "Google authentication",
  subText: createMessage(GOOGLE_AUTH_DESC),
  canSave: true,
  settings: [
    {
      id: "APPSMITH_OAUTH2_GOOGLE_READ_MORE",
      category: SettingCategories.GOOGLE_AUTH,
      controlType: SettingTypes.CALLOUT,
      label: $t('authentication.22278d0077a5cc9e'),
      url: GOOGLE_SIGNUP_SETUP_DOC,
    },
    {
      id: "APPSMITH_OAUTH2_GOOGLE_JS_ORIGIN_URL",
      category: SettingCategories.GOOGLE_AUTH,
      controlType: SettingTypes.UNEDITABLEFIELD,
      label: $t('authentication.8aeb3994a71f08f6'),
      fieldName: "js-origin-url-form",
      value: "",
      tooltip:
        "This URL will be used while configuring the Google OAuth Client ID's authorized JavaScript origins",
      helpText: "Paste this URL in your Google developer console.",
    },
    {
      id: "APPSMITH_OAUTH2_GOOGLE_REDIRECT_URL",
      category: SettingCategories.GOOGLE_AUTH,
      controlType: SettingTypes.UNEDITABLEFIELD,
      label: $t('authentication.c36f5f932c6a45a8'),
      fieldName: "redirect-url-form",
      value: "/login/oauth2/code/google",
      tooltip:
        "This URL will be used while configuring the Google OAuth Client ID's authorized redirect URIs",
      helpText: "Paste this URL in your Google developer console.",
    },
    {
      id: "APPSMITH_OAUTH2_GOOGLE_CLIENT_ID",
      category: SettingCategories.GOOGLE_AUTH,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: $t('authentication.9c10990576bc16f6'),
      isRequired: true,
    },
    {
      id: "APPSMITH_OAUTH2_GOOGLE_CLIENT_SECRET",
      category: SettingCategories.GOOGLE_AUTH,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: $t('authentication.a9e084a120524583'),
      isRequired: true,
    },
    {
      id: "APPSMITH_SIGNUP_ALLOWED_DOMAINS",
      category: SettingCategories.GOOGLE_AUTH,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: $t('authentication.e41f87338dcf64be'),
      placeholder: "domain1.com, domain2.com",
    },
  ],
};

export const GithubAuth: AdminConfigType = {
  type: SettingCategories.GITHUB_AUTH,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.GROUP,
  title: $t('authentication.1c465d0f82e1c21c'),
  subText: createMessage(GITHUB_AUTH_DESC),
  canSave: true,
  settings: [
    {
      id: "APPSMITH_OAUTH2_GITHUB_READ_MORE",
      category: SettingCategories.GITHUB_AUTH,
      controlType: SettingTypes.CALLOUT,
      label: $t('authentication.22278d0077a5cc9e'),
      url: GITHUB_SIGNUP_SETUP_DOC,
    },
    {
      id: "APPSMITH_OAUTH2_GITHUB_HOMEPAGE_URL",
      category: SettingCategories.GITHUB_AUTH,
      controlType: SettingTypes.UNEDITABLEFIELD,
      label: $t('authentication.d85f5eed631d7ab7'),
      fieldName: "homepage-url-form",
      value: "",
      tooltip:
        $t('authentication.35369ce51677daba'),
      helpText: $t('authentication.5c4a4bb7fef07cb6'),
    },
    {
      id: "APPSMITH_OAUTH2_GITHUB_REDIRECT_URL",
      category: SettingCategories.GITHUB_AUTH,
      controlType: SettingTypes.UNEDITABLEFIELD,
      label: $t('authentication.c36f5f932c6a45a8'),
      fieldName: "callback-url-form",
      value: "/login/oauth2/code/github",
      tooltip:
        $t('authentication.54a3eb8f285fbade'),
      helpText: $t('authentication.5c4a4bb7fef07cb6'),
    },
    {
      id: "APPSMITH_OAUTH2_GITHUB_CLIENT_ID",
      category: SettingCategories.GITHUB_AUTH,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: $t('authentication.9c10990576bc16f6'),
      isRequired: true,
    },
    {
      id: "APPSMITH_OAUTH2_GITHUB_CLIENT_SECRET",
      category: SettingCategories.GITHUB_AUTH,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: $t('authentication.a9e084a120524583'),
      isRequired: true,
    },
  ],
};

export const FormAuthCallout: AuthMethodType = {
  id: "APPSMITH_FORM_LOGIN_AUTH",
  category: SettingCategories.FORM_AUTH,
  label: $t('authentication.59c0364fc3bd6467'),
  subText: createMessage(FORM_LOGIN_DESC),
  image: Lock,
  icon: "lock-password-line",
  isFeatureEnabled: true,
};

export const GoogleAuthCallout: AuthMethodType = {
  id: "APPSMITH_GOOGLE_AUTH",
  category: SettingCategories.GOOGLE_AUTH,
  label: "Google",
  subText: createMessage(GOOGLE_AUTH_DESC),
  image: Google,
  isFeatureEnabled: true,
};

export const GithubAuthCallout: AuthMethodType = {
  id: "APPSMITH_GITHUB_AUTH",
  category: SettingCategories.GITHUB_AUTH,
  label: "GitHub",
  subText: createMessage(GITHUB_AUTH_DESC),
  image: Github,
  isFeatureEnabled: true,
};

export const SamlAuthCallout: AuthMethodType = {
  id: "APPSMITH_SAML_AUTH",
  category: SettingCategories.SAML_AUTH,
  label: "SAML 2.0",
  subText: createMessage(SAML_AUTH_DESC),
  image: SamlSso,
  isFeatureEnabled: isSAMLEnabled(featureFlags),
};

export const OidcAuthCallout: AuthMethodType = {
  id: "APPSMITH_OIDC_AUTH",
  category: SettingCategories.OIDC_AUTH,
  label: "OIDC",
  subText: createMessage(OIDC_AUTH_DESC),
  image: OIDC,
  isFeatureEnabled: isOIDCEnabled(featureFlags),
};

const AuthMethods = [
  OidcAuthCallout,
  SamlAuthCallout,
  GoogleAuthCallout,
  GithubAuthCallout,
  FormAuthCallout,
];

function AuthMain() {
  FormAuthCallout.isConnected = useSelector(getIsFormLoginEnabled);
  const socialLoginList = useSelector(getThirdPartyAuths);

  GoogleAuth.isConnected = GoogleAuthCallout.isConnected =
    socialLoginList.includes("google");
  GithubAuth.isConnected = GithubAuthCallout.isConnected =
    socialLoginList.includes("github");

  return <AuthPage authMethods={AuthMethods} />;
}

export const config: AdminConfigType = {
  icon: "lock-password-line",
  type: SettingCategories.AUTHENTICATION,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.PAGE,
  title: $t('authentication.98ac8cdbb613e3dc'),
  canSave: false,
  children: [FormAuth, GoogleAuth, GithubAuth],
  component: AuthMain,
};
