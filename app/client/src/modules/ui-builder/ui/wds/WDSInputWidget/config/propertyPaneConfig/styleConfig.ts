import {$t} from "locale/index";
import { InputTypes } from "components/constants";
import { ValidationTypes } from "constants/WidgetValidation";

import type { InputWidgetProps } from "../../widget/types";
import { ICONS } from "@appsmith/wds";

export const propertyPaneStyleConfig = [
  {
    sectionName: $t('styleConfig.948d14b462ad099a'),
    children: [
      {
        propertyName: "iconName",
        label: $t('styleConfig.948d14b462ad099a'),
        helpText: $t('styleConfig.cb3a4022812d6fb8'),
        controlType: "ICON_SELECT_V2",
        isBindProperty: true,
        isTriggerProperty: false,
        isJSConvertible: true,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: Object.keys(ICONS),
          },
        },
        hidden: (props: InputWidgetProps) => {
          return props.inputType === InputTypes.MULTI_LINE_TEXT;
        },
        dependencies: ["inputType"],
      },
      {
        propertyName: "iconAlign",
        label: $t('styleConfig.17af79eff1109cb0'),
        helpText: $t('styleConfig.767cbcf0d34b9794'),
        controlType: "ICON_TABS",
        defaultValue: "left",
        fullWidth: false,
        options: [
          {
            startIcon: "skip-left-line",
            value: "left",
          },
          {
            startIcon: "skip-right-line",
            value: "right",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: InputWidgetProps) =>
          props.inputType === InputTypes.MULTI_LINE_TEXT || !props.iconName,
        dependencies: ["iconName", "inputType"],
      },
    ],
  },
];
