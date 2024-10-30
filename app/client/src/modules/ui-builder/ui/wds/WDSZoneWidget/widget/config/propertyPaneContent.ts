import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";

export const propertyPaneContent = [
  {
    sectionName: $t('propertyPaneContent.989a84f12a19a630'),
    children: [
      {
        propertyName: "parentId",
        label: "",
        controlType: "SECTION_SPLITTER",
        helpText: $t('propertyPaneContent.75ec5a162545b28a'),
        isBindProperty: true,
        isJSConvertible: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "parentId",
        label: $t('propertyPaneContent.a8a3575ce460201a'),
        controlType: "ZONE_STEPPER",
        helpText: $t('propertyPaneContent.747f1af91f097f17'),
        isBindProperty: true,
        isJSConvertible: false,
        isTriggerProperty: false,
      },
    ],
  },
  {
    sectionName: $t('propertyPaneContent.3ea7fd00da36a454'),
    children: [
      {
        helpText: $t('propertyPaneContent.8b13f22e0ae34b80'),
        propertyName: "isVisible",
        label: $t('propertyPaneContent.691c70ae011916d2'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        defaultValue: true,
      },
      {
        propertyName: "animateLoading",
        label: $t('propertyPaneContent.df3876e2fc079338'),
        controlType: "SWITCH",
        helpText: $t('propertyPaneContent.687a6c38a61647d6'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];
