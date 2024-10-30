import {$t} from "locale/index";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  getColumnPath,
  hideByColumnType,
} from "modules/ui-builder/ui/wds/WDSTableWidget/widget/propertyUtils";

export default [
  {
    propertyName: "validation.minDate",
    helpText: $t('Date.97ed18785236db2f'),
    label: $t('Date.c21011f8f6814d75'),
    controlType: "DATE_PICKER",
    placeholderText: "1",
    isBindProperty: true,
    isTriggerProperty: false,
    hidden: (props: TableWidgetProps, propertyPath: string) => {
      const path = getColumnPath(propertyPath);

      return hideByColumnType(props, path, [ColumnTypes.DATE], true);
    },
    dependencies: ["primaryColumns"],
  },
  {
    propertyName: "validation.maxDate",
    helpText: $t('Date.2fddc94368aea2fd'),
    label: $t('Date.d6e9a9e69a29dc10'),
    controlType: "DATE_PICKER",
    placeholderText: "100",
    isBindProperty: true,
    isTriggerProperty: false,
    hidden: (props: TableWidgetProps, propertyPath: string) => {
      const path = getColumnPath(propertyPath);

      return hideByColumnType(props, path, [ColumnTypes.DATE], true);
    },
    dependencies: ["primaryColumns"],
  },
];
