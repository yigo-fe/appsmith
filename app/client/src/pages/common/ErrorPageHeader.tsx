import {$t} from "locale/index";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getCurrentUser } from "selectors/usersSelectors";
import styled from "styled-components";
import StyledHeader from "components/designSystems/appsmith/StyledHeader";
import type { AppState } from "ee/reducers";
import type { User } from "constants/userConstants";
import { ANONYMOUS_USERNAME } from "constants/userConstants";
import { AUTH_LOGIN_URL, APPLICATIONS_URL } from "constants/routes";
import Button from "components/editorComponents/Button";
import ProfileDropdown from "./ProfileDropdown";
import { flushErrorsAndRedirect, flushErrors } from "actions/errorActions";
import { getSafeCrash } from "selectors/errorSelectors";
import { Indices } from "constants/Layers";
import { getTenantConfig } from "ee/selectors/tenantSelectors";
import { getSelectedAppTheme } from "selectors/appThemingSelectors";
import { NAVIGATION_SETTINGS } from "constants/AppConstants";
import { get } from "lodash";
import { getAssetUrl } from "ee/utils/airgapHelpers";
import { getCurrentApplication } from "ee/selectors/applicationSelectors";

const StyledPageHeader = styled(StyledHeader)`
  box-shadow: none;
  justify-content: normal;
  background: white;
  height: 48px;
  color: white;
  position: fixed;
  top: 0;
  z-index: ${Indices.Layer9};
  border-bottom: 1px solid var(--ads-v2-color-border);
`;

const HeaderSection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const StyledDropDownContainer = styled.div``;

interface ErrorPageHeaderProps {
  user?: User;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flushErrors?: any;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flushErrorsAndRedirect?: any;
  safeCrash: boolean;
}

export function ErrorPageHeader(props: ErrorPageHeaderProps) {
  const { flushErrors, flushErrorsAndRedirect, safeCrash, user } = props;
  const location = useLocation();
  const tenantConfig = useSelector(getTenantConfig);
  const queryParams = new URLSearchParams(location.search);
  let loginUrl = AUTH_LOGIN_URL;
  const redirectUrl = queryParams.get("redirectUrl");

  if (redirectUrl != null) {
    loginUrl += `?redirectUrl=${encodeURIComponent(redirectUrl)}`;
  }

  const selectedTheme = useSelector(getSelectedAppTheme);
  const currentApplicationDetails = useSelector(getCurrentApplication);
  const navColorStyle =
    currentApplicationDetails?.applicationDetail?.navigationSetting
      ?.colorStyle || NAVIGATION_SETTINGS.COLOR_STYLE.LIGHT;
  const primaryColor = get(
    selectedTheme,
    "properties.colors.primaryColor",
    "inherit",
  );

  return (
    <StyledPageHeader>
      <HeaderSection>
        {tenantConfig.brandLogoUrl && (
          <Link
            className="t--appsmith-logo"
            onClick={() => {
              if (safeCrash) flushErrors();
            }}
            to={APPLICATIONS_URL}
          >
            <img
              alt={$t('ErrorPageHeader.2d0d8b2787716e7b')}
              className="h-6"
              src={getAssetUrl(tenantConfig.brandLogoUrl)}
            />
          </Link>
        )}
      </HeaderSection>
      {user && (
        <StyledDropDownContainer>
          {user.username === ANONYMOUS_USERNAME ? (
            <Button
              filled
              intent={"primary"}
              onClick={() => {
                flushErrorsAndRedirect(loginUrl);
              }}
              size="small"
              text={$t('ErrorPageHeader.de5b2bdf6b33a929')}
            />
          ) : (
            <ProfileDropdown
              name={user.name}
              navColorStyle={navColorStyle}
              photoId={user?.photoId}
              primaryColor={primaryColor}
              userName={user.username}
            />
          )}
        </StyledDropDownContainer>
      )}
    </StyledPageHeader>
  );
}

const mapStateToProps = (state: AppState) => ({
  user: getCurrentUser(state),
  safeCrash: getSafeCrash(state),
});

export default connect(mapStateToProps, {
  flushErrors,
  flushErrorsAndRedirect,
})(ErrorPageHeader);
