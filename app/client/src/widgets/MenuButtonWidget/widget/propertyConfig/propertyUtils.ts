import {$t} from "locale/index";
import type { MenuButtonWidgetProps } from "../../constants";
import { MenuItemsSource } from "../../constants";

export const updateMenuItemsSource = (
  props: MenuButtonWidgetProps,
  propertyPath: string,
  propertyValue: unknown,
): Array<{ propertyPath: string; propertyValue: unknown }> | undefined => {
  const propertiesToUpdate: Array<{
    propertyPath: string;
    propertyValue: unknown;
  }> = [];
  const isMenuItemsSourceChangedFromStaticToDynamic =
    props.menuItemsSource === MenuItemsSource.STATIC &&
    propertyValue === MenuItemsSource.DYNAMIC;

  if (isMenuItemsSourceChangedFromStaticToDynamic) {
    if (!props.sourceData) {
      propertiesToUpdate.push({
        propertyPath: "sourceData",
        propertyValue: [],
      });
    }

    if (!props.configureMenuItems) {
      propertiesToUpdate.push({
        propertyPath: "configureMenuItems",
        propertyValue: {
          label: $t('propertyUtils.5df262abcfc3fc26'),
          id: "config",
          config: {
            id: "config",
            label: $t('propertyUtils.7bf6489332b5af93'),
            isVisible: true,
            isDisabled: false,
          },
        },
      });
    }
  }

  return propertiesToUpdate?.length ? propertiesToUpdate : undefined;
};
