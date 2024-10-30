import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes, DateInputFormat } from "widgets/TableWidgetV2/constants";
import { get } from "lodash";
import {
  getBasePropertyPath,
  hideByColumnType,
  showByColumnType,
  uniqueColumnAliasValidation,
  updateCurrencyDefaultValues,
  updateMenuItemsSource,
  updateNumberColumnTypeTextAlignment,
  updateThemeStylesheetsInColumns,
} from "../../propertyUtils";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { composePropertyUpdateHook } from "widgets/WidgetUtils";
import { CurrencyDropdownOptions } from "widgets/CurrencyInputWidget/component/CurrencyCodeDropdown";

export default {
  sectionName: $t('Data.71b4efbbbc4b6481'),
  children: [
    {
      propertyName: "columnType",
      label: $t('Data.0790a838adca17f6'),
      helpText:
        $t('Data.042a2bb135553656'),
      controlType: "DROP_DOWN",
      options: [
        {
          label: $t('Data.0330be78071a7a84'),
          value: ColumnTypes.BUTTON,
        },
        {
          label: $t('Data.fcdbced2cb3f0a55'),
          value: ColumnTypes.CHECKBOX,
        },
        {
          label: $t('Data.67a78c6ec3b6e2b8'),
          value: ColumnTypes.CURRENCY,
        },
        {
          label: $t('Data.f4a7cba0b3b3152d'),
          value: ColumnTypes.DATE,
        },
        {
          label: $t('Data.6e49dca1a43d7dd1'),
          value: ColumnTypes.ICON_BUTTON,
        },
        {
          label: $t('Data.b94519b8b5b01995'),
          value: ColumnTypes.IMAGE,
        },
        {
          label: $t('Data.891fe68cb2645a74'),
          value: ColumnTypes.MENU_BUTTON,
        },
        {
          label: $t('Data.a4d4b38e79b825b6'),
          value: ColumnTypes.NUMBER,
        },
        {
          label: $t('Data.513a0425b9a420f5'),
          value: ColumnTypes.TEXT,
        },
        {
          label: $t('Data.b24a8f643d5a5bd7'),
          value: ColumnTypes.SELECT,
        },
        {
          label: $t('Data.9c2d7cde6f27ef58'),
          value: ColumnTypes.SWITCH,
        },
        {
          label: "URL",
          value: ColumnTypes.URL,
        },
        {
          label: $t('Data.b7058b3ea76c4bbb'),
          value: ColumnTypes.VIDEO,
        },
      ],
      updateHook: composePropertyUpdateHook([
        updateNumberColumnTypeTextAlignment,
        updateThemeStylesheetsInColumns,
        updateMenuItemsSource,
        updateCurrencyDefaultValues,
      ]),
      dependencies: ["primaryColumns", "columnOrder", "childStylesheet"],
      isBindProperty: false,
      isTriggerProperty: false,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return showByColumnType(props, propertyPath, [
          ColumnTypes.EDIT_ACTIONS,
        ]);
      },
    },
    {
      helpText: $t('Data.05401165da51e5b0'),
      propertyName: "alias",
      label: $t('Data.8b1a4b8849660a7f'),
      controlType: "INPUT_TEXT",
      helperText: () =>
        $t('Data.5aa631e34483314e'),
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const columnId = propertyPath.match(/primaryColumns\.(.*)\.alias/);
        let isDerivedProperty = false;

        if (columnId && columnId[1] && props.primaryColumns[columnId[1]]) {
          isDerivedProperty = props.primaryColumns[columnId[1]].isDerived;
        }

        return (
          !isDerivedProperty ||
          hideByColumnType(props, propertyPath, [
            ColumnTypes.DATE,
            ColumnTypes.IMAGE,
            ColumnTypes.NUMBER,
            ColumnTypes.CURRENCY,
            ColumnTypes.TEXT,
            ColumnTypes.VIDEO,
            ColumnTypes.URL,
          ])
        );
      },
      dependencies: ["primaryColumns"],
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.FUNCTION,
        params: {
          expected: {
            type: "string",
            example: "abc",
            autocompleteDataType: AutocompleteDataType.STRING,
          },
          fnString: uniqueColumnAliasValidation.toString(),
        },
      },
    },
    {
      propertyName: "displayText",
      label: $t('Data.b69753df1e33aed0'),
      helpText: $t('Data.8ccdf39078fe4b93'),
      controlType: "TABLE_COMPUTE_VALUE",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== "url";
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: false,
      isTriggerProperty: false,
    },
    {
      helpText:
        $t('Data.d2bf55b9e3986081'),
      propertyName: "computedValue",
      label: $t('Data.2c8809e3c981dd52'),
      controlType: "TABLE_COMPUTE_VALUE",
      additionalControlData: {
        isArrayValue: true,
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.DATE,
          ColumnTypes.IMAGE,
          ColumnTypes.NUMBER,
          ColumnTypes.TEXT,
          ColumnTypes.VIDEO,
          ColumnTypes.URL,
          ColumnTypes.CHECKBOX,
          ColumnTypes.SWITCH,
          ColumnTypes.SELECT,
          ColumnTypes.CURRENCY,
        ]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
    },
    {
      propertyName: "inputFormat",
      label: $t('Data.e60e2cea053ad4da'),
      helpText: $t('Data.bb6fc69d85caba57'),
      controlType: "DROP_DOWN",
      options: [
        {
          label: $t('Data.a0fab43dd8faca7f'),
          value: DateInputFormat.EPOCH,
        },
        {
          label: $t('Data.f1e6370fb9a6131a'),
          value: DateInputFormat.MILLISECONDS,
        },
        {
          label: "YYYY-MM-DD",
          value: "YYYY-MM-DD",
        },
        {
          label: "YYYY-MM-DD HH:mm",
          value: "YYYY-MM-DD HH:mm",
        },
        {
          label: "ISO 8601",
          value: "YYYY-MM-DDTHH:mm:ss.SSSZ",
        },
        {
          label: "YYYY-MM-DDTHH:mm:ss",
          value: "YYYY-MM-DDTHH:mm:ss",
        },
        {
          label: "YYYY-MM-DD hh:mm:ss",
          value: "YYYY-MM-DD hh:mm:ss",
        },
        {
          label: "Do MMM YYYY",
          value: "Do MMM YYYY",
        },
        {
          label: "DD/MM/YYYY",
          value: "DD/MM/YYYY",
        },
        {
          label: "DD/MM/YYYY HH:mm",
          value: "DD/MM/YYYY HH:mm",
        },
        {
          label: "LLL",
          value: "LLL",
        },
        {
          label: "LL",
          value: "LL",
        },
        {
          label: "D MMMM, YYYY",
          value: "D MMMM, YYYY",
        },
        {
          label: "H:mm A D MMMM, YYYY",
          value: "H:mm A D MMMM, YYYY",
        },
        {
          label: "MM-DD-YYYY",
          value: "MM-DD-YYYY",
        },
        {
          label: "DD-MM-YYYY",
          value: "DD-MM-YYYY",
        },
        {
          label: "MM/DD/YYYY",
          value: "MM/DD/YYYY",
        },
        {
          label: "DD/MM/YYYY",
          value: "DD/MM/YYYY",
        },
        {
          label: "DD/MM/YY",
          value: "DD/MM/YY",
        },
        {
          label: "MM/DD/YY",
          value: "MM/DD/YY",
        },
      ],
      defaultValue: "YYYY-MM-DD HH:mm",
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== ColumnTypes.DATE;
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
        },
      },
      isTriggerProperty: false,
    },
    {
      propertyName: "outputFormat",
      label: $t('Data.2eec33d974d91c38'),
      helpText: $t('Data.8fca9220f27b3ba8'),
      controlType: "DROP_DOWN",
      customJSControl: "TABLE_COMPUTE_VALUE",
      isJSConvertible: true,
      options: [
        {
          label: $t('Data.a0fab43dd8faca7f'),
          value: DateInputFormat.EPOCH,
        },
        {
          label: $t('Data.f1e6370fb9a6131a'),
          value: DateInputFormat.MILLISECONDS,
        },
        {
          label: "YYYY-MM-DD",
          value: "YYYY-MM-DD",
        },
        {
          label: "YYYY-MM-DD HH:mm",
          value: "YYYY-MM-DD HH:mm",
        },
        {
          label: "ISO 8601",
          value: "YYYY-MM-DDTHH:mm:ss.SSSZ",
        },
        {
          label: "YYYY-MM-DDTHH:mm:ss",
          value: "YYYY-MM-DDTHH:mm:ss",
        },
        {
          label: "YYYY-MM-DD hh:mm:ss",
          value: "YYYY-MM-DD hh:mm:ss",
        },
        {
          label: "Do MMM YYYY",
          value: "Do MMM YYYY",
        },
        {
          label: "DD/MM/YYYY",
          value: "DD/MM/YYYY",
        },
        {
          label: "DD/MM/YYYY HH:mm",
          value: "DD/MM/YYYY HH:mm",
        },
        {
          label: "LLL",
          value: "LLL",
        },
        {
          label: "LL",
          value: "LL",
        },
        {
          label: "D MMMM, YYYY",
          value: "D MMMM, YYYY",
        },
        {
          label: "H:mm A D MMMM, YYYY",
          value: "H:mm A D MMMM, YYYY",
        },
        {
          label: "MM-DD-YYYY",
          value: "MM-DD-YYYY",
        },
        {
          label: "DD-MM-YYYY",
          value: "DD-MM-YYYY",
        },
        {
          label: "MM/DD/YYYY",
          value: "MM/DD/YYYY",
        },
        {
          label: "DD/MM/YYYY",
          value: "DD/MM/YYYY",
        },
        {
          label: "DD/MM/YY",
          value: "DD/MM/YY",
        },
        {
          label: "MM/DD/YY",
          value: "MM/DD/YY",
        },
      ],
      defaultValue: "YYYY-MM-DD HH:mm",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== ColumnTypes.DATE;
      },
      dependencies: ["primaryColumns", "columnType"],
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
        },
      },
      isTriggerProperty: false,
    },
    {
      helpText: $t('Data.b1a021bff1cf4119'),
      propertyName: "currencyCode",
      label: $t('Data.67a78c6ec3b6e2b8'),
      enableSearch: true,
      dropdownHeight: "156px",
      controlType: "DROP_DOWN",
      customJSControl: "TABLE_COMPUTE_VALUE",
      searchPlaceholderText: $t('Data.257de8accf44aeaa'),
      options: CurrencyDropdownOptions,
      virtual: true,
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            default: "USD",
            required: true,
            allowedValues: CurrencyDropdownOptions.map(
              (option) => option.value,
            ),
          },
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== ColumnTypes.CURRENCY;
      },
      dependencies: ["primaryColumns", "columnType"],
    },
    {
      helpText: $t('Data.10468eb7206eaf88'),
      propertyName: "decimals",
      label: $t('Data.975c6c206a3fa9a5'),
      controlType: "DROP_DOWN",
      options: [
        {
          label: "0",
          value: 0,
        },
        {
          label: "1",
          value: 1,
        },
        {
          label: "2",
          value: 2,
        },
      ],
      isJSConvertible: false,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.NUMBER,
        params: {
          min: 0,
          max: 2,
          default: 0,
          required: true,
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== ColumnTypes.CURRENCY;
      },
      dependencies: ["primaryColumns", "columnType"],
    },
    {
      propertyName: "thousandSeparator",
      helpText: $t('Data.d38ccd78ebf45d00'),
      label: $t('Data.52ab066b7c6d40c2'),
      controlType: "SWITCH",
      customJSControl: "TABLE_COMPUTE_VALUE",
      dependencies: ["primaryColumns", "columnType"],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== ColumnTypes.CURRENCY;
      },
    },
    {
      propertyName: "notation",
      helpText: $t('Data.c7019241c4bfae3e'),
      label: $t('Data.9f3f34dbcc5b3475'),
      controlType: "DROP_DOWN",
      customJSControl: "TABLE_COMPUTE_VALUE",
      options: [
        {
          label: $t('Data.44127b8a11bd827a'),
          value: "standard",
        },
        {
          label: $t('Data.df4d0166f1fc52ce'),
          value: "compact",
        },
      ],
      dependencies: ["primaryColumns", "columnType"],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            default: "standard",
            allowedValues: ["standard", "compact"],
          },
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);
        const columnType = get(props, `${baseProperty}.columnType`, "");

        return columnType !== ColumnTypes.CURRENCY;
      },
    },
  ],
};
