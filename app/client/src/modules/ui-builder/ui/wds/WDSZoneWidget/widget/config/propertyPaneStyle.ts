import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneStyle = [
  {
    sectionName: $t('propertyPaneStyle.2c6dc99d0bd5d5de'),
    children: [
      {
        propertyName: "elevatedBackground",
        label: $t('propertyPaneStyle.b2c1225e9135c875'),
        controlType: "SWITCH",
        fullWidth: true,
        helpText:
          $t('propertyPaneStyle.8994699de0973c93'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
        isReusable: true,
      },
    ],
  },
];
