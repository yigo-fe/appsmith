import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";

import {
  defaultOptionValidation,
  optionsCustomValidation,
} from "./validations";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.b06194d3d42962f8'),
    children: [
      {
        helpText: $t('contentConfig.cb83ccfd50ccbbb7'),
        propertyName: "options",
        label: $t('contentConfig.047a25e1be317195'),
        controlType: "OPTION_INPUT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: optionsCustomValidation,
            expected: {
              type: 'Array<{ "label": "string", "value": "string" | number}>',
              example: `[{"label": "One", "value": "one"}]`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        helpText: $t('contentConfig.f509187800f681d6'),
        propertyName: "defaultOptionValue",
        label: $t('contentConfig.74d106614257806d'),
        placeholderText: "L",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        /**
         * Changing the validation to FUNCTION.
         * If the user enters Integer inside {{}} e.g. {{1}} then value should evalute to integer.
         * If user enters 1 e.g. then it should evaluate as string.
         */
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
      },
      {
        helpText: $t('contentConfig.b796a2f7252f1133'),
        propertyName: "orientation",
        label: $t('contentConfig.1f18c17cf0a2b439'),
        controlType: "ICON_TABS",
        fullWidth: true,
        options: [
          {
            label: $t('contentConfig.6fdf2d73886db9c3'),
            value: "horizontal",
          },
          {
            label: $t('contentConfig.5b3e26b98157ccfb'),
            value: "vertical",
          },
        ],
        defaultValue: "vertical",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.1c03ca9de92ff556'),
    children: [
      {
        helpText: $t('contentConfig.b5135e44c5d93d8a'),
        propertyName: "label",
        label: $t('contentConfig.c9635569e8b956a9'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.1c03ca9de92ff556'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.a892f12549462a68'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.577e4ad49ac077e6'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.c33b5d0beea31f69'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.8252ecefbf62d72b'),
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.54e5885503110be8'),
        helpText: $t('contentConfig.bd153706cd7e860f'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.82c1863d3f42e562'),
    children: [
      {
        helpText: $t('contentConfig.3c668153b631936a'),
        propertyName: "isVisible",
        label: $t('contentConfig.a49a4620a311c2d2'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.305f9c76dfc0be0d'),
        helpText: $t('contentConfig.39206f391d6b0114'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.e04e29664772b843'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.7c4d1722eb97a96c'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.117d901e31cb59ae'),
    children: [
      {
        helpText: $t('contentConfig.77fa6bc5feb3f057'),
        propertyName: "onSelectionChange",
        label: "onSelectionChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
