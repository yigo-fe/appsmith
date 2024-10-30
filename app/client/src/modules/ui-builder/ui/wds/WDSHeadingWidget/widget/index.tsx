import {$t} from "locale/index";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import { WDSParagraphWidget } from "modules/ui-builder/ui/wds/WDSParagraphWidget";
import { HeadingIcon, HeadingThumbnail } from "appsmith-icons";
import { klonaRegularWithTelemetry } from "utils/helpers";

class WDSHeadingWidget extends WDSParagraphWidget {
  static type = "WDS_HEADING_WIDGET";

  static getConfig() {
    return {
      ...super.getConfig(),
      tags: [WIDGET_TAGS.SUGGESTED_WIDGETS, WIDGET_TAGS.CONTENT],
      name: $t('index.a173b4c846289cac'),
    };
  }

  static getDefaults() {
    return {
      ...super.getDefaults(),
      fontSize: "heading",
      widgetName: $t('index.a173b4c846289cac'),
      text: $t('index.35cb40e57ab6ecfa'),
    };
  }

  static getMethods() {
    return {
      ...super.getMethods(),
      IconCmp: HeadingIcon,
      ThumbnailCmp: HeadingThumbnail,
    };
  }

  static getPropertyPaneContentConfig() {
    const parentConfig = klonaRegularWithTelemetry(
      super.getPropertyPaneContentConfig(),
      "WDSHeadingWidget.getPropertyPaneContentConfig",
    );

    const generelSectionIndex = parentConfig.findIndex(
      (section) => section.sectionName === "General",
    );
    const textPropertyIndex = parentConfig[
      generelSectionIndex
    ].children.findIndex((property) => property.propertyName === "text");

    parentConfig[generelSectionIndex].children[textPropertyIndex] = {
      propertyName: "text",
      helpText: $t('index.666c7f2f5ad17889'),
      label: $t('index.13f2ca7180dd6c65'),
      controlType: "INPUT_TEXT",
      placeholderText: $t('index.35cb40e57ab6ecfa'),
      isBindProperty: true,
      isTriggerProperty: false,
      validation: {
        type: ValidationTypes.TEXT,
        params: { limitLineBreaks: true },
      },
    };

    return parentConfig;
  }
}

export { WDSHeadingWidget };
