import {
  Box,
  Button,
  Icon,
  useDisclosure,
  SlideFade,
  Stack,
  VStack,
  Text,
  Tooltip,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Divider,
  RadioGroup,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineInfoCircle } from "react-icons/ai";
import { DisplayHintModal } from "./useHeader/displayHint";
import { InfoBox } from "./useHeader/infoBox";
import { LayerRadio } from "./useHeader/layerRadio";
import { SwitchSetting, TypeFilterSetting } from "@/components/useHeader";
import { Footer } from "@/components/useHeader/footer";
import { Option } from "@/type";
import { useWideHeader } from "@/utils/useWideHeader";

type Props = {
  option: Option;
  setOption: React.Dispatch<React.SetStateAction<Option>>;
};

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
  color: "gray.600",
};

export const Header = (props: Props) => {
  const { option, setOption } = props;
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isHintOpen, onOpen: onHintOpen, onClose: onHintClose } = useDisclosure();
  const width = { base: "100%", md: "280px" };
  const wideHeader = useWideHeader();

  useEffect(() => {
    if (wideHeader) {
      onToggle();
    }
  }, [wideHeader]);

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
        opacity={{ base: 0.9, md: 0.7 }}
        backdropFilter="blur(2px)"
      >
        <Box pos="absolute" top="8px" left="8px" p="8px" cursor="pointer" onClick={onToggle} zIndex={1}>
          <Icon as={isOpen ? AiOutlineClose : AiOutlineMenu} fontSize={32} color={isOpen ? "gray.600" : "gray.100"} />
        </Box>
        <SlideFade in={isOpen} offsetX={-80} offsetY={0} unmountOnExit>
          <Box bgColor="gray.100" h="100svh" w="100%" position="absolute">
            <Box
              position="absolute"
              top="0"
              left="0"
              h="60px"
              w="100%"
              boxShadow="0 0 10px -3px #0008"
              borderColor="transparent"
              pl={{ base: "calc(100% - 120px)", md: "170px" }}
              pt="10px"
            >
              <Button onClick={onHintOpen} bgColor={isHintOpen ? "gray.300" : "transparent"} border="1px solid #0002">
                <Tooltip>
                  <Icon as={AiOutlineInfoCircle} />
                </Tooltip>
                <Text ml={1}>Guide</Text>
              </Button>
            </Box>
            <VStack h="calc(100svh - 60px)" mt="60px" pt="16px" px="26px" gap={2} color="gray.600" overflowY="scroll">
              <TypeFilterSetting option={option} setOption={setOption} />
              <Divider borderColor="gray.600" pt={4} />
              <VStack w="100%" gap={1}>
                <Text fontSize={24} fontWeight="medium" pt={2} w="100%">
                  General Settings
                </Text>
                <InfoBox>Select and change the behavior of the moon.</InfoBox>
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
                {/* <Box w="100%">
                  <Switch size="md" colorScheme="teal" defaultChecked fontSize={18}>
                    Lunar eclipse
                  </Switch>
                </Box> */}
              </VStack>
              <Divider borderColor="gray.600" pt={4} />
              {/* <Box w="100%" pt={2}>
                <Text fontSize={24} fontWeight="medium">
                  Change Size
                </Text>
                <Slider aria-label="slider-ex-2" colorScheme="teal" defaultValue={30}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box> */}
              <Box w="100%" pt={2}>
                <Text fontSize={24} fontWeight="medium">
                  Time Speed
                </Text>
                <InfoBox>Change the speed for the play function of the 3D moonquakes map.</InfoBox>
                <Slider
                  aria-label="slider-ex-2"
                  colorScheme="teal"
                  min={1}
                  max={20}
                  defaultValue={option.playInfo.speed}
                  value={option.playInfo.speed}
                  onChange={(speed) => setOption({ ...option, playInfo: { ...option.playInfo, speed: speed } })}
                >
                  <SliderMark value={2} {...labelStyles}>
                    slow
                  </SliderMark>
                  <SliderMark value={19} {...labelStyles}>
                    fast
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Divider borderColor="gray.600" pt={4} />
              <Box w="100%" py={2}>
                <Text fontSize={24} fontWeight="medium" pb={2}>
                  Layer Settings
                </Text>
                <InfoBox>Select the second layer for the 2D map.</InfoBox>
                <Box w="100%">
                  <SwitchSetting
                    name="Display Layer"
                    checked={option.displayLayer}
                    onChange={() => setOption({ ...option, displayLayer: !option.displayLayer })}
                  />
                  <Divider borderColor="gray.400" my={4} />
                  <Box w="100%" pb={2}>
                    <Text fontSize={16} pb={2}>
                      Opacity: {option.layerOpacity * 100}%
                    </Text>
                    <Slider
                      aria-label="slider-ex-3"
                      colorScheme="teal"
                      min={0}
                      max={100}
                      step={10}
                      defaultValue={option.layerOpacity * 100}
                      onChange={(e) => setOption({ ...option, layerOpacity: e / 100 })}
                    >
                      <SliderMark value={7} {...labelStyles}>
                        transparent
                      </SliderMark>
                      <SliderMark value={84} {...labelStyles}>
                        opaque
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </Box>
                </Box>
                <Divider borderColor="gray.400" my={4} />
                <RadioGroup
                  colorScheme="teal"
                  defaultValue={option.layerIdx.toString()}
                  onChange={(e) => {
                    setOption({ ...option, layerIdx: parseInt(e) });
                  }}
                >
                  <Stack direction="column">
                    <LayerRadio
                      value={0}
                      mapName="Color Hillshade"
                      projectName="Kaguya LGM2011"
                      projectUrl="https://trek.nasa.gov/moon/TrekWS/rest/cat/metadata/fgdc/html?label=LRO_LOLAKaguya_ClrHillshade_60N60S_512ppd"
                    />
                    <LayerRadio
                      value={1}
                      mapName="Freeair Gravity"
                      projectName="Kaguya LGM2011"
                      projectUrl="https://trek.nasa.gov/moon/TrekWS/rest/cat/metadata/fgdc/html?label=Kaguya_LGM2011_FreeairGravity_Colorized_Global_mgal3m_20ppd"
                    />
                    <LayerRadio
                      value={2}
                      mapName="Bouguer disturbances"
                      projectName="GRAIL L180"
                      projectUrl="https://trek.nasa.gov/moon/TrekWS/rest/cat/metadata/fgdc/html?label=gggrx_1200a_boug_l180.eq"
                    />
                    <LayerRadio
                      value={3}
                      mapName="Crust-mantle Interface Depth"
                      projectName="GRAIL"
                      fontSize={13}
                      projectUrl="https://trek.nasa.gov/moon/TrekWS/rest/cat/metadata/fgdc/html?label=Model1_cmi.eq"
                    />
                  </Stack>
                </RadioGroup>
              </Box>
              <Footer />
            </VStack>
          </Box>
        </SlideFade>
        <DisplayHintModal isOpen={isHintOpen} onClose={onHintClose} />
      </Box>
    </>
  );
};
