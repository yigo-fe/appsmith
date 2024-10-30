import {$t} from "locale/index";
import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import { ProvisioningUpgradePage } from "../../Upgrade/ProvisioningUpgradePage";

export const config: AdminConfigType = {
  icon: "user-follow-line",
  type: SettingCategories.PROVISIONING,
  categoryType: CategoryType.ACL,
  controlType: SettingTypes.PAGE,
  component: ProvisioningUpgradePage,
  title: $t('provisioning.ce86b95ad702da20'),
  canSave: false,
  isFeatureEnabled: false,
  isEnterprise: true,
} as AdminConfigType;
