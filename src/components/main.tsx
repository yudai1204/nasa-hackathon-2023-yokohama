import { Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { MapComponent } from "./mapLibre";
import { MainCanvas } from "./useThree/mainCanvas";
import type { MoonquakeData } from "@/type";
import { Option, OptionConstants } from "@/type/option";
import { fetchArtificialImpactCSV, fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";

export const Main = () => {
  const [isMap, setIsMap] = useState(false);
  const [moonquakeData, setMoonquakeData] = useState<MoonquakeData[]>([]);
  const [option, setOption] = useState<Option>({
    minYear: OptionConstants.minYear,
    maxYear: OptionConstants.maxYear,
  });

  useEffect(() => {
    const fetchMoonquake = async () => {
      const shallowMoonquakes = await fetchShallowMoonquakeCSV();
      const deepMoonquakes = await fetchDeepMoonquakeCSV();
      const artificialImpacts = await fetchArtificialImpactCSV();
      const quakes = [...shallowMoonquakes, ...deepMoonquakes, ...artificialImpacts] as MoonquakeData[];
      setMoonquakeData(quakes);
    };
    fetchMoonquake();
  }, []);

  return (
    <Box w="100%" h="100vh" position="relative" overflow="none">
      <Header option={option} setOption={setOption} />
      {/* 仮の切り替えボタン */}
      <Button
        onClick={() => {
          setIsMap(!isMap);
        }}
        position={"absolute"}
        bottom={10}
        right={10}
        zIndex={100}
      >
        {isMap ? "toThree" : "toMap"}
      </Button>

      <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={isMap ? 0 : -1}>
        <MapComponent setIsMap={setIsMap} />
      </Box>
      <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={isMap ? -1 : 0}>
        <MainCanvas setIsMap={setIsMap} moonquakeData={moonquakeData} option={option} />
      </Box>
    </Box>
  );
};
