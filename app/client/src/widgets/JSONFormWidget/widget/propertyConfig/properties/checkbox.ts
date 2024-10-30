import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { FieldType } from "widgets/JSONFormWidget/constants";
import type { HiddenFnParams } from "../helper";
import { getSchemaItem, getAutocompleteProperties } from "../helper";

const PROPERTIES = {
  content: {
    data: [
      {
        propertyName: "defaultValue",
        label: $t('checkbox.b58e54ef2c30b2de'),
        helpText: $t('checkbox.a31f10eca77bf2b2'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.CHECKBOX),
        dependencies: ["schema", "sourceData"],
      },
    ],
    events: [
      {
        helpText: $t('checkbox.e5cdfd7c6c6c377f'),
        propertyName: "onCheckChange",
        label: "onCheckChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.CHECKBOX),
        dependencies: ["schema"],
      },
    ],
    label: [
      {
        propertyName: "alignWidget",
        helpText: $t('checkbox.ca3dd3e7ed5b7c48'),
        label: $t('checkbox.d59d21f324022fb9'),
        controlType: "ICON_TABS",
        defaultValue: "LEFT",
        fullWidth: true,
        options: [
          {
            label: $t('checkbox.6e9dd9df9b567bc1'),
            value: "LEFT",
          },
          {
            label: $t('checkbox.5460325585f18c6e'),
            value: "RIGHT",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.CHECKBOX),
        dependencies: ["schema"],
      },
    ],
  },
};

export default PROPERTIES;
