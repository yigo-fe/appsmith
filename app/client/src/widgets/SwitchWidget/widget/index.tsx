import {$t} from "locale/index";
import React from "react";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import SwitchComponent from "../component";
import { ValidationTypes } from "constants/WidgetValidation";
import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { AlignWidgetTypes } from "WidgetProvider/constants";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
} from "widgets/WidgetUtils";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";

class SwitchWidget extends BaseWidget<SwitchWidgetProps, WidgetState> {
  static type = "SWITCH_WIDGET";

  static getConfig() {
    return {
      name: $t('index.307abc6f0724afab'),
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
        sectionIndex: 1,
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      label: $t('index.c41b141dfe5f7446'),
      rows: 4,
      columns: 12,
      defaultSwitchState: true,
      widgetName: $t('index.307abc6f0724afab'),
      alignWidget: AlignWidgetTypes.LEFT,
      labelPosition: LabelPosition.Left,
      version: 1,
      isDisabled: false,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "defaultSwitchState",
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

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.c41b141dfe5f7446'),
        children: [
          {
            propertyName: "label",
            label: $t('index.c914d342cab6af47'),
            controlType: "INPUT_TEXT",
            helpText: $t('index.3c51b8b9315d255c'),
            placeholderText: $t('index.863dadc17ec8ee07'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.241f5e36e7719e61'),
            propertyName: "labelPosition",
            label: $t('index.7e073a07e2314f4f'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              { label: $t('index.2f4ae55a9dcbbdd4'), value: LabelPosition.Left },
              { label: $t('index.819b59da838383c3'), value: LabelPosition.Right },
            ],
            defaultValue: LabelPosition.Left,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "alignWidget",
            helpText: $t('index.907d97adf9d0f1be'),
            label: $t('index.e310341077b2a8ce'),
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
        sectionName: $t('index.4877911f580ea379'),
        children: [
          {
            propertyName: "defaultSwitchState",
            label: $t('index.434a16829c6bfc24'),
            helpText:
              $t('index.87f5613e472f6322'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            label: $t('index.914bac9d4aa5444f'),
            helpText: $t('index.09abd3de96bc0158'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.b3b6ef62372d31d4'),
            controlType: "SWITCH",
            helpText: $t('index.fcf7f270119520b9'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.ba1c17b31bef2763'),
            controlType: "SWITCH",
            helpText: $t('index.3fab969d9e962ecc'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.b2a686e83d8ad59f'),
        children: [
          {
            helpText: $t('index.cb93c03f23b1d412'),
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
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.69b36a1b42f2d0e8'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.0354bdc27d7cb752'),
            helpText: $t('index.ebbe731872e9f270'),
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
            label: $t('index.cdbcf792ab25f413'),
            helpText: $t('index.50556a8544930c4d'),
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
            label: $t('index.a0ff54d1af629dc2'),
            helpText: $t('index.95ba79915b916658'),
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
        sectionName: $t('index.be90475eb0dd1873'),
        children: [
          {
            propertyName: "accentColor",
            helpText: $t('index.29d17b73ea7fd4c9'),
            label: $t('index.7e1131753465b654'),
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
      boxShadow: "none",
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.6216dd0ff05349d7'),
      "!url": "https://docs.appsmith.com/widget-reference/switch",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      isSwitchedOn: "bool",
      isDisabled: "bool",
    };
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
          path: "defaultSwitchState",
          type: "boolean",
          accessor: "isSwitchedOn",
        },
        setColor: {
          path: "accentColor",
          type: "string",
        },
      },
    };
  }

  getWidgetView() {
    return (
      <SwitchComponent
        accentColor={this.props.accentColor}
        alignWidget={this.props.alignWidget}
        isDisabled={this.props.isDisabled}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isLabelInline={this.isAutoLayoutMode}
        isLoading={this.props.isLoading}
        isSwitchedOn={!!this.props.isSwitchedOn}
        key={this.props.widgetId}
        label={this.props.label}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        minHeight={this.props.minHeight}
        onChange={this.onChange}
        widgetId={this.props.widgetId}
      />
    );
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      isSwitchedOn: "defaultSwitchState",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      isSwitchedOn: undefined,
      isDirty: false,
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{!!this.isSwitchedOn}}`,
    };
  }

  componentDidUpdate(prevProps: SwitchWidgetProps): void {
    if (
      this.props.defaultSwitchState !== prevProps.defaultSwitchState &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  onChange = (isSwitchedOn: boolean) => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("isSwitchedOn", isSwitchedOn, {
      triggerPropertyName: "onChange",
      dynamicString: this.props.onChange,
      event: {
        type: EventType.ON_SWITCH_CHANGE,
      },
    });
  };
}

export interface SwitchWidgetProps extends WidgetProps {
  isSwitchedOn: boolean;
  defaultSwitchState: boolean;
  alignWidget: AlignWidgetTypes;
  labelPosition: LabelPosition;
  label: string;
  accentColor: string;
  isDirty: boolean;
  labelTextColor?: string;
  labelTextSize?: string;
  labelStyle?: string;
}

export default SwitchWidget;
