import {$t} from "locale/index";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { InlineEditingSaveOptions } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { composePropertyUpdateHook } from "widgets/WidgetUtils";
import {
  tableDataValidation,
  uniqueColumnNameValidation,
  updateColumnOrderHook,
  updateCustomColumnAliasOnLabelChange,
  updateInlineEditingOptionDropdownVisibilityHook,
  updateInlineEditingSaveOptionHook,
} from "../../widget/propertyUtils";
import panelConfig from "./PanelConfig";

export const contentConfig = [
  {
    sectionName: $t('contentConfig.ecf38b68cb21bee3'),
    children: [
      {
        helpText:
          $t('contentConfig.513ba09f3861d75d'),
        propertyName: "tableData",
        label: $t('contentConfig.de5ca83474181d63'),
        controlType: "ONE_CLICK_BINDING_CONTROL",
        controlConfig: {
          searchableColumn: true,
          maxHeight: "300px",
        },
        placeholderText: '[{ "name": $t('contentConfig.44179052fdc49607') }]',
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
              example: `[{ "name": $t('contentConfig.44179052fdc49607') }]`,
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
        controlType: "PRIMARY_COLUMNS_WDS",
        label: $t('contentConfig.a25854a62824f73b'),
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
          "type",
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
        helpText: $t('contentConfig.0ddfeb7ec3bbdc8b'),
        label: $t('contentConfig.2fe08e33af0aecbe'),
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
            label: $t('contentConfig.028288da0fa95371'),
            value: InlineEditingSaveOptions.ROW_LEVEL,
          },
          {
            label: $t('contentConfig.a952078e2ad605d0'),
            value: InlineEditingSaveOptions.CUSTOM,
          },
        ],
        updateHook: updateInlineEditingSaveOptionHook,
      },
      {
        helpText:
          $t('contentConfig.ab471b1b5beaa727'),
        propertyName: "primaryColumnId",
        dependencies: ["primaryColumns"],
        label: $t('contentConfig.5fef20db472286ab'),
        controlType: "PRIMARY_COLUMNS_DROPDOWN",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.e45d85c5ccd74db8'),
    children: [
      {
        propertyName: "pageSize",
        helpText: $t('contentConfig.6d37a6ab9ba18765'),
        label: $t('contentConfig.d022efed2d413249'),
        controlType: "NUMERIC_INPUT",
        isJSConvertible: true,
        defaultValue: 10,
        isBindProperty: true,
        isTriggerProperty: false,
        min: 1,
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            min: 1,
          },
        },
      },
      {
        propertyName: "isVisiblePagination",
        helpText: $t('contentConfig.690836296dd4065f'),
        label: $t('contentConfig.97c0669bec230d82'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.e2f13a01b3bcfe1f'),
    children: [
      {
        propertyName: "isVisibleSearch",
        helpText: $t('contentConfig.99e648bdb365915d'),
        label: $t('contentConfig.472cbcedc871a1e4'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "defaultSearchText",
        label: $t('contentConfig.b82bcd009feccd0c'),
        helpText: $t('contentConfig.602efd2631507b75'),
        controlType: "INPUT_TEXT",
        placeholderText: "{{appsmith.user.name}}",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: TableWidgetProps) => !props.isVisibleSearch,
        dependencies: ["isVisibleSearch"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.0385f23b8a77024a'),
    children: [
      {
        helpText: $t('contentConfig.56397a6405741d62'),
        propertyName: "defaultSelectedRowIndices",
        label: $t('contentConfig.75ab38027ae3fb31'),
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
        helpText: $t('contentConfig.b777ed0731f1cfa1'),
        propertyName: "defaultSelectedRowIndex",
        label: $t('contentConfig.95dad84e860adcdb'),
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
        label: $t('contentConfig.53179c5929e3ed7e'),
        helpText: $t('contentConfig.0071ff743ed5abc2'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        helpText: $t('contentConfig.09e9422f3b64b202'),
        propertyName: "onRowSelected",
        label: "onRowSelected",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
  {
    sectionName: $t('contentConfig.eda79ccef67899b2'),
    children: [
      {
        helpText: $t('contentConfig.9e938c3e89faba8e'),
        propertyName: "isSortable",
        isJSConvertible: true,
        label: $t('contentConfig.7b7f7fc4eac12083'),
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
        helpText: $t('contentConfig.fb2fb71af1e70d88'),
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
  },
  {
    sectionName: $t('contentConfig.449545bfc2532a11'),
    children: [
      {
        helpText: $t('contentConfig.d9dada2100e39979'),
        propertyName: "isVisible",
        isJSConvertible: true,
        label: $t('contentConfig.2ab443c586a71339'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.72004f88dcc8fff5'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.267773cca3d76ccf'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
] as PropertyPaneConfig[];
