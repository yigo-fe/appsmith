import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

export const defaultsConfig = {
  widgetName: "InlineButtons",
  isDisabled: false,
  isVisible: true,
  version: 1,
  animateLoading: true,
  responsiveBehavior: ResponsiveBehavior.Fill,
  buttonsList: {
    button1: {
      label: $t('defaultsConfig.06e95fc5a2b77052'),
      isVisible: true,
      isDisabled: false,
      id: "button1",
      index: 0,
      variant: "outlined",
      color: "negative",
    },
    button2: {
      label: $t('defaultsConfig.c9b4b02db09d35fb'),
      isVisible: true,
      isDisabled: false,
      id: "button2",
      isSeparator: true,
      index: 1,
      itemType: "SEPARATOR",
    },
    button3: {
      label: $t('defaultsConfig.7e9eb8899322f8b3'),
      isVisible: true,
      isDisabled: false,
      widgetId: "",
      id: "button3",
      index: 2,
      variant: "outlined",
      color: "accent",
    },
    button4: {
      label: $t('defaultsConfig.bc29f66350552e22'),
      isVisible: true,
      isDisabled: false,
      widgetId: "",
      id: "button4",
      index: 3,
      variant: "filled",
      color: "accent",
    },
  },
} as unknown as WidgetDefaultProps;
