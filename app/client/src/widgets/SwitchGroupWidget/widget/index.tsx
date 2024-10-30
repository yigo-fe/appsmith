import {$t} from "locale/index";
import React from "react";
import { Alignment } from "@blueprintjs/core";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { isString, xor } from "lodash";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import { LabelPosition } from "components/constants";
import type { TextSize } from "constants/WidgetConstants";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import {
  isAutoHeightEnabledForWidget,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { OptionProps } from "../component";
import SwitchGroupComponent from "../component";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { FlexVerticalAlignment } from "layoutSystems/common/utils/constants";

class SwitchGroupWidget extends BaseWidget<
  SwitchGroupWidgetProps,
  WidgetState
> {
  static type = "SWITCH_GROUP_WIDGET";

  static getConfig() {
    return {
      name: $t('index.b6bab4473886ca0c'), // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.TOGGLES],
      needsMeta: true, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
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
      widgetName: "SwitchGroup",
      rows: 6,
      columns: 26,
      options: [
        { label: $t('index.9ad6c28b00e86aca'), value: "BLUE" },
        { label: $t('index.aee83de4b8cb9dc5'), value: "GREEN" },
        { label: $t('index.26b1fba77b85b40c'), value: "RED" },
      ],
      defaultSelectedValues: ["BLUE"],
      isDisabled: false,
      isRequired: false,
      isInline: true,
      isVisible: true,
      animateLoading: true,
      alignment: Alignment.LEFT,
      labelText: $t('index.2cc1330288ab1302'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      version: 1,
      labelTextSize: "0.875rem",
      flexVerticalAlignment: FlexVerticalAlignment.Top,
    };
  }

  static getAutoLayoutConfig() {
    return {
      disabledPropsDefaults: {
        labelPosition: LabelPosition.Top,
      },
      defaults: {
        columns: 14,
        rows: 7,
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

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.2ccd99f049432b01'),
        children: [
          {
            helpText:
              $t('index.254d405ba3a73003'),
            propertyName: "options",
            label: $t('index.ac5a06bfb23610ff'),
            controlType: "INPUT_TEXT",
            placeholderText: '[{ "label": "Option1", "value": "Option2" }]',
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
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
                          unique: true,
                        },
                      },
                      {
                        name: "value",
                        type: ValidationTypes.TEXT,
                        params: {
                          default: "",
                          unique: true,
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
            helpText:
              $t('index.89c5f0278c3d90b0'),
            propertyName: "defaultSelectedValues",
            label: $t('index.071b75c10dc0dd86'),
            placeholderText: $t('index.78eedab934bb0f68'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: {
                default: [],
                children: {
                  type: ValidationTypes.TEXT,
                },
                strict: true,
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.2cc1330288ab1302'),
        children: [
          {
            helpText: $t('index.ad9a85f868109c9a'),
            propertyName: "labelText",
            label: $t('index.40523e5bc9c2d95a'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.d12a3e61bb94396e'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.ae2bf5ce832542d2'),
            propertyName: "labelPosition",
            label: $t('index.b835d59033128225'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.693611011c5c77ea'), value: LabelPosition.Auto },
              { label: $t('index.9a39055cda006748'), value: LabelPosition.Left },
              { label: $t('index.4aa7e7c13c6c28d0'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.47c297628be0e771'),
            propertyName: "labelAlignment",
            label: $t('index.0f6eda3d17d05fd0'),
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
            hidden: (props: SwitchGroupWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.d2249483b64c6c0a'),
            propertyName: "labelWidth",
            label: $t('index.fcaa7e39eb1d483a'),
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
            hidden: (props: SwitchGroupWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.d791b17c8b335f8c'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.7e7d0e3c03b1fcd7'),
            helpText: $t('index.4c01dceb1f3a1e25'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.6a7f63e146b4edfc'),
        children: [
          {
            helpText: $t('index.b61b1dd65ceaad3b'),
            propertyName: "labelTooltip",
            label: $t('index.bd42336f808305cc'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.a0bca444f0754b2c'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            helpText: $t('index.9aab5278bd286f65'),
            label: $t('index.6ccdec946df260da'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            helpText: $t('index.23ddab83f00d0f13'),
            label: $t('index.c05502eed0cec0c9'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isInline",
            helpText:
              $t('index.70a4ba78da2222f4'),
            label: $t('index.b694aa7565daa3eb'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.cfd7d237606fb7b1'),
            controlType: "SWITCH",
            helpText: $t('index.2153b7ac7269803d'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.491da1b5581061f3'),
        children: [
          {
            helpText: $t('index.277b26cdb43c9557'),
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

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setDisable: {
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
        sectionName: $t('index.e14d9bdfe3be82cf'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.08198bd242f5649f'),
            helpText: $t('index.badba2a048f7c079'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.6d97e28bbc208a65'),
            helpText: $t('index.82cdf4c18e780829'),
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
            label: $t('index.016ea7e4bfd679b6'),
            helpText: $t('index.df65c3edb3b4e746'),
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
        sectionName: $t('index.6a7f63e146b4edfc'),
        children: [
          {
            propertyName: "alignment",
            helpText: $t('index.d6e5a1f742548260'),
            label: $t('index.0f6eda3d17d05fd0'),
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
        sectionName: $t('index.8d69166cdc78bef0'),
        children: [
          {
            propertyName: "accentColor",
            helpText: $t('index.6c68a3b7062d0479'),
            label: $t('index.af9a865bf09a29d5'),
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

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.9d7f7ca567735efc'),
      "!url": "https://docs.appsmith.com/widget-reference/switch-group",
      selectedValues: "[string]",
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedValuesArray: "defaultSelectedValues",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedValuesArray: undefined,
      isDirty: false,
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      isValid: `{{ this.isRequired ? !!this.selectedValues.length : true }}`,
      selectedValues: `{{
        this.selectedValuesArray.filter(
          selectedValue => this.options.map(option => option.value).includes(selectedValue)
        )
      }}`,
      value: `{{this.selectedValues}}`,
    };
  }

  componentDidUpdate(prevProps: SwitchGroupWidgetProps): void {
    if (
      xor(this.props.defaultSelectedValues, prevProps.defaultSelectedValues)
        .length > 0
    ) {
      if (this.props.isDirty) {
        this.props.updateWidgetMetaProperty("isDirty", false);
      }

      this.props.updateWidgetMetaProperty(
        "selectedValuesArray",
        this.props.defaultSelectedValues,
      );
    }
  }

  getWidgetView() {
    const {
      accentColor,
      alignment,
      isDisabled,
      isInline,
      isRequired,
      isValid,
      labelAlignment,
      labelPosition,
      labelStyle,
      labelText,
      labelTextColor,
      labelTextSize,
      labelTooltip,
      options,
      selectedValues,
      widgetId,
    } = this.props;

    const { componentHeight } = this.props;

    // TODO(abhinav): Not sure why we have to do this.
    // Check with the App Viewers Pod
    let _options = options;

    if (isString(options)) {
      try {
        _options = JSON.parse(options as string);
      } catch (e) {}
    }

    return (
      <SwitchGroupComponent
        accentColor={accentColor}
        alignment={alignment}
        compactMode={isCompactMode(componentHeight)}
        disabled={isDisabled}
        height={componentHeight}
        inline={isInline}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        labelAlignment={labelAlignment}
        labelPosition={labelPosition}
        labelStyle={labelStyle}
        labelText={labelText}
        labelTextColor={labelTextColor}
        labelTextSize={labelTextSize}
        labelTooltip={labelTooltip}
        labelWidth={this.props.labelComponentWidth}
        onChange={this.handleSwitchStateChange}
        options={_options}
        required={isRequired}
        selected={selectedValues}
        valid={isValid}
        widgetId={widgetId}
      />
    );
  }

  private handleSwitchStateChange = (value: string) => {
    return (event: React.FormEvent<HTMLElement>) => {
      let { selectedValuesArray } = this.props;
      const isChecked = (event.target as HTMLInputElement).checked;

      if (isChecked) {
        selectedValuesArray = [...selectedValuesArray, value];
      } else {
        selectedValuesArray = selectedValuesArray.filter(
          (item: string) => item !== value,
        );
      }

      if (!this.props.isDirty) {
        this.props.updateWidgetMetaProperty("isDirty", true);
      }

      this.props.updateWidgetMetaProperty(
        "selectedValuesArray",
        selectedValuesArray,
        {
          triggerPropertyName: "onSelectionChange",
          dynamicString: this.props.onSelectionChange,
          event: {
            type: EventType.ON_SWITCH_GROUP_SELECTION_CHANGE,
          },
        },
      );
    };
  };
}

export interface SwitchGroupWidgetProps extends WidgetProps {
  options: OptionProps[];
  defaultSelectedValues: string[];
  selectedValuesArray: string[];
  isInline: boolean;
  isRequired: boolean;
  isValid: boolean;
  isDisabled: boolean;
  alignment: Alignment;
  labelText?: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  onSelectionChange?: string;
  accentColor: string;
  labelComponentWidth?: number;
}

export default SwitchGroupWidget;
