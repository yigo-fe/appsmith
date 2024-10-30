import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { COLORS } from "@appsmith/wds";
import capitalize from "lodash/capitalize";
import {
  ColumnTypes,
  type TableWidgetProps,
} from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { showByColumnType } from "modules/ui-builder/ui/wds/WDSTableWidget/widget/propertyUtils";

export default {
  sectionName: $t('Color.9d8c1042809a32a3'),
  children: [
    {
      propertyName: "cellColor",
      label: $t('Color.184143641463c0f0'),
      controlType: "DROP_DOWN",
      fullWidth: true,
      helpText: $t('Color.bc55f4a1c148a27a'),
      options: [
        {
          label: $t('Color.b72ed93b6effa6e6'),
          value: "default",
        },
        ...Object.values(COLORS).map((semantic) => ({
          label: capitalize(semantic),
          value: semantic,
        })),
      ],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.TEXT,
        params: {
          allowedValues: ["default", ...Object.values(COLORS)],
          default: "default",
        },
      },
      hidden: () => {
        return true;
      },
    },
    {
      propertyName: "buttonColor",
      label: $t('Color.65d8ed38c2d76b2a'),
      controlType: "DROP_DOWN",
      fullWidth: true,
      helpText: $t('Color.09cb3bd11651e95b'),
      options: Object.values(COLORS).map((semantic) => ({
        label: capitalize(semantic),
        value: semantic,
      })),
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      defaultValue: "accent",
      validation: {
        type: ValidationTypes.TEXT,
        params: {
          allowedValues: Object.values(COLORS),
          default: "accent",
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return showByColumnType(props, propertyPath, [
          ColumnTypes.URL,
          ColumnTypes.TEXT,
          ColumnTypes.NUMBER,
          ColumnTypes.DATE,
        ]);
      },
    },
  ],
};
