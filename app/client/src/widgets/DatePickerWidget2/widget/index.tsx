import {$t} from "locale/index";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { TextSize } from "constants/WidgetConstants";
import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import DatePickerComponent from "../component";

import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";

import { Alignment } from "@blueprintjs/core";
import { LabelPosition } from "components/constants";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { DatePickerType } from "../constants";
import { TimePrecision } from "../constants";
import { DateFormatOptions } from "./constants";
import derivedProperties from "./parseDerivedProperties";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import moment from "moment";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { DynamicHeight } from "utils/WidgetFeatures";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function allowedRange(value: any) {
  const allowedValues = [0, 1, 2, 3, 4, 5, 6];
  const isValid = allowedValues.includes(Number(value));

  return {
    isValid: isValid,
    parsed: isValid ? Number(value) : 0,
    messages: isValid
      ? [
          {
            name: "",
            message: "",
          },
        ]
      : [
          {
            name: "RangeError",
            message: $t('index.ad2d7d8a7d7ef672'),
          },
        ],
  };
}

class DatePickerWidget extends BaseWidget<DatePickerWidget2Props, WidgetState> {
  static type = "DATE_PICKER_WIDGET2";

  static getConfig() {
    return {
      name: "DatePicker",
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.INPUTS],
      needsMeta: true,
      searchTags: ["calendar"],
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
      isDisabled: false,
      datePickerType: "DATE_PICKER",
      rows: 7,
      label: $t('index.1210bc7e5e73ee8a'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      labelTextSize: "0.875rem",
      dateFormat: "YYYY-MM-DD HH:mm",
      columns: 20,
      widgetName: "DatePicker",
      defaultDate: moment().toISOString(),
      minDate: "1920-12-31T18:30:00.000Z",
      maxDate: "2121-12-31T18:29:00.000Z",
      version: 2,
      isRequired: false,
      closeOnSelection: true,
      shortcuts: false,
      firstDayOfWeek: 0,
      timePrecision: TimePrecision.MINUTE,
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
            propertyPath: "defaultDate",
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
              minWidth: "120px",
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
        minWidth: { base: "120px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.a01a6cf7778f1c79'),
      "!url": "https://docs.appsmith.com/widget-reference/datepicker",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      selectedDate: "string",
      formattedDate: "string",
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
          path: "defaultDate",
          type: "string",
          accessor: "selectedDate",
        },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.22e9e0c08b46cb9c'),
        children: [
          {
            helpText: $t('index.65059844f87dcfb1'),
            propertyName: "dateFormat",
            label: $t('index.75a9f319f19ab6f2'),
            controlType: "DROP_DOWN",
            isJSConvertible: true,
            optionWidth: "340px",
            options: DateFormatOptions,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            hideSubText: true,
          },
          {
            propertyName: "defaultDate",
            label: $t('index.389c8f0c1c0e0af8'),
            helpText:
              $t('index.deb14c2a5560d910'),
            controlType: "DATE_PICKER",
            placeholderText: $t('index.4eb7a9bee86ed768'),
            useValidationMessage: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.DATE_ISO_STRING },
          },
          {
            propertyName: "firstDayOfWeek",
            label: $t('index.81e3ca3bd5114c12'),
            helpText: $t('index.197fe313acdf01b7'),
            controlType: "INPUT_TEXT",
            defaultValue: "0",
            inputType: "INTEGER",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: allowedRange,
                expected: {
                  type: "0 : sunday\n1 : monday\n2 : tuesday\n3 : wednesday\n4 : thursday\n5 : friday\n6 : saturday",
                  example: "0",
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
          },
          {
            propertyName: "timePrecision",
            label: $t('index.6c7faaf23918c45c'),
            controlType: "DROP_DOWN",
            helpText: $t('index.c5e35a5469205987'),
            defaultValue: TimePrecision.MINUTE,
            options: [
              {
                label: $t('index.30458ea62e25fef4'),
                value: TimePrecision.NONE,
              },
              {
                label: $t('index.d3197f5053f2d1a7'),
                value: TimePrecision.MINUTE,
              },
              {
                label: $t('index.913ed352fbc4d80d'),
                value: TimePrecision.SECOND,
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [
                  TimePrecision.NONE,
                  TimePrecision.MINUTE,
                  TimePrecision.SECOND,
                ],
                default: TimePrecision.MINUTE,
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.1210bc7e5e73ee8a'),
        children: [
          {
            helpText: $t('index.5b5f2a2fe254fb69'),
            propertyName: "label",
            label: $t('index.8ad94526638bffc6'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.7694605d1fd2bb0d'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.89298c9d7a59a9b2'),
            propertyName: "labelPosition",
            label: $t('index.61a75d005ce288eb'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.78234c248e7319e9'), value: LabelPosition.Auto },
              { label: $t('index.e1e5e5038fde48cf'), value: LabelPosition.Left },
              { label: $t('index.3f37dd9698028638'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.e817ade165ed8ed0'),
            propertyName: "labelAlignment",
            label: $t('index.5985397f5100a58f'),
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
            hidden: (props: DatePickerWidget2Props) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.bfcd5a2239772843'),
            propertyName: "labelWidth",
            label: $t('index.4b73c2b0a53895cc'),
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
            hidden: (props: DatePickerWidget2Props) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.7fe3bc256483e84c'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.2459eb84e63cd1dc'),
            helpText: $t('index.df4e0c2a97d4c75f'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "minDate",
            label: $t('index.ccdd939aa5fcbe35'),
            helpText: $t('index.23d75e63e12aa262'),
            controlType: "DATE_PICKER",
            useValidationMessage: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.DATE_ISO_STRING },
          },
          {
            propertyName: "maxDate",
            label: $t('index.86759978ba1ced96'),
            helpText: $t('index.0cdfa208a980525e'),
            controlType: "DATE_PICKER",
            useValidationMessage: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.DATE_ISO_STRING },
          },
        ],
      },
      {
        sectionName: $t('index.f4e0eedadb035e02'),
        children: [
          {
            helpText: $t('index.fbd6b49670e81e36'),
            propertyName: "labelTooltip",
            label: $t('index.6cc8543bb7f8c665'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.a0ac444431c45f3a'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            label: $t('index.04c37c90d8d93252'),
            helpText: $t('index.f288a30fa7df5912'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.d799c9b718fbf151'),
            helpText: $t('index.8b0441ab5aaabee3'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.06c191d8166bac0b'),
            controlType: "SWITCH",
            helpText: $t('index.1a9b84fb32e4b334'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "shortcuts",
            label: $t('index.d6ab7bbe10aff096'),
            helpText: $t('index.adf546e853fa20b5'),
            controlType: "SWITCH",
            isJSConvertible: false,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "closeOnSelection",
            label: $t('index.44fbd45ad878b0ea'),
            helpText: $t('index.3ad3950f53874825'),
            controlType: "SWITCH",
            defaultValue: true,
            isJSConvertible: false,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.02c0645fe314e657'),
        children: [
          {
            propertyName: "onDateSelected",
            label: "onDateSelected",
            helpText: $t('index.9bfa24c4732d192e'),
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            propertyName: "onFocus",
            label: "onFocus",
            helpText: $t('index.008459da327d3a84'),
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            propertyName: "onBlur",
            label: "onBlur",
            helpText: $t('index.dc5584b51832273c'),
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
        sectionName: $t('index.664001b829dec0a2'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.3192a407526b3fe3'),
            helpText: $t('index.160c9f4c6cd075fd'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.e39fe8be9dae9223'),
            helpText: $t('index.9cb957539ad6e97a'),
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
            label: $t('index.fbce535b6553717d'),
            helpText: $t('index.9c1cac0fc70801ea'),
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
        sectionName: $t('index.a262b2664b1a9a5f'),
        children: [
          {
            propertyName: "accentColor",
            label: $t('index.6c763c462ad1efb0'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            invisible: true,
          },
          {
            propertyName: "borderRadius",
            label: $t('index.e93dce154d816ee5'),
            helpText:
              $t('index.9d81fea53e3b23e6'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.3f7b128ea9731552'),
            helpText:
              $t('index.3900c6ca677bd957'),
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

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      isValid: `{{(()=>{${derivedProperties.isValidDate}})()}}`,
      selectedDate: `{{ this.value ? moment(this.value).toISOString() : "" }}`,
      formattedDate: `{{ this.value ? moment(this.value).format(this.dateFormat) : "" }}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      value: "defaultDate",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      value: undefined,
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

  componentDidUpdate(prevProps: DatePickerWidget2Props): void {
    if (
      this.props.defaultDate !== prevProps.defaultDate &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  getWidgetView() {
    const { componentHeight } = this.props;

    return (
      <DatePickerComponent
        accentColor={this.props.accentColor}
        backgroundColor={this.props.backgroundColor}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        closeOnSelection={this.props.closeOnSelection}
        compactMode={isCompactMode(componentHeight)}
        dateFormat={this.props.dateFormat}
        datePickerType="DATE_PICKER"
        firstDayOfWeek={this.props.firstDayOfWeek}
        isDisabled={this.props.isDisabled}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isLoading={this.props.isLoading}
        isRequired={this.props.isRequired}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelText={this.props.label}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelTooltip={this.props.labelTooltip}
        labelWidth={this.props.labelComponentWidth}
        maxDate={this.props.maxDate}
        minDate={this.props.minDate}
        onBlur={this.onBlur}
        onDateSelected={this.onDateSelected}
        onFocus={this.onFocus}
        selectedDate={this.props.value}
        shortcuts={this.props.shortcuts}
        timePrecision={this.props.timePrecision}
        widgetId={this.props.widgetId}
      />
    );
  }

  onDateSelected = (selectedDate: string) => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("value", selectedDate, {
      triggerPropertyName: "onDateSelected",
      dynamicString: this.props.onDateSelected,
      event: {
        type: EventType.ON_DATE_SELECTED,
      },
    });
  };

  onFocus = () => {
    if (this.props.onFocus)
      super.executeAction({
        triggerPropertyName: "onFocus",
        dynamicString: this.props.onFocus,
        event: {
          type: EventType.ON_FOCUS,
        },
      });
  };

  onBlur = () => {
    if (this.props.onBlur)
      super.executeAction({
        triggerPropertyName: "onBlur",
        dynamicString: this.props.onBlur,
        event: {
          type: EventType.ON_BLUR,
        },
      });
  };
}

export interface DatePickerWidget2Props extends WidgetProps {
  defaultDate: string;
  selectedDate: string;
  formattedDate: string;
  isDisabled: boolean;
  dateFormat: string;
  label: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  datePickerType: DatePickerType;
  onDateSelected?: string;
  onDateRangeSelected?: string;
  maxDate: string;
  minDate: string;
  isRequired?: boolean;
  closeOnSelection: boolean;
  shortcuts: boolean;
  backgroundColor: string;
  borderRadius: string;
  boxShadow?: string;
  accentColor: string;
  firstDayOfWeek?: number;
  timePrecision: TimePrecision;
  onFocus?: string;
  onBlur?: string;
  labelComponentWidth?: number;
}

export default DatePickerWidget;
