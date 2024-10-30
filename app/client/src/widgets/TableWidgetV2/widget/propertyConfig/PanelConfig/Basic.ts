import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes, ICON_NAMES } from "widgets/TableWidgetV2/constants";
import {
  hideByColumnType,
  hideByMenuItemsSource,
  hideIfMenuItemsSourceDataIsFalsy,
  updateIconAlignment,
  updateMenuItemsSource,
} from "../../propertyUtils";
import { IconNames } from "@blueprintjs/icons";
import { MenuItemsSource } from "widgets/MenuButtonWidget/constants";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import configureMenuItemsConfig from "./childPanels/configureMenuItemsConfig";

export default {
  sectionName: $t('Basic.0acd0536fac2ee4a'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    return hideByColumnType(
      props,
      propertyPath,
      [ColumnTypes.BUTTON, ColumnTypes.ICON_BUTTON, ColumnTypes.MENU_BUTTON],
      true,
    );
  },
  children: [
    {
      propertyName: "iconName",
      label: $t('Basic.e8a6c720d431f3ce'),
      helpText: $t('Basic.35f271899628f353'),
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.ICON_BUTTON]);
      },
      updateHook: updateIconAlignment,
      dependencies: ["primaryColumns", "columnOrder"],
      controlType: "ICON_SELECT",
      customJSControl: "TABLE_COMPUTE_VALUE",
      defaultIconName: "add",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ICON_NAMES,
            default: IconNames.ADD,
          },
        },
      },
    },
    {
      propertyName: "buttonLabel",
      label: $t('Basic.f188fee402adfa87'),
      helpText: $t('Basic.82ddb98a5dcb4a9c'),
      controlType: "TABLE_COMPUTE_VALUE",
      defaultValue: "Action",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.BUTTON]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
    },
    {
      propertyName: "menuButtonLabel",
      label: $t('Basic.f188fee402adfa87'),
      helpText: $t('Basic.82ddb98a5dcb4a9c'),
      controlType: "TABLE_COMPUTE_VALUE",
      defaultValue: "Open Menu",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.MENU_BUTTON]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
    },
    {
      propertyName: "menuItemsSource",
      helpText: $t('Basic.855b126d7d44617e'),
      label: $t('Basic.02bf6ccff2d34344'),
      controlType: "ICON_TABS",
      fullWidth: true,
      defaultValue: MenuItemsSource.STATIC,
      options: [
        {
          label: $t('Basic.832cf3030b092d7c'),
          value: MenuItemsSource.STATIC,
        },
        {
          label: $t('Basic.23d255b2cdfa9aa4'),
          value: MenuItemsSource.DYNAMIC,
        },
      ],
      isJSConvertible: false,
      isBindProperty: false,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.TEXT },
      updateHook: updateMenuItemsSource,
      dependencies: [
        "primaryColumns",
        "columnOrder",
        "sourceData",
        "configureMenuItems",
      ],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(
          props,
          propertyPath,
          [ColumnTypes.MENU_BUTTON],
          false,
        );
      },
    },
    {
      helpText: $t('Basic.69c7cd293145fb38'),
      propertyName: "sourceData",
      label: $t('Basic.743bcc3e322d59aa'),
      controlType: "TABLE_COMPUTE_VALUE",
      placeholderText: "{{Query1.data}}",
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY,
        params: {
          required: true,
          default: [],
          children: {
            type: ValidationTypes.ARRAY,
            params: {
              required: true,
              default: [],
              children: {
                type: ValidationTypes.UNION,
                params: {
                  required: true,
                  types: [
                    {
                      type: ValidationTypes.TEXT,
                      params: {
                        required: true,
                      },
                    },
                    {
                      type: ValidationTypes.NUMBER,
                      params: {
                        required: true,
                      },
                    },
                    {
                      type: ValidationTypes.OBJECT,
                      params: {
                        required: true,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return (
          hideByColumnType(
            props,
            propertyPath,
            [ColumnTypes.MENU_BUTTON],
            false,
          ) ||
          hideByMenuItemsSource(props, propertyPath, MenuItemsSource.STATIC)
        );
      },
      dependencies: ["primaryColumns", "columnOrder", "menuItemsSource"],
    },
    {
      helpText: $t('Basic.4d97514ca0242561'),
      propertyName: "configureMenuItems",
      controlType: "OPEN_CONFIG_PANEL",
      buttonConfig: {
        label: $t('Basic.48107f551b8d75c2'),
        icon: "settings-2-line",
      },
      label: $t('Basic.7828106852c69bde'),
      isBindProperty: false,
      isTriggerProperty: false,
      hidden: (props: TableWidgetProps, propertyPath: string) =>
        hideByColumnType(
          props,
          propertyPath,
          [ColumnTypes.MENU_BUTTON],
          false,
        ) ||
        hideIfMenuItemsSourceDataIsFalsy(props, propertyPath) ||
        hideByMenuItemsSource(props, propertyPath, MenuItemsSource.STATIC),
      dependencies: [
        "primaryColumns",
        "columnOrder",
        "menuItemsSource",
        "sourceData",
      ],
      panelConfig: configureMenuItemsConfig,
    },
    {
      helpText: $t('Basic.38187cd2c8cf31e6'),
      propertyName: "menuItems",
      controlType: "MENU_ITEMS",
      label: $t('Basic.38187cd2c8cf31e6'),
      isBindProperty: false,
      isTriggerProperty: false,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return (
          hideByColumnType(
            props,
            propertyPath,
            [ColumnTypes.MENU_BUTTON],
            false,
          ) ||
          hideByMenuItemsSource(props, propertyPath, MenuItemsSource.DYNAMIC)
        );
      },
      dependencies: ["primaryColumns", "columnOrder"],
      panelConfig: {
        editableTitle: true,
        titlePropertyName: "label",
        panelIdPropertyName: "id",
        dependencies: ["primaryColumns", "columnOrder"],
        contentChildren: [
          {
            sectionName: $t('Basic.0acd0536fac2ee4a'),
            children: [
              {
                propertyName: "label",
                helpText: $t('Basic.dd5bf220b2cb5c82'),
                label: $t('Basic.f188fee402adfa87'),
                controlType: "INPUT_TEXT",
                placeholderText: $t('Basic.e27e4942cf7cff5d'),
                isBindProperty: true,
                isTriggerProperty: false,
                validation: { type: ValidationTypes.TEXT },
                dependencies: ["primaryColumns", "columnOrder"],
              },
              {
                helpText: $t('Basic.80c104a40d13e3f7'),
                propertyName: "onClick",
                label: "onClick",
                controlType: "ACTION_SELECTOR",
                isJSConvertible: true,
                isBindProperty: true,
                isTriggerProperty: true,
                dependencies: ["primaryColumns", "columnOrder"],
              },
            ],
          },
          {
            sectionName: $t('Basic.4d6fe407d56fd86d'),
            children: [
              {
                propertyName: "isVisible",
                helpText: $t('Basic.744416b58418c8ac'),
                label: $t('Basic.e8251bfdfadda29b'),
                controlType: "SWITCH",
                customJSControl: "TABLE_COMPUTE_VALUE",
                isJSConvertible: true,
                isBindProperty: true,
                isTriggerProperty: false,
                validation: {
                  type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                  params: {
                    type: ValidationTypes.BOOLEAN,
                  },
                },
                dependencies: ["primaryColumns", "columnOrder"],
              },
              {
                propertyName: "isDisabled",
                helpText: $t('Basic.df63cd7273940aea'),
                label: $t('Basic.a69dfb27303e5385'),
                controlType: "SWITCH",
                customJSControl: "TABLE_COMPUTE_VALUE",
                isJSConvertible: true,
                isBindProperty: true,
                isTriggerProperty: false,
                validation: {
                  type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                  params: {
                    type: ValidationTypes.BOOLEAN,
                  },
                },
                dependencies: ["primaryColumns", "columnOrder"],
              },
            ],
          },
        ],
        styleChildren: [
          {
            sectionName: $t('Basic.e8a6c720d431f3ce'),
            children: [
              {
                propertyName: "iconName",
                label: $t('Basic.e8a6c720d431f3ce'),
                helpText: $t('Basic.d8e322718a1c46f0'),
                controlType: "ICON_SELECT",
                isBindProperty: false,
                isTriggerProperty: false,
                validation: { type: ValidationTypes.TEXT },
                dependencies: ["primaryColumns", "columnOrder"],
              },
              {
                propertyName: "iconAlign",
                label: $t('Basic.d2bc4e0ebe579f06'),
                helpText: $t('Basic.193044b070f7c761'),
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
                dependencies: ["primaryColumns", "columnOrder"],
              },
            ],
          },
          {
            sectionName: $t('Basic.dada81cce58487cd'),
            children: [
              {
                propertyName: "textColor",
                helpText: $t('Basic.9021917d1b15cdc1'),
                label: $t('Basic.48b76e603676d3b9'),
                controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
                customJSControl: "TABLE_COMPUTE_VALUE",
                isJSConvertible: true,
                isBindProperty: true,
                isTriggerProperty: false,
                dependencies: ["primaryColumns", "columnOrder"],
                validation: {
                  type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                  params: {
                    type: ValidationTypes.TEXT,
                    params: {
                      regex: /^(?![<|{{]).+/,
                    },
                  },
                },
              },
              {
                propertyName: "backgroundColor",
                helpText: $t('Basic.eb384576444cbde4'),
                label: $t('Basic.a7952d6c7d3a6897'),
                controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
                customJSControl: "TABLE_COMPUTE_VALUE",
                isJSConvertible: true,
                isBindProperty: true,
                isTriggerProperty: false,
                dependencies: ["primaryColumns", "columnOrder"],
                validation: {
                  type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                  params: {
                    type: ValidationTypes.TEXT,
                    params: {
                      regex: /^(?![<|{{]).+/,
                    },
                  },
                },
              },
              {
                propertyName: "iconColor",
                helpText: $t('Basic.cce056eb23d64f65'),
                label: $t('Basic.2392f61da422b130'),
                controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
                isBindProperty: false,
                isTriggerProperty: false,
                dependencies: ["primaryColumns", "columnOrder"],
              },
            ],
          },
        ],
      },
    },
    {
      helpText: $t('Basic.1b415c812e057e51'),
      propertyName: "onClick",
      label: "onClick",
      controlType: "ACTION_SELECTOR",
      additionalAutoComplete: (props: TableWidgetProps) => ({
        currentRow: Object.assign(
          {},
          ...Object.keys(props.primaryColumns).map((key) => ({
            [key]: "",
          })),
        ),
      }),
      isJSConvertible: true,
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: true,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.BUTTON,
          ColumnTypes.ICON_BUTTON,
        ]);
      },
    },
  ],
};
