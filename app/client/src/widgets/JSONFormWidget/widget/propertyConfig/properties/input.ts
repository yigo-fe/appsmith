import {$t} from "locale/index";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { CurrencyDropdownOptions } from "widgets/CurrencyInputWidget/component/CurrencyCodeDropdown";
import { FieldType, INPUT_TYPES } from "widgets/JSONFormWidget/constants";
import type { HiddenFnParams } from "../helper";
import { getAutocompleteProperties, getSchemaItem } from "../helper";
import type { InputFieldProps } from "widgets/JSONFormWidget/fields/InputField";
import { ISDCodeDropdownOptions } from "widgets/PhoneInputWidget/component/ISDCodeDropdown";
import type { JSONFormWidgetProps } from "../..";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import { ICON_NAMES } from "WidgetProvider/constants";

function defaultValueValidation(
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  props: JSONFormWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lodash: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  propertyPath: string,
): ValidationResponse {
  const propertyPathChunks = propertyPath.split(".");
  const parentPath = propertyPathChunks.slice(0, -1).join(".");
  const schemaItem = lodash.get(props, parentPath);
  const { fieldType } = schemaItem;

  if (value === null || value === undefined) {
    return {
      isValid: true,
      parsed: value,
      messages: [{ name: "", message: "" }],
    };
  }

  // Cannot use FieldType typing check as this whole method is passed as string and executed on worker, so it results
  // any methods/variable (closure) usage as reference error.
  // CAUTION! - make sure the correct fieldType is used here as string.
  if (fieldType === "Number Input" || fieldType === "Currency Input") {
    const parsed = Number(value);

    if (typeof value === "string") {
      if (value.trim() === "") {
        return {
          isValid: true,
          parsed: undefined,
          messages: [{ name: "", message: "" }],
        };
      }

      if (!Number.isFinite(parsed)) {
        return {
          isValid: false,
          parsed: undefined,
          messages: [
            {
              name: "TypeError",
              message: $t('input.51f4077b64b70e53'),
            },
          ],
        };
      }
    }

    return {
      isValid: true,
      parsed,
      messages: [{ name: "", message: "" }],
    };
  }

  if (lodash.isObject(value)) {
    return {
      isValid: false,
      parsed: JSON.stringify(value, null, 2),
      messages: [
        {
          name: "TypeError",
          message: $t('input.bc1fa552a59f0764'),
        },
      ],
    };
  }

  let parsed = value;
  let isValid = lodash.isString(parsed);

  if (!isValid) {
    try {
      parsed = lodash.toString(parsed);
      isValid = true;
    } catch (e) {
      return {
        isValid: false,
        parsed: "",
        messages: [
          {
            name: "TypeError",
            message: $t('input.bc1fa552a59f0764'),
          },
        ],
      };
    }
  }

  return {
    isValid,
    parsed: parsed,
    messages: [{ name: "", message: "" }],
  };
}

export function minValueValidation(
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  min: any,
  props: JSONFormWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lodash: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  propertyPath: string,
) {
  const propertyPathChunks = propertyPath.split(".");
  const parentPath = propertyPathChunks.slice(0, -1).join(".");
  const schemaItem = lodash.get(props, parentPath);
  const max = schemaItem.maxNum;
  const value = min;

  min = Number(min);

  if (lodash?.isNil(value) || value === "") {
    return {
      isValid: true,
      parsed: undefined,
      messages: [{ name: "", message: "" }],
    };
  } else if (!Number.isFinite(min)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('input.eceec2d68b3af321'),
        },
      ],
    };
  } else if (max !== undefined && min >= max) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('input.ccb3a66af0973b3a'),
        },
      ],
    };
  } else {
    return {
      isValid: true,
      parsed: min,
      messages: [{ name: "", message: "" }],
    };
  }
}

export function maxValueValidation(
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  max: any,
  props: JSONFormWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lodash: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  propertyPath: string,
) {
  const propertyPathChunks = propertyPath.split(".");
  const parentPath = propertyPathChunks.slice(0, -1).join(".");
  const schemaItem = lodash.get(props, parentPath);
  const min = schemaItem.minNum;
  const value = max;

  max = Number(max);

  if (lodash?.isNil(value) || value === "") {
    return {
      isValid: true,
      parsed: undefined,
      messages: [{ name: "", message: "" }],
    };
  } else if (!Number.isFinite(max)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('input.eceec2d68b3af321'),
        },
      ],
    };
  } else if (min !== undefined && max <= min) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('input.d5863e9a4d9cc0f7'),
        },
      ],
    };
  } else {
    return {
      isValid: true,
      parsed: Number(max),
      messages: [""],
    };
  }
}

const PROPERTIES = {
  content: {
    data: [
      {
        propertyName: "defaultValue",
        helpText:
          $t('input.1cf0b2f72c3cf6fd'),
        label: $t('input.44f2875d436b6ba4'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: $t('input.0ed6e70d6f20942f'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultValueValidation,
            expected: {
              type: "string or number",
              example: `John | 123`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(INPUT_TYPES) ||
          getSchemaItem(...args).fieldTypeMatches(FieldType.PHONE_NUMBER_INPUT),
        dependencies: ["schema"],
      },
      {
        helpText:
          $t('input.84125238835d924d'),
        propertyName: "defaultValue",
        label: $t('input.44f2875d436b6ba4'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: "(000) 000-0000",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultValueValidation,
            expected: {
              type: "string",
              example: `(000) 000-0000`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(
            FieldType.PHONE_NUMBER_INPUT,
          ),
        dependencies: ["schema"],
      },
      {
        propertyName: "dialCode",
        helpText: $t('input.f08aa5f4b6b9223c'),
        label: $t('input.fe87145916d58ebd'),
        enableSearch: true,
        dropdownHeight: "195px",
        controlType: "DROP_DOWN",
        virtual: true,
        searchPlaceholderText: $t('input.36521bc395abed9f'),
        options: ISDCodeDropdownOptions,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(
            FieldType.PHONE_NUMBER_INPUT,
          ),
        dependencies: ["schema"],
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "currencyCountryCode",
        helpText: $t('input.d4eeb812590fad6f'),
        label: $t('input.a3ef1603c2e084ac'),
        enableSearch: true,
        dropdownHeight: "195px",
        controlType: "DROP_DOWN",
        virtual: true,
        searchPlaceholderText: $t('input.75e7d28ca93b371e'),
        options: CurrencyDropdownOptions,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.CURRENCY_INPUT),
        dependencies: ["schema"],
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "allowDialCodeChange",
        label: $t('input.2bc57b7768da1c8f'),
        helpText: $t('input.09525bd115221533'),
        controlType: "SWITCH",
        isJSConvertible: false,
        isBindProperty: true,
        isTriggerProperty: false,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(
            FieldType.PHONE_NUMBER_INPUT,
          ),
        dependencies: ["schema"],
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "allowCurrencyChange",
        label: $t('input.55b8dee554f57f51'),
        helpText: $t('input.37e40b8ae698a7fd'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.CURRENCY_INPUT),
        dependencies: ["schema"],
      },
      {
        propertyName: "decimalsInCurrency",
        helpText: $t('input.26f0dce55308fb2f'),
        label: $t('input.56f0b489e34b2fd6'),
        controlType: "DROP_DOWN",
        options: [
          {
            label: "0",
            value: 0,
          },
          {
            label: "1",
            value: 1,
          },
          {
            label: "2",
            value: 2,
          },
          {
            label: "3",
            value: 3,
          },
          {
            label: "4",
            value: 4,
          },
          {
            label: "5",
            value: 5,
          },
          {
            label: "6",
            value: 6,
          },
        ],
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.CURRENCY_INPUT),
        dependencies: ["schema"],
        isBindProperty: false,
        isTriggerProperty: false,
      },
    ],
    general: [
      {
        propertyName: "placeholderText",
        helpText: $t('input.d3c1aec633c6e253'),
        label: $t('input.288745eddee63e13'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: $t('input.288745eddee63e13'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(INPUT_TYPES),
        dependencies: ["schema"],
      },
    ],
    validation: [
      {
        propertyName: "isRequired",
        label: $t('input.cf6e0e0303595dec'),
        helpText: $t('input.282e78a4971fecd2'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) => {
          return getSchemaItem(...args).compute(
            (schemaItem) =>
              schemaItem.fieldType === FieldType.OBJECT ||
              schemaItem.fieldType === FieldType.ARRAY,
          );
        },
        dependencies: ["schema", "sourceData"],
      },
      {
        propertyName: "maxChars",
        helpText: $t('input.683eb50925ed5dd2'),
        label: $t('input.fc12abb8787ad394'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: "255",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.NUMBER },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.TEXT_INPUT),
        dependencies: ["schema"],
      },
      {
        propertyName: "minNum",
        helpText: $t('input.94dc1e678022550c'),
        label: $t('input.ac74e7d17a97606d'),
        controlType: "INPUT_TEXT",
        placeholderText: "1",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: minValueValidation,
            expected: {
              type: "number",
              example: `1`,
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.NUMBER_INPUT),
        dependencies: ["schema"],
      },
      {
        propertyName: "maxNum",
        helpText: $t('input.d4c007d1a847f668'),
        label: $t('input.1c599abee1bf9b0d'),
        controlType: "INPUT_TEXT",
        placeholderText: "100",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: maxValueValidation,
            expected: {
              type: "number",
              example: `100`,
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.NUMBER_INPUT),
        dependencies: ["schema"],
      },
      {
        propertyName: "regex",
        helpText:
          $t('input.65c54cedd0897445'),
        label: $t('input.f205925496f24f52'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$",
        inputType: "TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.REGEX },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(INPUT_TYPES),
        dependencies: ["schema"],
      },
      {
        propertyName: "validation",
        helpText: $t('input.eae69e6ccde9be8d'),
        label: $t('input.7ec3acb86cd53757'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: "{{ Input1.text.length > 0 }}",
        inputType: "TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
          params: { default: true },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(INPUT_TYPES),
        dependencies: ["schema"],
      },
      {
        propertyName: "errorMessage",
        helpText:
          $t('input.f9ecc7723a7eca31'),
        label: $t('input.f213708498d336d5'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: $t('input.6faf74674ac07cca'),
        inputType: "TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(INPUT_TYPES),
        dependencies: ["schema"],
      },
      {
        propertyName: "isSpellCheck",
        label: $t('input.c300ada647def2e6'),
        helpText:
          $t('input.c813972be0ac30dd'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.TEXT_INPUT),
        dependencies: ["schema"],
      },
    ],
    events: [
      {
        propertyName: "onTextChanged",
        helpText: $t('input.483e511b70e824f2'),
        label: "onTextChanged",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(INPUT_TYPES),
        dependencies: ["schema"],
      },
      {
        propertyName: "onEnterKeyPress",
        helpText: "on submit (when the enter key is pressed)",
        label: "onEnterKeyPress",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(INPUT_TYPES),
        dependencies: ["schema"],
      },
    ],
  },
  style: {
    icon: [
      {
        propertyName: "iconName",
        label: $t('input.346394088cba2e02'),
        helpText: $t('input.01a3b14f75bb100a'),
        controlType: "ICON_SELECT",
        isBindProperty: true,
        isTriggerProperty: false,
        isJSConvertible: true,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ICON_NAMES,
          },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes([
            FieldType.TEXT_INPUT,
            FieldType.EMAIL_INPUT,
            FieldType.PASSWORD_INPUT,
            FieldType.NUMBER_INPUT,
          ]),
        dependencies: ["schema"],
      },
      {
        propertyName: "iconAlign",
        label: $t('input.0f3bb658ccc55be1'),
        helpText: $t('input.fd3a4b446ed465e1'),
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
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem<InputFieldProps["schemaItem"]>(...args).compute(
            (schemaItem) => !schemaItem.iconName,
          ),
        dependencies: ["schema"],
      },
    ],
  },
};

export default PROPERTIES;
