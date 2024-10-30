import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";

import { LabelPosition } from "components/constants";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { NumberSliderWidgetProps } from "..";
import {
  defaultValueValidation,
  maxValueValidation,
  minValueValidation,
  stepSizeValidation,
} from "../../validations";

export default [
  {
    sectionName: $t('contentConfig.4008a8683befcb3c'),
    children: [
      {
        propertyName: "min",
        helpText: $t('contentConfig.dad31a5dd1a1158e'),
        label: $t('contentConfig.8514a467f71f3ed5'),
        controlType: "INPUT_TEXT",
        placeholderText: "0",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: minValueValidation,
            expected: {
              type: "number",
              example: "0",
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
      },
      {
        propertyName: "max",
        helpText: $t('contentConfig.d0230d2787b6aef1'),
        label: $t('contentConfig.1da75f1fbc8ba3a6'),
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
              example: "100",
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
      },
      {
        propertyName: "step",
        helpText: $t('contentConfig.d9d0ec0caea832fe'),
        label: $t('contentConfig.8160787a227e2539'),
        controlType: "INPUT_TEXT",
        placeholderText: "10",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: stepSizeValidation,
            expected: {
              type: "number",
              example: "1",
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
      },
      {
        propertyName: "defaultValue",
        helpText: $t('contentConfig.77d03fb0b6ba8468'),
        label: $t('contentConfig.112ad6d40bb835c1'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.ada6a045917c9021'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultValueValidation,
            expected: {
              type: "number",
              example: "50",
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.3f583d27b5e9a1d9'),
    children: [
      {
        helpText: $t('contentConfig.d21d2de982cedd49'),
        propertyName: "labelText",
        label: $t('contentConfig.bef1379801a55752'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.69b7458701e22c62'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.1989e5d230c68998'),
        propertyName: "labelPosition",
        label: $t('contentConfig.66215c54ab9054ac'),
        controlType: "ICON_TABS",
        fullWidth: true,
        hidden: isAutoLayout,
        options: [
          { label: $t('contentConfig.fec4c29a354d4c87'), value: LabelPosition.Left },
          { label: $t('contentConfig.fcb30216694c1671'), value: LabelPosition.Top },
        ],
        defaultValue: LabelPosition.Left,
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.bd0cf3e3c02a7776'),
        propertyName: "labelAlignment",
        label: $t('contentConfig.7b0331224254924e'),
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
        hidden: (props: NumberSliderWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
      {
        helpText: $t('contentConfig.d0f2b0e38edb130d'),
        propertyName: "labelWidth",
        label: $t('contentConfig.2732a1850d23dbe4'),
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
        hidden: (props: NumberSliderWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.3863b3f1457003b0'),
    children: [
      {
        helpText: $t('contentConfig.458ec444104acc63'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.d813678449136ee2'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.2dd9eaa9538fc5bf'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "showMarksLabel",
        helpText: $t('contentConfig.850571db12ea25bc'),
        label: $t('contentConfig.c440767e01eba76a'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('contentConfig.657d71f93e4953c9'),
        propertyName: "marks",
        label: $t('contentConfig.c099f7d13819a01b'),
        controlType: "INPUT_TEXT",
        placeholderText: '[{ "value": "20", "label": "20%" }]',
        isBindProperty: true,
        isTriggerProperty: false,
        hidden: (props: NumberSliderWidgetProps) => !props.showMarksLabel,
        dependencies: ["showMarksLabel"],
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            unique: ["value"],
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "value",
                    type: ValidationTypes.NUMBER,
                    params: {
                      default: "",
                      requiredKey: true,
                    },
                  },
                  {
                    name: "label",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                      requiredKey: true,
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        propertyName: "isVisible",
        helpText: $t('contentConfig.e041cc7b7d0221e0'),
        label: $t('contentConfig.7f57f45c94e67623'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.7cbfbc7e00f9e3d5'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.7608bff62384368d'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.238bfc0ffaabb898'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.4d4ca3412f2a2893'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "tooltipAlwaysOn",
        helpText: $t('contentConfig.0fd4a63bef885ae0'),
        label: $t('contentConfig.60ccb179253103e4'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.e38ef2236ddacbd3'),
    children: [
      {
        helpText: $t('contentConfig.5e4893652f3856ab'),
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
