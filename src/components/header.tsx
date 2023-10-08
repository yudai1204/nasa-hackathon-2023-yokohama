import {
  Box,
  Icon,
  useDisclosure,
  SlideFade,
  VStack,
  Text,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Option, OptionConstants } from "@/type/option";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const Header = (props: Props) => {
  const { option, setOption } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box position="absolute" top={0} left={0} userSelect="none" h="fit-content" zIndex={1}>
      <Icon
        position="absolute"
        top="24px"
        left="24px"
        as={isOpen ? AiOutlineClose : AiOutlineMenu}
        fontSize={24}
        color={isOpen ? "gray.600" : "gray.300"}
        onClick={onToggle}
        zIndex={10}
      />
      <SlideFade in={isOpen} offsetX={-80} offsetY={0} unmountOnExit>
        <VStack bgColor="gray.300" h="100vh" pt="72px" pl="26px" gap={2} color="gray.600">
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium">
              Filter
            </Text>
            <Checkbox size="lg" colorScheme="orange" defaultChecked>
              Shallow
            </Checkbox>
            <Checkbox size="lg" colorScheme="orange" defaultChecked>
              Deep
            </Checkbox>
            <Checkbox size="lg" colorScheme="orange" defaultChecked>
              Artical
            </Checkbox>
          </Box>
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium">
              Settings
            </Text>
            <Checkbox size="lg" defaultChecked>
              Auto Rotate
            </Checkbox>
            <Checkbox size="lg" defaultChecked>
              Height map
            </Checkbox>
            <Checkbox size="lg" defaultChecked>
              Appolo flag
            </Checkbox>
            <Checkbox size="lg" defaultChecked>
              Lunar eclipse
            </Checkbox>
          </Box>
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium">
              Change Size
            </Text>
            <Slider aria-label="slider-ex-2" colorScheme="pink" defaultValue={30}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium">
              Change Size
            </Text>
            <Slider aria-label="slider-ex-2" colorScheme="pink" defaultValue={30}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <YearSlider option={option} setOption={setOption} />
          <Text>©ESO/S. Brunier</Text>
        </VStack>
      </SlideFade>
    </Box>
  );
};

type YearSliderProps = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

const YearSlider = (props: YearSliderProps) => {
  const { option, setOption } = props;
  const isAll = option.minYear === OptionConstants.minYear && option.maxYear === OptionConstants.maxYear;
  const label = isAll ? "All" : `${option.minYear} - ${option.maxYear}`;

  return (
    <Box w="100%">
      <Text>
        Year Range: <Text as="span">{label}</Text>
      </Text>
      <RangeSlider
        min={OptionConstants.minYear}
        max={OptionConstants.maxYear}
        defaultValue={[option.minYear, option.maxYear]}
        onChange={(value) => setOption({ ...option, minYear: value[0], maxYear: value[1] })}
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
