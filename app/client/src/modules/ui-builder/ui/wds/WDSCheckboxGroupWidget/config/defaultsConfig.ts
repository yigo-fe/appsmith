import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  animateLoading: true,
  options: [
    { label: $t('defaultsConfig.d454fdbf62a39960'), value: "BLUE" },
    { label: $t('defaultsConfig.7ff8d148753be412'), value: "GREEN" },
    { label: $t('defaultsConfig.f58fa4f9d21ba3c7'), value: "RED" },
  ],
  defaultSelectedValues: ["BLUE", "RED"],
  isDisabled: false,
  isRequired: false,
  isVisible: true,
  label: $t('defaultsConfig.ee67851880fbd619'),
  orientation: "vertical",
  version: 1,
  widgetName: "CheckboxGroup",
  responsiveBehavior: ResponsiveBehavior.Fill,
} as unknown as WidgetDefaultProps;
