import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { updateColumnStyles } from "../propertyUtils";

export default [
  {
    sectionName: $t('styleConfig.ea011e31a9b1d4f8'),
    children: [
      {
        propertyName: "compactMode",
        helpText: $t('styleConfig.4cc9fbb697939a62'),
        label: $t('styleConfig.3e1cc1a3d0afce22'),
        controlType: "ICON_TABS",
        fullWidth: true,
        defaultValue: "DEFAULT",
        isBindProperty: true,
        isTriggerProperty: false,
        options: [
          {
            label: $t('styleConfig.d9fdffb703b4ec28'),
            value: "SHORT",
          },
          {
            label: $t('styleConfig.ff166617e73f81b7'),
            value: "DEFAULT",
          },
          {
            label: "Tall",
            value: "TALL",
          },
        ],
      },
    ],
  },
  {
    sectionName: $t('styleConfig.5790c761d806da34'),
    children: [
      {
        propertyName: "textSize",
        label: $t('styleConfig.da27f9a488011210'),
        helpText: $t('styleConfig.a8f3074789e718d8'),
        controlType: "DROP_DOWN",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns"],
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
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "fontStyle",
        label: $t('styleConfig.367f151724282123'),
        helpText: $t('styleConfig.5fb1db95c54933ba'),
        controlType: "BUTTON_GROUP",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns"],
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
      {
        propertyName: "horizontalAlignment",
        label: $t('styleConfig.3e311c3825489bad'),
        helpText: $t('styleConfig.e6c28b3f3feefbde'),
        controlType: "ICON_TABS",
        fullWidth: true,
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns"],
        options: [
          {
            startIcon: "align-left",
            value: "LEFT",
          },
          {
            startIcon: "align-center",
            value: "CENTER",
          },
          {
            startIcon: "align-right",
            value: "RIGHT",
          },
        ],
        defaultValue: "LEFT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["LEFT", "CENTER", "RIGHT"],
          },
        },
      },
      {
        propertyName: "verticalAlignment",
        label: $t('styleConfig.8026b958ce709073'),
        helpText: $t('styleConfig.c6566bffa4190547'),
        controlType: "ICON_TABS",
        fullWidth: true,
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns"],
        options: [
          {
            startIcon: "vertical-align-top",
            value: "TOP",
          },
          {
            startIcon: "vertical-align-middle",
            value: "CENTER",
          },
          {
            startIcon: "vertical-align-bottom",
            value: "BOTTOM",
          },
        ],
        defaultValue: "CENTER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["TOP", "CENTER", "BOTTOM"],
          },
        },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.5f875a6af53045f5'),
    children: [
      {
        propertyName: "cellBackground",
        label: $t('styleConfig.512841ab4d1c89e5'),
        helpText: $t('styleConfig.b608eaeea4ca9f5f'),
        controlType: "COLOR_PICKER",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns"],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "accentColor",
        label: $t('styleConfig.acf8f4ac516296ec'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        invisible: true,
      },
      {
        propertyName: "textColor",
        label: $t('styleConfig.2be58cc1f283ea2e'),
        helpText: $t('styleConfig.9622e6e03218c2da'),
        controlType: "COLOR_PICKER",
        updateHook: updateColumnStyles,
        dependencies: ["primaryColumns"],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('styleConfig.3558e5947982079c'),
    children: [
      {
        propertyName: "variant",
        helpText: $t('styleConfig.ec9ed46152c4bc03'),
        label: $t('styleConfig.198f36c1cfe4cd1d'),
        controlType: "DROP_DOWN",
        defaultValue: "DEFAULT",
        isBindProperty: true,
        isTriggerProperty: false,
        options: [
          {
            label: $t('styleConfig.ff166617e73f81b7'),
            value: "DEFAULT",
          },
          {
            label: $t('styleConfig.771963a93b05a56f'),
            value: "VARIANT2",
          },
          {
            label: $t('styleConfig.26054aff608c6fe5'),
            value: "VARIANT3",
          },
        ],
      },
      {
        propertyName: "borderRadius",
        label: $t('styleConfig.3effb1c6a846bb81'),
        helpText: $t('styleConfig.d9b7f94ce3063f94'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('styleConfig.388e41d5107fb9b6'),
        helpText:
          $t('styleConfig.36d5ecb06a7d721c'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('styleConfig.ce27d1b4336523c4'),
        placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
        propertyName: "borderColor",
        label: $t('styleConfig.6b043175372ae9af'),
        controlType: "COLOR_PICKER",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        helpText: $t('styleConfig.8e1b526c8a924b4a'),
        propertyName: "borderWidth",
        label: $t('styleConfig.6f144cf08a8c67b8'),
        placeholderText: $t('styleConfig.bf9e7f5b0131deb5'),
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.NUMBER },
      },
    ],
  },
];
