import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneStyle = [
  {
    sectionName: $t('propertyPaneStyle.79a83ecc2570d499'),
    children: [
      {
        propertyName: "elevatedBackground",
        label: $t('propertyPaneStyle.6d14ebbd82b007e0'),
        controlType: "SWITCH",
        fullWidth: true,
        helpText:
          $t('propertyPaneStyle.584ffae46d6e8f8b'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
    ],
  },
];
