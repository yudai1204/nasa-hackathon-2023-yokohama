import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { mapLibreLogic } from "./useMapLibre";
import type { MoonquakeData } from "@/type/moon";
import { Option } from "@/type/option";

type Props = {
  setIsMap: React.Dispatch<React.SetStateAction<boolean>>;
  setChoiceMoonquake: React.Dispatch<React.SetStateAction<MoonquakeData | null>>;
  option: Option;
};
export const MapComponent = (props: Props) => {
  const { setIsMap, setChoiceMoonquake, option } = props;
  const mapContainer = useRef(null);
  const removeFunc = useRef<(() => void) | undefined>();

  useEffect(() => {
    const mapPosition = {
      container: mapContainer.current,
      latitude: 0,
      longitude: 0,
      zoom: 4,
      setIsMap,
      setChoiceMoonquake,
      option,
    };
    if (removeFunc.current) removeFunc.current();
    removeFunc.current = mapLibreLogic(mapPosition);
  }, [mapContainer, setIsMap, setChoiceMoonquake, option, removeFunc]);

  return (
    <>
      <Box ref={mapContainer} w="100%" h="100%" bgColor="black" />
    </>
  );
};
