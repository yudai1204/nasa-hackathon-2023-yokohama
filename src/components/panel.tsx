import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { MdDragIndicator } from "react-icons/md";
import { MoonquakeData, isArtificialImpact, isDeepMoonquake, isShallowMoonquake } from "@/type";

type Data = {
  year?: number;
  latitude?: number;
  longitude?: number;
  type?: string;
  addDataKey?: string;
  addDataValue?: number | string;
};

const convertToData = (moonquake: MoonquakeData | null): Data => {
  if (!moonquake) return {};

  const { time, location } = moonquake;
  const year = time?.year;
  const latitude = location.latitude;
  const longitude = location.longitude;
  const type = ["Shallow Moonquake", "Deep Moonquake", "Artificial Impact"][moonquake.type];
  const addDataKey = ["Magnitude", "Depth", "AI"][moonquake.type];
  const addDataValue = (() => {
    if (isShallowMoonquake(moonquake)) return moonquake.magnitude;
    if (isDeepMoonquake(moonquake)) return moonquake.depth;
    if (isArtificialImpact(moonquake)) return moonquake.ai;
    return undefined;
  })();
  return { year, latitude, longitude, type, addDataKey, addDataValue };
};

type DisplayDataItemProps = {
  label?: string;
  value?: number | string;
};
const DisplayDataItem = (props: DisplayDataItemProps) => {
  const { label, value } = props;
  return (
    <Text fontSize="16px" height="40px" lineHeight="40px" borderTop="1px solid" borderColor="#B0BAC640" w="100%">
      {label ?? "N/A"}: {value ?? "N/A"}
    </Text>
  );
};

type Props = {
  choiceMoonquake: MoonquakeData | null;
};

export const Panel = (props: Props) => {
  const [isOpen, setIsOpnen] = useState(false);

  const data = convertToData(props.choiceMoonquake);

  useEffect(() => {
    if (data.latitude && data.longitude) setIsOpnen(true);
  }, [data.latitude, data.longitude]);

  return (
    <Box
      position="absolute"
      top={10}
      right={10}
      zIndex={1}
      w="fit-content"
      h={isOpen ? "272px" : "64px"}
      borderRadius="md"
      color="gray.200"
      border="1px solid"
      borderColor="gray.200"
      bgColor="#fff1"
      minW="240px"
      userSelect="none"
      backdropFilter="blur(2px)"
      overflow="hidden"
      transition="0.3s"
    >
      <Box w="100%" h="100%" position="relative" px="24px" py="16px">
        <Text fontWeight={500} fontSize={20} pb="10px">
          Detail
        </Text>
        <Icon
          position="absolute"
          as={MdDragIndicator}
          fontSize={30}
          opacity={0.8}
          top={4}
          right={4}
          cursor="pointer"
          transition={"0.3s"}
          _hover={{ opacity: 0.5 }}
          onClick={() => {
            setIsOpnen(!isOpen);
          }}
        />

        <VStack spacing={0} align="flex-start" opacity={isOpen ? 1 : 0} transition="0.3s">
          <DisplayDataItem label="Year" value={data.year} />
          <DisplayDataItem label="Latitude" value={data.latitude} />
          <DisplayDataItem label="Longitude" value={data.longitude} />
          <DisplayDataItem label="Type" value={data.type} />
          <DisplayDataItem label={data.addDataKey} value={data.addDataValue} />
        </VStack>
      </Box>
    </Box>
  );
};
