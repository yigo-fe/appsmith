import {$t} from "locale/index";
import { get } from "lodash";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { hideByColumnType, getBasePropertyPath } from "../../propertyUtils";
import { ButtonVariantTypes } from "components/constants";
import { ICON_NAMES } from "WidgetProvider/constants";

export default {
  sectionName: $t('SaveButtonProperties.3f3512bab8d37d41'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    return hideByColumnType(
      props,
      propertyPath,
      [ColumnTypes.EDIT_ACTIONS],
      true,
    );
  },
  children: [
    {
      sectionName: $t('SaveButtonProperties.7f90af00c7270194'),
      collapsible: false,
      children: [
        {
          propertyName: "saveActionLabel",
          label: $t('SaveButtonProperties.1bdcf63b8941df00'),
          helpText: $t('SaveButtonProperties.c863d561908891db'),
          controlType: "TABLE_COMPUTE_VALUE",
          dependencies: ["primaryColumns"],
          isBindProperty: true,
          isTriggerProperty: false,
        },
      ],
    },
    {
      sectionName: $t('SaveButtonProperties.df2a39d58dd5c8eb'),
      collapsible: false,
      children: [
        {
          propertyName: "onSave",
          label: "onSave",
          helpText: $t('SaveButtonProperties.9e13e2d930246381'),
          controlType: "ACTION_SELECTOR",
          hidden: (props: TableWidgetProps, propertyPath: string) => {
            const baseProperty = getBasePropertyPath(propertyPath);
            const columnType = get(props, `${baseProperty}.columnType`, "");

            return columnType !== ColumnTypes.EDIT_ACTIONS;
          },
          dependencies: ["primaryColumns"],
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: true,
        },
        {
          propertyName: "isSaveVisible",
          dependencies: ["primaryColumns"],
          label: $t('SaveButtonProperties.f8772874c899e8ad'),
          helpText: $t('SaveButtonProperties.5d09cc0caa7b2807'),
          defaultValue: true,
          controlType: "SWITCH",
          customJSControl: "TABLE_COMPUTE_VALUE",
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
          propertyName: "isSaveDisabled",
          label: $t('SaveButtonProperties.a73398e0b0a973d5'),
          helpText: $t('SaveButtonProperties.48d98ed75880b6fa'),
          defaultValue: false,
          controlType: "SWITCH",
          customJSControl: "TABLE_COMPUTE_VALUE",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          dependencies: ["primaryColumns"],
        },
      ],
    },
  ],
};

export const saveButtonStyleConfig = {
  sectionName: $t('SaveButtonProperties.3f3512bab8d37d41'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    return hideByColumnType(
      props,
      propertyPath,
      [ColumnTypes.EDIT_ACTIONS],
      true,
    );
  },
  children: [
    {
      sectionName: $t('SaveButtonProperties.df2a39d58dd5c8eb'),
      collapsible: false,
      children: [
        {
          propertyName: "saveButtonColor",
          label: $t('SaveButtonProperties.5b1b787680b1e26b'),
          controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
          helpText: $t('SaveButtonProperties.af756edc2e2edd95'),
          isJSConvertible: true,
          customJSControl: "TABLE_COMPUTE_VALUE",
          dependencies: ["primaryColumns"],
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
          propertyName: "saveButtonVariant",
          label: $t('SaveButtonProperties.1302e327ba5f6cae'),
          controlType: "ICON_TABS",
          fullWidth: true,
          customJSControl: "TABLE_COMPUTE_VALUE",
          isJSConvertible: true,
          helpText: $t('SaveButtonProperties.e97fe74aa1ad12d0'),
          dependencies: ["primaryColumns"],
          options: [
            {
              label: $t('SaveButtonProperties.3792f49e1870d810'),
              value: ButtonVariantTypes.PRIMARY,
            },
            {
              label: $t('SaveButtonProperties.a6c6b57bb4eecca0'),
              value: ButtonVariantTypes.SECONDARY,
            },
            {
              label: $t('SaveButtonProperties.69901e64e97d2669'),
              value: ButtonVariantTypes.TERTIARY,
            },
          ],
          defaultValue: ButtonVariantTypes.PRIMARY,
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
          propertyName: "saveBorderRadius",
          label: $t('SaveButtonProperties.77536f3ee2989c59'),
          customJSControl: "TABLE_COMPUTE_VALUE",
          isJSConvertible: true,
          helpText: $t('SaveButtonProperties.73ebaea9cb710a50'),
          controlType: "BORDER_RADIUS_OPTIONS",
          dependencies: ["primaryColumns"],
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
            params: {
              type: ValidationTypes.TEXT,
            },
          },
        },
      ],
    },
    {
      sectionName: $t('SaveButtonProperties.b5609e7cf3cf94d2'),
      collapsible: false,
      children: [
        {
          propertyName: "saveActionIconName",
          label: $t('SaveButtonProperties.b5609e7cf3cf94d2'),
          helpText: $t('SaveButtonProperties.e13edb391f87a4bf'),
          dependencies: ["primaryColumns", "columnOrder"],
          controlType: "ICON_SELECT",
          customJSControl: "TABLE_COMPUTE_VALUE",
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
          propertyName: "saveIconAlign",
          label: $t('SaveButtonProperties.3c95a54da74592e1'),
          helpText: $t('SaveButtonProperties.01ef48e2729119e7'),
          controlType: "ICON_TABS",
          fullWidth: false,
          defaultValue: "left",
          options: [
            {
              startIcon: "skip-left-line",
              value: "left",
            },
            {
              startIcon: "skip-right-line",
              value: "right",
            },
          ],
          isBindProperty: false,
          isTriggerProperty: false,
          dependencies: ["primaryColumns"],
          validation: {
            type: ValidationTypes.TEXT,
            params: {
              allowedValues: ["left", "right"],
            },
          },
        },
      ],
    },
  ],
};
