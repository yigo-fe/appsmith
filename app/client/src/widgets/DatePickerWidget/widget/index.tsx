import {$t} from "locale/index";
import type {
  AutocompletionDefinitions,
  WidgetCallout,
} from "WidgetProvider/constants";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ISO_DATE_FORMAT, ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig } from "entities/AppTheming";
import moment from "moment";
import { buildDeprecationWidgetMessage } from "pages/Editor/utils";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import DatePickerComponent from "../component";
import type { DatePickerType } from "../constants";
import IconSVG from "../icon.svg";

function defaultDateValidation(
  value: unknown,
  props: DatePickerWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _?: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moment?: any,
): ValidationResponse {
  const dateFormat = props.dateFormat || ISO_DATE_FORMAT;

  if (value === null) {
    return {
      isValid: true,
      parsed: "",
      messages: [{ name: "", message: "" }],
    };
  }

  if (value === undefined) {
    return {
      isValid: false,
      parsed: "",
      messages: [
        {
          name: "TypeError",
          message: $t('index.ae2c139aa4ad2df8', {dateFormat: dateFormat}),
        },
      ],
    };
  }

  const isValid = moment(value as string, dateFormat).isValid();

  return {
    isValid,
    parsed: isValid ? value : "",
    messages:
      isValid === false
        ? [
            {
              name: "TypeError",
              message: $t('index.8f09ff8f65bebcad'),
            },
          ]
        : [{ name: "", message: "" }],
  };
}

function minDateValidation(
  value: unknown,
  props: DatePickerWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _?: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moment?: any,
): ValidationResponse {
  const dateFormat = props.dateFormat || ISO_DATE_FORMAT;

  if (value === undefined) {
    return {
      isValid: false,
      parsed: "",
      messages: [
        {
          name: "TypeError",
          message:
            $t('index.bef936ad88a1e95f') +
            (dateFormat ? dateFormat : ""),
        },
      ],
    };
  }

  const parsedMinDate = moment(value as string, dateFormat);
  let isValid = parsedMinDate.isValid();

  if (!props.defaultDate) {
    return {
      isValid: isValid,
      parsed: value,
      messages: [{ name: "", message: "" }],
    };
  }

  const parsedDefaultDate = moment(props.defaultDate, dateFormat);

  if (
    isValid &&
    parsedDefaultDate.isValid() &&
    parsedDefaultDate.isBefore(parsedMinDate)
  ) {
    isValid = false;
  }

  if (!isValid) {
    return {
      isValid: isValid,
      parsed: "",
      messages: [
        {
          name: "TypeError",
          message:
            $t('index.bef936ad88a1e95f') +
            (dateFormat ? dateFormat : ""),
        },
      ],
    };
  }

  return {
    isValid: isValid,
    parsed: value,
    messages: [{ name: "", message: "" }],
  };
}

function maxDateValidation(
  value: unknown,
  props: DatePickerWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _?: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moment?: any,
): ValidationResponse {
  const dateFormat = props.dateFormat || ISO_DATE_FORMAT;

  if (value === undefined) {
    return {
      isValid: false,
      parsed: "",
      messages: [
        {
          name: "TypeError",
          message:
            $t('index.a247d7aada4c1c5c') +
            (dateFormat ? dateFormat : ""),
        },
      ],
    };
  }

  const parsedMaxDate = moment(value as string, dateFormat);
  let isValid = parsedMaxDate.isValid();

  if (!props.defaultDate) {
    return {
      isValid: isValid,
      parsed: value,
      messages: [{ name: "", message: "" }],
    };
  }

  const parsedDefaultDate = moment(props.defaultDate, dateFormat);

  if (
    isValid &&
    parsedDefaultDate.isValid() &&
    parsedDefaultDate.isAfter(parsedMaxDate)
  ) {
    isValid = false;
  }

  if (!isValid) {
    return {
      isValid: isValid,
      parsed: "",
      messages: [
        {
          name: "TypeError",
          message:
            $t('index.a247d7aada4c1c5c') +
            (dateFormat ? dateFormat : ""),
        },
      ],
    };
  }

  return {
    isValid: isValid,
    parsed: value,
    messages: [{ name: "", message: "" }],
  };
}

class DatePickerWidget extends BaseWidget<DatePickerWidgetProps, WidgetState> {
  static type = "DATE_PICKER_WIDGET";

  static getConfig() {
    return {
      name: "DatePicker",
      iconSVG: IconSVG,
      hideCard: true,
      isDeprecated: true,
      replacement: "DATE_PICKER_WIDGET2",
      needsMeta: true,
      tags: [WIDGET_TAGS.INPUTS],
    };
  }

  static getDefaults() {
    return {
      isDisabled: false,
      datePickerType: "DATE_PICKER",
      rows: 4,
      label: "",
      dateFormat: "YYYY-MM-DD HH:mm",
      columns: 20,
      widgetName: "DatePicker",
      defaultDate: moment().format("YYYY-MM-DD HH:mm"),
      version: 1,
      animateLoading: true,
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.ab95e9777c6bc0f9'),
      "!url": "https://docs.appsmith.com/widget-reference/datepicker",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      selectedDate: "string",
      isDisabled: "bool",
    };
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.20915c13ace6f674'),
        children: [
          {
            propertyName: "defaultDate",
            label: $t('index.0681e3aa2d544e53'),
            helpText:
              $t('index.a54d2152dff943f3'),
            controlType: "DATE_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultDateValidation,
                expected: {
                  type: "ISO 8601 string",
                  example: moment().toISOString(),
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            dependencies: ["dateFormat"],
          },
          {
            helpText: $t('index.b1e6aba8cace8e8c'),
            propertyName: "dateFormat",
            label: $t('index.a79509f4e7c57d08'),
            controlType: "DROP_DOWN",
            isJSConvertible: true,
            options: [
              {
                label: "YYYY-MM-DD",
                value: "YYYY-MM-DD",
              },
              {
                label: "YYYY-MM-DD HH:mm",
                value: "YYYY-MM-DD HH:mm",
              },
              {
                label: "YYYY-MM-DDTHH:mm:ss.sssZ",
                value: "YYYY-MM-DDTHH:mm:ss.sssZ",
              },
              {
                label: "DD/MM/YYYY",
                value: "DD/MM/YYYY",
              },
              {
                label: "DD/MM/YYYY HH:mm",
                value: "DD/MM/YYYY HH:mm",
              },
            ],
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isRequired",
            label: $t('index.bf463b6a55128d42'),
            helpText: $t('index.b32e3e0b84f71f1a'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            label: $t('index.7bb8e2ad1e368ef8'),
            helpText: $t('index.ae9f657854aceb90'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.6915023a79fdf89e'),
            helpText: $t('index.c934d29756f676b1'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.b0867963c9e19276'),
            controlType: "SWITCH",
            helpText: $t('index.e7bb98e0e8b7ec36'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "minDate",
            label: $t('index.21a7d949ac25ef8c'),
            helpText: $t('index.8248ff6c5f79428a'),
            controlType: "DATE_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: minDateValidation,
                expected: {
                  type: "ISO 8601 string",
                  example: moment().toISOString(),
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            dependencies: ["dateFormat", "defaultDate"],
          },
          {
            propertyName: "maxDate",
            label: $t('index.48e1bab2b697a6a9'),
            helpText: $t('index.c4fc1e3c0347bb39'),
            controlType: "DATE_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: maxDateValidation,
                expected: {
                  type: "ISO 8601 string",
                  example: moment().toISOString(),
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            dependencies: ["dateFormat", "defaultDate"],
          },
        ],
      },
      {
        sectionName: $t('index.bcd095ee31ba321d'),
        children: [
          {
            propertyName: "onDateSelected",
            label: "onDateSelected",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
    ];
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      isValid: `{{ this.isRequired ? !!this.selectedDate : true }}`,
      value: `{{ this.selectedDate }}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedDate: "defaultDate",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedDate: undefined,
    };
  }

  static getMethods() {
    return {
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message: buildDeprecationWidgetMessage(
              DatePickerWidget.getConfig().name,
            ),
          },
        ];
      },
    };
  }

  componentDidUpdate(prevProps: DatePickerWidgetProps) {
    if (this.props.dateFormat !== prevProps.dateFormat) {
      if (this.props.defaultDate) {
        const defaultDate = moment(
          this.props.defaultDate,
          this.props.dateFormat,
        );

        if (!defaultDate.isValid()) {
          super.updateWidgetProperty("defaultDate", "");
        } else {
          if (this.props.minDate) {
            const minDate = moment(this.props.minDate, this.props.dateFormat);

            if (!minDate.isValid() || defaultDate.isBefore(minDate)) {
              super.updateWidgetProperty("defaultDate", "");
            }
          }

          if (this.props.maxDate) {
            const maxDate = moment(this.props.maxDate, this.props.dateFormat);

            if (!maxDate.isValid() || defaultDate.isAfter(maxDate)) {
              super.updateWidgetProperty("defaultDate", "");
            }
          }
        }
      }
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
          path: "defaultDate",
          type: "string",
          accessor: "selectedDate",
        },
      },
    };
  }

  getWidgetView() {
    return (
      <DatePickerComponent
        dateFormat={this.props.dateFormat}
        datePickerType={"DATE_PICKER"}
        isDisabled={this.props.isDisabled}
        isLoading={this.props.isLoading}
        label={`${this.props.label}`}
        maxDate={this.props.maxDate}
        minDate={this.props.minDate}
        onDateSelected={this.onDateSelected}
        selectedDate={this.props.selectedDate}
        widgetId={this.props.widgetId}
      />
    );
  }

  onDateSelected = (selectedDate: string) => {
    this.props.updateWidgetMetaProperty("selectedDate", selectedDate, {
      triggerPropertyName: "onDateSelected",
      dynamicString: this.props.onDateSelected,
      event: {
        type: EventType.ON_DATE_SELECTED,
      },
    });
  };
}

export interface DatePickerWidgetProps extends WidgetProps {
  defaultDate: string;
  selectedDate: string;
  isDisabled: boolean;
  dateFormat: string;
  label: string;
  datePickerType: DatePickerType;
  onDateSelected?: string;
  onDateRangeSelected?: string;
  maxDate: string;
  minDate: string;
  isRequired?: boolean;
}

export default DatePickerWidget;
