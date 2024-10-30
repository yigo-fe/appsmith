import {$t} from "locale/index";
import React from "react";
import { isEmail } from "utils/formhelpers";
import type {
  AdminConfigType,
  Setting,
} from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingSubtype,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import BrandingBadge from "pages/AppViewer/BrandingBadge";
import { TagInput } from "@appsmith/ads-old";
import localStorage from "utils/localStorage";
import isUndefined from "lodash/isUndefined";
import { AppsmithFrameAncestorsSetting } from "pages/Applications/EmbedSnippet/Constants/constants";
import { formatEmbedSettings } from "pages/Applications/EmbedSnippet/Utils/utils";

export const APPSMITH_INSTANCE_NAME_SETTING_SETTING: Setting = {
  id: "instanceName",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.TEXTINPUT,
  controlSubType: SettingSubtype.TEXT,
  label: $t('general.d199062d6d8ccfff'),
  placeholder: "appsmith/prod",
};

export const APPSMITH_ADMIN_EMAILS_SETTING: Setting = {
  id: "APPSMITH_ADMIN_EMAILS",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.TAGINPUT,
  controlSubType: SettingSubtype.EMAIL,
  label: $t('general.6c0e8aaea95ef82e'),
  subText: "* Emails of the users who can modify instance settings",
  placeholder: "Jane@example.com",
  validate: (value: string) => {
    if (
      value &&
      !value
        .split(",")
        .reduce((prev, curr) => prev && isEmail(curr.trim()), true)
    ) {
      return $t('general.8ba689b33e07fe73');
    }
  },
};

export const APPSMITH_DISABLE_TELEMETRY_SETTING: Setting = {
  id: "APPSMITH_DISABLE_TELEMETRY",
  name: "APPSMITH_DISABLE_TELEMETRY",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.CHECKBOX,
  label: $t('general.e19dcdcf16f088fc'),
  text: $t('general.9164905c0e6ac589'),
};

export const APPSMITH_HIDE_WATERMARK_SETTING: Setting = {
  id: "hideWatermark",
  name: "hideWatermark",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.CHECKBOX,
  label: "Appsmith watermark",
  text: "Hide Appsmith watermark",
  isFeatureEnabled: false,
  isDisabled: () => true,
  textSuffix: <BrandingBadge />,
};

export const APPSMITH_SHOW_ROLES_AND_GROUPS_SETTING: Setting = {
  id: "showRolesAndGroups",
  name: "showRolesAndGroups",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.CHECKBOX,
  label: $t('general.6dc18c9b83a4a166'),
  text: $t('general.25da33aff60e91f0'),
  isFeatureEnabled: false,
  isDisabled: () => true,
};

export const APPSMITH_SINGLE_USER_PER_SESSION_SETTING: Setting = {
  id: "singleSessionPerUserEnabled",
  name: "singleSessionPerUserEnabled",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.CHECKBOX,
  label: $t('general.e3d3778ff240c2ad'),
  text: $t('general.81b5834d6aec3959'),
  isFeatureEnabled: false,
  isDisabled: () => true,
};

export const APPSMITH_USER_SESSION_TIMEOUT_SETTING: Setting = {
  id: "userSessionTimeoutInMinutes",
  name: "userSessionTimeoutInMinutes",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.TEXTINPUT,
  label: $t('general.e819df2565b1a5c6'),
  subText:
    "* Default duration is 30 days. To change, enter the new duration in DD:HH:MM format",
  helpText:
    $t('general.2b2d117b30a0f82c'),
  isFeatureEnabled: false,
  isEnterprise: true,
  isDisabled: () => true,
};

export const APPSMITH_IS_ATOMIC_PUSH_ALLOWED: Setting = {
  id: "isAtomicPushAllowed",
  name: "isAtomicPushAllowed",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.CHECKBOX,
  label: $t('general.1f6e48d89f0522a0'),
  text: $t('general.8d50d01437d50f0b'),
};

export const APPSMITH_ALLOWED_FRAME_ANCESTORS_SETTING: Setting = {
  id: "APPSMITH_ALLOWED_FRAME_ANCESTORS",
  name: "APPSMITH_ALLOWED_FRAME_ANCESTORS",
  category: SettingCategories.GENERAL,
  controlType: SettingTypes.RADIO,
  label: $t('general.a65f3737416956b7'),
  controlTypeProps: {
    options: [
      {
        badge: $t('general.f68220121d5534a2'),
        tooltip: {
          icon: "question-line",
          text: "Lets all domains, including malicious ones, embed your Appsmith apps. ",
          linkText: $t('general.78c8c05b98c5ae8e'),
          link: "https://docs.appsmith.com/getting-started/setup/instance-configuration/frame-ancestors#why-should-i-control-this",
        },
        label: $t('general.5fedcf92d06d00aa'),
        value: AppsmithFrameAncestorsSetting.ALLOW_EMBEDDING_EVERYWHERE,
      },
      {
        label: $t('general.df3ed0a010a7edd0'),
        value: AppsmithFrameAncestorsSetting.LIMIT_EMBEDDING,
        nodeLabel: $t('general.c664753ca516b5eb'),
        node: <TagInput input={{}} placeholder={""} type={"text"} />,
        nodeInputPath: "input",
        nodeParentClass: "tag-input",
      },
      {
        label: $t('general.d1cbf6df1ac610f9'),
        value: AppsmithFrameAncestorsSetting.DISABLE_EMBEDDING_EVERYWHERE,
      },
    ],
  },
  format: formatEmbedSettings,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse: (value: { value: string; additionalData?: any }) => {
    // Retrieve values from local storage while switching to limit by url option
    const sources = isUndefined(value.additionalData)
      ? localStorage.getItem("ALLOWED_FRAME_ANCESTORS") ?? ""
      : value.additionalData.replaceAll(",", " ");

    // If they are one of the other options we don't store it in storage since it will
    // set in the env variable on save
    if (sources !== "*" && sources !== "'none'") {
      localStorage.setItem("ALLOWED_FRAME_ANCESTORS", sources);
    }

    if (
      value.value === AppsmithFrameAncestorsSetting.ALLOW_EMBEDDING_EVERYWHERE
    ) {
      return "*";
    } else if (
      value.value === AppsmithFrameAncestorsSetting.DISABLE_EMBEDDING_EVERYWHERE
    ) {
      return "'none'";
    } else {
      return sources;
    }
  },
  validate: (value: string) => {
    if (!value) {
      return $t('general.8bd8751b233d0d01');
    }
  },
};

export const config: AdminConfigType = {
  icon: "settings-2-line",
  type: SettingCategories.GENERAL,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.GROUP,
  title: $t('general.5cbe4154706ef887'),
  canSave: true,
  settings: [
    APPSMITH_INSTANCE_NAME_SETTING_SETTING,
    APPSMITH_ADMIN_EMAILS_SETTING,
    APPSMITH_DISABLE_TELEMETRY_SETTING,
    APPSMITH_HIDE_WATERMARK_SETTING,
    APPSMITH_SHOW_ROLES_AND_GROUPS_SETTING,
    APPSMITH_SINGLE_USER_PER_SESSION_SETTING,
    APPSMITH_USER_SESSION_TIMEOUT_SETTING,
    APPSMITH_IS_ATOMIC_PUSH_ALLOWED,
    APPSMITH_ALLOWED_FRAME_ANCESTORS_SETTING,
  ],
} as AdminConfigType;
