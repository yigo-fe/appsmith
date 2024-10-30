import {$t} from "locale/index";
import { InputTypes } from "components/constants";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";

import * as validations from "./validations";
import {
  inputTypeUpdateHook,
  isInputTypeEmailOrPassword,
  isInputTypeSingleLineOrMultiLine,
} from "../../widget/helper";
import type { InputWidgetProps } from "../../widget/types";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.e1a2a44ae360e01e'),
    children: [
      {
        helpText: $t('contentConfig.22e9fc82a810ac50'),
        propertyName: "inputType",
        label: $t('contentConfig.fabf5348233cc7aa'),
        controlType: "DROP_DOWN",
        options: [
          {
            label: $t('contentConfig.024ba102ce7fe618'),
            value: "TEXT",
          },
          {
            label: $t('contentConfig.ca7d3cde974e12d0'),
            value: "MULTI_LINE_TEXT",
          },
          {
            label: $t('contentConfig.7e20ffe8faf50893'),
            value: "NUMBER",
          },
          {
            label: $t('contentConfig.ee91d9954b0aac15'),
            value: "PASSWORD",
          },
          {
            label: $t('contentConfig.60b49594fab3666d'),
            value: "EMAIL",
          },
          {
            label: $t('contentConfig.97b62d196cd071ad'),
            value: "PHONE_NUMBER",
          },
          {
            label: $t('contentConfig.8bb605519a5f1dc7'),
            value: "CURRENCY",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        updateHook: inputTypeUpdateHook,
        dependencies: ["defaultText"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.a1554737d0ac4cd2'),
    children: [
      {
        helpText:
          $t('contentConfig.d3461a9af144d051'),
        propertyName: "defaultText",
        label: $t('contentConfig.ebe80a21813b6f6f'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.ebe80a21813b6f6f'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: validations.defaultValueValidation,
            expected: {
              type: "string or number",
              example: `John | 123`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        dependencies: ["inputType"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.f64c33c4e33edfba'),
    children: [],
  },
  {
    sectionName: $t('contentConfig.8f7ff4d642255bc1'),
    hidden: (props: InputWidgetProps) => {
      return Boolean(props.isReadOnly);
    },
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.a4708034287f62c0'),
        helpText: $t('contentConfig.f370e483c135d91f'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('contentConfig.05c8e3efe18af103'),
        propertyName: "maxChars",
        label: $t('contentConfig.3ef8e8832b3d02e3'),
        controlType: "INPUT_TEXT",
        placeholderText: "255",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.NUMBER,
          params: { min: 1, natural: true, passThroughOnZero: false },
        },
        hidden: (props: InputWidgetProps) => {
          return !isInputTypeSingleLineOrMultiLine(props.inputType);
        },
        dependencies: ["inputType"],
      },
      {
        helpText: $t('contentConfig.630d1d069090dc7f'),
        propertyName: "minNum",
        label: $t('contentConfig.e8c96db42453b2a3'),
        controlType: "INPUT_TEXT",
        placeholderText: "1",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: validations.minValueValidation,
            expected: {
              type: "number",
              example: `1`,
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
        hidden: (props: InputWidgetProps) => {
          return props.inputType !== InputTypes.NUMBER;
        },
        dependencies: ["inputType"],
      },
      {
        helpText: $t('contentConfig.cdbd97b8c45972df'),
        propertyName: "maxNum",
        label: $t('contentConfig.12593334d46ebccc'),
        controlType: "INPUT_TEXT",
        placeholderText: "100",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: validations.maxValueValidation,
            expected: {
              type: "number",
              example: `100`,
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
        hidden: (props: InputWidgetProps) => {
          return props.inputType !== InputTypes.NUMBER;
        },
        dependencies: ["inputType"],
      },
      {
        propertyName: "isSpellCheck",
        label: $t('contentConfig.664f0ee9edf533e5'),
        helpText:
          $t('contentConfig.b6e4f12bb2561512'),
        controlType: "SWITCH",
        isJSConvertible: false,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (props: InputWidgetProps) => {
          return !isInputTypeSingleLineOrMultiLine(props.inputType);
        },
        dependencies: ["inputType"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.cb928ff35dfb74d3'),
    children: [
      {
        propertyName: "shouldAllowAutofill",
        label: $t('contentConfig.a9c75661049aff65'),
        helpText: $t('contentConfig.6bcdc188a31e9e89'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (props: InputWidgetProps) => {
          //should be shown for only inputWidgetV3 and for email or password input types
          return !(
            isInputTypeEmailOrPassword(props?.inputType) &&
            props.type === "INPUT_WIDGET_V3"
          );
        },
        dependencies: ["inputType"],
      },
    ],
  },
];
