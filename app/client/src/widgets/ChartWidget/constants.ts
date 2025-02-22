import {$t} from "locale/index";
import { Colors } from "constants/Colors";

export type ChartType =
  | "LINE_CHART"
  | "BAR_CHART"
  | "PIE_CHART"
  | "COLUMN_CHART"
  | "AREA_CHART"
  | "SCATTER_CHART"
  | "CUSTOM_ECHART"
  | "CUSTOM_FUSION_CHART";

export const XAxisCategory = $t('constants.36b9e952a5576ada');
export interface ChartDataPoint {
  x: number | string;
  y: number | string;
}

export interface LongestLabelParams {
  x: string;
  y: string;
}

export interface ChartData {
  seriesName?: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface CustomFusionChartConfig {
  type: string;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource?: any;
}

export interface AllChartData {
  [key: string]: ChartData;
}

export interface ChartSelectedDataPoint {
  x: unknown | undefined;
  y: unknown | undefined;
  seriesTitle: string | undefined;
  rawEventData?: Record<string, unknown>;
}

// export type IFrameChartWidgetEventTypes = "click-event" | "load-complete" | "error"

export interface CustomEChartClickEventData {
  event: echarts.ECElementEvent; // Record<string, unknown>
}
export interface CustomEChartErrorData {
  message: string;
  stack: string;
}

export interface CustomEChartIFrameMessageData {
  options: Record<string, unknown>;
  shouldUpdateOptions: boolean;
  shouldResize: boolean;
  width: number;
  height: number;
}

export interface CustomEChartIFrameMessage {
  type: "click-event" | "load-complete" | "error" | "update-options";
  data:
    | CustomEChartClickEventData
    | CustomEChartIFrameMessageData
    | CustomEChartErrorData
    | Record<string, unknown>;
}

export const messages = {
  ErrorTitle: $t('constants.a55130f58afde0b8'),
  MoreDetails: $t('constants.4cfab18999a50d43'),
  EmptyData: $t('constants.4756d4460142adc2'),
  Undefined: $t('constants.e71e676180f134a3'),
  customFusionChartDeprecationMessage:
    $t('constants.10807741bf54dc3e'),
  customFusionChartOptionLabel: (showDeprecationMessage: boolean) => {
    return showDeprecationMessage
      ? $t('constants.98374026c3790f6c')
      : $t('constants.b51218d48608afcc');
  },
};

export const CUSTOM_CHART_TYPES = [
  "area2d",
  "bar2d",
  "bar3d",
  "boxandwhisker2d",
  "candlestick",
  "chord",
  "dragnode",
  "dragarea",
  "dragcolumn2d",
  "dragline",
  "errorbar2d",
  "errorline",
  "errorscatter",
  "funnel",
  "gantt",
  "heatmap",
  "hbullet",
  "hled",
  "InverseMSArea",
  "InverseMSColumn2D",
  "InverseMSLine",
  "LogMSColumn2D",
  "LogMSLine",
  "MultiAxisLine",
  "multilevelpie",
  "overlappedcolumn2d",
  "overlappedbar2d",
  "pyramid",
  "radar",
  "angulargauge",
  "realtimearea",
  "bulb",
  "realtimecolumn",
  "cylinder",
  "hlineargauge",
  "realtimeline",
  "realtimelinedy",
  "realtimestackedarea",
  "realtimestackedcolumn",
  "thermometer",
  "sankey",
  "selectscatter",
  "sparkcolumn",
  "sparkline",
  "sparkwinloss",
  "msstepline",
  "sunburst",
  "treemap",
  "vbullet",
  "vled",
  "waterfall2d",
  "zoomline",
  "zoomlinedy",
  "zoomscatter",
  "column2d",
  "column3d",
  "line",
  "area",
  "bar2d",
  "bar3d",
  "pie2d",
  "pie3d",
  "doughnut2d",
  "doughnut3d",
  "pareto2d",
  "pareto3d",
  "scrollcombidy2d",
  "scrollcombi2d",
  "scrollstackedcolumn2d",
  "scrollmsstackedcolumn2d",
  "scrollmsstackedcolumn2dlinedy",
  "scrollstackedbar2d",
  "scrollarea2d",
  "scrollline2d",
  "scrollcolumn2d",
  "scrollbar2d",
  "bubble",
  "scatter",
  "msstackedcolumn2d",
  "stackedarea2d",
  "stackedbar3d",
  "stackedbar2d",
  "stackedcolumn3d",
  "stackedcolumn2d",
  "msstackedcolumn2dlinedy",
  "stackedcolumn3dlinedy",
  "mscolumn3dlinedy",
  "mscombidy2d",
  "mscombidy3d",
  "stackedcolumn3dline",
  "stackedcolumn2dline",
  "mscolumnline3d",
  "mscombi3d",
  "mscombi2d",
  "marimekko",
  "MSArea",
  "msbar3d",
  "msbar2d",
  "msline",
  "mscolumn3d",
  "mscolumn2d",
  "spline",
  "splinearea",
  "msspline",
  "mssplinedy",
  "mssplinearea",
  "stackedcolumn2dlinedy",
  "stackedarea2dlinedy",
];

export enum LabelOrientation {
  AUTO = "auto",
  SLANT = "slant",
  ROTATE = "rotate",
  STAGGER = "stagger",
}

export const LABEL_ORIENTATION_COMPATIBLE_CHARTS = [
  "LINE_CHART",
  "AREA_CHART",
  "COLUMN_CHART",
];

export const DefaultEChartConfig = {
  dataset: {
    source: [
      [$t('constants.230fdd1c9b22aff8'), $t('constants.f7b89d3f915a9634'), "Google", $t('constants.8a3c1fdc960d6a6b')],
      [$t('constants.35ea5f047a94ae1c'), 620, 120, 60],
      [$t('constants.c328466a9b01fe3b'), 732, 132, 72],
      [$t('constants.3852a8da29be274c'), 701, 101, 71],
      [$t('constants.aebadfc793eca093'), 734, 134, 74],
      [$t('constants.8860ffebc29896ae'), 1090, 290, 190],
      [$t('constants.466cba2f4ebe5575'), 1130, 230, 130],
      [$t('constants.a855a0279661ed74'), 1120, 220, 110],
    ],
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  title: {
    text: $t('constants.163fce7c35608084'),
    left: "center",
    textStyle: {
      width: 200,
      overflow: "truncate",
    },
  },
  legend: {
    top: 40,
    type: "scroll",
  },
  grid: {
    left: 15,
    right: 15,
    bottom: 30,
    top: 100,
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      type: "bar",
      stack: $t('constants.4fc7892979c12d5d'),
    },
    {
      type: "bar",
      stack: $t('constants.4fc7892979c12d5d'),
    },
    {
      type: "bar",
      stack: $t('constants.4fc7892979c12d5d'),
    },
  ],
};

export const DefaultEChartsBasicChartsData = {
  seriesName: "2023",
  data: [
    {
      x: "Product1",
      y: 20000,
    },
    {
      x: "Product2",
      y: 22000,
    },
    {
      x: "Product3",
      y: 32000,
    },
  ],
};

export const DefaultFusionChartConfig = {
  type: "column2d",
  dataSource: {
    data: [
      {
        label: "Product1",
        value: 20000,
      },
      {
        label: "Product2",
        value: 22000,
      },
      {
        label: "Product3",
        value: 32000,
      },
    ],
    chart: {
      caption: $t('constants.5a203ec6bb743f0d'),
      xAxisName: $t('constants.4771122aef7d6cc6'),
      yAxisName: $t('constants.77b9509267f61130'),
      theme: "fusion",
      alignCaptionWithCanvas: 1,
      // Caption styling =======================
      captionFontSize: "24",
      captionAlignment: "center",
      captionPadding: "20",
      captionFontColor: Colors.THUNDER,
      // legend position styling ==========
      legendIconSides: "4",
      legendIconBgAlpha: "100",
      legendIconAlpha: "100",
      legendPosition: "top",
      // Canvas styles ========
      canvasPadding: "0",
      // Chart styling =======
      chartLeftMargin: "20",
      chartTopMargin: "10",
      chartRightMargin: "40",
      chartBottomMargin: "10",
      // Axis name styling ======
      xAxisNameFontSize: "14",
      labelFontSize: "12",
      labelFontColor: Colors.DOVE_GRAY2,
      xAxisNameFontColor: Colors.DOVE_GRAY2,

      yAxisNameFontSize: "14",
      yAxisValueFontSize: "12",
      yAxisValueFontColor: Colors.DOVE_GRAY2,
      yAxisNameFontColor: Colors.DOVE_GRAY2,
    },
  },
};
