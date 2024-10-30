import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { get } from "lodash";
import { allowedFirstDayOfWeekRange } from "../../propertyUtils";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";

export default {
  sectionName: $t('DateProperties.e39c029278c763bc'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    const columnType = get(props, `${propertyPath}.columnType`, "");
    const isEditable = get(props, `${propertyPath}.isEditable`, "");

    return columnType !== ColumnTypes.DATE || !isEditable;
  },
  children: [
    {
      propertyName: "firstDayOfWeek",
      label: $t('DateProperties.06f7ed5b652cea23'),
      helpText: $t('DateProperties.e7d308b7d7e4fe05'),
      controlType: "INPUT_TEXT",
      defaultValue: "0",
      inputType: "NUMBER",
      isBindProperty: true,
      isTriggerProperty: false,
      dependencies: ["primaryColumns", "columnType"],
      validation: {
        type: ValidationTypes.FUNCTION,
        params: {
          fnString: allowedFirstDayOfWeekRange.toString(),
          expected: {
            type: "0 : sunday\n1 : monday\n2 : tuesday\n3 : wednesday\n4 : thursday\n5 : friday\n6 : saturday",
            example: "0",
            autocompleteDataType: AutocompleteDataType.STRING,
          },
        },
      },
    },
    {
      propertyName: "shortcuts",
      label: $t('DateProperties.9553bd62f034ffd4'),
      helpText: $t('DateProperties.11f6fe9526db6fae'),
      controlType: "SWITCH",
      isJSConvertible: false,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.BOOLEAN },
      dependencies: ["primaryColumns", "columnType"],
    },
  ],
};
