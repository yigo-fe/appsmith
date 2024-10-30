import {$t} from "locale/index";
import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import { AuditLogsUpgradePage } from "../../Upgrade/AuditLogsUpgradePage";

export const config: AdminConfigType = {
  icon: "file-list-2-line",
  type: SettingCategories.AUDIT_LOGS,
  categoryType: CategoryType.OTHER,
  controlType: SettingTypes.PAGE,
  component: AuditLogsUpgradePage,
  title: $t('auditlogs.e238b9c450b93378'),
  canSave: false,
  isFeatureEnabled: false,
} as AdminConfigType;
