import {$t} from "locale/index";
import { TYPOGRAPHY_VARIANTS } from "@appsmith/wds-theming";
import { ValidationTypes } from "constants/WidgetValidation";

import { fontSizeUpdateHook } from "../../helpers";

export const propertyPaneStyleConfig = [
  {
    sectionName: $t('styleConfig.34738fdb3b9a7b28'),
    children: [
      {
        propertyName: "fontSize",
        label: $t('styleConfig.24a34676e59b8f96'),
        helpText: $t('styleConfig.7c44447c46b3d756'),
        controlType: "DROP_DOWN",
        defaultValue: "body",
        options: [
          {
            label: $t('styleConfig.8ab37b61be52ed98'),
            value: "body",
          },
          {
            label: $t('styleConfig.54cd6670451931b5'),
            value: "subtitle",
          },
          {
            label: $t('styleConfig.b8ea2b7641535943'),
            value: "title",
          },
          {
            label: $t('styleConfig.5352c2dfaafbb359'),
            value: "heading",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        updateHook: fontSizeUpdateHook,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: Object.values(TYPOGRAPHY_VARIANTS),
            default: TYPOGRAPHY_VARIANTS.body,
          },
        },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.53d403d0a4b2cf2d'),
    children: [
      {
        propertyName: "textAlign",
        label: $t('styleConfig.efe83e7ca1eafc09'),
        helpText: $t('styleConfig.4bcee2152aa6528b'),
        controlType: "ICON_TABS",
        fullWidth: true,
        options: [
          {
            startIcon: "align-left",
            value: "left",
          },
          {
            startIcon: "align-center",
            value: "center",
          },
          {
            startIcon: "align-right",
            value: "right",
          },
        ],
        defaultValue: "left",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        isReusable: true,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["left", "center", "right"],
            default: "left",
          },
        },
      },
      {
        propertyName: "fontStyle",
        label: $t('styleConfig.1a979b8979193be5'),
        helpText: $t('styleConfig.38a53a9c5c3a0a3f'),
        controlType: "BUTTON_GROUP",
        options: [
          {
            icon: "text-bold",
            value: "bold",
          },
          {
            icon: "text-italic",
            value: "italic",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        isReusable: true,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
