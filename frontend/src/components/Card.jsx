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
} from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd";
import "react-resizable/css/styles.css";
import PropTypes from "prop-types";
import EditModal from "./EditModal.jsx";

const Card = ({ updateCard, card, index, day, participants }) => {
  return (
    <Draggable
      key={String(card.id)}
      draggableId={String(card.id)}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}

        >
          <HStack alignItems={"stretch"} mb={6}>

            <Flex direction="column" w="15%" justifyContent="space-between" p={1}>
              <Text>{card.startTime}</Text>
              <Spacer />
              <Text>{card.endTime}</Text>
            </Flex>

            <HStack borderRadius={16} bg={"gray.100"} p={5} w={"85%"} mb={2}>
              <Box>
                <Text fontWeight="bold">{card.destination}</Text>
                <Text mt={2}>
                  <Link href={card.mapLink} color="blue.500" mt={2} isExternal>
                    地図を開く
                  </Link>
                </Text>
                <HStack width={"80%"} flexWrap={"wrap"} mt={2}>
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

              <Spacer />

              <VStack h={"100%"} justify={"space-between"} align={"end"}>
                <EditModal
                  updateCard={updateCard}
                  card={card}
                  day={day}
                  participants={participants}
                />

                <Spacer />

                <HStack
                  wrap="wrap"
                  justify={"end"}
                  flexWrap={"nowrap"}
                >
                  {card.participantsInCard.map((participant, index) => (
                    <Tag
                      key={index}
                      size="md"
                      colorScheme="blue"
                      borderRadius="full"
                      ml={-4}
                      w={8}
                      h={8}
                      borderColor={"white"}
                      borderWidth={"2px"}
                    >
                      <TagLabel>{participant.slice(0, 1)}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              </VStack>
            </HStack>
          </HStack>
        </div>
      )}
    </Draggable>
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
