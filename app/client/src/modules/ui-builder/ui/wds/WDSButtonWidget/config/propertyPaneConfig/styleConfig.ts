import {$t} from "locale/index";
import { capitalize } from "lodash";
import { ValidationTypes } from "constants/WidgetValidation";
import { COLORS, BUTTON_VARIANTS } from "@appsmith/wds";
import { objectKeys } from "@appsmith/utils";

export const propertyPaneStyleConfig = [
  {
    sectionName: $t('styleConfig.ff680bb6bfa3de22'),
    children: [
      {
        propertyName: "buttonVariant",
        label: $t('styleConfig.da5cfeb3aa566d16'),
        controlType: "ICON_TABS",
        fullWidth: true,
        helpText: $t('styleConfig.b55924df11139ba7'),
        options: objectKeys(BUTTON_VARIANTS).map((variant) => ({
          label: BUTTON_VARIANTS[variant],
          value: variant,
        })),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        isReusable: true,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: objectKeys(BUTTON_VARIANTS),
            default: objectKeys(BUTTON_VARIANTS)[0],
          },
        },
      },
      {
        propertyName: "buttonColor",
        label: $t('styleConfig.e741dfeb1ec9c4a4'),
        controlType: "DROP_DOWN",
        fullWidth: true,
        helpText: $t('styleConfig.0a4289c4ac13d10c'),
        options: Object.values(COLORS).map((semantic) => ({
          label: capitalize(semantic),
          value: semantic,
        })),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        isReusable: true,
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
    sectionName: $t('styleConfig.1757fac359f6b58d'),
    children: [
      {
        propertyName: "iconName",
        label: $t('styleConfig.67928040743b5ec2'),
        helpText: $t('styleConfig.278935f27dd81628'),
        controlType: "ICON_SELECT_V2",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
        },
      },
      {
        propertyName: "iconAlign",
        label: $t('styleConfig.2afc8de984167290'),
        helpText: $t('styleConfig.c2261c0a6225dcb0'),
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
