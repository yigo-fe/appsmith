import {$t} from "locale/index";
import { RecaptchaTypes } from "components/constants";
import { isAirgapped } from "ee/utils/airgapHelpers";
import { ValidationTypes } from "constants/WidgetValidation";
import {
  BUTTON_WIDGET_DEFAULT_LABEL,
  createMessage,
} from "ee/constants/messages";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.0f2d7dae955ef71a'),
    children: [
      {
        propertyName: "text",
        label: $t('contentConfig.05ba9f6a9028696c'),
        helpText: $t('contentConfig.48df1dfda7c8b25f'),
        controlType: "INPUT_TEXT",
        placeholderText: createMessage(BUTTON_WIDGET_DEFAULT_LABEL),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.6f901dd85b97096a'),
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
    sectionName: $t('contentConfig.6e21a44c9903c662'),
    children: [
      {
        helpText: $t('contentConfig.e2d45772b8986a18'),
        propertyName: "tooltip",
        label: $t('contentConfig.74a20c3e45ddc0f7'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.8e4b9550687a008e'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "isVisible",
        label: $t('contentConfig.aa0a1e8682a39ad4'),
        helpText: $t('contentConfig.f98dda068afe190c'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.8372c4c6d1ebd462'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.0a405bd98671d743'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.4ce4ce70c0db7635'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.e1b8cd46e77f80a9'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.f1dfd8e9aa2424da'),
    hidden: isAirgapped,
    children: [
      {
        propertyName: "googleRecaptchaKey",
        label: "Google reCAPTCHA key",
        helpText: "Sets Google reCAPTCHA site key for the button",
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.963b69ab05bcfb3e'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "recaptchaType",
        label: "Google reCAPTCHA version",
        controlType: "DROP_DOWN",
        helpText: $t('contentConfig.0f965e2afb658955'),
        options: [
          {
            label: $t('contentConfig.df101b2adda22e09'),
            value: RecaptchaTypes.V3,
          },
          {
            label: $t('contentConfig.713ef3e9473994b2'),
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
];
