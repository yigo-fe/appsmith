import {$t} from "locale/index";
import { WDSBaseInputWidget } from "modules/ui-builder/ui/wds/WDSBaseInputWidget";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

import { getDefaultCurrency } from "../constants";

export const defaultsConfig = {
  ...WDSBaseInputWidget.getDefaults(),
  widgetName: "CurrencyInput",
  version: 1,
  allowCurrencyChange: false,
  defaultCurrencyCode: getDefaultCurrency().currency,
  decimals: 0,
  showStepArrows: false,
  label: $t('defaultsConfig.82995f90b962c970'),
  responsiveBehavior: ResponsiveBehavior.Fill,
} as WidgetDefaultProps;
