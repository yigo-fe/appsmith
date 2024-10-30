import {$t} from "locale/index";
import { capitalize } from "lodash";
import { BUTTON_VARIANTS, COLORS } from "@appsmith/wds";
import { objectKeys } from "@appsmith/utils";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneStyleConfig = [
  {
    sectionName: $t('styleConfig.234a06c6ae592c4f'),
    children: [
      {
        propertyName: "buttonVariant",
        label: $t('styleConfig.dc8de7b4a4be0a2a'),
        controlType: "ICON_TABS",
        fullWidth: true,
        helpText: $t('styleConfig.19599c09bf6ebef6'),
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
        label: $t('styleConfig.9ff50af3c97b9ab4'),
        controlType: "DROP_DOWN",
        fullWidth: true,
        helpText: $t('styleConfig.4571f615f0375edd'),
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
];
