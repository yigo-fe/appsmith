import {$t} from "locale/index";
import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";

import ProgressBarComponent from "../component";

import type {
  AutocompletionDefinitions,
  WidgetCallout,
} from "WidgetProvider/constants";
import { Colors } from "constants/Colors";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { Stylesheet } from "entities/AppTheming";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { buildDeprecationWidgetMessage } from "pages/Editor/utils";
import { BarType } from "../constants";
import IconSVG from "../icon.svg";

class ProgressBarWidget extends BaseWidget<
  ProgressBarWidgetProps,
  WidgetState
> {
  static type = "PROGRESSBAR_WIDGET";

  static getConfig() {
    return {
      name: $t('index.4cfe658655a9aae3'), // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      hideCard: true,
      isDeprecated: true,
      replacement: "PROGRESS_WIDGET",
      iconSVG: IconSVG,
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      tags: [WIDGET_TAGS.CONTENT],
    };
  }

  static getDefaults() {
    return {
      widgetName: "ProgressBar",
      rows: 4,
      columns: 28,
      isVisible: true,
      showResult: false,
      barType: BarType.INDETERMINATE,
      progress: 50,
      steps: 1,
      version: 1,
      responsiveBehavior: ResponsiveBehavior.Fill,
    };
  }

  static getMethods() {
    return {
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message: buildDeprecationWidgetMessage(
              ProgressBarWidget.getConfig().name,
            ),
          },
        ];
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc": $t('index.3b4fea51dea29c79'),
      "!url": "https://docs.appsmith.com/widget-reference/progressbar",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      progress: "number",
    };
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.b598e7353192a357'),
        children: [
          {
            helpText: $t('index.19b5824b1a77de7f'),
            propertyName: "barType",
            label: $t('index.a59f2c91e0aab0d1'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: $t('index.307406576790745f'),
                value: BarType.INDETERMINATE,
              },
              {
                label: $t('index.c0c371fc41ac64fa'),
                value: BarType.DETERMINATE,
              },
            ],
            defaultValue: BarType.INDETERMINATE,
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            helpText: $t('index.a11b031aa2eb536f'),
            propertyName: "progress",
            label: $t('index.189841c851303ba3'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.c9f9b1729ceb09c6'),
            isBindProperty: true,
            isTriggerProperty: false,
            defaultValue: 50,
            validation: {
              type: ValidationTypes.NUMBER,
              params: { min: 0, max: 100, default: 50 },
            },
          },
          {
            helpText: $t('index.b0564c85365cfe45'),
            propertyName: "steps",
            label: $t('index.e36451d8ef955ce1'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.2750ec35be15adda'),
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
            hidden: (props: ProgressBarWidgetProps) => {
              return props.barType !== BarType.DETERMINATE;
            },
            dependencies: ["barType"],
          },
          {
            helpText: $t('index.7dc2d3ec48da1dee'),
            propertyName: "showResult",
            label: $t('index.cdd4029d14e6f2ff'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.0392611151f9c976'),
            propertyName: "isVisible",
            label: $t('index.71a83d2e4feeebd6'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.d2237bedbd5a887f'),
        children: [
          {
            helpText: $t('index.9b5bf34de06ffebb'),
            propertyName: "fillColor",
            label: $t('index.1f779a4cb6094549'),
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
          {
            propertyName: "borderRadius",
            label: $t('index.3891fb2db135d57c'),
            helpText:
              $t('index.7b981259f7ba72fb'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isBindProperty: true,
            isJSConvertible: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
        ],
      },
    ];
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

  static getStylesheetConfig(): Stylesheet {
    return {
      fillColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    };
  }

  getWidgetView() {
    return (
      <ProgressBarComponent
        barType={this.props.barType}
        borderRadius={this.props.borderRadius}
        fillColor={this.props.fillColor}
        progress={this.props.progress}
        showResult={this.props.showResult}
        steps={this.props.steps}
      />
    );
  }
}

export interface ProgressBarWidgetProps extends WidgetProps {
  progress?: number;
  showResult: boolean;
  fillColor: string;
  barType: BarType;
  steps: number;
  borderRadius?: string;
}

export default ProgressBarWidget;
