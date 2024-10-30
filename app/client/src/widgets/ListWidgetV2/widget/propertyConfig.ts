import {$t} from "locale/index";
import { get, isPlainObject } from "lodash";
import log from "loglevel";

import { EVALUATION_PATH, EVAL_VALUE_PATH } from "utils/DynamicBindingUtils";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import type { WidgetProps } from "widgets/BaseWidget";
import type { ListWidgetProps } from ".";
import { getBindingTemplate } from "../constants";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import {
  LIST_WIDGET_V2_TOTAL_RECORD_TOOLTIP,
  createMessage,
} from "ee/constants/messages";

const MIN_ITEM_SPACING = 0;
const MAX_ITEM_SPACING = 16;
const MIN_TOTAL_RECORD_COUNT = 0;
const MAX_TOTAL_RECORD_COUNT = Number.MAX_SAFE_INTEGER;

const isValidListData = (
  value: unknown,
): value is Exclude<ListWidgetProps["listData"], undefined> => {
  return Array.isArray(value) && value.length > 0 && isPlainObject(value[0]);
};

export const primaryColumnValidation = (
  inputValue: unknown,
  props: ListWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
) => {
  const { dynamicPropertyPathList = [], listData = [] } = props;
  const isArray = Array.isArray(inputValue);
  const isJSModeEnabled = Boolean(
    dynamicPropertyPathList.find((d) => d.key === "primaryKeys"),
  );

  if (listData.length) {
    if (isArray) {
      // For not valid entries an empty array is parsed as the inputValue is an array type
      if (inputValue.length === 0) {
        return {
          isValid: false,
          parsed: [],
          messages: [
            {
              name: "ValidationError",
              message:
                $t('propertyConfig.142ee2938555c183'),
            },
          ],
        };
      }

      // when PrimaryKey is {{ currentItem["img"] }} and img doesn't exist in the data.
      if (inputValue.every((value) => _.isNil(value))) {
        return {
          isValid: false,
          parsed: [],
          messages: [
            {
              name: "ValidationError",
              message:
                $t('propertyConfig.0be45d6f5f90e48e'),
            },
          ],
        };
      }

      //  PrimaryKey evaluation has null or undefined values.
      if (inputValue.some((value) => _.isNil(value))) {
        return {
          isValid: false,
          parsed: [],
          messages: [
            {
              name: "ValidationError",
              message:
                $t('propertyConfig.5e0cb870a5139589'),
            },
          ],
        };
      }

      const areKeysUnique = _.uniq(inputValue).length === listData.length;

      const isDataTypeUnique =
        // TODO: Fix this the next time the file is edited
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _.uniqBy(inputValue, (item: any) => item.toString()).length ===
        listData.length;

      if (!areKeysUnique || !isDataTypeUnique) {
        return {
          isValid: false,
          parsed: [],
          messages: [
            {
              name: "ValidationError",
              message:
                $t('propertyConfig.e936b0be0bde11a5'),
            },
          ],
        };
      }
    } else {
      const message = isJSModeEnabled
        ? $t('propertyConfig.e58aa8b18baae5d7')
        : $t('propertyConfig.12f43d9fce4649dc');

      return {
        isValid: false,
        parsed: undefined, // undefined as we do not know what the data type of inputValue is so "[]" is not an appropriate value to return
        messages: [{ name: "ValidationError", message }],
      };
    }
  }

  return {
    isValid: true,
    parsed: inputValue,
    messages: [{ name: "", message: "" }],
  };
};

export function defaultSelectedItemValidation(
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  props: ListWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _?: any,
): ValidationResponse {
  const TYPE_ERROR_MESSAGE = {
    name: "TypeError",
    message: $t('propertyConfig.45c376e4be4aafa0'),
  };

  const EMPTY_ERROR_MESSAGE = { name: "", message: "" };

  if (value === undefined) {
    return {
      isValid: true,
      parsed: value,
      messages: [EMPTY_ERROR_MESSAGE],
    };
  }

  if (!_.isFinite(value) && !_.isString(value)) {
    return {
      isValid: false,
      parsed: value,
      messages: [TYPE_ERROR_MESSAGE],
    };
  }

  return {
    isValid: true,
    parsed: String(value),
    messages: [EMPTY_ERROR_MESSAGE],
  };
}

const getPrimaryKeyFromDynamicValue = (
  prefixTemplate: string,
  suffixTemplate: string,
  dynamicValue?: string,
) => {
  if (!dynamicValue) return "";

  const updatedPrefix = `${prefixTemplate} currentItem[`;
  const updatedSuffix = `] ${suffixTemplate}`;
  const suffixLength = dynamicValue.length - updatedSuffix.length;

  const value = dynamicValue.substring(updatedPrefix.length, suffixLength);

  try {
    return JSON.parse(value);
  } catch (error) {
    log.error(error);

    return "";
  }
};

export const primaryKeyOptions = (props: ListWidgetProps) => {
  const { widgetName } = props;
  // Since this is uneval value, coercing it to primitive type
  const primaryKeys = props.primaryKeys as unknown as string | undefined;
  const listData = props[EVALUATION_PATH]?.evaluatedValues?.listData || [];
  const { prefixTemplate, suffixTemplate } = getBindingTemplate(widgetName);

  const prevSelectedKey = getPrimaryKeyFromDynamicValue(
    prefixTemplate,
    suffixTemplate,
    primaryKeys,
  );
  const options: {
    label: string;
    value: string;
  }[] = [];

  // Add previously selected key to options
  if (prevSelectedKey) {
    options.push({
      label: prevSelectedKey,
      value: `${prefixTemplate} currentItem[${JSON.stringify(
        prevSelectedKey,
      )}] ${suffixTemplate}`,
    });
  }

  if (isValidListData(listData)) {
    Object.keys(listData[0]).forEach((key) => {
      if (key !== prevSelectedKey) {
        options.push({
          label: key,
          value: `${prefixTemplate} currentItem[${JSON.stringify(
            key,
          )}] ${suffixTemplate}`,
        });
      }
    });
  }

  return options;
};

export const PropertyPaneContentConfig = [
  {
    sectionName: $t('propertyConfig.79971c7dc2a720e9'),
    children: [
      {
        propertyName: "listData",
        helpText: $t('propertyConfig.3695a1d118f46028'),
        label: $t('propertyConfig.e7d8f5c15ae0818a'),
        controlType: "INPUT_TEXT",
        placeholderText: '[{ "name": $t('propertyConfig.130e7699407a4b7d') }]',
        inputType: "ARRAY",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.ARRAY,
          params: {
            default: [],
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "primaryKeys",
        helperText:
          $t('propertyConfig.2b58b88b7db34b79'),
        label: $t('propertyConfig.196cc8d29a7083ab'),
        controlType: "DROP_DOWN",
        dropdownUsePropertyValue: true,
        customJSControl: "LIST_COMPUTE_CONTROL",
        isBindProperty: true,
        isTriggerProperty: false,
        isJSConvertible: true,
        dependencies: ["listData"],
        evaluatedDependencies: ["listData"],
        options: primaryKeyOptions,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: primaryColumnValidation,
            expected: {
              type: "Array<string | number>",
              example: `["1", "2", "3"]`,
              autocompleteDataType: AutocompleteDataType.ARRAY,
            },
          },
        },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.d70df00a97273820'),
    children: [
      // Disabling till List V2.1
      // {
      //   propertyName: "infiniteScroll",
      //   label: "Infinite scroll",
      //   helpText: "Scrolls vertically, removes pagination",
      //   controlType: "SWITCH",
      //   isJSConvertible: true,
      //   isBindProperty: true,
      //   isTriggerProperty: false,
      //   validation: {
      //     type: ValidationTypes.BOOLEAN,
      //   },
      // },
      {
        propertyName: "serverSidePagination",
        helpText:
          $t('propertyConfig.6a2ecd82b8234cb6'),
        label: $t('propertyConfig.4f4fb2fa02b7e90b'),
        controlType: "SWITCH",
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "totalRecordsCount",
        helpText: createMessage(LIST_WIDGET_V2_TOTAL_RECORD_TOOLTIP),
        label: $t('propertyConfig.4c38ba93e09320a7'),
        controlType: "INPUT_TEXT",
        inputType: "INTEGER",
        isBindProperty: true,
        isTriggerProperty: false,
        placeholderText: $t('propertyConfig.10f354e889b4f966'),
        validation: {
          type: ValidationTypes.NUMBER,
          params: {
            min: MIN_TOTAL_RECORD_COUNT,
            max: MAX_TOTAL_RECORD_COUNT,
          },
        },
        hidden: (props: ListWidgetProps<WidgetProps>) =>
          !props.serverSidePagination,
        dependencies: ["serverSidePagination"],
      },
      {
        propertyName: "onPageChange",
        helpText:
          $t('propertyConfig.a1edb180184a7227'),
        label: "onPageChange",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
        hidden: (props: ListWidgetProps<WidgetProps>) =>
          !props.serverSidePagination,
        dependencies: ["serverSidePagination"],
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.cb0ffe0cc9523332'),
    children: [
      {
        propertyName: "defaultSelectedItem",
        helpText: $t('propertyConfig.35e68da7498316a4'),
        label: $t('propertyConfig.f7eef3cad2cd1231'),
        controlType: "INPUT_TEXT",
        placeholderText: "001",
        isBindProperty: true,
        isTriggerProperty: false,
        hidden: (props: ListWidgetProps<WidgetProps>) =>
          !!props.serverSidePagination,
        dependencies: ["serverSidePagination"],
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: defaultSelectedItemValidation,
            expected: {
              type: "string or number",
              example: `John | 123`,
              autocompleteDataType: AutocompleteDataType.STRING,
            },
          },
        },
      },
      {
        propertyName: "onItemClick",
        helpText: $t('propertyConfig.f39cfc779133504a'),
        label: "onItemClick",
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
            currentIndex: 0,
          };
        },
        dependencies: ["listData"],
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.9101ba82f37769dc'),
    children: [
      {
        propertyName: "isVisible",
        label: $t('propertyConfig.223b5632f95afd7b'),
        helpText: $t('propertyConfig.3ed605922a1e6b76'),
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
        label: $t('propertyConfig.68057a4c22328533'),
        controlType: "SWITCH",
        helpText:
          $t('propertyConfig.d422937efce6f8ad'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
    ],
  },
];

export const PropertyPaneStyleConfig = [
  {
    sectionName: $t('propertyConfig.9101ba82f37769dc'),
    children: [
      {
        propertyName: "itemSpacing",
        helpText: $t('propertyConfig.8eb2adee45c08bab'),
        placeholderText: "0",
        label: $t('propertyConfig.10be76acc5ac419c'),
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        inputType: "INTEGER",
        validation: {
          type: ValidationTypes.NUMBER,
          params: { min: MIN_ITEM_SPACING, max: MAX_ITEM_SPACING },
        },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.b6f01f5ee5b18a68'),
    children: [
      {
        propertyName: "backgroundColor",
        label: $t('propertyConfig.04843b10ef2c17ad'),
        helpText: $t('propertyConfig.0a457a4c821f2faf'),
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
    sectionName: $t('propertyConfig.7e2884d88df4841a'),
    children: [
      {
        propertyName: "borderRadius",
        label: $t('propertyConfig.3a0f6b2a135980e0'),
        helpText: $t('propertyConfig.fb9956b01e21718d'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('propertyConfig.d2844ff5e5df942b'),
        helpText: $t('propertyConfig.e4094e64a20f24e0'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
