import { Box, Icon, useDisclosure, SlideFade, VStack, Text } from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box position="absolute" top={0} left={0} userSelect="none" h="fit-content">
      <Icon
        position="absolute"
        top="24px"
        left="24px"
        as={isOpen ? AiOutlineClose : AiOutlineMenu}
        fontSize={24}
        color={isOpen ? "gray.600" : "gray.300"}
        onClick={onToggle}
        zIndex={1}
      />
      <SlideFade in={isOpen} offsetX={-20} offsetY={0} unmountOnExit>
        <VStack bgColor="gray.300" h="100vh" pt="72px" pl="26px" gap={2} color="gray.600">
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium">
              Filter
            </Text>
          </Box>
          <Box w="100%">
            <Text fontSize={24} fontWeight="medium">
              Settings
            </Text>
          </Box>
          <Box w="100%">Change Size</Box>
        </VStack>
      </SlideFade>
    </Box>
  );
};
