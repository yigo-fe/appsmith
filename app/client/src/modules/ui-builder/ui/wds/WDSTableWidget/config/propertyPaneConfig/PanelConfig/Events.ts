import {$t} from "locale/index";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { get } from "lodash";
import {
  getBasePropertyPath,
  showByColumnType,
  hideByColumnType,
  getColumnPath,
} from "../../../widget/propertyUtils";

export default {
  sectionName: $t('Events.6952a34a6473b37c'),
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
      helpText: $t('Events.2541c0ecb301ed85'),
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
      helpText: $t('Events.0bba84fc27683b2e'),
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
      helpText: $t('Events.49e88250d0fb4fed'),
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
      helpText: $t('Events.19ebfb8be1881f36'),
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
      helpText: $t('Events.19ebfb8be1881f36'),
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
      helpText: $t('Events.02f5b9f83766a5c1'),
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
      helpText: $t('Events.4ac45b3f05cbe499'),
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
