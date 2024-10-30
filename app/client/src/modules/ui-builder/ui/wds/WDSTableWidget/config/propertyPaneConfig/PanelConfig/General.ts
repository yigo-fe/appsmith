import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { ColumnTypes } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import { hideByColumnType } from "../../../widget/propertyUtils";
import { BUTTON_VARIANTS } from "@appsmith/wds";
import { objectKeys } from "@appsmith/utils";

export default {
  sectionName: $t('General.7b75bee52684abfc'),
  children: [
    {
      propertyName: "isCellVisible",
      dependencies: ["primaryColumns", "columnType"],
      label: $t('General.8858774e2fe51d83'),
      helpText: $t('General.344429deed59ea62'),
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
      propertyName: "isDisabled",
      label: $t('General.224402aed899373e'),
      helpText: $t('General.9436e9b4e1c6774d'),
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
      dependencies: ["primaryColumns", "columnOrder"],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.ICON_BUTTON,
          ColumnTypes.MENU_BUTTON,
          ColumnTypes.BUTTON,
        ]);
      },
    },
    {
      propertyName: "isCompact",
      helpText: $t('General.d53b56ba9e9b1672'),
      label: $t('General.76480dd732c02e33'),
      controlType: "SWITCH",
      isJSConvertible: true,
      isBindProperty: true,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      isTriggerProperty: false,
      dependencies: ["primaryColumns", "columnOrder"],
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.MENU_BUTTON]);
      },
    },
  ],
};

export const GeneralStyle = {
  sectionName: $t('General.7b75bee52684abfc'),
  children: [
    {
      propertyName: "buttonVariant",
      label: $t('General.d5e16e03808ca7bb'),
      controlType: "DROP_DOWN",
      fullWidth: true,
      helpText: $t('General.fedeacbcc84c0ad8'),
      options: objectKeys(BUTTON_VARIANTS).map((variant) => ({
        label: BUTTON_VARIANTS[variant],
        value: variant,
      })),
      defaultValue: objectKeys(BUTTON_VARIANTS)[0],
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: objectKeys(BUTTON_VARIANTS),
            default: objectKeys(BUTTON_VARIANTS)[0],
          },
        },
      },
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.ICON_BUTTON,
          ColumnTypes.BUTTON,
        ]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
    },
  ],
};
