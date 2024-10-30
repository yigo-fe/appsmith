import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.909e9ad94878298f'),
    children: [
      {
        propertyName: "text",
        helpText: $t('contentConfig.48f70ac39f836cb6'),
        label: $t('contentConfig.6f9b00d5fbe37932'),
        controlType: "INPUT_TEXT",
        placeholderText:
          $t('contentConfig.30c3255c77e89072'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: { limitLineBreaks: true },
        },
      },
      {
        propertyName: "lineClamp",
        helpText: $t('contentConfig.8126b022b8e1450f'),
        label: $t('contentConfig.d5fcd6baa984b72c'),
        controlType: "INPUT_TEXT",
        placeholderText: "unlimited",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            min: 1,
          },
        },
      },
      {
        propertyName: "isVisible",
        helpText: $t('contentConfig.c14caa82af8f8beb'),
        label: $t('contentConfig.15ac980e08244065'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.f94454e89b67a74a'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.442f7fd36dade0bf'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
