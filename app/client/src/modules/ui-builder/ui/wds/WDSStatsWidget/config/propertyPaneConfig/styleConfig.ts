import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneStyleConfig = [
  {
    sectionName: $t('styleConfig.8a084f2a7c7af587'),
    children: [
      {
        propertyName: "elevatedBackground",
        label: $t('styleConfig.547e4fc9e8eccceb'),
        controlType: "SWITCH",
        fullWidth: true,
        helpText:
          $t('styleConfig.55a49355940dd171'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        isReusable: true,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
    ],
  },
];
