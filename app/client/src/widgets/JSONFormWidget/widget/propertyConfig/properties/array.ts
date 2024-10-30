import {$t} from "locale/index";
import { get } from "lodash";

import { ValidationTypes } from "constants/WidgetValidation";
import type { SchemaItem } from "widgets/JSONFormWidget/constants";
import { FieldType } from "widgets/JSONFormWidget/constants";
import type { JSONFormWidgetProps } from "../..";
import type { HiddenFnParams } from "../helper";
import { getSchemaItem, getStylesheetValue } from "../helper";

const PROPERTIES = {
  style: {
    root: [
      {
        sectionName: $t('array.277f3acc77cd5215'),
        children: [
          {
            propertyName: "backgroundColor",
            label: $t('array.adb18374fe45d219'),
            controlType: "COLOR_PICKER",
            helpText: $t('array.97eac14e57cc67b5'),
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
            helpText: $t('array.1cb78b55d94364dc'),
            label: $t('array.fbf171ebda6e2d5e'),
            placeholderText: $t('array.90b7e74ed0da53c5'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
          },
          {
            propertyName: "borderColor",
            label: $t('array.adc0b814766c9b6f'),
            helpText: $t('array.7acebf86627a3e8c'),
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
            propertyName: "borderRadius",
            label: $t('array.30261b10643661f2'),
            helpText:
              $t('array.08e0d15ad92bcb62'),
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
            label: $t('array.31cad802d471891f'),
            helpText:
              $t('array.d376091364e62ba8'),
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

          // Hidden if not ARRAY
          return schemaItem.fieldType !== FieldType.ARRAY;
        },
      },
      {
        sectionName: $t('array.5e386fb5985bb663'),
        children: [
          {
            propertyName: "cellBackgroundColor",
            label: $t('array.adb18374fe45d219'),
            controlType: "COLOR_PICKER",
            helpText: $t('array.1e52e464b2116032'),
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
            helpText: $t('array.94c90871b4ce17eb'),
            label: $t('array.fbf171ebda6e2d5e'),
            placeholderText: $t('array.90b7e74ed0da53c5'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
          },
          {
            propertyName: "cellBorderColor",
            label: $t('array.adc0b814766c9b6f'),
            helpText: $t('array.64346446016b0f4b'),
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
            propertyName: "cellBorderRadius",
            label: $t('array.30261b10643661f2'),
            helpText:
              $t('array.08e0d15ad92bcb62'),
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
            label: $t('array.31cad802d471891f'),
            helpText:
              $t('array.d376091364e62ba8'),
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

          // Hidden if not ARRAY
          return schemaItem.fieldType !== FieldType.ARRAY;
        },
      },
    ],
  },
  content: {
    data: [
      {
        helpText:
          $t('array.5b97a9f4aa6d22be'),
        propertyName: "defaultValue",
        label: $t('array.93c7d605e41527b7'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: "[]",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
        },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.ARRAY),
        dependencies: ["schema"],
      },
    ],
    general: [
      {
        propertyName: "isCollapsible",
        label: $t('array.90ebcf2d1cbec0c4'),
        helpText: $t('array.b687539905064dfc'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotMatches(FieldType.ARRAY),
        dependencies: ["schema"],
      },
    ],
  },
};

export default PROPERTIES;
