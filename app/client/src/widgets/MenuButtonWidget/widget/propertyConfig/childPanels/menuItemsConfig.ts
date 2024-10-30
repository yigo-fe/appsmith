import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export default {
  editableTitle: true,
  titlePropertyName: "label",
  panelIdPropertyName: "id",

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateHook: (props: any, propertyPath: string, propertyValue: string) => {
    return [
      {
        propertyPath,
        propertyValue,
      },
    ];
  },

  contentChildren: [
    {
      sectionName: $t('menuItemsConfig.32d41baeece4aafa'),
      children: [
        {
          propertyName: "label",
          helpText: $t('menuItemsConfig.25e19ca3b7a9a8e2'),
          label: $t('menuItemsConfig.37634f1a6d9a65cb'),
          controlType: "INPUT_TEXT",
          placeholderText: $t('menuItemsConfig.8cc515fee9816883'),
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.TEXT },
        },
        {
          helpText: $t('menuItemsConfig.f4bffd137df7297f'),
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
      sectionName: $t('menuItemsConfig.eb8a6c57234d0e72'),
      children: [
        {
          propertyName: "isVisible",
          helpText: $t('menuItemsConfig.4cb3c0ea5853eb27'),
          label: $t('menuItemsConfig.2effdf4952cd366a'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
        },
        {
          propertyName: "isDisabled",
          helpText: $t('menuItemsConfig.a71c090a595f8eb3'),
          label: $t('menuItemsConfig.2ec8343a441c8185'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
        },
      ],
    },
  ],

  styleChildren: [
    {
      sectionName: $t('menuItemsConfig.adc234a68dd3212e'),
      children: [
        {
          propertyName: "iconName",
          label: $t('menuItemsConfig.adc234a68dd3212e'),
          helpText: $t('menuItemsConfig.a34ced99835e5648'),
          controlType: "ICON_SELECT",
          isBindProperty: false,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.TEXT },
        },
        {
          propertyName: "iconAlign",
          label: $t('menuItemsConfig.eb38343f49b5954a'),
          helpText: $t('menuItemsConfig.bf01a784d7e0727e'),
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
          isBindProperty: false,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.TEXT },
        },
      ],
    },
    {
      sectionName: $t('menuItemsConfig.703ddcd30f559e38'),
      children: [
        {
          propertyName: "iconColor",
          helpText: $t('menuItemsConfig.ceeec52f9d73864c'),
          label: $t('menuItemsConfig.eeb11cceb7add639'),
          controlType: "COLOR_PICKER",
          isBindProperty: false,
          isTriggerProperty: false,
        },
        {
          propertyName: "textColor",
          helpText: $t('menuItemsConfig.c3444ec8b2c19ad8'),
          label: $t('menuItemsConfig.8b128a07e8fbbf2f'),
          controlType: "COLOR_PICKER",
          isBindProperty: false,
          isTriggerProperty: false,
        },
        {
          propertyName: "backgroundColor",
          helpText: $t('menuItemsConfig.c35a799b9879e319'),
          label: $t('menuItemsConfig.538cfef8f567e035'),
          controlType: "COLOR_PICKER",
          isBindProperty: false,
          isTriggerProperty: false,
        },
      ],
    },
  ],
};
