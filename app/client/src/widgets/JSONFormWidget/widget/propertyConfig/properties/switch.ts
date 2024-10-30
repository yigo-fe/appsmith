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
        label: $t('switch.a79bf19d6ecca0bb'),
        helpText: $t('switch.4abaec36f29c3c0b'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SWITCH),
        dependencies: ["schema", "sourceData"],
      },
    ],
    label: [
      {
        propertyName: "alignWidget",
        helpText: $t('switch.39e61f5ca088561e'),
        label: $t('switch.b34f0acb99922605'),
        controlType: "ICON_TABS",
        defaultValue: "LEFT",
        fullWidth: true,
        isBindProperty: true,
        isTriggerProperty: false,
        options: [
          {
            label: $t('switch.a174b1c1a92cda6f'),
            value: "LEFT",
          },
          {
            label: $t('switch.3fb031be73b39bdf'),
            value: "RIGHT",
          },
        ],
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SWITCH),
        dependencies: ["schema"],
      },
    ],
    events: [
      {
        helpText: $t('switch.08bc3118cd7f1f68'),
        propertyName: "onChange",
        label: "onChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SWITCH),
        dependencies: ["schema", "sourceData"],
      },
    ],
  },
};

export default PROPERTIES;
