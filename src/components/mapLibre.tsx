import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { mapLibreLogic } from "./useMapLibre";

export const MapComponent = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const mapPosition = {
      container: mapContainer.current,
      latitude: 0,
      longitude: 0,
      zoom: 4,
    };

    mapLibreLogic(mapPosition);
  }, [mapContainer]);

  return (
    <>
      <Box ref={mapContainer} w="100%" h="100%" bgColor="black" />
    </>
  );
};
