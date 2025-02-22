import {$t} from "locale/index";
import type { TableWidgetProps } from "widgets/TableWidgetV2/constants";
import { ColumnTypes } from "widgets/TableWidgetV2/constants";
import { get } from "lodash";
import { hideByColumnType } from "../../propertyUtils";
import commonValidations from "./Validations/Common";
import numberTypeValidations from "./Validations/Number";
import dateTypeValidations from "./Validations/Date";

export default {
  sectionName: $t('Validation.6f95899f49fd7271'),
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
          ColumnTypes.SELECT,
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
