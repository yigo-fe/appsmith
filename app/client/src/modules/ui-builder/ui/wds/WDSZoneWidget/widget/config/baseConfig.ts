import {$t} from "locale/index";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import type { WidgetBaseConfiguration } from "WidgetProvider/constants";

export const baseConfig: WidgetBaseConfiguration = {
  name: $t('baseConfig.a828d769479e2179'),
  tags: [WIDGET_TAGS.LAYOUT],
  isCanvas: true,
  searchTags: ["div", "parent", "group"],
  onCanvasUI: {
    selectionBGCSSVar: "--on-canvas-ui-zone-selection",
    focusBGCSSVar: "--on-canvas-ui-zone-focus",
    selectionColorCSSVar: "--on-canvas-ui-zone-focus",
    focusColorCSSVar: "--on-canvas-ui-zone-selection",
    disableParentSelection: false,
  },
};
