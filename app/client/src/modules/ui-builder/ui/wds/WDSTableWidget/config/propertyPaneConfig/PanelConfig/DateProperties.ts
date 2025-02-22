import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { get } from "lodash";
import { allowedFirstDayOfWeekRange } from "../../../widget/propertyUtils";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";

export default {
  sectionName: $t('DateProperties.c5b40cfee37c4dc1'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    const columnType = get(props, `${propertyPath}.columnType`, "");
    const isEditable = get(props, `${propertyPath}.isEditable`, "");

    return columnType !== ColumnTypes.DATE || !isEditable;
  },
  children: [
    {
      propertyName: "firstDayOfWeek",
      label: $t('DateProperties.c3d2b7d98a0ad621'),
      helpText: $t('DateProperties.66859c07a6844f71'),
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
      label: $t('DateProperties.ca48a7bca7dbead5'),
      helpText: $t('DateProperties.73321ef75e61f972'),
      controlType: "SWITCH",
      isJSConvertible: false,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: { type: ValidationTypes.BOOLEAN },
      dependencies: ["primaryColumns", "columnType"],
    },
  ],
};
