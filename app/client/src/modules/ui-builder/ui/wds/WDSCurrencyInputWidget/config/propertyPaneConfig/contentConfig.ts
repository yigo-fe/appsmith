import {$t} from "locale/index";
import { CurrencyTypeOptions } from "constants/Currency";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { propertyPaneContentConfig as WdsInputWidgetPropertyPaneContentConfig } from "modules/ui-builder/ui/wds/WDSInputWidget/config/propertyPaneConfig/contentConfig";

import * as validations from "./validations";
import { countryToFlag } from "../../widget/helpers";

const inputTypeSectionConfig = WdsInputWidgetPropertyPaneContentConfig.find(
  (config) => config.sectionName === "Type",
);

export const propertyPaneContentConfig = [
  inputTypeSectionConfig,
  {
    sectionName: $t('contentConfig.34226c387038ecc8'),
    children: [
      {
        helpText:
          $t('contentConfig.a81ee880b37cb417'),
        propertyName: "defaultText",
        label: $t('contentConfig.3d697f8042d2b2c8'),
        controlType: "INPUT_TEXT",
        placeholderText: "42",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: validations.defaultValueValidation,
            expected: {
              type: "number",
              example: `100`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        dependencies: ["decimals"],
      },
      {
        helpText: $t('contentConfig.7c965346a49ac566'),
        propertyName: "defaultCurrencyCode",
        label: $t('contentConfig.ebea73e90ec51aa2'),
        enableSearch: true,
        dropdownHeight: "156px",
        controlType: "DROP_DOWN",
        searchPlaceholderText: $t('contentConfig.a1ed68568c08c672'),
        options: CurrencyTypeOptions.map((item) => {
          return {
            leftElement: countryToFlag(item.code),
            searchText: item.label,
            label: `${item.currency} - ${item.currency_name}`,
            value: item.currency,
            id: item.symbol_native,
          };
        }),
        virtual: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
        },
      },
      {
        helpText: $t('contentConfig.6ed1e8966bef0828'),
        propertyName: "decimals",
        label: $t('contentConfig.eafb2fbc6b708b57'),
        controlType: "DROP_DOWN",
        options: [
          {
            label: "0",
            value: 0,
          },
          {
            label: "1",
            value: 1,
          },
          {
            label: "2",
            value: 2,
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            min: 0,
            max: 2,
          },
        },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.843fe02b363301e1'),
    children: [],
  },
  {
    sectionName: $t('contentConfig.cec57bb7e7c07227'),
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.0ad4945ccb3d384e'),
        helpText: $t('contentConfig.68d31c6f7ad0c7ba'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
