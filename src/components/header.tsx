import {
  Box,
  Icon,
  useDisclosure,
  SlideFade,
  Stack,
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Divider,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { SwitchSetting, TypeFilterSetting, YearSlider } from "@/components/useHeader";
import { Footer } from "@/components/useHeader/footer";
import { Option } from "@/type/option";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

export const Header = (props: Props) => {
  const { option, setOption } = props;
  const { isOpen, onToggle } = useDisclosure();
  const width = { base: "100%", sm: "280px" };
  return (
    <>
      <Box
        backdropFilter="blur(4px)"
        position="absolute"
        top={0}
        left={0}
        w={isOpen ? width : "0px"}
        h="100%"
        zIndex={2}
        transition="0.1s"
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        userSelect="none"
        h="fit-content"
        w={width}
        zIndex={2}
        opacity={{ base: 0.9, sm: 0.7 }}
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
          cursor="pointer"
        />
        <SlideFade in={isOpen} offsetX={-80} offsetY={0} unmountOnExit>
          <Box position="absolute" top="0px" left="0px" w="100%" h="60px" bgColor="gray.300" zIndex={5}>
            <Divider position="absolute" top="60px" left="0px" borderColor="gray.600" zIndex={6} />
          </Box>
          <VStack
            bgColor="gray.300"
            h="calc(100svh - 60px)"
            mt="60px"
            pt="12px"
            px="26px"
            gap={2}
            color="gray.600"
            overflowY="scroll"
          >
            <TypeFilterSetting option={option} setOption={setOption} />
            <Divider borderColor="gray.600" pt={4} />
            <VStack w="100%" gap={1}>
              <Text fontSize={24} fontWeight="medium" pt={2} w="100%">
                Settings
              </Text>
              <SwitchSetting
                name="Performance Mode"
                checked={option.performanceMode}
                onChange={() => setOption({ ...option, performanceMode: !option.performanceMode })}
              />
              <SwitchSetting
                name="Auto Rotate"
                checked={option.autoRotate}
                onChange={() => setOption({ ...option, autoRotate: !option.autoRotate })}
              />
              <Box w="100%">
                <Switch size="md" colorScheme="teal" defaultChecked fontSize={18}>
                  Height Map
                </Switch>
              </Box>
              <Box w="100%">
                <Switch size="md" colorScheme="teal" defaultChecked fontSize={18}>
                  Lunar eclipse
                </Switch>
              </Box>
            </VStack>
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
            <Footer />
          </VStack>
        </SlideFade>
      </Box>
    </>
  );
};
