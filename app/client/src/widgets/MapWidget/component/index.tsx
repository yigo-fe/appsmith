import {$t} from "locale/index";
import React from "react";
import styled from "styled-components";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import Map from "./Map";

export interface MarkerProps {
  lat: number;
  long: number;
  title?: string;
  description?: string;
  color?: string;
}
export interface MapComponentProps {
  apiKey: string;
  widgetId: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  enableSearch: boolean;
  zoomLevel: number;
  enablePickLocation: boolean;
  allowZoom: boolean;
  center: {
    lat: number;
    long: number;
  };
  markers?: MarkerProps[];
  selectedMarker?: {
    lat: number;
    long: number;
    title?: string;
  };
  enableCreateMarker: boolean;
  clickedMarkerCentered?: boolean;
  updateCenter: (lat?: number, long?: number) => void;
  updateMarker: (lat: number, long: number, index: number) => void;
  saveMarker: (lat?: number, long?: number) => void;
  selectMarker: (lat?: number, long?: number, title?: string) => void;
  // TODO: Fix this the next time the file is edited
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enableDrag: (e: any) => void;
  unselectMarker: () => void;
  borderRadius: string;
  boxShadow?: string;
  allowClustering?: boolean;
  enableMapTypeControl: boolean;
}

const MapStatusText = styled.span`
  font-size: 14px;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--wds-color-text-light);
`;

const MapStatusLoading = styled.span`
  font-size: 14px;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--wds-color-text-light);
  background: var(--wds-color-bg-light);
  text-align: center;
`;
/**
 * This component will render the map based on the status of the google maps api.
 *
 * @param status
 * @returns
 */
const renderMapStatus = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <MapStatusLoading />;
    case Status.FAILURE:
      return <MapStatusText>Error while initializing the map</MapStatusText>;
    case Status.SUCCESS:
      return <div />;
  }
};

const MapComponent = (props: MapComponentProps) => {
  const {
    allowZoom,
    apiKey,
    enablePickLocation,
    enableSearch,
    updateCenter,
    ...rest
  } = props;

  return (
    <Wrapper
      apiKey={apiKey}
      libraries={["geometry", "drawing", "places"]}
      render={renderMapStatus}
    >
      <Map updateCenter={updateCenter} {...rest}>
        <Map.PickMyLocation
          allowZoom={allowZoom}
          isEnabled={enablePickLocation}
          title={$t('index.e73e5a9712c80255')}
          updateCenter={updateCenter}
        />
        <Map.SearchBox
          isEnabled={enableSearch}
          placeholder={$t('index.01d3657350d0b4a2')}
          updateCenter={updateCenter}
        />
      </Map>
    </Wrapper>
  );
};

export default MapComponent;
