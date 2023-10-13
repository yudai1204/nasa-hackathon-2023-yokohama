import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Icon,
  Box,
  Text,
} from "@chakra-ui/react";
import { AiFillClockCircle, AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { ExplainBox } from "./explainBox";

const manipulations = [
  {
    subtitle: "2D Map",
    children: "Scroll up and zoom to switch to 2D map.",
  },
  {
    subtitle: "Filter",
    children: "Select the types of moonquakes that display.",
  },
  {
    subtitle: "General Settings",
    children:
      "Performance Mode is literally a mode that improves performance. Auto Rotate allows you to select whether the moon rotates or not.",
  },
  {
    subtitle: "Time Speed",
    children: "Adjust the playback speed.",
  },
  {
    subtitle: "Layer Select",
    children: "Select the layers of the 2D map and adjust its opacity.",
  },
  {
    subtitle: "Playback",
    children: (
      <>
        Manual playback is possible by operating the slide bar. If you want to play automatically, click this icon
        <Icon as={AiFillClockCircle} /> and press the play button <Icon as={AiFillPlayCircle} />. Press this icon
        <Icon as={AiFillPauseCircle} /> to stop playback. Adjust the playback speed using Time Speed.
      </>
    ),
  },
  {
    subtitle: "Detail",
    children: "Show details about earthquake.",
  },
];

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const DisplayHintModal = (props: Props) => {
  const { onClose, isOpen } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader style={{ fontSize: "33px" }}>Guide</ModalHeader>
        <ModalBody>
          <Box>
            <Text fontWeight="bold" fontSize="140%">
              Overview
            </Text>
            <Box pl="20px" pr="20px" pt="10px" pb="10px">
              <Text>
                This application displays moonquakes observed by Apollo, and by combining them with other data, you can
                examine the mechanism of it.
              </Text>
              <iframe
                src="https://www.youtube.com/embed/Il3rgj9Lo7g?si=MMDTfpaB14lkOs4B"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ aspectRatio: "16/9", width: "100%" }}
              />
            </Box>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="140%">
              Methods of operation
            </Text>
            <Box pl="20px" pr="20px" pt="10px" pb="10px">
              {manipulations.map((manipulation, idx) => (
                <ExplainBox key={idx} subtitle={manipulation.subtitle}>
                  {manipulation.children}
                </ExplainBox>
              ))}
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
