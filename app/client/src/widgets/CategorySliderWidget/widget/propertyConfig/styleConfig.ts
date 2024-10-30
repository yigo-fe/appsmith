import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";

export default [
  {
    sectionName: $t('styleConfig.d45157e88e484bb1'),
    children: [
      {
        helpText: $t('styleConfig.1d252812857bfbed'),
        propertyName: "sliderSize",
        label: $t('styleConfig.4a58e060def81f96'),
        controlType: "ICON_TABS",
        fullWidth: true,
        defaultValue: "m",
        options: [
          {
            label: "S",
            value: "s",
            subText: "4px",
          },
          {
            label: "M",
            value: "m",
            subText: "6px",
          },
          {
            label: "L",
            value: "l",
            subText: "8px",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.d168119e398b250c'),
    children: [
      {
        propertyName: "labelTextColor",
        label: $t('styleConfig.ca53d059b864a65d'),
        helpText: $t('styleConfig.31fe23dfd10381b4'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "labelTextSize",
        label: $t('styleConfig.aa33af1398225f41'),
        helpText: $t('styleConfig.04e6994358629460'),
        controlType: "DROP_DOWN",
        defaultValue: "0.875rem",
        hidden: isAutoLayout,
        options: [
          {
            label: "S",
            value: "0.875rem",
            subText: "0.875rem",
          },
          {
            label: "M",
            value: "1rem",
            subText: "1rem",
          },
          {
            label: "L",
            value: "1.25rem",
            subText: "1.25rem",
          },
          {
            label: "XL",
            value: "1.875rem",
            subText: "1.875rem",
          },
          {
            label: "XXL",
            value: "3rem",
            subText: "3rem",
          },
          {
            label: "3XL",
            value: "3.75rem",
            subText: "3.75rem",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "labelStyle",
        label: $t('styleConfig.48ad7b4af8f4f2e0'),
        helpText: $t('styleConfig.185c922213a8c9e7'),
        controlType: "BUTTON_GROUP",
        options: [
          {
            icon: "text-bold",
            value: "BOLD",
          },
          {
            icon: "text-italic",
            value: "ITALIC",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.5d72fea1cd08c936'),
    children: [
      {
        helpText: $t('styleConfig.ef013c56ba68c612'),
        propertyName: "accentColor",
        label: $t('styleConfig.f324bef1e03ea8b7'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
