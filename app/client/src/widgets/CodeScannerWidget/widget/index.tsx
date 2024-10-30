import {$t} from "locale/index";
import React from "react";
import type { WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import CodeScannerComponent from "../component";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import contentConfig from "./propertyConfig/contentConfig";
import styleConfig from "./propertyConfig/styleConfig";
import type { CodeScannerWidgetProps } from "../constants";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";

import { ButtonPlacementTypes } from "components/constants";
import { ScannerLayout } from "../constants";
import {
  FlexVerticalAlignment,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";
class CodeScannerWidget extends BaseWidget<
  CodeScannerWidgetProps,
  WidgetState
> {
  static type = "CODE_SCANNER_WIDGET";

  static getConfig() {
    return {
      name: $t('index.9ca85844f987084d'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.EXTERNAL],
      needsMeta: true,
      searchTags: [
        $t('index.4887b77ac38e2faa'),
        $t('index.9448bfaca8147558'),
        $t('index.5b7c156ea3b264f3'),
        $t('index.34d6c80b1b18cf3c'),
      ],
    };
  }

  static getDefaults() {
    return {
      rows: 33,
      label: $t('index.9c72c534f406ac57'),
      columns: 25,
      widgetName: "CodeScanner",
      isDefaultClickDisabled: true,
      scannerLayout: ScannerLayout.ALWAYS_ON,
      version: 1,
      isRequired: false,
      isDisabled: false,
      animateLoading: true,
      placement: ButtonPlacementTypes.CENTER,
      responsiveBehavior: ResponsiveBehavior.Fill,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
    };
  }

  static getAutoLayoutConfig() {
    return {
      disabledPropsDefaults: {
        scannerLayout: ScannerLayout.ALWAYS_ON,
      },
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

  static getPropertyPaneContentConfig() {
    return contentConfig;
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setDisable: {
          path: "isDisabled",
          type: "boolean",
        },
      },
    };
  }

  static getPropertyPaneStyleConfig() {
    return styleConfig;
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      value: undefined,
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc": $t('index.1f6d2210ed06afd1'),
      "!url": "https://docs.appsmith.com/reference/widgets/code-scanner",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      isDisabled: "bool",
      value: "string",
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      buttonColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  onCodeDetected = (value: string) => {
    this.props.updateWidgetMetaProperty("value", value, {
      triggerPropertyName: "onCodeDetected",
      dynamicString: this.props.onCodeDetected,
      event: {
        type: EventType.ON_CODE_DETECTED,
      },
    });
  };

  getWidgetView() {
    return (
      <CodeScannerComponent
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        buttonColor={this.props.buttonColor || this.props.accentColor}
        defaultCamera={this.props.defaultCamera}
        iconAlign={this.props.iconAlign}
        iconName={this.props.iconName}
        isDisabled={this.props.isDisabled}
        key={this.props.widgetId}
        label={this.props.label}
        onCodeDetected={this.onCodeDetected}
        placement={this.props.placement}
        scannerLayout={this.props.scannerLayout}
        shouldButtonFitContent={this.isAutoLayoutMode}
        tooltip={this.props.tooltip}
        widgetId={this.props.widgetId}
      />
    );
  }
}

export type CodeScannerWidgetV2Props = CodeScannerWidgetProps;

export default CodeScannerWidget;
