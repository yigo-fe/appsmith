import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  animateLoading: true,
  label: $t('defaultsConfig.c64be76c89d66013'),
  options: [
    { label: $t('defaultsConfig.38fd135546031113'), value: "1" },
    { label: $t('defaultsConfig.c699d32f4af2b272'), value: "2" },
    { label: $t('defaultsConfig.3ae3971ecfb565ef'), value: "3" },
  ],
  defaultOptionValue: "",
  isRequired: false,
  isDisabled: false,
  isVisible: true,
  isInline: false,
  widgetName: "ComboBox",
  widgetType: "COMBOBOX",
  version: 1,
  responsiveBehavior: ResponsiveBehavior.Fill,
} as unknown as WidgetDefaultProps;
