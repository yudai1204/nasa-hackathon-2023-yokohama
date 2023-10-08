import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { mapLibreLogic } from "./useMapLibre";
import type { MoonquakeData } from "@/type/moon";

type Props = {
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
};
export const MapComponent = (props: Props) => {
  const { setIsMap, setChoiceMoonquake } = props;
  const mapContainer = useRef(null);

  useEffect(() => {
    const mapPosition = {
      container: mapContainer.current,
      latitude: 0,
      longitude: 0,
      zoom: 4,
      setIsMap,
      setChoiceMoonquake,
    };
    mapLibreLogic(mapPosition);
  }, [mapContainer, setIsMap, setChoiceMoonquake]);

  return (
    <>
      <Box ref={mapContainer} w="100%" h="100%" bgColor="black" />
    </>
  );
};
