import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { sourceDataArrayValidation } from "./validations";
import { configureMenuItemsConfig, menuItemsConfig } from "./childPanels";
import { updateMenuItemsSource } from "../helper";
import type { MenuButtonWidgetProps } from "../../widget/types";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.8f07cc3ecdd0cd95'),
    children: [
      {
        propertyName: "label",
        helpText: $t('contentConfig.a019702d4a810598'),
        label: $t('contentConfig.356526fc6b6bc61a'),
        controlType: "INPUT_TEXT",
        placeholderText: "Open The Menu…",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "menuItemsSource",
        helpText: $t('contentConfig.82e5c4d00c1b7de5'),
        label: $t('contentConfig.2e1da07ee9f060ea'),
        controlType: "ICON_TABS",
        defaultValue: "static",
        fullWidth: true,
        options: [
          {
            label: $t('contentConfig.92698851631bb8c6'),
            value: "static",
          },
          {
            label: $t('contentConfig.43bcbeaa9b4ce45d'),
            value: "dynamic",
          },
        ],
        isJSConvertible: false,
        isBindProperty: false,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        updateHook: updateMenuItemsSource,
        dependencies: ["sourceData", "configureMenuItems"],
      },
      {
        helpText: $t('contentConfig.d66d317eab38c187'),
        propertyName: "menuItems",
        controlType: "MENU_ITEMS",
        label: $t('contentConfig.d66d317eab38c187'),
        isBindProperty: false,
        isTriggerProperty: false,
        hidden: (props: MenuButtonWidgetProps) =>
          props.menuItemsSource === "dynamic",
        dependencies: ["menuItemsSource"],
        panelConfig: menuItemsConfig,
      },
      {
        helpText: $t('contentConfig.a517cff4fc629a0c'),
        propertyName: "sourceData",
        label: $t('contentConfig.53481872b42b4c47'),
        controlType: "INPUT_TEXT",
        placeholderText: "{{Query1.data}}",
        inputType: "ARRAY",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: sourceDataArrayValidation,
            expected: {
              type: "Array of values",
              example: `['option1', 'option2'] | [{ "label": "label1", "value": "value1" }]`,
              autocompleteDataType: AutocompleteDataType.ARRAY,
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
        hidden: (props: MenuButtonWidgetProps) =>
          props.menuItemsSource === "static",
        dependencies: ["menuItemsSource"],
      },
      {
        helpText: $t('contentConfig.8b033dd10acc50a4'),
        propertyName: "configureMenuItems",
        controlType: "OPEN_CONFIG_PANEL",
        buttonConfig: {
          label: $t('contentConfig.d63349049900513a'),
          icon: "settings-2-line",
        },
        label: $t('contentConfig.fc8ca855c848a2fb'),
        isBindProperty: false,
        isTriggerProperty: false,
        hidden: (props: MenuButtonWidgetProps) =>
          props.menuItemsSource === "static" || !props.sourceData,
        dependencies: ["menuItemsSource", "sourceData"],
        panelConfig: configureMenuItemsConfig,
      },
    ],
  },
  {
    sectionName: $t('contentConfig.fea71fb36fc1de7a'),
    children: [
      {
        propertyName: "isVisible",
        helpText: $t('contentConfig.9778c462c7e7415c'),
        label: $t('contentConfig.8c6d1cd93894a29a'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        helpText: $t('contentConfig.f9115500535ebfc8'),
        label: $t('contentConfig.db23fee0bc6f9f73'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.6db22b0d0aa0c5de'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.73039dc39af63cf1'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
] as PropertyPaneConfig[];
