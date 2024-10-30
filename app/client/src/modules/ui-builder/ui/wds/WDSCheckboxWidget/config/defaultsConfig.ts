import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  label: $t('defaultsConfig.a09ce75146b9180d'),
  defaultCheckedState: true,
  widgetName: "Checkbox",
  version: 1,
  isDisabled: false,
  isRequired: false,
  isVisible: true,
  animateLoading: true,
  responsiveBehavior: ResponsiveBehavior.Fill,
} as unknown as WidgetDefaultProps;
