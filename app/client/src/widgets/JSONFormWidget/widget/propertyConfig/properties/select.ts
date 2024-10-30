import {$t} from "locale/index";
import { FieldType } from "widgets/JSONFormWidget/constants";
import type { HiddenFnParams } from "../helper";
import { getSchemaItem, getAutocompleteProperties } from "../helper";
import type { JSONFormWidgetProps } from "../..";
import type { SelectFieldProps } from "widgets/JSONFormWidget/fields/SelectField";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { LoDashStatic } from "lodash";

export function defaultOptionValueValidation(
  value: unknown,
  props: JSONFormWidgetProps,
  _: LoDashStatic,
): ValidationResponse {
  const hasLabelValueProperties = (
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any,
  ): obj is { value: string | number; label: string } => {
    return (
      _.isPlainObject(obj) &&
      obj.hasOwnProperty("label") &&
      obj.hasOwnProperty("value") &&
      _.isString(obj.label) &&
      (_.isString(obj.value) || _.isFinite(obj.value))
    );
  };

  // If input value is empty string then we can fairly assume that the input
  // was cleared out and can be treated as undefined.
  if (value === undefined || value === null || value === "") {
    return {
      isValid: true,
      parsed: value,
      messages: [{ name: "", message: "" }],
    };
  }

  if (typeof value === "string") {
    try {
      const parsedValue = JSON.parse(value);

      if (_.isObject(parsedValue)) {
        value = parsedValue;
      }
    } catch (e) {}
  }

  if (
    _.isString(value) ||
    _.isFinite(value) ||
    hasLabelValueProperties(value)
  ) {
    // When value is "", "green", 444
    return {
      isValid: true,
      parsed: value,
      messages: [{ name: "", message: "" }],
    };
  }

  return {
    isValid: false,
    parsed: {},
    messages: [
      {
        name: "TypeError",
        message:
          'value should match: string | { "label": "label1", "value": "value1" }',
      },
    ],
  };
}

const PROPERTIES = {
  content: {
    data: [
      {
        propertyName: "defaultValue",
        helpText: $t('select.18f0791d284d8582'),
        label: $t('select.83ebbc190303891e'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: '{ "label": "Option1", "value": "Option2" }',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultOptionValueValidation,
            expected: {
              type: 'value1 or { "label": "label1", "value": "value1" }',
              example: `value1 | { "label": "label1", "value": "value1" }`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SELECT),
        dependencies: ["schema"],
      },
    ],
    general: [
      {
        propertyName: "placeholderText",
        label: $t('select.1cef11cad8838864'),
        helpText: $t('select.fb441fe14fce91de'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: $t('select.0e20f6af0500a6bd'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SELECT),
        dependencies: ["schema"],
      },
    ],
    events: [
      {
        propertyName: "onOptionChange",
        helpText: $t('select.a8871d9344cefff4'),
        label: "onOptionChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SELECT),
        dependencies: ["schema", "sourceData"],
      },
    ],
    searchAndFilters: [
      {
        propertyName: "isFilterable",
        label: $t('select.e79e218f3f181dd0'),
        helpText: $t('select.d0190bf1005067e6'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SELECT),
        dependencies: ["schema", "sourceData"],
      },
      {
        propertyName: "serverSideFiltering",
        helpText: $t('select.5a9732c23ff392de'),
        label: $t('select.7ac8cc5fdb8d20da'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.SELECT),
        dependencies: ["schema", "sourceData"],
      },
      {
        propertyName: "onFilterUpdate",
        helpText: $t('select.f94d01e31dd468d1'),
        label: "onFilterUpdate",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        dependencies: ["schema", "sourceData"],
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem<SelectFieldProps["schemaItem"]>(...args).compute(
            (schemaItem) => {
              if (schemaItem.fieldType !== FieldType.SELECT) return true;

              return !schemaItem.serverSideFiltering;
            },
          ),
      },
    ],
  },
};

export default PROPERTIES;
