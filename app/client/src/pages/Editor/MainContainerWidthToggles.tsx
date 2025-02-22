import {$t} from "locale/index";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { updateApplicationLayout } from "ee/actions/applicationActions";
import type {
  AppLayoutConfig,
  SupportedLayouts,
} from "reducers/entityReducers/pageListReducer";
import {
  getCurrentApplicationId,
  getCurrentApplicationLayout,
} from "selectors/editorSelectors";
import { Icon, SegmentedControl, Tooltip } from "@appsmith/ads";

const StyledSegmentedControl = styled(SegmentedControl)`
  > .ads-v2-segmented-control__segments-container {
    flex: 1 1 0%;
  }
`;

interface AppsmithLayoutConfigOption {
  name: string;
  type: SupportedLayouts;
  icon: string;
}

export const AppsmithDefaultLayout: AppLayoutConfig = {
  type: "FLUID",
};

const AppsmithLayouts: AppsmithLayoutConfigOption[] = [
  {
    name: $t('MainContainerWidthToggles.3c41a0a68dcaaa19'),
    type: "FLUID",
    icon: "fluid",
  },
  {
    name: $t('MainContainerWidthToggles.91fbff432109cb7e'),
    type: "DESKTOP",
    icon: "desktop",
  },
  {
    name: $t('MainContainerWidthToggles.16516cf0cd40e3e2'),
    type: "TABLET_LARGE",
    icon: "tabletLandscape",
  },
  {
    name: $t('MainContainerWidthToggles.51a74ecaacee7e8d'),
    type: "TABLET",
    icon: "tablet",
  },
  {
    name: $t('MainContainerWidthToggles.5986ddfe3d8ef586'),
    type: "MOBILE",
    icon: "mobile",
  },
];

const options = AppsmithLayouts.map((layout, index) => ({
  label: (
    <Tooltip
      content={layout.name}
      key={layout.name}
      mouseEnterDelay={0}
      placement={
        index === AppsmithLayouts.length - 1 ? "bottomRight" : "bottom"
      }
    >
      <Icon name={layout.icon} size="md" />
    </Tooltip>
  ),
  value: layout.type,
}));

/**
 * OldName: MainContainerLayoutControl
 */
export function MainContainerWidthToggles() {
  const dispatch = useDispatch();
  const appId = useSelector(getCurrentApplicationId);
  const appLayout = useSelector(getCurrentApplicationLayout);
  /**
   * updates the app layout
   *
   * @param layoutConfig
   */
  const updateAppLayout = useCallback(
    (type: string) => {
      dispatch(
        updateApplicationLayout(appId || "", {
          appLayout: {
            // @ts-expect-error: Type error
            type,
          },
        }),
      );
    },
    [dispatch, appLayout],
  );

  return (
    <div className="pb-6 space-y-2 t--layout-control-wrapper">
      <StyledSegmentedControl
        defaultValue={appLayout.type}
        onChange={updateAppLayout}
        options={options}
      />
    </div>
  );
}
