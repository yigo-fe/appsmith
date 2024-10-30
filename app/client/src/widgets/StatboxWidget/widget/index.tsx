import {$t} from "locale/index";
import { ContainerWidget } from "widgets/ContainerWidget/widget";
import { ValidationTypes } from "constants/WidgetValidation";
import type { SetterConfig, Stylesheet } from "entities/AppTheming";
import type { DerivedPropertiesMap } from "WidgetProvider/factory";
import {
  FlexVerticalAlignment,
  Positioning,
} from "layoutSystems/common/utils/constants";
import { ReduxActionTypes } from "ee/constants/ReduxActionConstants";
import { DefaultAutocompleteDefinitions } from "widgets/WidgetUtils";
import type {
  AnvilConfig,
  AutocompletionDefinitions,
} from "WidgetProvider/constants";
import { ButtonVariantTypes } from "components/constants";
import { Colors } from "constants/Colors";
import {
  FlexLayerAlignment,
  ResponsiveBehavior,
} from "layoutSystems/common/utils/constants";
import { GridDefaults, WIDGET_TAGS } from "constants/WidgetConstants";
import type { WidgetProps } from "widgets/BaseWidget";
import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import type { FlattenedWidgetProps } from "WidgetProvider/constants";
import { BlueprintOperationTypes } from "WidgetProvider/constants";
import get from "lodash/get";
import type { CanvasWidgetsReduxState } from "reducers/entityReducers/canvasWidgetsReducer";
import { DynamicHeight } from "utils/WidgetFeatures";
import { getWidgetBluePrintUpdates } from "utils/WidgetBlueprintUtils";
import type { FlexLayer } from "layoutSystems/autolayout/utils/types";
import type { LayoutProps } from "layoutSystems/anvil/utils/anvilTypes";
import { statBoxPreset } from "layoutSystems/anvil/layoutComponents/presets/StatboxPreset";
import { LayoutSystemTypes } from "layoutSystems/types";

class StatboxWidget extends ContainerWidget {
  static type = "STATBOX_WIDGET";

  static getConfig() {
    return {
      name: $t('index.132a033c0146aec2'),
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      tags: [WIDGET_TAGS.DISPLAY],
      needsMeta: true,
      searchTags: ["statbox"],
      isCanvas: true,
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

  static getMethods() {
    return {
      getCanvasHeightOffset: (props: WidgetProps): number => {
        const offset =
          props.borderWidth && props.borderWidth > 1
            ? Math.ceil(
                (2 * parseInt(props.borderWidth, 10) || 0) /
                  GridDefaults.DEFAULT_GRID_ROW_HEIGHT,
              )
            : 0;

        return offset;
      },
    };
  }

  static getDefaults() {
    return {
      rows: 14,
      columns: 22,
      animateLoading: true,
      widgetName: "Statbox",
      backgroundColor: "white",
      borderWidth: "1",
      borderColor: Colors.GREY_5,
      children: [],
      positioning: Positioning.Fixed,
      responsiveBehavior: ResponsiveBehavior.Fill,
      flexVerticalAlignment: FlexVerticalAlignment.Stretch,
      blueprint: {
        view: [
          {
            type: "CANVAS_WIDGET",
            position: { top: 0, left: 0 },
            props: {
              containerStyle: "none",
              canExtend: false,
              detachFromLayout: true,
              children: [],
              version: 1,
              blueprint: {
                view: [
                  {
                    type: "TEXT_WIDGET",
                    size: {
                      rows: 4,
                      cols: 36,
                    },
                    position: { top: 0, left: 1 },
                    props: {
                      text: $t('index.a970ea3a75c9d843'),
                      fontSize: "0.875rem",
                      textColor: "#999999",
                      version: 1,
                    },
                  },
                  {
                    type: "TEXT_WIDGET",
                    size: {
                      rows: 4,
                      cols: 36,
                    },
                    position: {
                      top: 4,
                      left: 1,
                    },
                    props: {
                      text: "2.6 M",
                      fontSize: "1.25rem",
                      fontStyle: "BOLD",
                      version: 1,
                    },
                  },
                  {
                    type: "ICON_BUTTON_WIDGET",
                    size: {
                      rows: 8,
                      cols: 16,
                    },
                    position: {
                      top: 2,
                      left: 46,
                    },
                    props: {
                      iconName: "arrow-top-right",
                      buttonStyle: "PRIMARY",
                      buttonVariant: ButtonVariantTypes.PRIMARY,
                      version: 1,
                    },
                  },
                  {
                    type: "TEXT_WIDGET",
                    size: {
                      rows: 4,
                      cols: 36,
                    },
                    position: {
                      top: 8,
                      left: 1,
                    },
                    props: {
                      text: "21% more than last month",
                      fontSize: "0.875rem",
                      textColor: Colors.GREEN,
                      version: 1,
                    },
                  },
                ],
              },
            },
          },
        ],
        operations: [
          {
            type: BlueprintOperationTypes.MODIFY_PROPS,
            fn: (
              widget: FlattenedWidgetProps,
              widgets: CanvasWidgetsReduxState,
              parent: FlattenedWidgetProps,
              layoutSystemType: LayoutSystemTypes,
            ) => {
              if (layoutSystemType === LayoutSystemTypes.FIXED) {
                return [];
              }

              //get Canvas Widget
              const canvasWidget: FlattenedWidgetProps = get(
                widget,
                "children.0",
              );

              //get Children Ids of the StatBox
              const childrenIds: string[] = get(widget, "children.0.children");

              //get Children props of the StatBox
              const children: FlattenedWidgetProps[] = childrenIds.map(
                (childId) => widgets[childId],
              );

              //get the Text Widgets
              const textWidgets = children.filter(
                (child) => child.type === "TEXT_WIDGET",
              );

              //get all the Icon button Widgets
              const iconWidget = children.filter(
                (child) => child.type === "ICON_BUTTON_WIDGET",
              )?.[0];

              //Create flex layer object based on the children
              const flexLayers: FlexLayer[] = [
                {
                  children: [
                    {
                      id: textWidgets[0].widgetId,
                      align: FlexLayerAlignment.Start,
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: textWidgets[1].widgetId,
                      align: FlexLayerAlignment.Start,
                    },
                    {
                      id: iconWidget.widgetId,
                      align: FlexLayerAlignment.End,
                    },
                  ],
                },
                {
                  children: [
                    {
                      id: textWidgets[2].widgetId,
                      align: FlexLayerAlignment.Start,
                    },
                  ],
                },
              ];

              const layout: LayoutProps[] = statBoxPreset(
                textWidgets[0].widgetId,
                textWidgets[1].widgetId,
                textWidgets[2].widgetId,
                iconWidget.widgetId,
              );

              //create properties to be updated
              return getWidgetBluePrintUpdates({
                [widget.widgetId]: {
                  dynamicHeight: DynamicHeight.AUTO_HEIGHT,
                },
                [canvasWidget.widgetId]: {
                  flexLayers,
                  useAutoLayout: true,
                  positioning: Positioning.Vertical,
                  layout,
                },
                [textWidgets[0].widgetId]: {
                  responsiveBehavior: ResponsiveBehavior.Fill,
                  alignment: FlexLayerAlignment.Start,
                  rightColumn: GridDefaults.DEFAULT_GRID_COLUMNS,
                },
                [textWidgets[1].widgetId]: {
                  responsiveBehavior: ResponsiveBehavior.Fill,
                  alignment: FlexLayerAlignment.Start,
                  rightColumn: GridDefaults.DEFAULT_GRID_COLUMNS - 16,
                },
                [textWidgets[2].widgetId]: {
                  responsiveBehavior: ResponsiveBehavior.Fill,
                  alignment: FlexLayerAlignment.Start,
                  rightColumn: GridDefaults.DEFAULT_GRID_COLUMNS,
                },
                [iconWidget.widgetId]: {
                  responsiveBehavior: ResponsiveBehavior.Hug,
                  alignment: FlexLayerAlignment.End,
                  topRow: 4,
                  bottomRow: 8,
                  leftColumn: GridDefaults.DEFAULT_GRID_COLUMNS - 16,
                  rightColumn: GridDefaults.DEFAULT_GRID_COLUMNS,
                },
              });
            },
          },
        ],
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
              minHeight: "50px",
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
        minHeight: { base: "50px" },
        minWidth: { base: "280px" },
      },
    };
  }

  static getPropertyPaneContentConfig() {
    return [
      {
        sectionName: $t('index.3626a40fa1376ea5'),
        children: [
          {
            propertyName: "isVisible",
            helpText: $t('index.92b6ea33e9f29ab8'),
            label: $t('index.28a7b1b19277088f'),
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
          {
            propertyName: "shouldScrollContents",
            helpText: $t('index.3974bf88d59fe6cd'),
            label: $t('index.7024aeca401c3c36'),
            controlType: "SWITCH",
            isBindProperty: false,
            isTriggerProperty: false,
          },
          {
            propertyName: "animateLoading",
            label: $t('index.98f530552fad0730'),
            controlType: "SWITCH",
            helpText: $t('index.be95904a00c6c28a'),
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

  static getPropertyPaneStyleConfig() {
    return [
      {
        sectionName: $t('index.032d09d6fb3d1089'),
        children: [
          {
            propertyName: "backgroundColor",
            helpText: $t('index.cdccc63ef0d27bb8'),
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            label: $t('index.158bdbe1147448a8'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "borderColor",
            helpText: $t('index.cdccc63ef0d27bb8'),
            placeholderText: "#FFFFFF / Gray / rgb(255, 99, 71)",
            label: $t('index.6ca2680dd29eb2ff'),
            controlType: "COLOR_PICKER",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
        ],
      },
      {
        sectionName: $t('index.c8f1128d4f35885f'),
        children: [
          {
            propertyName: "borderWidth",
            helpText: $t('index.56a9111604f1fd32'),
            label: $t('index.14ac72c24caea62f'),
            placeholderText: $t('index.83e0e029c6dedc57'),
            controlType: "INPUT_TEXT",
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.NUMBER },
            postUpdateAction: ReduxActionTypes.CHECK_CONTAINERS_FOR_AUTO_HEIGHT,
          },
          {
            propertyName: "borderRadius",
            label: $t('index.688cac538c2b525f'),
            helpText:
              $t('index.e6d3f84bc37e6e1a'),
            controlType: "BORDER_RADIUS_OPTIONS",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.TEXT },
          },
          {
            propertyName: "boxShadow",
            label: $t('index.86f1d15bdaec6bc7'),
            helpText:
              $t('index.1b8f45f45f2fa111'),
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

  static getAutocompleteDefinitions(): AutocompletionDefinitions {
    return {
      "!doc": $t('index.4f6025443ed14485'),
      "!url": "https://docs.appsmith.com/widget-reference/stat-box",
      isVisible: DefaultAutocompleteDefinitions.isVisible,
    };
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return { positioning: Positioning.Fixed };
  }
}

export interface StatboxWidgetProps {
  backgroundColor: string;
}

export default StatboxWidget;
