import { useBreakpointValue } from "@chakra-ui/react";

export const useWideHeader = () => useBreakpointValue({ base: "sp", sm: "pc" }) === "pc";
