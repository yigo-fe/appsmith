import {$t} from "locale/index";
import { ResponsiveBehavior } from "layoutSystems/common/utils/constants";
import { WDSBaseInputWidget } from "../../WDSBaseInputWidget";

export const defaultsConfig = {
  ...WDSBaseInputWidget.getDefaults(),
  labelPosition: "top",
  inputType: "TEXT",
  widgetName: "Input",
  version: 1,
  label: $t('defaultsConfig.832e409d3c4f6f7d'),
  showStepArrows: false,
  responsiveBehavior: ResponsiveBehavior.Fill,
};
