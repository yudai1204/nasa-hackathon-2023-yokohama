import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { mapLibreLogic } from "./useMapLibre";

type Props = {
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MapComponent = (props: Props) => {
  const { setIsMap } = props;
  const mapContainer = useRef(null);

  useEffect(() => {
    const mapPosition = {
      container: mapContainer.current,
      latitude: 0,
      longitude: 0,
      zoom: 4,
      setIsMap,
    };

    mapLibreLogic(mapPosition);
  }, [mapContainer, setIsMap]);

  return (
    <>
      <Box ref={mapContainer} w="100%" h="100%" bgColor="black" />
    </>
  );
};
