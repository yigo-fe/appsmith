import {$t} from "locale/index";
import * as React from "react";

import type {
  AutocompletionDefinitions,
  WidgetCallout,
} from "WidgetProvider/constants";
import { Colors } from "constants/Colors";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { Stylesheet } from "entities/AppTheming";
import { buildDeprecationWidgetMessage } from "pages/Editor/utils";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type { CircularProgressComponentProps } from "../component";
import CircularProgressComponent from "../component";
import IconSVG from "../icon.svg";

interface CircularProgressWidgetProps
  extends WidgetProps,
    CircularProgressComponentProps {
  borderRadius?: string;
}

class CircularProgressWidget extends BaseWidget<
  CircularProgressWidgetProps,
  WidgetState
> {
  static type = "CIRCULAR_PROGRESS_WIDGET";

  static getConfig() {
    return {
      name: $t('index.d977812da730bf31'),
      hideCard: true,
      isDeprecated: true,
      replacement: "PROGRESS_WIDGET",
      iconSVG: IconSVG,
      tags: [WIDGET_TAGS.CONTENT],
    };
  }

  static getDefaults() {
    return {
      counterClockWise: false,
      fillColor: Colors.GREEN,
      isVisible: true,
      progress: 65,
      showResult: true,

      rows: 17,
      columns: 16,
      widgetName: "CircularProgress",
      shouldScroll: false,
      shouldTruncate: false,
      version: 1,
      animateLoading: true,
    };
  }

  static getPropertyPaneConfig() {
    return [
      {
        sectionName: $t('index.82935ea61b0c0447'),
        children: [
          {
            propertyName: "progress",
            helpText: $t('index.b33246f154e9489c'),
            label: $t('index.458c9be58f9acfec'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.2d5b049378d62d0f'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
          },
          {
            propertyName: "counterClockwise",
            helpText: $t('index.24565fa17d617337'),
            label: "CounterClockWise",
            controlType: "SWITCH",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "showResult",
            helpText: $t('index.1789d19c05a1d621'),
            label: $t('index.96301a7dcdf635e2'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            helpText: $t('index.502231dc3f9219e1'),
            label: $t('index.74e2977127f58d50'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.e55aa61cf3c13bb6'),
        children: [
          {
            propertyName: "fillColor",
            label: $t('index.6abc6579d1fd29fb'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^((?![<|{{]).+){0,1}/,
                expected: {
                  type: "string (HTML color name or HEX value)",
                  example: `red | #9C0D38`,
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
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

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc": $t('index.cf5b4c08f8b46b48'),
      "!url": "https://docs.appsmith.com/widget-reference/circular-progress",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      progress: "number",
    };
  }

  static getMethods() {
    return {
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message: buildDeprecationWidgetMessage(
              CircularProgressWidget.getConfig().name,
            ),
          },
        ];
      },
    };
  }

  getWidgetView() {
    return (
      <CircularProgressComponent
        counterClockwise={this.props.counterClockwise}
        fillColor={this.props.fillColor}
        progress={this.props.progress}
        showResult={this.props.showResult}
      />
    );
  }
}

export default CircularProgressWidget;
