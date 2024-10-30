import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { compact, isArray, isNumber } from "lodash";
import React from "react";

import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { TextSize } from "constants/WidgetConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import RadioGroupComponent from "../component";
import type { RadioOption } from "../constants";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { FlexVerticalAlignment } from "layoutSystems/common/utils/constants";

/**
 * Validation rules:
 * 1. This property will take the value in the following format: Array<{ "label": "string", "value": "string" | number}>
 * 2. The `value` property should consists of unique values only.
 * 3. Data types of all the value props should be the same.
 */
export function optionsCustomValidation(
  options: unknown,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
): ValidationResponse {
  const validationUtil = (
    options: { label: string; value: string | number }[],
    // TODO: Fix this the next time the file is edited
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
  ) => {
    let _isValid = true;
    let message = { name: "", message: "" };
    let valueType = "";
    const uniqueLabels: Record<string | number, string> = {};

    for (let i = 0; i < options.length; i++) {
      const { label, value } = options[i];

      if (!valueType) {
        valueType = typeof value;
      }

      //Checks the uniqueness all the values in the options
      if (!uniqueLabels.hasOwnProperty(value)) {
        uniqueLabels[value] = "";
      } else {
        _isValid = false;
        message = {
          name: "ValidationError",
          message: "path:value must be unique. Duplicate values found",
        };
        break;
      }

      //Check if the required field "label" is present:
      if (!label) {
        _isValid = false;
        message = {
          name: "ValidationError",
          message:
            $t('index.cb86b8f5fb22c19f') + i + ". Missing required key: label",
        };
        break;
      }

      //Validation checks for the the label.
      if (
        _.isNil(label) ||
        label === "" ||
        (typeof label !== "string" && typeof label !== "number")
      ) {
        _isValid = false;
        message = {
          name: "ValidationError",
          message:
            $t('index.cb86b8f5fb22c19f') +
            i +
            ". Value of key: label is invalid: This value does not evaluate to type string",
        };
        break;
      }

      //Check if all the data types for the value prop is the same.
      if (typeof value !== valueType) {
        _isValid = false;
        message = {
          name: "TypeError",
          message: $t('index.e004aa5f62b016ec'),
        };
        break;
      }

      //Check if the each object has value property.
      if (_.isNil(value)) {
        _isValid = false;
        message = {
          name: "TypeError",
          message:
            'This value does not evaluate to type Array<{ "label": "string", "value": "string" | number }>',
        };
        break;
      }
    }

    return {
      isValid: _isValid,
      parsed: _isValid ? options : [],
      messages: [message],
    };
  };

  const invalidResponse = {
    isValid: false,
    parsed: [],
    messages: [
      {
        name: "TypeError",
        message:
          'This value does not evaluate to type Array<{ "label": "string", "value": "string" | number }>',
      },
    ],
  };

  try {
    if (_.isString(options)) {
      options = JSON.parse(options as string);
    }

    if (Array.isArray(options)) {
      return validationUtil(options, _);
    } else {
      return invalidResponse;
    }
  } catch (e) {
    return invalidResponse;
  }
}

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
          message: $t('index.3aea79c0282daa5e'),
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
          message: $t('index.3aea79c0282daa5e'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: value,
  };
}

class RadioGroupWidget extends BaseWidget<RadioGroupWidgetProps, WidgetState> {
  static type = "RADIO_GROUP_WIDGET";

  static getConfig() {
    return {
      name: $t('index.28eef5413f14dbcc'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.TOGGLES],
      needsMeta: true,
      searchTags: ["choice"],
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 3,
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      rows: 6,
      columns: 20,
      animateLoading: true,
      label: $t('index.dc2c0c68f2a8552c'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelTextSize: "0.875rem",
      labelWidth: 5,
      options: [
        { label: $t('index.77f396ba4bd1e12e'), value: "Y" },
        { label: $t('index.cf520ef6e6b2ce53'), value: "N" },
      ],
      defaultOptionValue: "Y",
      isRequired: false,
      isDisabled: false,
      isInline: true,
      alignment: Alignment.LEFT,
      widgetName: "RadioGroup",
      version: 1,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "options",
            propertyValue: propValueMap.data,
            isDynamicPropertyPath: true,
          },
        ];
      },
    };
  }

  static getAutoLayoutConfig() {
    return {
      defaults: {
        columns: 14,
        rows: 7,
      },
      disabledPropsDefaults: {
        labelPosition: LabelPosition.Top,
      },
      autoDimension: {
        height: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "240px",
              minHeight: "70px",
            };
          },
        },
      ],
      disableResizeHandles: {
        vertical: true,
      },
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: {
        maxHeight: {},
        maxWidth: {},
        minHeight: { base: "70px" },
        minWidth: { base: "240px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.9c7dd6bc58e16971'),
      "!url": "https://docs.appsmith.com/widget-reference/radio",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      options: "[$__dropdownOption__$]",
      selectedOptionValue: "string",
      isRequired: "bool",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.5054901264a21270'),
        children: [
          {
            helpText: $t('index.664bb01a93309aaa'),
            propertyName: "options",
            label: $t('index.70a0cc5742e868f8'),
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
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
          {
            helpText: $t('index.5e953acb6cfb2812'),
            propertyName: "defaultOptionValue",
            label: $t('index.5af1f0f8762e00ec'),
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
        sectionName: $t('index.dc2c0c68f2a8552c'),
        children: [
          {
            helpText: $t('index.61b26e430ae224d0'),
            propertyName: "label",
            label: $t('index.17d7ccb625a1575a'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.e137e5e05a6d77d2'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.a7e3151c96ffa79b'),
            propertyName: "labelPosition",
            label: $t('index.b9dfead5c73a2c5a'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.d46bf109a0786f48'), value: LabelPosition.Auto },
              { label: $t('index.b298285c1525e963'), value: LabelPosition.Left },
              { label: $t('index.03c2c48799dce9f7'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.0876fe3f0c357180'),
            propertyName: "labelAlignment",
            label: $t('index.5873d45cfaf4cccc'),
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
            hidden: (props: RadioGroupWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.0aa7f3de26cf3c3e'),
            propertyName: "labelWidth",
            label: $t('index.c4e95e0f396a231a'),
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
            hidden: (props: RadioGroupWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.c72d396a9cc58ed0'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.1e31a5e6f01c5e45'),
            helpText: $t('index.4a696ce980a460aa'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.4494a11a908ca822'),
        children: [
          {
            helpText: $t('index.546c5e724332943e'),
            propertyName: "labelTooltip",
            label: $t('index.6d9ab41e2231e7df'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.6195e173cc27f846'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.431608506103960b'),
            propertyName: "isVisible",
            label: $t('index.d2ac2221595e111e'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.308cf673f4cfdc0b'),
            helpText: $t('index.41b9e389fb862f46'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isInline",
            helpText:
              $t('index.a0715e2b784f4bc8'),
            label: $t('index.476c5621969653ee'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.b395ca95b7a002d0'),
            controlType: "SWITCH",
            helpText: $t('index.4990b2d6234c3a89'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.4a1ca8734743e80a'),
        children: [
          {
            helpText: $t('index.dd80f824e57f2bf8'),
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
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.1f68b8bc81e4f5d6'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.824f020d452fa99a'),
            helpText: $t('index.58ce4fe20b3be0b2'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.c4e66ab140ba5dde'),
            helpText: $t('index.91a61751d4de97e9'),
            controlType: "DROP_DOWN",
            defaultValue: "0.875rem",
            options: [
              {
                label: "S",
                value: "0.875rem",
                subText: "0.875rem",
              },
              {
                label: "M",
                value: "1rem",
                subText: "1rem",
              },
              {
                label: "L",
                value: "1.25rem",
                subText: "1.25rem",
              },
              {
                label: "XL",
                value: "1.875rem",
                subText: "1.875rem",
              },
              {
                label: "XXL",
                value: "3rem",
                subText: "3rem",
              },
              {
                label: "3XL",
                value: "3.75rem",
                subText: "3.75rem",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelStyle",
            label: $t('index.9e74eaee90bd661c'),
            helpText: $t('index.ae3e157aad20970a'),
            controlType: "BUTTON_GROUP",
            options: [
              {
                icon: "text-bold",
                value: "BOLD",
              },
              {
                icon: "text-italic",
                value: "ITALIC",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.4494a11a908ca822'),
        children: [
          {
            propertyName: "alignment",
            helpText: $t('index.733ef10dafe6a49d'),
            label: $t('index.5873d45cfaf4cccc'),
            controlType: "ICON_TABS",
            defaultValue: Alignment.LEFT,
            fullWidth: true,
            isBindProperty: true,
            isTriggerProperty: false,
            options: [
              {
                startIcon: "skip-left-line",
                value: Alignment.LEFT,
              },
              {
                startIcon: "skip-right-line",
                value: Alignment.RIGHT,
              },
            ],
          },
        ],
      },
      {
        sectionName: $t('index.4563c82045b1a989'),
        children: [
          {
            propertyName: "accentColor",
            helpText: $t('index.193b0f727e26fcb1'),
            label: $t('index.e9f7062679bea303'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getDerivedPropertiesMap() {
    return {
      selectedOption:
        "{{_.find(this.options, { value: this.selectedOptionValue })}}",
      isValid: `{{ this.isRequired ? !!this.selectedOptionValue : true }}`,
      value: `{{this.selectedOptionValue}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedOptionValue: "defaultOptionValue",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedOptionValue: undefined,
      isDirty: false,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      boxShadow: "none",
    };
  }

  componentDidUpdate(prevProps: RadioGroupWidgetProps): void {
    if (
      this.props.defaultOptionValue !== prevProps.defaultOptionValue &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setDisabled: {
          path: "isDisabled",
          type: "boolean",
        },
        setData: {
          path: "options",
          type: "array",
        },
      },
    };
  }

  getWidgetView() {
    const {
      alignment,
      isDisabled,
      isInline,
      isLoading,
      label,
      labelAlignment,
      labelPosition,
      labelStyle,
      labelTextColor,
      labelTextSize,
      options,
      selectedOptionValue,
      widgetId,
    } = this.props;

    const { componentHeight } = this.props;

    return (
      <RadioGroupComponent
        accentColor={this.props.accentColor}
        alignment={alignment}
        compactMode={isCompactMode(componentHeight)}
        disabled={isDisabled}
        height={componentHeight}
        inline={Boolean(isInline)}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        key={widgetId}
        labelAlignment={labelAlignment}
        labelPosition={labelPosition}
        labelStyle={labelStyle}
        labelText={label}
        labelTextColor={labelTextColor}
        labelTextSize={labelTextSize}
        labelTooltip={this.props.labelTooltip}
        labelWidth={this.props.labelComponentWidth}
        loading={isLoading}
        onRadioSelectionChange={this.onRadioSelectionChange}
        options={isArray(options) ? compact(options) : []}
        required={this.props.isRequired}
        selectedOptionValue={selectedOptionValue}
        widgetId={widgetId}
      />
    );
  }

  onRadioSelectionChange = (updatedValue: string) => {
    let newVal;

    if (isNumber(this.props.options[0].value)) {
      newVal = parseFloat(updatedValue);
    } else {
      newVal = updatedValue;
    }

    // Set isDirty to true when the selection changes
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("selectedOptionValue", newVal, {
      triggerPropertyName: "onSelectionChange",
      dynamicString: this.props.onSelectionChange,
      event: {
        type: EventType.ON_OPTION_CHANGE,
      },
    });
  };
}

export interface RadioGroupWidgetProps extends WidgetProps {
  options: RadioOption[];
  selectedOptionValue: string;
  onSelectionChange: string;
  defaultOptionValue: string;
  isRequired?: boolean;
  isDisabled: boolean;
  isInline?: boolean;
  alignment: Alignment;
  label: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  isDirty: boolean;
  accentColor: string;
  labelComponentWidth?: number;
}

export default RadioGroupWidget;
