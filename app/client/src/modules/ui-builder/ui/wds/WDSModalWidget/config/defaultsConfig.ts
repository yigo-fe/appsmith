import {$t} from "locale/index";
import type { WidgetDefaultProps } from "WidgetProvider/constants";
import {
  BlueprintOperationTypes,
  type FlattenedWidgetProps,
} from "WidgetProvider/constants";
import { modalPreset } from "layoutSystems/anvil/layoutComponents/presets/ModalPreset";
import type { LayoutProps } from "layoutSystems/anvil/utils/anvilTypes";
import { LayoutSystemTypes } from "layoutSystems/types";
import type { CanvasWidgetsReduxState } from "reducers/entityReducers/canvasWidgetsReducer";
import { getWidgetBluePrintUpdates } from "utils/WidgetBlueprintUtils";

export const defaultsConfig = {
  detachFromLayout: true,
  children: [],
  widgetName: "Modal",
  version: 1,
  isVisible: false,
  showFooter: true,
  showHeader: true,
  size: "medium",
  title: $t('defaultsConfig.37904dc4b8e523be'),
  showSubmitButton: true,
  closeOnSubmit: true,
  submitButtonText: $t('defaultsConfig.f9518143fde24505'),
  cancelButtonText: $t('defaultsConfig.4c5ea3f9dbf72ef3'),
  blueprint: {
    operations: [
      {
        type: BlueprintOperationTypes.MODIFY_PROPS,
        fn: (
          widget: FlattenedWidgetProps,
          widgets: CanvasWidgetsReduxState,
          parent: FlattenedWidgetProps,
          layoutSystemType: LayoutSystemTypes,
        ) => {
          if (layoutSystemType !== LayoutSystemTypes.ANVIL) return [];

          const layout: LayoutProps[] = modalPreset();

          return getWidgetBluePrintUpdates({
            [widget.widgetId]: {
              layout,
            },
          });
        },
      },
    ],
  },
} as unknown as WidgetDefaultProps;
