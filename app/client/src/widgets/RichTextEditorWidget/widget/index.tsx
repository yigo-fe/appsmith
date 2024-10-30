import {$t} from "locale/index";
import { Alignment } from "@blueprintjs/core";
import { LabelPosition } from "components/constants";
import Skeleton from "components/utils/Skeleton";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import type { TextSize } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import React, { lazy, Suspense } from "react";
import showdown from "showdown";
import { retryPromise } from "utils/AppsmithUtils";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import {
  isAutoHeightEnabledForWidget,
  DefaultAutocompleteDefinitions,
  isCompactMode,
} from "widgets/WidgetUtils";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";

import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import {
  FlexVerticalAlignment,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";
import { DynamicHeight } from "utils/WidgetFeatures";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";

export enum RTEFormats {
  MARKDOWN = "markdown",
  HTML = "html",
}
const RichTextEditorComponent = lazy(async () =>
  retryPromise(
    async () => import(/* webpackChunkName: "rte" */ "../component"),
  ),
);

const converter = new showdown.Converter();

class RichTextEditorWidget extends BaseWidget<
  RichTextEditorWidgetProps,
  WidgetState
> {
  static type = "RICH_TEXT_EDITOR_WIDGET";

  static getConfig() {
    return {
      name: $t('index.95f0728c7c393476'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.INPUTS],
      needsMeta: true,
      searchTags: ["input", "rte"],
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 3,
        defaultValue: DynamicHeight.FIXED,
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      defaultText: "This is the initial <b>content</b> of the editor",
      rows: 20,
      columns: 24,
      animateLoading: true,
      isDisabled: false,
      isVisible: true,
      isRequired: false,
      widgetName: "RichTextEditor",
      isDefaultClickDisabled: true,
      inputType: "html",
      labelText: $t('index.97cda723ff22eab9'),
      labelPosition: LabelPosition.Top,
      labelAlignment: Alignment.LEFT,
      labelWidth: 5,
      version: 1,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "defaultText",
            propertyValue: propValueMap.data,
            isDynamicPropertyPath: true,
          },
        ];
      },
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
              minHeight: "300px",
            };
          },
        },
      ],
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
      widgetSize: {
        maxHeight: {},
        maxWidth: {},
        minHeight: { base: "300px" },
        minWidth: { base: "280px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      text: "string",
      isDisabled: "string",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.a0d3eebf496ff688'),
        children: [
          {
            propertyName: "inputType",
            helpText:
              $t('index.19173136c0cb4e21'),
            label: $t('index.f85add42436af8a0'),
            controlType: "ICON_TABS",
            defaultValue: "html",
            fullWidth: true,
            options: [
              {
                label: "Markdown",
                value: "markdown",
              },
              {
                label: "HTML",
                value: "html",
              },
            ],
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "defaultText",
            helpText:
              $t('index.afa8d381a582db10'),
            label: $t('index.1a5309febf957a20'),
            controlType: "INPUT_TEXT",
            placeholderText: "<b>Hello World</b>",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.97cda723ff22eab9'),
        children: [
          {
            helpText: $t('index.b63994ec9d2a429b'),
            propertyName: "labelText",
            label: $t('index.94ed9a533ac1f6ec'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.689d258c0ca7da0b'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.7d22d36d400da269'),
            propertyName: "labelPosition",
            label: $t('index.aa08f4236d4aa521'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              { label: $t('index.343299eeb92a3b24'), value: LabelPosition.Auto },
              { label: $t('index.5020b10b72d0a66a'), value: LabelPosition.Left },
              { label: $t('index.383835904a26e2ad'), value: LabelPosition.Top },
            ],
            defaultValue: LabelPosition.Top,
            isBindProperty: false,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            helpText: $t('index.d1ddef6a16b27cd8'),
            propertyName: "labelAlignment",
            label: $t('index.771131e3190cb0e2'),
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
            hidden: (props: RichTextEditorWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
          {
            helpText:
              $t('index.ade1d9e9b058f888'),
            propertyName: "labelWidth",
            label: $t('index.6822403e20e1765c'),
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
            hidden: (props: RichTextEditorWidgetProps) =>
              props.labelPosition !== LabelPosition.Left,
            dependencies: ["labelPosition"],
          },
        ],
      },
      {
        sectionName: $t('index.e6372dc329d99df1'),
        children: [
          {
            propertyName: "isRequired",
            label: $t('index.ce8b0d8f24195ba7'),
            helpText: $t('index.e55c127aacc8ee47'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.ec92b33710b1c82f'),
        children: [
          {
            helpText: $t('index.4794202de2525ac4'),
            propertyName: "labelTooltip",
            label: $t('index.47548c9bbbbaff2d'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.ec94914fd86084c5'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            label: $t('index.734f65dfb49d281f'),
            helpText: $t('index.f34008cab48678fc'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.b3819e0d3fe6430b'),
            helpText: $t('index.336df2c9c7e04751'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.7535ec15ed216f0f'),
            controlType: "SWITCH",
            helpText: $t('index.2c5122681661bf06'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isToolbarHidden",
            label: $t('index.c2302616a286b115'),
            helpText: $t('index.424729ffa95aabd0'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },

      {
        sectionName: $t('index.3bcc16bd47ac4689'),
        children: [
          {
            helpText: $t('index.fee4117dd05c5867'),
            propertyName: "onTextChange",
            label: "onTextChanged",
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
        sectionName: $t('index.1f1597f6406c10d4'),
        children: [
          {
            propertyName: "labelTextColor",
            label: $t('index.93490d791972f956'),
            helpText: $t('index.1f43dd4522b6bd1c'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "labelTextSize",
            label: $t('index.13d917524140d40d'),
            helpText: $t('index.f72aa04eb779e26f'),
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
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "labelStyle",
            label: $t('index.b93160ed5af32934'),
            helpText: $t('index.0633807cf5c39ef4'),
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
        sectionName: $t('index.f9d3148bc4e1c33f'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.6a8d7b7e0ebba86d'),
            helpText:
              $t('index.990dffbea62aabcf'),
            controlType: "BORDER_RADIUS_OPTIONS",

            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.457023fee06f205e'),
            helpText:
              $t('index.bd786c09d8347867'),
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
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      text: undefined,
      isDirty: false,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      text: "defaultText",
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{this.text}}`,
      isValid: `{{ this.isRequired ? this.text && this.text.length : true }}`,
    };
  }

  componentDidUpdate(prevProps: RichTextEditorWidgetProps): void {
    if (this.props.defaultText !== prevProps.defaultText) {
      if (this.props.isDirty) {
        this.props.updateWidgetMetaProperty("isDirty", false);
      }
    }
  }

  onValueChange = (text: string) => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    this.props.updateWidgetMetaProperty("text", text, {
      triggerPropertyName: "onTextChange",
      dynamicString: this.props.onTextChange,
      event: {
        type: EventType.ON_TEXT_CHANGE,
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
        setRequired: {
          path: "isRequired",
          type: "boolean",
        },
      },
    };
  }

  getWidgetView() {
    let value = this.props.text ?? "";

    if (this.props.inputType === RTEFormats.MARKDOWN) {
      value = converter.makeHtml(value);
    }

    const { componentHeight } = this.props;

    return (
      <Suspense fallback={<Skeleton />}>
        <RichTextEditorComponent
          borderRadius={this.props.borderRadius}
          boxShadow={this.props.boxShadow}
          compactMode={isCompactMode(componentHeight)}
          isDisabled={this.props.isDisabled}
          isDynamicHeightEnabled={isAutoHeightEnabledForWidget(this.props)}
          isMarkdown={this.props.inputType === RTEFormats.MARKDOWN}
          isToolbarHidden={!!this.props.isToolbarHidden}
          isValid={this.props.isValid}
          isVisible={this.props.isVisible}
          key={this.props.widgetId}
          labelAlignment={this.props.labelAlignment}
          labelPosition={this.props.labelPosition}
          labelStyle={this.props.labelStyle}
          labelText={this.props.labelText}
          labelTextColor={this.props.labelTextColor}
          labelTextSize={this.props.labelTextSize}
          labelTooltip={this.props.labelTooltip}
          labelWidth={this.props.labelComponentWidth}
          onValueChange={this.onValueChange}
          placeholder={this.props.placeholder}
          value={value}
          widgetId={this.props.widgetId}
        />
      </Suspense>
    );
  }
}

export interface RichTextEditorWidgetProps extends WidgetProps {
  defaultText?: string;
  text: string;
  inputType: string;
  placeholder?: string;
  onTextChange?: string;
  isDisabled: boolean;
  isVisible?: boolean;
  isRequired?: boolean;
  isToolbarHidden?: boolean;
  borderRadius: string;
  boxShadow?: string;
  labelText: string;
  labelPosition?: LabelPosition;
  labelAlignment?: Alignment;
  labelWidth?: number;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  isDirty: boolean;
  labelComponentWidth?: number;
}

export default RichTextEditorWidget;
