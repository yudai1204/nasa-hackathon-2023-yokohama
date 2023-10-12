import { Button, Flex, Icon, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/react";
import React from "react";
import { AiFillPauseCircle, AiFillPlayCircle, AiFillStop } from "react-icons/ai";
import { usePlayInterval } from "./usePlayInterval";
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
    <Flex position="absolute" w="100%" bottom={50} zIndex={1} align="center" justify="center">
      <Flex
        w="80%"
        maxW="400px"
        h="100%"
        bgColor="gray.900"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="20px"
        px="20px"
        py="8px"
      >
        <Button color="white" bg="gray.900" _hover={{ bg: "gray.800" }} onClick={() => changePlayInfo("stop")}>
          <Icon as={AiFillStop} />
        </Button>
        {option.playInfo.status === "play" ? (
          <Button color="white" bg="gray.900" _hover={{ bg: "gray.800" }} onClick={() => changePlayInfo("pause")}>
            <Icon as={AiFillPauseCircle} />
          </Button>
        ) : (
          <Button color="white" bg="gray.900" _hover={{ bg: "gray.800" }} onClick={() => changePlayInfo("play")}>
            <Icon as={AiFillPlayCircle} />
          </Button>
        )}
        <Slider
          mx={10}
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
        <Flex justify="center" align="center" color="white">
          {option.playInfo.year}
        </Flex>
      </Flex>
    </Flex>
  );
};
