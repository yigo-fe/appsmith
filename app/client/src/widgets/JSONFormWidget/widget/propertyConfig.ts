import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { ButtonPlacementTypes, ButtonVariantTypes } from "components/constants";
import type { OnButtonClickProps } from "components/propertyControls/ButtonControl";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { EVALUATION_PATH } from "utils/DynamicBindingUtils";
import type { ButtonWidgetProps } from "widgets/ButtonWidget/widget";
import type { JSONFormWidgetProps } from ".";
import { FieldType, ROOT_SCHEMA_KEY } from "../constants";
import { ComputedSchemaStatus, computeSchema } from "./helper";
import generatePanelPropertyConfig from "./propertyConfig/generatePanelPropertyConfig";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import {
  JSON_FORM_CONNECT_BUTTON_TEXT,
  SUCCESSFULL_BINDING_MESSAGE,
} from "../constants/messages";
import { createMessage } from "ee/constants/messages";
import { FieldOptionsType } from "components/editorComponents/WidgetQueryGeneratorForm/WidgetSpecificControls/OtherFields/Field/Dropdown/types";
import { DROPDOWN_VARIANT } from "components/editorComponents/WidgetQueryGeneratorForm/CommonControls/DatasourceDropdown/types";

const MAX_NESTING_LEVEL = 5;

const panelConfig = generatePanelPropertyConfig(MAX_NESTING_LEVEL);

export const sourceDataValidationFn = (
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  props: JSONFormWidgetProps,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _?: any,
): ValidationResponse => {
  if (value === "") {
    return {
      isValid: true,
      parsed: value,
    };
  }

  if (value === null || value === undefined) {
    return {
      isValid: false,
      parsed: value,
      messages: [
        {
          name: "ValidationError",
          message: $t('propertyConfig.21ae21acb480d80e'),
        },
      ],
    };
  }

  if (_.isObject(value) && Object.keys(value).length === 0) {
    return {
      isValid: false,
      parsed: value,
      messages: [
        {
          name: "ValidationError",
          message: $t('propertyConfig.78bb2d49f4cb6e11'),
        },
      ],
    };
  }

  if (_.isNumber(value) || _.isBoolean(value)) {
    return {
      isValid: false,
      parsed: {},
      messages: [
        {
          name: "ValidationError",
          message: $t('propertyConfig.08e7c3d3d1d204ae', {value: value}),
        },
      ],
    };
  }

  if (_.isNil(value)) {
    return {
      isValid: true,
      parsed: {},
    };
  }

  if (_.isArray(value)) {
    return {
      isValid: false,
      parsed: {},
      messages: [
        {
          name: "TypeError",
          message: $t('propertyConfig.9a9c2ddf77b9913a'),
        },
      ],
    };
  }

  if (_.isPlainObject(value)) {
    return {
      isValid: true,
      parsed: value,
    };
  }

  try {
    return {
      isValid: true,
      parsed: JSON.parse(value as string),
    };
  } catch (e) {
    return {
      isValid: false,
      parsed: {},
      messages: [e as Error],
    };
  }
};

export const onGenerateFormClick = ({
  batchUpdateProperties,
  props,
}: OnButtonClickProps) => {
  const widgetProperties: JSONFormWidgetProps = props.widgetProperties;

  if (widgetProperties.autoGenerateForm) return;

  // TODO: Fix this the next time the file is edited
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const currSourceData = widgetProperties[EVALUATION_PATH]?.evaluatedValues
    ?.sourceData as Record<string, any> | Record<string, any>[];
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const prevSourceData = widgetProperties.schema?.__root_schema__?.sourceData;

  const { dynamicPropertyPathList, schema, status } = computeSchema({
    currentDynamicPropertyPathList: widgetProperties.dynamicPropertyPathList,
    currSourceData,
    fieldThemeStylesheets: widgetProperties.childStylesheet,
    prevSchema: widgetProperties.schema,
    prevSourceData,
    widgetName: widgetProperties.widgetName,
  });

  if (status === ComputedSchemaStatus.LIMIT_EXCEEDED) {
    batchUpdateProperties({ fieldLimitExceeded: true });

    return;
  }

  if (status === ComputedSchemaStatus.UNCHANGED) {
    if (widgetProperties.fieldLimitExceeded) {
      batchUpdateProperties({ fieldLimitExceeded: false });
    }

    return;
  }

  if (status === ComputedSchemaStatus.UPDATED) {
    batchUpdateProperties({
      dynamicPropertyPathList,
      schema,
      fieldLimitExceeded: false,
    });
  }
};

const generateFormCTADisabled = (widgetProps: JSONFormWidgetProps) =>
  widgetProps.autoGenerateForm;

export const contentConfig = [
  {
    sectionName: $t('propertyConfig.2ceeba750b780ac6'),
    children: [
      {
        propertyName: "sourceData",
        helpText: $t('propertyConfig.17004d8220629411'),
        label: $t('propertyConfig.bba4b236e8f03544'),
        controlType: "ONE_CLICK_BINDING_CONTROL",
        controlConfig: {
          showEditFieldsModal: true, // Shows edit field modals button in the datasource table control
          datasourceDropdownVariant: DROPDOWN_VARIANT.CREATE_OR_EDIT_RECORDS, // Decides the variant of the datasource dropdown which alters the text and some options
          actionButtonCtaText: createMessage(JSON_FORM_CONNECT_BUTTON_TEXT), // CTA text for the connect action button in property pane
          excludePrimaryColumnFromQueryGeneration: true, // Excludes the primary column from the query generation by default
          isConnectableToWidget: true, // Whether this widget can be connected to another widget like Table,List etc
          alertMessage: {
            success: {
              update: createMessage(SUCCESSFULL_BINDING_MESSAGE, "updated"),
            }, // Alert message to show when the binding is successful
          },
          /* other form config options like create or update flow, get default values from widget and data identifier to be used in the generated query as primary key*/
          otherFields: [
            {
              label: $t('propertyConfig.25748ce9532c1373'),
              name: "formType",
              fieldType: FieldType.SELECT,
              optionType: FieldOptionsType.CUSTOM, // Dropdown options can be custom ( options provided by the widget config like Line 193 ) or widgets ( connectable widgets in the page ) or columns ( columns from the datasource )
              isRequired: true,
              getDefaultValue: () => {
                return "create";
              },
              allowClear: false, // whether the dropdown should have a clear option
              options: [
                {
                  label: $t('propertyConfig.44a6940116fca938'),
                  value: "create",
                  id: "create",
                },
                {
                  label: $t('propertyConfig.bcab694dd35a155c'),
                  value: "edit",
                  id: "edit",
                },
              ],
              // TODO: Fix this the next time the file is edited
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              isVisible: (config: Record<string, any>) => {
                // Whether the field should be visible or not based on the config
                return config?.tableName !== "";
              },
            },
            {
              label: $t('propertyConfig.85d0e3b121fb36aa'),
              name: "defaultValues",
              fieldType: FieldType.SELECT,
              optionType: FieldOptionsType.WIDGETS,
              isRequired: true,
              // TODO: Fix this the next time the file is edited
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              isVisible: (config: Record<string, any>) => {
                return config?.otherFields?.formType === "edit";
              },
            },
            {
              label: $t('propertyConfig.e211759027cc27da'),
              name: "dataIdentifier",
              isDataIdentifier: true, // Whether the field is a data identifier or not
              fieldType: FieldType.SELECT,
              optionType: FieldOptionsType.COLUMNS,
              isRequired: true,
              getDefaultValue: (options: Record<string, unknown>) => {
                return options?.primaryColumn;
              },
              // TODO: Fix this the next time the file is edited
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              isVisible: (config: Record<string, any>) => {
                return config?.otherFields?.formType === "edit";
              },
            },
          ],
        },
        isJSConvertible: true,
        placeholderText: `{ "name": ${$t('propertyConfig.fc167480aca97d1c')}, "age": 24 }`,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.FUNCTION,
          params: {
            fn: sourceDataValidationFn,
            expected: {
              type: "JSON",
              example: `{ "name": $t('propertyConfig.e460ccfa172d1a1f'), "age": 29 }`,
              autocompleteDataType: AutocompleteDataType.OBJECT,
            },
          },
        },
        evaluationSubstitutionType: EvaluationSubstitutionType.SMART_SUBSTITUTE,
      },
      {
        propertyName: "autoGenerateForm",
        helpText:
          $t('propertyConfig.b8408172831592ea'),
        label: $t('propertyConfig.351bde99befdd3ff'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        customJSControl: "INPUT_TEXT",
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "generateFormButton",
        label: "",
        controlType: "BUTTON",
        isJSConvertible: false,
        isBindProperty: false,
        buttonLabel: $t('propertyConfig.4c5167d592c41c40'),
        onClick: onGenerateFormClick,
        isDisabled: generateFormCTADisabled,
        isTriggerProperty: false,
        dependencies: [
          "autoGenerateForm",
          "schema",
          "fieldLimitExceeded",
          "childStylesheet",
          "dynamicPropertyPathList",
        ],
        evaluatedDependencies: ["sourceData"],
      },
      {
        propertyName: `schema.${ROOT_SCHEMA_KEY}.children`,
        helpText: $t('propertyConfig.8e8e24d6a0b40a2a'),
        label: $t('propertyConfig.8e8e24d6a0b40a2a'),
        controlType: "FIELD_CONFIGURATION",
        isBindProperty: false,
        isTriggerProperty: false,
        panelConfig,
        dependencies: ["schema", "childStylesheet"],
      },
    ],
    expandedByDefault: true,
  },
  {
    sectionName: $t('propertyConfig.127f2c5ccb941b6c'),
    children: [
      {
        propertyName: "title",
        label: $t('propertyConfig.3fbedea68e45b44a'),
        helpText: $t('propertyConfig.81f95fe5cf06816b'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('propertyConfig.b19553bde9ef93f5'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "isVisible",
        helpText: $t('propertyConfig.84b4713da59dd9dc'),
        label: $t('propertyConfig.e1c8b96c5b078bb1'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "useSourceData",
        helpText: $t('propertyConfig.81df2af9ca41eaf5'),
        label: $t('propertyConfig.cb140a70a76a6757'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('propertyConfig.76a4c0c73905b053'),
        controlType: "SWITCH",
        helpText: $t('propertyConfig.0605957850abb3d5'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "disabledWhenInvalid",
        helpText:
          $t('propertyConfig.74ff5038dc0131c6'),
        label: $t('propertyConfig.a2594a2dc6a95b6f'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "fixedFooter",
        helpText: $t('propertyConfig.a2bca9a9e904d10d'),
        label: $t('propertyConfig.a93ab9d551aa320d'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "scrollContents",
        helpText: $t('propertyConfig.002233f12712c487'),
        label: $t('propertyConfig.d580dc40e5bb830a'),
        controlType: "SWITCH",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "showReset",
        helpText: $t('propertyConfig.f9ba2db192d46709'),
        label: $t('propertyConfig.f7e4f0ff2ffead35'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "submitButtonLabel",
        helpText: $t('propertyConfig.596dce5e048740aa'),
        label: $t('propertyConfig.e8bc567374d4ff43'),
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "resetButtonLabel",
        helpText: $t('propertyConfig.ced8309d1034e772'),
        label: $t('propertyConfig.f76dad4f75753495'),
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
    expandedByDefault: false,
  },
  {
    sectionName: $t('propertyConfig.e9e03d24b6507a23'),
    children: [
      {
        propertyName: "onSubmit",
        helpText: $t('propertyConfig.aad2fbd054a862d7'),
        label: "onSubmit",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
    expandedByDefault: false,
  },
];

const generateButtonStyleControlsV2For = (prefix: string) => [
  {
    sectionName: $t('propertyConfig.127f2c5ccb941b6c'),
    collapsible: false,
    children: [
      {
        propertyName: `${prefix}.buttonColor`,
        helpText: $t('propertyConfig.53533753fb284591'),
        label: $t('propertyConfig.0b83062349d6919c'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: `${prefix}.buttonVariant`,
        label: $t('propertyConfig.9a630069ebec7ff0'),
        controlType: "ICON_TABS",
        defaultValue: ButtonVariantTypes.PRIMARY,
        fullWidth: true,
        helpText: $t('propertyConfig.092df7813f8ff00a'),
        options: [
          {
            label: $t('propertyConfig.0141cafef20fdf2a'),
            value: ButtonVariantTypes.PRIMARY,
          },
          {
            label: $t('propertyConfig.7e8efcb7bc58ef55'),
            value: ButtonVariantTypes.SECONDARY,
          },
          {
            label: $t('propertyConfig.7d891920a986fdc9'),
            value: ButtonVariantTypes.TERTIARY,
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              ButtonVariantTypes.PRIMARY,
              ButtonVariantTypes.SECONDARY,
              ButtonVariantTypes.TERTIARY,
            ],
            default: ButtonVariantTypes.PRIMARY,
          },
        },
      },
      {
        propertyName: `${prefix}.borderRadius`,
        label: $t('propertyConfig.70f897e8b627933e'),
        helpText: $t('propertyConfig.3497debbf7f7ea6e'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: `${prefix}.boxShadow`,
        label: $t('propertyConfig.71f0e50f653597b4'),
        helpText:
          $t('propertyConfig.e8ecc8c49f71ec07'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
        },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.adfb342f14f259ef'),
    collapsible: false,
    children: [
      {
        propertyName: `${prefix}.iconName`,
        label: $t('propertyConfig.adfb342f14f259ef'),
        helpText: $t('propertyConfig.2418dbf0fccda56e'),
        controlType: "ICON_SELECT",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        updateHook: (
          props: ButtonWidgetProps,
          propertyPath: string,
          propertyValue: string,
        ) => {
          const propertiesToUpdate = [{ propertyPath, propertyValue }];

          if (!props.iconAlign) {
            propertiesToUpdate.push({
              propertyPath: `${prefix}.iconAlign`,
              propertyValue: Alignment.LEFT,
            });
          }

          return propertiesToUpdate;
        },
        validation: {
          type: ValidationTypes.TEXT,
        },
      },
      {
        propertyName: `${prefix}.iconAlign`,
        label: $t('propertyConfig.947927d9ccebabae'),
        helpText: $t('propertyConfig.e177dd4ed634eb05'),
        controlType: "ICON_TABS",
        defaultValue: "left",
        fullWidth: false,
        options: [
          {
            startIcon: "skip-left-line",
            value: "left",
          },
          {
            startIcon: "skip-right-line",
            value: "right",
          },
        ],
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["center", "left", "right"],
          },
        },
      },
      {
        propertyName: `${prefix}.placement`,
        label: $t('propertyConfig.7a562682068ed6ce'),
        controlType: "ICON_TABS",
        fullWidth: true,
        helpText: $t('propertyConfig.fc306983dee91b63'),
        options: [
          {
            label: $t('propertyConfig.5b724744252ef165'),
            value: ButtonPlacementTypes.START,
          },
          {
            label: $t('propertyConfig.68d91c9d0d12e5a1'),
            value: ButtonPlacementTypes.BETWEEN,
          },
          {
            label: $t('propertyConfig.d97a7561e30d17d9'),
            value: ButtonPlacementTypes.CENTER,
          },
        ],
        defaultValue: ButtonPlacementTypes.CENTER,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              ButtonPlacementTypes.START,
              ButtonPlacementTypes.BETWEEN,
              ButtonPlacementTypes.CENTER,
            ],
            default: ButtonPlacementTypes.CENTER,
          },
        },
      },
    ],
  },
];

export const styleConfig = [
  {
    sectionName: $t('propertyConfig.928b63cb91829eaa'),
    children: [
      {
        propertyName: "backgroundColor",
        helpText: $t('propertyConfig.6436a5e224504589'),
        placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
        label: $t('propertyConfig.49cedb9419a24d07'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "borderColor",
        helpText: $t('propertyConfig.6436a5e224504589'),
        placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
        label: $t('propertyConfig.d21555c7dcc1485f'),
        controlType: "COLOR_PICKER",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.715d172840283e0b'),
    children: [
      {
        propertyName: "borderWidth",
        helpText: $t('propertyConfig.a5182fd0d47e0272'),
        label: $t('propertyConfig.8b6f766dc2a834f3'),
        placeholderText: $t('propertyConfig.3dbac89070b2a172'),
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.NUMBER },
      },
      {
        propertyName: "borderRadius",
        helpText: $t('propertyConfig.3a5bbb843e78114f'),
        label: $t('propertyConfig.70f897e8b627933e'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('propertyConfig.71f0e50f653597b4'),
        helpText:
          $t('propertyConfig.e8ecc8c49f71ec07'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
  {
    sectionName: $t('propertyConfig.2c418f4da3f2a1d4'),
    children: generateButtonStyleControlsV2For("submitButtonStyles"),
  },
  {
    sectionName: $t('propertyConfig.6a7580d9a608a89c'),
    children: generateButtonStyleControlsV2For("resetButtonStyles"),
    dependencies: ["showReset"],
    hidden: (props: JSONFormWidgetProps) => !props.showReset,
  },
];
