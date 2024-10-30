import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { PropertyUpdates } from "WidgetProvider/constants";
import type { WidgetProps } from "widgets/BaseWidget";
import type { WDSComboBoxWidgetProps } from "../../widget/types";
import { optionsCustomValidation } from "./validations";

type WidgetTypeValue = "SELECT" | "COMBOBOX";

export const handleWidgetTypeUpdate = (
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
};

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.f8b6f534dc99901f'),
    children: [
      {
        propertyName: "widgetType",
        label: $t('contentConfig.c9e9b58e9fd98431'),
        controlType: "DROP_DOWN",
        options: [
          {
            label: $t('contentConfig.6944426b221dd654'),
            value: "SELECT",
          },
          {
            label: "ComboBox",
            value: "COMBOBOX",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        updateHook: handleWidgetTypeUpdate,
      },
      {
        helpText: $t('contentConfig.c1cc749f4403c0c7'),
        propertyName: "options",
        label: $t('contentConfig.ab92338d6619f0c6'),
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
    ],
  },
  {
    sectionName: $t('contentConfig.e9840c32279ab800'),
    children: [
      {
        helpText: $t('contentConfig.8466c660d321fe6f'),
        propertyName: "label",
        label: $t('contentConfig.922e80bd9eaff28b'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.e9840c32279ab800'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.2be9cb4fa4bbc323'),
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.7c2b80473c08663c'),
        helpText: $t('contentConfig.cba39c6b44f3ba0a'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.b9209091417b8205'),
    children: [
      {
        helpText: $t('contentConfig.a673ef2fd7b54212'),
        propertyName: "labelTooltip",
        label: $t('contentConfig.e145fc146d113737'),
        controlType: "INPUT_TEXT",
        placeholderText: "",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('contentConfig.21d200c78cd643e6'),
        propertyName: "placeholderText",
        label: $t('contentConfig.3e5b80bbbb8c8fdd'),
        controlType: "INPUT_TEXT",
        placeholderText: "",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: WDSComboBoxWidgetProps) => {
          return Boolean(props.isReadOnly);
        },
      },
      {
        helpText: $t('contentConfig.7c67076dca910bea'),
        propertyName: "isVisible",
        label: $t('contentConfig.5a01089857a9ff2a'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.81f1cb9083776266'),
        helpText: $t('contentConfig.dbbbcff44b1a8929'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.e7a11f85cb55103f'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.a4aba615bfea578b'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.487357b519b8d25f'),
    children: [
      {
        helpText: $t('contentConfig.7ef2d28411f8f5c0'),
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
