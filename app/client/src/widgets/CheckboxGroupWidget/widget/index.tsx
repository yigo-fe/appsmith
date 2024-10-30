import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import {
  CheckboxGroupAlignmentTypes,
  LabelPosition,
} from "components/constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { TextSize } from "constants/WidgetConstants";
import type { ValidationResponse } from "constants/WidgetValidation";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { compact, xor } from "lodash";
import { default as React } from "react";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import CheckboxGroupComponent from "../component";
import type { OptionProps, SelectAllState } from "../constants";
import { SelectAllStates } from "../constants";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { FlexVerticalAlignment } from "layoutSystems/common/utils/constants";

export function defaultSelectedValuesValidation(
  value: unknown,
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
): ValidationResponse {
  let values: string[] = [];
  const options: OptionProps[] = props.options || [];

  if (typeof value === "string") {
    try {
      values = JSON.parse(value);
      values = values.filter((value: string) =>
        options.some((option: OptionProps) => option.value === value),
      );

      if (!Array.isArray(values)) {
        throw new Error();
      }
    } catch {
      values = value.length ? value.split(",") : [];

      if (values.length > 0) {
        values = values.map((_v: string) => _v.trim());
      }
    }
  }

  if (Array.isArray(value)) {
    values = Array.from(new Set(value));
  }

  return {
    isValid: true,
    parsed: values,
  };
}

class CheckboxGroupWidget extends BaseWidget<
  CheckboxGroupWidgetProps,
  WidgetState
> {
  static type = "CHECKBOX_GROUP_WIDGET";

  static getConfig() {
    return {
      name: $t('index.1dbb66dc0f9d6c5b'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.TOGGLES],
      needsMeta: true,
    };
  }

  static getDefaults() {
    return {
      rows: 6,
      columns: 23,
      animateLoading: true,
      labelTextSize: "0.875rem",
      options: [
        { label: $t('index.44cda9842bf75c52'), value: "BLUE" },
        { label: $t('index.ba47ee9818d94ad5'), value: "GREEN" },
        { label: $t('index.bd664c876c5deca6'), value: "RED" },
      ],
      defaultSelectedValues: ["BLUE"],
      isDisabled: false,
      isInline: true,
      isRequired: false,
      isVisible: true,
      labelText: $t('index.edf9b796d9363751'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      widgetName: "CheckboxGroup",
      version: 2,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 3,
        active: true,
      },
    };
  }

  static getAutoLayoutConfig() {
    return {
      defaults: {
        columns: 14,
        rows: 7,
      },
      disabledPropsDefaults: {
        labelPosition: LabelPosition.Top,
      },
      autoDimension: {
        height: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "240px",
              minHeight: "70px",
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
        minHeight: { base: "70px" },
        minWidth: { base: "240px" },
      },
    };
  }

  static getDependencyMap(): Record<string, string[]> {
    return {
      defaultSelectedValues: ["options"],
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.969ac434fac9bb4f'),
      "!url": "https://docs.appsmith.com/widget-reference/checkbox-group",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      isDisabled: "bool",
      isValid: "bool",
      options: "[$__dropdownOption__$]",
      selectedValues: "[string]",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.6c81b487c38d043c'),
        children: [
          {
            helpText: $t('index.7d6a5b6c4f661710'),
            propertyName: "options",
            label: $t('index.c3de38402707efa3'),
            controlType: "OPTION_INPUT",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: {
                default: [],
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
                        },
                      },
                    ],
                  },
                },
              },
            },
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
          {
            helpText: $t('index.dfc3623eb194e993'),
            propertyName: "defaultSelectedValues",
            label: $t('index.cbc6524db95098a6'),
            placeholderText: '["apple", "orange"]',
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: defaultSelectedValuesValidation,
                expected: {
                  type: "String or Array<string>",
                  example: `apple | ["apple", "orange"]`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.edf9b796d9363751'),
        children: [
          {
            helpText: $t('index.d22fc428292d0c67'),
            propertyName: "labelText",
            label: $t('index.ea0ce90f7d75d2e3'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.864409573b26cbaf'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.4be47c734f6cc74e'),
            propertyName: "labelPosition",
            label: $t('index.54df6391997a4398'),
            controlType: "ICON_TABS",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              { label: $t('index.b0fe1f3c3735907f'), value: LabelPosition.Auto },
              { label: $t('index.a5b0175a884fe84f'), value: LabelPosition.Left },
              { label: $t('index.063a0f17ae0b968a'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.53cf094282f8574f'),
            propertyName: "labelAlignment",
            label: $t('index.ac06a0b6fc193575'),
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
            hidden: (props: CheckboxGroupWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.4d0fd8ecc55c1b21'),
            propertyName: "labelWidth",
            label: $t('index.05f6b4042baa78fc'),
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
            hidden: (props: CheckboxGroupWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.fe4328151ff5aa3e'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.70ee4944560967a2'),
            helpText: $t('index.349535c315889fe0'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
            },
          },
        ],
      },
      {
        sectionName: $t('index.b081d4eff407faa4'),
        children: [
          {
            helpText: $t('index.51a45d678891b671'),
            propertyName: "labelTooltip",
            label: $t('index.48080000aa8c755f'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.76ed48244dd63330'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            label: $t('index.c13162cb349e3c74'),
            helpText: $t('index.423e0459a3e6fd4a'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.97347b82d00926fd'),
            controlType: "SWITCH",
            helpText: $t('index.e502f5d31c64d956'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          {
            propertyName: "isInline",
            label: $t('index.8f3e76aefcca5810'),
            controlType: "SWITCH",
            helpText: $t('index.53383722025dcf9d'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          {
            propertyName: "isSelectAll",
            label: $t('index.1eab8e9b7fc9cb91'),
            controlType: "SWITCH",
            helpText: $t('index.24359c37740c0030'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.d5d4cfce7e62a1d9'),
            controlType: "SWITCH",
            helpText: $t('index.c3315da50b7a5ab4'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.07efa61d400821d1'),
        children: [
          {
            helpText: $t('index.5ca01f39ec8d0a38'),
            propertyName: "onSelectionChange",
            label: "onSelectionChange",
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
        sectionName: $t('index.6d0aabd6d6e0c981'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.f2bbc0cd3fcdf256'),
            helpText: $t('index.0948a5180bab6528'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.ab37ba76c04945cd'),
            helpText: $t('index.f083e0fa3f996de1'),
            controlType: "DROP_DOWN",
            defaultValue: "0.875rem",
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
            label: $t('index.949fed5f5588ce06'),
            helpText: $t('index.31df797b3aff78be'),
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
        sectionName: $t('index.b081d4eff407faa4'),
        children: [
          {
            propertyName: "optionAlignment",
            label: $t('index.ac06a0b6fc193575'),
            controlType: "DROP_DOWN",
            helpText: $t('index.7e1bfcab149a0381'),
            options: [
              {
                label: $t('index.115eedd409765dab'),
                value: CheckboxGroupAlignmentTypes.NONE,
              },
              {
                label: $t('index.69dc8638ef9c27ca'),
                value: CheckboxGroupAlignmentTypes.START,
              },
              {
                label: $t('index.3303ea7b06048153'),
                value: CheckboxGroupAlignmentTypes.END,
              },
              {
                label: $t('index.b607ace6b2e53e7f'),
                value: CheckboxGroupAlignmentTypes.CENTER,
              },
              {
                label: $t('index.4812ef05da0ee374'),
                value: CheckboxGroupAlignmentTypes.SPACE_BETWEEN,
              },
              {
                label: $t('index.4b32a9523fec4799'),
                value: CheckboxGroupAlignmentTypes.SPACE_AROUND,
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [
                  CheckboxGroupAlignmentTypes.NONE,
                  CheckboxGroupAlignmentTypes.START,
                  CheckboxGroupAlignmentTypes.END,
                  CheckboxGroupAlignmentTypes.CENTER,
                  CheckboxGroupAlignmentTypes.SPACE_BETWEEN,
                  CheckboxGroupAlignmentTypes.SPACE_AROUND,
                ],
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.662d8d4c322746c8'),
        children: [
          {
            propertyName: "accentColor",
            helpText: $t('index.496c5cb7a9b86f03'),
            label: $t('index.3f961c155a1ca515'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.97616f55f8b6d03f'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.93b93114c3a0b75b'),
            helpText:
              $t('index.cf6ffd51c04624c2'),
            controlType: "BORDER_RADIUS_OPTIONS",

            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
    ];
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      selectedValues: "defaultSelectedValues",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      selectedValues: undefined,
      isDirty: false,
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      isValid: `{{ this.isRequired ? !!this.selectedValues.length : true }}`,
      value: `{{this.selectedValues}}`,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    };
  }

  componentDidUpdate(prevProps: CheckboxGroupWidgetProps) {
    const validSelectedValues = prevProps.selectedValues.filter(
      (value: string) =>
        prevProps.options.some((option) => option.value === value),
    );

    if (validSelectedValues.length !== prevProps.selectedValues.length) {
      this.props.updateWidgetMetaProperty(
        "selectedValues",
        validSelectedValues,
      );
    }

    // Reset isDirty to false whenever defaultSelectedValues changes
    if (
      xor(this.props.defaultSelectedValues, prevProps.defaultSelectedValues)
        .length > 0 &&
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
        setSelectedOptions: {
          path: "defaultSelectedValues",
          type: "array",
          accessor: "selectedValues",
        },
      },
    };
  }

  getWidgetView() {
    const { componentHeight } = this.props;

    return (
      <CheckboxGroupComponent
        accentColor={this.props.accentColor}
        borderRadius={this.props.borderRadius}
        compactMode={isCompactMode(componentHeight)}
        isDisabled={this.props.isDisabled}
        isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
        isInline={this.props.isInline}
        isRequired={this.props.isRequired}
        isSelectAll={this.props.isSelectAll}
        isValid={this.props.isValid}
        key={this.props.widgetId}
        labelAlignment={this.props.labelAlignment}
        labelPosition={this.props.labelPosition}
        labelStyle={this.props.labelStyle}
        labelText={this.props.labelText}
        labelTextColor={this.props.labelTextColor}
        labelTextSize={this.props.labelTextSize}
        labelTooltip={this.props.labelTooltip}
        labelWidth={this.props.labelComponentWidth}
        minWidth={this.props.minWidth}
        onChange={this.handleCheckboxChange}
        onSelectAllChange={this.handleSelectAllChange}
        optionAlignment={this.props.optionAlignment}
        options={compact(this.props.options)}
        selectedValues={this.props.selectedValues || []}
        widgetId={this.props.widgetId}
      />
    );
  }

  private handleCheckboxChange = (value: string) => {
    return (event: React.FormEvent<HTMLElement>) => {
      let { selectedValues = [] } = this.props;
      const isChecked = (event.target as HTMLInputElement).checked;

      if (isChecked) {
        selectedValues = [...selectedValues, value];
      } else {
        selectedValues = selectedValues.filter(
          (item: string) => item !== value,
        );
      }

      // Update isDirty to true whenever value changes
      if (!this.props.isDirty) {
        this.props.updateWidgetMetaProperty("isDirty", true);
      }

      this.props.updateWidgetMetaProperty("selectedValues", selectedValues, {
        triggerPropertyName: "onSelectionChange",
        dynamicString: this.props.onSelectionChange,
        event: {
          type: EventType.ON_CHECKBOX_GROUP_SELECTION_CHANGE,
        },
      });
    };
  };

  private handleSelectAllChange = (state: SelectAllState) => {
    return () => {
      let { selectedValues = [] } = this.props;

      switch (state) {
        case SelectAllStates.UNCHECKED:
          selectedValues = this.props.options.map((option) => option.value);
          break;

        default:
          selectedValues = [];
          break;
      }

      if (!this.props.isDirty) {
        this.props.updateWidgetMetaProperty("isDirty", true);
      }

      this.props.updateWidgetMetaProperty("selectedValues", selectedValues, {
        triggerPropertyName: "onSelectionChange",
        dynamicString: this.props.onSelectionChange,
        event: {
          type: EventType.ON_CHECKBOX_GROUP_SELECTION_CHANGE,
        },
      });
    };
  };
}

export interface CheckboxGroupWidgetProps extends WidgetProps {
  options: OptionProps[];
  isInline: boolean;
  isSelectAll?: boolean;
  isRequired?: boolean;
  isDisabled: boolean;
  isValid?: boolean;
  onCheckChanged?: string;
  optionAlignment?: string;
  labelText?: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  accentColor: string;
  borderRadius: string;
  labelComponentWidth?: number;
}

export default CheckboxGroupWidget;
