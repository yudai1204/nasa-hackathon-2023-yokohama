import { Flex, Text, Icon } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { CgScrollV } from "react-icons/cg";
import { GiClick } from "react-icons/gi";
import { MdOutlinePinch } from "react-icons/md";
import { useWideHeader } from "@/utils/useWideHeader";

const bounce = keyframes`
  0%, 100% {
    transform: scale(1,1);
    opacity: 0.6;
  }

  50% {
    transform: scale(1.1,1.1);
    opacity: 1;
  }
`;

type Props = {
  setDisplayHint: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ZoomHintPopup = (props: Props) => {
  const { setDisplayHint } = props;
  const wideHeader = useWideHeader();
  const [isSP, setIsSP] = useState(false);
  useEffect(() => {
    if (wideHeader) {
      setIsSP(false);
    } else {
      setIsSP(true);
    }
  }, [wideHeader]);

  return (
    <Flex
      zIndex={1}
      position="absolute"
      top="40%"
      left="calc(50% - 120px)"
      w="240px"
      align="center"
      justify="center"
      gap={4}
      userSelect="none"
      css={css`
        animation: ${bounce} 3s ease-in-out infinite;
      `}
      onClick={() => setDisplayHint(false)}
    >
      <Icon as={isSP ? MdOutlinePinch : CgScrollV} fontSize={32} color="white" />
      <Text fontSize={16} color="white">
        {isSP ? "Pinch out" : "Scroll up"} and zoom
        <br /> to switch to 2D map
      </Text>
    </Flex>
  );
};

export const ClickHintPopup = () => {
  const wideHeader = useWideHeader();
  const [isSP, setIsSP] = useState(false);
  useEffect(() => {
    if (wideHeader) {
      setIsSP(false);
    } else {
      setIsSP(true);
    }
  }, [wideHeader]);

  return (
    <Flex
      zIndex={1}
      position="absolute"
      top="25%"
      left="calc(50% - 125px)"
      w="250px"
      align="center"
      justify="center"
      gap={4}
      userSelect="none"
      css={css`
        animation: ${bounce} 3s ease-in-out infinite;
      `}
    >
      <Icon as={GiClick} fontSize={32} color="white" />
      <Text fontSize={16} color="white">
        {isSP ? "Tap" : "Click"} quakes, place name <br />
        and the Earth to see details
      </Text>
    </Flex>
  );
};
