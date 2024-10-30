import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { Layers } from "constants/Layers";
import type { TextSize } from "constants/WidgetConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { isArray } from "lodash";
import type { DefaultValueType } from "rc-tree-select/lib/interface";
import type { ReactNode } from "react";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import { MinimumPopupWidthInPercentage } from "WidgetProvider/constants";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import SingleSelectTreeComponent from "../component";
import derivedProperties from "./parseDerivedProperties";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { DynamicHeight } from "utils/WidgetFeatures";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import { WIDGET_TAGS, layoutConfigurations } from "constants/WidgetConstants";

function defaultOptionValueValidation(value: unknown): ValidationResponse {
  if (typeof value === "string") return { isValid: true, parsed: value.trim() };

  if (value === undefined || value === null)
    return {
      isValid: false,
      parsed: "",
      messages: [
        {
          name: "TypeError",
          message: $t('index.de6c6c6d725b6344'),
        },
      ],
    };

  return { isValid: true, parsed: value };
}

class SingleSelectTreeWidget extends BaseWidget<
  SingleSelectTreeWidgetProps,
  WidgetState
> {
  static type = "SINGLE_SELECT_TREE_WIDGET";

  static getConfig() {
    return {
      name: "TreeSelect",
      searchTags: ["dropdown", "singleselecttree"],
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.SELECT],
      needsMeta: true,
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 3,
        defaultValue: DynamicHeight.FIXED,
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      rows: 7,
      columns: 20,
      animateLoading: true,
      options: [
        {
          label: $t('index.36f35507f208ac45'),
          value: "BLUE",
          children: [
            {
              label: $t('index.ebec2726b4642e1f'),
              value: "DARK BLUE",
            },
            {
              label: $t('index.531bcd8905c48e66'),
              value: "LIGHT BLUE",
            },
          ],
        },
        { label: $t('index.0fe55451ac641466'), value: "GREEN" },
        { label: $t('index.2eca614e162f7df1'), value: "RED" },
      ],
      widgetName: "TreeSelect",
      defaultOptionValue: "BLUE",
      version: 1,
      isVisible: true,
      isRequired: false,
      isDisabled: false,
      allowClear: false,
      expandAll: false,
      placeholderText: $t('index.3c011cf55ac216de'),
      labelText: $t('index.0b2c75bc3d659502'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      labelTextSize: "0.875rem",
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
    };
  }

  static getAutoLayoutConfig() {
    return {
      disabledPropsDefaults: {
        labelPosition: LabelPosition.Top,
        labelTextSize: "0.875rem",
      },
      defaults: {
        rows: 6.6,
      },
      autoDimension: {
        height: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "160px",
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
        minHeight: {},
        minWidth: { base: "160px" },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.16caf0f78e20a875'),
        children: [
          {
            helpText:
              $t('index.d917321c588644cf'),
            propertyName: "options",
            label: $t('index.c71959b4bbd84d2d'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.7be142b4888e43cf'),
            isBindProperty: true,
            isTriggerProperty: false,
            isJSConvertible: false,
            validation: {
              type: ValidationTypes.NESTED_OBJECT_ARRAY,
              params: {
                unique: ["value"],
                default: [],
                children: {
                  type: ValidationTypes.OBJECT,
                  params: {
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
                      {
                        name: "children",
                        type: ValidationTypes.ARRAY,
                        required: false,
                        params: {
                          children: {
                            type: ValidationTypes.OBJECT,
                            params: {
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
                    ],
                  },
                },
              },
            },
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
          {
            helpText: $t('index.897d77bd1402420f'),
            propertyName: "defaultOptionValue",
            label: $t('index.d2678eda4f1a8b26'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.7be142b4888e43cf'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultOptionValueValidation,
                expected: {
                  type: "value",
                  example: `value1`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.0b2c75bc3d659502'),
        children: [
          {
            helpText: $t('index.5600200ebf9bf6e0'),
            propertyName: "labelText",
            label: $t('index.fcbfba2db00e161f'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.8720286bfec189ee'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.3043bc93d307647a'),
            propertyName: "labelPosition",
            label: $t('index.ace129c0537052f0'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.63fae799b292142f'), value: LabelPosition.Auto },
              { label: $t('index.035a98ae8b6f5c92'), value: LabelPosition.Left },
              { label: $t('index.fd64b58e9edd6bd9'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.dc3c5d6113338edd'),
            propertyName: "labelAlignment",
            label: $t('index.507ac11f0376b78b'),
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
            hidden: (props: SingleSelectTreeWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.99425be3f4685b43'),
            propertyName: "labelWidth",
            label: $t('index.83be749b8dcb7179'),
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
            hidden: (props: SingleSelectTreeWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.bfc48ca38ca09472'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.676e2c1ca44d45e3'),
            helpText: $t('index.9d33095cae019879'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.5ce32655755dc0af'),
        children: [
          {
            helpText: $t('index.24f4e95f83baca5d'),
            propertyName: "labelTooltip",
            label: $t('index.71c4c9e6339ba9f1'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.df8e1f5225d14992'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.6c7d8ea8f65620d9'),
            propertyName: "placeholderText",
            label: $t('index.752829c9d5472354'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.5bbdc0f3eb157420'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.2d3bde784ed41743'),
            propertyName: "isVisible",
            label: $t('index.34c24bafccfad774'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.36ee2141106cc315'),
            helpText: $t('index.72e5646f999175d3'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.4381ba0c5f81a4a4'),
            controlType: "SWITCH",
            helpText: $t('index.fe21a48a98419da1'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "allowClear",
            label: $t('index.107d632c7a7644d3'),
            helpText: $t('index.c77f6701894abb01'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "expandAll",
            label: $t('index.6457d123871ac2c1'),
            helpText: $t('index.2dd7154f7be597cf'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.2ed1c61543cd27f8'),
        children: [
          {
            helpText: $t('index.84f6e2e365877883'),
            propertyName: "onOptionChange",
            label: "onOptionChange",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.f585e768b5dfd3b8'),
            propertyName: "onDropdownOpen",
            label: "onDropdownOpen",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.b02792ed464c99bc'),
            propertyName: "onDropdownClose",
            label: "onDropdownClose",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
    ];
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setDisabled: {
          path: "isDisabled",
          type: "boolean",
        },
        setRequired: {
          path: "isRequired",
          type: "boolean",
        },
      },
    };
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.b218738ff82ee69b'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.8864377f7480fbbb'),
            helpText: $t('index.2d656127681c856a'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.0a6bdbf5945c9f69'),
            helpText: $t('index.95ca23773d4c2ac6'),
            controlType: "DROP_DOWN",
            defaultValue: "0.875rem",
            hidden: isAutoLayout,
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
            label: $t('index.c955314b234010fb'),
            helpText: $t('index.e2f5265180936f78'),
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
        sectionName: $t('index.00696f9ef298ccb5'),
        children: [
          {
            propertyName: "accentColor",
            label: $t('index.b94ccf814ad4abc6'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            invisible: true,
          },
          {
            propertyName: "borderRadius",
            label: $t('index.a6cfc1ac3a84f029'),
            helpText:
              $t('index.1602f2e75e2b7a8f'),
            controlType: "BORDER_RADIUS_OPTIONS",

            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.614ea992d192ee00'),
            helpText:
              $t('index.7463fbaa96582671'),
            controlType: "BOX_SHADOW_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.e7f9c85eca6b6d93'),
      "!url": "https://docs.appsmith.com/widget-reference/treeselect",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      selectedOptionValue: {
        "!type": "string",
        "!doc": $t('index.61d2105618291556'),
        "!url": "https://docs.appsmith.com/widget-reference/treeselect",
      },
      selectedOptionLabel: {
        "!type": "string",
        "!doc": $t('index.a981aed38482bdb5'),
        "!url": "https://docs.appsmith.com/widget-reference/treeselect",
      },
      isDisabled: "bool",
      isValid: "bool",
      options: "[$__dropdrowOptionWithChildren__$]",
    };
  }

  static getDerivedPropertiesMap() {
    return {
      value: `{{this.selectedOptionValue}}`,
      flattenedOptions: `{{(()=>{${derivedProperties.getFlattenedOptions}})()}}`,
      isValid: `{{(()=>{${derivedProperties.getIsValid}})()}}`,
      selectedOptionValue: `{{(()=>{${derivedProperties.getSelectedOptionValue}})()}}`,
      selectedOptionLabel: `{{(()=>{${derivedProperties.getSelectedOptionLabel}})()}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedOption: "defaultOptionValue",
      selectedLabel: "defaultOptionValue",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedOption: undefined,
      selectedLabel: undefined,
      isDirty: false,
    };
  }

  componentDidUpdate(prevProps: SingleSelectTreeWidgetProps): void {
    if (
      this.props.defaultOptionValue !== prevProps.defaultOptionValue &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  getWidgetView() {
    const options = isArray(this.props.options) ? this.props.options : [];
    const isInvalid =
      "isValid" in this.props && !this.props.isValid && !!this.props.isDirty;
    const dropDownWidth =
      (MinimumPopupWidthInPercentage / 100) *
      (this.props.mainCanvasWidth ?? layoutConfigurations.MOBILE.maxWidth);
    const { componentHeight, componentWidth } = this.props;

    return (
      <SingleSelectTreeComponent
        accentColor={this.props.accentColor}
        allowClear={this.props.allowClear}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        compactMode={isCompactMode(componentHeight)}
        disabled={this.props.isDisabled ?? false}
        dropDownWidth={dropDownWidth}
        dropdownStyle={{
          zIndex: Layers.dropdownModalWidget,
        }}
        expandAll={this.props.expandAll}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isFilterable
        isValid={!isInvalid}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelText={this.props.labelText}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelTooltip={this.props.labelTooltip}
        labelWidth={this.props.labelComponentWidth}
        loading={this.props.isLoading}
        onChange={this.onOptionChange}
        onDropdownClose={this.onDropdownClose}
        onDropdownOpen={this.onDropdownOpen}
        options={options}
        placeholder={this.props.placeholderText as string}
        renderMode={this.props.renderMode}
        value={this.props.selectedOptionValue}
        widgetId={this.props.widgetId}
        width={componentWidth}
      />
    );
  }

  onOptionChange = (value?: DefaultValueType, labelList?: ReactNode[]) => {
    if (this.props.selectedOptionValue !== value) {
      if (!this.props.isDirty) {
        this.props.updateWidgetMetaProperty("isDirty", true);
      }

      this.props.updateWidgetMetaProperty("selectedOption", value);
      this.props.updateWidgetMetaProperty(
        "selectedLabel",
        labelList?.[0] ?? "",
        {
          triggerPropertyName: "onOptionChange",
          dynamicString: this.props.onOptionChange,
          event: {
            type: EventType.ON_OPTION_CHANGE,
          },
        },
      );
    }
  };

  onDropdownOpen = () => {
    if (this.props.onDropdownOpen) {
      super.executeAction({
        triggerPropertyName: "onDropdownOpen",
        dynamicString: this.props.onDropdownOpen,
        event: {
          type: EventType.ON_DROPDOWN_OPEN,
        },
      });
    }
  };

  onDropdownClose = () => {
    if (this.props.onDropdownClose) {
      super.executeAction({
        triggerPropertyName: "onDropdownClose",
        dynamicString: this.props.onDropdownClose,
        event: {
          type: EventType.ON_DROPDOWN_CLOSE,
        },
      });
    }
  };
}

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: DropdownOption[];
}

export interface SingleSelectTreeWidgetProps extends WidgetProps {
  placeholderText?: string;
  selectedIndex?: number;
  options?: DropdownOption[];
  flattenedOptions?: DropdownOption[];
  onOptionChange: string;
  onDropdownOpen?: string;
  onDropdownClose?: string;
  defaultOptionValue: string;
  isRequired: boolean;
  isLoading: boolean;
  allowClear: boolean;
  selectedLabel: string[];
  selectedOption: string | number;
  selectedOptionValue: string;
  selectedOptionLabel: string;
  expandAll: boolean;
  labelText: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  borderRadius: string;
  boxShadow?: string;
  accentColor: string;
  isDirty?: boolean;
  labelComponentWidth?: number;
}

export default SingleSelectTreeWidget;
