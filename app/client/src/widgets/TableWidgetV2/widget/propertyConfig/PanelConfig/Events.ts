import {$t} from "locale/index";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { get } from "lodash";
import {
  getBasePropertyPath,
  showByColumnType,
  hideByColumnType,
  getColumnPath,
} from "../../propertyUtils";

export default {
  sectionName: $t('Events.cd66e73be3d41347'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    if (showByColumnType(props, propertyPath, [ColumnTypes.IMAGE], true)) {
      return false;
    } else {
      const columnType = get(props, `${propertyPath}.columnType`, "");
      const isEditable = get(props, `${propertyPath}.isEditable`, "");

      return (
        !(
          columnType === ColumnTypes.TEXT ||
          columnType === ColumnTypes.NUMBER ||
          columnType === ColumnTypes.CURRENCY ||
          columnType === ColumnTypes.CHECKBOX ||
          columnType === ColumnTypes.SWITCH ||
          columnType === ColumnTypes.SELECT ||
          columnType === ColumnTypes.DATE
        ) || !isEditable
      );
    }
  },
  children: [
    // Image onClick
    {
      propertyName: "onClick",
      label: "onClick",
      helpText: $t('Events.4d42d2e634ddfef4'),
      controlType: "ACTION_SELECTOR",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== ColumnTypes.IMAGE;
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
    },
    {
      propertyName: "onSubmit",
      label: "onSubmit",
      helpText: $t('Events.322627a9fa83dba5'),
      controlType: "ACTION_SELECTOR",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");
        const isEditable = get(props, `${baseProperty}.isEditable`, "");

        return (
          !(
            columnType === ColumnTypes.TEXT ||
            columnType === ColumnTypes.NUMBER ||
            columnType === ColumnTypes.CURRENCY
          ) || !isEditable
        );
      },
      dependencies: ["primaryColumns", "inlineEditingSaveOption"],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
    },
    {
      propertyName: "onOptionChange",
      label: "onOptionChange",
      helpText: $t('Events.c6abe5c9292d7cb3'),
      controlType: "ACTION_SELECTOR",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");
        const isEditable = get(props, `${baseProperty}.isEditable`, "");

        return columnType !== ColumnTypes.SELECT || !isEditable;
      },
      dependencies: ["primaryColumns"],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
    },
    {
      propertyName: "onCheckChange",
      label: "onChange",
      helpText: $t('Events.1c5ae125d2634db4'),
      controlType: "ACTION_SELECTOR",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.SWITCH]);
      },
      dependencies: ["primaryColumns"],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
    },
    {
      propertyName: "onCheckChange",
      label: "onCheckChange",
      helpText: $t('Events.1c5ae125d2634db4'),
      controlType: "ACTION_SELECTOR",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.CHECKBOX]);
      },
      dependencies: ["primaryColumns"],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
    },
    {
      propertyName: "onFilterUpdate",
      helpText: $t('Events.7b93ae0dc23e2bf3'),
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");
        const isEditable = get(props, `${baseProperty}.isEditable`, "");
        const serverSideFiltering = get(
          props,
          `${baseProperty}.serverSideFiltering`,
          false,
        );

        return (
          columnType !== ColumnTypes.SELECT ||
          !isEditable ||
          !serverSideFiltering
        );
      },
      dependencies: ["primaryColumns"],
      label: "onFilterUpdate",
      controlType: "ACTION_SELECTOR",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
      additionalAutoComplete: () => ({
        filterText: "",
      }),
    },
    {
      propertyName: "onDateSelected",
      label: "onDateSelected",
      helpText: $t('Events.0d737eaa282145b8'),
      controlType: "ACTION_SELECTOR",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: true,
      dependencies: ["primaryColumns"],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const path = getColumnPath(propertyPath);

        return hideByColumnType(props, path, [ColumnTypes.DATE], true);
      },
    },
  ],
};
