import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { get } from "lodash";
import {
  getBasePropertyPath,
  hideByColumnType,
  updateColumnLevelEditability,
  updateColumnOrderWhenFrozen,
  updateInlineEditingOptionDropdownVisibilityHook,
} from "../../propertyUtils";
import { isColumnTypeEditable } from "../../utilities";
import { composePropertyUpdateHook } from "widgets/WidgetUtils";
import { ButtonVariantTypes } from "components/constants";
import { StickyType } from "widgets/TableWidgetV2/component/Constants";

export default {
  sectionName: $t('General.ff801f2727d14845'),
  children: [
    {
      propertyName: "isCellVisible",
      dependencies: ["primaryColumns", "columnType"],
      label: $t('General.9c81ae3c6880328c'),
      helpText: $t('General.84cda17f5f9f62c4'),
      defaultValue: true,
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
    },
    {
      propertyName: "isDisabled",
      label: $t('General.7a2ad95a6ead1d1f'),
      helpText: $t('General.3cac38ccbe7f0766'),
      defaultValue: false,
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
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.ICON_BUTTON,
          ColumnTypes.MENU_BUTTON,
          ColumnTypes.BUTTON,
        ]);
      },
    },
    {
      propertyName: "isCompact",
      helpText: $t('General.6237b2385d6a1f19'),
      label: $t('General.43f61c6705f35c23'),
      controlType: "SWITCH",
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      isTriggerProperty: false,
      dependencies: ["primaryColumns", "columnOrder"],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.MENU_BUTTON]);
      },
    },
    {
      propertyName: "allowCellWrapping",
      dependencies: ["primaryColumns", "columnType"],
      label: $t('General.129d8247a6523d7b'),
      helpText: $t('General.0f414c9b8f6bd326'),
      defaultValue: false,
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
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.TEXT,
          ColumnTypes.NUMBER,
          ColumnTypes.URL,
        ]);
      },
    },
    {
      propertyName: "isCellEditable",
      dependencies: [
        "primaryColumns",
        "columnOrder",
        "columnType",
        "childStylesheet",
        "inlineEditingSaveOption",
      ],
      label: $t('General.62b7a23a45fda8a7'),
      helpText: $t('General.86abe8b10fa67f3e'),
      defaultValue: false,
      controlType: "SWITCH",
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      updateHook: composePropertyUpdateHook([
        updateColumnLevelEditability,
        updateInlineEditingOptionDropdownVisibilityHook,
      ]),
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");
        const isDerived = get(props, `${baseProperty}.isDerived`, false);

        return !isColumnTypeEditable(columnType) || isDerived;
      },
    },
    {
      propertyName: "sticky",
      helpText:
        $t('General.b11718a7f58f5e8e'),
      controlType: "ICON_TABS",
      defaultValue: StickyType.NONE,
      label: $t('General.4491b4bc269f592f'),
      fullWidth: true,
      isBindProperty: true,
      isTriggerProperty: false,
      dependencies: ["primaryColumns", "columnOrder"],
      options: [
        {
          startIcon: "contract-left-line",
          value: StickyType.LEFT,
        },
        {
          startIcon: "column-freeze",
          value: StickyType.NONE,
        },
        {
          startIcon: "contract-right-line",
          value: StickyType.RIGHT,
        },
      ],
      updateHook: updateColumnOrderWhenFrozen,
    },
  ],
};

export const GeneralStyle = {
  sectionName: $t('General.ff801f2727d14845'),
  children: [
    {
      propertyName: "buttonVariant",
      label: $t('General.985ef5b56cbab8e6'),
      controlType: "ICON_TABS",
      fullWidth: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      helpText: $t('General.b90cb9beb9788090'),
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.ICON_BUTTON,
          ColumnTypes.BUTTON,
        ]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      options: [
        {
          label: $t('General.7b5756104187ec6f'),
          value: ButtonVariantTypes.PRIMARY,
        },
        {
          label: $t('General.dc00da1b3180d51b'),
          value: ButtonVariantTypes.SECONDARY,
        },
        {
          label: $t('General.e5fcbd4febbe11a4'),
          value: ButtonVariantTypes.TERTIARY,
        },
      ],
      defaultValue: ButtonVariantTypes.PRIMARY,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            default: ButtonVariantTypes.PRIMARY,
            allowedValues: [
              ButtonVariantTypes.PRIMARY,
              ButtonVariantTypes.SECONDARY,
              ButtonVariantTypes.TERTIARY,
            ],
          },
        },
      },
    },
    {
      propertyName: "menuVariant",
      label: $t('General.985ef5b56cbab8e6'),
      controlType: "ICON_TABS",
      fullWidth: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      helpText: $t('General.a0c771e071eb5d70'),
      options: [
        {
          label: $t('General.7b5756104187ec6f'),
          value: ButtonVariantTypes.PRIMARY,
        },
        {
          label: $t('General.dc00da1b3180d51b'),
          value: ButtonVariantTypes.SECONDARY,
        },
        {
          label: $t('General.e5fcbd4febbe11a4'),
          value: ButtonVariantTypes.TERTIARY,
        },
      ],
      isJSConvertible: true,
      dependencies: ["primaryColumns", "columnOrder"],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.MENU_BUTTON]);
      },
      isBindProperty: true,
      isTriggerProperty: false,
      defaultValue: ButtonVariantTypes.PRIMARY,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            default: ButtonVariantTypes.PRIMARY,
            allowedValues: [
              ButtonVariantTypes.PRIMARY,
              ButtonVariantTypes.SECONDARY,
              ButtonVariantTypes.TERTIARY,
            ],
          },
        },
      },
    },
    {
      propertyName: "imageSize",
      dependencies: ["primaryColumns", "columnType"],
      label: $t('General.337a099900e35a97'),
      helpText: $t('General.ba996d66b5e05596'),
      defaultValue: "DEFAULT",
      controlType: "ICON_TABS",
      fullWidth: true,
      options: [
        {
          label: $t('General.89231e75dbd21b4f'),
          value: "DEFAULT",
        },
        {
          label: $t('General.97c6c73f767eb28f'),
          value: "MEDIUM",
        },
        {
          label: $t('General.30ef4966fd98d69c'),
          value: "LARGE",
        },
      ],
      isBindProperty: false,
      isTriggerProperty: false,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.IMAGE]);
      },
    },
  ],
};
