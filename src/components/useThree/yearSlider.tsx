import {
  Box,
  Center,
  Text,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import React from "react";
import { Option, OptionConstants } from "@/type/option";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const YearSlider = (props: Props) => {
  const { option, setOption } = props;

  return (
    <Box position="absolute" w="100%" bottom={50} zIndex={1}>
      <Center>
        <Box
          w="400px"
          h="100%"
          position="relative"
          bgColor="gray.900"
          border="1px solid"
          borderRadius="20px"
          px="20px"
          py="8px"
          display="flex"
        >
          <Text fontSize="16px" color="white">
            {option.minYear}
          </Text>
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
          <Text fontSize="16px" color="white">
            {option.maxYear}
          </Text>
        </Box>
      </Center>
    </Box>
  );
};
