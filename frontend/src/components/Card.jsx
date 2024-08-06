import {
  Box,
  Spacer,
  VStack,
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
          <Box borderRadius={16} bg={"gray.100"} p={5} w={"100%"} mb={2}>
            <HStack w={"100%"}>
              <Box>
                <Text fontWeight="bold">{card.destination}</Text>
                <Link href={card.mapLink} color="blue.500" isExternal>
                  地図を開く
                </Link>
                <Text>
                  <span>{card.startTime}</span>ー<span>{card.endTime}</span>
                </Text>

                <HStack width={"80%"} flexWrap={"wrap"}>

                <Badge colorScheme="green" ml={0}>
                  ステータス: {card.status ? "決定" : "未定"}
                </Badge>
                <Badge colorScheme="blue" mr={0}>
                  予約者: {card.participantsInCard[card.reserver]}
                </Badge>
                <Badge colorScheme="yellow">予約の有無: {card.reserve == 1 ? "予約済み(予約不要)" : card.reserve == 0 ? "未予約" : "" }</Badge>

                </HStack>

                <Text>{card.notes}</Text>
              </Box>

              <Spacer />

              <VStack direction={"column"} align={"end"} justify={"start"}>
                <EditModal
                  updateCard={updateCard}
                  card={card}
                  day={day}
                  participants={participants}
                />

                <Spacer />

                <HStack wrap="wrap" align={"space-between"} justify={"end"} flexWrap={"nowrap"}
                position={"relative"}
                bottom={"-24px"}
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
          </Box>
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