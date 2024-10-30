import {$t} from "locale/index";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { ICON_NAMES } from "WidgetProvider/constants";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import {
  createMessage,
  FIELD_REQUIRED_ERROR,
  INPUT_DEFAULT_TEXT_MAX_CHAR_ERROR,
  INPUT_DEFAULT_TEXT_MAX_NUM_ERROR,
  INPUT_DEFAULT_TEXT_MIN_NUM_ERROR,
  INPUT_TEXT_MAX_CHAR_ERROR,
} from "ee/constants/messages";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { isNil, isNumber, merge, toString } from "lodash";
import React from "react";
import { DynamicHeight } from "utils/WidgetFeatures";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { mergeWidgetConfig } from "utils/helpers";
import BaseInputWidget from "widgets/BaseInputWidget";
import {
  InputTypes,
  NumberInputStepButtonPosition,
} from "widgets/BaseInputWidget/constants";
import { checkInputTypeTextByProps } from "widgets/BaseInputWidget/utils";
import type { BaseInputWidgetProps } from "widgets/BaseInputWidget/widget";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import {
  DefaultAutocompleteDefinitions,
  isAutoHeightEnabledForWidget,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { InputComponentProps } from "../component";
import InputComponent from "../component";
import { getParsedText, isInputTypeEmailOrPassword } from "./Utilities";
import derivedProperties from "./parsedDerivedProperties";

import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import type {
  PropertyUpdates,
  SnipingModeProperty,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { FEATURE_FLAG } from "ee/entities/FeatureFlag";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";

export function defaultValueValidation(
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  props: InputWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _?: any,
): ValidationResponse {
  const STRING_ERROR_MESSAGE = {
    name: "TypeError",
    message: $t('index.eb0a16239a276d7a'),
  };
  const NUMBER_ERROR_MESSAGE = {
    name: "TypeError",
    message: $t('index.6aa61de472e4a85a'),
  };
  const EMPTY_ERROR_MESSAGE = { name: "", message: "" };

  if (_.isObject(value)) {
    return {
      isValid: false,
      parsed: JSON.stringify(value, null, 2),
      messages: [STRING_ERROR_MESSAGE],
    };
  }

  const { inputType } = props;

  if (_.isBoolean(value) || _.isNil(value) || _.isUndefined(value)) {
    return {
      isValid: false,
      parsed: value,
      messages: [STRING_ERROR_MESSAGE],
    };
  }

  let parsed;

  switch (inputType) {
    case "NUMBER":
      parsed = Number(value);

      let isValid, messages;

      if (_.isString(value) && value.trim() === "") {
        /*
         *  When value is emtpy string
         */
        isValid = true;
        messages = [EMPTY_ERROR_MESSAGE];
        parsed = null;
      } else if (!Number.isFinite(parsed)) {
        /*
         *  When parsed value is not a finite numer
         */
        isValid = false;
        messages = [NUMBER_ERROR_MESSAGE];
        parsed = null;
      } else {
        /*
         *  When parsed value is a Number
         */
        isValid = true;
        messages = [EMPTY_ERROR_MESSAGE];
      }

      return {
        isValid,
        parsed,
        messages,
      };
    case "TEXT":
    case "MULTI_LINE_TEXT":
    case "PASSWORD":
    case "EMAIL":
      parsed = value;

      if (!_.isString(parsed)) {
        try {
          parsed = _.toString(parsed);
        } catch (e) {
          return {
            isValid: false,
            parsed: "",
            messages: [STRING_ERROR_MESSAGE],
          };
        }
      }

      return {
        isValid: _.isString(parsed),
        parsed: parsed,
        messages: [EMPTY_ERROR_MESSAGE],
      };
    default:
      return {
        isValid: false,
        parsed: "",
        messages: [STRING_ERROR_MESSAGE],
      };
  }
}

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function minValueValidation(min: any, props: InputWidgetProps, _?: any) {
  const max = props.maxNum;
  const value = min;

  min = Number(min);

  if (_?.isNil(value) || value === "") {
    return {
      isValid: true,
      parsed: undefined,
      messages: [
        {
          name: "",
          message: "",
        },
      ],
    };
  } else if (!Number.isFinite(min)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('index.6aa61de472e4a85a'),
        },
      ],
    };
  } else if (max !== undefined && min >= max) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('index.baee532f84ac1914'),
        },
      ],
    };
  } else {
    return {
      isValid: true,
      parsed: Number(min),
      messages: [
        {
          name: "",
          message: "",
        },
      ],
    };
  }
}

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function maxValueValidation(max: any, props: InputWidgetProps, _?: any) {
  const min = props.minNum;
  const value = max;

  max = Number(max);

  if (_?.isNil(value) || value === "") {
    return {
      isValid: true,
      parsed: undefined,
      messages: [
        {
          name: "",
          message: "",
        },
      ],
    };
  } else if (!Number.isFinite(max)) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "TypeError",
          message: $t('index.6aa61de472e4a85a'),
        },
      ],
    };
  } else if (min !== undefined && max <= min) {
    return {
      isValid: false,
      parsed: undefined,
      messages: [
        {
          name: "RangeError",
          message: $t('index.49745ec9008b9a8f'),
        },
      ],
    };
  } else {
    return {
      isValid: true,
      parsed: Number(max),
      messages: [
        {
          name: "",
          message: "",
        },
      ],
    };
  }
}

function InputTypeUpdateHook(
  props: WidgetProps,
  propertyName: string,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValue: any,
) {
  const updates = [
    {
      propertyPath: propertyName,
      propertyValue: propertyValue,
    },
  ];

  if (propertyValue === InputTypes.MULTI_LINE_TEXT) {
    if (props.dynamicHeight === DynamicHeight.FIXED) {
      updates.push({
        propertyPath: "dynamicHeight",
        propertyValue: DynamicHeight.AUTO_HEIGHT,
      });
    }
  }

  //if input type is email or password default the autofill state to be true
  // the user needs to explicity set autofill to fault disable autofill
  updates.push({
    propertyPath: "shouldAllowAutofill",
    propertyValue: isInputTypeEmailOrPassword(propertyValue),
  });

  return updates;
}

class InputWidget extends BaseInputWidget<InputWidgetProps, WidgetState> {
  constructor(props: InputWidgetProps) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  static type = "INPUT_WIDGET_V2";

  static getConfig() {
    return {
      name: $t('index.e7bdfa7619dab3bd'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.SUGGESTED_WIDGETS, WIDGET_TAGS.INPUTS],
      needsMeta: true,
      searchTags: ["form", $t('index.e9c4f1ec5fc7b7bc'), "number", "textarea"],
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
      ...BaseInputWidget.getDefaults(),
      rows: 7,
      labelPosition: LabelPosition.Top,
      inputType: "TEXT",
      widgetName: $t('index.e7bdfa7619dab3bd'),
      version: 2,
      showStepArrows: false,
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
            propertyPath: "defaultText",
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
      autoDimension: (props: BaseInputWidgetProps) => ({
        height: props.inputType !== "MULTI_LINE_TEXT",
      }),
      defaults: {
        rows: 6.6,
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
      disableResizeHandles: (props: BaseInputWidgetProps) => ({
        vertical: props.inputType !== "MULTI_LINE_TEXT",
      }),
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: {
        maxHeight: {},
        maxWidth: {},
        minHeight: { base: "70px" },
        minWidth: { base: "120px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    const definitions: AutocompletionDefinitions = {
      "!doc":
        $t('index.c252c8b92d85b224'),
      "!url": "https://docs.appsmith.com/widget-reference/input",
      text: {
        "!type": "string",
        "!doc": $t('index.e3c957bb77e4e630'),
        "!url": "https://docs.appsmith.com/widget-reference/input",
      },
      isValid: "bool",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      isDisabled: "bool",
    };

    return definitions;
  }
  static getPropertyPaneContentConfig() {
    return mergeWidgetConfig(
      [
        {
          sectionName: $t('index.1c7544340d099bfd'),
          children: [
            {
              helpText: $t('index.de798715be764d98'),
              propertyName: "inputType",
              label: $t('index.17dd0a5111242e5d'),
              controlType: "DROP_DOWN",
              options: [
                {
                  label: $t('index.17cfeb9b35ea1799'),
                  value: "TEXT",
                },
                {
                  label: $t('index.29eaec256a43104c'),
                  value: "MULTI_LINE_TEXT",
                },
                {
                  label: $t('index.a27533bf3d7e2beb'),
                  value: "NUMBER",
                },
                {
                  label: $t('index.11ce026d6830ab9b'),
                  value: "PASSWORD",
                },
                {
                  label: $t('index.8966361c5fad9c16'),
                  value: "EMAIL",
                },
              ],
              isBindProperty: false,
              isTriggerProperty: false,
              updateHook: InputTypeUpdateHook,
              dependencies: ["dynamicHeight"],
            },
            {
              helpText:
                $t('index.63389bd673eef254'),
              propertyName: "defaultText",
              label: $t('index.b867178444e007cd'),
              controlType: "INPUT_TEXT",
              placeholderText: $t('index.103d2220b40d5c06'),
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
          ],
        },
        {
          sectionName: $t('index.14582218596537a9'),
          children: [],
        },
        {
          sectionName: $t('index.681efe2a20274112'),
          children: [
            {
              propertyName: "isRequired",
              label: $t('index.84600edb1c0ef4f0'),
              helpText: $t('index.a5e3b3f4672fbea3'),
              controlType: "SWITCH",
              isJSConvertible: true,
              isBindProperty: true,
              isTriggerProperty: false,
              validation: { type: ValidationTypes.BOOLEAN },
            },
            {
              helpText: $t('index.efc043aa17fd6266'),
              propertyName: "maxChars",
              label: $t('index.8dcf1921a867e5c2'),
              controlType: "INPUT_TEXT",
              placeholderText: "255",
              isBindProperty: true,
              isTriggerProperty: false,
              validation: {
                type: ValidationTypes.NUMBER,
                params: { min: 1, natural: true, passThroughOnZero: false },
              },
              hidden: (props: InputWidgetProps) => {
                return !checkInputTypeTextByProps(props);
              },
              dependencies: ["inputType"],
            },
            {
              helpText: $t('index.069d2a70b2d8d084'),
              propertyName: "minNum",
              label: $t('index.e3a7044d4b15dc00'),
              controlType: "INPUT_TEXT",
              placeholderText: "1",
              isBindProperty: true,
              isTriggerProperty: false,
              validation: {
                type: ValidationTypes.FUNCTION,
                params: {
                  fn: minValueValidation,
                  expected: {
                    type: "number",
                    example: `1`,
                    autocompleteDataType: AutocompleteDataType.NUMBER,
                  },
                },
              },
              hidden: (props: InputWidgetProps) => {
                return props.inputType !== InputTypes.NUMBER;
              },
              dependencies: ["inputType"],
            },
            {
              helpText: $t('index.49fe16f974e5bbb0'),
              propertyName: "maxNum",
              label: $t('index.4d9dde4188688bce'),
              controlType: "INPUT_TEXT",
              placeholderText: "100",
              isBindProperty: true,
              isTriggerProperty: false,
              validation: {
                type: ValidationTypes.FUNCTION,
                params: {
                  fn: maxValueValidation,
                  expected: {
                    type: "number",
                    example: `100`,
                    autocompleteDataType: AutocompleteDataType.NUMBER,
                  },
                },
              },
              hidden: (props: InputWidgetProps) => {
                return props.inputType !== InputTypes.NUMBER;
              },
              dependencies: ["inputType"],
            },
          ],
        },
      ],
      super.getPropertyPaneContentConfig([
        {
          propertyName: "rtl",
          label: $t('index.860cfa3a8a223998'),
          helpText: $t('index.53ff923ea5ebefbb'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
          hidden: () => {
            return !super.getFeatureFlag(
              FEATURE_FLAG.license_widget_rtl_support_enabled,
            );
          },
        },
      ]),
    );
  }

  static getPropertyPaneStyleConfig() {
    return mergeWidgetConfig(
      [
        {
          sectionName: $t('index.36c89a426c1d948d'),
          children: [
            {
              propertyName: "iconName",
              label: $t('index.36c89a426c1d948d'),
              helpText: $t('index.3f9dc981329d9985'),
              controlType: "ICON_SELECT",
              isBindProperty: true,
              isTriggerProperty: false,
              isJSConvertible: true,
              validation: {
                type: ValidationTypes.TEXT,
                params: {
                  allowedValues: ICON_NAMES,
                },
              },
              hidden: (props: InputWidgetProps) =>
                props.inputType === InputTypes.MULTI_LINE_TEXT,
            },
            {
              propertyName: "iconAlign",
              label: $t('index.0d1a73481e3e7ae4'),
              helpText: $t('index.1b71b204575d755b'),
              controlType: "ICON_TABS",
              defaultValue: "left",
              fullWidth: false,
              options: [
                {
                  startIcon: "skip-left-line",
                  value: "left",
                },
                {
                  startIcon: "skip-right-line",
                  value: "right",
                },
              ],
              isBindProperty: false,
              isTriggerProperty: false,
              validation: { type: ValidationTypes.TEXT },
              hidden: (props: InputWidgetProps) =>
                props.inputType === InputTypes.MULTI_LINE_TEXT ||
                !props.iconName,
              dependencies: ["iconName"],
            },
          ],
        },
      ],
      super.getPropertyPaneStyleConfig(),
    );
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return merge(super.getDerivedPropertiesMap(), {
      isValid: `{{(() => {${derivedProperties.isValid}})()}}`,
    });
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    const baseMetaProperties = BaseInputWidget.getMetaPropertiesMap();

    return merge(baseMetaProperties, {
      inputText: "",
      text: "",
    });
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      inputText: "defaultText",
      text: "defaultText",
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  handleFocusChange = (focusState: boolean) => {
    this.setState({ isFocused: focusState });

    if (focusState) {
      this.executeAction({
        triggerPropertyName: "onFocus",
        dynamicString: this.props.onFocus,
        event: {
          type: EventType.ON_FOCUS,
        },
      });
    }

    if (!focusState) {
      this.executeAction({
        triggerPropertyName: "onBlur",
        dynamicString: this.props.onBlur,
        event: {
          type: EventType.ON_BLUR,
        },
      });
    }

    super.handleFocusChange(focusState);
  };

  handleKeyDown = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    super.handleKeyDown(e);
  };

  componentDidUpdate = (prevProps: InputWidgetProps) => {
    if (
      prevProps.inputText !== this.props.inputText &&
      this.props.inputText !== toString(this.props.text)
    ) {
      this.props.updateWidgetMetaProperty(
        "text",
        getParsedText(this.props.inputText, this.props.inputType),
      );
    }

    if (prevProps.inputType !== this.props.inputType) {
      this.props.updateWidgetMetaProperty(
        "text",
        getParsedText(this.props.inputText, this.props.inputType),
      );
    }

    // If defaultText property has changed, reset isDirty to false
    if (
      this.props.defaultText !== prevProps.defaultText &&
      this.props.isDirty
    ) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  };

  onValueChange = (value: string) => {
    /*
     * Ideally text property should be derived property. But widgets
     * with derived properties won't work as expected inside a List
     * widget.
     * TODO(Balaji): Once we refactor the List widget, need to conver
     * text to a derived property.
     */
    this.props.updateWidgetMetaProperty(
      "text",
      getParsedText(value, this.props.inputType),
    );
    this.props.updateWidgetMetaProperty("inputText", value, {
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

  resetWidgetText = () => {
    this.props.updateWidgetMetaProperty("inputText", "");
    this.props.updateWidgetMetaProperty(
      "text",
      getParsedText("", this.props.inputType),
    );
  };

  getWidgetView() {
    const value = this.props.inputText ?? "";
    let isInvalid = false;

    if (this.props.isDirty) {
      isInvalid = "isValid" in this.props && !this.props.isValid;
    } else {
      isInvalid = false;
    }

    const conditionalProps: Partial<InputComponentProps> = {};

    conditionalProps.errorMessage = this.props.errorMessage;

    if (this.props.isRequired && value.length === 0) {
      conditionalProps.errorMessage = createMessage(FIELD_REQUIRED_ERROR);
    }

    if (!isNil(this.props.maxNum)) {
      conditionalProps.maxNum = this.props.maxNum;
    }

    if (!isNil(this.props.minNum)) {
      conditionalProps.minNum = this.props.minNum;
    }

    if (checkInputTypeTextByProps(this.props) && this.props.maxChars) {
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
      } else if (value && value.length > this.props.maxChars) {
        isInvalid = true;
        conditionalProps.errorMessage = createMessage(
          INPUT_TEXT_MAX_CHAR_ERROR,
          this.props.maxChars,
        );
      }
    }

    if (
      this.props.inputType === InputTypes.NUMBER &&
      isNumber(this.props.defaultText)
    ) {
      // check the default text is neither greater than max nor less than min value.
      if (
        !isNil(this.props.minNum) &&
        this.props.minNum > Number(this.props.defaultText)
      ) {
        isInvalid = true;
        conditionalProps.errorMessage = createMessage(
          INPUT_DEFAULT_TEXT_MIN_NUM_ERROR,
        );
      } else if (
        !isNil(this.props.maxNum) &&
        this.props.maxNum < Number(this.props.defaultText)
      ) {
        isInvalid = true;
        conditionalProps.errorMessage = createMessage(
          INPUT_DEFAULT_TEXT_MAX_NUM_ERROR,
        );
      }
    }

    if (
      this.props.inputType === InputTypes.NUMBER &&
      this.props.showStepArrows
    ) {
      conditionalProps.buttonPosition = NumberInputStepButtonPosition.RIGHT;
    } else {
      conditionalProps.buttonPosition = NumberInputStepButtonPosition.NONE;
    }

    const { componentHeight } = this.props;

    const autoFillProps =
      !this.props.shouldAllowAutofill &&
      isInputTypeEmailOrPassword(this.props.inputType)
        ? { autoComplete: "off" }
        : {};

    return (
      <InputComponent
        accentColor={this.props.accentColor}
        {...autoFillProps}
        // show label and Input side by side if true
        autoFocus={this.props.autoFocus}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        compactMode={isCompactMode(componentHeight)}
        defaultValue={this.props.defaultText}
        disableNewLineOnPressEnterKey={!!this.props.onSubmit}
        disabled={this.props.isDisabled}
        iconAlign={this.props.iconAlign}
        iconName={this.props.iconName}
        inputType={this.props.inputType}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isInvalid={isInvalid}
        isLoading={this.props.isLoading}
        label={this.props.label}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelWidth={this.props.labelComponentWidth}
        multiline={this.props.inputType === InputTypes.MULTI_LINE_TEXT}
        onFocusChange={this.handleFocusChange}
        onKeyDown={this.handleKeyDown}
        onValueChange={this.onValueChange}
        placeholder={this.props.placeholderText}
        rtl={this.props.rtl}
        showError={!!this.state.isFocused}
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

export interface InputWidgetProps extends BaseInputWidgetProps {
  defaultText?: string | number;
  maxChars?: number;
  isSpellCheck?: boolean;
  maxNum?: number;
  minNum?: number;
  inputText: string;
  rtl?: boolean;
}

export default InputWidget;
