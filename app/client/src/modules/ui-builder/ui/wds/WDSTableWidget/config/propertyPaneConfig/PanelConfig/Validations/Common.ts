import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  showByColumnType,
  getColumnPath,
} from "modules/ui-builder/ui/wds/WDSTableWidget/widget/propertyUtils";

export default [
  {
    propertyName: "validation.regex",
    helpText:
      $t('Common.c41aca51c36aebde'),
    label: $t('Common.686c71448a79cedb'),
    controlType: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    dependencies: ["primaryColumns"],
    placeholderText: "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$",
    isBindProperty: true,
    isTriggerProperty: false,
    validation: { type: ValidationTypes.REGEX },
    hidden: (props: TableWidgetProps, propertyPath: string) => {
      const path = getColumnPath(propertyPath);

      return showByColumnType(props, path, [ColumnTypes.DATE], true);
    },
  },
  {
    propertyName: "validation.isColumnEditableCellValid",
    helpText: $t('Common.c75a3ce5a77736aa'),
    label: $t('Common.4cdf16695f657155'),
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
    hidden: (props: TableWidgetProps, propertyPath: string) => {
      const path = getColumnPath(propertyPath);

      return showByColumnType(props, path, [ColumnTypes.DATE], true);
    },
  },
  {
    propertyName: "validation.errorMessage",
    helpText:
      $t('Common.628d9bbe26483893'),
    label: $t('Common.8a04ecb6191b0589'),
    controlType: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    dependencies: ["primaryColumns"],
    placeholderText: $t('Common.3e245d4e3a56ee70'),
    isBindProperty: true,
    isTriggerProperty: false,
    validation: { type: ValidationTypes.TEXT },
    hidden: (props: TableWidgetProps, propertyPath: string) => {
      const path = getColumnPath(propertyPath);

      return showByColumnType(props, path, [ColumnTypes.DATE], true);
    },
  },
  {
    propertyName: "validation.isColumnEditableCellRequired",
    helpText: $t('Common.2162d4435b6bb995'),
    label: $t('Common.6d1953d5348c25c4'),
    controlType: "SWITCH",
    dependencies: ["primaryColumns"],
    customJSControl: "TABLE_INLINE_EDIT_VALIDATION_CONTROL",
    isJSConvertible: true,
    isBindProperty: true,
    isTriggerProperty: false,
    validation: { type: ValidationTypes.BOOLEAN },
  },
];
