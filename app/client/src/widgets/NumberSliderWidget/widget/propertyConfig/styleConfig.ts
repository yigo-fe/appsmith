import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";

export default [
  {
    sectionName: $t('styleConfig.6d72040531c01c18'),
    children: [
      {
        helpText: $t('styleConfig.55645819b3ffa027'),
        propertyName: "sliderSize",
        label: $t('styleConfig.2fc1f104366785a5'),
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
    sectionName: $t('styleConfig.45a13c1bb0190088'),
    children: [
      {
        propertyName: "labelTextColor",
        label: $t('styleConfig.f6f419d7f6fc9e42'),
        helpText: $t('styleConfig.4e909c65c8be6b96'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "labelTextSize",
        label: $t('styleConfig.a46607052017e8ab'),
        helpText: $t('styleConfig.d01199a55905cb59'),
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
        label: $t('styleConfig.de035aa046078ddb'),
        helpText: $t('styleConfig.f73b9481644799b4'),
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
    sectionName: $t('styleConfig.c62603c89f6cc94e'),
    children: [
      {
        helpText: $t('styleConfig.c91ad45e480aee1f'),
        propertyName: "accentColor",
        label: $t('styleConfig.4f663e3bd1669ec9'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
