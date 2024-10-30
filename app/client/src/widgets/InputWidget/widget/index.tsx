import {$t} from "locale/index";
import {
  FIELD_REQUIRED_ERROR,
  INPUT_DEFAULT_TEXT_MAX_CHAR_ERROR,
  createMessage,
} from "ee/constants/messages";
import { Alignment } from "@blueprintjs/core";
import type { IconName } from "@blueprintjs/icons";
import type {
  AutocompletionDefinitions,
  PropertyUpdates,
  SnipingModeProperty,
  WidgetCallout,
} from "WidgetProvider/constants";
import { COMPACT_MODE_MIN_ROWS } from "WidgetProvider/constants";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { LabelPosition } from "components/constants";
import type { ExecutionResult } from "constants/AppsmithActionConstants/ActionConstants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { TextSize } from "constants/WidgetConstants";
import {
  GridDefaults,
  RenderModes,
  WIDGET_TAGS,
} from "constants/WidgetConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { buildDeprecationWidgetMessage } from "pages/Editor/utils";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { checkInputTypeTextByProps } from "widgets/BaseInputWidget/utils";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import {
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { InputComponentProps } from "../component";
import InputComponent from "../component";
import { CurrencyDropdownOptions } from "../component/CurrencyCodeDropdown";
import { ISDCodeDropdownOptions } from "../component/ISDCodeDropdown";
import {
  formatCurrencyNumber,
  getDecimalSeparator,
  getLocale,
} from "../component/utilities";
import type { InputType } from "../constants";
import { InputTypes } from "../constants";
import IconSVG from "../icon.svg";

export function defaultValueValidation(
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  props: InputWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _?: any,
): ValidationResponse {
  const { inputType } = props;

  if (
    inputType === "INTEGER" ||
    inputType === "NUMBER" ||
    inputType === "CURRENCY" ||
    inputType === "PHONE_NUMBER"
  ) {
    let parsed: number | undefined = Number(value);

    if (typeof value === "string") {
      if (value.trim() === "") {
        return {
          isValid: true,
          parsed: undefined,
          messages: [{ name: "", message: "" }],
        };
      }

      if (!Number.isFinite(parsed)) {
        return {
          isValid: false,
          parsed: undefined,
          messages: [
            {
              name: "TypeError",
              message: $t('index.a4dc5d638d941480'),
            },
          ],
        };
      }
    }

    if (isNaN(parsed)) {
      parsed = undefined;
    }

    return {
      isValid: true,
      parsed,
      messages: [{ name: "", message: "" }],
    };
  }

  if (_.isObject(value)) {
    return {
      isValid: false,
      parsed: JSON.stringify(value, null, 2),
      messages: [
        {
          name: "TypeError",
          message: $t('index.f63303bee1fa7059'),
        },
      ],
    };
  }

  let parsed = value;
  const isValid = _.isString(parsed);

  if (!isValid) {
    try {
      parsed = _.toString(parsed);
    } catch (e) {
      return {
        isValid: false,
        parsed: "",
        messages: [
          {
            name: "TypeError",
            message: $t('index.f63303bee1fa7059'),
          },
        ],
      };
    }
  }

  return {
    isValid,
    parsed: parsed,
    messages: [{ name: "", message: "" }],
  };
}

class InputWidget extends BaseWidget<InputWidgetProps, WidgetState> {
  constructor(props: InputWidgetProps) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  static type = "INPUT_WIDGET";

  static getConfig() {
    return {
      name: $t('index.0a03659303782b3a'),
      iconSVG: IconSVG,
      needsMeta: true,
      hideCard: true,
      isDeprecated: true,
      replacement: "INPUT_WIDGET_V2",
      tags: [WIDGET_TAGS.SUGGESTED_WIDGETS, WIDGET_TAGS.INPUTS],
    };
  }

  static getDefaults() {
    return {
      inputType: "TEXT",
      rows: 4,
      label: "",
      labelPosition: LabelPosition.Left,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      columns: 20,
      widgetName: $t('index.0a03659303782b3a'),
      version: 1,
      defaultText: "",
      iconAlign: "left",
      autoFocus: false,
      labelStyle: "",
      resetOnSubmit: true,
      isRequired: false,
      isDisabled: false,
      allowCurrencyChange: false,
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
            propertyPath: "defaultText",
            propertyValue: propValueMap.data,
            isDynamicPropertyPath: true,
          },
        ];
      },
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message: buildDeprecationWidgetMessage(
              InputWidget.getConfig().name,
            ),
          },
        ];
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    const definitions = {
      "!doc":
        $t('index.28a5aa78dc26b11d'),
      "!url": "https://docs.appsmith.com/widget-reference/input",
      text: {
        "!type": "string",
        "!doc": $t('index.7b3d653095402f41'),
        "!url": "https://docs.appsmith.com/widget-reference/input",
      },
      isValid: "bool",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      isDisabled: "bool",
      countryCode: {
        "!type": "string",
        "!doc": $t('index.e4c5d4305be85f25'),
      },
      currencyCountryCode: {
        "!type": "string",
        "!doc": $t('index.d38017ea695d2edd'),
      },
    };

    return definitions;
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.47ea111d8127c025'),
        children: [
          {
            helpText: $t('index.32edfbbf94e22ebf'),
            propertyName: "inputType",
            label: $t('index.ee0611fe4695dfab'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: $t('index.6f5359ed76cbbfd7'),
                value: "TEXT",
              },
              {
                label: $t('index.20c06e31e80bf8ae'),
                value: "NUMBER",
              },
              {
                label: $t('index.217f20d7a5e50350'),
                value: "PASSWORD",
              },
              {
                label: $t('index.c9a30dfaefe5195f'),
                value: "EMAIL",
              },
              {
                label: $t('index.fbc47e83b5852850'),
                value: "CURRENCY",
              },
              {
                label: $t('index.adbf289f3bd0d956'),
                value: "PHONE_NUMBER",
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "allowCurrencyChange",
            label: $t('index.42092e6bbd35289c'),
            helpText: $t('index.ac94bad659714dc8'),
            controlType: "SWITCH",
            isJSConvertible: false,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: (props: InputWidgetProps) => {
              return props.inputType !== InputTypes.CURRENCY;
            },
            dependencies: ["inputType"],
          },
          {
            helpText: $t('index.29b670dcfd49ce2e'),
            propertyName: "phoneNumberCountryCode",
            label: $t('index.95b3521d804643b0'),
            enableSearch: true,
            dropdownHeight: "195px",
            controlType: "DROP_DOWN",
            searchPlaceholderText: $t('index.78089102be55e284'),
            options: ISDCodeDropdownOptions,
            hidden: (props: InputWidgetProps) => {
              return props.inputType !== InputTypes.PHONE_NUMBER;
            },
            dependencies: ["inputType"],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            helpText: $t('index.d1c9b6062acd019a'),
            propertyName: "currencyCountryCode",
            label: $t('index.fbc47e83b5852850'),
            enableSearch: true,
            dropdownHeight: "195px",
            controlType: "DROP_DOWN",
            searchPlaceholderText: $t('index.c38670aa267a6069'),
            options: CurrencyDropdownOptions,
            hidden: (props: InputWidgetProps) => {
              return props.inputType !== InputTypes.CURRENCY;
            },
            dependencies: ["inputType"],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            helpText: $t('index.2be9c01e05be9f07'),
            propertyName: "decimalsInCurrency",
            label: $t('index.f1f01a859d57ff00'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: "1",
                value: 1,
              },
              {
                label: "2",
                value: 2,
              },
            ],
            hidden: (props: InputWidgetProps) => {
              return props.inputType !== InputTypes.CURRENCY;
            },
            dependencies: ["inputType"],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            helpText: $t('index.3c5e34c0661c26c9'),
            propertyName: "maxChars",
            label: $t('index.0940fd85e9391016'),
            controlType: "INPUT_TEXT",
            placeholderText: "255",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
            hidden: (props: InputWidgetProps) => {
              return !checkInputTypeTextByProps(props);
            },
            dependencies: ["inputType"],
          },
          {
            helpText:
              $t('index.7e00cfb63fe78ef4'),
            propertyName: "defaultText",
            label: $t('index.01bbdcf58bb2dd93'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.f956b994d0d05702'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultValueValidation,
                expected: {
                  type: "string or number",
                  example: `John | 123`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            dependencies: ["inputType"],
          },
          {
            helpText:
              $t('index.80f541970d4e9e8f'),
            propertyName: "regex",
            label: $t('index.30035838ea41c678'),
            controlType: "INPUT_TEXT",
            placeholderText: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$",
            inputType: "TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.REGEX },
          },
          {
            helpText: $t('index.c32918f67e943a4c'),
            propertyName: "validation",
            label: $t('index.742eeedd50e96ba8'),
            controlType: "INPUT_TEXT",
            placeholderText: "{{ Input1.text.length > 0 }}",
            inputType: "TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText:
              $t('index.e535e9d534068eb3'),
            propertyName: "errorMessage",
            label: $t('index.2656cb7e01791f10'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.1b8b111eaf5ed869'),
            inputType: "TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.bf0f1af360ae1bb6'),
            propertyName: "placeholderText",
            label: $t('index.2b2aea56a670bea7'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.2b2aea56a670bea7'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.286414e186c1695b'),
            propertyName: "tooltip",
            label: $t('index.941cd2abb4876f12'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.dfde75e621c8c922'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isRequired",
            label: $t('index.ffa14730a966b7d4'),
            helpText: $t('index.baa8e1e593308e00'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.a2ff28d672ea4d37'),
            propertyName: "isVisible",
            label: $t('index.edbfc0dd76485945'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.ad94ca8f022fcc79'),
            propertyName: "isDisabled",
            label: $t('index.1d8afbca01a9e815'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.0af7558e239ffa38'),
            controlType: "SWITCH",
            helpText: $t('index.eff638a6cd5f20e1'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.f0a978e80eb08776'),
            propertyName: "resetOnSubmit",
            label: $t('index.ee8290d9f5b5b8a8'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.4783967a7dec04fd'),
            propertyName: "autoFocus",
            label: $t('index.7939c48df5cc32b4'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isSpellCheck",
            label: $t('index.593aaa24ee0e3302'),
            helpText:
              $t('index.7abea20cc72018b2'),
            controlType: "SWITCH",
            isJSConvertible: false,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: (props: InputWidgetProps) => {
              return !checkInputTypeTextByProps(props);
            },
            dependencies: ["inputType"],
          },
        ],
      },
      {
        sectionName: $t('index.df8126d3e4ee7dc2'),
        children: [
          {
            helpText: $t('index.bdc8053173bfb941'),
            propertyName: "label",
            label: $t('index.6f5359ed76cbbfd7'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.cdf8b60f622c0ecd'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.32db17fd11ab20f5'),
            propertyName: "labelPosition",
            label: $t('index.8840093754c850fa'),
            controlType: "DROP_DOWN",
            options: [
              { label: $t('index.66c9389c59265d5e'), value: LabelPosition.Left },
              { label: $t('index.478e784032a20090'), value: LabelPosition.Top },
              { label: $t('index.f14f96c03b696873'), value: LabelPosition.Auto },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.211af5613fe509bc'),
            propertyName: "labelAlignment",
            label: $t('index.216acda61f803aec'),
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
            hidden: (props: InputWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.e3d12681b9fa7dd8'),
            propertyName: "labelWidth",
            label: $t('index.cbe9a79d9419e764'),
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
            hidden: (props: InputWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.d48b4017cac27349'),
        children: [
          {
            helpText: $t('index.355b3a7ab39151bd'),
            propertyName: "onTextChanged",
            label: "onTextChanged",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: "on submit (when the enter key is pressed)",
            propertyName: "onSubmit",
            label: "onSubmit",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
      {
        sectionName: $t('index.86c4686398a75c2f'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.bd77833b8a41cb46'),
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
            label: $t('index.8845811297a2af69'),
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
            label: $t('index.c90a4775ab018e30'),
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
        sectionName: $t('index.d2828a20bc4bbe39'),
        hidden: (props: InputWidgetProps) => {
          const { inputType } = props;

          return inputType === "CURRENCY" || inputType === "PHONE_NUMBER";
        },
        dependencies: ["inputType"],
        children: [
          {
            propertyName: "iconName",
            label: $t('index.8fed4885bee18073'),
            helpText: $t('index.dc76350c93085c4b'),
            controlType: "ICON_SELECT",
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "iconAlign",
            label: $t('index.53a7223257b5725f'),
            helpText: $t('index.2104ddbb8267fb78'),
            controlType: "ICON_TABS",
            defaultValue: "left",
            options: [
              {
                startIcon: "align-left",
                value: "left",
              },
              {
                startIcon: "align-right",
                value: "right",
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            hidden: (props: InputWidgetProps) => !props.iconName,
            dependencies: ["iconName"],
          },
        ],
      },
      {
        sectionName: $t('index.48af94a9bbcba60c'),
        children: [
          {
            propertyName: "backgroundColor",
            helpText: $t('index.fef669b1cbccba99'),
            label: $t('index.6090c62801ecda8b'),
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

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      isValid: `{{
        (function(){
          if (!this.isRequired && !this.text) {
            return true
          }
          if(this.isRequired && !this.text){
            return false
          }
          if (typeof this.validation === "boolean" && !this.validation) {
            return false;
          }
          let parsedRegex = null;
          if (this.regex) {
            /*
            * break up the regexp pattern into 4 parts: given regex, regex prefix , regex pattern, regex flags
            * Example /test/i will be split into ["/test/gi", "/", "test", "gi"]
            */
            const regexParts = this.regex.match(/(\\/?)(.+)\\1([a-z]*)/i);

            if (!regexParts) {
              parsedRegex = new RegExp(this.regex);
            } else {
              /*
              * if we don't have a regex flags (gmisuy), convert provided string into regexp directly
              /*
              if (regexParts[3] && !/^(?!.*?(.).*?\\1)[gmisuy]+$/.test(regexParts[3])) {
                parsedRegex = RegExp(this.regex);
              }
              /*
              * if we have a regex flags, use it to form regexp
              */
              parsedRegex = new RegExp(regexParts[2], regexParts[3]);
            }
          }
          if (this.inputType === "EMAIL") {
            const emailRegex = new RegExp(/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/);
            return emailRegex.test(this.text);
          }
          else if (
            this.inputType === "NUMBER" ||
            this.inputType === "INTEGER" ||
            this.inputType === "CURRENCY" ||
            this.inputType === "PHONE_NUMBER"
          ) {
            let value = this.text.split(",").join("");
            if (parsedRegex) {
              return parsedRegex.test(value);
            }
            if (this.isRequired) {
              return !(value === '' || isNaN(value));
            }

            return (value === '' || !isNaN(value || ''));
          }
          else if (this.isRequired) {
            if(this.text && this.text.length) {
              if (parsedRegex) {
                return parsedRegex.test(this.text)
              } else {
                return true;
              }
            } else {
              return false;
            }
          }
          if (parsedRegex) {
            return parsedRegex.test(this.text)
          } else {
            return true;
          }
        })()
      }}`,
      value: `{{this.text}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      text: "defaultText",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      text: undefined,
      isFocused: false,
      isDirty: false,
      selectedCurrencyType: undefined,
      selectedCountryCode: undefined,
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
        setValue: {
          path: "defaultText",
          type: "string",
          accessor: "text",
        },
      },
    };
  }

  onValueChange = (value: string) => {
    this.props.updateWidgetMetaProperty("text", value, {
      triggerPropertyName: "onTextChanged",
      dynamicString: this.props.onTextChanged,
      event: {
        type: EventType.ON_TEXT_CHANGE,
      },
    });

    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }
  };

  onCurrencyTypeChange = (code?: string) => {
    const currencyCountryCode = code;

    if (this.props.renderMode === RenderModes.CANVAS) {
      super.updateWidgetProperty("currencyCountryCode", currencyCountryCode);
    } else {
      this.props.updateWidgetMetaProperty(
        "selectedCurrencyCountryCode",
        currencyCountryCode,
      );
    }
  };

  onISDCodeChange = (code?: string) => {
    const countryCode = code;

    if (this.props.renderMode === RenderModes.CANVAS) {
      super.updateWidgetProperty("phoneNumberCountryCode", countryCode);
    } else {
      this.props.updateWidgetMetaProperty(
        "selectedPhoneNumberCountryCode",
        countryCode,
      );
    }
  };

  handleFocusChange = (focusState: boolean) => {
    /**
     * Reason for disabling drag on focusState: true:
     * 1. In Firefox, draggable="true" property on the parent element
     *    or <input /> itself, interferes with some <input /> element's events
     *    Bug Ref - https://bugzilla.mozilla.org/show_bug.cgi?id=800050
     *              https://bugzilla.mozilla.org/show_bug.cgi?id=1189486
     *
     *  Eg - input with draggable="true", double clicking the text; won't highlight the text
     *
     * 2. Dragging across the text (for text selection) in input won't cause the widget to drag.
     */
    this.props.updateWidgetMetaProperty("dragDisabled", focusState);
    this.props.updateWidgetMetaProperty("isFocused", focusState);
  };

  onSubmitSuccess = (result: ExecutionResult) => {
    if (result.success && this.props.resetOnSubmit) {
      this.props.updateWidgetMetaProperty("text", "", {
        triggerPropertyName: "onSubmit",
        dynamicString: this.props.onTextChanged,
        event: {
          type: EventType.ON_TEXT_CHANGE,
        },
      });
    }
  };

  handleKeyDown = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const { isValid, onSubmit } = this.props;
    const isEnterKey = e.key === "Enter" || e.keyCode === 13;

    if (isEnterKey && onSubmit && isValid) {
      super.executeAction({
        triggerPropertyName: "onSubmit",
        dynamicString: onSubmit,
        event: {
          type: EventType.ON_SUBMIT,
          callback: this.onSubmitSuccess,
        },
      });
    }
  };

  getFormattedText = () => {
    if (this.props.isFocused || this.props.inputType !== InputTypes.CURRENCY) {
      return this.props.text !== undefined ? this.props.text : "";
    }

    if (this.props.text === "" || this.props.text === undefined) return "";

    const valueToFormat = String(this.props.text);

    const locale = getLocale();
    const decimalSeparator = getDecimalSeparator(locale);

    return formatCurrencyNumber(
      this.props.decimalsInCurrency,
      valueToFormat,
      decimalSeparator,
    );
  };

  getWidgetView() {
    const value = this.getFormattedText();
    let isInvalid =
      "isValid" in this.props && !this.props.isValid && !!this.props.isDirty;
    const currencyCountryCode = this.props.selectedCurrencyCountryCode
      ? this.props.selectedCurrencyCountryCode
      : this.props.currencyCountryCode;
    const phoneNumberCountryCode = this.props.selectedPhoneNumberCountryCode
      ? this.props.selectedPhoneNumberCountryCode
      : this.props.phoneNumberCountryCode;
    const conditionalProps: Partial<InputComponentProps> = {};

    conditionalProps.errorMessage = this.props.errorMessage;

    if (this.props.isRequired && value.length === 0) {
      conditionalProps.errorMessage = createMessage(FIELD_REQUIRED_ERROR);
    }

    if (this.props.inputType === "TEXT" && this.props.maxChars) {
      // pass maxChars only for Text type inputs, undefined for other types
      conditionalProps.maxChars = this.props.maxChars;

      if (
        this.props.defaultText &&
        this.props.defaultText.toString().length > this.props.maxChars
      ) {
        isInvalid = true;
        conditionalProps.errorMessage = createMessage(
          INPUT_DEFAULT_TEXT_MAX_CHAR_ERROR,
          this.props.maxChars,
        );
      }
    }

    if (this.props.maxNum) conditionalProps.maxNum = this.props.maxNum;

    if (this.props.minNum) conditionalProps.minNum = this.props.minNum;

    const { componentHeight } = this.props;
    const minInputSingleLineHeight =
      this.props.label || this.props.tooltip
        ? // adjust height for label | tooltip extra div
          COMPACT_MODE_MIN_ROWS + 4
        : // GRID_DENSITY_MIGRATION_V1 used to adjust code as per new scaled canvas.
          COMPACT_MODE_MIN_ROWS;

    return (
      <InputComponent
        accentColor={this.props.accentColor}
        allowCurrencyChange={this.props.allowCurrencyChange}
        autoFocus={this.props.autoFocus}
        backgroundColor={this.props.backgroundColor}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        // show label and Input side by side if true
        compactMode={isCompactMode(componentHeight)}
        currencyCountryCode={currencyCountryCode}
        decimalsInCurrency={this.props.decimalsInCurrency}
        defaultValue={this.props.defaultText}
        disableNewLineOnPressEnterKey={!!this.props.onSubmit}
        disabled={this.props.isDisabled}
        iconAlign={this.props.iconAlign}
        iconName={this.props.iconName}
        inputType={this.props.inputType}
        isInvalid={isInvalid}
        isLoading={this.props.isLoading}
        label={this.props.label}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelWidth={this.props.labelComponentWidth}
        multiline={
          componentHeight >
            minInputSingleLineHeight * GridDefaults.DEFAULT_GRID_ROW_HEIGHT &&
          this.props.inputType === "TEXT"
        }
        onCurrencyTypeChange={this.onCurrencyTypeChange}
        onFocusChange={this.handleFocusChange}
        onISDCodeChange={this.onISDCodeChange}
        onKeyDown={this.handleKeyDown}
        onValueChange={this.onValueChange}
        phoneNumberCountryCode={phoneNumberCountryCode}
        placeholder={this.props.placeholderText}
        showError={!!this.props.isFocused}
        spellCheck={!!this.props.isSpellCheck}
        stepSize={1}
        tooltip={this.props.tooltip}
        value={value}
        widgetId={this.props.widgetId}
        {...conditionalProps}
      />
    );
  }
}

export interface InputValidator {
  validationRegex: string;
  errorMessage: string;
}
export interface InputWidgetProps extends WidgetProps {
  inputType: InputType;
  currencyCountryCode?: string;
  noOfDecimals?: number;
  allowCurrencyChange?: boolean;
  phoneNumberCountryCode?: string;
  decimalsInCurrency?: number;
  defaultText?: string | number;
  tooltip?: string;
  isDisabled?: boolean;
  validation: boolean;
  text: string;
  regex?: string;
  errorMessage?: string;
  placeholderText?: string;
  maxChars?: number;
  minNum?: number;
  maxNum?: number;
  onTextChanged?: string;
  label: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  labelWidth?: number;
  inputValidators: InputValidator[];
  isValid: boolean;
  focusIndex?: number;
  isAutoFocusEnabled?: boolean;
  isRequired?: boolean;
  isFocused?: boolean;
  isDirty?: boolean;
  autoFocus?: boolean;
  iconName?: IconName;
  iconAlign?: Omit<Alignment, "center">;
  onSubmit?: string;
  backgroundColor: string;
  borderRadius: string;
  boxShadow?: string;
  primaryColor: string;
  labelComponentWidth?: number;
}

export default InputWidget;
