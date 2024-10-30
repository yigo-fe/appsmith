import {$t} from "locale/index";
import type { ReactNode } from "react";
import React from "react";
import type { TextSize } from "constants/WidgetConstants";
import { countOccurrences } from "workers/Evaluation/helpers";
import { ValidationTypes } from "constants/WidgetValidation";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import WidgetStyleContainer from "components/designSystems/appsmith/WidgetStyleContainer";
import type { Color } from "constants/Colors";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { pick } from "lodash";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import type { ContainerStyle } from "widgets/ContainerWidget/component";
import type { TextAlign } from "../component";
import TextComponent from "../component";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { DEFAULT_FONT_SIZE, WIDGET_TAGS } from "constants/WidgetConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { OverflowTypes } from "../constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { DynamicHeight } from "utils/WidgetFeatures";
import { BlueprintOperationTypes } from "WidgetProvider/constants";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import { get } from "lodash";
import type { DynamicPath } from "utils/DynamicBindingUtils";
import { isDynamicValue } from "utils/DynamicBindingUtils";

const MAX_HTML_PARSING_LENGTH = 1000;

class TextWidget extends BaseWidget<TextWidgetProps, WidgetState> {
  static type = "TEXT_WIDGET";

  static getConfig() {
    return {
      name: $t('index.bf2ffdf120aded59'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.SUGGESTED_WIDGETS, WIDGET_TAGS.CONTENT],
      searchTags: ["typography", "paragraph", "label"],
    };
  }

  static getFeatures() {
    return {
      dynamicHeight: {
        sectionIndex: 0,
        active: true,
      },
    };
  }

  static getDefaults() {
    return {
      text: "Hello {{appsmith.user.name || appsmith.user.email}}",
      fontSize: DEFAULT_FONT_SIZE,
      fontStyle: "BOLD",
      textAlign: "LEFT",
      textColor: "#231F20",
      rows: 4,
      columns: 16,
      widgetName: $t('index.bf2ffdf120aded59'),
      shouldTruncate: false,
      overflow: OverflowTypes.NONE,
      version: 1,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
      blueprint: {
        operations: [
          {
            type: BlueprintOperationTypes.MODIFY_PROPS,
            fn: (widget: WidgetProps & { children?: WidgetProps[] }) => {
              if (!isDynamicValue(widget.text)) {
                return [];
              }

              const dynamicBindingPathList: DynamicPath[] = [
                ...get(widget, "dynamicBindingPathList", []),
              ];

              dynamicBindingPathList.push({
                key: "text",
              });

              const updatePropertyMap = [
                {
                  widgetId: widget.widgetId,
                  propertyName: "dynamicBindingPathList",
                  propertyValue: dynamicBindingPathList,
                },
              ];

              return updatePropertyMap;
            },
          },
        ],
      },
    };
  }

  static getAutoLayoutConfig() {
    return {
      autoDimension: {
        height: true,
      },
      disabledPropsDefaults: {
        overflow: OverflowTypes.NONE,
        dynamicHeight: DynamicHeight.AUTO_HEIGHT,
      },
      defaults: {
        columns: 4,
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

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "text",
            propertyValue: propValueMap.data,
            isDynamicPropertyPath: true,
          },
        ];
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.e00bbba440295dea'),
        children: [
          {
            propertyName: "text",
            helpText: $t('index.fef9f2770f20e541'),
            label: $t('index.bf2ffdf120aded59'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.0dbea76087bb17f2'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: { limitLineBreaks: true },
            },
          },
          {
            propertyName: "overflow",
            label: $t('index.75402289c3b295b3'),
            helpText: $t('index.e0790fae91b00df9'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              {
                label: $t('index.cecd7681df11aab0'),
                value: OverflowTypes.SCROLL,
              },
              {
                label: $t('index.5fe102f3c314c572'),
                value: OverflowTypes.TRUNCATE,
              },
              {
                label: $t('index.736fb2a4bce4ae2d'),
                value: OverflowTypes.NONE,
              },
            ],
            defaultValue: OverflowTypes.NONE,
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "isVisible",
            helpText: $t('index.8477701922c49195'),
            label: $t('index.0da829eb96800596'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.cbaccfe90c5fec78'),
            controlType: "SWITCH",
            helpText: $t('index.2baaaaf496001005'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "disableLink",
            helpText: $t('index.db8702086cac0abc'),
            label: $t('index.4dbbd423bed09d73'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
    ];
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      truncateButtonColor: "{{appsmith.theme.colors.primaryColor}}",
      fontFamily: "{{appsmith.theme.fontFamily.appFont}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
    };
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.e00bbba440295dea'),
        children: [
          {
            propertyName: "fontFamily",
            label: $t('index.9bdeecacf43c8197'),
            helpText: $t('index.6960ce3be9106b84'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: $t('index.eaf41be77907aad8'),
                value: $t('index.eaf41be77907aad8'),
              },
              {
                label: $t('index.596e44b6c2cb99a6'),
                value: $t('index.596e44b6c2cb99a6'),
              },
              {
                label: $t('index.624329fdfcde5772'),
                value: $t('index.624329fdfcde5772'),
              },
              {
                label: $t('index.7a73a1016d9369de'),
                value: $t('index.7a73a1016d9369de'),
              },
              {
                label: "Montserrat",
                value: "Montserrat",
              },
              {
                label: $t('index.11f94b8fad06761a'),
                value: $t('index.11f94b8fad06761a'),
              },
              {
                label: $t('index.9c41ba58b7e8c8b6'),
                value: $t('index.9c41ba58b7e8c8b6'),
              },
              {
                label: $t('index.038ae35eecacafbe'),
                value: $t('index.038ae35eecacafbe'),
              },
              {
                label: $t('index.9c8586ed5b7903b9'),
                value: $t('index.9c8586ed5b7903b9'),
              },
              {
                label: $t('index.2d1a29632541527c'),
                value: $t('index.2d1a29632541527c'),
              },
            ],
            defaultValue: $t('index.eaf41be77907aad8'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
          {
            propertyName: "fontSize",
            label: $t('index.f44ac906ad29d1df'),
            helpText: $t('index.2cc5ff42732c02e2'),
            controlType: "DROP_DOWN",
            defaultValue: "1rem",
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
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
        ],
      },
      {
        sectionName: $t('index.13c94a89d72fb5ab'),
        children: [
          {
            propertyName: "textColor",
            label: $t('index.4874630a98db9159'),
            helpText: $t('index.62c82f37b17c4f54'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^(?![<|{{]).+/,
              },
            },
          },
          {
            propertyName: "backgroundColor",
            label: $t('index.cf891ed519230622'),
            helpText: $t('index.037b85c2fddf8191'),
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
          {
            helpText: $t('index.8439996b91928382'),
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            propertyName: "borderColor",
            label: $t('index.22b1ef4d311e4248'),
            controlType: "COLOR_PICKER",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "truncateButtonColor",
            label: $t('index.e0c7f366ad7beffd'),
            helpText: $t('index.9457131cde766663'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex: /^((?![<|{{]).+){0,1}/,
              },
            },
            dependencies: ["overflow"],
            hidden: (props: TextWidgetProps) => {
              return props.overflow !== OverflowTypes.TRUNCATE;
            },
          },
        ],
      },
      {
        sectionName: $t('index.871545143a8b804c'),
        children: [
          {
            propertyName: "textAlign",
            label: $t('index.67a2bb50ef2bedbd'),
            helpText: $t('index.3b9e0b3a4778eb1b'),
            controlType: "ICON_TABS",
            fullWidth: true,
            options: [
              {
                startIcon: "align-left",
                value: "LEFT",
              },
              {
                startIcon: "align-center",
                value: "CENTER",
              },
              {
                startIcon: "align-right",
                value: "RIGHT",
              },
            ],
            defaultValue: "LEFT",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "fontStyle",
            label: $t('index.dcd9682efd865cca'),
            helpText: $t('index.818e80abba2167e7'),
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
        sectionName: $t('index.0d1a8f660c7a9cef'),
        children: [
          {
            helpText:
              $t('index.ed77ace144bcb6e1'),
            propertyName: "borderWidth",
            label: $t('index.78af939906594d11'),
            placeholderText: $t('index.91e5dbe9acc319b9'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
          },
        ],
      },
    ];
  }

  /**
   * Disable html parsing for long continuous texts
   * @returns boolean
   */
  shouldDisableLink = (): boolean => {
    const text = this.props.text || "";
    const count: number = countOccurrences(text, "\n", false, 0);

    return (
      (count === 0 && text.length > MAX_HTML_PARSING_LENGTH) ||
      text.length > 50000
    );
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
        setText: {
          path: "text",
          type: "string",
        },
        setTextColor: {
          path: "textColor",
          type: "string",
        },
      },
    };
  }

  getWidgetView() {
    const disableLink: boolean = this.props.disableLink
      ? true
      : this.shouldDisableLink();

    return (
      <WidgetStyleContainer
        className="t--text-widget-container"
        {...pick(this.props, [
          "widgetId",
          "containerStyle",
          "borderColor",
          "borderWidth",
        ])}
      >
        <TextComponent
          accentColor={this.props.accentColor}
          backgroundColor={this.props.backgroundColor}
          disableLink={disableLink}
          fontFamily={this.props.fontFamily}
          fontSize={this.props.fontSize}
          fontStyle={this.props.fontStyle}
          isLoading={this.props.isLoading}
          key={this.props.widgetId}
          minHeight={this.props.minHeight}
          overflow={this.props.overflow}
          text={this.props.text}
          textAlign={this.props.textAlign ? this.props.textAlign : "LEFT"}
          textColor={this.props.textColor}
          truncateButtonColor={
            this.props.truncateButtonColor || this.props.accentColor
          }
          widgetId={this.props.widgetId}
        />
      </WidgetStyleContainer>
    );
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {
      value: `{{ this.text }}`,
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        "‌Text widget is used to display textual information. Whether you want to display a paragraph or information or add a heading to a container, a text widget makes it easy to style and display text",
      "!url": "https://docs.appsmith.com/widget-reference/text",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      text: "string",
    };
  }
}

export interface TextStyles {
  backgroundColor?: string;
  textColor?: string;
  fontStyle?: string;
  fontSize?: TextSize;
  textAlign?: TextAlign;
  truncateButtonColor?: string;
  fontFamily: string;
}

export interface TextWidgetProps extends WidgetProps, TextStyles {
  accentColor: string;
  text?: string;
  isLoading: boolean;
  disableLink: boolean;
  widgetId: string;
  containerStyle?: ContainerStyle;
  children?: ReactNode;
  borderColor?: Color;
  borderWidth?: number;
  overflow: OverflowTypes;
}

export default TextWidget;
