import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { LabelPosition } from "components/constants";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { RangeSliderWidgetProps } from "..";
import {
  endValueValidation,
  maxValueValidation,
  minRangeValidation,
  minValueValidation,
  startValueValidation,
  stepSizeValidation,
} from "../../validations";

export default [
  {
    sectionName: $t('contentConfig.473e8a1cc6853b53'),
    children: [
      {
        propertyName: "min",
        helpText: $t('contentConfig.064a1a5ab2308927'),
        label: $t('contentConfig.3fb6deb70ddf60ae'),
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
        helpText: $t('contentConfig.0e967a7dd623634e'),
        label: $t('contentConfig.8b99dc17522a554f'),
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
        helpText: $t('contentConfig.fdc5bd420e78e1f6'),
        label: $t('contentConfig.1c50093f23cd9d25'),
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
        propertyName: "minRange",
        helpText: $t('contentConfig.9e8163bd69ef4a16'),
        label: $t('contentConfig.36e35f5ce193f0ed'),
        controlType: "INPUT_TEXT",
        placeholderText: "10",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: minRangeValidation,
            expected: {
              type: "number",
              example: "1",
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
      },
      {
        propertyName: "defaultStartValue",
        helpText: $t('contentConfig.76ed383dcb9e693f'),
        label: $t('contentConfig.417403c542e6e94e'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.f8c74ac2bf3935a6'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: startValueValidation,
            expected: {
              type: "number",
              example: "20",
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
      },
      {
        propertyName: "defaultEndValue",
        helpText: $t('contentConfig.44860bc55211bf70'),
        label: $t('contentConfig.0d0af68a03e27eba'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.42d1563eaaa7aae2'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: endValueValidation,
            expected: {
              type: "number",
              example: "40",
              autocompleteDataType: AutocompleteDataType.NUMBER,
            },
          },
        },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.8551677289918d9c'),
    children: [
      {
        helpText: $t('contentConfig.3e6ad2d990927a86'),
        propertyName: "labelText",
        label: $t('contentConfig.64f916387c1dc283'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.391c46a400348bb5'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.3c0e7b358212563f'),
        propertyName: "labelPosition",
        label: $t('contentConfig.16f0c25738009f16'),
        controlType: "ICON_TABS",
        fullWidth: true,
        hidden: isAutoLayout,
        options: [
          { label: $t('contentConfig.1d1a0849a92f85a3'), value: LabelPosition.Left },
          { label: $t('contentConfig.2986d37b1e508067'), value: LabelPosition.Top },
        ],
        defaultValue: LabelPosition.Left,
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.600f05bd08dd9293'),
        propertyName: "labelAlignment",
        label: $t('contentConfig.614818e8d5d63657'),
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
        hidden: (props: RangeSliderWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
      {
        helpText: $t('contentConfig.2794c853f07309f4'),
        propertyName: "labelWidth",
        label: $t('contentConfig.b529c97e02033877'),
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
        hidden: (props: RangeSliderWidgetProps) =>
          props.labelPosition !== LabelPosition.Left,
        dependencies: ["labelPosition"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.009784ff435e5595'),
    children: [
      {
        helpText: $t('contentConfig.534b472af7fea27e'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.f86c2c38ec8f7bc2'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.31216dc825d3828d'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "showMarksLabel",
        helpText: $t('contentConfig.4acbf40dabfac817'),
        label: $t('contentConfig.9c1d6e009351bda3'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('contentConfig.098fcb61dd11b927'),
        propertyName: "marks",
        label: $t('contentConfig.4fde5a45e3bea7ae'),
        controlType: "INPUT_TEXT",
        placeholderText: '[{ "value": "20", "label": "20%" }]',
        isBindProperty: true,
        isTriggerProperty: false,
        hidden: (props: RangeSliderWidgetProps) => !props.showMarksLabel,
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
        helpText: $t('contentConfig.710137ed989cbfa5'),
        label: $t('contentConfig.27fa310f029c9f83'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.8277350b2931ec4b'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.c8035168dbed2ac9'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.f9d9141e729c6946'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.222806b544f3fdef'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "tooltipAlwaysOn",
        helpText: $t('contentConfig.39214150c2ed9119'),
        label: $t('contentConfig.a92e314db38466d2'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.5b7c4286911c055e'),
    children: [
      {
        helpText: $t('contentConfig.f9f0aabea80ca3c8'),
        propertyName: "onStartValueChange",
        label: "onStartValueChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        helpText: $t('contentConfig.f9f0aabea80ca3c8'),
        propertyName: "onEndValueChange",
        label: "onEndValueChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
