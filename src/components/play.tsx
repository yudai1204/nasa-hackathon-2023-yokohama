import { Box, Button, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import React from "react";
import { usePlayInterval } from "./usePlay/usePlayInterval";
import { OptionConstants, type Option, PlayStatus } from "@/type";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const Play = (props: Props) => {
  const { option, setOption } = props;

  const { start, stop } = usePlayInterval(() => {
    if (option.playInfo.year + 1 <= OptionConstants.maxYear) {
      setOption({ ...option, playInfo: { ...option.playInfo, year: option.playInfo.year + 1 } });
    } else {
      changePlayInfo("pause");
    }
  }, 1000 / option.playInfo.speed);

  const changePlayInfo = (status: PlayStatus) => {
    setOption({ ...option, playInfo: { ...option.playInfo, status: status } });
    if (status === "play") {
      start();
    } else {
      stop();
    }
  };

  return (
    <Box position="absolute" p={10} bottom={10} w="100%" zIndex={1}>
      <Flex wrap="wrap" w="100%" gap={1} align="center" justify="center">
        {option.playInfo.status === "play" ? (
          <Button colorScheme="blue" onClick={() => changePlayInfo("pause")}>
            pause
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => changePlayInfo("play")}>
            play
          </Button>
        )}
        <Button colorScheme="blue" onClick={() => changePlayInfo("stop")}>
          stop
        </Button>
        {option.playInfo.year}
        <Slider
          min={OptionConstants.minYear}
          max={OptionConstants.maxYear}
          defaultValue={OptionConstants.minYear}
          value={option.playInfo.year}
          onChange={(year) => setOption({ ...option, playInfo: { ...option.playInfo, year: year } })}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </Box>
  );
};
