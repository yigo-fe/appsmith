import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneContent = [
  {
    sectionName: $t('propertyPaneContent.900002cb02de68bd'),
    children: [
      {
        propertyName: "widgetId",
        label: "",
        controlType: "SECTION_SPLITTER",
        helpText: $t('propertyPaneContent.8338816bfff05f1a'),
        isBindProperty: true,
        isJSConvertible: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "widgetId",
        label: $t('propertyPaneContent.daeee964caf8a501'),
        controlType: "ZONE_STEPPER",
        helpText: $t('propertyPaneContent.c335d3775b69c38a'),
        isBindProperty: true,
        isJSConvertible: false,
        isTriggerProperty: false,
      },
    ],
  },
  {
    sectionName: $t('propertyPaneContent.835abbff5dac9771'),
    children: [
      {
        helpText: $t('propertyPaneContent.78d6fa6736aeb4c7'),
        propertyName: "isVisible",
        label: $t('propertyPaneContent.846b53bf28314d0b'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        defaultValue: true,
      },
      {
        propertyName: "animateLoading",
        label: $t('propertyPaneContent.183f74a419e00d5e'),
        controlType: "SWITCH",
        helpText: $t('propertyPaneContent.dcc43cb9cabc4a60'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
