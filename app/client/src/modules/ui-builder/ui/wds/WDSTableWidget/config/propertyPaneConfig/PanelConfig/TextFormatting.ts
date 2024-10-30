import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  hideByColumnType,
  showByColumnType,
} from "../../../widget/propertyUtils";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";

export default {
  sectionName: $t('TextFormatting.ec8117af5e6a5bee'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    return showByColumnType(
      props,
      propertyPath,
      [ColumnTypes.CHECKBOX, ColumnTypes.SWITCH],
      true,
    );
  },
  children: [
    {
      propertyName: "fontStyle",
      label: $t('TextFormatting.be6e3a8c92496a3b'),
      helpText: $t('TextFormatting.1859be79bb3c669b'),
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
      ],
      isJSConvertible: true,

      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.TEXT,
          ColumnTypes.DATE,
          ColumnTypes.NUMBER,
          ColumnTypes.CURRENCY,
          ColumnTypes.URL,
        ]);
      },
    },
  ],
};
