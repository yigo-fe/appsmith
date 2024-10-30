import {$t} from "locale/index";
import { get } from "lodash";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  hideByColumnType,
  getBasePropertyPath,
} from "../../../widget/propertyUtils";
import { ButtonVariantTypes } from "components/constants";
import { ICON_NAMES } from "WidgetProvider/constants";

export default {
  sectionName: $t('DiscardButtonproperties.b7c04aa0303e74fb'),
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
      sectionName: $t('DiscardButtonproperties.57b3d0b8e84fe776'),
      collapsible: false,
      children: [
        {
          propertyName: "discardActionLabel",
          label: $t('DiscardButtonproperties.a8c844c48543c753'),
          helpText: $t('DiscardButtonproperties.a4468f1c868a2012'),

          dependencies: ["primaryColumns"],
          isBindProperty: true,
          isTriggerProperty: false,
        },
      ],
    },
    {
      sectionName: $t('DiscardButtonproperties.c534aded34aceb95'),
      collapsible: false,
      children: [
        {
          propertyName: "onDiscard",
          label: "onDiscard",
          helpText: $t('DiscardButtonproperties.df99a4664de28ec1'),
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
          propertyName: "isDiscardVisible",
          dependencies: ["primaryColumns"],
          label: $t('DiscardButtonproperties.92a793f28aa06a92'),
          helpText: $t('DiscardButtonproperties.72c7f5740f4de214'),
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
          propertyName: "isDiscardDisabled",
          label: $t('DiscardButtonproperties.606ff9f36cd1d651'),
          helpText: $t('DiscardButtonproperties.b3b7819cc8573536'),
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

export const discardButtonStyleConfig = {
  sectionName: $t('DiscardButtonproperties.b7c04aa0303e74fb'),
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
      sectionName: $t('DiscardButtonproperties.c534aded34aceb95'),
      collapsible: false,
      children: [
        {
          propertyName: "discardButtonColor",
          label: $t('DiscardButtonproperties.d0596d9b0542c8e1'),
          controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
          helpText: $t('DiscardButtonproperties.c8d1591758501dc5'),
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
          propertyName: "discardButtonVariant",
          label: $t('DiscardButtonproperties.9a5a70b6df9f14a5'),
          controlType: "ICON_TABS",
          fullWidth: true,

          isJSConvertible: true,
          helpText: $t('DiscardButtonproperties.f1ea6253caf72c67'),
          dependencies: ["primaryColumns"],
          options: [
            {
              label: $t('DiscardButtonproperties.79c5f9a25ae26945'),
              value: ButtonVariantTypes.PRIMARY,
            },
            {
              label: $t('DiscardButtonproperties.75120b6cf616db5b'),
              value: ButtonVariantTypes.SECONDARY,
            },
            {
              label: $t('DiscardButtonproperties.d8fa4ba76f8c58d4'),
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
          propertyName: "discardBorderRadius",
          label: $t('DiscardButtonproperties.206c5c687832f796'),

          isJSConvertible: true,
          helpText:
            $t('DiscardButtonproperties.0b0c1315b4780e71'),
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
      sectionName: $t('DiscardButtonproperties.b4ec17da872730cd'),
      collapsible: false,
      children: [
        {
          propertyName: "discardActionIconName",
          label: $t('DiscardButtonproperties.b4ec17da872730cd'),
          helpText: $t('DiscardButtonproperties.6def62449e968861'),
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
          propertyName: "discardIconAlign",
          label: $t('DiscardButtonproperties.b723da686b94d8e8'),
          helpText: $t('DiscardButtonproperties.6e7577f2c8aca68f'),
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
