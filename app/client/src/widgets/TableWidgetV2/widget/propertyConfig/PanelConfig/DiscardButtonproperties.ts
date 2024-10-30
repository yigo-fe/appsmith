import {$t} from "locale/index";
import { get } from "lodash";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { hideByColumnType, getBasePropertyPath } from "../../propertyUtils";
import { ButtonVariantTypes } from "components/constants";
import { ICON_NAMES } from "WidgetProvider/constants";

export default {
  sectionName: $t('DiscardButtonproperties.64d5c94567d07f7c'),
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
      sectionName: $t('DiscardButtonproperties.572148fbb8d968e1'),
      collapsible: false,
      children: [
        {
          propertyName: "discardActionLabel",
          label: $t('DiscardButtonproperties.69c0a35c622f10fc'),
          helpText: $t('DiscardButtonproperties.4595c1f1584cecf8'),
          controlType: "TABLE_COMPUTE_VALUE",
          dependencies: ["primaryColumns"],
          isBindProperty: true,
          isTriggerProperty: false,
        },
      ],
    },
    {
      sectionName: $t('DiscardButtonproperties.324a77d85dec7eac'),
      collapsible: false,
      children: [
        {
          propertyName: "onDiscard",
          label: "onDiscard",
          helpText: $t('DiscardButtonproperties.bf3596ac4fa2c389'),
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
          label: $t('DiscardButtonproperties.1a2de9c99fa191ba'),
          helpText: $t('DiscardButtonproperties.d07a104bc00fc8e8'),
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
          propertyName: "isDiscardDisabled",
          label: $t('DiscardButtonproperties.1b6e3dcab13570c4'),
          helpText: $t('DiscardButtonproperties.d4c4a7f07a70df43'),
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

export const discardButtonStyleConfig = {
  sectionName: $t('DiscardButtonproperties.64d5c94567d07f7c'),
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
      sectionName: $t('DiscardButtonproperties.324a77d85dec7eac'),
      collapsible: false,
      children: [
        {
          propertyName: "discardButtonColor",
          label: $t('DiscardButtonproperties.3ec1e6bd4ed83892'),
          controlType: "PRIMARY_COLUMNS_COLOR_PICKER_V2",
          helpText: $t('DiscardButtonproperties.3d80a8b30f87141f'),
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
          propertyName: "discardButtonVariant",
          label: $t('DiscardButtonproperties.ab42073560fbde66'),
          controlType: "ICON_TABS",
          fullWidth: true,
          customJSControl: "TABLE_COMPUTE_VALUE",
          isJSConvertible: true,
          helpText: $t('DiscardButtonproperties.1104c7a8439fbb1a'),
          dependencies: ["primaryColumns"],
          options: [
            {
              label: $t('DiscardButtonproperties.3a885f725dbaf320'),
              value: ButtonVariantTypes.PRIMARY,
            },
            {
              label: $t('DiscardButtonproperties.d7d609274f907374'),
              value: ButtonVariantTypes.SECONDARY,
            },
            {
              label: $t('DiscardButtonproperties.b842ce4398effae5'),
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
          label: $t('DiscardButtonproperties.2f55a5b99994ee26'),
          customJSControl: "TABLE_COMPUTE_VALUE",
          isJSConvertible: true,
          helpText:
            $t('DiscardButtonproperties.58be5180efde6320'),
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
      sectionName: $t('DiscardButtonproperties.1f1d47c986b3387c'),
      collapsible: false,
      children: [
        {
          propertyName: "discardActionIconName",
          label: $t('DiscardButtonproperties.1f1d47c986b3387c'),
          helpText: $t('DiscardButtonproperties.646432aa6979ac4d'),
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
          propertyName: "discardIconAlign",
          label: $t('DiscardButtonproperties.75e01f6b544970d3'),
          helpText: $t('DiscardButtonproperties.eb1703abc73ed136'),
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
