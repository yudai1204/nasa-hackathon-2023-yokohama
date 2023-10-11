import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { LoadingBox } from "./loadingBox";
import { MapComponent } from "./mapLibre";
import { Panel } from "./panel";
import { MainCanvas } from "./useThree/mainCanvas";
import { YearSlider } from "./useThree/yearSlider";
import type { MoonquakeData } from "@/type";
import { Option, OptionConstants } from "@/type/option";
import { fetchArtificialImpactCSV, fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";

export const Main = () => {
  const [isMap, setIsMap] = useState(false);
  const [moonquakeData, setMoonquakeData] = useState<MoonquakeData[]>([]);
  const [option, setOption] = useState<Option>({
    autoRotate: OptionConstants.autoRotate,
    minYear: OptionConstants.minYear,
    maxYear: OptionConstants.maxYear,
    typeFilter: OptionConstants.typeFilter,
    performanceMode: OptionConstants.performanceMode,
  });
  const [loadingPageStep, setLoadingPageStep] = useState(0);
  const [choiceMoonquake, setChoiceMoonquake] = useState<MoonquakeData | null>(null);

  useEffect(() => {
    setLoadingPageStep(1);
    const fetchMoonquake = async () => {
      const shallowMoonquakes = await fetchShallowMoonquakeCSV();
      const deepMoonquakes = await fetchDeepMoonquakeCSV();
      const artificialImpacts = await fetchArtificialImpactCSV();
      const quakes = [...shallowMoonquakes, ...deepMoonquakes, ...artificialImpacts] as MoonquakeData[];
      setMoonquakeData(quakes);
      setLoadingPageStep(2);
    };
    fetchMoonquake();
  }, []);

  return (
    <Box w="100%" h="100svh" position="relative" overflow="none">
      <Header option={option} setOption={setOption} />
      <Panel choiceMoonquake={choiceMoonquake} />
      {!isMap && <YearSlider option={option} setOption={setOption} />}

      <LoadingBox loadingPageStep={loadingPageStep} />

      {(isMap || !option.performanceMode) && (
        <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={isMap ? 0 : -1}>
          <MapComponent setIsMap={setIsMap} setChoiceMoonquake={setChoiceMoonquake} />
        </Box>
      )}

      {(!isMap || !option.performanceMode) && (
        <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={isMap ? -1 : 0}>
          <MainCanvas
            setIsMap={setIsMap}
            moonquakeData={moonquakeData}
            option={option}
            choiceMoonquake={choiceMoonquake}
            setChoiceMoonquake={setChoiceMoonquake}
          />
        </Box>
      )}
    </Box>
  );
};
