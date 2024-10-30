import {$t} from "locale/index";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import React from "react";
import type { WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import IframeComponent from "../component";
import type { IframeWidgetProps } from "../constants";
import { generateTypeDef } from "utils/autocomplete/defCreatorUtils";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { isAirgapped } from "ee/utils/airgapHelpers";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import {
  FlexVerticalAlignment,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";

const isAirgappedInstance = isAirgapped();

const DEFAULT_IFRAME_SOURCE = !isAirgappedInstance
  ? "https://www.example.com"
  : "";

class IframeWidget extends BaseWidget<IframeWidgetProps, WidgetState> {
  static type = "IFRAME_WIDGET";

  static getConfig() {
    return {
      name: $t('index.0a3495ecae4a4c7a'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.DISPLAY],
      needsMeta: true,
      searchTags: ["embed"],
    };
  }

  static getDefaults() {
    return {
      source: DEFAULT_IFRAME_SOURCE,
      borderOpacity: 100,
      borderWidth: 1,
      rows: 32,
      columns: 24,
      widgetName: $t('index.0a3495ecae4a4c7a'),
      version: 1,
      animateLoading: true,
      isVisible: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
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
            propertyPath: "source",
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
    return (widget: IframeWidgetProps) => ({
      "!doc": $t('index.4be292b85f5308e8'),
      "!url": "https://docs.appsmith.com/widget-reference/iframe",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      source: "string",
      title: "string",
      message: generateTypeDef(widget.message),
      messageMetadata: generateTypeDef(widget.messageMetadata),
    });
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setURL: {
          path: "source",
          type: "string",
        },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.66923218abdc00eb'),
        children: [
          {
            propertyName: "source",
            helpText: $t('index.c1fe337ebb01eda3'),
            label: "URL",
            controlType: "INPUT_TEXT",
            placeholderText: "https://docs.appsmith.com",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.SAFE_URL,
              params: {
                default: "https://www.example.com",
              },
            },
          },
          {
            propertyName: "srcDoc",
            helpText: $t('index.5b2d130abf831be0'),
            label: "srcDoc",
            controlType: "INPUT_TEXT",
            placeholderText: "<p>Inline HTML</p>",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
            },
          },
        ],
      },
      {
        sectionName: $t('index.18bd201a635a3992'),
        children: [
          {
            propertyName: "title",
            helpText: $t('index.a105a1c23bcbe622'),
            label: $t('index.f37f8ef3c76ed2ad'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.2a668aab05b75cdb'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.7bf768abc346f33b'),
            controlType: "SWITCH",
            helpText: $t('index.fd61f035ff808cbc'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isVisible",
            label: $t('index.f028a5ca5d2999f4'),
            controlType: "SWITCH",
            helpText: $t('index.15becd8392414070'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.989a4ea31e6ec05e'),
        children: [
          {
            helpText: $t('index.91a80bb211dd06fb'),
            propertyName: "onURLChanged",
            label: "onURLChanged",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.0cc84243620f7bc1'),
            propertyName: "onSrcDocChanged",
            label: "onSrcDocChanged",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.fd8addbe0a12c2e5'),
            propertyName: "onMessageReceived",
            label: "onMessageReceived",
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
        sectionName: $t('index.2b94eb0e1832fed4'),
        children: [
          {
            propertyName: "borderColor",
            label: $t('index.dc96bfd4e1a7ad9a'),
            helpText: $t('index.363cdf79d5c91f00'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.85aadeaabb8ba7d6'),
        children: [
          {
            propertyName: "borderWidth",
            label: $t('index.6714c73ce46a2377'),
            helpText: $t('index.b51ba1cda7d1a53a'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            inputType: "NUMBER",
            validation: {
              type: ValidationTypes.NUMBER,
              params: { min: 0, default: 1 },
            },
          },
          {
            propertyName: "borderOpacity",
            label: "Border opacity (%)",
            helpText: $t('index.de128e86ed2520e9'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            inputType: "NUMBER",
            validation: {
              type: ValidationTypes.NUMBER,
              params: { min: 0, max: 100, default: 100 },
            },
          },
          {
            propertyName: "borderRadius",
            label: $t('index.ae97c17af10ac3e6'),
            helpText:
              $t('index.955958d75b9ccd1d'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.d9d46e7804a48ff3'),
            helpText:
              $t('index.5fd8a23fec75c150'),
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

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      message: undefined,
      messageMetadata: undefined,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
    };
  }

  handleUrlChange = (url: string) => {
    if (url && this.props.onURLChanged) {
      super.executeAction({
        triggerPropertyName: "onURLChanged",
        dynamicString: this.props.onURLChanged,
        event: {
          type: EventType.ON_IFRAME_URL_CHANGED,
        },
      });
    }
  };

  handleSrcDocChange = (srcDoc?: string) => {
    if (srcDoc && this.props.onSrcDocChanged) {
      super.executeAction({
        triggerPropertyName: "onSrcDocChanged",
        dynamicString: this.props.onSrcDocChanged,
        event: {
          type: EventType.ON_IFRAME_SRC_DOC_CHANGED,
        },
      });
    }
  };

  handleMessageReceive = ({
    data,
    lastEventId,
    origin,
    ports,
  }: MessageEvent) => {
    this.props.updateWidgetMetaProperty("messageMetadata", {
      lastEventId,
      origin,
      ports,
    });
    this.props.updateWidgetMetaProperty("message", data, {
      triggerPropertyName: "onMessageReceived",
      dynamicString: this.props.onMessageReceived,
      event: {
        type: EventType.ON_IFRAME_MESSAGE_RECEIVED,
      },
    });
  };

  getWidgetView() {
    const {
      borderColor,
      borderOpacity,
      borderWidth,
      isVisible,
      renderMode,
      source,
      srcDoc,
      title,
      widgetId,
      widgetName,
    } = this.props;

    return (
      <IframeComponent
        borderColor={borderColor}
        borderOpacity={borderOpacity}
        borderRadius={this.props.borderRadius}
        borderWidth={borderWidth}
        boxShadow={this.props.boxShadow}
        isVisible={isVisible}
        onMessageReceived={this.handleMessageReceive}
        onSrcDocChanged={this.handleSrcDocChange}
        onURLChanged={this.handleUrlChange}
        renderMode={renderMode}
        source={source}
        srcDoc={srcDoc}
        title={title}
        widgetId={widgetId}
        widgetName={widgetName}
      />
    );
  }
}

export default IframeWidget;
