import {
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Button,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { Option, OptionConstants } from "@/type/option";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const YearSlider = (props: Props) => {
  const { option, setOption } = props;

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
        <Button
          color="white"
          bg="gray.900"
          _hover={{ bg: "gray.800" }}
          onClick={() => setOption({ ...option, playInfo: { ...option.playInfo, status: "pause" } })}
        >
          <Icon as={AiFillClockCircle} />
        </Button>
        <Flex justify="center" align="center" fontSize="16px" color="white">
          {option.minYear}
        </Flex>
        <RangeSlider
          min={OptionConstants.minYear}
          max={OptionConstants.maxYear}
          defaultValue={[option.minYear, option.maxYear]}
          onChange={(value) => setOption({ ...option, minYear: value[0], maxYear: value[1] })}
          colorScheme="teal"
          mx="16px"
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Flex justify="center" align="center" fontSize="16px" color="white">
          {option.maxYear}
        </Flex>
      </Flex>
    </Flex>
  );
};
