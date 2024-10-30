import {$t} from "locale/index";
import { RenderModes } from "constants/WidgetConstants";
import * as React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import ImageComponent from "../component";

import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { ASSETS_CDN_URL } from "constants/ThirdPartyConstants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { getAssetUrl } from "ee/utils/airgapHelpers";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { FlexVerticalAlignment } from "layoutSystems/common/utils/constants";

class ImageWidget extends BaseWidget<ImageWidgetProps, WidgetState> {
  constructor(props: ImageWidgetProps) {
    super(props);
    this.onImageClick = this.onImageClick.bind(this);
  }

  static type = "IMAGE_WIDGET";

  static getConfig() {
    return {
      name: $t('index.1bd07bd5564fb05d'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.MEDIA],
    };
  }

  static getDefaults() {
    return {
      defaultImage: getAssetUrl(`${ASSETS_CDN_URL}/widgets/default.png`),
      imageShape: "RECTANGLE",
      maxZoomLevel: 1,
      enableRotation: false,
      enableDownload: false,
      objectFit: "cover",
      image: "",
      rows: 12,
      columns: 12,
      widgetName: $t('index.1bd07bd5564fb05d'),
      version: 1,
      animateLoading: true,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
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
      "!doc":
        "Image widget is used to display images in your app. Images must be either a URL or a valid base64.",
      "!url": "https://docs.appsmith.com/widget-reference/image",
      image: "string",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
    };
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setImage: {
          path: "image",
          type: "string",
        },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.c1b70c17f26d9d45'),
        children: [
          {
            helpText: $t('index.10ecdece85e30b27'),
            propertyName: "image",
            label: $t('index.1bd07bd5564fb05d'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.19fd752a9baee077'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.IMAGE_URL },
          },
          {
            helpText: $t('index.1d7be3310138e36b'),
            propertyName: "defaultImage",
            label: $t('index.7610addcb8efa929'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.19fd752a9baee077'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.IMAGE_URL },
          },
        ],
      },
      {
        sectionName: $t('index.3ed7002d83889844'),
        children: [
          {
            helpText:
              $t('index.cd0bd90a0ba613fa'),
            propertyName: "objectFit",
            label: $t('index.679e74d18763d583'),
            controlType: "DROP_DOWN",
            defaultValue: "contain",
            options: [
              {
                label: $t('index.a3c26ec70ae3bdcd'),
                value: "contain",
              },
              {
                label: $t('index.1b50827ce91ac5c0'),
                value: "cover",
              },
              {
                label: $t('index.8a4e02b682f62761'),
                value: "auto",
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["contain", "cover", "auto"],
              },
            },
          },
          {
            helpText: $t('index.a0444827e676ac16'),
            propertyName: "maxZoomLevel",
            label: $t('index.a16f4b792b473425'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: "1x (No Zoom)",
                value: 1,
              },
              {
                label: "2x",
                value: 2,
              },
              {
                label: "4x",
                value: 4,
              },
              {
                label: "8x",
                value: 8,
              },
              {
                label: "16x",
                value: 16,
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.NUMBER,
              params: { allowedValues: [1, 2, 4, 8, 16] },
            },
          },
          {
            helpText: $t('index.3935eeab69d6d67d'),
            propertyName: "isVisible",
            label: $t('index.2de0d156fef98ee5'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.11fe5df6726188bd'),
            controlType: "SWITCH",
            helpText: $t('index.bb26e6401e8ba0ec'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.34126cc73f0574a5'),
            propertyName: "enableRotation",
            label: $t('index.a2c4126b7974a967'),
            controlType: "SWITCH",
            isJSConvertible: false,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.f070cd06b5740a50'),
            propertyName: "enableDownload",
            label: $t('index.7d4f9cacee2c0b17'),
            controlType: "SWITCH",
            isJSConvertible: false,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.b88fcc62a36278a9'),
        children: [
          {
            helpText: $t('index.3889ee531b85ee47'),
            propertyName: "onClick",
            label: "onClick",
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
        sectionName: $t('index.08c7db44205802cf'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.553855fd6b2ee013'),
            helpText:
              $t('index.4f4229aec1bac859'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.d11332a8ed3749ef'),
            helpText:
              $t('index.d2186bec8bb6ec85'),
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

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }
  // TODO Find a way to enforce this, (dont let it be set)
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {};
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  getWidgetView() {
    const { maxZoomLevel, objectFit } = this.props;

    return (
      <ImageComponent
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        defaultImageUrl={this.props.defaultImage}
        disableDrag={(disable: boolean) => {
          this.disableDrag(disable);
        }}
        enableDownload={this.props.enableDownload}
        enableRotation={this.props.enableRotation}
        imageUrl={this.props.image}
        isLoading={this.props.isLoading}
        maxZoomLevel={maxZoomLevel}
        objectFit={objectFit}
        onClick={this.props.onClick ? this.onImageClick : undefined}
        showHoverPointer={this.props.renderMode === RenderModes.PAGE}
        widgetId={this.props.widgetId}
      />
    );
  }

  onImageClick() {
    if (this.props.onClick) {
      super.executeAction({
        triggerPropertyName: "onClick",
        dynamicString: this.props.onClick,
        event: {
          type: EventType.ON_CLICK,
        },
      });
    }
  }
}

export type ImageShape = "RECTANGLE" | "CIRCLE" | "ROUNDED";

export interface ImageWidgetProps extends WidgetProps {
  image: string;
  imageShape: ImageShape;
  defaultImage: string;
  maxZoomLevel: number;
  imageRotation?: number;
  enableDownload?: boolean;
  enableRotation?: boolean;
  objectFit: string;
  onClick?: string;
  borderRadius: string;
  boxShadow?: string;
}

export default ImageWidget;
