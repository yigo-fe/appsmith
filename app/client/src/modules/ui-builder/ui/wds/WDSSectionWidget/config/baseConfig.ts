import {$t} from "locale/index";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import type { WidgetBaseConfiguration } from "WidgetProvider/constants";

export const baseConfig: WidgetBaseConfiguration = {
  name: $t('baseConfig.a6a705775dffc00d'),
  hideCard: true,
  tags: [WIDGET_TAGS.LAYOUT],
  isCanvas: true,
  searchTags: ["div", "parent", "group"],
  onCanvasUI: {
    selectionBGCSSVar: "--on-canvas-ui-section-selection",
    focusBGCSSVar: "--on-canvas-ui-section-focus",
    selectionColorCSSVar: "--on-canvas-ui-section-focus",
    focusColorCSSVar: "--on-canvas-ui-section-selection",
    disableParentSelection: true,
  },
};
