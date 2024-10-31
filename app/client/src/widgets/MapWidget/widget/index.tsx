import {$t} from "locale/index";
import { DEFAULT_CENTER } from "constants/WidgetConstants";
import React from "react";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import MapComponent from "../component";

import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import styled from "styled-components";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import type { MarkerProps } from "../constants";
import { getBorderCSSShorthand } from "constants/DefaultTheme";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
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

const DisabledContainer = styled.div<{
  borderRadius: string;
  boxShadow?: string;
}>`
  background-color: white;
  height: 100%;
  width: 100%;
  overflow: scroll;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ boxShadow }) => boxShadow} !important;
  border: ${(props) => getBorderCSSShorthand(props.theme.borders[2])};
  h1 {
    margin-top: 15%;
    margin-bottom: 10%;
    color: #7c7c7c;
  }
  p {
    color: #0a0b0e;
  }
`;

const DefaultCenter = { ...DEFAULT_CENTER, long: DEFAULT_CENTER.lng };

interface Center {
  lat: number;
  long: number;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

class MapWidget extends BaseWidget<MapWidgetProps, WidgetState> {
  static defaultProps = {};

  static type = "MAP_WIDGET";

  static getConfig() {
    return {
      name: $t('index.bdb90676cc72b2da'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.CONTENT],
      needsMeta: true,
    };
  }

  static getDefaults() {
    return {
      rows: 40,
      columns: 24,
      isDisabled: false,
      isVisible: true,
      widgetName: $t('index.bdb90676cc72b2da'),
      enableSearch: true,
      zoomLevel: 50,
      enablePickLocation: true,
      allowZoom: true,
      mapCenter: { lat: 25.122, long: 50.132 },
      defaultMarkers: [{ lat: 25.122, long: 50.132, title: "Location1" }],
      isClickedMarkerCentered: true,
      version: 1,
      animateLoading: true,
      responsiveBehavior: ResponsiveBehavior.Fill,
      minWidth: FILL_WIDGET_MIN_WIDTH,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
      enableMapTypeControl: false,
    };
  }

  static getMethods() {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "defaultMarkers",
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
      center: {
        lat: "number",
        long: "number",
        title: "string",
      },
      markers: "[$__mapMarker__$]",
      selectedMarker: {
        lat: "number",
        long: "number",
        title: "string",
        description: "string",
      },
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
        sectionName: $t('index.7d266c6f175ea30e'),
        children: [
          {
            propertyName: "mapCenter",
            label: $t('index.ef635350c98763a3'),
            helpText:
              $t('index.f53c96fc33d6d253'),
            isJSConvertible: true,
            controlType: "LOCATION_SEARCH",
            dependencies: ["googleMapsApiKey"],
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.OBJECT,
              params: {
                allowedKeys: [
                  {
                    name: "lat",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -90,
                      max: 90,
                      default: 0,
                      required: true,
                    },
                  },
                  {
                    name: "long",
                    type: ValidationTypes.NUMBER,
                    params: {
                      min: -180,
                      max: 180,
                      default: 0,
                      required: true,
                    },
                  },
                ],
              },
            },
          },
          {
            propertyName: "defaultMarkers",
            label: $t('index.8fcd54fd0515ad15'),
            controlType: "INPUT_TEXT",
            inputType: "ARRAY",
            helpText: $t('index.1bc814a80cc34a19'),
            placeholderText: '[{ "lat": "val1", "long": "val2" }]',
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: {
                children: {
                  type: ValidationTypes.OBJECT,
                  params: {
                    required: true,
                    allowedKeys: [
                      {
                        name: "lat",
                        type: ValidationTypes.NUMBER,
                        params: {
                          min: -90,
                          max: 90,
                          default: 0,
                          required: true,
                        },
                      },
                      {
                        name: "long",
                        type: ValidationTypes.NUMBER,
                        params: {
                          min: -180,
                          max: 180,
                          default: 0,
                          required: true,
                        },
                      },
                      {
                        name: "title",
                        type: ValidationTypes.TEXT,
                      },
                      {
                        name: "color",
                        type: ValidationTypes.TEXT,
                      },
                    ],
                  },
                },
              },
            },
            evaluationSubstitutionType:
              EvaluationSubstitutionType.SMART_SUBSTITUTE,
          },
        ],
      },
      {
        sectionName: $t('index.34a23259e3443159'),
        children: [
          {
            propertyName: "zoomLevel",
            label: $t('index.739a17bbe511d274'),
            controlType: "STEP",
            helpText: $t('index.1b9ebb0cb1e8cf06'),
            stepType: "ZOOM_PERCENTAGE",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "isVisible",
            label: $t('index.891f03d6fd118829'),
            helpText: $t('index.455dde9154fc5ae3'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "animateLoading",
            label: $t('index.644f2fc8ff43a19a'),
            controlType: "SWITCH",
            helpText: $t('index.f20c19ea9772fc46'),
            defaultValue: true,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "enablePickLocation",
            label: $t('index.8187ad20a8b35188'),
            helpText: $t('index.36f17a7ed5412c16'),
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "isClickedMarkerCentered",
            label: $t('index.5e2064ad3ce8d59d'),
            helpText:
              $t('index.966c6ecdc9ae9d2e'),
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "allowClustering",
            label: $t('index.16a9866c7f86186d'),
            controlType: "SWITCH",
            helpText: $t('index.c6e39f74837780fb'),
            defaultValue: false,
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "enableSearch",
            label: $t('index.6cb500af564a6ee8'),
            helpText: $t('index.19c1e09ba7894ae3'),
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "enableMapTypeControl",
            label: $t('index.9e18cdccb21805dc'),
            controlType: "SWITCH",
            helpText: $t('index.203f3586d8fcca82'),
            isJSConvertible: false,
            isBindProperty: false,
            isTriggerProperty: false,
          },
        ],
      },
      {
        sectionName: $t('index.0b8e52d3dd01947e'),
        children: [
          {
            propertyName: "enableCreateMarker",
            label: $t('index.92044082864ffd55'),
            helpText: $t('index.85b88284c3a0a9c0'),
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "onCreateMarker",
            label: "onCreateMarker",
            helpText:
              $t('index.03b75b630acb6d96'),
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
            hidden: (props: MapWidgetProps) => {
              return !props.enableCreateMarker;
            },
            dependencies: ["enableCreateMarker"],
          },
        ],
      },
      {
        sectionName: $t('index.df63ce44aa72d266'),
        children: [
          {
            propertyName: "onMarkerClick",
            label: "onMarkerClick",
            helpText: $t('index.a57de79b9a6d3606'),
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
        sectionName: $t('index.56f972f44a74cdae'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.4e5d363ef4c6d5d0'),
            helpText:
              $t('index.bf490f7a7cd1f3c4'),
            controlType: "BORDER_RADIUS_OPTIONS",

            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.2340d04b1f438854'),
            helpText:
              $t('index.ddead989ff2d91f9'),
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
  static getDefaultPropertiesMap(): Record<string, any> {
    return {
      markers: "defaultMarkers",
      center: "mapCenter",
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getMetaPropertiesMap(): Record<string, any> {
    return {
      center: undefined,
      markers: undefined,
      selectedMarker: undefined,
    };
  }
  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
    };
  }

  updateCenter = (lat?: number, long?: number, title?: string) => {
    this.props.updateWidgetMetaProperty("center", { lat, long, title });
  };

  updateMarker = (lat: number, long: number, index: number) => {
    const markers: Array<MarkerProps> = [...(this.props.markers || [])].map(
      (marker, i) => {
        if (index === i) {
          marker = { lat, long };
        }

        return marker;
      },
    );

    this.disableDrag(false);
    this.props.updateWidgetMetaProperty("markers", markers);
  };

  onCreateMarker = (lat?: number, long?: number) => {
    this.disableDrag(true);
    const marker = { lat, long, title: "" };

    const markers = [];

    (this.props.markers || []).forEach((m) => {
      markers.push(m);
    });
    markers.push(marker);
    this.props.updateWidgetMetaProperty("markers", markers);
    this.props.updateWidgetMetaProperty("selectedMarker", marker, {
      triggerPropertyName: "onCreateMarker",
      dynamicString: this.props.onCreateMarker,
      event: {
        type: EventType.ON_CREATE_MARKER,
      },
    });
  };

  unselectMarker = () => {
    this.props.updateWidgetMetaProperty("selectedMarker", undefined);
  };

  onMarkerClick = (lat?: number, long?: number, title?: string) => {
    this.disableDrag(true);
    const selectedMarker = {
      lat: lat,
      long: long,
      title: title,
    };

    this.props.updateWidgetMetaProperty("selectedMarker", selectedMarker, {
      triggerPropertyName: "onMarkerClick",
      dynamicString: this.props.onMarkerClick,
      event: {
        type: EventType.ON_MARKER_CLICK,
      },
    });
  };

  getCenter(): Center {
    return this.props.center || this.props.mapCenter || DefaultCenter;
  }

  componentDidUpdate(prevProps: MapWidgetProps) {
    //remove selectedMarker when map initial location is updated
    if (
      JSON.stringify(prevProps.center) !== JSON.stringify(this.props.center) &&
      this.props.selectedMarker
    ) {
      this.unselectMarker();
    }

    // If initial location was changed
    if (
      JSON.stringify(prevProps.mapCenter) !==
      JSON.stringify(this.props.mapCenter)
    ) {
      this.props.updateWidgetMetaProperty("center", this.props.mapCenter);

      return;
    }

    // If markers were changed
    if (
      this.props.markers &&
      this.props.markers.length > 0 &&
      JSON.stringify(prevProps.markers) !== JSON.stringify(this.props.markers)
    ) {
      this.props.updateWidgetMetaProperty(
        "center",
        this.props.markers[this.props.markers.length - 1],
      );
    }
  }

  enableDrag = () => {
    this.disableDrag(false);
  };

  getWidgetView() {
    return (
      <>
        {!this.props.googleMapsApiKey && (
          <DisabledContainer
            borderRadius={this.props.borderRadius}
            boxShadow={this.props.boxShadow}
          >
            <h1>{$t('index.05e01b8221d3ffc9')}</h1>
            <mark>Key: x{this.props.googleMapsApiKey}x</mark>
            <p>{"Map widget requires a Google Maps API key"}</p>
            <p>
              {$t('index.f8de31e4084992ae')}
              <a
                href="https://docs.appsmith.com/getting-started/setup/instance-configuration/google-maps"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" documentation "}
              </a>
              {$t('index.54eec5e1d68a3fbe')}
            </p>
          </DisabledContainer>
        )}
        {this.props.googleMapsApiKey && (
          <MapComponent
            allowClustering={this.props.allowClustering}
            allowZoom={this.props.allowZoom}
            apiKey={this.props.googleMapsApiKey}
            borderRadius={this.props.borderRadius}
            boxShadow={this.props.boxShadow}
            center={this.getCenter()}
            clickedMarkerCentered={this.props.isClickedMarkerCentered}
            enableCreateMarker={this.props.enableCreateMarker}
            enableDrag={this.enableDrag}
            enableMapTypeControl={this.props.enableMapTypeControl}
            enablePickLocation={this.props.enablePickLocation}
            enableSearch={this.props.enableSearch}
            isDisabled={this.props.isDisabled}
            isVisible={this.props.isVisible}
            markers={this.props.markers}
            saveMarker={this.onCreateMarker}
            selectMarker={this.onMarkerClick}
            selectedMarker={this.props.selectedMarker}
            unselectMarker={this.unselectMarker}
            updateCenter={this.updateCenter}
            updateMarker={this.updateMarker}
            widgetId={this.props.widgetId}
            zoomLevel={this.props.zoomLevel}
          />
        )}
      </>
    );
  }
}

export interface MapWidgetProps extends WidgetProps {
  googleMapsApiKey?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  enableSearch: boolean;
  zoomLevel: number;
  allowZoom: boolean;
  enablePickLocation: boolean;
  mapCenter: {
    lat: number;
    long: number;
    title?: string;
  };
  center?: {
    lat: number;
    long: number;
  };
  defaultMarkers?: Array<MarkerProps>;
  markers?: Array<MarkerProps>;
  selectedMarker?: {
    lat: number;
    long: number;
    title?: string;
    color?: string;
  };
  onMarkerClick?: string;
  onCreateMarker?: string;
  borderRadius: string;
  boxShadow?: string;
  allowClustering?: boolean;
  enableMapTypeControl: boolean;
}

export default MapWidget;
