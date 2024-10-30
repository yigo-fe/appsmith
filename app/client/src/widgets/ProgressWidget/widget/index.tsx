import {$t} from "locale/index";
import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import { Colors } from "constants/Colors";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import ProgressComponent from "../component";
import { ProgressType, ProgressVariant } from "../constants";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
class ProgressWidget extends BaseWidget<ProgressWidgetProps, WidgetState> {
  static type = "PROGRESS_WIDGET";

  static getConfig() {
    return {
      name: $t('index.be5e12a8ae46d355'), // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.CONTENT],
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      searchTags: ["percent"],
    };
  }

  static getDefaults() {
    return {
      widgetName: $t('index.be5e12a8ae46d355'),
      rows: 4,
      columns: 28,
      fillColor: Colors.GREEN,
      isIndeterminate: false,
      showResult: false,
      counterClosewise: false,
      isVisible: true,
      steps: 1,
      progressType: ProgressType.LINEAR,
      progress: 50,
      version: 1,
      responsiveBehavior: ResponsiveBehavior.Fill,
    };
  }

  static getAutoLayoutConfig() {
    return {
      disabledPropsDefaults: {
        progressType: ProgressType.LINEAR,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "120px",
              minHeight: "40px",
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
        minHeight: { base: "40px" },
        minWidth: { base: "120px" },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.a86b078926a58596'),
        children: [
          {
            helpText:
              $t('index.5eb294f7bb7a52c4'),
            propertyName: "isIndeterminate",
            label: $t('index.3986f79363d33d77'),
            controlType: "SWITCH",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.8275470eb197f59c'),
            propertyName: "progressType",
            label: $t('index.891b4f967de0356d'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              {
                label: $t('index.85b24c1b03d5a00e'),
                value: ProgressType.CIRCULAR,
              },
              {
                label: $t('index.e422c187115a68b9'),
                value: ProgressType.LINEAR,
              },
            ],
            defaultValue: ProgressType.LINEAR,
            isBindProperty: false,
            isTriggerProperty: false,
            hidden: isAutoLayout,
          },
          {
            helpText: $t('index.71e81dbfe804ac53'),
            propertyName: "progress",
            label: $t('index.be5e12a8ae46d355'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.e34429f6df1316a0'),
            isBindProperty: true,
            isTriggerProperty: false,
            defaultValue: 50,
            validation: {
              type: ValidationTypes.NUMBER,
              params: { min: 0, max: 100, default: 50 },
            },
            hidden: (props: ProgressWidgetProps) => props.isIndeterminate,
            dependencies: ["isIndeterminate"],
          },
        ],
      },
      {
        sectionName: $t('index.064453b1c408ecee'),
        children: [
          {
            helpText: $t('index.513487298d5e695e'),
            propertyName: "steps",
            label: $t('index.ba2d6eade8cbab7d'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.5b78f218e77727d1'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.NUMBER,
              params: {
                min: 1,
                max: 100,
                default: 1,
                natural: true,
                passThroughOnZero: false,
              },
            },
            hidden: (props: ProgressWidgetProps) => props.isIndeterminate,
            dependencies: ["isIndeterminate"],
          },
          {
            helpText: $t('index.8c194d878c9dff79'),
            propertyName: "isVisible",
            label: $t('index.c34a752217052903'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "counterClockwise",
            helpText: $t('index.187fe764be9dcb3b'),
            label: "Counterclockwise",
            controlType: "SWITCH",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: (props: ProgressWidgetProps) =>
              props.progressType === ProgressType.LINEAR ||
              props.isIndeterminate,
            dependencies: ["isIndeterminate", "progressType"],
          },
          {
            helpText:
              $t('index.39f5a57e3553fa80'),
            propertyName: "showResult",
            label: $t('index.e4a3e226baa948fe'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
            hidden: (props: ProgressWidgetProps) => props.isIndeterminate,
            dependencies: ["isIndeterminate"],
          },
        ],
      },
    ];
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.b2d66f26b14bbf98'),
      "!url": "https://docs.appsmith.com/widget-reference/progress",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      progress: "number",
    };
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.fc0dc86ab730c4a3'),
        children: [
          {
            helpText: $t('index.40fb6b000755c411'),
            propertyName: "fillColor",
            label: $t('index.f7cb9f2d89f9f2f4'),
            controlType: "COLOR_PICKER",
            defaultColor: Colors.GREEN,
            isBindProperty: true,
            isJSConvertible: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
          },
        ],
      },
    ];
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      fillColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setProgress: {
          path: "progress",
          type: "number",
        },
      },
    };
  }

  getWidgetView() {
    const {
      borderRadius,
      counterClockwise,
      fillColor,
      isIndeterminate,
      progress,
      progressType,
      showResult,
      steps,
    } = this.props;
    const { componentHeight, componentWidth } = this.props;
    const isScaleY = componentHeight > componentWidth;

    return (
      <ProgressComponent
        borderRadius={borderRadius}
        counterClockwise={counterClockwise}
        fillColor={fillColor}
        isScaleY={isScaleY}
        showResult={showResult}
        steps={steps}
        type={progressType}
        value={progress}
        variant={
          isIndeterminate
            ? ProgressVariant.INDETERMINATE
            : ProgressVariant.DETERMINATE
        }
      />
    );
  }
}

export interface ProgressWidgetProps extends WidgetProps {
  isIndeterminate: boolean;
  progressType: ProgressType;
  progress: number;
  steps: number;
  showResult: boolean;
  counterClockwise: boolean;
  fillColor: string;
}

export default ProgressWidget;
