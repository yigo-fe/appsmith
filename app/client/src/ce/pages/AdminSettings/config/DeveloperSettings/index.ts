import {$t} from "locale/index";
import type { AdminConfigType } from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import { googleMapsConfig } from "./googleMaps";

export const config: AdminConfigType = {
  icon: "snippet",
  type: SettingCategories.DEVELOPER_SETTINGS,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.GROUP,
  title: $t('index.c38cd3a8f9b12504'),
  canSave: true,
  settings: [...googleMapsConfig],
};
