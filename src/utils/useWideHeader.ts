import { useBreakpointValue } from "@chakra-ui/react";

export const useWideHeader = () => useBreakpointValue({ base: "sp", md: "pc" }) === "pc";
