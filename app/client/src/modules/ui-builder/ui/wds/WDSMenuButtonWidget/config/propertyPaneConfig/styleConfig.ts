import {$t} from "locale/index";
import { capitalize } from "lodash";
import { ValidationTypes } from "constants/WidgetValidation";
import { BUTTON_VARIANTS, COLORS, ICONS } from "@appsmith/wds";
import { objectKeys } from "@appsmith/utils";

import type { MenuButtonWidgetProps } from "../../widget/types";

export const propertyPaneStyleConfig = [
  {
    sectionName: $t('styleConfig.f3104f4592705428'),
    children: [
      {
        propertyName: "triggerButtonVariant",
        label: $t('styleConfig.8935320508e75a89'),
        controlType: "ICON_TABS",
        helpText: $t('styleConfig.579c80a064cd699a'),
        options: objectKeys(BUTTON_VARIANTS).map((variant) => ({
          label: BUTTON_VARIANTS[variant],
          value: variant,
        })),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: objectKeys(BUTTON_VARIANTS),
            default: objectKeys(BUTTON_VARIANTS)[0],
          },
        },
      },
      {
        propertyName: "triggerButtonColor",
        label: $t('styleConfig.9f7b525d5d4b43ea'),
        controlType: "DROP_DOWN",
        fullWidth: true,
        helpText: $t('styleConfig.305c32b916d27419'),
        options: Object.values(COLORS).map((semantic) => ({
          label: capitalize(semantic),
          value: semantic,
        })),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: Object.values(COLORS),
            default: COLORS.accent,
          },
        },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.90795e1de2bc0850'),
    children: [
      {
        propertyName: "triggerButtonIconName",
        label: $t('styleConfig.90795e1de2bc0850'),
        helpText: $t('styleConfig.fb966341616fab04'),
        controlType: "ICON_SELECT_V2",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        updateHook: (
          props: MenuButtonWidgetProps,
          propertyPath: string,
          propertyValue: string,
        ) => {
          const propertiesToUpdate = [{ propertyPath, propertyValue }];

          if (!props.iconAlign) {
            propertiesToUpdate.push({
              propertyPath: "iconAlign",
              propertyValue: "start",
            });
          }

          return propertiesToUpdate;
        },
        dependencies: ["iconAlign"],
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: Object.keys(ICONS) as unknown as string[],
          },
        },
      },
      {
        propertyName: "triggerButtonIconAlign",
        label: $t('styleConfig.cb27698e0a798fcf'),
        helpText: $t('styleConfig.90086a16d41d5e56'),
        controlType: "ICON_TABS",
        defaultValue: "start",
        fullWidth: false,
        options: [
          {
            startIcon: "skip-left-line",
            value: "start",
          },
          {
            startIcon: "skip-right-line",
            value: "end",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["start", "end"],
          },
        },
      },
    ],
  },
];
