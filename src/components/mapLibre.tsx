import React, { useEffect, useRef } from "react";
import { mapLibreLogic } from "./useMapLibre";

export const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const mapPosition = {
      container: mapContainer.current,
      latitude: 0,
      longitude: 0,
      zoom: 1,
    };

    mapLibreLogic(mapPosition);
  }, [mapContainer]);

  return (
    <>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </>
  );
};
