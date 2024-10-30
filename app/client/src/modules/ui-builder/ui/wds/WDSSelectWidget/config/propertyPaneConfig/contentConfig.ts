import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WDSSelectWidgetProps } from "../../widget/types";
import {
  defaultOptionValidation,
  optionsCustomValidation,
} from "./validations";
import type { WidgetProps } from "widgets/BaseWidget";
import type { PropertyUpdates } from "WidgetProvider/constants";

type WidgetTypeValue = "SELECT" | "COMBOBOX";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.4d2c46db0b62abe9'),
    children: [
      {
        propertyName: "widgetType",
        label: $t('contentConfig.b2623ad8a8531857'),
        controlType: "DROP_DOWN",
        options: [
          {
            label: $t('contentConfig.43e379c814a5519b'),
            value: "SELECT",
          },
          {
            label: "ComboBox",
            value: "COMBOBOX",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        updateHook: (
          _props: WidgetProps,
          propertyName: string,
          propertyValue: WidgetTypeValue,
        ) => {
          const updates: PropertyUpdates[] = [
            {
              propertyPath: propertyName,
              propertyValue: propertyValue,
            },
          ];

          // Handle widget morphing
          if (propertyName === "widgetType") {
            const morphingMap: Record<WidgetTypeValue, string> = {
              SELECT: "WDS_SELECT_WIDGET",
              COMBOBOX: "WDS_COMBOBOX_WIDGET",
            };

            const targetWidgetType = morphingMap[propertyValue];

            if (targetWidgetType) {
              updates.push({
                propertyPath: "type",
                propertyValue: targetWidgetType,
              });
            }
          }

          return updates;
        },
      },
      {
        helpText: $t('contentConfig.335c821fb6ced8b7'),
        propertyName: "options",
        label: $t('contentConfig.060b768f7f2b9682'),
        controlType: "OPTION_INPUT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        dependencies: ["optionLabel", "optionValue"],
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: optionsCustomValidation,
            expected: {
              type: 'Array<{ "label": "string", "value": "string" | number}>',
              example: `[{"label": "One", "value": "one"}]`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        helpText: $t('contentConfig.3595038715ad9f99'),
        propertyName: "defaultOptionValue",
        label: $t('contentConfig.2d8bc3ecdb60f86d'),
        placeholderText: "",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        dependencies: ["options"],
        /**
         * Changing the validation to FUNCTION.
         * If the user enters Integer inside {{}} e.g. {{1}} then value should evalute to integer.
         * If user enters 1 e.g. then it should evaluate as string.
         */
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultOptionValidation,
            expected: {
              type: `string |\nnumber (only works in mustache syntax)`,
              example: `abc | {{1}}`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.8d2544c7dd3e3c80'),
    children: [
      {
        helpText: $t('contentConfig.d2fddbe62f6614cd'),
        propertyName: "label",
        label: $t('contentConfig.366a407517138e2b'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.8d2544c7dd3e3c80'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.f364c8503871cc56'),
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.ff39625562b5006f'),
        helpText: $t('contentConfig.fc6ed6dbe5c39bd3'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.4e381424c579de83'),
    children: [
      {
        helpText: $t('contentConfig.3eedd4d9a295fcfc'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.6f9a0d5539278025'),
        controlType: "INPUT_TEXT",
        placeholderText: "",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.6636002dd21877e2'),
        propertyName: "placeholderText",
        label: $t('contentConfig.a02cdda06ab512f0'),
        controlType: "INPUT_TEXT",
        placeholderText: "",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: WDSSelectWidgetProps) => {
          return Boolean(props.isReadOnly);
        },
      },
      {
        helpText: $t('contentConfig.177ace888d31c559'),
        propertyName: "isVisible",
        label: $t('contentConfig.fdf0c63a4975734f'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.2c9aacd2d518d2da'),
        helpText: $t('contentConfig.375ff87856ee641f'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.483a33d7da79af22'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.2c04f9ca7e730104'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.e2b1295175739787'),
    children: [
      {
        helpText: $t('contentConfig.fa15bdf1756f39dc'),
        propertyName: "onSelectionChange",
        label: "onSelectionChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
];
