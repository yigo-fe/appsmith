import {$t} from "locale/index";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { FieldType } from "widgets/JSONFormWidget/constants";
import { optionsCustomValidation } from "widgets/RadioGroupWidget/widget";
import type { HiddenFnParams } from "../helper";
import { getSchemaItem, getAutocompleteProperties } from "../helper";

/**
 * Alias function is used to test the optionsCustomValidation separately
 * to ensure that any changes in the validation function in RadioGroupWidget
 * does not break when used here.
 */
export const optionsValidation = optionsCustomValidation;

function defaultOptionValidation(
  value: unknown,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
): ValidationResponse {
  //Checks if the value is not of object type in {{}}
  if (_.isObject(value)) {
    return {
      isValid: false,
      parsed: JSON.stringify(value, null, 2),
      messages: [
        {
          name: "TypeError",
          message: $t('radioGroup.008a54b21f3ee228'),
        },
      ],
    };
  }

  //Checks if the value is not of boolean type in {{}}
  if (_.isBoolean(value)) {
    return {
      isValid: false,
      parsed: value,
      messages: [
        {
          name: "TypeError",
          message: $t('radioGroup.008a54b21f3ee228'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: value,
  };
}

const PROPERTIES = {
  content: {
    data: [
      {
        propertyName: "options",
        helpText:
          $t('radioGroup.db5ee4761d931384'),
        label: $t('radioGroup.ade13d5cd47fc6cb'),
        controlType: "INPUT_TEXT",
        placeholderText: '[{ "label": "Option1", "value": "Option2" }]',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: optionsValidation,
            expected: {
              type: 'Array<{ "label": "string", "value": "string" | number}>',
              example: `[{"label": "One", "value": "one"}]`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.RADIO_GROUP),
        dependencies: ["schema"],
      },
      {
        propertyName: "defaultValue",
        helpText: $t('radioGroup.ebf217b7c3ea7479'),
        label: $t('radioGroup.f8b3c4e3d2958ad2'),
        placeholderText: "Y",
        controlType: "JSON_FORM_COMPUTE_VALUE",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultOptionValidation,
            expected: {
              type: `string |\nnumber (only works in mustache syntax)`,
              example: `abc | {{1}}`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.RADIO_GROUP),
        dependencies: ["schema", "sourceData"],
      },
    ],
    events: [
      {
        propertyName: "onSelectionChange",
        helpText: $t('radioGroup.d39b28ee400b6d72'),
        label: "onSelectionChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.RADIO_GROUP),
        dependencies: ["schema", "sourceData"],
      },
    ],
  },
};

export default PROPERTIES;
