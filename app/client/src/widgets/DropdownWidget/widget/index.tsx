import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import type {
  AutocompletionDefinitions,
  PropertyUpdates,
  SnipingModeProperty,
  WidgetCallout,
} from "WidgetProvider/constants";
import { MinimumPopupWidthInPercentage } from "WidgetProvider/constants";
import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { WIDGET_TAGS, layoutConfigurations } from "constants/WidgetConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import type { Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import _ from "lodash";
import { buildDeprecationWidgetMessage } from "pages/Editor/utils";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import {
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import DropDownComponent from "../component";
import type { DropdownOption } from "../constants";
import IconSVG from "../icon.svg";

function defaultOptionValueValidation(value: unknown): ValidationResponse {
  if (typeof value === "string") return { isValid: true, parsed: value.trim() };

  if (value === undefined || value === null)
    return {
      isValid: false,
      parsed: "",
      messages: [
        {
          name: "TypeError",
          message: $t('index.7f313c22ed6acb3b'),
        },
      ],
    };

  return { isValid: true, parsed: value };
}

class DropdownWidget extends BaseWidget<DropdownWidgetProps, WidgetState> {
  static type = "DROP_DOWN_WIDGET";

  static getConfig() {
    return {
      name: $t('index.ada4d1c6039fd0dd'),
      iconSVG: IconSVG,
      needsMeta: true,
      hideCard: true,
      isDeprecated: true,
      replacement: "SELECT_WIDGET",
      tags: [WIDGET_TAGS.SELECT],
    };
  }

  static getDefaults() {
    return {
      rows: 7,
      columns: 20,
      placeholderText: $t('index.8fbd4d00beb3c237'),
      labelText: $t('index.90e64188033848d5'),
      labelPosition: LabelPosition.Left,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      selectionType: "SINGLE_SELECT",
      options: [
        { label: $t('index.2157c831d54dfc9d'), value: "BLUE" },
        { label: $t('index.f41b9797b441f2d0'), value: "GREEN" },
        { label: $t('index.ad824e9d30939510'), value: "RED" },
      ],
      serverSideFiltering: false,
      widgetName: $t('index.ada4d1c6039fd0dd'),
      defaultOptionValue: "GREEN",
      version: 1,
      isFilterable: false,
      isRequired: false,
      isDisabled: false,
      animateLoading: true,
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
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message: buildDeprecationWidgetMessage(
              DropdownWidget.getConfig().name,
            ),
          },
        ];
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.be4b6940036f7b42'),
      "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      filterText: {
        "!type": "string",
        "!doc": $t('index.faa19bc47d265992'),
      },
      selectedOptionValue: {
        "!type": "string",
        "!doc": $t('index.4e5b6a495ef85a96'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      selectedOptionLabel: {
        "!type": "string",
        "!doc": $t('index.7f2bdde5aba1cc2a'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      isDisabled: "bool",
      options: "[$__dropdownOption__$]",
    };
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.67209b7c5c094e4b'),
        children: [
          {
            helpText:
              $t('index.b471fb962d22a9cb'),
            propertyName: "options",
            label: $t('index.28d59b25140c38ee'),
            controlType: "INPUT_TEXT",
            placeholderText: '[{ "label": "Option1", "value": "Option2" }]',
            isBindProperty: true,
            isTriggerProperty: false,
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
            helpText: $t('index.a83459a1c62147b6'),
            propertyName: "defaultOptionValue",
            label: $t('index.8841d095fc18f212'),
            controlType: "INPUT_TEXT",
            placeholderText: "GREEN",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultOptionValueValidation,
                expected: {
                  type: "value or Array of values",
                  example: `option1 | ['option1', 'option2']`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            dependencies: ["selectionType"],
          },
          {
            helpText: $t('index.f5f41c71d9911a0b'),
            propertyName: "placeholderText",
            label: $t('index.af12f209b8ac0854'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.e4498e4751507434'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isRequired",
            label: $t('index.09ed9082d4e4ff7f'),
            helpText: $t('index.520df99072a84e22'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.31abc8e44cb38413'),
            propertyName: "isVisible",
            label: $t('index.80c3f150bca88ef2'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.169bf3c7e0cbcd5a'),
            helpText: $t('index.57ea92516a5db13d'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.065d71b23f64b13f'),
            controlType: "SWITCH",
            helpText: $t('index.54c172187d722ba9'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isFilterable",
            label: $t('index.c78f4d5868ceba45'),
            helpText: $t('index.edca462bcbc346fd'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.14c4e8512577ca9f'),
            propertyName: "serverSideFiltering",
            label: $t('index.6fb7fa9884691161'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.90e64188033848d5'),
        children: [
          {
            helpText: $t('index.95ffa326a5f6517d'),
            propertyName: "labelText",
            label: $t('index.586152aa2a16c3dd'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.0279b6c98687e129'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.bcaa17edbd211200'),
            propertyName: "labelPosition",
            label: $t('index.076f01bf125782cf'),
            controlType: "DROP_DOWN",
            options: [
              { label: $t('index.17a822c5e0fcac96'), value: LabelPosition.Left },
              { label: $t('index.12ee1ead92c8a506'), value: LabelPosition.Top },
              { label: $t('index.1b2f0f23b38442da'), value: LabelPosition.Auto },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.dfae106037ac73e7'),
            propertyName: "labelAlignment",
            label: $t('index.cd10e82f1278f22f'),
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
            hidden: (props: DropdownWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.0c1f9152496754e2'),
            propertyName: "labelWidth",
            label: $t('index.c2b606c5370de9a6'),
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
            hidden: (props: DropdownWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.a7ba2b1375f6b1f2'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.549057ea7138a345'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.e1fdc18ecbf48b49'),
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
            label: $t('index.2c38014b9dabc132'),
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
        sectionName: $t('index.994ef490875f4022'),
        children: [
          {
            helpText: $t('index.ff352b4be1a5a55f'),
            propertyName: "onOptionChange",
            label: "onOptionChange",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.d04b234a72b6f988'),
            hidden: (props: DropdownWidgetProps) => !props.serverSideFiltering,
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
    ];
  }

  static getDerivedPropertiesMap() {
    return {
      isValid: `{{this.isRequired  ? !!this.selectedOptionValue || this.selectedOptionValue === 0 : true}}`,
      selectedOptionLabel: `{{(()=>{const index = _.findIndex(this.options, { value: this.value }); return this.options[index]?.label; })()}}`,
      selectedOptionValue: `{{(()=>{const index = _.findIndex(this.options, { value: this.value }); return this.options[index]?.value; })()}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      defaultValue: "defaultOptionValue",
      value: "defaultOptionValue",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      defaultValue: undefined,
      value: undefined,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  componentDidMount() {
    this.changeSelectedOption();
  }
  componentDidUpdate(prevProps: DropdownWidgetProps): void {
    // removing selectedOptionValue if defaultValueChanges
    if (
      prevProps.defaultOptionValue !== this.props.defaultOptionValue ||
      prevProps.option !== this.props.option
    ) {
      this.changeSelectedOption();
    }
  }

  getWidgetView() {
    const options = _.isArray(this.props.options) ? this.props.options : [];
    const isInvalid =
      "isValid" in this.props && !this.props.isValid && !!this.props.isDirty;
    const dropDownWidth =
      (MinimumPopupWidthInPercentage / 100) *
      (this.props.mainCanvasWidth ?? layoutConfigurations.MOBILE.maxWidth);

    const selectedIndex = _.findIndex(this.props.options, {
      value: this.props.selectedOptionValue,
    });

    const { componentHeight, componentWidth } = this.props;

    return (
      <DropDownComponent
        accentColor={this.props.accentColor}
        backgroundColor={this.props.backgroundColor}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        compactMode={isCompactMode(componentHeight)}
        disabled={this.props.isDisabled}
        dropDownWidth={dropDownWidth}
        hasError={isInvalid}
        height={componentHeight}
        isFilterable={this.props.isFilterable}
        isLoading={this.props.isLoading}
        isValid={this.props.isValid}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelText={this.props.labelText}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelWidth={this.props.labelComponentWidth}
        onFilterChange={this.onFilterChange}
        onOptionSelected={this.onOptionSelected}
        options={options}
        placeholder={this.props.placeholderText}
        selectedIndex={selectedIndex > -1 ? selectedIndex : undefined}
        serverSideFiltering={this.props.serverSideFiltering}
        widgetId={this.props.widgetId}
        width={componentWidth}
      />
    );
  }

  onOptionSelected = (selectedOption: DropdownOption) => {
    let isChanged = true;

    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    // Check if the value has changed. If no option
    // selected till now, there is a change
    if (this.props.selectedOptionValue) {
      isChanged = !(this.props.selectedOptionValue === selectedOption.value);
    }

    if (isChanged) {
      this.props.updateWidgetMetaProperty("value", selectedOption.value, {
        triggerPropertyName: "onOptionChange",
        dynamicString: this.props.onOptionChange as string,
        event: {
          type: EventType.ON_OPTION_CHANGE,
        },
      });
    }
  };
  changeSelectedOption = () => {
    const index = _.findIndex(this.props.options, {
      value: this.props.selectedOptionValue ?? this.props.defaultOptionValue,
    });
    const value = this.props.options?.[index]?.value;

    this.props.updateWidgetMetaProperty("value", value);
  };

  onFilterChange = (value: string) => {
    this.props.updateWidgetMetaProperty("filterText", value);

    super.executeAction({
      triggerPropertyName: "onFilterUpdate",
      dynamicString: this.props.onFilterUpdate,
      event: {
        type: EventType.ON_FILTER_UPDATE,
      },
    });
  };
}

export interface DropdownWidgetProps extends WidgetProps {
  placeholderText?: string;
  labelText: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  selectedIndex?: number;
  selectedOption: DropdownOption;
  options?: DropdownOption[];
  onOptionChange?: string;
  defaultOptionValue?: string;
  value?: string;
  isRequired: boolean;
  isFilterable: boolean;
  defaultValue: string;
  selectedOptionLabel: string;
  serverSideFiltering: boolean;
  onFilterUpdate: string;
  backgroundColor: string;
  borderRadius: string;
  boxShadow?: string;
  accentColor: string;
  fontFamily?: string;
  isDirty?: boolean;
  labelComponentWidth?: number;
}

export default DropdownWidget;
