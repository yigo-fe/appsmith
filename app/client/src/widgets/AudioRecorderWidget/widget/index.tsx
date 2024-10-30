import {$t} from "locale/index";
import React from "react";

import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { createBlobUrl } from "utils/AppsmithUtils";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import { FileDataTypes } from "WidgetProvider/constants";
import AudioRecorderComponent from "../component";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";

export interface AudioRecorderWidgetProps extends WidgetProps {
  accentColor: string;
  borderRadius: string;
  boxShadow?: string;
  iconColor: string;
  isDisabled: boolean;
  isValid: boolean;
  onRecordingStart?: string;
  onRecordingComplete?: string;
  blobURL?: string;
  isDirty: boolean;
}

class AudioRecorderWidget extends BaseWidget<
  AudioRecorderWidgetProps,
  WidgetState
> {
  static type = "AUDIO_RECORDER_WIDGET";

  static getConfig() {
    return {
      name: $t('index.0167e11c909f9cf6'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.EXTERNAL],
      needsMeta: true,
      searchTags: [$t('index.01d580fe27dcc83d'), $t('index.90586e47fea0d594')],
    };
  }

  static getDefaults() {
    return {
      iconColor: "white",
      isDisabled: false,
      isVisible: true,
      rows: 7,
      columns: 16,
      widgetName: "AudioRecorder",
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
              minHeight: "70px",
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
        minHeight: { base: "70px" },
        minWidth: { base: "280px" },
      },
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.b323071643bd794b'),
      "!url": "https://docs.appsmith.com/widget-reference/recorder",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      blobURL: "string",
      dataURL: "string",
      rawBinary: "string",
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.9e4187771f54cfef'),
        children: [
          {
            propertyName: "isVisible",
            label: $t('index.7d55ebe9319a4be0'),
            helpText: $t('index.178e81d3a5c2564c'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          {
            propertyName: "isDisabled",
            label: $t('index.1c413b0e9d909958'),
            controlType: "SWITCH",
            helpText: $t('index.3ac45f14dace9218'),
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.BOOLEAN,
            },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.259295379a72bd2b'),
            controlType: "SWITCH",
            helpText: $t('index.da4aab8034715299'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.2762d0abbcb2a101'),
        children: [
          {
            helpText: $t('index.f749e3f32881e345'),
            propertyName: "onRecordingStart",
            label: "onRecordingStart",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.d8243369d554970c'),
            propertyName: "onRecordingComplete",
            label: "onRecordingComplete",
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
        sectionName: $t('index.51413b645ff46fb4'),
        children: [
          {
            propertyName: "iconColor",
            helpText: $t('index.a14fd9935a717d4c'),
            label: $t('index.f43e7a89e3ecc13e'),
            controlType: "COLOR_PICKER",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "accentColor",
            helpText: $t('index.6fd360cc56c1d942'),
            label: $t('index.e2dd0eae9a832e24'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.be9dd60e8f5d1e39'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.0275ee4a45e09335'),
            helpText:
              $t('index.3afc9a9c23fda8ff'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.d7e63282ff8e997e'),
            helpText:
              $t('index.63fbef0f74893d17'),
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
      accentColor: "{{appsmith.theme.colors.primaryColor}}",
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "none",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      blobURL: undefined,
      dataURL: undefined,
      rawBinary: undefined,
      isDirty: false,
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  handleRecordingStart = () => {
    if (!this.props.isDirty) {
      this.props.updateWidgetMetaProperty("isDirty", true);
    }

    if (this.props.blobURL) {
      URL.revokeObjectURL(this.props.blobURL);
    }

    this.props.updateWidgetMetaProperty("blobURL", null);
    this.props.updateWidgetMetaProperty("dataURL", undefined);
    this.props.updateWidgetMetaProperty("rawBinary", undefined);

    if (this.props.onRecordingStart) {
      super.executeAction({
        triggerPropertyName: "onRecordingStart",
        dynamicString: this.props.onRecordingStart,
        event: {
          type: EventType.ON_RECORDING_START,
        },
      });
    }
  };

  handleRecordingComplete = (blobUrl?: string, blob?: Blob) => {
    if (!blobUrl) {
      this.props.updateWidgetMetaProperty("blobURL", undefined);
      this.props.updateWidgetMetaProperty("dataURL", undefined);
      this.props.updateWidgetMetaProperty("rawBinary", undefined);

      return;
    }

    this.props.updateWidgetMetaProperty("blobURL", blobUrl);

    if (blob) {
      const blobIdForBase64 = createBlobUrl(blob, FileDataTypes.Base64);
      const blobIdForRaw = createBlobUrl(blob, FileDataTypes.Binary);

      this.props.updateWidgetMetaProperty("dataURL", blobIdForBase64, {
        triggerPropertyName: "onRecordingComplete",
        dynamicString: this.props.onRecordingComplete,
        event: {
          type: EventType.ON_RECORDING_COMPLETE,
        },
      });
      this.props.updateWidgetMetaProperty("rawBinary", blobIdForRaw, {
        triggerPropertyName: "onRecordingComplete",
        dynamicString: this.props.onRecordingComplete,
        event: {
          type: EventType.ON_RECORDING_COMPLETE,
        },
      });
    }
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
      },
    };
  }

  getWidgetView() {
    const { blobURL, componentHeight, componentWidth, iconColor, isDisabled } =
      this.props;

    return (
      <AudioRecorderComponent
        accentColor={this.props.accentColor}
        blobUrl={blobURL}
        borderRadius={this.props.borderRadius}
        boxShadow={this.props.boxShadow}
        height={componentHeight}
        iconColor={iconColor}
        isDisabled={isDisabled}
        onRecordingComplete={this.handleRecordingComplete}
        onRecordingStart={this.handleRecordingStart}
        width={componentWidth}
      />
    );
  }
}

export default AudioRecorderWidget;
