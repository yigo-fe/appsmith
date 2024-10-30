import {$t} from "locale/index";
import { WDSBaseInputWidget } from "modules/ui-builder/ui/wds/WDSBaseInputWidget";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import type { WidgetDefaultProps } from "WidgetProvider/constants";

import { getDefaultISDCode } from "../constants";

export const defaultsConfig = {
  ...WDSBaseInputWidget.getDefaults(),
  widgetName: "PhoneInput",
  version: 1,
  defaultDialCode: getDefaultISDCode().dial_code,
  allowDialCodeChange: false,
  allowFormatting: true,
  responsiveBehavior: ResponsiveBehavior.Fill,
  label: $t('defaultsConfig.bd5e5e2422a33daa'),
} as WidgetDefaultProps;
