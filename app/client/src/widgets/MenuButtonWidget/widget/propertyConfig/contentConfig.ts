import {$t} from "locale/index";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { sourceDataArrayValidation } from "widgets/MenuButtonWidget/validations";
import type { MenuButtonWidgetProps } from "../../constants";
import { MenuItemsSource } from "../../constants";
import configureMenuItemsConfig from "./childPanels/configureMenuItemsConfig";
import menuItemsConfig from "./childPanels/menuItemsConfig";
import { updateMenuItemsSource } from "./propertyUtils";
export default [
  {
    sectionName: $t('contentConfig.f7e92896b4fdace1'),
    children: [
      {
        propertyName: "label",
        helpText: $t('contentConfig.93ad5f88c8fe6c7a'),
        label: $t('contentConfig.d10e42fbd3ddf3d4'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.ac912d0acd04db95'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "menuItemsSource",
        helpText: $t('contentConfig.24923501bc9441ae'),
        label: $t('contentConfig.f48ca5fd088ecbe4'),
        controlType: "ICON_TABS",
        defaultValue: MenuItemsSource.STATIC,
        fullWidth: true,
        options: [
          {
            label: $t('contentConfig.04d89ccd4334a3bd'),
            value: MenuItemsSource.STATIC,
          },
          {
            label: $t('contentConfig.19e8bf574e06317f'),
            value: MenuItemsSource.DYNAMIC,
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
        helpText: $t('contentConfig.feda7700b1d9dc65'),
        propertyName: "menuItems",
        controlType: "MENU_ITEMS",
        label: $t('contentConfig.feda7700b1d9dc65'),
        isBindProperty: false,
        isTriggerProperty: false,
        hidden: (props: MenuButtonWidgetProps) =>
          props.menuItemsSource === MenuItemsSource.DYNAMIC,
        dependencies: ["menuItemsSource"],
        panelConfig: menuItemsConfig,
      },
      {
        helpText: $t('contentConfig.285f79c67168011f'),
        propertyName: "sourceData",
        label: $t('contentConfig.36983681e2e6efea'),
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
          props.menuItemsSource === MenuItemsSource.STATIC,
        dependencies: ["menuItemsSource"],
      },
      {
        helpText: $t('contentConfig.b14f57aa532a82cd'),
        propertyName: "configureMenuItems",
        controlType: "OPEN_CONFIG_PANEL",
        buttonConfig: {
          label: $t('contentConfig.bc259fd8dd68b046'),
          icon: "settings-2-line",
        },
        label: $t('contentConfig.8f0f1017eabb1866'),
        isBindProperty: false,
        isTriggerProperty: false,
        hidden: (props: MenuButtonWidgetProps) =>
          props.menuItemsSource === MenuItemsSource.STATIC || !props.sourceData,
        dependencies: ["menuItemsSource", "sourceData"],
        panelConfig: configureMenuItemsConfig,
      },
    ],
  },
  {
    sectionName: $t('contentConfig.2f1fa6ad9af794dd'),
    children: [
      {
        propertyName: "isVisible",
        helpText: $t('contentConfig.f593f19b3b0be0ea'),
        label: $t('contentConfig.46fb67efdde1184c'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        helpText: $t('contentConfig.ade9862425267970'),
        label: $t('contentConfig.0a8e0b2e85687064'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.52a49374e4764c77'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.75a87efa2b2e31c8'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isCompact",
        helpText: $t('contentConfig.3bb09d635ae80250'),
        label: $t('contentConfig.65cb864d6eb81815'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
] as PropertyPaneConfig[];
