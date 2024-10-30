import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  hideByColumnType,
  getColumnPath,
} from "modules/ui-builder/ui/wds/WDSTableWidget/widget/propertyUtils";

export default [
  {
    helpText: $t('Number.6fcd8e013b8e7a26'),
    propertyName: "validation.min",
    label: $t('Number.4adf65bc4fff696e'),
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
    helpText: $t('Number.3d6e7f217db706a3'),
    propertyName: "validation.max",
    label: $t('Number.4b2a708488add449'),
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
