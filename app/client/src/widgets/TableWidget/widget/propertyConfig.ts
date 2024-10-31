import {$t} from "locale/index";
import { get } from "lodash";
import type { TableWidgetProps } from "../constants";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import { ButtonVariantTypes } from "components/constants";
import {
  updateDerivedColumnsHook,
  ColumnTypes,
  defaultSelectedRowValidation,
  totalRecordsCountValidation,
  updateColumnStyles,
  updateIconAlignmentHook,
  getBasePropertyPath,
  hideByColumnType,
  uniqueColumnNameValidation,
  removeBoxShadowColorProp,
  updateIconNameHook,
} from "./propertyUtils";
import {
  createMessage,
  TABLE_WIDGET_TOTAL_RECORD_TOOLTIP,
} from "ee/constants/messages";
import { IconNames } from "@blueprintjs/icons";
import { getPrimaryColumnStylesheetValue } from "./helpers";

const ICON_NAMES = Object.keys(IconNames).map(
  (name: string) => IconNames[name as keyof typeof IconNames],
);

const HIDE_BY_COLUMN_TYPES = {
  COMPUTED_VALUES: new Set([
    ColumnTypes.DATE,
    ColumnTypes.IMAGE,
    ColumnTypes.NUMBER,
    ColumnTypes.TEXT,
    ColumnTypes.VIDEO,
    ColumnTypes.URL,
  ]),
  IS_DISABLED: new Set([
    ColumnTypes.ICON_BUTTON,
    ColumnTypes.MENU_BUTTON,
    ColumnTypes.BUTTON,
  ]),
  IS_COMPACT: new Set([ColumnTypes.MENU_BUTTON]),
  STYLES: new Set([
    ColumnTypes.TEXT,
    ColumnTypes.DATE,
    ColumnTypes.NUMBER,
    ColumnTypes.URL,
  ]),
  BUTTON_PROPERTIES: new Set([
    ColumnTypes.BUTTON,
    ColumnTypes.MENU_BUTTON,
    ColumnTypes.ICON_BUTTON,
  ]),
  ICON_NAME: new Set([ColumnTypes.ICON_BUTTON, ColumnTypes.MENU_BUTTON]),
  ICON_ALIGN: new Set([ColumnTypes.MENU_BUTTON]),
  MENU_BUTTON_LABEL: new Set([ColumnTypes.MENU_BUTTON]),
  BUTTON_LABEL: new Set([ColumnTypes.BUTTON]),
  BUTTON_COLOR: new Set([ColumnTypes.BUTTON, ColumnTypes.ICON_BUTTON]),
  BUTTON_VARIANT: new Set([ColumnTypes.BUTTON, ColumnTypes.ICON_BUTTON]),
  BORDER_RADIUS: new Set([
    ColumnTypes.ICON_BUTTON,
    ColumnTypes.MENU_BUTTON,
    ColumnTypes.BUTTON,
  ]),
  BOX_SHADOW: new Set([
    ColumnTypes.ICON_BUTTON,
    ColumnTypes.MENU_BUTTON,
    ColumnTypes.BUTTON,
  ]),
  MENU_COLOR: new Set([ColumnTypes.MENU_BUTTON]),
  MENU_VARIANT: new Set([ColumnTypes.MENU_BUTTON]),
  ON_CLICK: new Set([ColumnTypes.BUTTON, ColumnTypes.ICON_BUTTON]),
  MENU_OPTIONS: new Set([ColumnTypes.MENU_BUTTON]),
};

export default [
  {
    sectionName: $t('propertyConfig.971f5046d9453a97'),
    children: [
      {
        helpText:
          $t('propertyConfig.bccd60e4f62f3605'),
        propertyName: "tableData",
        label: $t('propertyConfig.dec5a1050eec6049'),
        controlType: "INPUT_TEXT",
        placeholderText: `[{ "name": ${$t('propertyConfig.3768034abb9d57d3')} }]`,
        inputType: "ARRAY",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.OBJECT_ARRAY,
          params: {
            default: [],
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        helpText: $t('propertyConfig.def4222e90c2b6e9'),
        propertyName: "primaryColumns",
        controlType: "PRIMARY_COLUMNS",
        label: $t('propertyConfig.def4222e90c2b6e9'),
        updateHook: updateDerivedColumnsHook,
        dependencies: ["derivedColumns", "columnOrder", "childStylesheet"],
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
        panelConfig: {
          editableTitle: true,
          titlePropertyName: "label",
          panelIdPropertyName: "id",
          updateHook: updateDerivedColumnsHook,
          dependencies: ["primaryColumns", "derivedColumns", "columnOrder"],
          children: [
            {
              sectionName: $t('propertyConfig.90f0890f93f9e9ea'),
              children: [
                {
                  propertyName: "columnType",
                  label: $t('propertyConfig.8bd62fb077258a00'),
                  controlType: "DROP_DOWN",
                  customJSControl: "COMPUTE_VALUE",
                  options: [
                    {
                      label: $t('propertyConfig.b7ea8a5515caf055'),
                      value: "text",
                    },
                    {
                      label: "URL",
                      value: "url",
                    },
                    {
                      label: $t('propertyConfig.02c8499b7f263013'),
                      value: "number",
                    },
                    {
                      label: $t('propertyConfig.8caad9d3f2916804'),
                      value: "image",
                    },
                    {
                      label: $t('propertyConfig.d7ee8b26fdd81e9d'),
                      value: "video",
                    },
                    {
                      label: $t('propertyConfig.c8b465efb5af66c0'),
                      value: "date",
                    },
                    {
                      label: $t('propertyConfig.9bec8ae1c632983a'),
                      value: "button",
                    },
                    {
                      label: $t('propertyConfig.4801ac3198421b81'),
                      value: "menuButton",
                    },
                    {
                      label: $t('propertyConfig.d13180a158648d34'),
                      value: "iconButton",
                    },
                  ],
                  updateHook: updateIconNameHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                    "childStylesheet",
                  ],
                  isBindProperty: false,
                  isTriggerProperty: false,
                },
                {
                  propertyName: "displayText",
                  label: $t('propertyConfig.3fac1a2a800e7c9a'),
                  controlType: "COMPUTE_VALUE",
                  customJSControl: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    const baseProperty = getBasePropertyPath(propertyPath);
                    const columnType = get(
                      props,
                      `${baseProperty}.columnType`,
                      "",
                    );

                    return columnType !== "url";
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: false,
                  isTriggerProperty: false,
                },
                {
                  helpText:
                    $t('propertyConfig.14a263011eb3424c'),
                  propertyName: "computedValue",
                  label: $t('propertyConfig.3927695adf51c391'),
                  controlType: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.COMPUTED_VALUES,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                },
                {
                  propertyName: "isCellVisible",
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnType",
                  ],
                  label: $t('propertyConfig.e3abcca425b39d02'),
                  helpText: $t('propertyConfig.f22ce1f9af912f60'),
                  updateHook: updateDerivedColumnsHook,
                  defaultValue: true,
                  controlType: "SWITCH",
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.BOOLEAN,
                    },
                  },
                },
                {
                  propertyName: "isDisabled",
                  label: $t('propertyConfig.34f4b4b7e0c85683'),
                  updateHook: updateDerivedColumnsHook,
                  defaultValue: false,
                  controlType: "SWITCH",
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.BOOLEAN,
                    },
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.IS_DISABLED,
                    );
                  },
                },
                {
                  propertyName: "isCompact",
                  helpText: $t('propertyConfig.cf12e6938c31eaa9'),
                  updateHook: updateDerivedColumnsHook,
                  label: $t('propertyConfig.143731bde66527b3'),
                  controlType: "SWITCH",
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.BOOLEAN,
                    },
                  },
                  isTriggerProperty: false,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.IS_COMPACT,
                    );
                  },
                },
                {
                  propertyName: "inputFormat",
                  label: $t('propertyConfig.67b59fdcd95d7fbe'),
                  controlType: "DROP_DOWN",
                  options: [
                    {
                      label: $t('propertyConfig.a39fff0f39648f4e'),
                      value: "Epoch",
                    },
                    {
                      label: $t('propertyConfig.983c409623189fb0'),
                      value: "Milliseconds",
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
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    const baseProperty = getBasePropertyPath(propertyPath);
                    const columnType = get(
                      props,
                      `${baseProperty}.columnType`,
                      "",
                    );

                    return columnType !== "date";
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        allowedValues: [
                          "YYYY-MM-DDTHH:mm:ss.SSSZ",
                          "Epoch",
                          "Milliseconds",
                          "YYYY-MM-DD",
                          "YYYY-MM-DD HH:mm",
                          "YYYY-MM-DDTHH:mm:ss.sssZ",
                          "YYYY-MM-DDTHH:mm:ss",
                          "YYYY-MM-DD hh:mm:ss",
                          "Do MMM YYYY",
                          "DD/MM/YYYY",
                          "DD/MM/YYYY HH:mm",
                          "LLL",
                          "LL",
                          "D MMMM, YYYY",
                          "H:mm A D MMMM, YYYY",
                          "MM-DD-YYYY",
                          "DD-MM-YYYY",
                          "MM/DD/YYYY",
                          "DD/MM/YYYY",
                          "DD/MM/YY",
                          "MM/DD/YY",
                        ],
                      },
                    },
                  },
                  isTriggerProperty: false,
                },
                {
                  propertyName: "outputFormat",
                  label: $t('propertyConfig.f12c4b63a75eecd8'),
                  controlType: "DROP_DOWN",
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  options: [
                    {
                      label: $t('propertyConfig.a39fff0f39648f4e'),
                      value: "Epoch",
                    },
                    {
                      label: $t('propertyConfig.983c409623189fb0'),
                      value: "Milliseconds",
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
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    const baseProperty = getBasePropertyPath(propertyPath);
                    const columnType = get(
                      props,
                      `${baseProperty}.columnType`,
                      "",
                    );

                    return columnType !== "date";
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnType",
                  ],
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        allowedValues: [
                          "YYYY-MM-DDTHH:mm:ss.SSSZ",
                          "Epoch",
                          "Milliseconds",
                          "YYYY-MM-DD",
                          "YYYY-MM-DD HH:mm",
                          "YYYY-MM-DDTHH:mm:ss.sssZ",
                          "YYYY-MM-DDTHH:mm:ss",
                          "YYYY-MM-DD hh:mm:ss",
                          "Do MMM YYYY",
                          "DD/MM/YYYY",
                          "DD/MM/YYYY HH:mm",
                          "LLL",
                          "LL",
                          "D MMMM, YYYY",
                          "H:mm A D MMMM, YYYY",
                          "MM-DD-YYYY",
                          "DD-MM-YYYY",
                          "MM/DD/YYYY",
                          "DD/MM/YYYY",
                          "DD/MM/YY",
                          "MM/DD/YY",
                        ],
                      },
                    },
                  },
                  isTriggerProperty: false,
                },
                {
                  propertyName: "onClick",
                  label: "onClick",
                  controlType: "ACTION_SELECTOR",
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    const baseProperty = getBasePropertyPath(propertyPath);
                    const columnType = get(
                      props,
                      `${baseProperty}.columnType`,
                      "",
                    );

                    return columnType !== "image";
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: true,
                },
              ],
            },
            {
              sectionName: $t('propertyConfig.7408ae09a238b3c2'),
              hidden: (props: TableWidgetProps, propertyPath: string) => {
                return hideByColumnType(
                  props,
                  propertyPath,
                  HIDE_BY_COLUMN_TYPES.STYLES,
                  true,
                );
              },
              dependencies: ["primaryColumns", "derivedColumns"],
              children: [
                {
                  propertyName: "horizontalAlignment",
                  label: $t('propertyConfig.b38bdf4b3d0aba77'),
                  controlType: "ICON_TABS",
                  options: [
                    {
                      startIcon: "align-left",
                      value: "LEFT",
                    },
                    {
                      startIcon: "align-center",
                      value: "CENTER",
                    },
                    {
                      startIcon: "align-right",
                      value: "RIGHT",
                    },
                  ],
                  defaultValue: "LEFT",
                  isJSConvertible: true,
                  customJSControl: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        allowedValues: ["LEFT", "CENTER", "RIGHT"],
                      },
                    },
                  },
                  isTriggerProperty: false,
                },
                {
                  propertyName: "textSize",
                  label: $t('propertyConfig.9d98bff8891358d0'),
                  controlType: "DROP_DOWN",
                  isJSConvertible: true,
                  customJSControl: "COMPUTE_VALUE",
                  options: [
                    {
                      label: "S",
                      value: "0.875rem",
                      subText: "0.875rem",
                    },
                    {
                      label: "M",
                      value: "1rem",
                      subText: "1rem",
                    },
                    {
                      label: "L",
                      value: "1.25rem",
                      subText: "1.25rem",
                    },
                    {
                      label: "XL",
                      value: "1.875rem",
                      subText: "1.875rem",
                    },
                  ],
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                    },
                  },
                  updateHook: updateDerivedColumnsHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                },
                {
                  propertyName: "fontStyle",
                  label: $t('propertyConfig.34580a93f662aed4'),
                  controlType: "BUTTON_GROUP",
                  options: [
                    {
                      icon: "text-bold",
                      value: "BOLD",
                    },
                    {
                      icon: "text-italic",
                      value: "ITALIC",
                    },
                    {
                      icon: "text-underline",
                      value: "UNDERLINE",
                    },
                  ],
                  isJSConvertible: true,
                  customJSControl: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                    },
                  },
                },
                {
                  propertyName: "verticalAlignment",
                  label: $t('propertyConfig.5d3bbb5badd4c4ce'),
                  controlType: "ICON_TABS",
                  options: [
                    {
                      startIcon: "vertical-align-top",
                      value: "TOP",
                    },
                    {
                      startIcon: "vertical-align-middle",
                      value: "CENTER",
                    },
                    {
                      startIcon: "vertical-align-bottom",
                      value: "BOTTOM",
                    },
                  ],
                  defaultValue: "CENTER",
                  isJSConvertible: true,
                  customJSControl: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        allowedValues: ["TOP", "CENTER", "BOTTOM"],
                      },
                    },
                  },
                  isTriggerProperty: false,
                },
                {
                  propertyName: "textColor",
                  label: $t('propertyConfig.7a3d534e039b979f'),
                  controlType: "PRIMARY_COLUMNS_COLOR_PICKER",
                  isJSConvertible: true,
                  customJSControl: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        regex: /^(?![<|{{]).+/,
                      },
                    },
                  },
                  isTriggerProperty: false,
                },
                {
                  propertyName: "cellBackground",
                  label: $t('propertyConfig.20846cef0d5a94ea'),
                  controlType: "PRIMARY_COLUMNS_COLOR_PICKER",
                  isJSConvertible: true,
                  customJSControl: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        regex: /^(?![<|{{]).+/,
                      },
                    },
                  },
                  isTriggerProperty: false,
                },
              ],
            },
            {
              sectionName: $t('propertyConfig.f2bdd7c1c09b0e40'),
              hidden: (props: TableWidgetProps, propertyPath: string) => {
                return hideByColumnType(
                  props,
                  propertyPath,
                  HIDE_BY_COLUMN_TYPES.BUTTON_PROPERTIES,
                  true,
                );
              },
              children: [
                {
                  propertyName: "iconName",
                  label: $t('propertyConfig.75f866f3268395f4'),
                  helpText: $t('propertyConfig.07456af95ef5993c'),
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.ICON_NAME,
                    );
                  },
                  updateHook: updateIconAlignmentHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  controlType: "ICON_SELECT",
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        allowedValues: ICON_NAMES,
                      },
                    },
                  },
                },
                {
                  propertyName: "iconAlign",
                  label: $t('propertyConfig.da2e8424e52aef1e'),
                  helpText: $t('propertyConfig.e57eed6ac62d8fae'),
                  controlType: "ICON_TABS",
                  defaultValue: "left",
                  options: [
                    {
                      startIcon: "align-left",
                      value: "left",
                    },
                    {
                      startIcon: "align-right",
                      value: "right",
                    },
                  ],
                  isBindProperty: false,
                  isTriggerProperty: false,
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.ICON_ALIGN,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  validation: {
                    type: ValidationTypes.TEXT,
                    params: {
                      allowedValues: ["center", "left", "right"],
                    },
                  },
                },
                {
                  propertyName: "buttonLabel",
                  label: $t('propertyConfig.4e3748d3e26b37f4'),
                  controlType: "COMPUTE_VALUE",
                  defaultValue: "Action",
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.BUTTON_LABEL,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                },
                {
                  propertyName: "menuButtonLabel",
                  label: $t('propertyConfig.4e3748d3e26b37f4'),
                  controlType: "COMPUTE_VALUE",
                  defaultValue: "Open Menu",
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.MENU_BUTTON_LABEL,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                },
                {
                  propertyName: "buttonColor",
                  getStylesheetValue: getPrimaryColumnStylesheetValue,
                  label: $t('propertyConfig.4a1a87198955d2ca'),
                  controlType: "PRIMARY_COLUMNS_COLOR_PICKER",
                  helpText: $t('propertyConfig.702f4c501e72d565'),
                  isJSConvertible: true,
                  customJSControl: "COMPUTE_VALUE",
                  updateHook: updateDerivedColumnsHook,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.BUTTON_COLOR,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        regex: /^(?![<|{{]).+/,
                      },
                    },
                  },
                  isTriggerProperty: false,
                },
                {
                  propertyName: "buttonVariant",
                  label: $t('propertyConfig.516aaf67494443a8'),
                  controlType: "DROP_DOWN",
                  customJSControl: "COMPUTE_VALUE",
                  defaultValue: ButtonVariantTypes.PRIMARY,
                  isJSConvertible: true,
                  helpText: $t('propertyConfig.47f9c8eb2e592776'),
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.BUTTON_VARIANT,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  options: [
                    {
                      label: $t('propertyConfig.07a171fda0260038'),
                      value: ButtonVariantTypes.PRIMARY,
                    },
                    {
                      label: $t('propertyConfig.21d00eb36a68f30e'),
                      value: ButtonVariantTypes.SECONDARY,
                    },
                    {
                      label: $t('propertyConfig.2dc83614410de920'),
                      value: ButtonVariantTypes.TERTIARY,
                    },
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        default: ButtonVariantTypes.PRIMARY,
                        allowedValues: [
                          ButtonVariantTypes.PRIMARY,
                          ButtonVariantTypes.SECONDARY,
                          ButtonVariantTypes.TERTIARY,
                        ],
                      },
                    },
                  },
                },
                {
                  propertyName: "borderRadius",
                  label: $t('propertyConfig.629494e280dfd7f0'),
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  getStylesheetValue: getPrimaryColumnStylesheetValue,
                  helpText:
                    $t('propertyConfig.86ea86a9ff0b519b'),
                  controlType: "BORDER_RADIUS_OPTIONS",
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.BORDER_RADIUS,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                    },
                  },
                },
                {
                  propertyName: "boxShadow",
                  label: $t('propertyConfig.6855540cb6f55de8'),
                  helpText:
                    $t('propertyConfig.11da0ea7d7c09a1c'),
                  controlType: "BOX_SHADOW_OPTIONS",
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  updateHook: removeBoxShadowColorProp,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.BOX_SHADOW,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                    },
                  },
                },
                {
                  propertyName: "menuColor",
                  helpText:
                    $t('propertyConfig.177a2f594b2f7a83'),
                  label: $t('propertyConfig.2dcbbd1570a44eaf'),
                  controlType: "PRIMARY_COLUMNS_COLOR_PICKER",
                  customJSControl: "COMPUTE_VALUE",
                  isJSConvertible: true,
                  isBindProperty: true,
                  getStylesheetValue: getPrimaryColumnStylesheetValue,
                  isTriggerProperty: false,
                  placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
                  validation: {
                    type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
                    params: {
                      type: ValidationTypes.TEXT,
                      params: {
                        regex: /^(?![<|{{]).+/,
                      },
                    },
                  },
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.MENU_COLOR,
                    );
                  },
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  // Remove menu Style once Custom is Chosen
                  updateHook: updateDerivedColumnsHook,
                },
                {
                  propertyName: "menuVariant",
                  label: $t('propertyConfig.c88218b2bf70dc75'),
                  controlType: "DROP_DOWN",
                  helpText: $t('propertyConfig.44c9920baccd6da6'),
                  options: [
                    {
                      label: $t('propertyConfig.07a171fda0260038'),
                      value: ButtonVariantTypes.PRIMARY,
                    },
                    {
                      label: $t('propertyConfig.21d00eb36a68f30e'),
                      value: ButtonVariantTypes.SECONDARY,
                    },
                    {
                      label: $t('propertyConfig.2dc83614410de920'),
                      value: ButtonVariantTypes.TERTIARY,
                    },
                  ],
                  isJSConvertible: true,
                  updateHook: updateDerivedColumnsHook,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.MENU_VARIANT,
                    );
                  },
                  isBindProperty: true,
                  isTriggerProperty: false,
                  validation: {
                    type: ValidationTypes.TEXT,
                    params: {
                      default: ButtonVariantTypes.PRIMARY,
                      allowedValues: [
                        ButtonVariantTypes.PRIMARY,
                        ButtonVariantTypes.SECONDARY,
                        ButtonVariantTypes.TERTIARY,
                      ],
                    },
                  },
                },
                {
                  helpText: $t('propertyConfig.946a8c1b5af668af'),
                  propertyName: "onClick",
                  label: "onClick",
                  controlType: "ACTION_SELECTOR",
                  additionalAutoComplete: (props: TableWidgetProps) => ({
                    currentRow: Object.assign(
                      {},
                      ...Object.keys(props.primaryColumns).map((key) => ({
                        [key]: "",
                      })),
                    ),
                  }),
                  isJSConvertible: true,
                  dependencies: [
                    "primaryColumns",
                    "derivedColumns",
                    "columnOrder",
                  ],
                  isBindProperty: true,
                  isTriggerProperty: true,
                  hidden: (props: TableWidgetProps, propertyPath: string) => {
                    return hideByColumnType(
                      props,
                      propertyPath,
                      HIDE_BY_COLUMN_TYPES.ON_CLICK,
                    );
                  },
                },
              ],
            },
            {
              sectionName: $t('propertyConfig.5dfdde7aa5b27e98'),
              hidden: (props: TableWidgetProps, propertyPath: string) => {
                return hideByColumnType(
                  props,
                  propertyPath,
                  HIDE_BY_COLUMN_TYPES.MENU_OPTIONS,
                  true,
                );
              },
              updateHook: updateDerivedColumnsHook,
              children: [
                {
                  helpText: $t('propertyConfig.5dfdde7aa5b27e98'),
                  propertyName: "menuItems",
                  controlType: "MENU_ITEMS",
                  label: "",
                  isBindProperty: false,
                  isTriggerProperty: false,
                  dependencies: ["derivedColumns", "columnOrder"],
                  panelConfig: {
                    editableTitle: true,
                    titlePropertyName: "label",
                    panelIdPropertyName: "id",
                    updateHook: updateDerivedColumnsHook,
                    dependencies: [
                      "primaryColumns",
                      "derivedColumns",
                      "columnOrder",
                    ],
                    children: [
                      {
                        sectionName: $t('propertyConfig.971f5046d9453a97'),
                        children: [
                          {
                            propertyName: "label",
                            helpText: $t('propertyConfig.462544a51a65a6ea'),
                            label: $t('propertyConfig.4e3748d3e26b37f4'),
                            controlType: "INPUT_TEXT",
                            placeholderText: $t('propertyConfig.415922b362e3abcb'),
                            isBindProperty: true,
                            isTriggerProperty: false,
                            validation: { type: ValidationTypes.TEXT },
                            updateHook: updateDerivedColumnsHook,

                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                          {
                            propertyName: "backgroundColor",
                            helpText:
                              $t('propertyConfig.185b0d3dfcb0db5b'),
                            label: $t('propertyConfig.26c5db2109847630'),
                            controlType: "PRIMARY_COLUMNS_COLOR_PICKER",
                            isJSConvertible: true,
                            isBindProperty: true,
                            isTriggerProperty: false,
                            updateHook: updateDerivedColumnsHook,

                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                            validation: { type: ValidationTypes.TEXT },
                          },
                          {
                            propertyName: "textColor",
                            helpText: $t('propertyConfig.03b829e49df04dd3'),
                            label: $t('propertyConfig.7a3d534e039b979f'),
                            controlType: "PRIMARY_COLUMNS_COLOR_PICKER",
                            isBindProperty: false,
                            isTriggerProperty: false,
                            updateHook: updateDerivedColumnsHook,

                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                          {
                            propertyName: "isDisabled",
                            helpText: $t('propertyConfig.43455e16911773f7'),
                            label: $t('propertyConfig.34f4b4b7e0c85683'),
                            controlType: "SWITCH",
                            isJSConvertible: true,
                            isBindProperty: true,
                            isTriggerProperty: false,
                            validation: { type: ValidationTypes.BOOLEAN },
                            updateHook: updateDerivedColumnsHook,

                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                          {
                            propertyName: "isVisible",
                            helpText: $t('propertyConfig.a0a18b6fa5645e22'),
                            label: $t('propertyConfig.e3abcca425b39d02'),
                            controlType: "SWITCH",
                            isJSConvertible: true,
                            isBindProperty: true,
                            isTriggerProperty: false,
                            validation: { type: ValidationTypes.BOOLEAN },
                            updateHook: updateDerivedColumnsHook,

                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                        ],
                      },
                      {
                        sectionName: $t('propertyConfig.cdf444f024a8be4d'),
                        children: [
                          {
                            propertyName: "iconName",
                            label: $t('propertyConfig.75f866f3268395f4'),
                            helpText:
                              $t('propertyConfig.2f1631fea8f224b1'),
                            controlType: "ICON_SELECT",
                            isBindProperty: false,
                            isTriggerProperty: false,
                            validation: { type: ValidationTypes.TEXT },
                            updateHook: updateDerivedColumnsHook,
                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                          {
                            propertyName: "iconColor",
                            helpText: $t('propertyConfig.16b158bdb3581073'),
                            label: $t('propertyConfig.8404f7033884cffa'),
                            controlType: "PRIMARY_COLUMNS_COLOR_PICKER",
                            isBindProperty: false,
                            isTriggerProperty: false,
                            updateHook: updateDerivedColumnsHook,

                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                          {
                            propertyName: "iconAlign",
                            label: $t('propertyConfig.419187d820c70728'),
                            helpText: $t('propertyConfig.8860a9c391a09a1d'),
                            controlType: "ICON_TABS",
                            defaultValue: "left",
                            options: [
                              {
                                startIcon: "align-left",
                                value: "left",
                              },
                              {
                                startIcon: "align-right",
                                value: "right",
                              },
                            ],
                            isBindProperty: false,
                            isTriggerProperty: false,
                            validation: { type: ValidationTypes.TEXT },
                            updateHook: updateDerivedColumnsHook,

                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                        ],
                      },
                      {
                        sectionName: $t('propertyConfig.1fd8503d2f1a4f1a'),
                        children: [
                          {
                            helpText: $t('propertyConfig.b530660a3ecda27d'),
                            propertyName: "onClick",
                            label: "onItemClick",
                            controlType: "ACTION_SELECTOR",
                            isJSConvertible: true,
                            isBindProperty: true,
                            isTriggerProperty: true,
                            dependencies: [
                              "primaryColumns",
                              "derivedColumns",
                              "columnOrder",
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      },
      {
        helpText:
          $t('propertyConfig.427a3a2b09cfa6f7'),
        propertyName: "primaryColumnId",
        dependencies: ["primaryColumns"],
        label: $t('propertyConfig.c0854c157d57d161'),
        controlType: "PRIMARY_COLUMNS_DROPDOWN",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "defaultSearchText",
        label: $t('propertyConfig.c3f23eed2a8104af'),
        controlType: "INPUT_TEXT",
        placeholderText: "{{appsmith.user.name}}",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('propertyConfig.d335bac7f011f63f'),
        propertyName: "defaultSelectedRow",
        label: $t('propertyConfig.e80ec555aff50741'),
        controlType: "INPUT_TEXT",
        placeholderText: "0",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultSelectedRowValidation,
            expected: {
              type: $t('propertyConfig.d6c23bc6fb8c445b'),
              example: "0 | [0, 1]",
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        dependencies: ["multiRowSelection"],
      },
      {
        propertyName: "compactMode",
        helpText: $t('propertyConfig.666ceb39acc600c3'),
        label: $t('propertyConfig.b150a3b581b6dab9'),
        controlType: "DROP_DOWN",
        defaultValue: "DEFAULT",
        isBindProperty: true,
        isTriggerProperty: false,
        options: [
          {
            label: $t('propertyConfig.001f627c7ca6247c'),
            value: "SHORT",
          },
          {
            label: $t('propertyConfig.e9d9d1e2ff9ecfc1'),
            value: "DEFAULT",
          },
          {
            label: "Tall",
            value: "TALL",
          },
        ],
      },
      {
        helpText:
          $t('propertyConfig.52aec12ebbfc8631'),
        propertyName: "serverSidePaginationEnabled",
        label: $t('propertyConfig.b7c23c293bf16596'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        helpText: createMessage(TABLE_WIDGET_TOTAL_RECORD_TOOLTIP),
        propertyName: "totalRecordsCount",
        label: $t('propertyConfig.e9e6b3f25f354d59'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('propertyConfig.aa4afe541a2e7b4b'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: totalRecordsCountValidation,
            expected: {
              type: $t('propertyConfig.02c8499b7f263013'),
              example: "10",
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        hidden: (props: TableWidgetProps) =>
          !!!props.serverSidePaginationEnabled,
        dependencies: ["serverSidePaginationEnabled"],
      },
      {
        helpText: $t('propertyConfig.a0a18b6fa5645e22'),
        propertyName: "isVisible",
        isJSConvertible: true,
        label: $t('propertyConfig.e3abcca425b39d02'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "animateLoading",
        label: $t('propertyConfig.79a2b7664c636caf'),
        controlType: "SWITCH",
        helpText: $t('propertyConfig.5b366e9d81a621f9'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('propertyConfig.152a6563796af6ee'),
        propertyName: "isSortable",
        isJSConvertible: true,
        label: $t('propertyConfig.4a85a2f58d2f9ce6'),
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
        propertyName: "multiRowSelection",
        label: $t('propertyConfig.155b56634414c628'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "enableClientSideSearch",
        label: $t('propertyConfig.ab5a48254845eb57'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.1fd8503d2f1a4f1a'),
    children: [
      {
        helpText: $t('propertyConfig.5c93b26355c7787a'),
        propertyName: "onRowSelected",
        label: "onRowSelected",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        helpText: $t('propertyConfig.d4b7ceea01ada2ba'),
        propertyName: "onPageChange",
        label: "onPageChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        helpText: $t('propertyConfig.86b88d596752c7c4'),
        propertyName: "onPageSizeChange",
        label: "onPageSizeChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        propertyName: "onSearchTextChanged",
        label: "onSearchTextChanged",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
      {
        helpText: $t('propertyConfig.3672b297b56ef53f'),
        propertyName: "onSort",
        label: "onSort",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.e72406a9413dc99b'),
    children: [
      {
        helpText: $t('propertyConfig.a83b93cd87fedeef'),
        propertyName: "isVisibleSearch",
        label: $t('propertyConfig.bf38970ba0191d17'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('propertyConfig.3fe2b5367a5ef005'),
        propertyName: "isVisibleFilters",
        label: $t('propertyConfig.ffce05ea1f7bac5d'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('propertyConfig.9701a97a1401b969'),
        propertyName: "isVisibleDownload",
        label: $t('propertyConfig.be9922b5f743004e'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('propertyConfig.b588e428f3e2a2c7'),
        propertyName: "isVisiblePagination",
        label: $t('propertyConfig.a053e370fbc8472a'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "delimiter",
        label: $t('propertyConfig.c25c97cdd1b26507'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('propertyConfig.30fc7db192d7b726'),
        helpText: $t('propertyConfig.404c8da1b3cf3ad4'),
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
  },
  {
    sectionName: $t('propertyConfig.7408ae09a238b3c2'),
    children: [
      {
        propertyName: "cellBackground",
        label: $t('propertyConfig.2c140d992a2b5548'),
        controlType: "COLOR_PICKER",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns", "derivedColumns"],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "accentColor",
        label: $t('propertyConfig.3936ffca7c980aae'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        invisible: true,
      },
      {
        propertyName: "textColor",
        label: $t('propertyConfig.7a3d534e039b979f'),
        controlType: "COLOR_PICKER",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns", "derivedColumns"],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "textSize",
        label: $t('propertyConfig.9d98bff8891358d0'),
        controlType: "DROP_DOWN",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns", "derivedColumns"],
        options: [
          {
            label: "S",
            value: "0.875rem",
            subText: "0.875rem",
          },
          {
            label: "M",
            value: "1rem",
            subText: "1rem",
          },
          {
            label: "L",
            value: "1.25rem",
            subText: "1.25rem",
          },
          {
            label: "XL",
            value: "1.875rem",
            subText: "1.875rem",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "fontStyle",
        label: $t('propertyConfig.34580a93f662aed4'),
        controlType: "BUTTON_GROUP",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns", "derivedColumns"],
        options: [
          {
            icon: "text-bold",
            value: "BOLD",
          },
          {
            icon: "text-italic",
            value: "ITALIC",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "horizontalAlignment",
        label: $t('propertyConfig.b38bdf4b3d0aba77'),
        controlType: "ICON_TABS",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns", "derivedColumns"],
        options: [
          {
            startIcon: "align-left",
            value: "LEFT",
          },
          {
            startIcon: "align-center",
            value: "CENTER",
          },
          {
            startIcon: "align-right",
            value: "RIGHT",
          },
        ],
        defaultValue: "LEFT",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "verticalAlignment",
        label: $t('propertyConfig.5d3bbb5badd4c4ce'),
        controlType: "ICON_TABS",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns", "derivedColumns"],
        options: [
          {
            startIcon: "vertical-align-top",
            value: "TOP",
          },
          {
            startIcon: "vertical-align-middle",
            value: "CENTER",
          },
          {
            startIcon: "vertical-align-bottom",
            value: "BOTTOM",
          },
        ],
        defaultValue: "CENTER",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "borderRadius",
        label: $t('propertyConfig.629494e280dfd7f0'),
        helpText: $t('propertyConfig.86ea86a9ff0b519b'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('propertyConfig.6855540cb6f55de8'),
        helpText:
          $t('propertyConfig.11da0ea7d7c09a1c'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
] as PropertyPaneConfig[];
