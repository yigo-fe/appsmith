import {$t} from "locale/index";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { WDSInputWidget } from "modules/ui-builder/ui/wds/WDSInputWidget";
import { INPUT_TYPES } from "modules/ui-builder/ui/wds/WDSBaseInputWidget/constants";
import type { WidgetBaseConfiguration } from "WidgetProvider/constants";
import { PasswordInputIcon, PasswordInputThumbnail } from "appsmith-icons";

class WDSPasswordInputWidget extends WDSInputWidget {
  static type = "WDS_PASSWORD_INPUT_WIDGET";

  static getConfig(): WidgetBaseConfiguration {
    return {
      ...super.getConfig(),
      displayOrder: undefined,
      tags: [WIDGET_TAGS.INPUTS],
      name: $t('index.cf6093120401086d'),
    };
  }

  static getDefaults() {
    return {
      ...super.getDefaults(),
      inputType: INPUT_TYPES.PASSWORD,
      widgetName: "PasswordInput",
    };
  }

  static getMethods() {
    return {
      ...super.getMethods(),
      IconCmp: PasswordInputIcon,
      ThumbnailCmp: PasswordInputThumbnail,
    };
  }
}

export { WDSPasswordInputWidget };
