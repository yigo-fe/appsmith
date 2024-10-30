import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.f17927bd6453de00'),
    children: [
      {
        propertyName: "label",
        label: $t('contentConfig.b98a68c70309fef2'),
        controlType: "INPUT_TEXT",
        helpText: $t('contentConfig.b549866838109691'),
        placeholderText: $t('contentConfig.f17927bd6453de00'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.ac969234f7fe2377'),
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.d8afa550b803c350'),
        helpText: $t('contentConfig.66641512abc62467'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.fdee062c5fa1b075'),
    children: [
      {
        propertyName: "defaultCheckedState",
        label: $t('contentConfig.694a62e6bdc0ddf9'),
        helpText: $t('contentConfig.c9b720b70e507881'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isVisible",
        label: $t('contentConfig.67bb9cec65535191'),
        helpText: $t('contentConfig.03de27ed28e2b2d4'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.c155873ac13f0db7'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.6d27fafade45d871'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.7b6b97c3f831a0d6'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.1501803500f314a6'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.77e1fbf7029b35a3'),
    children: [
      {
        helpText: $t('contentConfig.f6c9ccabbe5c7cd8'),
        propertyName: "onCheckChange",
        label: "onCheckChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
