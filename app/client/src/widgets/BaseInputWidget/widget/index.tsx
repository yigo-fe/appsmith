import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import type { IconName } from "@blueprintjs/icons";
import { LabelPosition } from "components/constants";
import type { ExecutionResult } from "constants/AppsmithActionConstants/ActionConstants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import React from "react";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import type { InputWidgetProps } from "widgets/InputWidgetV2/widget";
import { isInputTypeEmailOrPassword } from "widgets/InputWidgetV2/widget/Utilities";
import BaseInputComponent from "../component";
import { InputTypes } from "../constants";
import { checkInputTypeTextByProps } from "../utils";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";

import IconSVG from "../icon.svg";
import type {
  WidgetBaseConfiguration,
  WidgetDefaultProps,
} from "WidgetProvider/constants";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";

class BaseInputWidget<
  T extends BaseInputWidgetProps,
  K extends WidgetState,
> extends BaseWidget<T, K> {
  constructor(props: T) {
    super(props);
  }

  static type = "BASE_INPUT_WIDGET";

  static getConfig(): WidgetBaseConfiguration {
    return {
      name: $t('index.77f924518d15d633'),
      hideCard: true,
      iconSVG: IconSVG,
      needsMeta: true,
    };
  }

  static getDefaults(): WidgetDefaultProps {
    return {
      rows: 4,
      label: $t('index.c6bf1acfa8913310'),
      labelPosition: LabelPosition.Left,
      labelAlignment: Alignment.LEFT,
      labelTextSize: "0.875rem",
      labelWidth: 5,
      columns: 20,
      widgetName: $t('index.77f924518d15d633'),
      version: 1,
      defaultText: "",
      iconAlign: "left",
      autoFocus: false,
      labelStyle: "",
      resetOnSubmit: true,
      isRequired: false,
      isDisabled: false,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
    };
  }

  static getPropertyPaneContentConfig(
    generalProperties: PropertyPaneConfig[] = [],
  ) {
    return [
      {
        sectionName: $t('index.c6bf1acfa8913310'),
        children: [
          {
            helpText: $t('index.c3c2af6eb1716830'),
            propertyName: "label",
            label: $t('index.7c6fcb87c8673628'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.41b4e1e8e7fcf09a'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.2395c936bdf075cc'),
            propertyName: "labelPosition",
            label: $t('index.d040a0e4b32ca940'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.952f5424023bd287'), value: LabelPosition.Auto },
              { label: $t('index.40bf3d1825ca6f0f'), value: LabelPosition.Left },
              { label: $t('index.87065d9bb20b883c'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.18a7d95a8f47b31a'),
            propertyName: "labelAlignment",
            label: $t('index.7a89b3d57f30f6cd'),
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
            hidden: (props: BaseInputWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.f0cd570bea2f2e91'),
            propertyName: "labelWidth",
            label: $t('index.31bcccf1abeb1703'),
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
            hidden: (props: BaseInputWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.6701b500e3ae1b62'),
        children: [
          {
            helpText:
              $t('index.7394d58ad633acdd'),
            propertyName: "regex",
            label: $t('index.96c3a3c8d7b1916b'),
            controlType: "INPUT_TEXT",
            placeholderText: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.REGEX },
          },
          {
            helpText: $t('index.faa5582deb4819c6'),
            propertyName: "validation",
            label: $t('index.24b04bdda8d535bd'),
            controlType: "INPUT_TEXT",
            placeholderText: "{{ Input1.text.length > 0 }}",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
              params: {
                default: true,
              },
            },
          },
          {
            helpText:
              $t('index.bb53a12107e05d1b'),
            propertyName: "errorMessage",
            label: $t('index.bb7a08c447952a15'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.ceec16402fa502c9'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isSpellCheck",
            label: $t('index.a9ac15048c0ae766'),
            helpText:
              $t('index.53aa39ec61dc1eec'),
            controlType: "SWITCH",
            isJSConvertible: false,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: (props: BaseInputWidgetProps) => {
              return !checkInputTypeTextByProps(props);
            },
            dependencies: ["inputType"],
          },
        ],
      },
      {
        sectionName: $t('index.7be0f2014e4dcc1a'),
        children: [
          {
            helpText: $t('index.0303cc457bd130bf'),
            propertyName: "tooltip",
            label: $t('index.ce6860337eed8d46'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.3da48af9411f2d7e'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.d114f0b587daedab'),
            propertyName: "placeholderText",
            label: $t('index.7bfdf286fd072813'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.7bfdf286fd072813'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.1161fae0b022596f'),
            propertyName: "showStepArrows",
            label: $t('index.584422f81e00ce62'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
              params: {
                default: false,
              },
            },
            hidden: (props: BaseInputWidgetProps) => {
              return (
                props.type !== "CURRENCY_INPUT_WIDGET" &&
                props.inputType !== InputTypes.NUMBER
              );
            },
            dependencies: ["inputType"],
          },
          {
            helpText: $t('index.7c004b086a405621'),
            propertyName: "isVisible",
            label: $t('index.702dea248d8ca16a'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.b1e0fbc5e8dbf94f'),
            propertyName: "isDisabled",
            label: $t('index.db3858b7b38f74d0'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.f998fad74abd903d'),
            controlType: "SWITCH",
            helpText: $t('index.06bdc302de7f9083'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.bdbb1dbc89420c76'),
            propertyName: "autoFocus",
            label: $t('index.8f8bbeac3393604c'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "shouldAllowAutofill",
            label: $t('index.8d7417ba06eb9d8f'),
            helpText: $t('index.c08d4c2266d05a05'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: (props: InputWidgetProps) => {
              //should be shown for only inputWidgetV2 and for email or password input types
              return !(
                isInputTypeEmailOrPassword(props?.inputType) &&
                props.type === "INPUT_WIDGET_V2"
              );
            },
            dependencies: ["inputType"],
          },
          {
            propertyName: "allowFormatting",
            label: $t('index.b4041a410179102e'),
            helpText: $t('index.9b364ebc1688d06b'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: (props: BaseInputWidgetProps) => {
              return props.type !== "PHONE_INPUT_WIDGET";
            },
          },
          ...generalProperties,
        ],
      },
      {
        sectionName: $t('index.16dd911c4413c870'),
        children: [
          {
            helpText: $t('index.32c333d828ec2a7c'),
            propertyName: "onTextChanged",
            label: "onTextChanged",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.fabfe2342e4e28c0'),
            propertyName: "onFocus",
            label: "onFocus",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.bc2b4af3047ea83e'),
            propertyName: "onBlur",
            label: "onBlur",
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
          {
            helpText: $t('index.645d494985924621'),
            propertyName: "resetOnSubmit",
            label: $t('index.891180610fb0ddfe'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.3f843e35222c6f2a'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.2cef316a59be38f7'),
            helpText: $t('index.794611ff5fb24b92'),
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
            label: $t('index.e040185fc5e49916'),
            helpText: $t('index.7e9793af40695b03'),
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
            label: $t('index.6832409aeeeb2c92'),
            helpText: $t('index.777de3f41e924fe3'),
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
        sectionName: $t('index.187a353f70544877'),
        children: [
          {
            propertyName: "accentColor",
            label: $t('index.a5a95d78d1396536'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            invisible: true,
          },
          {
            propertyName: "borderRadius",
            label: $t('index.61256d104c7fbadb'),
            helpText:
              $t('index.ad52af701f4b8c83'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.eb9b12eb9643eaff'),
            helpText:
              $t('index.c51a6cb2f27c957f'),
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
      isDirty: false,
    };
  }

  handleFocusChange(focusState: boolean) {
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
  }

  resetWidgetText() {
    this.props.updateWidgetMetaProperty("text", "");
  }

  onSubmitSuccess = (result: ExecutionResult) => {
    if (result.success && this.props.resetOnSubmit) {
      //Resets isDirty
      super.resetChildrenMetaProperty(this.props.widgetId);
      this.resetWidgetText();
    }
  };

  handleKeyDown(
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) {
    const { isValid, onSubmit } = this.props;
    const isEnterKey = e.key === "Enter" || e.keyCode === 13;

    if (this.props.inputType === InputTypes.MULTI_LINE_TEXT) {
      if (
        isEnterKey &&
        (e.metaKey || e.ctrlKey) &&
        typeof onSubmit === "string" &&
        onSubmit
      ) {
        this.props.updateWidgetMetaProperty("isDirty", this.props.isDirty, {
          triggerPropertyName: "onSubmit",
          dynamicString: onSubmit,
          event: {
            type: EventType.ON_SUBMIT,
            callback: this.onSubmitSuccess,
          },
        });
      }
    } else {
      if (isEnterKey && typeof onSubmit === "string" && onSubmit && isValid) {
        /**
         * Originally super.executeAction was used to trigger the ON_SUBMIT action and
         * updateMetaProperty to update the text.
         * Since executeAction is not queued and updateMetaProperty is,
         * the user would observe that the data tree only gets partially updated with text
         * before the ON_SUBMIT would get triggered,
         * if they type {enter} really fast after typing some input text.
         * So we're using updateMetaProperty to trigger the ON_SUBMIT to let the data tree update
         * before we actually execute the action.
         * Since updateMetaProperty expects a meta property to be updated,
         * we are redundantly updating the common meta property, isDirty which is common on its child widgets here. But the main part is the action execution payload.
         */
        this.props.updateWidgetMetaProperty("isDirty", this.props.isDirty, {
          triggerPropertyName: "onSubmit",
          dynamicString: onSubmit,
          event: {
            type: EventType.ON_SUBMIT,
            callback: this.onSubmitSuccess,
          },
        });
      }
    }
  }

  getWidgetView() {
    return (
      <BaseInputComponent
        allowNumericCharactersOnly={this.props.allowNumericCharactersOnly}
        autoFocus={this.props.autoFocus}
        compactMode={this.props.compactMode}
        defaultValue={this.props.defaultValue}
        disableNewLineOnPressEnterKey={this.props.disableNewLineOnPressEnterKey}
        disabled={this.props.isDisabled}
        errorMessage={this.props.errorMessage}
        fill={this.props.fill}
        iconAlign={this.props.iconAlign}
        iconName={this.props.iconName}
        inputHTMLType="TEXT"
        inputType={this.props.inputType}
        intent={this.props.intent}
        isInvalid={this.props.isInvalid}
        isLoading={this.props.isLoading}
        label={this.props.label}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelWidth={this.props.labelComponentWidth}
        maxChars={this.props.maxChars}
        multiline={this.props.multiline}
        onFocusChange={this.props.onFocusChange}
        onKeyDown={this.handleKeyDown}
        onValueChange={this.props.onValueChange}
        placeholder={this.props.placeholder}
        showError={this.props.showError}
        stepSize={1}
        tooltip={this.props.tooltip}
        value={this.props.value}
        widgetId={this.props.widgetId}
      />
    );
  }
}

export interface BaseInputValidator {
  validationRegex: string;
  errorMessage: string;
}
export interface BaseInputWidgetProps extends WidgetProps {
  inputType: InputTypes;
  tooltip?: string;
  isDisabled?: boolean;
  validation: boolean;
  text: string;
  regex?: string;
  errorMessage?: string;
  placeholderText?: string;
  label: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: string;
  labelStyle?: string;
  inputValidators: BaseInputValidator[];
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
  labelComponentWidth?: number;
}

export default BaseInputWidget;
