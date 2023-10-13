import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Header } from "./header";
import { ZoomHintPopup, ClickHintPopup } from "./hint";
import { LoadingBox } from "./loadingBox";
import { MapComponent } from "./mapLibre";
import { Panel } from "./panel";
import { MainCanvas } from "./useThree/mainCanvas";
import { Play } from "./useThree/play";
import { YearSlider } from "./useThree/yearSlider";
import { MoonquakeData, Option, OptionConstants } from "@/type";
import { fetchArtificialImpactCSV, fetchDeepMoonquakeCSV, fetchShallowMoonquakeCSV } from "@/utils/fetchMoonquakeCSV";
import { filterMoonQuake } from "@/utils/filterMoonquake";

export const Main = () => {
  const [isMap, setIsMap] = useState(false);
  const [moonquakeData, setMoonquakeData] = useState<MoonquakeData[]>([]);
  const [option, setOption] = useState<Option>({
    autoRotate: OptionConstants.autoRotate,
    minYear: OptionConstants.minYear,
    maxYear: OptionConstants.maxYear,
    typeFilter: OptionConstants.typeFilter,
    performanceMode: OptionConstants.performanceMode,
    playInfo: OptionConstants.playInfo,
    displayLayer: OptionConstants.displayLayer,
    layerOpacity: OptionConstants.layerOpacity,
    layerIdx: OptionConstants.layerIdx,
  });
  const [loadingPageStep, setLoadingPageStep] = useState(0);
  const [choiceMoonquake, setChoiceMoonquake] = useState<MoonquakeData | null>(null);
  const [displayZoomHint, setDisplayZoomHint] = useState(true);
  const [displayClickHint, setDisplayClickHint] = useState(true);

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
      {!isMap &&
        (option.playInfo.status === "stop" ? (
          <YearSlider option={option} setOption={setOption} />
        ) : (
          <Play option={option} setOption={setOption} />
        ))}

      <LoadingBox loadingPageStep={loadingPageStep} />
      {displayZoomHint && <ZoomHintPopup setDisplayHint={setDisplayZoomHint} />}
      {displayClickHint && <ClickHintPopup />}

      {(isMap || !option.performanceMode) && (
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top={0}
          left={0}
          zIndex={isMap ? 0 : -1}
          onClick={() => setDisplayClickHint(false)}
        >
          <MapComponent setIsMap={setIsMap} setChoiceMoonquake={setChoiceMoonquake} option={option} />
        </Box>
      )}

      {(!isMap || !option.performanceMode) && (
        <Box
          w="100%"
          h="100%"
          position="absolute"
          top={0}
          left={0}
          zIndex={isMap ? -1 : 0}
          onClick={() => setDisplayClickHint(false)}
        >
          <MainCanvas
            setIsMap={setIsMap}
            moonquakeData={filterMoonQuake(moonquakeData, option)}
            option={option}
            choiceMoonquake={choiceMoonquake}
            setChoiceMoonquake={setChoiceMoonquake}
            setDisplayHint={setDisplayZoomHint}
          />
        </Box>
      )}
    </Box>
  );
};
