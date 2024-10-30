import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import type { TableWidgetProps } from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  ColumnTypes,
  ICON_NAMES,
} from "modules/ui-builder/ui/wds/WDSTableWidget/constants";
import {
  hideByColumnType,
  updateIconAlignment,
} from "../../../widget/propertyUtils";
import { IconNames } from "@blueprintjs/icons";

export default {
  sectionName: $t('Basic.efd3f9dc0d04c43e'),
  hidden: (props: TableWidgetProps, propertyPath: string) => {
    return hideByColumnType(
      props,
      propertyPath,
      [ColumnTypes.BUTTON, ColumnTypes.ICON_BUTTON, ColumnTypes.MENU_BUTTON],
      true,
    );
  },
  children: [
    {
      propertyName: "iconName",
      label: $t('Basic.f7e4712af4596b90'),
      helpText: $t('Basic.489e3ffaa38f147f'),
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.ICON_BUTTON]);
      },
      updateHook: updateIconAlignment,
      dependencies: ["primaryColumns", "columnOrder"],
      controlType: "ICON_SELECT",
      defaultIconName: "add",
      isJSConvertible: true,
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.ARRAY_OF_TYPE_OR_TYPE,
        params: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ICON_NAMES,
            default: IconNames.ADD,
          },
        },
      },
    },
    {
      propertyName: "buttonLabel",
      label: $t('Basic.d6e5b41aad744eff'),
      helpText: $t('Basic.b34cc348f111dfaa'),
      controlType: "INPUT_TEXT",
      defaultValue: "Action",
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [ColumnTypes.BUTTON]);
      },
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: false,
    },
    {
      helpText: $t('Basic.0fa1b5229c80737a'),
      propertyName: "onClick",
      label: "onClick",
      controlType: "ACTION_SELECTOR",
      additionalAutoComplete: (props: TableWidgetProps) => ({
        currentRow: Object.assign(
          {},
          ...Object.keys(props.primaryColumns).map((key) => ({
            [key]: "",
          })),
        ),
      }),
      isJSConvertible: true,
      dependencies: ["primaryColumns", "columnOrder"],
      isBindProperty: true,
      isTriggerProperty: true,
      hidden: (props: TableWidgetProps, propertyPath: string) => {
        return hideByColumnType(props, propertyPath, [
          ColumnTypes.BUTTON,
          ColumnTypes.ICON_BUTTON,
        ]);
      },
    },
  ],
};
