import { Flex, Text, Box } from "@chakra-ui/react";
import { useMemo } from "react";
import type { LngLat } from "@/type";

type Props = {
  lngLats: [LngLat, LngLat];
  windowWidth: number | undefined;
};
export const LngLatDisplay = (props: Props) => {
  const { lngLats, windowWidth } = props;

  const km = useMemo(() => {
    if (!windowWidth) return undefined;
    const pageWidthLng = lngLats[1].lng - lngLats[0].lng;
    const centerLat = (lngLats[0].lat + lngLats[1].lat) / 2;
    const cos = Math.cos((centerLat * Math.PI) / 180);
    return Math.floor(((pageWidthLng * 100) / windowWidth) * 15.16 * cos);
  }, [lngLats, windowWidth]);

  return (
    <Flex position="absolute" w="100%" bottom={50} zIndex={1} align="center" justify="center" userSelect="none">
      <Flex
        w="80%"
        maxW="360px"
        h="fit-content"
        bgColor="gray.900"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="20px"
        px="40px"
        py="8px"
        justify="center"
        align="center"
      >
        <Box w="100%">
          <Text fontSize="16px" color="white">
            <span style={{ display: "inline-block", width: "90px" }}>Longitude:</span>
            {Math.floor((lngLats[0].lng + lngLats[1].lng) / 4)}°
          </Text>
          <Text fontSize="16px" color="white">
            <span style={{ display: "inline-block", width: "90px" }}>Latitude:</span>
            {Math.floor((lngLats[0].lat + lngLats[1].lat) / 2)}°
          </Text>
        </Box>
        {km && (
          <Box>
            <Flex gap={0} align="center" justify="center" pt="10px">
              <Box h="10px" bg="white" w="2px" />
              <Box h="2px" bg="white" w="96px" />
              <Box h="10px" bg="white" w="2px" />
            </Flex>
            <Text fontSize="16px" color="white" textAlign="center">
              {km} km
            </Text>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
