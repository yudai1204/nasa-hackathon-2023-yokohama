import { Box, Text, RangeSlider, RangeSliderFilledTrack, RangeSliderTrack, RangeSliderThumb } from "@chakra-ui/react";
import React from "react";
import { Option, OptionConstants } from "@/type/option";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const YearSlider = (props: Props) => {
  const { option, setOption } = props;
  const isAll = option.minYear === OptionConstants.minYear && option.maxYear === OptionConstants.maxYear;
  const label = isAll ? "All" : `${option.minYear} - ${option.maxYear}`;

  return (
    <Box w="100%">
      <Text fontSize={24} fontWeight="medium" pt={2}>
        Year
      </Text>
      <Text fontSize={20} pb={2}>
        {" "}
        Range: <Text as="span">{label}</Text>
      </Text>
      <RangeSlider
        min={OptionConstants.minYear}
        max={OptionConstants.maxYear}
        defaultValue={[option.minYear, option.maxYear]}
        onChange={(value) => setOption({ ...option, minYear: value[0], maxYear: value[1] })}
        colorScheme="teal"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
};
