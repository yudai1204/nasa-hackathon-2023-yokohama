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
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu, AiFillInfoCircle } from "react-icons/ai";

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box position="absolute" top={0} left={0} userSelect="none" h="fit-content" w="280px" zIndex={1}>
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
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium">
              Filter
            </Text>
            <Text fontSize={12}>
              <Icon as={AiFillInfoCircle} fontSize={12} mr="8px" />
              Click to filter.
            </Text>
            <Box w="100%" pt={3} pb={1}>
              <Checkbox size="lg" colorScheme="teal" defaultChecked>
                Shallow
              </Checkbox>
            </Box>
            <Box w="100%" pb={1}>
              <Checkbox size="lg" colorScheme="teal" defaultChecked>
                Deep
              </Checkbox>
            </Box>
            <Box w="100%">
              <Checkbox size="lg" colorScheme="teal" defaultChecked>
                Artifical
              </Checkbox>
            </Box>
          </Box>
          <Divider borderColor="gray.600" pt={4} />
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium" pt={2}>
              Settings
            </Text>
            <Box w="100%" pt={2} pb={1}>
              <Switch size="md" colorScheme="teal" defaultChecked fontSize={18}>
                Auto Rotate
              </Switch>
            </Box>
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
        </VStack>
      </SlideFade>
    </Box>
  );
};
