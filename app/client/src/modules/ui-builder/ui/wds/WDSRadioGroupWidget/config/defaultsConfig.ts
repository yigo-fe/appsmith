import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  animateLoading: true,
  label: $t('defaultsConfig.7bb76084f4d40298'),
  options: [
    { label: $t('defaultsConfig.e77ba3ab048bf0f3'), value: "S" },
    { label: $t('defaultsConfig.75b649c6d7b55cd0'), value: "M" },
    { label: $t('defaultsConfig.84aa534ce79618de'), value: "L" },
  ],
  defaultOptionValue: "L",
  isRequired: false,
  isDisabled: false,
  isVisible: true,
  isInline: true,
  widgetName: "RadioGroup",
  orientation: "vertical",
  version: 1,
  responsiveBehavior: ResponsiveBehavior.Fill,
} as unknown as WidgetDefaultProps;
