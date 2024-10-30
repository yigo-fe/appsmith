import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { FieldType } from "widgets/JSONFormWidget/constants";
import type { HiddenFnParams } from "../helper";
import { getSchemaItem, getAutocompleteProperties } from "../helper";
import { TimePrecision } from "widgets/DatePickerWidget2/constants";
import { dateFormatOptions } from "WidgetProvider/constants";

const PROPERTIES = {
  content: {
    data: [
      {
        helpText: $t('date.227079a71b0ba219'),
        propertyName: "dateFormat",
        label: $t('date.cedb9c91caaf5ffc'),
        controlType: "DROP_DOWN",
        isJSConvertible: true,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        optionWidth: "340px",
        options: dateFormatOptions,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hideSubText: true,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
      {
        propertyName: "defaultValue",
        label: $t('date.97e77060bf631b0a'),
        helpText:
          $t('date.2481375124c7d4d5'),
        controlType: "DATE_PICKER",
        placeholderText: $t('date.b4d20b59196526c7'),
        useValidationMessage: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.DATE_ISO_STRING },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
      {
        propertyName: "timePrecision",
        label: $t('date.791ad50acd432062'),
        controlType: "ICON_TABS",
        fullWidth: true,
        helpText: $t('date.753fe0de1f13770b'),
        defaultValue: TimePrecision.MINUTE,
        options: [
          {
            label: $t('date.210b1909d177db98'),
            value: TimePrecision.NONE,
          },
          {
            label: $t('date.9161cefa97a12443'),
            value: TimePrecision.MINUTE,
          },
          {
            label: $t('date.7a78f4620852972e'),
            value: TimePrecision.SECOND,
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              TimePrecision.NONE,
              TimePrecision.MINUTE,
              TimePrecision.SECOND,
            ],
            default: TimePrecision.MINUTE,
          },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
    ],
    validation: [
      {
        propertyName: "minDate",
        label: $t('date.a83afe35b59c37f7'),
        helpText: $t('date.8fde19283234a99c'),
        controlType: "DATE_PICKER",
        useValidationMessage: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.DATE_ISO_STRING },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
      {
        propertyName: "maxDate",
        label: $t('date.ae9e2859e8df0280'),
        helpText: $t('date.7d21416aaea55146'),
        controlType: "DATE_PICKER",
        useValidationMessage: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.DATE_ISO_STRING },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
    ],
    general: [
      {
        propertyName: "convertToISO",
        label: $t('date.8afa33dcc6f9dd56'),
        helpText:
          $t('date.a7481224a0b038b3'),
        controlType: "SWITCH",
        isJSConvertible: false,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
      {
        propertyName: "shortcuts",
        label: $t('date.1def4afe96f52454'),
        helpText: $t('date.7e056b0ecb1da50b'),
        controlType: "SWITCH",
        isJSConvertible: false,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
      {
        propertyName: "closeOnSelection",
        label: $t('date.6ba55642f141a52f'),
        helpText: $t('date.133e8721449d9ac5'),
        controlType: "SWITCH",
        isJSConvertible: false,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
    ],
    events: [
      {
        propertyName: "onDateSelected",
        label: "onDateSelected",
        helpText: $t('date.404550288179635d'),
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.DATEPICKER),
        dependencies: ["schema"],
      },
    ],
  },
};

export default PROPERTIES;
