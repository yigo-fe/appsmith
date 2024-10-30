import {$t} from "locale/index";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import { isAutoLayout } from "layoutSystems/autolayout/utils/flexWidgetUtils";
import type { CodeScannerWidgetProps } from "widgets/CodeScannerWidget/constants";
import { ScannerLayout } from "widgets/CodeScannerWidget/constants";
import {
  BACK_CAMERA_LABEL,
  DEFAULT_CAMERA_LABEL,
  DEFAULT_CAMERA_LABEL_DESCRIPTION,
  FRONT_CAMERA_LABEL,
  createMessage,
} from "ee/constants/messages";
import { DefaultMobileCameraTypes } from "WidgetProvider/constants";
export default [
  {
    sectionName: $t('contentConfig.278832b9f24baf2f'),
    children: [
      {
        propertyName: "scannerLayout",
        label: $t('contentConfig.ed00f601fd59214d'),
        controlType: "ICON_TABS",
        defaultValue: ScannerLayout.ALWAYS_ON,
        fullWidth: true,
        helpText:
          $t('contentConfig.8a8b61788d8b8efa'),
        options: [
          {
            label: $t('contentConfig.1db6379416f615ca'),
            value: ScannerLayout.ALWAYS_ON,
          },
          {
            label: $t('contentConfig.3594357586626fb2'),
            value: ScannerLayout.CLICK_TO_SCAN,
          },
        ],
        hidden: isAutoLayout,
        isJSConvertible: false,
        isBindProperty: false,
        isTriggerProperty: false,
      },
      {
        propertyName: "label",
        label: $t('contentConfig.0b76e9567e53bc59'),
        controlType: "INPUT_TEXT",
        helpText: $t('contentConfig.e3fa0db256a6e191'),
        placeholderText: $t('contentConfig.0c0811122827c9de'),
        inputType: "TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: CodeScannerWidgetProps) =>
          props.scannerLayout === ScannerLayout.ALWAYS_ON,
        dependencies: ["scannerLayout"],
      },
    ],
  },
  {
    sectionName: $t('contentConfig.9fb05902c9030c6f'),
    children: [
      {
        propertyName: "isVisible",
        label: $t('contentConfig.0b4113a34bff8875'),
        helpText: $t('contentConfig.e7f8ad23cccc5e20'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "isDisabled",
        label: $t('contentConfig.5601e21e91cd83ef'),
        helpText: $t('contentConfig.effe3148dd2cdbd4'),
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "animateLoading",
        label: $t('contentConfig.924ac4314889076f'),
        controlType: "SWITCH",
        helpText: $t('contentConfig.c99b6faf6a42ad10'),
        defaultValue: true,
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        helpText: $t('contentConfig.cc386ffc8f5d4ad1'),
        propertyName: "tooltip",
        label: $t('contentConfig.ca404f23718d709b'),
        controlType: "INPUT_TEXT",
        placeholderText: $t('contentConfig.3f8d54c646975d46'),
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
        hidden: (props: CodeScannerWidgetProps) =>
          props.scannerLayout === ScannerLayout.ALWAYS_ON,
        dependencies: ["scannerLayout"],
      },
      {
        propertyName: "defaultCamera",
        label: createMessage(DEFAULT_CAMERA_LABEL),
        helpText: createMessage(DEFAULT_CAMERA_LABEL_DESCRIPTION),
        controlType: "DROP_DOWN",
        defaultValue: DefaultMobileCameraTypes.BACK,
        options: [
          {
            label: createMessage(FRONT_CAMERA_LABEL),
            value: DefaultMobileCameraTypes.FRONT,
          },
          {
            label: createMessage(BACK_CAMERA_LABEL),
            value: DefaultMobileCameraTypes.BACK,
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              DefaultMobileCameraTypes.FRONT,
              DefaultMobileCameraTypes.BACK,
            ],
            default: DefaultMobileCameraTypes.BACK,
          },
        },
      },
    ],
  },

  {
    sectionName: $t('contentConfig.a2bf39d5f777335a'),
    children: [
      {
        helpText: $t('contentConfig.4479111caad48924'),
        propertyName: "onCodeDetected",
        label: "onCodeDetected",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
] as PropertyPaneConfig[];
