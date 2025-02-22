import {$t} from "locale/index";
import {
  BUTTON_WIDGET_DEFAULT_LABEL,
  createMessage,
} from "ee/constants/messages";
import { ValidationTypes } from "constants/WidgetValidation";

/**
 * This is for the configuration of menu items when
 * the menuItemsSource is static.
 */
export const menuItemsConfig = {
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
      sectionName: $t('menuItemsConfig.c71fb8696dd552c6'),
      children: [
        {
          propertyName: "label",
          helpText: $t('menuItemsConfig.7a28f27b57f30fc3'),
          label: $t('menuItemsConfig.8c4dabaa7b654d46'),
          controlType: "INPUT_TEXT",
          placeholderText: createMessage(BUTTON_WIDGET_DEFAULT_LABEL),
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.TEXT },
        },
        {
          propertyName: "isVisible",
          helpText: $t('menuItemsConfig.82361b44480e95a5'),
          label: $t('menuItemsConfig.947dc3a1e9cc75d5'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
        },
        {
          propertyName: "isDisabled",
          helpText: $t('menuItemsConfig.03960ca5cc11f429'),
          label: $t('menuItemsConfig.0ac18b7a40ccc04b'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
        },
      ],
    },
    {
      sectionName: $t('menuItemsConfig.15a1f99be9eb0669'),
      children: [
        {
          helpText: $t('menuItemsConfig.ee45101f31d1e6cb'),
          propertyName: "onClick",
          label: "onClick",
          controlType: "ACTION_SELECTOR",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: true,
        },
      ],
    },
  ],
  styleChildren: [
    // TODO - Uncomment once we have
    // 1. polished the fundamentals of WDS - https://theappsmith.slack.com/archives/C04P60V0VQE/p1701435055352789?thread_ts=1701429043.543219&cid=C04P60V0VQE
    // 2. added icon support in the Item component - https://theappsmith.slack.com/archives/C04P60V0VQE/p1701764785966839?thread_ts=1701071080.561509&cid=C04P60V0VQE
    //   {
    //     sectionName: "Icon",
    //     children: [
    //       {
    //         propertyName: "iconName",
    //         label: "Icon",
    //         helpText: "Sets the icon to be used for a menu item",
    //         controlType: "ICON_SELECT",
    //         isBindProperty: false,
    //         isTriggerProperty: false,
    //         validation: {
    //           type: ValidationTypes.TEXT,
    //           params: {
    //             allowedValues: ICON_NAMES,
    //           },
    //         },
    //       },
    //       {
    //         propertyName: "iconAlign",
    //         label: "Position",
    //         helpText: "Sets the icon alignment of a menu item",
    //         controlType: "ICON_TABS",
    //         fullWidth: false,
    //         options: [
    //           {
    //             startIcon: "skip-left-line",
    //             value: "start",
    //           },
    //           {
    //             startIcon: "skip-right-line",
    //             value: "end",
    //           },
    //         ],
    //         isBindProperty: false,
    //         isTriggerProperty: false,
    //         validation: {
    //           type: ValidationTypes.TEXT,
    //           allowedValues: ["start", "end"],
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     sectionName: "Color",
    //     children: [
    //       {
    //         propertyName: "textColor",
    //         label: "Text Color",
    //         helpText: "Controls the color of the text displayed",
    //         controlType: "DROP_DOWN",
    //         defaultValue: "neutral",
    //         options: [
    //           {
    //             label: "Accent",
    //             value: "accent",
    //           },
    //           {
    //             label: "Neutral",
    //             value: "neutral",
    //           },
    //           {
    //             label: "Positive",
    //             value: "positive",
    //           },
    //           {
    //             label: "Negative",
    //             value: "negative",
    //           },
    //           {
    //             label: "Warning",
    //             value: "warning",
    //           },
    //         ],
    //         isJSConvertible: true,
    //         isBindProperty: true,
    //         isTriggerProperty: false,
    //         validation: {
    //           type: ValidationTypes.TEXT,
    //           params: {
    //             allowedValues: Object.values(COLORS),
    //             default: COLORS.neutral,
    //           },
    //         },
    //       },
    //     ],
    //   },
  ],
};
