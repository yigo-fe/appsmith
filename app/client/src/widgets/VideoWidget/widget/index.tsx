import {$t} from "locale/index";
import type { ButtonBorderRadius } from "components/constants";
import Skeleton from "components/utils/Skeleton";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import React, { lazy, Suspense } from "react";
import type ReactPlayer from "react-player";
import { retryPromise } from "utils/AppsmithUtils";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WidgetProps, WidgetState } from "../../BaseWidget";
import BaseWidget from "../../BaseWidget";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { getAssetUrl } from "ee/utils/airgapHelpers";
import { ASSETS_CDN_URL } from "constants/ThirdPartyConstants";
import {
  FlexVerticalAlignment,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import type {
  SnipingModeProperty,
  PropertyUpdates,
} from "WidgetProvider/constants";
import { WIDGET_TAGS } from "constants/WidgetConstants";

const VideoComponent = lazy(async () =>
  retryPromise(async () => import("../component")),
);

export enum PlayState {
  NOT_STARTED = "NOT_STARTED",
  PAUSED = "PAUSED",
  ENDED = "ENDED",
  PLAYING = "PLAYING",
}

class VideoWidget extends BaseWidget<VideoWidgetProps, WidgetState> {
  static type = "VIDEO_WIDGET";

  static getConfig() {
    return {
      name: $t('index.942a029c2e2d59d4'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.MEDIA],
      needsMeta: true,
      searchTags: ["youtube"],
    };
  }

  static getDefaults() {
    return {
      rows: 28,
      columns: 24,
      widgetName: $t('index.942a029c2e2d59d4'),
      url: getAssetUrl(`${ASSETS_CDN_URL}/widgets/bird.mp4`),
      autoPlay: false,
      version: 1,
      animateLoading: true,
      backgroundColor: "#000",
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
            propertyPath: "url",
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

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.1291cac1458f4cbb'),
        children: [
          {
            propertyName: "url",
            label: "URL",
            helpText: $t('index.f970fd5804ec2a08'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.8f0147e00562d8cd'),
            inputType: "TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                regex:
                  /^(http(s)?:\/\/)?([-a-zA-Z0-9:%._\+~#=]*@)?(([-a-zA-Z0-9\.]{2,256}\.[a-z]{2,6})|(?:\d{1,3}\.){3}\d{1,3}\b)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
                expected: {
                  type: "Video URL",
                  example: getAssetUrl(`${ASSETS_CDN_URL}/widgets/bird.mp4`),
                  autocompleteDataType: AutocompleteDataType.STRING,
                },
              },
            },
          },
        ],
      },
      {
        sectionName: $t('index.13dfdd7463563e02'),
        children: [
          {
            propertyName: "autoPlay",
            label: $t('index.8b7d8467b3d4b2a1'),
            helpText:
              $t('index.ed997bea9e3ed489'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            helpText: $t('index.cef5da52d341ece4'),
            propertyName: "isVisible",
            label: $t('index.79a339d6a1ac6940'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.bab94e45b600207f'),
            controlType: "SWITCH",
            helpText: $t('index.438205ed69700642'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.b1c0aa5ecdb9a2ff'),
        children: [
          {
            helpText: $t('index.fcda6c242e88e6db'),
            propertyName: "onPlay",
            label: "onPlay",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.5188ba62a686ffc1'),
            propertyName: "onPause",
            label: "onPause",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
          {
            helpText: $t('index.f7e4d4edb96c7d9f'),
            propertyName: "onEnd",
            label: "onEnd",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
          },
        ],
      },
    ];
  }

  static getSetterConfig(): SetterConfig {
    return {
      __setters: {
        setVisibility: {
          path: "isVisible",
          type: "boolean",
        },
        setURL: {
          path: "url",
          type: "string",
        },
        setPlaying: {
          path: "autoPlay",
          type: "boolean",
          accessor: "playState",
        },
      },
    };
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.6573ca231d5b6f65'),
        children: [
          {
            propertyName: "backgroundColor",
            helpText: $t('index.afab796c66be6202'),
            label: $t('index.269a806450acf450'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.fbeb4677c7ead5bc'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.7b1992f7d228c798'),
            helpText:
              $t('index.832f66a3cbb74ba0'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.8357f8cca7432d7b'),
            helpText:
              $t('index.679ad7e59acbf0b4'),
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

  private _player = React.createRef<ReactPlayer>();

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      // Property reflecting the state of the widget
      playState: PlayState.NOT_STARTED,
      // Property passed onto the video player making it a controlled component
      playing: false,
    };
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {
      playing: "autoPlay",
    };
  }

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc":
        $t('index.72d4394441278746'),
      "!url": "https://docs.appsmith.com/widget-reference/video",
      playState: "number",
      autoPlay: "bool",
    };
  }

  // TODO: (Rishabh) When we have the new list widget, we need to make the playState as a derived propery.
  // TODO: (Balaji) Can we have dynamic default value that accepts current widget values and determines the default value.
  componentDidUpdate(prevProps: VideoWidgetProps) {
    // When the widget is reset
    if (
      prevProps.playState !== "NOT_STARTED" &&
      this.props.playState === "NOT_STARTED"
    ) {
      this._player.current?.seekTo(0);

      if (this.props.playing) {
        this.props.updateWidgetMetaProperty("playState", PlayState.PLAYING);
      }
    }

    // When autoPlay changes from property pane
    if (prevProps.autoPlay !== this.props.autoPlay) {
      if (this.props.autoPlay) {
        this.props.updateWidgetMetaProperty("playState", PlayState.PLAYING);
      } else {
        this.props.updateWidgetMetaProperty("playState", PlayState.PAUSED);
      }
    }
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
    };
  }

  getWidgetView() {
    const { autoPlay, onEnd, onPause, onPlay, playing, url } = this.props;

    return (
      <Suspense fallback={<Skeleton />}>
        <VideoComponent
          autoPlay={autoPlay}
          backgroundColor={this.props.backgroundColor}
          borderRadius={this.props.borderRadius}
          boxShadow={this.props.boxShadow}
          boxShadowColor={this.props.boxShadowColor}
          controls
          onEnded={() => {
            // Stopping the video from playing when the media is finished playing
            this.props.updateWidgetMetaProperty("playing", false);
            this.props.updateWidgetMetaProperty("playState", PlayState.ENDED, {
              triggerPropertyName: "onEnd",
              dynamicString: onEnd,
              event: {
                type: EventType.ON_VIDEO_END,
              },
            });
          }}
          onPause={() => {
            // TODO: We do not want the pause event for onSeek or onEnd.
            // Stopping the media when it is playing and pause is hit
            if (this.props.playing) {
              this.props.updateWidgetMetaProperty("playing", false);
              this.props.updateWidgetMetaProperty(
                "playState",
                PlayState.PAUSED,
                {
                  triggerPropertyName: "onPause",
                  dynamicString: onPause,
                  event: {
                    type: EventType.ON_VIDEO_PAUSE,
                  },
                },
              );
            }
          }}
          onPlay={() => {
            // Playing the media when it is stopped / paused and play is hit
            if (!this.props.playing) {
              this.props.updateWidgetMetaProperty("playing", true);
              this.props.updateWidgetMetaProperty(
                "playState",
                PlayState.PLAYING,
                {
                  triggerPropertyName: "onPlay",
                  dynamicString: onPlay,
                  event: {
                    type: EventType.ON_VIDEO_PLAY,
                  },
                },
              );
            }
          }}
          player={this._player}
          playing={playing}
          url={url}
        />
      </Suspense>
    );
  }
}

export interface VideoWidgetProps extends WidgetProps {
  url: string;
  autoPlay: boolean;
  onPause?: string;
  onPlay?: string;
  onEnd?: string;
  backgroundColor?: string;
  borderRadius?: ButtonBorderRadius;
  boxShadow?: string;
}

export default VideoWidget;
