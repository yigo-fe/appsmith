import {$t} from "locale/index";
import type { Dispatch } from "react";
import type { ReduxAction } from "ee/constants/ReduxActionConstants";
import { ReduxActionTypes } from "ee/constants/ReduxActionConstants";
import type {
  AdminConfigType,
  Setting,
} from "ee/pages/AdminSettings/config/types";
import {
  CategoryType,
  SettingCategories,
  SettingTypes,
} from "ee/pages/AdminSettings/config/types";
import { isAirgapped } from "ee/utils/airgapHelpers";

const isAirgappedInstance = isAirgapped();

export const config: AdminConfigType = {
  icon: "timer-2-line",
  type: SettingCategories.VERSION,
  categoryType: CategoryType.GENERAL,
  controlType: SettingTypes.GROUP,
  title: $t('version.78bb397bcf8a56a7'),
  canSave: false,
  settings: [
    {
      id: "APPSMITH_CURRENT_VERSION",
      category: SettingCategories.VERSION,
      controlType: SettingTypes.TEXT,
      label: $t('version.0e1a4e4292cb8896'),
    },
    {
      id: "APPSMITH_VERSION_READ_MORE",
      action: (dispatch?: Dispatch<ReduxAction<boolean>>) => {
        dispatch &&
          dispatch({
            type: ReduxActionTypes.TOGGLE_RELEASE_NOTES,
            payload: true,
          });
      },
      category: SettingCategories.VERSION,
      controlType: SettingTypes.CALLOUT,
      label: $t('version.fc84e9f9eb2dd859'),
    },
  ].filter((setting) =>
    isAirgappedInstance ? setting.id !== "APPSMITH_VERSION_READ_MORE" : true,
  ) as Setting[],
};
