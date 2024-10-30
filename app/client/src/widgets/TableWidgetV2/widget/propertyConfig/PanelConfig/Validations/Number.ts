import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import {
  hideByColumnType,
  getColumnPath,
} from "widgets/TableWidgetV2/widget/propertyUtils";

export default [
  {
    helpText: $t('Number.e0fdf089a67f89db'),
    propertyName: "validation.min",
    label: $t('Number.ff092c6c372b5a28'),
    controlType: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    placeholderText: "1",
    isBindProperty: true,
    isTriggerProperty: false,
    validation: {
      type: ValidationTypes.NUMBER,
      params: { default: -Infinity },
    },
    hidden: (props: TableWidgetProps, propertyPath: string) => {
      const path = getColumnPath(propertyPath);

      return hideByColumnType(
        props,
        path,
        [ColumnTypes.NUMBER, ColumnTypes.CURRENCY],
        true,
      );
    },
    dependencies: ["primaryColumns"],
  },
  {
    helpText: $t('Number.16d0aedf51343dbc'),
    propertyName: "validation.max",
    label: $t('Number.385615313fe1c35b'),
    controlType: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    placeholderText: "100",
    isBindProperty: true,
    isTriggerProperty: false,
    validation: {
      type: ValidationTypes.NUMBER,
      params: { default: Infinity },
    },
    hidden: (props: TableWidgetProps, propertyPath: string) => {
      const path = getColumnPath(propertyPath);

      return hideByColumnType(
        props,
        path,
        [ColumnTypes.NUMBER, ColumnTypes.CURRENCY],
        true,
      );
    },
    dependencies: ["primaryColumns"],
  },
];
