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
import { isArray, xor } from "lodash";
import type { DefaultValueType } from "rc-tree-select/lib/interface";
import type { CheckedStrategy } from "rc-tree-select/lib/utils/strategyUtil";
import type { ReactNode } from "react";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { MinimumPopupWidthInPercentage } from "WidgetProvider/constants";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import MultiTreeSelectComponent from "../component";
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
  let values: string[] = [];

  if (typeof value === "string") {
    try {
      values = JSON.parse(value);

      if (!Array.isArray(values)) {
        throw new Error();
      }
    } catch {
      values = value.length ? value.split(",") : [];

      if (values.length > 0) {
        values = values.map((_v: string) => _v.trim());
      }
    }
  }

  if (Array.isArray(value)) {
    values = Array.from(new Set(value));
  }

  return {
    isValid: true,
    parsed: values,
  };
}

class MultiSelectTreeWidget extends BaseWidget<
  MultiSelectTreeWidgetProps,
  WidgetState
> {
  static type = "MULTI_SELECT_TREE_WIDGET";

  static getConfig() {
    return {
      name: $t('index.239b6c81b5544497'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.SELECT],
      needsMeta: true,
      searchTags: ["dropdown", "multiselecttree"],
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
      mode: "SHOW_ALL",
      animateLoading: true,
      options: [
        {
          label: $t('index.bb541be824dd8ecc'),
          value: "BLUE",
          children: [
            {
              label: $t('index.4c10b3d54e8b9e66'),
              value: "DARK BLUE",
            },
            {
              label: $t('index.42d6ea398362e766'),
              value: "LIGHT BLUE",
            },
          ],
        },
        { label: $t('index.2456fd5221fc6a7e'), value: "GREEN" },
        { label: $t('index.fae87d1ee158a019'), value: "RED" },
      ],
      widgetName: "MultiTreeSelect",
      defaultOptionValue: ["GREEN"],
      version: 1,
      isVisible: true,
      isRequired: false,
      isDisabled: false,
      allowClear: false,
      expandAll: false,
      placeholderText: $t('index.e1407081bc845aa2'),
      labelText: $t('index.9adae44ff1cb18e7'),
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

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.66e134899ef52eb6'),
      "!url": "https://docs.appsmith.com/widget-reference/treeselect",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      selectedOptionValues: {
        "!type": "[string]",
        "!doc": $t('index.38ce87497f701811'),
        "!url": "https://docs.appsmith.com/widget-reference/treeselect",
      },
      selectedOptionLabels: {
        "!type": "[string]",
        "!doc": $t('index.2b3606fd0ec5de33'),
        "!url": "https://docs.appsmith.com/widget-reference/treeselect",
      },
      isDisabled: "bool",
      isValid: "bool",
      options: "[$__dropdrowOptionWithChildren__$]",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.aee785be2b4489e7'),
        children: [
          {
            helpText:
              $t('index.a9f6ac31a542193e'),
            propertyName: "options",
            label: $t('index.0972818a5f328b4a'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.b1946a1516dc3e3f'),
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
            helpText: $t('index.312ef0ff2484ddd0'),
            propertyName: "defaultOptionValue",
            label: $t('index.d496827e0a30fe3b'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.b1946a1516dc3e3f'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultOptionValueValidation,
                expected: {
                  type: "Array of values",
                  example: `['value1', 'value2']`,
                  autocompleteDataType: AutocompleteDataType.ARRAY,
                },
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.9adae44ff1cb18e7'),
        children: [
          {
            helpText: $t('index.865f432428ce954d'),
            propertyName: "labelText",
            label: $t('index.81c7a09468db25b9'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.948e76080d2b2555'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.3c0da170b6cda2d7'),
            propertyName: "labelPosition",
            label: $t('index.26f458327aaefc94'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.59bb50f7bcf5c1cf'), value: LabelPosition.Auto },
              { label: $t('index.bc62ea369972da42'), value: LabelPosition.Left },
              { label: $t('index.140d93c39badb907'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.47654dd8c4a4c8a5'),
            propertyName: "labelAlignment",
            label: $t('index.0a338a12306314ee'),
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
            hidden: (props: MultiSelectTreeWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.0c3791426d73c1c9'),
            propertyName: "labelWidth",
            label: $t('index.b2405df01abf90af'),
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
            hidden: (props: MultiSelectTreeWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.6481edf98236c85e'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.855f038f26528785'),
            helpText: $t('index.d2028084d627cb39'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.7ff323c97d38bd5c'),
        children: [
          {
            helpText: $t('index.92a79c15ed817ecb'),
            propertyName: "labelTooltip",
            label: $t('index.94bd1e73ec77f349'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.89b750f215cc2011'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.902f41c6f582c4c3'),
            propertyName: "mode",
            label: $t('index.7747807945d0dd17'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: $t('index.3bd7d01c80d727ca'),
                value: "SHOW_PARENT",
              },
              {
                label: $t('index.6c740271ab4e3aa2'),
                value: "SHOW_CHILD",
              },
              {
                label: $t('index.0e629c543d1784fd'),
                value: "SHOW_ALL",
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            helpText: $t('index.32c301c2ef979b78'),
            propertyName: "placeholderText",
            label: $t('index.02863a3db32b4c45'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.9921476c9a1c4a83'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.d29440bcaa711d1a'),
            propertyName: "isVisible",
            label: $t('index.2e79877f87c815cc'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.d1ab01113e915823'),
            helpText: $t('index.2cac24253b28b3e5'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.7fcb6729dbfc12c8'),
            controlType: "SWITCH",
            helpText: $t('index.aebefe45421b1434'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "allowClear",
            label: $t('index.b1607f7586bc1e21'),
            helpText: $t('index.904e1423fe887416'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "expandAll",
            label: $t('index.c5a87c22f7ba4f55'),
            helpText: $t('index.fbe8c879bba2d430'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.67efdd219e5fa47c'),
        children: [
          {
            helpText: $t('index.cd14db37c9458c05'),
            propertyName: "onOptionChange",
            label: "onOptionChange",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.06af1619d89ad841'),
            propertyName: "onDropdownOpen",
            label: "onDropdownOpen",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.063cd4b982299b1c'),
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

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.b34718f12deb0eba'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.1e807d65c1d751f5'),
            helpText: $t('index.8c7d25fab7fcc861'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.d4d5fa1b797a1e40'),
            helpText: $t('index.ca43fd53cde313a3'),
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
            label: $t('index.7e470e67c1ca90fd'),
            helpText: $t('index.e4e801a59df4ad2e'),
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
        sectionName: $t('index.4ef1aa37f9dc1cff'),
        children: [
          {
            propertyName: "accentColor",
            label: $t('index.44cd0f7a4da868ee'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            invisible: true,
          },
          {
            propertyName: "borderRadius",
            label: $t('index.f4ae54ccf23c857b'),
            helpText:
              $t('index.330ec56acd090614'),
            controlType: "BORDER_RADIUS_OPTIONS",

            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.632e8bd6587804b1'),
            helpText:
              $t('index.91f51e4a3ec2a953'),
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

  static getDerivedPropertiesMap() {
    return {
      value: `{{this.selectedOptionValues}}`,
      isValid: `{{(()=>{${derivedProperties.getIsValid}})()}}`,
      flattenedOptions: `{{(()=>{${derivedProperties.getFlattenedOptions}})()}}`,
      selectedOptionValues: `{{(()=>{${derivedProperties.getSelectedOptionValues}})()}}`,
      selectedOptionLabels: `{{(()=>{${derivedProperties.getSelectedOptionLabels}})()}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedOptionValueArr: "defaultOptionValue",
      selectedLabel: "defaultOptionValue",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedOptionValueArr: undefined,
      selectedLabel: undefined,
      isDirty: false,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  componentDidUpdate(prevProps: MultiSelectTreeWidgetProps): void {
    if (
      xor(this.props.defaultOptionValue, prevProps.defaultOptionValue).length >
        0 &&
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
        setRequired: {
          path: "isRequired",
          type: "boolean",
        },
      },
    };
  }

  getWidgetView() {
    const options = isArray(this.props.options) ? this.props.options : [];
    const dropDownWidth =
      (MinimumPopupWidthInPercentage / 100) *
      (this.props.mainCanvasWidth ?? layoutConfigurations.MOBILE.maxWidth);
    const { componentHeight, componentWidth } = this.props;
    const isInvalid =
      "isValid" in this.props && !this.props.isValid && !!this.props.isDirty;

    return (
      <MultiTreeSelectComponent
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
        mode={this.props.mode}
        onChange={this.onOptionChange}
        onDropdownClose={this.onDropdownClose}
        onDropdownOpen={this.onDropdownOpen}
        options={options}
        placeholder={this.props.placeholderText as string}
        renderMode={this.props.renderMode}
        value={this.props.selectedOptionValues}
        widgetId={this.props.widgetId}
        width={componentWidth}
      />
    );
  }

  onOptionChange = (value?: DefaultValueType, labelList?: ReactNode[]) => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("selectedOptionValueArr", value);
    this.props.updateWidgetMetaProperty("selectedLabel", labelList, {
      triggerPropertyName: "onOptionChange",
      dynamicString: this.props.onOptionChange,
      event: {
        type: EventType.ON_OPTION_CHANGE,
      },
    });

    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
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
  value: string;
  disabled?: boolean;
  children?: DropdownOption[];
}

export interface MultiSelectTreeWidgetProps extends WidgetProps {
  placeholderText?: string;
  selectedIndexArr?: number[];
  options?: DropdownOption[];
  onOptionChange: string;
  onDropdownOpen?: string;
  onDropdownClose?: string;
  defaultOptionValue: string[];
  isRequired: boolean;
  isLoading: boolean;
  allowClear: boolean;
  labelText: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  selectedLabel: string[];
  selectedOptionValueArr: string[];
  selectedOptionValues: string[];
  selectedOptionLabels: string[];
  expandAll: boolean;
  mode: CheckedStrategy;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  borderRadius: string;
  boxShadow?: string;
  accentColor: string;
  isDirty: boolean;
  labelComponentWidth?: number;
}

export default MultiSelectTreeWidget;
