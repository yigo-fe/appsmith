import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  animateLoading: true,
  label: $t('defaultsConfig.0e69901ece0befd0'),
  options: [
    { label: $t('defaultsConfig.1f18c103e09a9014'), value: "1" },
    { label: $t('defaultsConfig.87e08c0bdfb6318b'), value: "2" },
    { label: $t('defaultsConfig.0634ac6dd17e1180'), value: "3" },
  ],
  defaultOptionValue: "",
  isRequired: false,
  isDisabled: false,
  isVisible: true,
  isInline: false,
  widgetName: "Select",
  widgetType: "SELECT",
  version: 1,
  responsiveBehavior: ResponsiveBehavior.Fill,
} as unknown as WidgetDefaultProps;
