import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  label: $t('defaultsConfig.fa76f8f16eb96cb3'),
  defaultSwitchState: true,
  widgetName: "Switch",
  labelPosition: "start",
  version: 1,
  isDisabled: false,
  isVisible: true,
  animateLoading: true,
  responsiveBehavior: ResponsiveBehavior.Fill,
} as unknown as WidgetDefaultProps;
