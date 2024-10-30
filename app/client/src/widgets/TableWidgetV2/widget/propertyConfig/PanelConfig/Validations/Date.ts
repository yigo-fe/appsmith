import {$t} from "locale/index";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import {
  getColumnPath,
  hideByColumnType,
} from "widgets/TableWidgetV2/widget/propertyUtils";

export default [
  {
    propertyName: "validation.minDate",
    helpText: $t('Date.ae268f3330c0ec1c'),
    label: $t('Date.36645962d6e0d8fc'),
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
    helpText: $t('Date.b556f4d417807299'),
    label: $t('Date.da09193390b5cd1a'),
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
