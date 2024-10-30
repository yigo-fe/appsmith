import {$t} from "locale/index";
import { ButtonPlacementTypes } from "components/constants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { CodeScannerWidgetProps } from "widgets/CodeScannerWidget/constants";
import { ScannerLayout } from "widgets/CodeScannerWidget/constants";
import { updateStyles } from "../propertyUtils";

export default [
  {
    sectionName: $t('styleConfig.248fac7b786b1db2'),
    children: [
      {
        propertyName: "iconName",
        label: $t('styleConfig.de53146fb0a2b0c9'),
        helpText: $t('styleConfig.3a6c86c94cdeb9a9'),
        controlType: "ICON_SELECT",
        isBindProperty: false,
        isTriggerProperty: false,
        updateHook: updateStyles,
        dependencies: ["iconAlign", "scannerLayout"],
        validation: {
          type: ValidationTypes.TEXT,
        },
        hidden: (props: CodeScannerWidgetProps) =>
          props.scannerLayout === ScannerLayout.ALWAYS_ON,
      },
      {
        propertyName: "iconAlign",
        label: $t('styleConfig.e6d2b3d94fb2858f'),
        helpText: $t('styleConfig.b877451ef83b6835'),
        controlType: "ICON_TABS",
        defaultValue: "left",
        fullWidth: false,
        options: [
          {
            startIcon: "skip-left-line",
            value: "left",
          },
          {
            startIcon: "skip-right-line",
            value: "right",
          },
        ],
        isBindProperty: false,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["center", "left", "right"],
          },
        },
        hidden: (props: CodeScannerWidgetProps) =>
          props.scannerLayout === ScannerLayout.ALWAYS_ON,
        dependencies: ["scannerLayout"],
      },
      {
        propertyName: "placement",
        label: $t('styleConfig.57d7a7cdff24f7c1'),
        controlType: "ICON_TABS",
        fullWidth: true,
        helpText: $t('styleConfig.bf945a16abdb815f'),
        options: [
          {
            label: $t('styleConfig.e78fbb2368b50d7a'),
            value: ButtonPlacementTypes.START,
          },
          {
            label: $t('styleConfig.23050ce232b4df97'),
            value: ButtonPlacementTypes.BETWEEN,
          },
          {
            label: $t('styleConfig.aba05d43c05170dd'),
            value: ButtonPlacementTypes.CENTER,
          },
        ],
        defaultValue: ButtonPlacementTypes.CENTER,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              ButtonPlacementTypes.START,
              ButtonPlacementTypes.BETWEEN,
              ButtonPlacementTypes.CENTER,
            ],
            default: ButtonPlacementTypes.CENTER,
          },
        },
        hidden: (props: CodeScannerWidgetProps) =>
          props.scannerLayout === ScannerLayout.ALWAYS_ON,
        dependencies: ["scannerLayout"],
      },
    ],
  },
  {
    sectionName: $t('styleConfig.1e84a712ba61d655'),
    children: [
      {
        propertyName: "buttonColor",
        helpText: $t('styleConfig.76fbc362446c2cd9'),
        label: $t('styleConfig.a936e4f37eb1faf1'),
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
        hidden: (props: CodeScannerWidgetProps) =>
          props.scannerLayout === ScannerLayout.ALWAYS_ON,
        dependencies: ["scannerLayout"],
      },
    ],
  },
  {
    sectionName: $t('styleConfig.32ac6618a1000e12'),
    children: [
      {
        propertyName: "borderRadius",
        label: $t('styleConfig.5fe92f97974ff559'),
        helpText: $t('styleConfig.744b3b69cda37224'),
        controlType: "BORDER_RADIUS_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "boxShadow",
        label: $t('styleConfig.8a9450d726de1930'),
        helpText:
          $t('styleConfig.7dfb78aa3a80eab8'),
        controlType: "BOX_SHADOW_OPTIONS",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
    ],
  },
];
