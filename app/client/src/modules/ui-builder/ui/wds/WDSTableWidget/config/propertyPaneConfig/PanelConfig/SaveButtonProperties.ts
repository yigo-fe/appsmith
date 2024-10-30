import {$t} from "locale/index";
import { get } from "lodash";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  hideByColumnType,
  getBasePropertyPath,
} from "../../../widget/propertyUtils";
import { ButtonVariantTypes } from "components/constants";
import { ICON_NAMES } from "WidgetProvider/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";

export default {
  sectionName: $t('SaveButtonProperties.bde1273781c0ded3'),
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
      sectionName: $t('SaveButtonProperties.fbe3707e2eac9f7e'),
      collapsible: false,
      children: [
        {
          propertyName: "saveActionLabel",
          label: $t('SaveButtonProperties.315770b964c64133'),
          helpText: $t('SaveButtonProperties.07e62e1f3a68dfe6'),

          dependencies: ["primaryColumns"],
          isBindProperty: true,
          isTriggerProperty: false,
        },
      ],
    },
    {
      sectionName: $t('SaveButtonProperties.f206b0bb490501c4'),
      collapsible: false,
      children: [
        {
          propertyName: "onSave",
          label: "onSave",
          helpText: $t('SaveButtonProperties.6681b2bfef3ff560'),
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
          label: $t('SaveButtonProperties.4642aceec8734112'),
          helpText: $t('SaveButtonProperties.8b99b093651d49d6'),
          defaultValue: true,
          controlType: "SWITCH",

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
          label: $t('SaveButtonProperties.cfe4bf8f02c61dbc'),
          helpText: $t('SaveButtonProperties.21f4ca37bc6585a2'),
          defaultValue: false,
          controlType: "SWITCH",

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
  sectionName: $t('SaveButtonProperties.bde1273781c0ded3'),
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
      sectionName: $t('SaveButtonProperties.f206b0bb490501c4'),
      collapsible: false,
      children: [
        {
          propertyName: "saveButtonColor",
          label: $t('SaveButtonProperties.161d9207b11de846'),
          controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
          helpText: $t('SaveButtonProperties.e6458e28a2f9c2c1'),
          isJSConvertible: true,

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
          label: $t('SaveButtonProperties.ea6f94283b8ff76f'),
          controlType: "ICON_TABS",
          fullWidth: true,

          isJSConvertible: true,
          helpText: $t('SaveButtonProperties.f5619551b8c8ef9f'),
          dependencies: ["primaryColumns"],
          options: [
            {
              label: $t('SaveButtonProperties.e93c36a972ae554a'),
              value: ButtonVariantTypes.PRIMARY,
            },
            {
              label: $t('SaveButtonProperties.6d3f390e658b4188'),
              value: ButtonVariantTypes.SECONDARY,
            },
            {
              label: $t('SaveButtonProperties.a7298066bed8c115'),
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
          label: $t('SaveButtonProperties.0a454a8d3b9daeb4'),

          isJSConvertible: true,
          helpText: $t('SaveButtonProperties.48e309587645d34f'),
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
      sectionName: $t('SaveButtonProperties.31cd0ab65df4519c'),
      collapsible: false,
      children: [
        {
          propertyName: "saveActionIconName",
          label: $t('SaveButtonProperties.31cd0ab65df4519c'),
          helpText: $t('SaveButtonProperties.0c4b538bd1fc9a66'),
          dependencies: ["primaryColumns", "columnOrder"],
          controlType: "ICON_SELECT",

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
          label: $t('SaveButtonProperties.405f509581fc8c05'),
          helpText: $t('SaveButtonProperties.1b8cfd7dd5aef4ed'),
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
