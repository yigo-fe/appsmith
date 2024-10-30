import {$t} from "locale/index";
import { get, isEmpty } from "lodash";

import type { PanelConfig } from "constants/PropertyControlConstants";
import type { SchemaItem } from "widgets/JSONFormWidget/constants";
import { FieldType } from "widgets/JSONFormWidget/constants";
import type { HiddenFnParams } from "./helper";
import { getSchemaItem, isFieldTypeArrayOrObject } from "./helper";
import {
  ARRAY_PROPERTIES,
  CHECKBOX_PROPERTIES,
  COMMON_PROPERTIES,
  DATE_PROPERTIES,
  INPUT_PROPERTIES,
  MULTI_SELECT_PROPERTIES,
  OBJECT_PROPERTIES,
  RADIO_GROUP_PROPERTIES,
  SELECT_PROPERTIES,
  SWITCH_PROPERTIES,
} from "./properties";
import type { JSONFormWidgetProps } from "..";

function generatePanelPropertyConfig(
  nestingLevel: number,
): PanelConfig | undefined {
  if (nestingLevel === 0) return;

  return {
    editableTitle: true,
    titlePropertyName: "label",
    panelIdPropertyName: "identifier",
    contentChildren: [
      {
        sectionName: $t('generatePanelPropertyConfig.67397d97fdee8fe1'),
        children: [
          ...COMMON_PROPERTIES.content.data,
          ...INPUT_PROPERTIES.content.data,
          ...SWITCH_PROPERTIES.content.data,
          ...SELECT_PROPERTIES.content.data,
          ...RADIO_GROUP_PROPERTIES.content.data,
          ...MULTI_SELECT_PROPERTIES.content.data,
          ...DATE_PROPERTIES.content.data,
          ...CHECKBOX_PROPERTIES.content.data,
          ...ARRAY_PROPERTIES.content.data,
          {
            propertyName: "children",
            label: $t('generatePanelPropertyConfig.8d92f8b41dce5c10'),
            helpText: $t('generatePanelPropertyConfig.8d92f8b41dce5c10'),
            controlType: "FIELD_CONFIGURATION",
            isBindProperty: false,
            isTriggerProperty: false,
            panelConfig: generatePanelPropertyConfig(nestingLevel - 1),
            hidden: (...args: HiddenFnParams) => {
              return getSchemaItem(...args).compute((schemaItem) => {
                return (
                  schemaItem.fieldType !== FieldType.OBJECT &&
                  isEmpty(schemaItem.children)
                );
              });
            },
            dependencies: ["schema", "childStylesheet"],
          },
        ],
      },
      {
        sectionName: $t('generatePanelPropertyConfig.67b7ca824dd3aea2'),
        children: [
          ...COMMON_PROPERTIES.content.label,
          ...CHECKBOX_PROPERTIES.content.label,
          ...SWITCH_PROPERTIES.content.label,
        ],
      },
      {
        sectionName: $t('generatePanelPropertyConfig.fd3617abb60b9822'),
        children: [
          ...SELECT_PROPERTIES.content.searchAndFilters,
          ...MULTI_SELECT_PROPERTIES.content.searchAndFilters,
        ],
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});

          return !(
            schemaItem.fieldType === FieldType.SELECT ||
            schemaItem.fieldType === FieldType.MULTISELECT
          );
        },
      },
      {
        sectionName: $t('generatePanelPropertyConfig.e1e5f5efe0082b5a'),
        children: [
          ...INPUT_PROPERTIES.content.validation,
          ...DATE_PROPERTIES.content.validation,
        ],
        hidden: isFieldTypeArrayOrObject,
      },
      {
        sectionName: $t('generatePanelPropertyConfig.aeab8bb434891b40'),
        children: [
          ...COMMON_PROPERTIES.content.general,
          ...INPUT_PROPERTIES.content.general,
          ...SELECT_PROPERTIES.content.general,
          ...MULTI_SELECT_PROPERTIES.content.general,
          ...COMMON_PROPERTIES.content.generalSwitch,
          ...MULTI_SELECT_PROPERTIES.content.toggles,
          ...DATE_PROPERTIES.content.general,
          ...ARRAY_PROPERTIES.content.general,
        ],
      },
      {
        sectionName: $t('generatePanelPropertyConfig.40deb0906babb248'),
        children: [
          ...CHECKBOX_PROPERTIES.content.events,
          ...DATE_PROPERTIES.content.events,
          ...MULTI_SELECT_PROPERTIES.content.events,
          ...INPUT_PROPERTIES.content.events,
          ...SWITCH_PROPERTIES.content.events,
          ...SELECT_PROPERTIES.content.events,
          ...COMMON_PROPERTIES.content.events,
          ...RADIO_GROUP_PROPERTIES.content.events,
        ],
        hidden: isFieldTypeArrayOrObject,
      },
    ],
    styleChildren: [
      {
        sectionName: $t('generatePanelPropertyConfig.b18810e44862acd0'),
        children: [...COMMON_PROPERTIES.style.label],
      },
      {
        sectionName: $t('generatePanelPropertyConfig.1fda21123abd99dc'),
        children: [...INPUT_PROPERTIES.style.icon],
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});

          return !(
            schemaItem.fieldType === FieldType.TEXT_INPUT ||
            schemaItem.fieldType === FieldType.EMAIL_INPUT ||
            schemaItem.fieldType === FieldType.PASSWORD_INPUT ||
            schemaItem.fieldType === FieldType.NUMBER_INPUT
          );
        },
      },
      {
        sectionName: $t('generatePanelPropertyConfig.f1f75840d2ba8586'),
        children: [...COMMON_PROPERTIES.style.color],
        hidden: isFieldTypeArrayOrObject,
      },
      {
        sectionName: $t('generatePanelPropertyConfig.cc5e5b8cd8c064b6'),
        children: [...COMMON_PROPERTIES.style.borderShadow],
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const schemaItem: SchemaItem = get(props, propertyPath, {});

          return (
            schemaItem.fieldType === FieldType.ARRAY ||
            schemaItem.fieldType === FieldType.OBJECT ||
            schemaItem.fieldType === FieldType.RADIO_GROUP ||
            schemaItem.fieldType === FieldType.SWITCH
          );
        },
      },
      ...OBJECT_PROPERTIES.style.root,
      ...ARRAY_PROPERTIES.style.root,
    ],
  } as PanelConfig;
}

export default generatePanelPropertyConfig;
