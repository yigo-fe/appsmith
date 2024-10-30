import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

import { isReadOnlyUpdateHook } from "../helpers";
import type { BaseInputWidgetProps } from "../widget/types";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.a104d842c2c86097'),
    children: [
      {
        helpText: $t('contentConfig.41fda92eee35d363'),
        propertyName: "label",
        label: $t('contentConfig.910bd1357a5c345a'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.a104d842c2c86097'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.73ae6e8af233868c'),
    children: [
      {
        helpText:
          $t('contentConfig.905f3d6d174e2b85'),
        propertyName: "regex",
        label: $t('contentConfig.c27f7108fa2c80b6'),
        controlType: "INPUT_TEXT",
        placeholderText: "^\\w+@[a-zA-Z_]$",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.REGEX },
      },
      {
        helpText: $t('contentConfig.d1198aada5418387'),
        propertyName: "validation",
        label: $t('contentConfig.75abd450e061f65b'),
        controlType: "INPUT_TEXT",
        placeholderText: "{{ Input1.isValid }}",
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
          $t('contentConfig.dfc4845ee9bb4923'),
        propertyName: "errorMessage",
        label: $t('contentConfig.6fa71f8974c08a7d'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.d21efaad42b885eb'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.7a1243c1e36d557a'),
    children: [
      {
        helpText: $t('contentConfig.59b2f91ca6fb4163'),
        propertyName: "tooltip",
        label: $t('contentConfig.a558addb45140570'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.cbc11ecf5e9440e5'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: BaseInputWidgetProps) => {
          return Boolean(props.isReadOnly);
        },
      },
      {
        helpText: $t('contentConfig.47374b78328d097b'),
        propertyName: "placeholderText",
        label: $t('contentConfig.f5ac6aa1ac5287c7'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.ce50baf0d5aa784b'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: BaseInputWidgetProps) => {
          return Boolean(props.isReadOnly);
        },
      },
      {
        helpText: $t('contentConfig.df8b538f07db1baf'),
        propertyName: "isVisible",
        label: $t('contentConfig.0cafd30801ee3bc7'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('contentConfig.ad90691cdc7bca62'),
        propertyName: "isDisabled",
        label: $t('contentConfig.b455fb41c8b43ed8'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (props: BaseInputWidgetProps) => {
          return Boolean(props.isReadOnly);
        },
      },
      {
        helpText:
          $t('contentConfig.03f71b69ac917db0'),
        propertyName: "isReadOnly",
        label: $t('contentConfig.7be93588ee2bb987'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        dependencies: ["type", "inputType"],
        updateHook: isReadOnlyUpdateHook,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.a608df2519104f9f'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.636c5021313c113e'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('contentConfig.435fa4087cc89125'),
        propertyName: "autoFocus",
        label: $t('contentConfig.c972ddb184c438f0'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (props: BaseInputWidgetProps) => {
          return Boolean(props.isReadOnly);
        },
      },
      {
        propertyName: "allowFormatting",
        label: $t('contentConfig.b8b3555f757a1c36'),
        helpText: $t('contentConfig.c597f889bcb631a0'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (props: BaseInputWidgetProps) => {
          return props.type !== "PHONE_INPUT_WIDGET";
        },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.a273f3674f0cc0dd'),
    hidden: (props: BaseInputWidgetProps) => {
      return Boolean(props.isReadOnly);
    },
    children: [
      {
        helpText: $t('contentConfig.959de05b9b258d0a'),
        propertyName: "onTextChanged",
        label: "onTextChanged",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        helpText: $t('contentConfig.3a5c34d2de004532'),
        propertyName: "onFocus",
        label: "onFocus",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        helpText: $t('contentConfig.d02e2928817b82a2'),
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
        helpText: $t('contentConfig.e8f948b3721ec797'),
        propertyName: "resetOnSubmit",
        label: $t('contentConfig.29fc83c03bd301bd'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
