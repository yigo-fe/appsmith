import {$t} from "locale/index";
import { getAssetUrl } from "ee/utils/airgapHelpers";
import React from "react";
import styled from "styled-components";
import { ASSETS_CDN_URL } from "constants/ThirdPartyConstants";
import { Avatar } from "@appsmith/ads";

const Wrapper = styled.div`
  width: 432px;

  .left-description {
    padding-bottom: 24px;
    border-bottom: 1px solid var(--ads-v2-color-border);
    display: flex;
    flex-direction: column;
    gap: var(--ads-spaces-4);
  }

  .left-description-container {
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    font-style: italic;
    color: var(--ads-v2-color-gray-800);
  }

  .left-description-author {
    display: flex;
    align-items: center;
    gap: var(--ads-spaces-3);
  }

  .left-description-author > div {
    font-weight: 500;
    font-size: 12px;
  }

  .dot {
    font-weight: 800;
  }

  .client-logo-container {
    padding-top: 24px;
  }

  .client-heading {
    font-size: 12px;
    font-weight: normal;
    line-height: 1.33;
    text-align: center;
    margin-bottom: 24px;
  }

  .client-logo-container img {
    height: 30px;
  }

  .client-logo-container .client-logo-section {
    display: flex;
    justify-content: space-around;
    margin-bottom: 24px;
    gap: var(--ads-spaces-3);
    flex-wrap: wrap;
  }
`;

function LeftSideContent() {
  return (
    <Wrapper>
      <div className="left-description">
        <div className="left-description-container">
          &quot;We’d been looking for a tool like Appsmith for years. With
          Appsmith we were able to build a UI on top of 12 different Snowflake
          control tables. Appsmith was easy for our developers to learn, and
          it’s easy to implement.&quot;
        </div>
        <div className="left-description-author">
          <Avatar
            image={`${getAssetUrl(`${ASSETS_CDN_URL}/thomas-zwick.png`)}`}
            label={$t('LeftSideContent.df68a0b51bc1a767')}
            size="sm"
          />
          <div>{$t('LeftSideContent.df68a0b51bc1a767')}</div>
          <div className="dot">&#183;</div>
          <div>Director, Omron</div>
        </div>
      </div>

      <div className="client-logo-container">
        <div className="client-heading">
          Used by more than 10,000 organisations across the globe
        </div>
        <div className="client-logo-section">
          <img
            alt={$t('LeftSideContent.b0ac9146896d7e99')}
            src={`${getAssetUrl(`${ASSETS_CDN_URL}/gsk-logo-grey.svg`)}`}
          />
          <img
            alt=$t('LeftSideContent.ea3205a06cf830a7')
            src={`${getAssetUrl(`${ASSETS_CDN_URL}/omron-logo.svg`)}`}
          />
          <img
            alt=$t('LeftSideContent.74ed257247039fea')
            src={`${getAssetUrl(`${ASSETS_CDN_URL}/dropbox-text-logo.svg`)}`}
          />
          <img
            alt=$t('LeftSideContent.ac4a025a5bfa26e6')
            src={`${getAssetUrl(`${ASSETS_CDN_URL}/aws-logo-grey.svg`)}`}
          />
          <img
            alt=$t('LeftSideContent.c2973c9363125113')
            src={`${getAssetUrl(`${ASSETS_CDN_URL}/twilio-logo.svg`)}`}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default LeftSideContent;
