import {$t} from "locale/index";
import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import DividerComponent from "../component";
import { ValidationTypes } from "constants/WidgetValidation";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import type { SetterConfig } from "entities/AppTheming";
import { Colors } from "constants/Colors";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import { WIDGET_TAGS } from "constants/WidgetConstants";

class DividerWidget extends BaseWidget<DividerWidgetProps, WidgetState> {
  static type = "DIVIDER_WIDGET";

  static getConfig() {
    return {
      name: $t('index.25a70644184f0318'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.LAYOUT],
      searchTags: ["line"],
    };
  }

  static getDefaults() {
    return {
      rows: 4,
      columns: 20,
      widgetName: $t('index.25a70644184f0318'),
      orientation: "horizontal",
      capType: "nc",
      capSide: 0,
      strokeStyle: "solid",
      dividerColor: Colors.GRAY,
      thickness: 2,
      isVisible: true,
      version: 1,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
    };
  }

  static getAutoLayoutConfig() {
    return {
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "280px",
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
        minWidth: { base: "280px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc": $t('index.088ef8728951a253'),
      "!url": "https://docs.appsmith.com/widget-reference/divider",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      orientation: "string",
      capType: "string",
      capSide: "number",
      strokeStyle: "string",
      dividerColor: "string",
      thickness: "number",
    };
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.64d1aa6844f43d98'),
        children: [
          {
            helpText: $t('index.332c37657e4d11dd'),
            propertyName: "isVisible",
            label: $t('index.1570cac23df22a7c'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.8acdf10f4a4b76be'),
            controlType: "SWITCH",
            helpText: $t('index.25e37b46f7349656'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.64d1aa6844f43d98'),
        children: [
          {
            helpText: $t('index.4cbab9421ea81559'),
            propertyName: "orientation",
            label: $t('index.79c85943105680e9'),
            controlType: "ICON_TABS",
            defaultValue: "horizontal",
            fullWidth: true,
            options: [
              {
                label: $t('index.a0f996bf7f3f5cb1'),
                value: "horizontal",
              },
              {
                label: $t('index.1b192713a77ba0a8'),
                value: "vertical",
              },
            ],
            hidden: isAutoLayout,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.a19a7a3a8cf203bc'),
        children: [
          {
            helpText: $t('index.ad32a9109ba8aa5c'),
            propertyName: "dividerColor",
            label: $t('index.c573869eaed48249'),
            controlType: "COLOR_PICKER",
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
            helpText: $t('index.c25c93606835446f'),
            propertyName: "strokeStyle",
            label: $t('index.cd777581a30a38c5'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: $t('index.d4733dd9117bea70'),
                value: "solid",
                icon: "cap-solid",
              },
              {
                label: $t('index.31e7b719e2e788fa'),
                value: "dashed",
                icon: "line-dashed",
              },
              {
                label: $t('index.9d0ef7f86eb8c63e'),
                value: "dotted",
                icon: "line-dotted",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.960d05fcb41e46d5'),
            propertyName: "thickness",
            label: $t('index.780d4246a8a3b9be'),
            controlType: "INPUT_TEXT",
            placeholderText: "5",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.NUMBER,
              params: { min: 0, default: 0 },
            },
          },
        ],
      },
      {
        sectionName: "Cap",
        children: [
          {
            helpText: $t('index.22a0c7c8180ef5d1'),
            propertyName: "capType",
            label: "Cap",
            controlType: "DROP_DOWN",
            isJSConvertible: true,
            options: [
              {
                label: $t('index.b0da4562739ed491'),
                value: "nc",
                icon: "cap-solid",
              },
              {
                label: $t('index.57bf2aa67d4d0a3b'),
                value: "arrow",
                icon: "arrow-forward",
              },
              {
                label: $t('index.e15cd9fd9901d784'),
                value: "dot",
                icon: "cap-dot",
              },
            ],
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["nc", "arrow", "dot"],
                required: true,
                default: "nc",
              },
            },
          },
          {
            helpText:
              $t('index.9b6851c7e19c94ae'),
            propertyName: "capSide",
            label: "Cap position",
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              {
                startIcon: "contract-left-line",
                value: -1,
              },
              {
                startIcon: "column-freeze",
                value: 0,
                width: 48,
              },
              {
                startIcon: "contract-right-line",
                value: 1,
              },
            ],
            defaultValue: 0,
            isBindProperty: false,
            isTriggerProperty: false,
          },
        ],
      },
    ];
  }

  getWidgetView() {
    return (
      <DividerComponent
        capSide={this.props.capSide}
        capType={this.props.capType}
        dividerColor={this.props.dividerColor}
        orientation={this.props.orientation}
        strokeStyle={this.props.strokeStyle}
        thickness={this.props.thickness}
      />
    );
  }
}

export interface DividerWidgetProps extends WidgetProps {
  orientation: string;
  capType: string;
  capSide?: number;
  strokeStyle?: "solid" | "dashed" | "dotted";
  dividerColor?: string;
  thickness?: number;
}

export default DividerWidget;
