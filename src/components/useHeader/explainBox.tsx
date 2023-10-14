import { Box, Text } from "@chakra-ui/react";
import React from "react";

type ExplainProps = {
  subtitle: string;
  children: React.ReactNode;
};
export const ExplainBox = (props: ExplainProps) => {
  const { subtitle, children } = props;
  return (
    <Box>
      <Text fontWeight="bold" fontSize="120%">
        {subtitle}
      </Text>
      <Text>{children}</Text>
    </Box>
  );
};
