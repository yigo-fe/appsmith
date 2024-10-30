import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { get } from "lodash";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import {
  getBasePropertyPath,
  hideByColumnType,
  selectColumnOptionsValidation,
} from "../../propertyUtils";
import { TableSelectColumnOptionKeys } from "widgets/TableWidgetV2/component/Constants";

export default {
  sectionName: $t('Select.24e69a117b504bd0'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    return hideByColumnType(props, propertyPath, [ColumnTypes.SELECT], true);
  },
  children: [
    {
      propertyName: "selectOptions",
      helpText: $t('Select.355368609a1a5175'),
      label: $t('Select.de9e0b19930859ba'),
      controlType: "TABLE_COMPUTE_VALUE",
      isJSConvertible: false,
      isBindProperty: true,
      validation: {
        type: ValidationTypes.FUNCTION,
        params: {
          expected: {
            type: 'Array<{ "label": string | number, "value": string | number}>',
            example: '[{"label": "abc", "value": "abc"}]',
          },
          fnString: selectColumnOptionsValidation.toString(),
        },
      },
      isTriggerProperty: false,
      dependencies: ["primaryColumns"],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.SELECT]);
      },
    },
    {
      propertyName: "sortBy",
      defaultValue: "value",
      helpText: $t('Select.9d4ba55e59431e17'),
      label: $t('Select.dc185f2a36351fd3'),
      controlType: "DROP_DOWN",
      isBindProperty: true,
      isJSConvertible: false,
      isTriggerProperty: false,
      options: [
        {
          label: $t('Select.254d26470679557e'),
          value: TableSelectColumnOptionKeys.LABEL,
        },
        {
          label: $t('Select.8e87e12b7294f19f'),
          value: TableSelectColumnOptionKeys.VALUE,
        },
      ],
      validation: {
        type: ValidationTypes.TEXT,
        params: {
          allowedValues: [
            TableSelectColumnOptionKeys.LABEL,
            TableSelectColumnOptionKeys.VALUE,
          ],
        },
      },
    },
    {
      propertyName: "allowSameOptionsInNewRow",
      defaultValue: true,
      helpText:
        $t('Select.8c9bbfc907df12bf'),
      label: $t('Select.839c62ec35c8abeb'),
      controlType: "SWITCH",
      isBindProperty: true,
      isJSConvertible: true,
      isTriggerProperty: false,
      hidden: (props: TableWidgetProps) => {
        return !props.allowAddNewRow;
      },
      dependencies: ["primaryColumns", "allowAddNewRow"],
      validation: { type: ValidationTypes.BOOLEAN },
    },
    {
      propertyName: "newRowSelectOptions",
      helpText:
        $t('Select.962392656677fcf0'),
      label: $t('Select.9d3426a8a02557fb'),
      controlType: "INPUT_TEXT",
      isJSConvertible: false,
      isBindProperty: true,
      validation: {
        type: ValidationTypes.FUNCTION,
        params: {
          expected: {
            type: 'Array<{ "label": string | number, "value": string | number}>',
            example: '[{"label": "abc", "value": "abc"}]',
          },
          fnString: selectColumnOptionsValidation.toString(),
        },
      },
      isTriggerProperty: false,
      dependencies: ["primaryColumns", "allowAddNewRow"],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        const baseProperty = getBasePropertyPath(propertyPath);

        if (baseProperty) {
          const columnType = get(props, `${baseProperty}.columnType`, "");
          const allowSameOptionsInNewRow = get(
            props,
            `${baseProperty}.allowSameOptionsInNewRow`,
          );

          if (
            columnType === ColumnTypes.SELECT &&
            props.allowAddNewRow &&
            !allowSameOptionsInNewRow
          ) {
            return false;
          } else {
            return true;
          }
        }
      },
    },
    {
      propertyName: "placeholderText",
      helpText: $t('Select.483f00d65f9b201c'),
      label: $t('Select.29cfaba50dd87cf5'),
      controlType: "INPUT_TEXT",
      placeholderText: $t('Select.aaf3a87a7119ec57'),
      isBindProperty: true,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.TEXT },
    },
    {
      propertyName: "isFilterable",
      label: $t('Select.acfd1fdcfdc78fb4'),
      helpText: $t('Select.47bc5aa27699bac8'),
      controlType: "SWITCH",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.BOOLEAN },
    },
    {
      propertyName: "resetFilterTextOnClose",
      label: $t('Select.b610cdfa73578ba3'),
      helpText: $t('Select.2a744624b7473302'),
      controlType: "SWITCH",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.BOOLEAN },
    },
    {
      propertyName: "serverSideFiltering",
      helpText: $t('Select.97d80f7637062ff9'),
      label: $t('Select.eaf296ca6d136cbc'),
      controlType: "SWITCH",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.BOOLEAN },
    },
  ],
};
