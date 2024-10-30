import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { defaultSelectedValuesValidation } from "./validations";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.59b33fee50bacae8'),
    children: [
      {
        helpText: $t('contentConfig.bfa98c66bacd75ab'),
        propertyName: "options",
        label: $t('contentConfig.6ab69234b0d7677a'),
        controlType: "OPTION_INPUT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            default: [],
            unique: ["value"],
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "label",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                      required: true,
                    },
                  },
                  {
                    name: "value",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                    },
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        helpText: $t('contentConfig.83ab8a292721fe89'),
        propertyName: "defaultSelectedValues",
        label: $t('contentConfig.9e0ede4bc46888d3'),
        placeholderText: '["BLUE", "RED"]',
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultSelectedValuesValidation,
            expected: {
              type: "String or Array<string>",
              example: `apple | ["apple", "orange"]`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
      },
      {
        helpText: $t('contentConfig.5b4ebf225a1449ba'),
        propertyName: "orientation",
        label: $t('contentConfig.9815d7aacaab19ee'),
        controlType: "ICON_TABS",
        fullWidth: true,
        options: [
          {
            label: $t('contentConfig.9e8e546661c58db8'),
            value: "horizontal",
          },
          {
            label: $t('contentConfig.0779c26c741c09ff'),
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
    sectionName: $t('contentConfig.8fb89396f9fafdfb'),
    children: [
      {
        helpText: $t('contentConfig.f3b973d80aea4780'),
        propertyName: "label",
        label: $t('contentConfig.8f4e0988f2e13455'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.8fb89396f9fafdfb'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.ab9fa0610e39e7a2'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.677d8fbba28a6d46'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.75fa5f4efba62867'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.ce679d3832ab01f7'),
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.1b73d17511312a8c'),
        helpText: $t('contentConfig.8d03d720edc40faf'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.8202f14177f89101'),
    children: [
      {
        propertyName: "isVisible",
        label: $t('contentConfig.fada7235d3cb0b58'),
        helpText: $t('contentConfig.dd8ef778d823e328'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.3af9df06a9d48d93'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.770fe3088f76d6cd'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.5ca7509ab8db506d'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.08da6dba2e896d86'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.92d97415245de571'),
    children: [
      {
        helpText: $t('contentConfig.539c613c6e6b4db0'),
        propertyName: "onCheckChange",
        label: "onCheckChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
