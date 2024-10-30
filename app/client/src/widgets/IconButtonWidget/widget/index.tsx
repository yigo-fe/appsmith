import {$t} from "locale/index";
import type { IconName } from "@blueprintjs/icons";
import React from "react";

import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import { IconNames } from "@blueprintjs/icons";
import type { ButtonVariant } from "components/constants";
import { ButtonVariantTypes } from "components/constants";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import IconButtonComponent from "../component";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { ICON_BUTTON_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import { WIDGET_TAGS } from "constants/WidgetConstants";

const ICON_BUTTON_SIZE_IN_AUTOLAYOUT = 32;

const ICON_NAMES = Object.keys(IconNames).map(
  (name: string) => IconNames[name as keyof typeof IconNames],
);

export interface IconButtonWidgetProps extends WidgetProps {
  iconName?: IconName;
  backgroundColor: string;
  buttonVariant: ButtonVariant;
  borderRadius: string;
  boxShadow: string;
  boxShadowColor: string;
  isDisabled: boolean;
  isVisible: boolean;
  onClick?: string;
}

class IconButtonWidget extends BaseWidget<IconButtonWidgetProps, WidgetState> {
  static type = "ICON_BUTTON_WIDGET";

  static getConfig() {
    return {
      name: $t('index.628e27a1d029faae'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.BUTTONS],
      searchTags: ["click", "submit"],
    };
  }

  static getDefaults() {
    return {
      iconName: IconNames.PLUS,
      buttonVariant: ButtonVariantTypes.PRIMARY,
      isDisabled: false,
      isVisible: true,
      rows: 4,
      columns: 4,
      widgetName: "IconButton",
      version: 1,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Hug,
      minWidth: ICON_BUTTON_MIN_WIDTH,
    };
  }

  static getAutoLayoutConfig() {
    return {
      defaults: {
        rows: 4,
        columns: 2.21,
      },
      autoDimension: {
        width: true,
      },
      widgetSize: [
        {
          viewportMinWidth: 0,
          configuration: () => {
            return {
              minWidth: "40px",
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
      widgetSize: {
        maxHeight: {},
        maxWidth: {},
        minHeight: { base: "40px" },
        minWidth: { base: "40px" },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.cf69625ffd9b877f'),
        children: [
          {
            propertyName: "iconName",
            label: $t('index.4a786261c4e565e0'),
            helpText: $t('index.c993f48e86253b63'),
            controlType: "ICON_SELECT",
            defaultIconName: "plus",
            hideNoneIcon: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ICON_NAMES,
                default: IconNames.PLUS,
              },
            },
          },
          {
            helpText: $t('index.6b1cd757fed030b0'),
            propertyName: "onClick",
            label: "onClick",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
      {
        sectionName: $t('index.22e1b96b2368c639'),
        children: [
          {
            helpText: $t('index.0683ad0b48850174'),
            propertyName: "tooltip",
            label: $t('index.83840dcd231c4e5e'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.d474c764eaed3ba3'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            helpText: $t('index.52ddb66081d385f6'),
            label: $t('index.3b8a9e07f63f9a96'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "isDisabled",
            helpText: $t('index.06bbebbc4747bd0a'),
            label: $t('index.d66a7dc27fcaeb67'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.a885e1c82f6e6a8c'),
            controlType: "SWITCH",
            helpText: $t('index.81d62cb74376cf01'),
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
        sectionName: $t('index.22e1b96b2368c639'),
        children: [
          {
            propertyName: "buttonVariant",
            label: $t('index.5c8f4f5fef06f767'),
            controlType: "ICON_TABS",
            defaultValue: ButtonVariantTypes.PRIMARY,
            fullWidth: true,
            helpText: $t('index.bdaa164187c05649'),
            options: [
              {
                label: $t('index.4751b934f9aec420'),
                value: ButtonVariantTypes.PRIMARY,
              },
              {
                label: $t('index.994221155ae26b96'),
                value: ButtonVariantTypes.SECONDARY,
              },
              {
                label: $t('index.9965bfac1aba03e0'),
                value: ButtonVariantTypes.TERTIARY,
              },
            ],
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [
                  ButtonVariantTypes.PRIMARY,
                  ButtonVariantTypes.SECONDARY,
                  ButtonVariantTypes.TERTIARY,
                ],
                default: ButtonVariantTypes.PRIMARY,
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.d1ef36d13d4dc2b5'),
        children: [
          {
            propertyName: "buttonColor",
            helpText: $t('index.df2226b0bc6a806d'),
            label: $t('index.39fe06696d1f8c39'),
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
        ],
      },
      {
        sectionName: $t('index.3bbcf27cae84346b'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.5a3ecbfc3185508a'),
            helpText:
              $t('index.e0456649e7b28e59'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.b91ef33b0bfaf03e'),
            helpText:
              $t('index.3b482c849b059e6b'),
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
      buttonColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
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
      },
    };
  }

  getWidgetView() {
    const {
      borderRadius,
      boxShadow,
      buttonColor,
      buttonVariant,
      iconName,
      isDisabled,
      isVisible,
      tooltip,
      widgetId,
    } = this.props;
    const { componentHeight, componentWidth } = this.props;

    return (
      <IconButtonComponent
        borderRadius={borderRadius}
        boxShadow={boxShadow}
        buttonColor={buttonColor}
        buttonVariant={buttonVariant}
        hasOnClickAction={!!this.props.onClick}
        height={
          this.isAutoLayoutMode
            ? ICON_BUTTON_SIZE_IN_AUTOLAYOUT
            : componentHeight
        }
        iconName={iconName}
        isDisabled={isDisabled}
        isVisible={isVisible}
        minHeight={this.props.minHeight}
        minWidth={this.props.minWidth}
        onClick={this.handleClick}
        renderMode={this.props.renderMode}
        tooltip={tooltip}
        widgetId={widgetId}
        width={
          this.isAutoLayoutMode
            ? ICON_BUTTON_SIZE_IN_AUTOLAYOUT
            : componentWidth
        }
      />
    );
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.36267a6bd3d08c70'),
      "!url": "https://docs.appsmith.com/widget-reference/icon-button",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
    };
  }

  handleClick = () => {
    const { onClick } = this.props;

    if (onClick) {
      super.executeAction({
        triggerPropertyName: "onClick",
        dynamicString: onClick,
        event: {
          type: EventType.ON_CLICK,
        },
      });
    }
  };
}

export default IconButtonWidget;
