import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";

export default [
  {
    sectionName: $t('styleConfig.bdb44b02232376c9'),
    children: [
      {
        helpText: $t('styleConfig.0cd0e3be97bae1b0'),
        propertyName: "sliderSize",
        label: $t('styleConfig.54b9dcc108e403d1'),
        controlType: "ICON_TABS",
        fullWidth: true,
        defaultValue: "m",
        options: [
          {
            label: "S",
            value: "s",
            subText: "4px",
          },
          {
            label: "M",
            value: "m",
            subText: "6px",
          },
          {
            label: "L",
            value: "l",
            subText: "8px",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.d8393d76bb67b5f7'),
    children: [
      {
        propertyName: "labelTextColor",
        label: $t('styleConfig.9844225d40a20b76'),
        helpText: $t('styleConfig.1818ac0b8508e16f'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "labelTextSize",
        label: $t('styleConfig.1d8d0a2a94431769'),
        helpText: $t('styleConfig.331c7208b340b023'),
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
        label: $t('styleConfig.06de72afaf41edca'),
        helpText: $t('styleConfig.a562919983ba1c67'),
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
    sectionName: $t('styleConfig.d2f10bd8ef095296'),
    children: [
      {
        helpText: $t('styleConfig.4b24a9498d4ee081'),
        propertyName: "accentColor",
        label: $t('styleConfig.e86d60b757446d6b'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
