import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import {
  showByColumnType,
  getColumnPath,
} from "widgets/TableWidgetV2/widget/propertyUtils";

const hideColumnByType = (props: TableWidgetProps, propertyPath: string) => {
  const path = getColumnPath(propertyPath);

  return showByColumnType(
    props,
    path,
    [ColumnTypes.DATE, ColumnTypes.SELECT],
    true,
  );
};

export default [
  {
    propertyName: "validation.regex",
    helpText:
      $t('Common.51a4cecad6e38ce6'),
    label: $t('Common.862ba88fa08160d9'),
    controlType: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    dependencies: ["primaryColumns"],
    placeholderText: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$",
    isBindProperty: true,
    isTriggerProperty: false,
    validation: { type: ValidationTypes.REGEX },
    hidden: hideColumnByType,
  },
  {
    propertyName: "validation.isColumnEditableCellValid",
    helpText: $t('Common.2325082855979e57'),
    label: $t('Common.bb6e88540adff7c3'),
    controlType: "TABLE_INLINE_EDIT_VALID_PROPERTY_CONTROL",
    isJSConvertible: false,
    dependencies: ["primaryColumns", "columnOrder"],
    isBindProperty: true,
    isTriggerProperty: false,
    validation: {
      type: ValidationTypes.BOOLEAN,
      params: {
        default: true,
      },
    },
    hidden: hideColumnByType,
  },
  {
    propertyName: "validation.errorMessage",
    helpText:
      $t('Common.13278fd01158964b'),
    label: $t('Common.440d1c6d6c3af631'),
    controlType: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    dependencies: ["primaryColumns"],
    placeholderText: $t('Common.91b3f1492812da83'),
    isBindProperty: true,
    isTriggerProperty: false,
    validation: { type: ValidationTypes.TEXT },
    hidden: hideColumnByType,
  },
  {
    propertyName: "validation.isColumnEditableCellRequired",
    helpText: $t('Common.90fb772de0277222'),
    label: $t('Common.9ac99182caaa0d0f'),
    controlType: "SWITCH",
    dependencies: ["primaryColumns"],
    customJSControl: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    isJSConvertible: true,
    isBindProperty: true,
    isTriggerProperty: false,
    validation: { type: ValidationTypes.BOOLEAN },
  },
];
