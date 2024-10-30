import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import type { IconName } from "@blueprintjs/icons";
import type {
  AutocompletionDefinitions,
  PropertyUpdates,
  SnipingModeProperty,
  WidgetCallout,
} from "WidgetProvider/constants";
import type {
  ButtonBorderRadius,
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
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { Stylesheet } from "entities/AppTheming";
import { buildDeprecationWidgetMessage } from "pages/Editor/utils";
import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import ButtonWidget from "widgets/ButtonWidget";
import type { ButtonType } from "widgets/ButtonWidget/component";
import ButtonComponent from "widgets/ButtonWidget/component";
import type { ButtonWidgetProps } from "widgets/ButtonWidget/widget";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import IconSVG from "../icon.svg";

class FormButtonWidget extends ButtonWidget {
  constructor(props: FormButtonWidgetProps) {
    super(props);
  }

  static type = "FORM_BUTTON_WIDGET";

  static getConfig() {
    return {
      name: "FormButton",
      iconSVG: IconSVG,
      hideCard: true,
      isDeprecated: true,
      replacement: "BUTTON_WIDGET",
      needsMeta: true,
      tags: [WIDGET_TAGS.BUTTONS],
      // TODO: Fix this the next time the file is edited
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any; // TODO (Sangeeth): Type error
  }

  static getDefaults() {
    return {
      rows: 4,
      columns: 12,
      widgetName: "FormButton",
      text: $t('index.ab900e048cd7e8c3'),
      isDefaultClickDisabled: true,
      recaptchaType: RecaptchaTypes.V3,
      version: 1,
      animateLoading: true,
      // TODO: Fix this the next time the file is edited
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any; // TODO (Sangeeth): Type error
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
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message: buildDeprecationWidgetMessage(
              FormButtonWidget.getConfig().name,
            ),
          },
        ];
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.5d800a4de4e1408c'),
      "!url": "https://docs.appsmith.com/widget-reference/form",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      text: "string",
      isDisabled: "bool",
      recaptchaToken: "string",
    };
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.f4beb80130d239fb'),
        children: [
          {
            propertyName: "text",
            label: $t('index.5ee29b2d4c5cdd73'),
            helpText: $t('index.fd36cc4560232442'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.18550fff6312bcc2'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.b6a4cf3f01191e75'),
            propertyName: "tooltip",
            label: $t('index.705629af8c546774'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.bc9824dfe90393ff'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            label: $t('index.958defbda7963ba1'),
            helpText: $t('index.4852580ceb75055b'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.240bce071cb91af7'),
            controlType: "SWITCH",
            helpText: $t('index.af5d576e1d358055'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "googleRecaptchaKey",
            label: "Google Recaptcha Key",
            helpText: "Sets Google Recaptcha v3 site key for button",
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.353598b633680d89'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "recaptchaType",
            label: "Google reCAPTCHA version",
            controlType: "DROP_DOWN",
            helpText: $t('index.8e65b07ef553827f'),
            options: [
              {
                label: $t('index.ce28fa0b7db54090'),
                value: RecaptchaTypes.V3,
              },
              {
                label: $t('index.7acc5425cf9bd9d9'),
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
      {
        sectionName: $t('index.f0e565f02571df9c'),
        children: [
          {
            helpText:
              $t('index.96a1bc736dd8c0dd'),
            propertyName: "disabledWhenInvalid",
            label: $t('index.d3f546ca6ea0a90d'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText:
              $t('index.f8ea7c1e70898f44'),
            propertyName: "resetFormOnClick",
            label: $t('index.48620c080ea6bbb0'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.268392a216312eb7'),
        children: [
          {
            helpText: $t('index.736930e157dda2f2'),
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
        sectionName: $t('index.bfdb1299b77de6f1'),
        children: [
          {
            propertyName: "buttonColor",
            helpText: $t('index.8a644ecac07bd75e'),
            label: $t('index.73f6b25dc2284f91'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "buttonVariant",
            label: $t('index.7a251b9130d0bee6'),
            controlType: "DROP_DOWN",
            helpText: $t('index.139165282fbdc0d9'),
            options: [
              {
                label: $t('index.9e776420d4c2ce68'),
                value: ButtonVariantTypes.PRIMARY,
              },
              {
                label: $t('index.66a317d49d825dc8'),
                value: ButtonVariantTypes.SECONDARY,
              },
              {
                label: $t('index.8c2b72aa4ba3f67a'),
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
          {
            propertyName: "borderRadius",
            label: $t('index.200d096b87ba066c'),
            helpText:
              $t('index.4c889054905d8e36'),
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
            label: $t('index.2efe9d6d5e4caf86'),
            helpText:
              $t('index.97d35fcdaf60d0b0'),
            controlType: "BOX_SHADOW_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "iconName",
            label: $t('index.7f8ae5b1cf6fb6a1'),
            helpText: $t('index.07e4e45c21c17e3e'),
            controlType: "ICON_SELECT",
            isBindProperty: false,
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
            propertyName: "placement",
            label: $t('index.0e91e582d549773c'),
            controlType: "DROP_DOWN",
            helpText: $t('index.dbd1d0fddd3a23f1'),
            options: [
              {
                label: $t('index.69a512afb26c1dff'),
                value: ButtonPlacementTypes.START,
              },
              {
                label: $t('index.2cdbfcc3e128ed2d'),
                value: ButtonPlacementTypes.BETWEEN,
              },
              {
                label: $t('index.ac03b4f64af5f8c1'),
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
          {
            propertyName: "iconAlign",
            label: $t('index.aa134d2e942b856d'),
            helpText: $t('index.8ae955d07e5961c1'),
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
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["center", "left", "right"],
              },
            },
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

  clickWithRecaptcha(token: string) {
    if (this.props.onClick) {
      this.setState({
        isLoading: true,
      });
    }

    this.props.updateWidgetMetaProperty("recaptchaToken", token, {
      triggerPropertyName: "onClick",
      dynamicString: this.props.onClick,
      event: {
        type: EventType.ON_CLICK,
        callback: this.handleActionResult,
      },
    });
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
          callback: this.handleActionResult,
        },
      });
    } else if (this.props.resetFormOnClick && this.props.onReset) {
      this.props.onReset();
    }
  }

  handleActionResult = (result: ExecutionResult) => {
    this.setState({
      isLoading: false,
    });

    if (result.success) {
      if (this.props.resetFormOnClick && this.props.onReset)
        this.props.onReset();
    }
  };

  getWidgetView() {
    const disabled =
      this.props.disabledWhenInvalid &&
      "isFormValid" in this.props &&
      !this.props.isFormValid;

    return (
      <ButtonComponent
        {...super.getWidgetView().props}
        isDisabled={disabled}
        onClick={!disabled ? this.onButtonClickBound : undefined}
      />
    );
  }
}

export interface FormButtonWidgetProps extends WidgetProps {
  text?: string;
  onClick?: string;
  isVisible?: boolean;
  buttonType: ButtonType;
  isFormValid?: boolean;
  resetFormOnClick?: boolean;
  onReset?: () => void;
  disabledWhenInvalid?: boolean;
  googleRecaptchaKey?: string;
  recaptchaType: RecaptchaType;
  buttonVariant?: ButtonVariant;
  buttonColor?: string;
  borderRadius?: ButtonBorderRadius;
  boxShadow?: string;
  iconName?: IconName;
  iconAlign?: Alignment;
}

export interface FormButtonWidgetState extends WidgetState {
  isLoading: boolean;
}

export default FormButtonWidget;
