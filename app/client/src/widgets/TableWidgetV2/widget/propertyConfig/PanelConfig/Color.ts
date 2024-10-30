import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { hideByColumnType } from "../../propertyUtils";

export default {
  sectionName: $t('Color.c9f78f5185765bc9'),
  children: [
    {
      propertyName: "buttonColor",
      label: $t('Color.10257691b89298ee'),
      controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
      helpText: $t('Color.1ab123fb1d1423ce'),
      isJSConvertible: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.BUTTON,
          ColumnTypes.ICON_BUTTON,
        ]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            regex: /^(?![<|{{]).+/,
          },
        },
      },
      isTriggerProperty: false,
    },
    {
      propertyName: "menuColor",
      helpText: $t('Color.b81f22e7b376e568'),
      label: $t('Color.10257691b89298ee'),
      controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            regex: /^(?![<|{{]).+/,
          },
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.MENU_BUTTON]);
      },
      dependencies: ["primaryColumns", "columnOrder", "childStylesheet"],
    },
    {
      propertyName: "cellBackground",
      label: $t('Color.d638cb455a7e8044'),
      helpText: $t('Color.c81c6445ad041d6b'),
      controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
      isJSConvertible: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            regex: /^(?![<|{{]).+/,
          },
        },
      },
      isTriggerProperty: false,
    },
    {
      propertyName: "textColor",
      label: $t('Color.0c521e16b39ba390'),
      helpText: $t('Color.6e69fa0bc59714f7'),
      controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
      isJSConvertible: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            regex: /^(?![<|{{]).+/,
          },
        },
      },
      isTriggerProperty: false,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.TEXT,
          ColumnTypes.DATE,
          ColumnTypes.NUMBER,
          ColumnTypes.CURRENCY,
          ColumnTypes.URL,
        ]);
      },
    },
  ],
};
