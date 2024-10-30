import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.81a1583f3e0cd27c'),
    children: [
      {
        propertyName: "label",
        label: $t('contentConfig.06a161ae57736c91'),
        controlType: "INPUT_TEXT",
        helpText: $t('contentConfig.3c659f29e22e024e'),
        placeholderText: $t('contentConfig.81a1583f3e0cd27c'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.cf8149c7c380acba'),
        propertyName: "labelPosition",
        label: $t('contentConfig.69508db039d91281'),
        controlType: "ICON_TABS",
        fullWidth: true,
        options: [
          { label: $t('contentConfig.c9c22a5a4e3b5c7a'), value: "start" },
          { label: $t('contentConfig.aa77b0f62a3d00e8'), value: "end" },
        ],
        defaultValue: "left",
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.3fec7e19562c2c69'),
    children: [
      {
        propertyName: "defaultSwitchState",
        label: $t('contentConfig.6738cfeb73bd3b8b'),
        helpText:
          $t('contentConfig.4613ded5d416e598'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isVisible",
        label: $t('contentConfig.d4952c1b4f110298'),
        helpText: $t('contentConfig.c5e5b00dda376af9'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.40bff27e5170a7e9'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.3144e2146819696e'),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.797c2d1cf42492df'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.1d51f463534b9389'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.c158ee5acbba5848'),
    children: [
      {
        helpText: $t('contentConfig.27383d0f58c18868'),
        propertyName: "onChange",
        label: "onChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
