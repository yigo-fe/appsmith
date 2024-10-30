import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { LabelPosition } from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import equal from "fast-deep-equal/es6";
import { findIndex, isArray, isNil, isNumber, isString } from "lodash";
import React from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import { MinimumPopupWidthInPercentage } from "WidgetProvider/constants";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import SelectComponent from "../component";
import type { DropdownOption } from "../constants";
import {
  getOptionLabelValueExpressionPrefix,
  optionLabelValueExpressionSuffix,
} from "../constants";
import {
  defaultValueExpressionPrefix,
  getDefaultValueExpressionSuffix,
} from "../constants";
import derivedProperties from "./parseDerivedProperties";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
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
import { DynamicHeight } from "utils/WidgetFeatures";
import { WIDGET_TAGS, layoutConfigurations } from "constants/WidgetConstants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";

import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { FEATURE_FLAG } from "ee/entities/FeatureFlag";
import type { DynamicPath } from "utils/DynamicBindingUtils";

class SelectWidget extends BaseWidget<SelectWidgetProps, WidgetState> {
  constructor(props: SelectWidgetProps) {
    super(props);
  }
  static type = "SELECT_WIDGET";

  static getConfig() {
    return {
      name: $t('index.9505d3dd212f20ba'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.SUGGESTED_WIDGETS, WIDGET_TAGS.SELECT],
      needsMeta: true,
      searchTags: ["dropdown"],
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
      placeholderText: $t('index.05ef31de83d798f9'),
      labelText: $t('index.0edfffde6a4ff462'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      sourceData: JSON.stringify(
        [
          { name: $t('index.1156e7fecc4ef1dc'), code: "BLUE" },
          { name: $t('index.1535d4e2443def04'), code: "GREEN" },
          { name: $t('index.44656a6a077c5344'), code: "RED" },
        ],
        null,
        2,
      ),
      optionLabel: "name",
      optionValue: "code",
      serverSideFiltering: false,
      widgetName: $t('index.9505d3dd212f20ba'),
      defaultOptionValue: "GREEN",
      version: 1,
      isFilterable: true,
      isRequired: false,
      isDisabled: false,
      animateLoading: true,
      labelTextSize: "0.875rem",
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
      dynamicPropertyPathList: [{ key: "sourceData" }],
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "sourceData",
            propertyValue: propValueMap.data,
            isDynamicPropertyPath: true,
          },
        ];
      },
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
              minWidth: "120px",
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
        minWidth: { base: "120px" },
      },
    };
  }

  static getDependencyMap(): Record<string, string[]> {
    return {
      optionLabel: ["sourceData"],
      optionValue: ["sourceData"],
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.cfe7452962657f9f'),
      "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      filterText: {
        "!type": "string",
        "!doc": $t('index.40c8958a4fbfbf37'),
      },
      selectedOptionValue: {
        "!type": "string",
        "!doc": $t('index.95eb545dbd144217'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      selectedOptionLabel: {
        "!type": "string",
        "!doc": $t('index.acf98db472da5be6'),
        "!url": "https://docs.appsmith.com/widget-reference/dropdown",
      },
      isDisabled: "bool",
      isValid: "bool",
      isDirty: "bool",
      options: "[$__dropdownOption__$]",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.deb9ddd12bd38217'),
        children: [
          {
            helpText:
              $t('index.829a5094a88acc78'),
            propertyName: "sourceData",
            label: $t('index.9b70188749f6bab1'),
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
                  { name: $t('index.1156e7fecc4ef1dc'), code: "BLUE" },
                  { name: $t('index.1535d4e2443def04'), code: "GREEN" },
                  { name: $t('index.44656a6a077c5344'), code: "RED" },
                ],
                null,
                2,
              ),
            },
            isJSConvertible: true,
            placeholderText: '[{ "label": "label1", "value": "value1" }]',
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
              $t('index.924b1f46e6a84248'),
            propertyName: "optionLabel",
            label: $t('index.574b2fc543387c54'),
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
            helpText: $t('index.44335de815abc481'),
            propertyName: "optionValue",
            label: $t('index.9639a09c52c2c5aa'),
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
            helpText: $t('index.49993ea1f25f6997'),
            propertyName: "defaultOptionValue",
            label: $t('index.5a99fedc56dd8e27'),
            controlType: "WRAPPED_CODE_EDITOR",
            controlConfig: {
              wrapperCode: {
                prefix: defaultValueExpressionPrefix,
                suffix: getDefaultValueExpressionSuffix,
              },
            },
            placeholderText: '{ "label": "label1", "value": "value1" }',
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultOptionValueValidation,
                expected: {
                  type: 'value1 or { "label": "label1", "value": "value1" }',
                  example: `value1 | { "label": "label1", "value": "value1" }`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
            dependencies: ["serverSideFiltering", "options"],
            helperText: (
              <div className="leading-5" style={{ marginTop: "10px" }}>
                Make sure the default value is present in the source data to
                have it selected by default in the UI.
              </div>
            ),
          },
        ],
      },
      {
        sectionName: $t('index.0edfffde6a4ff462'),
        children: [
          {
            helpText: $t('index.5684812dfae8e86e'),
            propertyName: "labelText",
            label: $t('index.d29461114e090e6f'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.6fc795649327932f'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.7596afe276015191'),
            propertyName: "labelPosition",
            label: $t('index.49060d0a1f176a80'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              { label: $t('index.a818079adf8d3077'), value: LabelPosition.Left },
              { label: $t('index.2d8b95495b2b3b53'), value: LabelPosition.Top },
              { label: $t('index.14fe5dd7fd2cd578'), value: LabelPosition.Auto },
            ],
            hidden: isAutoLayout,
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.2d905ed6ef3487d5'),
            propertyName: "labelAlignment",
            label: $t('index.6b93108c568ee203'),
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
            hidden: (props: SelectWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.7bc676e3b08ba025'),
            propertyName: "labelWidth",
            label: $t('index.c2ef3187a01e7d7b'),
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
            hidden: (props: SelectWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.f1d13b3d9e7eb237'),
        children: [
          {
            propertyName: "isFilterable",
            label: $t('index.afc82e456223b89b'),
            helpText: $t('index.704888ff65ebc1f2'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.2b8aefe734b30bda'),
            propertyName: "serverSideFiltering",
            label: $t('index.6ec8f74a8b2c5d45'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.4b96644fba301996'),
            hidden: (props: SelectWidgetProps) => !props.serverSideFiltering,
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
        sectionName: $t('index.439c23bf5ccb95d8'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.eb2f67c8fcf5a3df'),
            helpText: $t('index.a47e34985ed9c0e1'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.1128bdaae5675688'),
        children: [
          {
            helpText: $t('index.0d9b40806e37f105'),
            propertyName: "labelTooltip",
            label: $t('index.2be8a8696a6ad988'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.2b5ab9b6b1ded276'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.01034932e8ac586c'),
            propertyName: "placeholderText",
            label: $t('index.ebe2d057b0da51cd'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.b2e6e9acd877f7ba'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.8f59c8fdce1cb469'),
            propertyName: "isVisible",
            label: $t('index.f0e22791d1e5f7db'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.1620e423f34d9c84'),
            helpText: $t('index.25adb0c8c24c63e5'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.84ace7b998898ded'),
            controlType: "SWITCH",
            helpText: $t('index.051f748c749f7aef'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "rtl",
            label: $t('index.b4c1afd8d162e795'),
            helpText: $t('index.5f8947141571483a'),
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
        sectionName: $t('index.1f1b260d32df6b06'),
        children: [
          {
            helpText: $t('index.7abf92842a4349a7'),
            propertyName: "onOptionChange",
            label: "onOptionChange",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.1010431004baccdb'),
            propertyName: "onDropdownOpen",
            label: "onDropdownOpen",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.f29fc13749361aa8'),
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
        sectionName: $t('index.ea9ad203c51fbf62'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.1419e1e8f2257424'),
            helpText: $t('index.ef07781b07fab3be'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.ee3519516cd4eec5'),
            helpText: $t('index.dedb1bfe08857fa4'),
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
            label: $t('index.3452b56c8927bbe7'),
            helpText: $t('index.2cb6a1076c13132f'),
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
        sectionName: $t('index.8ecb3dd53b8ac7f0'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.90aabb098593eaf3'),
            helpText:
              $t('index.b845df065bb2aedd'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.1bf748da18b8c0f6'),
            helpText:
              $t('index.7f2e9a2481ca8eab'),
            controlType: "BOX_SHADOW_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
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

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      value: "defaultOptionValue",
      label: "defaultOptionValue",
      filterText: "",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      value: undefined,
      label: undefined,
      filterText: "",
      isDirty: false,
    };
  }

  // https://github.com/appsmithorg/appsmith/issues/13664#issuecomment-1120814337
  static getDerivedPropertiesMap() {
    return {
      options: `{{(()=>{${derivedProperties.getOptions}})()}}`,
      isValid: `{{(()=>{${derivedProperties.getIsValid}})()}}`,
      selectedOptionValue: `{{(()=>{${derivedProperties.getSelectedOptionValue}})()}}`,

      selectedOptionLabel: `{{(()=>{${derivedProperties.getSelectedOptionLabel}})()}}`,
    };
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentDidUpdate(prevProps: SelectWidgetProps): void {
    // Reset isDirty to false if defaultOptionValue changes
    if (
      !equal(this.props.defaultOptionValue, prevProps.defaultOptionValue) &&
      this.props.isDirty
    ) {
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
        setOptions: {
          path: "options",
          type: "array",
        },
        setSelectedOption: {
          path: "defaultOptionValue",
          type: "string",
          accessor: "selectedOptionValue",
        },
      },
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isStringOrNumber = (value: any): value is string | number =>
    isString(value) || isNumber(value);

  getWidgetView() {
    const options = isArray(this.props.options) ? this.props.options : [];
    const isInvalid =
      "isValid" in this.props && !this.props.isValid && !!this.props.isDirty;
    const dropDownWidth =
      (MinimumPopupWidthInPercentage / 100) *
      (this.props.mainCanvasWidth ?? layoutConfigurations.MOBILE.maxWidth);

    const selectedIndex = findIndex(this.props.options, {
      value: this.props.selectedOptionValue,
    });
    const { componentHeight, componentWidth } = this.props;

    return (
      <SelectComponent
        accentColor={this.props.accentColor}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        compactMode={isCompactMode(componentHeight)}
        disabled={this.props.isDisabled}
        dropDownWidth={dropDownWidth}
        filterText={this.props.filterText}
        hasError={isInvalid}
        height={componentHeight}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isFilterable={this.props.isFilterable}
        isLoading={this.props.isLoading}
        isRequired={this.props.isRequired}
        isValid={this.props.isValid}
        label={this.props.selectedOptionLabel}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelText={this.props.labelText}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelTooltip={this.props.labelTooltip}
        labelWidth={this.props.labelComponentWidth}
        onDropdownClose={this.onDropdownClose}
        onDropdownOpen={this.onDropdownOpen}
        onFilterChange={this.onFilterChange}
        onOptionSelected={this.onOptionSelected}
        options={options}
        placeholder={this.props.placeholderText}
        resetFilterTextOnClose={!this.props.serverSideFiltering}
        rtl={this.props.rtl}
        selectedIndex={selectedIndex > -1 ? selectedIndex : undefined}
        serverSideFiltering={this.props.serverSideFiltering}
        value={this.props.selectedOptionValue}
        widgetId={this.props.widgetId}
        width={componentWidth}
      />
    );
  }

  onOptionSelected = (selectedOption: DropdownOption) => {
    let isChanged = true;

    // Check if the value has changed. If no option
    // selected till now, there is a change
    if (!isNil(this.props.selectedOptionValue)) {
      isChanged = this.props.selectedOptionValue !== selectedOption.value;
    }

    const { commitBatchMetaUpdates, pushBatchMetaUpdates } = this.props;

    if (isChanged) {
      if (!this.props.isDirty) {
        pushBatchMetaUpdates("isDirty", true);
      }

      pushBatchMetaUpdates("label", selectedOption.label ?? "");

      pushBatchMetaUpdates("value", selectedOption.value ?? "", {
        triggerPropertyName: "onOptionChange",
        dynamicString: this.props.onOptionChange,
        event: {
          type: EventType.ON_OPTION_CHANGE,
        },
      });
    }

    // When Label changes but value doesnt change, Applies to serverside Filtering
    if (!isChanged && this.props.selectedOptionLabel !== selectedOption.label) {
      pushBatchMetaUpdates("label", selectedOption.label ?? "");
    }

    commitBatchMetaUpdates();
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

export interface SelectWidgetProps extends WidgetProps {
  placeholderText?: string;
  labelText: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  selectedIndex?: number;
  options?: DropdownOption[];
  onOptionChange?: string;
  onDropdownOpen?: string;
  onDropdownClose?: string;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultOptionValue?: any;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label?: any;
  isRequired: boolean;
  isFilterable: boolean;
  selectedOptionLabel: string;
  serverSideFiltering: boolean;
  onFilterUpdate: string;
  isDirty?: boolean;
  filterText: string;
  labelComponentWidth?: number;
  rtl?: boolean;
}

export default SelectWidget;
