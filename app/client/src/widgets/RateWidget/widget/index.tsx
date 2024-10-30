import {$t} from "locale/index";
import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import RateComponent from "../component";
import type { RateSize } from "../constants";

import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";

import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { Colors } from "constants/Colors";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateDefaultRate(value: unknown, props: any, _: any) {
  try {
    let parsed = value;
    let isValid = false;

    if (_.isString(value as string)) {
      if (/^\d+\.?\d*$/.test(value as string)) {
        parsed = Number(value);
        isValid = true;
      } else {
        if (value === "") {
          return {
            isValid: true,
            parsed: 0,
          };
        }

        return {
          isValid: false,
          parsed: 0,
          messages: [
            {
              name: "TypeError",
              message: $t('index.364f93188b97499c'),
            },
          ],
        };
      }
    }

    if (Number.isFinite(parsed)) {
      isValid = true;
    }

    // default rate must be less than max count
    if (!_.isNaN(props.maxCount) && Number(value) > Number(props.maxCount)) {
      return {
        isValid: false,
        parsed,
        messages: [
          {
            name: "RangeError",
            message: $t('index.afdf4b27c6f3a9ea'),
          },
        ],
      };
    }

    // default rate can be a decimal only if Allow half property is true
    if (!props.isAllowHalf && !Number.isInteger(parsed)) {
      return {
        isValid: false,
        parsed,
        messages: [
          {
            name: "ValidationError",
            message: $t('index.9d2cd954966167c9'),
          },
        ],
      };
    }

    return { isValid, parsed };
  } catch (e) {
    return {
      isValid: false,
      parsed: value,
      messages: [
        {
          name: "ValidationError",
          message: $t('index.f12c6027ea5f82a5'),
        },
      ],
    };
  }
}

class RateWidget extends BaseWidget<RateWidgetProps, WidgetState> {
  static type = "RATE_WIDGET";

  static getConfig() {
    return {
      name: $t('index.1eb29e169754dcd4'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.CONTENT],
      needsMeta: true,
      searchTags: ["stars", "rate"],
    };
  }

  static getDefaults() {
    return {
      rows: 4,
      columns: 20,
      animateLoading: true,
      maxCount: 5,
      defaultRate: 3,
      activeColor: Colors.RATE_ACTIVE,
      inactiveColor: Colors.ALTO2,
      size: "LARGE",
      isRequired: false,
      isAllowHalf: false,
      isDisabled: false,
      isReadOnly: false,
      tooltips: [$t('index.7b602049d4b93ec7'), $t('index.35ae7a9501b555d4'), $t('index.ab6c6cf996bb32cb'), "Good", $t('index.544ab50f3e027605')],
      widgetName: $t('index.1eb29e169754dcd4'),
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 1,
        active: true,
      },
    };
  }

  static getAutoLayoutConfig() {
    return {
      disabledPropsDefaults: {
        size: "LARGE",
      },
      defaults: {
        columns: 7.272727,
        rows: 4,
      },
      autoDimension: {
        width: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: (props: RateWidgetProps) => {
            let maxCount = props.maxCount;

            if (typeof maxCount !== "number")
              // TODO: Fix this the next time the file is edited
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              maxCount = parseInt(props.maxCount as any, 10);

            return {
              // 21 is the size of a star, 5 is the margin between stars
              minWidth: `${maxCount * 21 + (maxCount + 1) * 5}px`,
              minHeight: "40px",
            };
          },
        },
      ],
      disableResizeHandles: {
        horizontal: true,
        vertical: true,
      },
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: (props: RateWidgetProps) => {
        let maxCount = props.maxCount;

        if (typeof maxCount !== "number")
          // TODO: Fix this the next time the file is edited
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          maxCount = parseInt(props.maxCount as any, 10);

        return {
          maxHeight: {},
          maxWidth: {},
          minHeight: { base: "40px" },
          minWidth: { base: `${maxCount * 21 + (maxCount + 1) * 5}px` },
        };
      },
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "onRateChanged",
            propertyValue: propValueMap.run,
            isDynamicPropertyPath: true,
          },
        ];
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc": $t('index.f1db6c2f696b36f0'),
      "!url": "https://docs.appsmith.com/widget-reference/rate",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      value: "number",
      maxCount: "number",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.99fefac4ecf443b9'),
        children: [
          {
            propertyName: "maxCount",
            helpText: $t('index.10a5ea1feb69940e'),
            label: $t('index.41ac949b61a3d685'),
            controlType: "INPUT_TEXT",
            placeholderText: "5",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.NUMBER,
              params: { natural: true },
            },
          },
          {
            propertyName: "defaultRate",
            helpText: $t('index.db8a8b975dc18df3'),
            label: $t('index.3cbfaffac816ca62'),
            controlType: "INPUT_TEXT",
            placeholderText: "2.5",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.FUNCTION,
              params: {
                fn: validateDefaultRate,
                expected: {
                  type: "number",
                  example: 5,
                  autocompleteDataType: AutocompleteDataType.NUMBER,
                },
              },
            },
            dependencies: ["maxCount", "isAllowHalf"],
          },
          {
            propertyName: "tooltips",
            helpText: $t('index.c6659846dd73e7fd'),
            label: $t('index.ec866f7981fabc3f'),
            controlType: "INPUT_TEXT",
            placeholderText: '[$t('index.35ae7a9501b555d4'), $t('index.ab6c6cf996bb32cb'), "Good"]',
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: { children: { type: ValidationTypes.TEXT } },
            },
          },
        ],
      },
      {
        sectionName: $t('index.f216fde561b6ef27'),
        children: [
          {
            propertyName: "isAllowHalf",
            helpText: $t('index.4944ee9a4da8e12e'),
            label: $t('index.beb612fbca21510f'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            helpText: $t('index.bc0f804f1ff8e1bd'),
            label: $t('index.c0ffdd51bf5a405d'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            helpText: $t('index.4daf7374a39031b9'),
            label: $t('index.93e7fb91d7fa7776'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isReadOnly",
            helpText: $t('index.8a1ceb7c7553aca9'),
            label: $t('index.ee6db7a9a5edafc7'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.ab73a86419412c4f'),
            controlType: "SWITCH",
            helpText: $t('index.ca632eaf64941118'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.023d2d4d5ecb388e'),
        children: [
          {
            helpText: $t('index.0714be69adf283f1'),
            propertyName: "onRateChanged",
            label: "onChange",
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
        sectionName: $t('index.f216fde561b6ef27'),
        children: [
          {
            propertyName: "size",
            label: $t('index.56e9c46a9399c785'),
            helpText: $t('index.75102d474f534f81'),
            controlType: "ICON_TABS",
            defaultValue: "LARGE",
            fullWidth: true,
            hidden: isAutoLayout,
            options: [
              {
                label: $t('index.2e74106622a09108'),
                value: "SMALL",
              },
              {
                label: $t('index.70fb022ffbafa9c3'),
                value: "MEDIUM",
              },
              {
                label: $t('index.2b11291c7eb808a6'),
                value: "LARGE",
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
          },
        ],
      },
      {
        sectionName: $t('index.13696e11531421e3'),
        children: [
          {
            propertyName: "activeColor",
            label: $t('index.6e3180ae0de3faaa'),
            helpText: $t('index.38718246ff73967c'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "inactiveColor",
            label: $t('index.39d12c2ee40f91aa'),
            helpText: $t('index.8ed0bcff442137fa'),
            controlType: "COLOR_PICKER",
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
      rate: "defaultRate",
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{ this.rate }}`,
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      rate: undefined,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      activeColor: "{{appsmith.theme.colors.primaryColor}}",
    };
  }

  valueChangedHandler = (value: number) => {
    this.props.updateWidgetMetaProperty("rate", value, {
      triggerPropertyName: "onRateChanged",
      dynamicString: this.props.onRateChanged,
      event: {
        type: EventType.ON_RATE_CHANGED,
      },
    });
  };

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
        setValue: {
          path: "defaultRate",
          type: "number",
          accessor: "value",
        },
      },
    };
  }

  getWidgetView() {
    return (
      (this.props.rate || this.props.rate === 0) && (
        <RateComponent
          activeColor={this.props.activeColor}
          inactiveColor={this.props.inactiveColor}
          isAllowHalf={this.props.isAllowHalf}
          isDisabled={this.props.isDisabled}
          isLoading={this.props.isLoading}
          key={this.props.widgetId}
          maxCount={this.props.maxCount}
          minHeight={this.props.minHeight}
          onValueChanged={this.valueChangedHandler}
          readonly={this.props.isReadOnly}
          size={this.props.size}
          tooltips={this.props.tooltips}
          value={this.props.rate}
          widgetId={this.props.widgetId}
        />
      )
    );
  }
}

export interface RateWidgetProps extends WidgetProps {
  maxCount: number;
  size: RateSize;
  defaultRate?: number;
  rate?: number;
  activeColor?: string;
  inactiveColor?: string;
  isAllowHalf?: boolean;
  onRateChanged?: string;
  tooltips?: Array<string>;
  isReadOnly?: boolean;
}

export default RateWidget;
