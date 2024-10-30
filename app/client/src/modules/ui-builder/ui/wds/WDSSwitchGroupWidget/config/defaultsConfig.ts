import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  animateLoading: true,
  options: [
    { label: $t('defaultsConfig.411543fe57d2fef1'), value: "BLUE" },
    { label: $t('defaultsConfig.c607590aacb2a1cd'), value: "GREEN" },
    { label: $t('defaultsConfig.9533d61c0a5d4808'), value: "RED" },
  ],
  defaultSelectedValues: ["BLUE", "RED"],
  isDisabled: false,
  isVisible: true,
  labelPosition: "end",
  label: $t('defaultsConfig.767e59998aac185b'),
  orientation: "vertical",
  version: 1,
  widgetName: "SwitchGroup",
  responsiveBehavior: ResponsiveBehavior.Fill,
} as unknown as WidgetDefaultProps;
