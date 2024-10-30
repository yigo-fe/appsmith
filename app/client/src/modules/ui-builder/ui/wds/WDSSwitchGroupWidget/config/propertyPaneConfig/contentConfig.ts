import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.d8a51c3c60ba9d24'),
    children: [
      {
        helpText:
          $t('contentConfig.cb7c2fd18668c2f3'),
        propertyName: "options",
        label: $t('contentConfig.0b3c381e5e997d2c'),
        controlType: "OPTION_INPUT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            default: [],
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
                      unique: true,
                    },
                  },
                  {
                    name: "value",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                      unique: true,
                    },
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        helpText: $t('contentConfig.2c2abe059a70c132'),
        propertyName: "defaultSelectedValues",
        label: $t('contentConfig.c0ab806013d1a14f'),
        placeholderText: '["BLUE", "RED"]',
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            default: [],
            children: {
              type: ValidationTypes.TEXT,
            },
            strict: true,
          },
        },
      },
      {
        helpText: $t('contentConfig.46205aee0e869925'),
        propertyName: "orientation",
        label: $t('contentConfig.d2b48bfa161d7071'),
        controlType: "ICON_TABS",
        fullWidth: true,
        options: [
          {
            label: $t('contentConfig.78a5d4de99fced20'),
            value: "horizontal",
          },
          {
            label: $t('contentConfig.9beaea4a60ef8321'),
            value: "vertical",
          },
        ],
        defaultValue: "vertical",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.a8368053e768e58f'),
        propertyName: "labelPosition",
        label: $t('contentConfig.213ea268cbfc17c9'),
        controlType: "ICON_TABS",
        fullWidth: true,
        options: [
          { label: $t('contentConfig.7745ffd34f56df6d'), value: "start" },
          { label: $t('contentConfig.d49920bfee3f5fe7'), value: "end" },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        defaultValue: "end",
      },
    ],
  },
  {
    sectionName: $t('contentConfig.88580c2163b347dc'),
    children: [
      {
        helpText: $t('contentConfig.99f9c8d5c966d340'),
        propertyName: "label",
        label: $t('contentConfig.e0784986f1d0a571'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.88580c2163b347dc'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.172cd5e6e9fdd914'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.a23ea39d29a26189'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.f8aa66a9af65c90f'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.85c4366c1b4e10bd'),
    children: [
      {
        propertyName: "isVisible",
        label: $t('contentConfig.7398011b095518ae'),
        helpText: $t('contentConfig.3f069dfc1ffa863d'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.2dd4e88a91fc84e8'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.593862a564eee882'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.cc844a551b5f37e6'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.98e8768812232f9b'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.40cc95a93b886ed6'),
    children: [
      {
        helpText: $t('contentConfig.8a7a4695df340676'),
        propertyName: "onSelectionChange",
        label: "onSelectionChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
