import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { MenuButtonWidgetProps } from "../../../constants";
import { ICON_NAMES } from "../../../constants";
import { getKeysFromSourceDataForEventAutocomplete } from "../../helper";

export default {
  editableTitle: false,
  titlePropertyName: "label",
  panelIdPropertyName: "id",
  contentChildren: [
    {
      sectionName: $t('configureMenuItemsConfig.e3035967c12e488e'),
      children: [
        {
          propertyName: "label",
          helpText:
            $t('configureMenuItemsConfig.f033515b695941f4'),
          label: $t('configureMenuItemsConfig.b39d40cfdad518de'),
          controlType: "MENU_BUTTON_DYNAMIC_ITEMS",
          placeholderText: "{{currentItem.name}}",
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.TEXT,
            },
          },
          evaluatedDependencies: ["sourceData"],
        },
        {
          propertyName: "isVisible",
          helpText:
            $t('configureMenuItemsConfig.1176df3ee1d13638'),
          label: $t('configureMenuItemsConfig.038fa95ab9e1d2c6'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["sourceData"],
        },
        {
          propertyName: "isDisabled",
          helpText:
            $t('configureMenuItemsConfig.ee5898b9cb1e2cab'),
          label: $t('configureMenuItemsConfig.3b2be6f0ab968649'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["sourceData"],
        },
      ],
    },
    {
      sectionName: $t('configureMenuItemsConfig.82f6560668313a5e'),
      children: [
        {
          helpText:
            "when the menu item is clicked. Can also be configured the using {{currentItem}} binding.",
          propertyName: "onClick",
          label: "onClick",
          controlType: "ACTION_SELECTOR",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: true,
          additionalAutoComplete: (props: MenuButtonWidgetProps) => {
            return getKeysFromSourceDataForEventAutocomplete(
              props?.__evaluation__?.evaluatedValues?.sourceData,
            );
          },
          evaluatedDependencies: ["sourceData"],
        },
      ],
    },
  ],
  styleChildren: [
    {
      sectionName: $t('configureMenuItemsConfig.311eb5cbcb4e7ff7'),
      children: [
        {
          propertyName: "iconName",
          label: $t('configureMenuItemsConfig.311eb5cbcb4e7ff7'),
          helpText:
            $t('configureMenuItemsConfig.c9fad41eb0b144fd'),
          controlType: "ICON_SELECT",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ICON_NAMES,
              },
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["sourceData"],
        },
        {
          propertyName: "iconAlign",
          label: $t('configureMenuItemsConfig.7dc425f0fc6ffc18'),
          helpText:
            $t('configureMenuItemsConfig.00946c633e9cf42e'),
          controlType: "ICON_TABS",
          defaultValue: "left",
          fullWidth: false,
          options: [
            {
              startIcon: "skip-left-line",
              value: "left",
            },
            {
              startIcon: "skip-right-line",
              value: "right",
            },
          ],
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["center", "left", "right"],
              },
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["sourceData"],
        },
      ],
    },
    {
      sectionName: $t('configureMenuItemsConfig.a45382535034dc7a'),
      children: [
        {
          propertyName: "iconColor",
          helpText:
            $t('configureMenuItemsConfig.fe36381c0735e6ba'),
          label: $t('configureMenuItemsConfig.2592498eab0dbf75'),
          controlType: "COLOR_PICKER",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["sourceData"],
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.TEXT,
              regex: /^(?![<|{{]).+/,
            },
          },
        },
        {
          propertyName: "backgroundColor",
          helpText:
            $t('configureMenuItemsConfig.0b05f7b1414f81c4'),
          label: $t('configureMenuItemsConfig.713461af1f79a220'),
          controlType: "COLOR_PICKER",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["sourceData"],
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.TEXT,
              regex: /^(?![<|{{]).+/,
            },
          },
        },
        {
          propertyName: "textColor",
          helpText:
            $t('configureMenuItemsConfig.e9de40a2afadb655'),
          label: $t('configureMenuItemsConfig.1c7ca9a097176737'),
          controlType: "COLOR_PICKER",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["sourceData"],
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.TEXT,
              regex: /^(?![<|{{]).+/,
            },
          },
        },
      ],
    },
  ],
};
