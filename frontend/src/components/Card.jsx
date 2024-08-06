import {
  Box,
  Spacer,
  VStack,
  Flex,
  HStack,
  Text,
  Badge,
  Link,
  Tag,
  TagLabel,
  useMediaQuery,
} from "@chakra-ui/react";
import "react-resizable/css/styles.css";
import PropTypes from "prop-types";
import EditModal from "./EditModal.jsx";

const Card = ({ updateCard, card, day, participants }) => {
  const [isLargerThan700] = useMediaQuery("(min-width: 600px)");

  return (
      <Flex
        mb={6}
        mt={6}
        borderRadius={12}
        bg={"white"}
        p={4}
        justifyContent={"space-between"}
      >
        <Flex direction="column" w="18%" justifyContent="space-between">
          <Text>{card.startTime}</Text>
          <Text>{card.endTime}</Text>
        </Flex>

        <Flex
          mb={2}
          justifyContent={"space-between"}
           w="80%"
        >
          <Box>
            <Text fontWeight="bold">{card.destination}</Text>
            <Text mt={2}>
              <Link href={card.mapLink} color="blue.500" mt={2} isExternal>
                地図を開く
              </Link>
            </Text>
            <HStack flexWrap={"wrap"} mt={2}>
              <Badge colorScheme="green" ml={0}>
                状態: {card.status ? "決定" : "候補"}
              </Badge>
              <Badge colorScheme="blue" mr={0}>
                予約者: {card.participantsInCard[card.reserver]}
              </Badge>
              <Badge colorScheme="yellow">
                予約:{" "}
                {card.reserve == 1
                  ? "済み(不要)"
                  : card.reserve == 0
                  ? "まだ"
                  : ""}
              </Badge>
            </HStack>

            <Text mt={2}>{card.notes}</Text>
          </Box>

          <VStack h={"100%"} justify={"space-between"} align={"end"}>
            <EditModal
              updateCard={updateCard}
              card={card}
              day={day}
              participants={participants}
            />

            <Spacer />
            {isLargerThan700 && (
              <HStack wrap="wrap" justify={"end"} flexWrap={"nowrap"}>
                {card.participantsInCard
                  .slice(0, 5)
                  .map((participant, index) => (
                    <Tag
                      key={index}
                      size="md"
                      colorScheme="blue"
                      borderRadius="full"
                      ml={-6}
                      h={8}
                      w={8}
                      fontSize={10}
                      borderColor={"white"}
                      borderWidth={"2px"}
                    >
                      <TagLabel>{participant.slice(0, 1)}</TagLabel>
                    </Tag>
                  ))}
                {card.participantsInCard.length > 5 && (
                  <Tag
                    size="md"
                    colorScheme="blue"
                    borderRadius="full"
                    ml={-6}
                    h={8}
                    w={8}
                    fontSize={10}
                    borderColor={"white"}
                    borderWidth={"2px"}
                  >
                    <TagLabel>+{card.participantsInCard.length - 5}</TagLabel>
                  </Tag>
                )}
              </HStack>
            )}
          </VStack>
        </Flex>
      </Flex>
  );
};

Card.propTypes = {
  card: PropTypes.any,
  index: PropTypes.number,
  day: PropTypes.any,
  participants: PropTypes.array,
  updateCard: PropTypes.func,
};

export default Card;
