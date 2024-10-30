import {$t} from "locale/index";
import {
  createMessage,
  TABLE_WIDGET_TOTAL_RECORD_TOOLTIP,
} from "ee/constants/messages";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import {
  ALLOW_TABLE_WIDGET_SERVER_SIDE_FILTERING,
  CUSTOM_LOADING_STATE_ENABLED,
} from "../../constants";
import { InlineEditingSaveOptions } from "widgets/TableWidgetV2/constants";
import { composePropertyUpdateHook } from "widgets/WidgetUtils";
import {
  tableDataValidation,
  totalRecordsCountValidation,
  uniqueColumnNameValidation,
  updateColumnOrderHook,
  updateCustomColumnAliasOnLabelChange,
  updateInlineEditingOptionDropdownVisibilityHook,
  updateInlineEditingSaveOptionHook,
} from "../propertyUtils";
import panelConfig from "./PanelConfig";
import Widget from "../index";

export default [
  {
    sectionName: $t('contentConfig.9ccfc1c37c7ce79c'),
    children: [
      {
        helpText:
          $t('contentConfig.ea5dccc6186d994e'),
        propertyName: "tableData",
        label: $t('contentConfig.fd97f353568ae63b'),
        controlType: "ONE_CLICK_BINDING_CONTROL",
        controlConfig: {
          searchableColumn: true,
        },
        placeholderText: '[{ "name": $t('contentConfig.e6d48978a218e759') }]',
        inputType: "ARRAY",
        isBindProperty: true,
        isTriggerProperty: false,
        isJSConvertible: true,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: tableDataValidation,
            expected: {
              type: "Array",
              example: `[{ "name": $t('contentConfig.e6d48978a218e759') }]`,
              autocompleteDataType: AutocompleteDataType.ARRAY,
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
        shouldSwitchToNormalMode: (
          isDynamic: boolean,
          isToggleDisabled: boolean,
          triggerFlag?: boolean,
        ) => triggerFlag && isDynamic && !isToggleDisabled,
      },
      {
        propertyName: "primaryColumns",
        controlType: "PRIMARY_COLUMNS_V2",
        label: $t('contentConfig.240ce484a221b492'),
        updateHook: composePropertyUpdateHook([
          updateColumnOrderHook,
          updateInlineEditingOptionDropdownVisibilityHook,
          updateCustomColumnAliasOnLabelChange,
        ]),
        dependencies: [
          "primaryColumns",
          "columnOrder",
          "childStylesheet",
          "inlineEditingSaveOption",
          "textColor",
          "textSize",
          "fontStyle",
          "cellBackground",
          "verticalAlignment",
          "horizontalAlignment",
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: uniqueColumnNameValidation,
            expected: {
              type: "Unique column names",
              example: "abc",
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        panelConfig,
      },
      {
        propertyName: "inlineEditingSaveOption",
        helpText: $t('contentConfig.63c15a27592a8177'),
        label: $t('contentConfig.d652eaef33402171'),
        controlType: "ICON_TABS",
        defaultValue: InlineEditingSaveOptions.ROW_LEVEL,
        fullWidth: true,
        isBindProperty: true,
        isTriggerProperty: false,
        hidden: (props: TableWidgetProps) => {
          return (
            !props.showInlineEditingOptionDropdown &&
            !Object.values(props.primaryColumns).find(
              (column) => column.isEditable,
            )
          );
        },
        dependencies: [
          "primaryColumns",
          "columnOrder",
          "childStylesheet",
          "showInlineEditingOptionDropdown",
        ],
        options: [
          {
            label: $t('contentConfig.e00ce22933c43664'),
            value: InlineEditingSaveOptions.ROW_LEVEL,
          },
          {
            label: $t('contentConfig.19ced2431d0e932a'),
            value: InlineEditingSaveOptions.CUSTOM,
          },
        ],
        updateHook: updateInlineEditingSaveOptionHook,
      },
      {
        helpText:
          $t('contentConfig.7eda510b7c0191c5'),
        propertyName: "primaryColumnId",
        dependencies: ["primaryColumns"],
        label: $t('contentConfig.96626e41bee2bfe6'),
        controlType: "PRIMARY_COLUMNS_DROPDOWN",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
    // Added this prop to indicate that data section needs to be expanded by default
    // Rest all sections needs to be collapsed
    // We already have a isDefaultOpen prop configured to keep a section expanded or not
    // but introducing new prop so that we can control is based on flag
    // Once we decide to keep this feature, we can go back to using isDefaultOpen and removeexpandedByDefault
    expandedByDefault: true,
  },
  {
    sectionName: $t('contentConfig.d203f99b9b70bceb'),
    children: [
      {
        propertyName: "isVisiblePagination",
        helpText: $t('contentConfig.615adb8c37c9245f'),
        label: $t('contentConfig.be540f6ffd6a39c4'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText:
          $t('contentConfig.5fb3940cd17f20ab'),
        propertyName: "serverSidePaginationEnabled",
        label: $t('contentConfig.44f0e769c3ae2167'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        helpText: createMessage(TABLE_WIDGET_TOTAL_RECORD_TOOLTIP),
        propertyName: "totalRecordsCount",
        label: $t('contentConfig.8c070aad8cf3d9fb'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.71efffd3048462be'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: totalRecordsCountValidation,
            expected: {
              type: "Number",
              example: "10",
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        hidden: (props: TableWidgetProps) => !props.serverSidePaginationEnabled,
        dependencies: ["serverSidePaginationEnabled"],
      },
      {
        helpText: $t('contentConfig.b94e9fd8193e8514'),
        propertyName: "onPageChange",
        label: "onPageChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: TableWidgetProps) => !props.serverSidePaginationEnabled,
        dependencies: ["serverSidePaginationEnabled"],
      },
      {
        helpText: $t('contentConfig.c3cb2af57685ebb3'),
        propertyName: "onPageSizeChange",
        label: "onPageSizeChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: TableWidgetProps) => !props.serverSidePaginationEnabled,
        dependencies: ["serverSidePaginationEnabled"],
      },
    ],
    expandedByDefault: false,
  },
  {
    sectionName: $t('contentConfig.69cf74198f9c4951'),
    children: [
      {
        propertyName: "isVisibleSearch",
        helpText: $t('contentConfig.c5ea6ed3afa270d6'),
        label: $t('contentConfig.71a48812501f3f26'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "enableClientSideSearch",
        label: $t('contentConfig.e6dadce2bd1f727c'),
        helpText: $t('contentConfig.a26f24a9ba92dc08'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
        hidden: (props: TableWidgetProps) => !props.isVisibleSearch,
        dependencies: ["isVisibleSearch"],
      },
      {
        propertyName: "enableServerSideFiltering",
        label: $t('contentConfig.9da42a91bcbd36d2'),
        helpText: $t('contentConfig.6cb042d6c0bd0025'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
        defaultValue: false,
        hidden: () =>
          !Widget.getFeatureFlag(ALLOW_TABLE_WIDGET_SERVER_SIDE_FILTERING),
      },
      {
        propertyName: "onTableFilterUpdate",
        label: "onTableFilterUpdate",
        helpText: $t('contentConfig.6f83b904fa6d3579'),
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: TableWidgetProps) => !props.enableServerSideFiltering,
        dependencies: ["enableServerSideFiltering"],
      },
      {
        propertyName: "defaultSearchText",
        label: $t('contentConfig.e0d5a6a708859d33'),
        helpText: $t('contentConfig.9e129931ec09b812'),
        controlType: "INPUT_TEXT",
        placeholderText: "{{appsmith.user.name}}",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: TableWidgetProps) => !props.isVisibleSearch,
        dependencies: ["isVisibleSearch"],
      },
      {
        propertyName: "onSearchTextChanged",
        label: "onSearchTextChanged",
        helpText: $t('contentConfig.db2cbf4a87512e76'),
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: TableWidgetProps) => !props.isVisibleSearch,
        dependencies: ["isVisibleSearch"],
      },
      {
        propertyName: "isVisibleFilters",
        helpText: $t('contentConfig.46353b7714102c6c'),
        label: $t('contentConfig.5f2b391f14354dc1'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
    expandedByDefault: false,
  },
  {
    sectionName: $t('contentConfig.bf25a28235e856ce'),
    children: [
      {
        helpText: $t('contentConfig.03616f2a99cd83f6'),
        propertyName: "defaultSelectedRowIndices",
        label: $t('contentConfig.b6b1a19aaf175727'),
        controlType: "INPUT_TEXT",
        placeholderText: "[0]",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            children: {
              type: ValidationTypes.NUMBER,
              params: {
                min: -1,
                default: -1,
              },
            },
          },
        },
        hidden: (props: TableWidgetProps) => {
          return !props.multiRowSelection;
        },
        dependencies: ["multiRowSelection"],
      },
      {
        helpText: $t('contentConfig.a5fcfbcda297820f'),
        propertyName: "defaultSelectedRowIndex",
        label: $t('contentConfig.e3e035bc1ad8c781'),
        controlType: "INPUT_TEXT",
        defaultValue: 0,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            min: -1,
            default: -1,
          },
        },
        hidden: (props: TableWidgetProps) => {
          return props.multiRowSelection;
        },
        dependencies: ["multiRowSelection"],
      },
      {
        propertyName: "multiRowSelection",
        label: $t('contentConfig.0f9ba427e6572916'),
        helpText: $t('contentConfig.4e630100aff10f5a'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        helpText: $t('contentConfig.3c4511e7ab301449'),
        propertyName: "onRowSelected",
        label: "onRowSelected",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
    expandedByDefault: false,
  },
  {
    sectionName: $t('contentConfig.8af11dd0027d869c'),
    children: [
      {
        helpText: $t('contentConfig.badf07db1f15ac54'),
        propertyName: "isSortable",
        isJSConvertible: true,
        label: $t('contentConfig.f81e9241f061d092'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
          params: {
            default: true,
          },
        },
      },
      {
        helpText: $t('contentConfig.eacf5e50a2469492'),
        propertyName: "onSort",
        label: "onSort",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: TableWidgetProps) => !props.isSortable,
        dependencies: ["isSortable"],
      },
    ],
    expandedByDefault: false,
  },
  {
    sectionName: $t('contentConfig.c810eddf7e591334'),
    children: [
      {
        propertyName: "allowAddNewRow",
        helpText: $t('contentConfig.f3d7eabe30acf0ef'),
        isJSConvertible: true,
        label: $t('contentConfig.322a01c965a3e5fb'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "onAddNewRowSave",
        helpText: $t('contentConfig.a99a6b64a03d15c4'),
        label: "onSave",
        controlType: "ACTION_SELECTOR",
        hidden: (props: TableWidgetProps) => {
          return !props.allowAddNewRow;
        },
        dependencies: ["allowAddNewRow", "primaryColumns"],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: (props: TableWidgetProps) => {
          const newRow: Record<string, unknown> = {};

          if (props.primaryColumns) {
            Object.values(props.primaryColumns)
              .filter((column) => !column.isDerived)
              .forEach((column) => {
                newRow[column.alias] = "";
              });
          }

          return {
            newRow,
          };
        },
      },
      {
        propertyName: "onAddNewRowDiscard",
        helpText: $t('contentConfig.7541edde730ddab4'),
        label: "onDiscard",
        controlType: "ACTION_SELECTOR",
        hidden: (props: TableWidgetProps) => {
          return !props.allowAddNewRow;
        },
        dependencies: ["allowAddNewRow"],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        propertyName: "defaultNewRow",
        helpText: $t('contentConfig.2a85a2e3c2c83f37'),
        label: $t('contentConfig.ce8d259d3b88d3d0'),
        controlType: "INPUT_TEXT",
        dependencies: ["allowAddNewRow"],
        hidden: (props: TableWidgetProps) => {
          return !props.allowAddNewRow;
        },
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.OBJECT,
          params: {
            default: {},
          },
        },
      },
    ],
    expandedByDefault: false,
  },
  {
    sectionName: $t('contentConfig.f9b25cbf6ee525b1'),
    children: [
      {
        helpText: $t('contentConfig.61e3d272fdda0b5a'),
        propertyName: "isVisible",
        isJSConvertible: true,
        label: $t('contentConfig.3a64bd86a953b9ff'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.a2bd6a9b5f322a53'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.494572adc37c3a76'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "customIsLoading",
        label: $t('contentConfig.ff9b092202c159f7'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.784f42bfa66adf42'),
        defaultValue: false,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: () => !Widget.getFeatureFlag(CUSTOM_LOADING_STATE_ENABLED),
      },
      {
        propertyName: "customIsLoadingValue",
        label: $t('contentConfig.957bdd94b158bde2'),
        controlType: "INPUT_TEXT",
        defaultValue: "",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (props: TableWidgetProps) => !props.customIsLoading,
        dependencies: ["customIsLoading"],
      },
      {
        propertyName: "isVisibleDownload",
        helpText: $t('contentConfig.5d17d5b089680f0f'),
        label: $t('contentConfig.3ced1ad601645bfd'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "canFreezeColumn",
        helpText: $t('contentConfig.5707018c02bee944'),
        label: $t('contentConfig.9137e38830e58efa'),
        controlType: "SWITCH",
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "delimiter",
        label: $t('contentConfig.f66afd359d767102'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.99c3bd40d7afa023'),
        helpText: $t('contentConfig.f74770eda5cd046b'),
        isBindProperty: true,
        isTriggerProperty: false,
        defaultValue: ",",
        validation: {
          type: ValidationTypes.TEXT,
        },
        hidden: (props: TableWidgetProps) => !props.isVisibleDownload,
        dependencies: ["isVisibleDownload"],
      },
    ],
    expandedByDefault: false,
  },
] as PropertyPaneConfig[];
