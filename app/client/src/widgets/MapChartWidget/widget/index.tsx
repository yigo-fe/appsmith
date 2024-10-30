import {$t} from "locale/index";
import React, { Suspense, lazy } from "react";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import { retryPromise } from "utils/AppsmithUtils";
import { AutocompleteDataType } from "utils/autocomplete/AutocompleteDataType";
import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";
import type { MapColorObject } from "../constants";
import {
  dataSetForAfrica,
  dataSetForAsia,
  dataSetForEurope,
  dataSetForNorthAmerica,
  dataSetForOceania,
  dataSetForSouthAmerica,
  dataSetForUSA,
  dataSetForWorld,
  dataSetForWorldWithAntarctica,
  MapTypes,
} from "../constants";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
  WidgetCallout,
} from "WidgetProvider/constants";
import { FILL_WIDGET_MIN_WIDTH } from "constants/minWidthConstants";
import {
  FlexVerticalAlignment,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import Skeleton from "components/utils/Skeleton";
import type { MapType } from "../component/types";

const MapChartComponent = lazy(async () =>
  retryPromise(
    async () => import(/* webpackChunkName: "mapCharts" */ "../component"),
  ),
);

// TODO: Fix this the next time the file is edited
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataSetMapping: Record<MapType, any> = {
  [MapTypes.WORLD]: dataSetForWorld,
  [MapTypes.WORLD_WITH_ANTARCTICA]: dataSetForWorldWithAntarctica,
  [MapTypes.EUROPE]: dataSetForEurope,
  [MapTypes.NORTH_AMERICA]: dataSetForNorthAmerica,
  [MapTypes.SOURTH_AMERICA]: dataSetForSouthAmerica,
  [MapTypes.ASIA]: dataSetForAsia,
  [MapTypes.OCEANIA]: dataSetForOceania,
  [MapTypes.AFRICA]: dataSetForAfrica,
  [MapTypes.USA]: dataSetForUSA,
};

// A hook to update the corresponding dataset when map type is changed
const updateDataSet = (
  props: MapChartWidgetProps,
  propertyPath: string,
  propertyValue: MapType,
) => {
  const propertiesToUpdate = [
    { propertyPath, propertyValue },
    {
      propertyPath: "data",
      propertyValue: dataSetMapping[propertyValue],
    },
  ];

  return propertiesToUpdate;
};

class MapChartWidget extends BaseWidget<MapChartWidgetProps, WidgetState> {
  static type = "MAP_CHART_WIDGET";

  static getConfig() {
    return {
      name: $t('index.2abddbd244811888'), // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.DISPLAY],
      needsMeta: true, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      searchTags: ["graph", "visuals", "visualisations"],
    };
  }

  static getDefaults() {
    return {
      rows: 32,
      columns: 24,
      widgetName: "MapChart",
      version: 1,
      mapType: MapTypes.WORLD,
      mapTitle: $t('index.65e228a8ce0e9385'),
      showLabels: true,
      data: dataSetForWorld,
      colorRange: [
        {
          minValue: 0.5,
          maxValue: 1.0,
          code: "#FFD74D",
        },
        {
          minValue: 1.0,
          maxValue: 2.0,
          code: "#FB8C00",
        },
        {
          minValue: 2.0,
          maxValue: 3.0,
          code: "#E65100",
        },
      ],
      responsiveBehavior: ResponsiveBehavior.Fill,
      flexVerticalAlignment: FlexVerticalAlignment.Top,
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
      "!doc":
        $t('index.eba99ca7d8e09d3c'),
      "!url": "https://docs.appsmith.com/widget-reference/map-chart",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
      selectedDataPoint: {
        id: "string",
        label: "string",
        originalId: "string",
        shortLabel: "string",
        value: "number",
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
        sectionName: $t('index.52a0dfc53814028f'),
        children: [
          {
            helpText: $t('index.6d3ff98a832fc3f5'),
            propertyName: "mapType",
            label: $t('index.d0adf5772d457c30'),
            controlType: "DROP_DOWN",
            options: [
              {
                label: $t('index.d36b3bd6b1d48aae'),
                value: MapTypes.WORLD,
              },
              {
                label: $t('index.4a7d97c365f1b7c2'),
                value: MapTypes.WORLD_WITH_ANTARCTICA,
              },
              {
                label: $t('index.6b7b253523f7a35e'),
                value: MapTypes.EUROPE,
              },
              {
                label: $t('index.b37189e900698de1'),
                value: MapTypes.NORTH_AMERICA,
              },
              {
                label: $t('index.2263b30dc6ae7e82'),
                value: MapTypes.SOURTH_AMERICA,
              },
              {
                label: $t('index.4e9288a5849f969e'),
                value: MapTypes.ASIA,
              },
              {
                label: $t('index.f82d48c7e66fc882'),
                value: MapTypes.OCEANIA,
              },
              {
                label: $t('index.e36f00fc068dcb13'),
                value: MapTypes.AFRICA,
              },
              {
                label: "USA",
                value: MapTypes.USA,
              },
            ],
            isJSconvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            updateHook: updateDataSet,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: [
                  MapTypes.WORLD,
                  MapTypes.WORLD_WITH_ANTARCTICA,
                  MapTypes.EUROPE,
                  MapTypes.NORTH_AMERICA,
                  MapTypes.SOURTH_AMERICA,
                  MapTypes.ASIA,
                  MapTypes.OCEANIA,
                  MapTypes.AFRICA,
                  MapTypes.USA,
                ],
              },
            },
          },
          {
            helpText: $t('index.79d8e3e3675ae94a'),
            propertyName: "data",
            label: $t('index.63912d8d827dedd8'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: {
                unique: true,
                children: {
                  type: ValidationTypes.OBJECT,
                  params: {
                    required: true,
                    allowedKeys: [
                      {
                        name: "id",
                        type: ValidationTypes.TEXT,
                        params: {
                          unique: true,
                          required: true,
                        },
                      },
                      {
                        name: "value",
                        type: ValidationTypes.TEXT,
                        params: {
                          required: true,
                        },
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
        sectionName: $t('index.ae132ce1cdacfeaa'),
        children: [
          {
            helpText: $t('index.823f39563fc1ab00'),
            placeholderText: $t('index.73267fec2b493313'),
            propertyName: "mapTitle",
            label: $t('index.ae3a1a42f3e03604'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "isVisible",
            label: $t('index.9b1a402204976d09'),
            helpText: $t('index.24202ed43d289be2'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "showLabels",
            label: $t('index.ed724b1c48f5064e'),
            helpText: $t('index.008940c41bf56777'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
      },
      {
        sectionName: $t('index.ba7264223c9e1214'),
        children: [
          {
            helpText: $t('index.aa512094dbc03101'),
            propertyName: "onDataPointClick",
            label: "onDataPointClick",
            controlType: "ACTION_SELECTOR",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: true,
            additionalAutoComplete: () => ({
              selectedDataPoint: {
                value: 1.1,
                label: "",
                shortLabel: "",
                originalId: "",
                id: "",
              },
            }),
          },
        ],
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.ae132ce1cdacfeaa'),
        children: [
          {
            helpText:
              $t('index.2832319177b95ec8'),
            propertyName: "colorRange",
            label: $t('index.74d1cac36a227432'),
            controlType: "INPUT_TEXT",
            placeholderText: $t('index.4183acf0e45d396a'),
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.ARRAY,
              params: {
                unique: true,
                children: {
                  type: ValidationTypes.OBJECT,
                  params: {
                    allowedKeys: [
                      {
                        name: "minValue",
                        type: ValidationTypes.NUMBER,
                        params: {
                          required: true,
                        },
                      },
                      {
                        name: "maxValue",
                        type: ValidationTypes.NUMBER,
                        params: {
                          required: true,
                        },
                      },
                      {
                        name: "displayValue",
                        type: ValidationTypes.TEXT,
                      },
                      {
                        name: "code",
                        type: ValidationTypes.TEXT,
                        params: {
                          expected: {
                            type: $t('index.2bc2949f12f825db'),
                            example: "#FF04D7",
                            autocompleteDataType: AutocompleteDataType.STRING,
                          },
                        },
                      },
                      {
                        name: "alpha",
                        type: ValidationTypes.NUMBER,
                        params: {
                          min: 0,
                          max: 100,
                        },
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
        sectionName: $t('index.6209db0f561270c9'),
        children: [
          {
            propertyName: "borderRadius",
            label: $t('index.ed843f5584d2a31f'),
            helpText:
              $t('index.1aa65c03901a977c'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.db3a0e7b0db40288'),
            helpText:
              $t('index.f1d1f7231f7c1cc0'),
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
      selectedDataPoint: undefined,
    };
  }

  static getStylesheetConfig(): Stylesheet {
    return {
      borderRadius: "{{appsmith.theme.borderRadius.appBorderRadius}}",
      boxShadow: "{{appsmith.theme.boxShadow.appBoxShadow}}",
      fontFamily: "{{appsmith.theme.fontFamily.appFont}}",
    };
  }

  static getMethods() {
    return {
      getEditorCallouts(): WidgetCallout[] {
        return [
          {
            message:
              $t('index.5a210cdc4c49ac89'),
          },
        ];
      },
    };
  }

  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDataPointClick = (data: any) => {
    const { onDataPointClick } = this.props;

    this.props.updateWidgetMetaProperty("selectedDataPoint", data, {
      triggerPropertyName: "onDataPointClick",
      dynamicString: onDataPointClick,
      event: {
        type: EventType.ON_DATA_POINT_CLICK,
      },
      globalContext: {
        selectedDataPoint: data,
      },
    });
  };

  getWidgetView() {
    const { colorRange, data, isVisible, mapTitle, mapType, showLabels } =
      this.props;

    return (
      <Suspense fallback={<Skeleton />}>
        <MapChartComponent
          borderRadius={this.props.borderRadius}
          boxShadow={this.props.boxShadow}
          caption={mapTitle || ""}
          colorRange={colorRange}
          data={data}
          fontFamily={this.props.fontFamily ?? $t('index.1879b1421372ae17')}
          height={this.props.componentHeight}
          isVisible={isVisible}
          onDataPointClick={this.handleDataPointClick}
          showLabels={showLabels}
          type={mapType}
          width={this.props.componentWidth}
        />
      </Suspense>
    );
  }
}

export interface MapChartWidgetProps extends WidgetProps {
  mapTitle?: string;
  mapType: MapType;
  onDataPointClick?: string;
  showLabels: boolean;
  colorRange: MapColorObject[];
  borderRadius?: string;
  boxShadow?: string;
  fontFamily?: string;
}

export default MapChartWidget;
