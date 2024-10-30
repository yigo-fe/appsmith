import {$t} from "locale/index";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { get } from "lodash";
import { hideByColumnType } from "../../../widget/propertyUtils";
import commonValidations from "./Validations/Common";
import numberTypeValidations from "./Validations/Number";
import dateTypeValidations from "./Validations/Date";
import { ColumnTypes } from "../../../constants";

export default {
  sectionName: $t('Validation.2a5b92db160d7f34'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    const isEditable = get(props, `${propertyPath}.isEditable`, "");

    return (
      !isEditable ||
      hideByColumnType(
        props,
        propertyPath,
        [
          ColumnTypes.TEXT,
          ColumnTypes.NUMBER,
          ColumnTypes.DATE,
          ColumnTypes.CURRENCY,
        ],
        true,
      )
    );
  },
  children: [
    ...numberTypeValidations,
    ...dateTypeValidations,
    ...commonValidations,
  ],
};
