import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { Layers } from "constants/Layers";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import equal from "fast-deep-equal/es6";
import { isArray, isFinite, isString, xorWith } from "lodash";
import type { DraftValueType, LabelInValueType } from "rc-select/lib/Select";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { MinimumPopupWidthInPercentage } from "WidgetProvider/constants";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import MultiSelectComponent from "../component";
import derivedProperties from "./parseDerivedProperties";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import {
  defaultValueExpressionPrefix,
  getDefaultValueExpressionSuffix,
  getOptionLabelValueExpressionPrefix,
  optionLabelValueExpressionSuffix,
} from "../constants";
import {
  defaultOptionValueValidation,
  labelKeyValidation,
  getLabelValueAdditionalAutocompleteData,
  getLabelValueKeyOptions,
  valueKeyValidation,
} from "./propertyUtils";
import type {
  WidgetQueryConfig,
  WidgetQueryGenerationFormConfig,
} from "WidgetQueryGenerators/types";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { DynamicHeight } from "utils/WidgetFeatures";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS, layoutConfigurations } from "constants/WidgetConstants";
import { FEATURE_FLAG } from "ee/entities/FeatureFlag";
import type { DynamicPath } from "utils/DynamicBindingUtils";

class MultiSelectWidget extends BaseWidget<
  MultiSelectWidgetProps,
  WidgetState
> {
  static type = "MULTI_SELECT_WIDGET_V2";

  static getConfig() {
    return {
      name: "MultiSelect",
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.SELECT],
      needsMeta: true,
      searchTags: ["dropdown", "tags"],
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 4,
        defaultValue: DynamicHeight.FIXED,
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      rows: 7,
      columns: 20,
      animateLoading: true,
      labelText: $t('index.0a85b812995c4483'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      labelTextSize: "0.875rem",
      sourceData: [
        { name: $t('index.98d133a37f8afe48'), code: "BLUE" },
        { name: $t('index.b180c288a59a5aba'), code: "GREEN" },
        { name: $t('index.214d9a69fa0bfb45'), code: "RED" },
      ],
      optionLabel: "name",
      optionValue: "code",
      widgetName: "MultiSelect",
      isFilterable: true,
      serverSideFiltering: false,
      defaultOptionValue: ["GREEN", "RED"],
      version: 1,
      isRequired: false,
      isDisabled: false,
      placeholderText: $t('index.5f68ed56bcd49c87'),
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
    };
  }

  static getAutoLayoutConfig() {
    return {
      disabledPropsDefaults: {
        labelPosition: LabelPosition.Top,
        labelTextSize: "0.875rem",
      },
      defaults: {
        rows: 6.6,
      },
      autoDimension: {
        height: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "160px",
            };
          },
        },
      ],
      disableResizeHandles: {
        vertical: true,
      },
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: {
        maxHeight: {},
        maxWidth: {},
        minHeight: {},
        minWidth: { base: "160px" },
      },
    };
  }

  static getMethods() {
    return {
      getQueryGenerationConfig(widget: WidgetProps) {
        return {
          select: {
            where: `${widget.widgetName}.filterText`,
          },
        };
      },
      getPropertyUpdatesForQueryBinding(
        queryConfig: WidgetQueryConfig,
        widget: WidgetProps,
        formConfig: WidgetQueryGenerationFormConfig,
      ) {
        let modify;

        const dynamicPropertyPathList: DynamicPath[] = [
          ...(widget.dynamicPropertyPathList || []),
        ];

        if (queryConfig.select) {
          modify = {
            sourceData: queryConfig.select.data,
            optionLabel: formConfig.aliases.find((d) => d.name === "label")
              ?.alias,
            optionValue: formConfig.aliases.find((d) => d.name === "value")
              ?.alias,
            defaultOptionValue: "",
            serverSideFiltering: true,
            onFilterUpdate: queryConfig.select.run,
          };

          dynamicPropertyPathList.push({ key: "sourceData" });
        }

        return {
          modify,
          dynamicUpdates: {
            dynamicPropertyPathList,
          },
        };
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.681f23aa27a07134'),
      "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      filterText: {
        "!type": "string",
        "!doc": $t('index.35806482b5f44bd1'),
      },
      selectedOptionValues: {
        "!type": "[string]",
        "!doc": $t('index.2798b0cc8640a209'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      selectedOptionLabels: {
        "!type": "[string]",
        "!doc":
          $t('index.511ed48be9e702ca'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      isDisabled: "bool",
      isValid: "bool",
      isDirty: "bool",
      options: "[$__dropdownOption__$]",
    };
  }

  static getDependencyMap(): Record<string, string[]> {
    return {
      optionValue: ["sourceData"],
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.6a1444c3589b96f1'),
        children: [
          {
            helpText:
              $t('index.3e706355c0cb40e7'),
            propertyName: "sourceData",
            label: $t('index.e025ed69fae94b30'),
            controlType: "ONE_CLICK_BINDING_CONTROL",
            controlConfig: {
              aliases: [
                {
                  name: "label",
                  isSearcheable: true,
                  isRequired: true,
                },
                {
                  name: "value",
                  isRequired: true,
                },
              ],
              sampleData: JSON.stringify(
                [
                  { name: $t('index.98d133a37f8afe48'), code: "BLUE" },
                  { name: $t('index.b180c288a59a5aba'), code: "GREEN" },
                  { name: $t('index.214d9a69fa0bfb45'), code: "RED" },
                ],
                null,
                2,
              ),
            },
            isJSConvertible: true,
            placeholderText: '[{ "label": "Option1", "value": "Option2" }]',
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: {
                children: {
                  type: ValidationTypes.OBJECT,
                  params: {
                    required: true,
                  },
                },
              },
            },
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
          {
            helpText:
              $t('index.2da85f34bbb706e8'),
            propertyName: "optionLabel",
            label: $t('index.c3b58efc65bf3e3a'),
            controlType: "DROP_DOWN",
            customJSControl: "WRAPPED_CODE_EDITOR",
            controlConfig: {
              wrapperCode: {
                prefix: getOptionLabelValueExpressionPrefix,
                suffix: optionLabelValueExpressionSuffix,
              },
            },
            placeholderText: "",
            isBindProperty: true,
            isTriggerProperty: false,
            isJSConvertible: true,
            evaluatedDependencies: ["sourceData"],
            options: getLabelValueKeyOptions,
            alwaysShowSelected: true,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: labelKeyValidation,
                expected: {
                  type: "String or Array<string>",
                  example: `color | ["blue", "green"]`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            additionalAutoComplete: getLabelValueAdditionalAutocompleteData,
          },
          {
            helpText: $t('index.27e142fea871140b'),
            propertyName: "optionValue",
            label: $t('index.e0f5e5d8747a2fd9'),
            controlType: "DROP_DOWN",
            customJSControl: "WRAPPED_CODE_EDITOR",
            controlConfig: {
              wrapperCode: {
                prefix: getOptionLabelValueExpressionPrefix,
                suffix: optionLabelValueExpressionSuffix,
              },
            },
            placeholderText: "",
            isBindProperty: true,
            isTriggerProperty: false,
            isJSConvertible: true,
            evaluatedDependencies: ["sourceData"],
            options: getLabelValueKeyOptions,
            alwaysShowSelected: true,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: valueKeyValidation,
                expected: {
                  type: "String or Array<string | number | boolean>",
                  example: `color | [1, "orange"]`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            additionalAutoComplete: getLabelValueAdditionalAutocompleteData,
          },
          {
            helpText: $t('index.cbff4a0490c68ce3'),
            propertyName: "defaultOptionValue",
            label: $t('index.83228ef90ebf9746'),
            controlType: "WRAPPED_CODE_EDITOR",
            controlConfig: {
              wrapperCode: {
                prefix: defaultValueExpressionPrefix,
                suffix: getDefaultValueExpressionSuffix,
              },
            },
            placeholderText: "[GREEN]",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultOptionValueValidation,
                expected: {
                  type: "Array of values",
                  example: ` "option1, option2" | ['option1', 'option2'] | [{ "label": "label1", "value": "value1" }]`,
                  autocompleteDataType: AutocompleteDataType.ARRAY,
                },
              },
            },
            dependencies: ["serverSideFiltering", "options"],
            helperText: (
              <div className="leading-5" style={{ marginTop: "10px" }}>
                Make sure the default value(s) are present in the source data to
                have it selected by default in the UI.
              </div>
            ),
          },
        ],
      },
      {
        sectionName: $t('index.0a85b812995c4483'),
        children: [
          {
            helpText: $t('index.219fe4c5c765a66e'),
            propertyName: "labelText",
            label: $t('index.5b4ac021752d81c1'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.2565268dde983858'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.04e398f97913f2d4'),
            propertyName: "labelPosition",
            label: $t('index.f65114f230a45802'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.4805a715609555f7'), value: LabelPosition.Auto },
              { label: $t('index.e31ebdbbad84f10d'), value: LabelPosition.Left },
              { label: $t('index.1ff9a89569273465'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.b1f4680690d1a892'),
            propertyName: "labelAlignment",
            label: $t('index.94e0bb05082c45c2'),
            controlType: "LABEL_ALIGNMENT_OPTIONS",
            fullWidth: false,
            options: [
              {
                startIcon: "align-left",
                value: Alignment.LEFT,
              },
              {
                startIcon: "align-right",
                value: Alignment.RIGHT,
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            hidden: (props: MultiSelectWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.c07e5d132030d993'),
            propertyName: "labelWidth",
            label: $t('index.da70c9433b70602d'),
            controlType: "NUMERIC_INPUT",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            min: 0,
            validation: {
              type: ValidationTypes.NUMBER,
              params: {
                natural: true,
              },
            },
            hidden: (props: MultiSelectWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.6182b56039fe9ba8'),
        children: [
          {
            propertyName: "isFilterable",
            label: $t('index.28228c5e6028c8a2'),
            helpText: $t('index.bec119bbc6a673e4'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.b35bdfc2e962d1eb'),
            propertyName: "serverSideFiltering",
            label: $t('index.b4c26d20a87e1ec3'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.a03de0922b25cf9a'),
            hidden: (props: MultiSelectWidgetProps) =>
              !props.serverSideFiltering,
            dependencies: ["serverSideFiltering"],
            propertyName: "onFilterUpdate",
            label: "onFilterUpdate",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
      {
        sectionName: $t('index.7478c2072ed562ec'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.8df547b8f6998f87'),
            helpText: $t('index.d5636c8c9603a2a5'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.e792b3de70f93073'),
        children: [
          {
            helpText: $t('index.7e8835846a34d4df'),
            propertyName: "labelTooltip",
            label: $t('index.a80d63838b6b6c6f'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.8debe0b0c219e008'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.dc091a172b6ed5d3'),
            propertyName: "placeholderText",
            label: $t('index.09012821dc54798b'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.95d829b3cd95ad4a'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.b2e746c962e6683d'),
            propertyName: "isVisible",
            label: $t('index.64eec63d8a5b7258'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.d5037a209ab3cac8'),
            helpText: $t('index.f6fae0fa9f88314f'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.3c5d10a509f7e23f'),
            controlType: "SWITCH",
            helpText: $t('index.747bf3a6f8162cbb'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText:
              $t('index.5aa07c255ccb748d'),
            propertyName: "allowSelectAll",
            label: $t('index.596b6e79f6124352'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "rtl",
            label: $t('index.ad791be7d5620d51'),
            helpText: $t('index.04520107729d7e70'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: () => {
              return !super.getFeatureFlag(
                FEATURE_FLAG.license_widget_rtl_support_enabled,
              );
            },
          },
        ],
      },
      {
        sectionName: $t('index.db3bc222fa438550'),
        children: [
          {
            helpText: $t('index.d898e3f759f5aa2d'),
            propertyName: "onOptionChange",
            label: "onOptionChange",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.0513926bc0e3cb32'),
            propertyName: "onDropdownOpen",
            label: "onDropdownOpen",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.65bfaab53405ed91'),
            propertyName: "onDropdownClose",
            label: "onDropdownClose",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.a6d6cb727e77cc37'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.7590c77194a86906'),
            helpText: $t('index.01e276d827779d76'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.0839b9203488b42e'),
            helpText: $t('index.758befc8a89d368f'),
            controlType: "DROP_DOWN",
            defaultValue: "0.875rem",
            hidden: isAutoLayout,
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
                label: "2xl",
                value: "3rem",
                subText: "3rem",
              },
              {
                label: "3xl",
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
            label: $t('index.8bdcd97f0fc28cbf'),
            helpText: $t('index.a4a1ae41c1e71016'),
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
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.a6c5ed2f535f9843'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.b831de134ee83920'),
            helpText:
              $t('index.325410e39203a90b'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isBindProperty: true,
            isJSConvertible: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.a6c8ac58f246de13'),
            helpText:
              $t('index.7d33baa0b95ec5cb'),
            controlType: "BOX_SHADOW_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "accentColor",
            label: $t('index.583b5e46847699a1'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
            invisible: true,
          },
        ],
      },
    ];
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  static getDerivedPropertiesMap() {
    return {
      options: `{{(()=>{${derivedProperties.getOptions}})()}}`,
      value: `{{this.selectedOptionValues}}`,
      isValid: `{{(()=>{${derivedProperties.getIsValid}})()}}`,
      selectedOptionValues: `{{(()=>{${derivedProperties.getSelectedOptionValues}})()}}`,
      selectedOptionLabels: `{{(()=>{${derivedProperties.getSelectedOptionLabels}})()}}`,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedOptions: "defaultOptionValue",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedOptions: undefined,
      filterText: "",
      isDirty: false,
    };
  }

  componentDidUpdate(prevProps: MultiSelectWidgetProps): void {
    // Check if defaultOptionValue is string
    let isStringArray = false;

    if (
      this.props.defaultOptionValue &&
      this.props.defaultOptionValue.some(
        // TODO: Fix this the next time the file is edited
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value: any) => isString(value) || isFinite(value),
      )
    ) {
      isStringArray = true;
    }

    const hasChanges = isStringArray
      ? xorWith(
          this.props.defaultOptionValue as string[],
          prevProps.defaultOptionValue as string[],
          equal,
        ).length > 0
      : xorWith(
          this.props.defaultOptionValue as OptionValue[],
          prevProps.defaultOptionValue as OptionValue[],
          equal,
        ).length > 0;

    if (hasChanges && this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", false);
    }
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setDisabled: {
          path: "isDisabled",
          type: "boolean",
        },
        setRequired: {
          path: "isRequired",
          type: "boolean",
        },
        setSelectedOptions: {
          path: "defaultOptionValue",
          type: "array",
          accessor: "selectedOptionValues",
        },
      },
    };
  }

  getWidgetView() {
    const options = isArray(this.props.options) ? this.props.options : [];
    const minDropDownWidth =
      (MinimumPopupWidthInPercentage / 100) *
      (this.props.mainCanvasWidth ?? layoutConfigurations.MOBILE.maxWidth);
    const { componentHeight, componentWidth } = this.props;
    const values = this.mergeLabelAndValue();
    const isInvalid =
      "isValid" in this.props && !this.props.isValid && !!this.props.isDirty;

    return (
      <MultiSelectComponent
        accentColor={this.props.accentColor}
        allowSelectAll={this.props.allowSelectAll}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        compactMode={isCompactMode(componentHeight)}
        disabled={this.props.isDisabled ?? false}
        dropDownWidth={minDropDownWidth}
        dropdownStyle={{
          zIndex: Layers.dropdownModalWidget,
        }}
        filterText={this.props.filterText}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isFilterable={this.props.isFilterable}
        isValid={!isInvalid}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelText={this.props.labelText}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelTooltip={this.props.labelTooltip}
        labelWidth={this.props.labelComponentWidth}
        loading={this.props.isLoading}
        onChange={this.onOptionChange}
        onDropdownClose={this.onDropdownClose}
        onDropdownOpen={this.onDropdownOpen}
        onFilterChange={this.onFilterChange}
        options={options}
        placeholder={this.props.placeholderText as string}
        renderMode={this.props.renderMode}
        rtl={this.props.rtl}
        serverSideFiltering={this.props.serverSideFiltering}
        value={values}
        widgetId={this.props.widgetId}
        width={componentWidth}
      />
    );
  }

  onOptionChange = (value: DraftValueType) => {
    this.props.updateWidgetMetaProperty("selectedOptions", value, {
      triggerPropertyName: "onOptionChange",
      dynamicString: this.props.onOptionChange,
      event: {
        type: EventType.ON_OPTION_CHANGE,
      },
    });

    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }
  };

  // { label , value } is needed in the widget
  mergeLabelAndValue = (): LabelInValueType[] => {
    if (!this.props.selectedOptionLabels || !this.props.selectedOptionValues) {
      return [];
    }

    const labels = [...this.props.selectedOptionLabels];
    const values = [...this.props.selectedOptionValues];

    return values.map((value, index) => ({
      value,
      label: labels[index],
    }));
  };

  onFilterChange = (value: string) => {
    this.props.updateWidgetMetaProperty("filterText", value);

    if (this.props.onFilterUpdate && this.props.serverSideFiltering) {
      super.executeAction({
        triggerPropertyName: "onFilterUpdate",
        dynamicString: this.props.onFilterUpdate,
        event: {
          type: EventType.ON_FILTER_UPDATE,
        },
      });
    }
  };

  onDropdownOpen = () => {
    if (this.props.onDropdownOpen) {
      super.executeAction({
        triggerPropertyName: "onDropdownOpen",
        dynamicString: this.props.onDropdownOpen,
        event: {
          type: EventType.ON_DROPDOWN_OPEN,
        },
      });
    }
  };

  onDropdownClose = () => {
    if (this.props.onDropdownClose) {
      super.executeAction({
        triggerPropertyName: "onDropdownClose",
        dynamicString: this.props.onDropdownClose,
        event: {
          type: EventType.ON_DROPDOWN_CLOSE,
        },
      });
    }
  };
}
export interface OptionValue {
  label: string;
  value: string;
}
export interface DropdownOption extends OptionValue {
  disabled?: boolean;
}

export interface MultiSelectWidgetProps extends WidgetProps {
  placeholderText?: string;
  selectedIndex?: number;
  selectedIndexArr?: number[];
  selectedOption: DropdownOption;
  options?: DropdownOption[];
  onOptionChange: string;
  onFilterChange: string;
  onDropdownOpen?: string;
  onDropdownClose?: string;
  defaultOptionValue: string[] | OptionValue[];
  isRequired: boolean;
  isLoading: boolean;
  selectedOptions: LabelInValueType[];
  filterText: string;
  selectedOptionValues?: string[];
  selectedOptionLabels?: string[];
  serverSideFiltering: boolean;
  onFilterUpdate: string;
  allowSelectAll?: boolean;
  isFilterable: boolean;
  labelText: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  isDirty?: boolean;
  labelComponentWidth?: number;
  rtl?: boolean;
}

export default MultiSelectWidget;
