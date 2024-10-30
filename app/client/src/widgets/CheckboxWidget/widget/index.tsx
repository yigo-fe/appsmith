import {$t} from "locale/index";
import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import React from "react";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { AlignWidgetTypes } from "WidgetProvider/constants";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
} from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import CheckboxComponent from "../component";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";

import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";

class CheckboxWidget extends BaseWidget<CheckboxWidgetProps, WidgetState> {
  static type = "CHECKBOX_WIDGET";

  static getConfig() {
    return {
      name: $t('index.f6fce3db7c241977'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.TOGGLES],
      needsMeta: true,
      searchTags: ["boolean"],
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 2,
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      rows: 4,
      columns: 12,
      label: $t('index.078a8f4dace0b744'),
      defaultCheckedState: true,
      widgetName: $t('index.f6fce3db7c241977'),
      version: 1,
      alignWidget: AlignWidgetTypes.LEFT,
      labelPosition: LabelPosition.Left,
      isDisabled: false,
      isRequired: false,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "defaultCheckedState",
            propertyValue: propValueMap.data,
            isDynamicPropertyPath: true,
          },
        ];
      },
    };
  }

  static getAutoLayoutConfig() {
    return {
      disabledPropsDefaults: {
        labelTextSize: "0.875rem",
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "120px",
              minHeight: "40px",
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
        minHeight: { base: "40px" },
        minWidth: { base: "120px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.e85f7b1800cd722c'),
      "!url": "https://docs.appsmith.com/widget-reference/checkbox",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      isChecked: "bool",
      isDisabled: "bool",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.078a8f4dace0b744'),
        children: [
          {
            propertyName: "label",
            label: $t('index.2a12f1117969c6a9'),
            controlType: "INPUT_TEXT",
            helpText: $t('index.0ead094d6c846527'),
            placeholderText: $t('index.845dd7b61fa2bdcd'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.da747db3d61e1f4f'),
            propertyName: "labelPosition",
            label: $t('index.d965b8c05b71d03a'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              { label: $t('index.6f269ad69292501c'), value: LabelPosition.Left },
              { label: $t('index.b9b6a849d87ac095'), value: LabelPosition.Right },
            ],
            defaultValue: LabelPosition.Left,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "alignWidget",
            helpText: $t('index.a28d7991cd467c3c'),
            label: $t('index.1850e95233b55f6a'),
            controlType: "LABEL_ALIGNMENT_OPTIONS",
            isBindProperty: true,
            isTriggerProperty: false,
            fullWidth: false,
            options: [
              {
                startIcon: "align-left",
                value: AlignWidgetTypes.LEFT,
              },
              {
                startIcon: "align-right",
                value: AlignWidgetTypes.RIGHT,
              },
            ],
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.bc294f412a0fb6ca'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.dd134a7a9f2ea9af'),
            helpText: $t('index.940d3c40b1c396e4'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.d43fec62485a34bf'),
        children: [
          {
            propertyName: "defaultCheckedState",
            label: $t('index.690239e44f1d9fb5'),
            helpText: $t('index.cb236aa4b232e582'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            label: $t('index.9918ed57e212c70e'),
            helpText: $t('index.fc523025168eecfb'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.d4b48c4557204e37'),
            controlType: "SWITCH",
            helpText: $t('index.d832f5263ca6287d'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.7c692f8218cba69a'),
            controlType: "SWITCH",
            helpText: $t('index.b173dfd2b73aba2c'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.0f9e6d1738d2e1ee'),
        children: [
          {
            helpText: $t('index.487eed03fd436c29'),
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
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.8c157e9c5cbd7016'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.24e331433291b35f'),
            helpText: $t('index.e076eda0e60f2b7b'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.ffd26ab669c3128d'),
            helpText: $t('index.8f1c70a1bf38c65a'),
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
            label: $t('index.f13db7ddbd937539'),
            helpText: $t('index.8d8e271590e73ca1'),
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
        sectionName: $t('index.c690c3d6b07a4ebf'),
        children: [
          {
            propertyName: "accentColor",
            helpText: $t('index.3f47761fd96718cf'),
            label: $t('index.11f06d7e8bb20750'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.11d60995564da2b1'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.af084722f387891e'),
            helpText:
              $t('index.39b48bfd90e19d05'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      isChecked: "defaultCheckedState",
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{!!this.isChecked}}`,
      isValid: `{{ this.isRequired ? !!this.isChecked : true }}`,
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      isChecked: undefined,
      isDirty: false,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    };
  }

  componentDidUpdate(prevProps: CheckboxWidgetProps) {
    if (
      this.props.defaultCheckedState !== prevProps.defaultCheckedState &&
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
        setValue: {
          path: "defaultCheckedState",
          type: "boolean",
          accessor: "isChecked",
        },
      },
    };
  }

  getWidgetView() {
    return (
      <CheckboxComponent
        accentColor={this.props.accentColor}
        alignWidget={this.props.alignWidget}
        borderRadius={this.props.borderRadius}
        isChecked={!!this.props.isChecked}
        isDisabled={this.props.isDisabled}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isLabelInline={this.isAutoLayoutMode}
        isLoading={this.props.isLoading}
        isRequired={this.props.isRequired}
        key={this.props.widgetId}
        label={this.props.label}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        minHeight={this.props.minHeight}
        onCheckChange={this.onCheckChange}
        widgetId={this.props.widgetId}
      />
    );
  }

  onCheckChange = (isChecked: boolean) => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("isChecked", isChecked, {
      triggerPropertyName: "onCheckChange",
      dynamicString: this.props.onCheckChange,
      event: {
        type: EventType.ON_CHECK_CHANGE,
      },
    });
  };
}

export interface CheckboxWidgetProps extends WidgetProps {
  label: string;
  defaultCheckedState: boolean;
  isChecked?: boolean;
  isDisabled?: boolean;
  onCheckChange?: string;
  isRequired?: boolean;
  accentColor: string;
  borderRadius: string;
  alignWidget: AlignWidgetTypes;
  labelPosition: LabelPosition;
  labelTextColor?: string;
  labelTextSize?: string;
  labelStyle?: string;
}

export default CheckboxWidget;
