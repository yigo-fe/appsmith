import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { hideByColumnType, showByColumnType } from "../../propertyUtils";

export default {
  sectionName: $t('TextFormatting.bf75ea56a1778172'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    return showByColumnType(
      props,
      propertyPath,
      [ColumnTypes.CHECKBOX, ColumnTypes.SWITCH],
      true,
    );
  },
  children: [
    {
      propertyName: "textSize",
      label: $t('TextFormatting.caa80ec731074348'),
      helpText: $t('TextFormatting.c2eb16f627918088'),
      controlType: "DROP_DOWN",
      isJSConvertible: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      options: [
        {
          label: "S",
          value: "0.875rem",
          subText: "0.875rem",
        },
        {
          label: "M",
          value: "1rem",
          subText: "1rem",
        },
        {
          label: "L",
          value: "1.25rem",
          subText: "1.25rem",
        },
        {
          label: "XL",
          value: "1.875rem",
          subText: "1.875rem",
        },
      ],
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
        },
      },
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
    {
      propertyName: "fontStyle",
      label: $t('TextFormatting.0ad73c46cc1cf26f'),
      helpText: $t('TextFormatting.45085207dda3118d'),
      controlType: "BUTTON_GROUP",
      options: [
        {
          icon: "text-bold",
          value: "BOLD",
        },
        {
          icon: "text-italic",
          value: "ITALIC",
        },
        {
          icon: "text-underline",
          value: "UNDERLINE",
        },
      ],
      isJSConvertible: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
        },
      },
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
    {
      propertyName: "horizontalAlignment",
      label: $t('TextFormatting.f2a9bb395fb48bdb'),
      helpText: $t('TextFormatting.413fdff4f2ca40ac'),
      controlType: "ICON_TABS",
      fullWidth: true,
      options: [
        {
          startIcon: "align-left",
          value: "LEFT",
        },
        {
          startIcon: "align-center",
          value: "CENTER",
        },
        {
          startIcon: "align-right",
          value: "RIGHT",
        },
      ],
      defaultValue: "LEFT",
      isJSConvertible: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["LEFT", "CENTER", "RIGHT"],
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
          ColumnTypes.CHECKBOX,
          ColumnTypes.SWITCH,
        ]);
      },
    },
    {
      propertyName: "verticalAlignment",
      label: $t('TextFormatting.0a7698e5fc254618'),
      helpText: $t('TextFormatting.44a6e40b46fe2ae5'),
      controlType: "ICON_TABS",
      fullWidth: true,
      options: [
        {
          startIcon: "vertical-align-top",
          value: "TOP",
        },
        {
          startIcon: "vertical-align-middle",
          value: "CENTER",
        },
        {
          startIcon: "vertical-align-bottom",
          value: "BOTTOM",
        },
      ],
      defaultValue: "CENTER",
      isJSConvertible: true,
      customJSControl: "TABLE_COMPUTE_VALUE",
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["TOP", "CENTER", "BOTTOM"],
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
          ColumnTypes.CHECKBOX,
          ColumnTypes.SWITCH,
        ]);
      },
    },
  ],
};
