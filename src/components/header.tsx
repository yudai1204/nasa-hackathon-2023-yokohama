import {
  Box,
  Icon,
  useDisclosure,
  SlideFade,
  Stack,
  VStack,
  Text,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Divider,
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu, AiFillInfoCircle } from "react-icons/ai";
import { MoonquakeType } from "@/type/moon";
import { Option, OptionConstants } from "@/type/option";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const Header = (props: Props) => {
  const { option, setOption } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box
        backdropFilter="blur(4px)"
        position="absolute"
        top={0}
        left={0}
        w={isOpen ? "280px" : "0px"}
        h="100%"
        zIndex={1}
        transition="0.1s"
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        userSelect="none"
        h="fit-content"
        w="280px"
        zIndex={1}
        opacity="70%"
        backdropFilter="blur(2px)"
      >
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
          <Box position="absolute" top="0px" left="0px" w="100%" h="60px" bgColor="gray.300" zIndex={5}>
            <Divider position="absolute" top="60px" left="0px" borderColor="gray.600" zIndex={6} />
          </Box>
          <VStack bgColor="gray.300" h="100vh" pt="72px" px="26px" gap={2} color="gray.600" overflowY="scroll">
            <FilterSetting option={option} setOption={setOption} />
            <Divider borderColor="gray.600" pt={4} />
            <Box w="100%">
              <Text fontSize={24} fontWeight="medium" pt={2}>
                Settings
              </Text>
              <SwitchSetting
                name="Auto Rotate"
                checked={option.autoRotate}
                onChange={() => setOption({ ...option, autoRotate: !option.autoRotate })}
              />
              <Box w="100%" pb={1}>
                <Switch size="md" colorScheme="teal" defaultChecked fontSize={18}>
                  Height Map
                </Switch>
              </Box>
              <Box w="100%">
                <Switch size="md" colorScheme="teal" defaultChecked fontSize={18}>
                  Lunar eclipse
                </Switch>
              </Box>
            </Box>
            <Divider borderColor="gray.600" pt={4} />
            <Box w="100%" pt={2}>
              <Text fontSize={24} fontWeight="medium">
                Change Size
              </Text>
              <Slider aria-label="slider-ex-2" colorScheme="teal" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box w="100%" pt={2}>
              <Text fontSize={24} fontWeight="medium">
                Time Speed
              </Text>
              <Slider aria-label="slider-ex-2" colorScheme="teal" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box w="100%" pt={2}>
              <Text fontSize={24} fontWeight="medium">
                Layer Transparency
              </Text>
              <Text fontSize={16} pb={2}>
                (only map)
              </Text>
              <Slider aria-label="slider-ex-2" colorScheme="teal" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Divider borderColor="gray.600" pt={4} />
            <Box w="100%" py={2}>
              <Text fontSize={24} fontWeight="medium" pb={2}>
                Layer Select
              </Text>
              <RadioGroup colorScheme="teal">
                <Stack direction="column">
                  <Radio value="1" bgColor="gray.400">
                    1
                  </Radio>
                  <Radio value="2" bgColor="gray.400">
                    2
                  </Radio>
                  <Radio value="3" bgColor="gray.400">
                    3
                  </Radio>
                  <Radio value="4" bgColor="gray.400">
                    4
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Divider borderColor="gray.600" pt={2} />
            <YearSlider option={option} setOption={setOption} />
            <Text pt={6} pb={4}>
              ©ESO/S. Brunier
            </Text>
          </VStack>
        </SlideFade>
      </Box>
    </>
  );
};

type SwitchSettingProps = {
  name: string;
  checked: boolean;
  onChange: () => void;
};

const SwitchSetting = (props: SwitchSettingProps) => {
  const { name, checked, onChange } = props;
  return (
    <Box w="100%" pt={2} pb={1}>
      <Switch size="md" colorScheme="teal" fontSize={18} isChecked={checked} onChange={onChange}>
        {name}
      </Switch>
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

type FilterSettingProps = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

const FilterSetting = (props: FilterSettingProps) => {
  const { option, setOption } = props;

  const changeView = (type: MoonquakeType) => {
    const viewType = option.viewType;
    if (viewType.has(type)) {
      viewType.delete(type);
    } else {
      viewType.add(type);
    }
    setOption({ ...option, viewType: viewType });
  };

  return (
    <Box w="100%">
      <Text fontSize={24} fontWeight="medium">
        Filter
      </Text>
      <Text fontSize={12}>
        <Icon as={AiFillInfoCircle} fontSize={12} mr="8px" />
        Click to filter.
      </Text>
      <Box w="100%" pt={3} pb={1}>
        <Checkbox size="lg" colorScheme="teal" onChange={() => changeView(0)} defaultChecked>
          Shallow
        </Checkbox>
      </Box>
      <Box w="100%" pb={1}>
        <Checkbox size="lg" colorScheme="teal" onChange={() => changeView(1)} defaultChecked>
          Deep
        </Checkbox>
      </Box>
      <Box w="100%">
        <Checkbox size="lg" colorScheme="teal" onChange={() => changeView(2)} defaultChecked>
          Artifical
        </Checkbox>
      </Box>
    </Box>
  );
};
