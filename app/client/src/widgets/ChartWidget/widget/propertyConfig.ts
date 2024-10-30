import {$t} from "locale/index";
import { ValidationTypes } from "constants/WidgetValidation";
import { EvaluationSubstitutionType } from "entities/DataTree/dataTreeFactory";
import type { ChartWidgetProps } from "widgets/ChartWidget/widget";
import {
  CUSTOM_CHART_TYPES,
  LabelOrientation,
  LABEL_ORIENTATION_COMPATIBLE_CHARTS,
} from "../constants";
import type { WidgetProps } from "widgets/BaseWidget";

export const isLabelOrientationApplicableFor = (chartType: string) =>
  LABEL_ORIENTATION_COMPATIBLE_CHARTS.includes(chartType);

const labelOptions = () => {
  const options = [
    {
      label: $t('propertyConfig.7496d4209021d5fa'),
      value: "LINE_CHART",
    },
    {
      label: $t('propertyConfig.5301ad96224a87df'),
      value: "BAR_CHART",
    },
    {
      label: $t('propertyConfig.bb8b71a45f9ed6af'),
      value: "PIE_CHART",
    },
    {
      label: $t('propertyConfig.fa9596ad85ed92e8'),
      value: "COLUMN_CHART",
    },
    {
      label: $t('propertyConfig.783b54bce750ab55'),
      value: "AREA_CHART",
    },
    {
      label: $t('propertyConfig.2358ce791baa8d57'),
      value: "CUSTOM_ECHART",
    },
    {
      label: $t('propertyConfig.559a8b29cd5f9398'),
      value: "CUSTOM_FUSION_CHART",
    },
  ];

  return options;
};

export const contentConfig = () => {
  return [
    {
      sectionName: $t('propertyConfig.6c24328045f10875'),
      children: [
        {
          helpText: $t('propertyConfig.a4d57d622b520076'),
          propertyName: "chartType",
          label: $t('propertyConfig.adf370928fcab16b'),
          controlType: "DROP_DOWN",
          options: labelOptions(),
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.TEXT,
            params: {
              allowedValues: [
                "LINE_CHART",
                "BAR_CHART",
                "PIE_CHART",
                "COLUMN_CHART",
                "AREA_CHART",
                "CUSTOM_ECHART",
                "CUSTOM_FUSION_CHART",
              ],
            },
          },
        },
        {
          helpText: "Configure a custom ECHART see docs.appsmith.com",
          placeholderText: $t('propertyConfig.11f9f8c7f4ffe187'),
          propertyName: "customEChartConfig",
          label: $t('propertyConfig.11f9f8c7f4ffe187'),
          controlType: "WRAPPED_CODE_EDITOR",
          controlConfig: {
            wrapperCode: {
              prefix: "{{ ((chartType) => ( ",
              suffix: (widget: WidgetProps) =>
                `))(${widget.widgetName}.chartType) }}`,
            },
          },
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.OBJECT_WITH_FUNCTION,
            params: {
              default: {},
            },
          },
          hidden: (props: ChartWidgetProps) =>
            props.chartType !== "CUSTOM_ECHART",
          dependencies: ["chartType"],
        },
        {
          helpText: "Configure a custom FusionChart see docs.appsmith.com",
          placeholderText: $t('propertyConfig.ade2e367b8bcdb1d'),
          propertyName: "customFusionChartConfig",
          label: $t('propertyConfig.0e02c07840112acc'),
          controlType: "INPUT_TEXT",
          isBindProperty: true,
          isTriggerProperty: false,
          validation: {
            type: ValidationTypes.OBJECT,
            params: {
              default: {},
              allowedKeys: [
                {
                  type: ValidationTypes.TEXT,
                  name: "type",
                  params: {
                    allowedValues: CUSTOM_CHART_TYPES,
                    default: "",
                    required: true,
                  },
                },
                {
                  type: ValidationTypes.OBJECT,
                  name: "dataSource",
                  params: {
                    required: true,
                    ignoreCase: false,
                    allowedKeys: [
                      {
                        name: "chart",
                        type: ValidationTypes.OBJECT,
                        params: {
                          allowedKeys: [
                            {
                              name: "paletteColors",
                              type: ValidationTypes.TEXT,
                              params: {
                                strict: true,
                                ignoreCase: true,
                              },
                            },
                          ],
                          default: {},
                        },
                      },
                      {
                        name: "data",
                        type: ValidationTypes.ARRAY,
                        params: {
                          default: [],
                          children: {
                            type: ValidationTypes.OBJECT,
                            params: {
                              allowedKeys: [
                                {
                                  name: "label",
                                  type: ValidationTypes.TEXT,
                                },
                                {
                                  name: "value",
                                  type: ValidationTypes.NUMBER,
                                },
                              ],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          hidden: (props: ChartWidgetProps) =>
            props.chartType !== "CUSTOM_FUSION_CHART",
          dependencies: ["chartType"],
          evaluationSubstitutionType:
            EvaluationSubstitutionType.SMART_SUBSTITUTE,
        },
        {
          helpText: $t('propertyConfig.ac1ea58de4dd0d30'),
          propertyName: "chartData",
          placeholderText: '[{ "x": "2021", "y": "94000" }]',
          label: $t('propertyConfig.4c72ec43831f88c2'),
          controlType: "CHART_DATA",
          isBindProperty: false,
          isTriggerProperty: false,
          hidden: (props: ChartWidgetProps) =>
            ["CUSTOM_FUSION_CHART", "CUSTOM_ECHART"].includes(props.chartType),
          dependencies: ["chartType"],
          children: [
            {
              helpText: $t('propertyConfig.fe923717e5432418'),
              propertyName: "data",
              label: $t('propertyConfig.fe923717e5432418'),
              controlType: "INPUT_TEXT_AREA",
              isBindProperty: true,
              isTriggerProperty: false,
              validation: {
                type: ValidationTypes.ARRAY,
                params: {
                  default: [],
                  children: {
                    type: ValidationTypes.OBJECT,
                    params: {
                      required: true,
                      allowedKeys: [
                        {
                          name: "x",
                          type: ValidationTypes.TEXT,
                          params: {
                            required: true,
                            default: "",
                          },
                        },
                        {
                          name: "y",
                          type: ValidationTypes.NUMBER,
                          params: {
                            required: true,
                            default: 10,
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
            {
              helpText: $t('propertyConfig.0175b68747cf4445'),
              propertyName: "seriesName",
              label: $t('propertyConfig.0175b68747cf4445'),
              controlType: "INPUT_TEXT",
              isBindProperty: true,
              isTriggerProperty: false,
              validation: { type: ValidationTypes.TEXT },
            },
          ],
        },
      ],
    },
    {
      sectionName: $t('propertyConfig.25ef0643f3bcc3d2'),
      children: [
        {
          helpText: $t('propertyConfig.145a151daf8f0f75'),
          placeholderText: $t('propertyConfig.cce33cff71178f59'),
          propertyName: "chartName",
          label: $t('propertyConfig.9291fca1d7fb7a9a'),
          controlType: "INPUT_TEXT",
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.TEXT },
          hidden: (props: ChartWidgetProps) =>
            ["CUSTOM_ECHART"].includes(props.chartType),
        },
        {
          propertyName: "isVisible",
          label: $t('propertyConfig.369a7be0ae7c4da1'),
          helpText: $t('propertyConfig.0df0b2502012ea68'),
          controlType: "SWITCH",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
        },
        {
          propertyName: "animateLoading",
          label: $t('propertyConfig.718ce1ab1f2a5950'),
          controlType: "SWITCH",
          helpText: $t('propertyConfig.c7f207a78a4165db'),
          defaultValue: true,
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
        },
        {
          helpText: $t('propertyConfig.a402b29f302f586d'),
          propertyName: "allowScroll",
          label: $t('propertyConfig.6459d6ae3e4ba3df'),
          controlType: "SWITCH",
          isBindProperty: false,
          isTriggerProperty: false,
          hidden: (props: ChartWidgetProps) =>
            ["CUSTOM_FUSION_CHART", "PIE_CHART", "CUSTOM_ECHART"].includes(
              props.chartType,
            ),
          dependencies: ["chartType"],
        },
        {
          helpText: $t('propertyConfig.ccfc637d5442903e'),
          propertyName: "showDataPointLabel",
          label: $t('propertyConfig.f4669db1a59fd181'),
          controlType: "SWITCH",
          isBindProperty: false,
          isTriggerProperty: false,
          hidden: (props: ChartWidgetProps) =>
            ["CUSTOM_FUSION_CHART", "CUSTOM_ECHART"].includes(props.chartType),
          dependencies: ["chartType"],
        },
      ],
    },
    {
      sectionName: $t('propertyConfig.babee6b52ca7a5da'),
      children: [
        {
          propertyName: "setAdaptiveYMin",
          label: $t('propertyConfig.8167b7d08362f764'),
          helpText: $t('propertyConfig.495b1a4e2d48d274'),
          controlType: "SWITCH",
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.BOOLEAN },
          // TODO: Fix this the next time the file is edited
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          hidden: (props: any) => props.chartType == "CUSTOM_ECHART",
        },
        {
          helpText: $t('propertyConfig.df5eed52901e8909'),
          propertyName: "xAxisName",
          placeholderText: $t('propertyConfig.d03fc8e5b0ad72f6'),
          label: "x-axis label",
          controlType: "INPUT_TEXT",
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.TEXT },
          // TODO: Fix this the next time the file is edited
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          hidden: (props: any) =>
            ["CUSTOM_FUSION_CHART", "CUSTOM_ECHART"].includes(props.chartType),
          dependencies: ["chartType"],
        },
        {
          helpText: $t('propertyConfig.31d86cb3f7e9f0d1'),
          propertyName: "yAxisName",
          placeholderText: $t('propertyConfig.7edf04b1b75cb624'),
          label: "y-axis label",
          controlType: "INPUT_TEXT",
          isBindProperty: true,
          isTriggerProperty: false,
          validation: { type: ValidationTypes.TEXT },
          // TODO: Fix this the next time the file is edited
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          hidden: (props: any) =>
            ["CUSTOM_FUSION_CHART", "CUSTOM_ECHART"].includes(props.chartType),
          dependencies: ["chartType"],
        },
        {
          helpText: $t('propertyConfig.e21e676c4c831791'),
          propertyName: "labelOrientation",
          label: "x-axis label orientation",
          hidden: (props: ChartWidgetProps) =>
            !isLabelOrientationApplicableFor(props.chartType),
          isBindProperty: false,
          isTriggerProperty: false,
          dependencies: ["chartType"],
          controlType: "DROP_DOWN",
          options: [
            {
              label: $t('propertyConfig.9624df69471533a2'),
              value: LabelOrientation.AUTO,
            },
            {
              label: $t('propertyConfig.b43e6fd6581fe715'),
              value: LabelOrientation.SLANT,
            },
            {
              label: $t('propertyConfig.b350fd1cbd16b617'),
              value: LabelOrientation.ROTATE,
            },
          ],
        },
      ],
    },
    {
      sectionName: $t('propertyConfig.1899caecd265c399'),
      children: [
        {
          helpText: $t('propertyConfig.f203c1e4fe6cbbf8'),
          propertyName: "onDataPointClick",
          label: "onDataPointClick",
          controlType: "ACTION_SELECTOR",
          isJSConvertible: true,
          isBindProperty: true,
          isTriggerProperty: true,
        },
      ],
    },
  ];
};

export const styleConfig = [
  {
    sectionName: $t('propertyConfig.94129605b0f5c15d'),
    children: [
      {
        propertyName: "borderRadius",
        label: $t('propertyConfig.bc9f0db8beb7d8c2'),
        helpText: $t('propertyConfig.0dd10d2596a65934'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('propertyConfig.b0f93da66427a960'),
        helpText:
          $t('propertyConfig.9200a70cd845878f'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
