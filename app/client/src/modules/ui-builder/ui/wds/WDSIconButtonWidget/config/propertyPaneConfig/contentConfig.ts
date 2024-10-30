import {$t} from "locale/index";
import { ICONS } from "@appsmith/wds";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.c892f7df776b2cb0'),
    children: [
      {
        propertyName: "iconName",
        label: $t('contentConfig.0ef27d8c0843f3ee'),
        helpText: $t('contentConfig.dbd02741fd151499'),
        controlType: "ICON_SELECT_V2",
        defaultIconName: "plus",
        hideNoneIcon: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: Object.keys(ICONS) as unknown as string[],
            default: "plus",
          },
        },
      },
      {
        helpText: $t('contentConfig.ad859263f4bea283'),
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
    sectionName: $t('contentConfig.ec0c9711f7802780'),
    children: [
      {
        helpText: $t('contentConfig.88e7b8563c396363'),
        propertyName: "tooltip",
        label: $t('contentConfig.12f032b110f08097'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.cdad260019b4e24b'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "isVisible",
        helpText: $t('contentConfig.f95e55bb3b200e7b'),
        label: $t('contentConfig.4f80a804814cfab9'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        helpText: $t('contentConfig.e4e6ab97a49bf9ec'),
        label: $t('contentConfig.82e677f0af1e10ed'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.9b9dc6cbdae98953'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.08565b63ad2777c2'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
