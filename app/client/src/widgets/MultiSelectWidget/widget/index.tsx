import {$t} from "locale/index";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import { isArray } from "lodash";
import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import { Alignment } from "@blueprintjs/core";
import type {
  AutocompletionDefinitions,
  WidgetCallout,
} from "WidgetProvider/constants";
import { MinimumPopupWidthInPercentage } from "WidgetProvider/constants";
import { LabelPosition } from "components/constants";
import { Layers } from "constants/Layers";
import { WIDGET_TAGS, layoutConfigurations } from "constants/WidgetConstants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { buildDeprecationWidgetMessage } from "pages/Editor/utils";
import type { DraftValueType } from "rc-select/lib/Select";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import {
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import MultiSelectComponent from "../component";
import IconSVG from "../icon.svg";

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

class MultiSelectWidget extends BaseWidget<
  MultiSelectWidgetProps,
  WidgetState
> {
  static type = "MULTI_SELECT_WIDGET";

  static getConfig() {
    return {
      name: "MultiSelect",
      iconSVG: IconSVG,
      needsMeta: true,
      hideCard: true,
      isDeprecated: true,
      replacement: "MULTI_SELECT_WIDGET_V2",
      tags: [WIDGET_TAGS.SELECT],
    };
  }

  static getDefaults() {
    return {
      rows: 7,
      columns: 20,
      animateLoading: true,
      labelText: $t('index.7b5b3725894c56e1'),
      labelPosition: LabelPosition.Left,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      options: [
        { label: $t('index.093eafc11f0d7b40'), value: "BLUE" },
        { label: $t('index.e099f30376e081a8'), value: "GREEN" },
        { label: $t('index.dcf5f4a8c3c21a93'), value: "RED" },
      ],
      widgetName: "MultiSelect",
      serverSideFiltering: false,
      defaultOptionValue: ["GREEN"],
      version: 1,
      isRequired: false,
      isDisabled: false,
      placeholderText: $t('index.820046beff49f3aa'),
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
    };
  }

  static getMethods() {
    return {
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message: buildDeprecationWidgetMessage(
              MultiSelectWidget.getConfig().name,
            ),
          },
        ];
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.01e2d5d29f4c837c'),
      "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      filterText: {
        "!type": "string",
        "!doc": $t('index.d6ef0c88099b878f'),
      },
      selectedOptionValues: {
        "!type": "[string]",
        "!doc": $t('index.dc53ab60b6502a57'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      selectedOptionLabels: {
        "!type": "[string]",
        "!doc":
          $t('index.51c760d233c17005'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      isDisabled: "bool",
      options: "[$__dropdownOption__$]",
    };
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.1c57d7bf83b59674'),
        children: [
          {
            helpText:
              $t('index.549dff1d986d6828'),
            propertyName: "options",
            label: $t('index.63699c0c69278685'),
            controlType: "INPUT_TEXT",
            placeholderText: '[{ "label": "Option1", "value": "Option2" }]',
            isBindProperty: true,
            isTriggerProperty: false,
            isJSConvertible: false,
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
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
          {
            helpText: $t('index.048a555db15f63e2'),
            propertyName: "defaultOptionValue",
            label: $t('index.86e6785ec4a5f5f1'),
            controlType: "INPUT_TEXT",
            placeholderText: "[GREEN]",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultOptionValueValidation,
                expected: {
                  type: "Array of values",
                  example: `['option1', 'option2']`,
                  autocompleteDataType: AutocompleteDataType.ARRAY,
                },
              },
            },
          },
          {
            helpText: $t('index.5c3b877483c3db73'),
            propertyName: "placeholderText",
            label: $t('index.2f18320101cb8cc9'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.ebc73848ca2521fe'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isRequired",
            label: $t('index.f029aea95e3c8b8f'),
            helpText: $t('index.a9d76a23e311a734'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.ff2611612e241f51'),
            propertyName: "isVisible",
            label: $t('index.f3fbe4f9194adb27'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.e26c12aff693bfef'),
            helpText: $t('index.b33c23d2841e8a54'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.8c9bc8d0bd913d23'),
            controlType: "SWITCH",
            helpText: $t('index.ab4b51d3da4ff491'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.68522c496c803657'),
            propertyName: "serverSideFiltering",
            label: $t('index.b8cd7dceb3f4a133'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText:
              $t('index.54ab5494ebf0929e'),
            propertyName: "allowSelectAll",
            label: $t('index.69e265b32da49443'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.7b5b3725894c56e1'),
        children: [
          {
            helpText: $t('index.c8e330ddae3bf04a'),
            propertyName: "labelText",
            label: $t('index.0fc5bf6c06c95b12'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.2790432813bf4a9c'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.7807cfe4a9e11d12'),
            propertyName: "labelPosition",
            label: $t('index.c9eb850cf18895f2'),
            controlType: "DROP_DOWN",
            options: [
              { label: $t('index.84567d189b44f5b2'), value: LabelPosition.Left },
              { label: $t('index.c12f08306ddea336'), value: LabelPosition.Top },
              { label: $t('index.e36fde080ee4c87a'), value: LabelPosition.Auto },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.00fcb9714bb2823b'),
            propertyName: "labelAlignment",
            label: $t('index.4d26431111694cee'),
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
            hidden: (props: MultiSelectWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.a464b756704e3552'),
            propertyName: "labelWidth",
            label: $t('index.313b1cccb83ea34d'),
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
            hidden: (props: MultiSelectWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.ff46ec6f3ce72c02'),
        children: [
          {
            propertyName: "accentColor",
            label: $t('index.8a0f4be802b5d039'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            invisible: true,
          },
          {
            propertyName: "labelTextColor",
            label: $t('index.d9d58bb0c04c5530'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.b62592f8d909d584'),
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
            label: $t('index.f6182f7da9f8cfb7'),
            controlType: "BUTTON_GROUP",
            options: [
              {
                startIcon: "text-bold",
                value: "BOLD",
              },
              {
                startIcon: "text-italic",
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
        sectionName: $t('index.0647cb9b3e04c0d1'),
        children: [
          {
            helpText: $t('index.f90653e997407dc5'),
            propertyName: "onOptionChange",
            label: "onOptionChange",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.3c5c15f57d8b92f5'),
            hidden: (props: MultiSelectWidgetProps) =>
              !props.serverSideFiltering,
            dependencies: ["serverSideFiltering"],
            propertyName: "onFilterUpdate",
            label: "onFilterUpdate",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },

      {
        sectionName: $t('index.ff46ec6f3ce72c02'),
        children: [
          {
            propertyName: "backgroundColor",
            helpText: $t('index.fa77c22df218faf4'),
            label: $t('index.a935ff8f81bf54f2'),
            controlType: "COLOR_PICKER",
            isBindProperty: false,
            isTriggerProperty: false,
          },
        ],
      },
    ];
  }

  static getDerivedPropertiesMap() {
    return {
      selectedIndexArr: `{{ this.selectedOptionValues.map(o => _.findIndex(this.options, { value: o })) }}`,
      selectedOptionLabels: `{{ this.selectedOptionValueArr.map((o) => { const index = _.findIndex(this.options, { value: o }); return this.options[index]?.label ?? this.options[index]?.value; })  }}`,
      selectedOptionValues: `{{ this.selectedOptionValueArr.filter((o) => { const index = _.findIndex(this.options, { value: o });  return index > -1; })  }}`,
      isValid: `{{this.isRequired ? !!this.selectedIndexArr && this.selectedIndexArr.length > 0 : true}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedOptionValueArr: "defaultOptionValue",
      filterText: "",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedOptionValueArr: undefined,
      filterText: "",
    };
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
        setSelectedOptions: {
          path: "defaultOptionValue",
          type: "array",
          accessor: "selectedOptionValues",
        },
      },
    };
  }

  getWidgetView() {
    const options = isArray(this.props.options) ? this.props.options : [];
    const values: string[] = isArray(this.props.selectedOptionValues)
      ? this.props.selectedOptionValues
      : [];
    const dropDownWidth =
      (MinimumPopupWidthInPercentage / 100) *
      (this.props.mainCanvasWidth ?? layoutConfigurations.MOBILE.maxWidth);
    const { componentHeight, componentWidth } = this.props;

    return (
      <MultiSelectComponent
        accentColor={this.props.accentColor}
        allowSelectAll={this.props.allowSelectAll}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        compactMode={isCompactMode(componentHeight)}
        disabled={this.props.isDisabled ?? false}
        dropDownWidth={dropDownWidth}
        dropdownStyle={{
          zIndex: Layers.dropdownModalWidget,
        }}
        isValid={this.props.isValid}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelText={this.props.labelText}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelWidth={this.props.labelComponentWidth}
        loading={this.props.isLoading}
        onChange={this.onOptionChange}
        onFilterChange={this.onFilterChange}
        options={options}
        placeholder={this.props.placeholderText as string}
        serverSideFiltering={this.props.serverSideFiltering}
        value={values}
        widgetId={this.props.widgetId}
        width={componentWidth}
      />
    );
  }

  onOptionChange = (value: DraftValueType) => {
    this.props.updateWidgetMetaProperty("selectedOptionValueArr", value, {
      triggerPropertyName: "onOptionChange",
      dynamicString: this.props.onOptionChange,
      event: {
        type: EventType.ON_OPTION_CHANGE,
      },
    });

    // Empty filter after Selection
    this.onFilterChange("");
  };

  onFilterChange = (value: string) => {
    this.props.updateWidgetMetaProperty("filterText", value);

    if (this.props.onFilterUpdate) {
      super.executeAction({
        triggerPropertyName: "onFilterUpdate",
        dynamicString: this.props.onFilterUpdate,
        event: {
          type: EventType.ON_FILTER_UPDATE,
        },
      });
    }
  };
}

export interface DropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectWidgetProps extends WidgetProps {
  placeholderText?: string;
  selectedIndex?: number;
  selectedIndexArr?: number[];
  selectedOption: DropdownOption;
  options?: DropdownOption[];
  onOptionChange: string;
  onFilterChange: string;
  defaultOptionValue: string | string[];
  isRequired: boolean;
  isLoading: boolean;
  selectedOptionValueArr: string[];
  filterText: string;
  selectedOptionValues: string[];
  selectedOptionLabels: string[];
  serverSideFiltering: boolean;
  onFilterUpdate: string;
  backgroundColor: string;
  borderRadius: string;
  boxShadow?: string;
  accentColor: string;
  allowSelectAll?: boolean;
  labelText: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelComponentWidth?: number;
}

export default MultiSelectWidget;
