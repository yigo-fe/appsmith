import {$t} from "locale/index";
import type { WidgetDefaultProps } from "WidgetProvider/constants";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";

export const defaultsConfig = {
  isVisible: true,
  widgetName: "StatsWidget",
  version: 1,
  animateLoading: true,
  valueColor: "neutral",
  valueChange: "+50%",
  valueChangeColor: "positive",
  value: "42",
  label: $t('defaultsConfig.ec3b0233f955009e'),
  caption: $t('defaultsConfig.9a3047499b182ada'),
  iconName: "shopping-bag",
  responsiveBehavior: ResponsiveBehavior.Fill,
  elevatedBackground: false,
} as unknown as WidgetDefaultProps;
