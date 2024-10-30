import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import type { IconName } from "@blueprintjs/icons";
import type {
  ButtonPlacement,
  ButtonVariant,
  RecaptchaType,
} from "components/constants";
import {
  ButtonPlacementTypes,
  ButtonVariantTypes,
  RecaptchaTypes,
} from "components/constants";
import type { ExecutionResult } from "constants/AppsmithActionConstants/ActionConstants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import React from "react";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import ButtonComponent, { ButtonType } from "../component";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { isAirgapped } from "ee/utils/airgapHelpers";
import { BUTTON_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import type {
  PropertyUpdates,
  SnipingModeProperty,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";

class ButtonWidget extends BaseWidget<ButtonWidgetProps, ButtonWidgetState> {
  onButtonClickBound: (event: React.MouseEvent<HTMLElement>) => void;
  clickWithRecaptchaBound: (token: string) => void;
  constructor(props: ButtonWidgetProps) {
    super(props);
    this.onButtonClickBound = this.onButtonClick.bind(this);
    this.clickWithRecaptchaBound = this.clickWithRecaptcha.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  static type = "BUTTON_WIDGET";

  static getConfig() {
    return {
      name: $t('index.fc6d85e40c6c79ca'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.BUTTONS],
      needsMeta: true,
      searchTags: ["click", "submit"],
    };
  }

  static getDefaults() {
    return {
      animateLoading: true,
      text: $t('index.9cd41fdee70e5a41'),
      buttonVariant: ButtonVariantTypes.PRIMARY,
      placement: ButtonPlacementTypes.CENTER,
      rows: 4,
      columns: 16,
      widgetName: $t('index.fc6d85e40c6c79ca'),
      isDisabled: false,
      isVisible: true,
      isDefaultClickDisabled: true,
      disabledWhenInvalid: false,
      resetFormOnClick: false,
      recaptchaType: RecaptchaTypes.V3,
      version: 1,
      responsiveBehavior: ResponsiveBehavior.Hug,
      minWidth: BUTTON_MIN_WIDTH,
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "onClick",
            propertyValue: propValueMap.run,
            isDynamicPropertyPath: true,
          },
        ];
      },
    };
  }

  static getAutoLayoutConfig() {
    return {
      defaults: {
        rows: 4,
        columns: 6.453,
      },
      autoDimension: {
        width: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "120px",
              maxWidth: "360px",
              minHeight: "40px",
            };
          },
        },
      ],
      disableResizeHandles: {
        horizontal: true,
        vertical: true,
      },
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: {
        maxHeight: {},
        maxWidth: { base: "360px" },
        minHeight: { base: "40px" },
        minWidth: { base: "120px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.fb948c3434386921'),
      "!url": "https://docs.appsmith.com/widget-reference/button",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      text: "string",
      isDisabled: "bool",
      recaptchaToken: "string",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.b0297e0a1e46c8d3'),
        children: [
          {
            propertyName: "text",
            label: $t('index.c458e7f75518734e'),
            helpText: $t('index.f78e3cba1c1575b8'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.9cd41fdee70e5a41'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.6c0d4b8937944943'),
            propertyName: "onClick",
            label: "onClick",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
      {
        sectionName: $t('index.0792fdbbf175aaec'),
        children: [
          {
            helpText: $t('index.9d401bcc931c3f7e'),
            propertyName: "tooltip",
            label: $t('index.b4826e6d6b940ff8'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.b3c1b2fec36f4b18'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            label: $t('index.2c9f2d9ffb74f793'),
            helpText: $t('index.95e104dc7e971e97'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.a776e901141e8cb2'),
            controlType: "SWITCH",
            helpText: $t('index.0d1908d7c48e95bb'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.0d5d42ea2840f748'),
            controlType: "SWITCH",
            helpText: $t('index.9805519624b750e7'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.1ebbe264651fd616'),
        hidden: isAirgapped,
        children: [
          {
            propertyName: "googleRecaptchaKey",
            label: "Google reCAPTCHA key",
            helpText: "Sets Google reCAPTCHA site key for the button",
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.325f94a0aef9bc65'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "recaptchaType",
            label: "Google reCAPTCHA version",
            controlType: "DROP_DOWN",
            helpText: $t('index.4406d541d45e8800'),
            options: [
              {
                label: $t('index.09b40f7a785142df'),
                value: RecaptchaTypes.V3,
              },
              {
                label: $t('index.e0be1e21294b7212'),
                value: RecaptchaTypes.V2,
              },
            ],
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [RecaptchaTypes.V3, RecaptchaTypes.V2],
                default: RecaptchaTypes.V3,
              },
            },
          },
        ],
      },
      // TODO: refactor widgetParentProps implementation when we address #10659
      {
        sectionName: $t('index.bcc14d99f1896f4f'),
        children: [
          {
            helpText:
              $t('index.6c9a30a65264e4a2'),
            propertyName: "disabledWhenInvalid",
            label: $t('index.7d11d824bff120ca'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText:
              $t('index.69a337006d297ff7'),
            propertyName: "resetFormOnClick",
            label: $t('index.abe4041fad876a2f'),
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
        sectionName: $t('index.0792fdbbf175aaec'),
        children: [
          {
            propertyName: "buttonVariant",
            label: $t('index.9036456c4cea4d58'),
            controlType: "ICON_TABS",
            defaultValue: ButtonVariantTypes.PRIMARY,
            fullWidth: true,
            helpText: $t('index.5e12a59e3444cc4e'),
            options: [
              {
                label: $t('index.9df7c667a9e51686'),
                value: ButtonVariantTypes.PRIMARY,
              },
              {
                label: $t('index.d78134cd98ce256e'),
                value: ButtonVariantTypes.SECONDARY,
              },
              {
                label: $t('index.7959378f6554b680'),
                value: ButtonVariantTypes.TERTIARY,
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [
                  ButtonVariantTypes.PRIMARY,
                  ButtonVariantTypes.SECONDARY,
                  ButtonVariantTypes.TERTIARY,
                ],
                default: ButtonVariantTypes.PRIMARY,
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.0ece27ab033e5b88'),
        children: [
          {
            propertyName: "iconName",
            label: $t('index.5554dddd31d22855'),
            helpText: $t('index.73f3893034d57c1b'),
            controlType: "ICON_SELECT",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            updateHook: (
              props: ButtonWidgetProps,
              propertyPath: string,
              propertyValue: string,
            ) => {
              const propertiesToUpdate = [{ propertyPath, propertyValue }];

              if (!props.iconAlign) {
                propertiesToUpdate.push({
                  propertyPath: "iconAlign",
                  propertyValue: Alignment.LEFT,
                });
              }

              return propertiesToUpdate;
            },
            dependencies: ["iconAlign"],
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
          {
            propertyName: "iconAlign",
            label: $t('index.90cba3c0217a79eb'),
            helpText: $t('index.9d5e9c8d8b4922ac'),
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
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["center", "left", "right"],
              },
            },
          },
          {
            propertyName: "placement",
            label: $t('index.058314430f2f572b'),
            controlType: "ICON_TABS",
            fullWidth: true,
            helpText: $t('index.31ccfead2451a666'),
            options: [
              {
                label: $t('index.9ef4dd32ac5ff287'),
                value: ButtonPlacementTypes.START,
              },
              {
                label: $t('index.7b2df661607d9692'),
                value: ButtonPlacementTypes.BETWEEN,
              },
              {
                label: $t('index.9eb6a649bedf113c'),
                value: ButtonPlacementTypes.CENTER,
              },
            ],
            defaultValue: ButtonPlacementTypes.CENTER,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [
                  ButtonPlacementTypes.START,
                  ButtonPlacementTypes.BETWEEN,
                  ButtonPlacementTypes.CENTER,
                ],
                default: ButtonPlacementTypes.CENTER,
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.04ebc367a8f4faaa'),
        children: [
          {
            propertyName: "buttonColor",
            helpText: $t('index.eb82d11f0c5121f7'),
            label: $t('index.cc2ad0b56394b7f0'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.35f66a39a47d31c7'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.1c2b139464f43148'),
            helpText:
              $t('index.d3fdb1eec46f30ee'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isBindProperty: true,
            isJSConvertible: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.544cf733266c9d17'),
            helpText:
              $t('index.b26ad5f8769d1577'),
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

  static getStylesheetConfig(): Stylesheet {
    return {
      buttonColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      recaptchaToken: undefined,
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  onButtonClick() {
    if (this.props.onClick) {
      this.setState({
        isLoading: true,
      });
      super.executeAction({
        triggerPropertyName: "onClick",
        dynamicString: this.props.onClick,
        event: {
          type: EventType.ON_CLICK,
          callback: this.handleActionComplete,
        },
      });
    } else if (this.props.resetFormOnClick && this.props.onReset) {
      this.props.onReset();
    }
  }

  hasOnClickAction = () => {
    const { isDisabled, onClick, onReset, resetFormOnClick } = this.props;

    return Boolean((onClick || onReset || resetFormOnClick) && !isDisabled);
  };

  clickWithRecaptcha(token: string) {
    this.props.updateWidgetMetaProperty("recaptchaToken", token, {
      triggerPropertyName: "onClick",
      dynamicString: this.props.onClick,
      event: {
        type: EventType.ON_CLICK,
        callback: this.handleActionComplete,
      },
    });
  }

  handleRecaptchaV2Loading = (isLoading: boolean) => {
    if (this.props.onClick) {
      this.setState({ isLoading });
    }
  };

  handleActionComplete = (result: ExecutionResult) => {
    this.setState({
      isLoading: false,
    });

    if (result.success) {
      if (this.props.resetFormOnClick && this.props.onReset)
        this.props.onReset();
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
        setLabel: {
          path: "text",
          type: "string",
        },
        setColor: {
          path: "buttonColor",
          type: "string",
        },
      },
    };
  }

  getWidgetView() {
    const disabled =
      this.props.disabledWhenInvalid &&
      "isFormValid" in this.props &&
      !this.props.isFormValid;
    const isDisabled = this.props.isDisabled || disabled;

    return (
      <ButtonComponent
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        buttonColor={this.props.buttonColor}
        buttonVariant={this.props.buttonVariant}
        clickWithRecaptcha={this.clickWithRecaptchaBound}
        googleRecaptchaKey={this.props.googleRecaptchaKey}
        handleRecaptchaV2Loading={this.handleRecaptchaV2Loading}
        iconAlign={this.props.iconAlign}
        iconName={this.props.iconName}
        isDisabled={isDisabled}
        isLoading={this.props.isLoading || this.state.isLoading}
        key={this.props.widgetId}
        maxWidth={this.props.maxWidth}
        minHeight={this.props.minHeight}
        minWidth={this.props.minWidth}
        onClick={this.hasOnClickAction() ? this.onButtonClickBound : undefined}
        placement={this.props.placement}
        recaptchaType={this.props.recaptchaType}
        shouldFitContent={this.isAutoLayoutMode}
        text={this.props.text}
        tooltip={this.props.tooltip}
        type={this.props.buttonType || ButtonType.BUTTON}
        widgetId={this.props.widgetId}
        widgetName={this.props.widgetName}
      />
    );
  }
}

export interface ButtonWidgetProps extends WidgetProps {
  text?: string;
  onClick?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  recaptchaType?: RecaptchaType;
  buttonType?: ButtonType;
  googleRecaptchaKey?: string;
  buttonVariant?: ButtonVariant;
  buttonColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  iconName?: IconName;
  iconAlign?: Alignment;
  placement?: ButtonPlacement;
  disabledWhenInvalid?: boolean;
  resetFormOnClick?: boolean;
}

interface ButtonWidgetState extends WidgetState {
  isLoading: boolean;
}

export default ButtonWidget;
