import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { LabelPosition } from "components/constants";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { CategorySliderWidgetProps } from "..";
import {
  defaultOptionValidation,
  optionsCustomValidation,
} from "../../validations";

export default [
  {
    sectionName: $t('contentConfig.ef2d3c7a258a1c5f'),
    children: [
      {
        helpText: $t('contentConfig.0d899582ec934572'),
        propertyName: "options",
        label: $t('contentConfig.7f2d5c1fbd9693a3'),
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
        helpText: $t('contentConfig.a2048a76d1dbf0b4'),
        propertyName: "defaultOptionValue",
        label: $t('contentConfig.0e69b42adf82d94a'),
        placeholderText: "Y",
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
    ],
  },
  {
    sectionName: $t('contentConfig.67ad5e0b949cd42a'),
    children: [
      {
        helpText: $t('contentConfig.0eda7355e172bb4d'),
        propertyName: "labelText",
        label: $t('contentConfig.4e9746ca88402848'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.c54e6f5d5939677a'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.349222208d8bd432'),
        propertyName: "labelPosition",
        label: $t('contentConfig.922d2aa115987499'),
        controlType: "ICON_TABS",
        fullWidth: true,
        hidden: isAutoLayout,
        options: [
          { label: $t('contentConfig.26cfd92dc8f1583b'), value: LabelPosition.Left },
          { label: $t('contentConfig.e41247682918c931'), value: LabelPosition.Top },
        ],
        defaultValue: LabelPosition.Left,
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.da9e381286fe7329'),
        propertyName: "labelAlignment",
        label: $t('contentConfig.43d0a25f39db9c04'),
        controlType: "LABEL_ALIGNMENT_OPTIONS",
        fullWidth: false,
        options: [
          {
            startIcon: "align-left",
            value: Alignment.LEFT,
          },
          {
            startIcon: "align-right",
            value: Alignment.RIGHT,
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: CategorySliderWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
      {
        helpText: $t('contentConfig.2a11b9464c20308a'),
        propertyName: "labelWidth",
        label: $t('contentConfig.36ea0253c096cd63'),
        controlType: "NUMERIC_INPUT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        min: 0,
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            natural: true,
          },
        },
        hidden: (props: CategorySliderWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.2e3d817fcea4933c'),
    children: [
      {
        helpText: $t('contentConfig.0bfe094a9b7cfd64'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.6183ee91057742f2'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.92a8815bad462aac'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "showMarksLabel",
        helpText: $t('contentConfig.fbeb6b1e30341b32'),
        label: $t('contentConfig.7df5734c6f0f6d3d'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isVisible",
        helpText: $t('contentConfig.8a09bd90ffaf3c3c'),
        label: $t('contentConfig.68ee3d435ba014d2'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.fa9bc8a6104f8735'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.f65e3a54ac4c44bd'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.130444f8339a53ce'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.143a966f0a1082d3'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.09762a1c2172d193'),
    children: [
      {
        helpText: $t('contentConfig.06fe46762ffc351e'),
        propertyName: "onChange",
        label: "onChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
