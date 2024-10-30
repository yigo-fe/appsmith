import {$t} from "locale/index";
import { BUTTON_VARIANTS, COLORS } from "@appsmith/wds";
import { ValidationTypes } from "constants/WidgetValidation";
import { capitalize } from "lodash";
import { objectKeys } from "@appsmith/utils";

export const propertyPaneStyleConfig = [
  {
    sectionName: $t('styleConfig.f6feda0fcc517b05'),
    children: [
      {
        propertyName: "variant",
        label: $t('styleConfig.99752e3f3ea0228b'),
        controlType: "ICON_TABS",
        fullWidth: true,
        helpText: $t('styleConfig.be40d93a6e4061d7'),
        options: objectKeys(BUTTON_VARIANTS).map((variant) => ({
          label: BUTTON_VARIANTS[variant],
          value: variant,
        })),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        defaultValue: "ghost",
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: objectKeys(BUTTON_VARIANTS),
            default: objectKeys(BUTTON_VARIANTS)[0],
          },
        },
      },
      {
        propertyName: "color",
        label: $t('styleConfig.65282f2f042eee79'),
        controlType: "DROP_DOWN",
        defaultValue: "accent",
        fullWidth: true,
        helpText: $t('styleConfig.3160c1fa1eec9830'),
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
      {
        propertyName: "alignment",
        helpText: $t('styleConfig.6ecb4b3989a0bf95'),
        label: $t('styleConfig.02c07baeaedc81f3'),
        controlType: "ICON_TABS",
        defaultValue: "start",
        isBindProperty: true,
        isTriggerProperty: false,
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
      },
    ],
  },
];
