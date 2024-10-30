import {$t} from "locale/index";
import { ISDCodeOptions } from "constants/ISDCodes_v2";
import type { ISDCodeProps } from "constants/ISDCodes_v2";
import { ValidationTypes } from "constants/WidgetValidation";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { propertyPaneContentConfig as WdsInputWidgetPropertyPaneContentConfig } from "modules/ui-builder/ui/wds/WDSInputWidget/config/propertyPaneConfig/contentConfig";

import { countryToFlag } from "../../widget/helpers";
import { defaultValueValidation } from "./validations";

const inputTypeSectionConfig = WdsInputWidgetPropertyPaneContentConfig.find(
  (config) => config.sectionName === "Type",
);

export const propertyPaneContentConfig = [
  inputTypeSectionConfig,
  {
    sectionName: $t('contentConfig.80ec853bbba568fe'),
    children: [
      {
        helpText:
          $t('contentConfig.36c447fcee07b23f'),
        propertyName: "defaultText",
        label: $t('contentConfig.c425e86aa86b622d'),
        controlType: "INPUT_TEXT",
        placeholderText: "(123) 456-7890",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultValueValidation,
            expected: {
              type: "string",
              example: `(000) 000-0000`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
      },
      {
        helpText: $t('contentConfig.00600fa34b1f0e75'),
        propertyName: "defaultDialCode",
        label: $t('contentConfig.5a452312a5efbbb9'),
        enableSearch: true,
        dropdownHeight: "156px",
        controlType: "DROP_DOWN",
        searchPlaceholderText: $t('contentConfig.cb02999e5b5ffbd2'),
        options: ISDCodeOptions.map((item: ISDCodeProps) => {
          return {
            leftElement: countryToFlag(item.dial_code),
            searchText: item.name,
            label: `${item.name} (${item.dial_code})`,
            value: item.dial_code,
            id: item.dial_code,
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
    ],
  },
  {
    sectionName: $t('contentConfig.38d044332265a609'),
    children: [],
  },
  {
    sectionName: $t('contentConfig.00af5ac543185e6d'),
    children: [
      {
        propertyName: "isRequired",
        label: $t('contentConfig.52225e4d7aa8cc00'),
        helpText: $t('contentConfig.68adf633e925a14e'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
