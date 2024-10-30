import {$t} from "locale/index";
import { get } from "lodash";

import { ValidationTypes } from "constants/WidgetValidation";
import type { SchemaItem } from "widgets/JSONFormWidget/constants";
import { ARRAY_ITEM_KEY, FieldType } from "widgets/JSONFormWidget/constants";
import type { JSONFormWidgetProps } from "../..";
import { getStylesheetValue } from "../helper";

const objectStyleProperties = [
  {
    propertyName: "backgroundColor",
    label: $t('object.964f29c75472086c'),
    controlType: "COLOR_PICKER",
    helpText: $t('object.5b8d4b8e1bcf7a5f'),
    isJSConvertible: true,
    isBindProperty: true,
    isTriggerProperty: false,
    customJSControl: "JSON_FORM_COMPUTE_VALUE",
    validation: {
      type: ValidationTypes.TEXT,
      params: {
        regex: /^(?![<|{{]).+/,
      },
    },
    dependencies: ["schema"],
  },
  {
    propertyName: "borderColor",
    label: $t('object.7ce1a98ec60a3be8'),
    helpText: $t('object.19806ec11b7e95d3'),
    controlType: "COLOR_PICKER",
    isJSConvertible: true,
    isBindProperty: true,
    isTriggerProperty: false,
    customJSControl: "JSON_FORM_COMPUTE_VALUE",
    validation: {
      type: ValidationTypes.TEXT,
      params: {
        regex: /^(?![<|{{]).+/,
      },
    },
    dependencies: ["schema"],
  },
  {
    propertyName: "borderWidth",
    helpText: $t('object.35a2e8ce9b731a30'),
    label: $t('object.55cbeae7fcd65207'),
    placeholderText: $t('object.b374919af0ec13de'),
    controlType: "INPUT_TEXT",
    isBindProperty: true,
    isTriggerProperty: false,
    validation: { type: ValidationTypes.NUMBER },
  },
  {
    propertyName: "borderRadius",
    label: $t('object.609baa113e141917'),
    helpText: $t('object.c5c273c281dce734'),
    controlType: "BORDER_RADIUS_OPTIONS",
    customJSControl: "JSON_FORM_COMPUTE_VALUE",
    isJSConvertible: true,
    isBindProperty: true,
    isTriggerProperty: false,
    getStylesheetValue,
    validation: { type: ValidationTypes.TEXT },
    dependencies: ["schema"],
  },
  {
    propertyName: "boxShadow",
    label: $t('object.6283e2fdc96dbeaf'),
    helpText: $t('object.1d82169262ac5d34'),
    controlType: "BOX_SHADOW_OPTIONS",
    customJSControl: "JSON_FORM_COMPUTE_VALUE",
    isJSConvertible: true,
    isBindProperty: true,
    isTriggerProperty: false,
    getStylesheetValue,
    validation: { type: ValidationTypes.TEXT },
    dependencies: ["schema"],
  },
];

const PROPERTIES = {
  style: {
    root: [
      {
        sectionName: $t('object.7c33775b84472cb4'),
        children: objectStyleProperties,
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});

          if (schemaItem.fieldType !== FieldType.OBJECT) return true;

          // Hide if array item is object
          return schemaItem.identifier === ARRAY_ITEM_KEY;
        },
      },
      {
        sectionName: $t('object.1d9ffe3b813c1872'),
        children: [
          {
            propertyName: "cellBackgroundColor",
            label: $t('object.964f29c75472086c'),
            controlType: "COLOR_PICKER",
            helpText: $t('object.f9abc147fdd6e36c'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            customJSControl: "JSON_FORM_COMPUTE_VALUE",
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
            dependencies: ["schema"],
          },
          {
            propertyName: "cellBorderColor",
            label: $t('object.7ce1a98ec60a3be8'),
            helpText: $t('object.d132f72c43fff065'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            customJSControl: "JSON_FORM_COMPUTE_VALUE",
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
            dependencies: ["schema"],
          },
          {
            propertyName: "cellBorderWidth",
            helpText: $t('object.d2cc58a90889ca9a'),
            label: $t('object.55cbeae7fcd65207'),
            placeholderText: $t('object.b374919af0ec13de'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
          },
          {
            propertyName: "cellBorderRadius",
            label: $t('object.609baa113e141917'),
            helpText:
              $t('object.c5c273c281dce734'),
            controlType: "BORDER_RADIUS_OPTIONS",
            customJSControl: "JSON_FORM_COMPUTE_VALUE",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            getStylesheetValue,
            validation: { type: ValidationTypes.TEXT },
            dependencies: ["schema"],
          },
          {
            propertyName: "cellBoxShadow",
            label: $t('object.6283e2fdc96dbeaf'),
            helpText:
              $t('object.1d82169262ac5d34'),
            controlType: "BOX_SHADOW_OPTIONS",
            customJSControl: "JSON_FORM_COMPUTE_VALUE",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            getStylesheetValue,
            validation: { type: ValidationTypes.TEXT },
            dependencies: ["schema"],
          },
        ],
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});

          if (schemaItem.fieldType !== FieldType.OBJECT) return true;

          // Hide if array item is object
          return schemaItem.identifier === ARRAY_ITEM_KEY;
        },
      },
      {
        /**
         * This is for an edge case where an array item is an object
         * Here we only want to change the cell** styles
         */
        sectionName: $t('object.8218efeec998849a'),
        children: objectStyleProperties,
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});

          if (schemaItem.fieldType !== FieldType.OBJECT) return true;

          // Hide if array item is not object
          return schemaItem.identifier !== ARRAY_ITEM_KEY;
        },
      },
    ],
  },
};

export default PROPERTIES;
