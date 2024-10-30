import {$t} from "locale/index";
import { COLORS } from "@appsmith/wds";
import { ValidationTypes } from "constants/WidgetValidation";
import capitalize from "lodash/capitalize";

export const propertyPaneContentConfig = [
  {
    sectionName: $t('contentConfig.37279f01db9d32cf'),
    children: [
      {
        propertyName: "label",
        label: $t('contentConfig.74fb1e45b1caac22'),
        helpText: $t('contentConfig.786e992aac341102'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.a7463115aea92368'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "value",
        label: $t('contentConfig.4b3df30540b69cae'),
        helpText: $t('contentConfig.10c920e1b4652144'),
        controlType: "INPUT_TEXT",
        placeholderText: "42",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "valueColor",
        label: $t('contentConfig.9cde5460e67a57d2'),
        controlType: "DROP_DOWN",
        fullWidth: true,
        helpText: $t('contentConfig.52d70dd83ec245cc'),
        options: [
          {
            label: $t('contentConfig.7252906b3ab780c3'),
            value: "default",
          },
          ...Object.values(COLORS).map((semantic) => ({
            label: capitalize(semantic),
            value: semantic,
          })),
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
      },
    ],
  },
  {
    sectionName: $t('contentConfig.8e4706ca320b6c83'),
    children: [
      {
        propertyName: "iconName",
        label: $t('contentConfig.7aa673ad605e7fca'),
        helpText: $t('contentConfig.0c8053336822c9c2'),
        controlType: "ICON_SELECT_V2",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
        },
      },
      {
        propertyName: "iconAlign",
        label: $t('contentConfig.33e80b9a95ae24e0'),
        helpText: $t('contentConfig.9e03a2234365bdd0'),
        controlType: "ICON_TABS",
        defaultValue: "start",
        fullWidth: false,
        options: [
          {
            startIcon: "skip-left-line",
            value: "start",
          },
          {
            startIcon: "skip-right-line",
            value: "end",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["start", "end"],
          },
        },
      },
      {
        propertyName: "valueChange",
        label: $t('contentConfig.1c9d687506cec62b'),
        helpText: $t('contentConfig.8c280b6b4cea26d9'),
        controlType: "INPUT_TEXT",
        placeholderText: "+50%",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "valueChangeColor",
        label: $t('contentConfig.013ea74c68891f6f'),
        controlType: "DROP_DOWN",
        fullWidth: true,
        helpText: $t('contentConfig.16be04fe11c03caf'),
        options: Object.values(COLORS).map((semantic) => ({
          label: capitalize(semantic),
          value: semantic,
        })),
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: Object.values(COLORS),
            default: COLORS.accent,
          },
        },
      },
      {
        propertyName: "caption",
        label: "Caption",
        helpText: $t('contentConfig.17fc51a92cfe8a91'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.ef7255bd27aeb09f'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('contentConfig.e13f5d59990e19ed'),
    children: [
      {
        propertyName: "isVisible",
        label: $t('contentConfig.64702d30001d3fad'),
        helpText: $t('contentConfig.6f07dca5ad0698e7'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.67a7b9d7ed21aa00'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.8387df4332894f4d'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
