import {$t} from "locale/index";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { get } from "lodash";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { SchemaItem } from "widgets/JSONFormWidget/constants";
import {
  ARRAY_ITEM_KEY,
  FIELD_EXPECTING_OPTIONS,
  FIELD_SUPPORTING_FOCUS_EVENTS,
  FieldType,
} from "widgets/JSONFormWidget/constants";
import type { JSONFormWidgetProps } from "../..";
import { getParentPropertyPath } from "../../helper";
import type { HiddenFnParams } from "../helper";
import {
  fieldTypeUpdateHook,
  getAutocompleteProperties,
  getSchemaItem,
  getStylesheetValue,
  hiddenIfArrayItemIsObject,
  updateChildrenDisabledStateHook,
} from "../helper";

// ARRAY and OBJECT have border radius but in their own property configs as they have a variation
const FIELDS_WITHOUT_BORDER_RADIUS = [
  FieldType.ARRAY,
  FieldType.OBJECT,
  FieldType.RADIO_GROUP,
  FieldType.SWITCH,
];

const FIELDS_WITHOUT_BOX_SHADOW = [
  FieldType.ARRAY,
  FieldType.OBJECT,
  FieldType.CHECKBOX,
  FieldType.RADIO_GROUP,
  FieldType.SWITCH,
];

const FIELDS_WITH_ACCENT_COLOR = [
  FieldType.CHECKBOX,
  FieldType.CURRENCY_INPUT,
  FieldType.DATEPICKER,
  FieldType.EMAIL_INPUT,
  FieldType.MULTILINE_TEXT_INPUT,
  FieldType.MULTISELECT,
  FieldType.NUMBER_INPUT,
  FieldType.PASSWORD_INPUT,
  FieldType.PHONE_NUMBER_INPUT,
  FieldType.PHONE_NUMBER_INPUT,
  FieldType.RADIO_GROUP,
  FieldType.SELECT,
  FieldType.SWITCH,
  FieldType.TEXT_INPUT,
];

function accessorValidation(
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  props: JSONFormWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lodash: any,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  propertyPath: string,
): ValidationResponse {
  const propertyPathChunks = propertyPath.split(".");
  const grandParentPath = propertyPathChunks.slice(0, -2).join(".");
  const schemaItemIdentifier = propertyPathChunks.slice(-2)[0]; // ['schema', '__root_field__', 'children', 'age', 'name'] -> age
  const schema = lodash.cloneDeep(lodash.get(props, grandParentPath));
  const RESTRICTED_KEYS = ["__array_item__", "__root_schema__"];
  const currentSchemaItem = lodash.cloneDeep(schema[schemaItemIdentifier]);

  // Remove the current edited schemaItem from schema so it doesn't
  // get picked in the existing keys list
  delete schema[schemaItemIdentifier];

  // If the field is not _id (mongo id) then it shouldn't be allowed
  if (currentSchemaItem.originalIdentifier !== "_id") {
    RESTRICTED_KEYS.push("_id");
  }

  if (value === "") {
    return {
      isValid: false,
      parsed: value,
      messages: [
        {
          name: "ValidationError",
          message: $t('common.a7e64697b713ba0d'),
        },
      ],
    };
  }

  const existingKeys = (Object.values(schema) || []).map(
    // @ts-expect-error: Types are not available
    (schemaItem) => schemaItem.name,
  );

  if (existingKeys.includes(value)) {
    return {
      isValid: false,
      parsed: "",
      messages: [
        {
          name: "ValidationError",
          message: $t('common.f0fba3eb15db2a4f'),
        },
      ],
    };
  }

  if (RESTRICTED_KEYS.includes(value)) {
    return {
      isValid: false,
      parsed: "",
      messages: [
        {
          name: "ValidationError",
          message: $t('common.948df7f0be9f4987'),
        },
      ],
    };
  }

  return {
    isValid: true,
    parsed: value,
    messages: [{ name: "", message: "" }],
  };
}

const COMMON_PROPERTIES = {
  content: {
    data: [
      {
        propertyName: "fieldType",
        label: $t('common.8a5a4f8f5b1aa40a'),
        helpText: $t('common.589783cde6f017cb'),
        controlType: "DROP_DOWN",
        isBindProperty: false,
        isTriggerProperty: false,
        options: Object.values(FieldType).map((option) => ({
          label: option,
          value: option,
        })),
        dependencies: ["schema", "childStylesheet", "dynamicBindingPathList"],
        updateHook: fieldTypeUpdateHook,
      },
      {
        propertyName: "accessor",
        helpText:
          $t('common.d818efa7d67f5546'),
        label: $t('common.c650b2455bce2e23'),
        controlType: "INPUT_TEXT",
        placeholderText: "name",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: accessorValidation,
            expected: {
              type: "unique string",
              example: `firstName | last_name | age14`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
        hidden: (props: JSONFormWidgetProps, propertyPath: string) => {
          const parentPath = getParentPropertyPath(propertyPath);
          const schemaItem: SchemaItem = get(props, parentPath, {});
          const isArrayItem = schemaItem.identifier === ARRAY_ITEM_KEY;

          if (isArrayItem) return true;
        },
        dependencies: ["schema"],
      },
      {
        propertyName: "options",
        helpText:
          $t('common.aa2e648c94d427c6'),
        label: $t('common.f4fc480aa7b0ed94'),
        controlType: "INPUT_TEXT",
        placeholderText: '[{ "label": "Option1", "value": "Option2" }]',
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            unique: ["value"],
            children: {
              type: ValidationTypes.OBJECT,
              params: {
                required: true,
                allowedKeys: [
                  {
                    name: "label",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                      required: true,
                    },
                  },
                  {
                    name: "value",
                    type: ValidationTypes.TEXT,
                    params: {
                      default: "",
                      required: true,
                    },
                  },
                ],
              },
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(FIELD_EXPECTING_OPTIONS),
        dependencies: ["schema", "sourceData"],
      },
    ],
    general: [
      {
        propertyName: "tooltip",
        helpText: $t('common.f107b8d915334a6f'),
        label: $t('common.1756c956aae7f8ce'),
        controlType: "JSON_FORM_COMPUTE_VALUE",
        placeholderText: $t('common.466d70f85c64b411'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: hiddenIfArrayItemIsObject,
        dependencies: ["schema", "sourceData"],
      },
    ],
    label: [
      {
        propertyName: "label",
        helpText: $t('common.677d8c7f59bc8c54'),
        label: $t('common.360089b75a50cd2a'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('common.6b9b29b5f611ff9d'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: hiddenIfArrayItemIsObject,
        dependencies: ["schema", "sourceData"],
      },
    ],
    generalSwitch: [
      {
        propertyName: "isVisible",
        helpText: $t('common.8bdc63104169ee4b'),
        label: $t('common.d7e57f9a67590f41'),
        controlType: "SWITCH",
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) => {
          return getSchemaItem(...args).compute(
            (schemaItem) => schemaItem.identifier === ARRAY_ITEM_KEY,
          );
        },
        dependencies: ["schema", "sourceData"],
      },
      {
        propertyName: "isDisabled",
        helpText: $t('common.217b719c4b530fe4'),
        label: $t('common.8ad563e88bc4e1a1'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.BOOLEAN },
        dependencies: ["schema", "sourceData"],
        updateHook: updateChildrenDisabledStateHook,
      },
      {
        propertyName: "shouldAllowAutofill",
        label: $t('common.fd3c10561fb2c087'),
        helpText: $t('common.0a498fd124778d73'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
        hidden: (...args: HiddenFnParams) => {
          //should be shown for only inputWidgetV2 and for email or password input types
          return getSchemaItem(...args).fieldTypeNotIncludes([
            FieldType.EMAIL_INPUT,
            FieldType.PASSWORD_INPUT,
          ]);
        },
        dependencies: ["schema", "sourceData"],
      },
    ],
    events: [
      {
        propertyName: "onFocus",
        helpText: "when focused.",
        label: "onFocus",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        dependencies: ["schema", "sourceData"],
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(
            FIELD_SUPPORTING_FOCUS_EVENTS,
          ),
      },
      {
        propertyName: "onBlur",
        helpText: "when the field loses focus.",
        label: "onBlur",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        additionalAutoComplete: getAutocompleteProperties,
        dependencies: ["schema", "sourceData"],
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(
            FIELD_SUPPORTING_FOCUS_EVENTS,
          ),
      },
    ],
  },
  style: {
    label: [
      {
        propertyName: "labelTextColor",
        label: $t('common.d54eaa3261c71b15'),
        helpText: $t('common.f9efa609a452765f'),
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
        dependencies: ["schema", "sourceData"],
      },
      {
        propertyName: "labelTextSize",
        label: $t('common.ae5f5532709a87d3'),
        helpText: $t('common.6886a53f1e80fd32'),
        defaultValue: "0.875rem",
        controlType: "DROP_DOWN",
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
        label: $t('common.62757c654d306a06'),
        helpText: $t('common.4d08850bab1c0832'),
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
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        validation: { type: ValidationTypes.TEXT },
        dependencies: ["schema", "sourceData"],
      },
    ],
    borderShadow: [
      {
        propertyName: "borderRadius",
        label: $t('common.52ca554cb610a843'),
        helpText: $t('common.df65271fe8dd96c4'),
        controlType: "BORDER_RADIUS_OPTIONS",
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        getStylesheetValue,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeIncludes(
            FIELDS_WITHOUT_BORDER_RADIUS,
          ),
        dependencies: ["schema"],
      },
      {
        propertyName: "boxShadow",
        label: $t('common.fc4820bf1fb40a40'),
        helpText:
          $t('common.5200761fe04ca404'),
        controlType: "BOX_SHADOW_OPTIONS",
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        getStylesheetValue,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeIncludes(FIELDS_WITHOUT_BOX_SHADOW),
        validation: { type: ValidationTypes.TEXT },
        dependencies: ["schema"],
      },
    ],
    color: [
      {
        propertyName: "accentColor",
        helpText: $t('common.e85c739aafcb4f2e'),
        label: $t('common.78925b9014021e9f'),
        controlType: "COLOR_PICKER",
        customJSControl: "JSON_FORM_COMPUTE_VALUE",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        getStylesheetValue,
        hidden: (...args: HiddenFnParams) =>
          getSchemaItem(...args).fieldTypeNotIncludes(FIELDS_WITH_ACCENT_COLOR),
        dependencies: ["schema"],
      },
    ],
  },
};

export default COMMON_PROPERTIES;
