import {$t} from "locale/index";
import { get } from "lodash";
import type { WidgetProps } from "widgets/BaseWidget";
import type { ListWidgetProps } from "../constants";

import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { EVAL_VALUE_PATH } from "utils/DynamicBindingUtils";
export const PropertyPaneContentConfig = [
  {
    sectionName: $t('propertyConfig.1ec7b6bf5af8b025'),
    children: [
      {
        helpText: $t('propertyConfig.072339a97e21447f'),
        propertyName: "listData",
        label: $t('propertyConfig.9db45760671631fd'),
        controlType: "INPUT_TEXT",
        placeholderText: '[{ "name": $t('propertyConfig.9d38471c8641e1d5') }]',
        inputType: "ARRAY",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.ARRAY },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.5b1eb715c000146d'),
    children: [
      {
        helpText:
          $t('propertyConfig.3c64b1e6a813fbea'),
        propertyName: "serverSidePaginationEnabled",
        label: $t('propertyConfig.101ea126c9e5c0b8'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        helpText: $t('propertyConfig.c46a5bb389363d46'),
        propertyName: "onPageChange",
        label: "onPageChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: ListWidgetProps<WidgetProps>) =>
          !props.serverSidePaginationEnabled,
        dependencies: ["serverSidePaginationEnabled"],
      },
      {
        helpText: $t('propertyConfig.1324799087d11ec5'),
        propertyName: "onPageSizeChange",
        label: "onPageSizeChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: ListWidgetProps<WidgetProps>) =>
          !props.serverSidePaginationEnabled,
        dependencies: ["serverSidePaginationEnabled"],
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.6c800bb701698adc'),
    children: [
      {
        propertyName: "isVisible",
        label: $t('propertyConfig.25de00d3caf8846b'),
        helpText: $t('propertyConfig.06fe955c35835d2a'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.BOOLEAN,
        },
      },
      {
        propertyName: "animateLoading",
        label: $t('propertyConfig.8b4af8912d0645bd'),
        controlType: "SWITCH",
        helpText: $t('propertyConfig.9c2c15d92688595f'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.bb5495ab06667f34'),
    children: [
      {
        helpText: $t('propertyConfig.032d0d7e60fe8ec1'),
        propertyName: "onListItemClick",
        label: "onListItemClick",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: (props: ListWidgetProps<WidgetProps>) => {
          let items = get(props, `${EVAL_VALUE_PATH}.listData`, []);

          if (Array.isArray(items)) {
            items = items.filter(Boolean);
          } else {
            items = [];
          }

          return {
            currentItem: Object.assign(
              {},
              ...Object.keys(get(items, "0", {})).map((key) => ({
                [key]: "",
              })),
            ),
          };
        },
        dependencies: ["listData"],
      },
    ],
  },
];

export const PropertyPaneStyleConfig = [
  {
    sectionName: $t('propertyConfig.6c800bb701698adc'),
    children: [
      {
        helpText: $t('propertyConfig.5db8c5164211a78f'),
        placeholderText: "0",
        propertyName: "gridGap",
        label: $t('propertyConfig.c760a8a492c3c602'),
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        inputType: "INTEGER",
        validation: { type: ValidationTypes.NUMBER, params: { min: -8 } },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.3e933f9cb28a051a'),
    children: [
      {
        propertyName: "itemBackgroundColor",
        label: $t('propertyConfig.f75b897b73aaebdf'),
        helpText: $t('propertyConfig.64b8a79b0ed876a3'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        defaultValue: "#FFFFFF",
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            expected: {
              type: "Color name | hex code",
              example: "#FFFFFF",
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
      },
      {
        propertyName: "backgroundColor",
        label: $t('propertyConfig.193a3ddb323c0e87'),
        helpText: $t('propertyConfig.2f7573331227c1d7'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            expected: {
              type: "Color name | hex code",
              example: "#FFFFFF",
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.331dd778874949e2'),
    children: [
      {
        propertyName: "borderRadius",
        label: $t('propertyConfig.0eb48790c9a33e52'),
        helpText: $t('propertyConfig.71fc9a173f055d9d'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('propertyConfig.864b8dbd48fda82d'),
        helpText:
          $t('propertyConfig.15b226a4bac68e8f'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
