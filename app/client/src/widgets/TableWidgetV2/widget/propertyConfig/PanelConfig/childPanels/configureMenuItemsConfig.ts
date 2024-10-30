import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { ICON_NAMES } from "widgets/MenuButtonWidget/constants";
import {
  booleanForEachRowValidation,
  colorForEachRowValidation,
  iconNamesForEachRowValidation,
  iconPositionForEachRowValidation,
  textForEachRowValidation,
} from "widgets/TableWidgetV2/widget/propertyUtils";
import { getSourceDataAndCaluclateKeysForEventAutoComplete } from "widgets/TableWidgetV2/widget/utilities";

export default {
  editableTitle: false,
  titlePropertyName: "label",
  panelIdPropertyName: "id",
  contentChildren: [
    {
      sectionName: $t('configureMenuItemsConfig.b8954b582513f1fb'),
      children: [
        {
          propertyName: "label",
          helpText:
            $t('configureMenuItemsConfig.fa0a5d88153b4ace'),
          label: $t('configureMenuItemsConfig.05431ed0e85f98e3'),
          controlType: "MENU_BUTTON_DYNAMIC_ITEMS",
          placeholderText: "{{currentItem.name}}",
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              expected: {
                type: "Array of values",
                example: `['option1', 'option2'] | [{ "label": "label1", "value": "value1" }]`,
                autocompleteDataType: AutocompleteDataType.ARRAY,
              },
              fnString: textForEachRowValidation.toString(),
            },
          },
          evaluatedDependencies: ["primaryColumns"],
        },
        {
          propertyName: "isVisible",
          helpText:
            $t('configureMenuItemsConfig.1ad4b2a9e6aec0f5'),
          label: $t('configureMenuItemsConfig.f81e4d36db838749'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              fnString: booleanForEachRowValidation.toString(),
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["primaryColumns"],
        },
        {
          propertyName: "isDisabled",
          helpText:
            $t('configureMenuItemsConfig.7a87abb4adbe2765'),
          label: $t('configureMenuItemsConfig.ccf1ab5aaf5d4294'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              fnString: booleanForEachRowValidation.toString(),
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["primaryColumns"],
        },
      ],
    },
    {
      sectionName: $t('configureMenuItemsConfig.7e250b52f34721f0'),
      children: [
        {
          helpText:
            "when the menu item is clicked. Can also be configured the using {{currentItem}} binding.",
          propertyName: "onClick",
          label: "onClick",
          controlType: "ACTION_SELECTOR",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: true,
          additionalAutoComplete:
            getSourceDataAndCaluclateKeysForEventAutoComplete,
          evaluatedDependencies: ["primaryColumns"],
        },
      ],
    },
  ],
  styleChildren: [
    {
      sectionName: $t('configureMenuItemsConfig.3bb83dd4e511a165'),
      children: [
        {
          propertyName: "iconName",
          label: $t('configureMenuItemsConfig.3bb83dd4e511a165'),
          helpText:
            $t('configureMenuItemsConfig.e1cc37ddc6d4c4b3'),
          controlType: "ICON_SELECT",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              allowedValues: ICON_NAMES,
              fnString: iconNamesForEachRowValidation.toString(),
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["primaryColumns"],
        },
        {
          propertyName: "iconAlign",
          label: $t('configureMenuItemsConfig.95c020f3f25f5a68'),
          helpText:
            $t('configureMenuItemsConfig.a569fcd3888fbf23'),
          controlType: "ICON_TABS",
          defaultValue: "left",
          fullWidth: false,
          options: [
            {
              startIcon: "skip-left-line",
              value: "left",
            },
            {
              startIcon: "skip-right-line",
              value: "right",
            },
          ],
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              allowedValues: ["center", "left", "right"],
              fnString: iconPositionForEachRowValidation.toString(),
            },
          },
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["primaryColumns"],
        },
      ],
    },
    {
      sectionName: $t('configureMenuItemsConfig.dc075056b5c40569'),
      children: [
        {
          propertyName: "iconColor",
          helpText:
            $t('configureMenuItemsConfig.d93371ef3bf90628'),
          label: $t('configureMenuItemsConfig.530f71619139f45f'),
          controlType: "COLOR_PICKER",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["primaryColumns"],
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              regex: /^(?![<|{{]).+/,
              fnString: colorForEachRowValidation.toString(),
            },
          },
        },
        {
          propertyName: "backgroundColor",
          helpText:
            $t('configureMenuItemsConfig.92445009f81b78e3'),
          label: $t('configureMenuItemsConfig.a2a3d5f809529462'),
          controlType: "COLOR_PICKER",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["primaryColumns"],
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              regex: /^(?![<|{{]).+/,
              fnString: colorForEachRowValidation.toString(),
            },
          },
        },
        {
          propertyName: "textColor",
          helpText:
            $t('configureMenuItemsConfig.2e0c944b55b9751e'),
          label: $t('configureMenuItemsConfig.d77d14b4fe749fe6'),
          controlType: "COLOR_PICKER",
          isBindProperty: true,
          isTriggerProperty: false,
          isJSConvertible: true,
          customJSControl: "MENU_BUTTON_DYNAMIC_ITEMS",
          evaluatedDependencies: ["primaryColumns"],
          validation: {
            type: ValidationTypes.FUNCTION,
            params: {
              regex: /^(?![<|{{]).+/,
              fnString: colorForEachRowValidation.toString(),
            },
          },
        },
      ],
    },
  ],
};
