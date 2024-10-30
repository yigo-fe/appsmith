import {$t} from "locale/index";
import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import { AccessControlUpgradePage } from "../../Upgrade/AccessControlUpgradePage";

export const config: AdminConfigType = {
  icon: "user-3-line",
  type: SettingCategories.ACCESS_CONTROL,
  categoryType: CategoryType.ACL,
  controlType: SettingTypes.PAGE,
  component: AccessControlUpgradePage,
  title: $t('userlisting.dae308b8889c903e'),
  canSave: false,
  isFeatureEnabled: false,
} as AdminConfigType;
