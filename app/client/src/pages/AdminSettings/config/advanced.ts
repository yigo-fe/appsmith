import {$t} from "locale/index";
import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingSubtype,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";

export const config: AdminConfigType = {
  icon: "settings-line",
  type: SettingCategories.ADVANCED,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.GROUP,
  title: $t('advanced.d95f3c9bcba79b84'),
  canSave: true,
  settings: [
    {
      id: "APPSMITH_DB_URL",
      category: SettingCategories.ADVANCED,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: "Appsmith DB URL",
      subText:
        "* Persistence database URL for Appsmith instance. Change this to an external database for clustering",
    },
    {
      id: "APPSMITH_REDIS_URL",
      category: SettingCategories.ADVANCED,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: $t('advanced.fac75ba76cd5091b'),
      subText:
        "* Appsmith internally uses Redis for session storage. Change this to an external redis for clustering",
    },
    {
      id: "APPSMITH_CUSTOM_DOMAIN",
      category: SettingCategories.ADVANCED,
      controlType: SettingTypes.TEXTINPUT,
      controlSubType: SettingSubtype.TEXT,
      label: $t('advanced.95d95822ab2e49e5'),
      subText: "* Custom domain for your Appsmith instance",
    },
  ],
};
