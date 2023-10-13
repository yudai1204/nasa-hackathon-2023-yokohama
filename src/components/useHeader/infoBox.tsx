import { Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillInfoCircle } from "react-icons/ai";

type Props = {
  children: React.ReactNode;
};
export const InfoBox = (props: Props) => {
  const { children } = props;
  return (
    <Flex justify="left" align="center" w="100%" pt={1} pb={2}>
      <Icon as={AiFillInfoCircle} fontSize={16} mr="8px" />
      <Text fontSize={12} lineHeight={1}>
        {children}
      </Text>
    </Flex>
  );
};
