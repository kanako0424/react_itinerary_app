import { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  VStack,
  Flex,
  Container,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "react-resizable/css/styles.css";
import Header from "../components/Header";
import DaySelector from "../components/DaySelector";
import { daysContext, selectedDayContext } from "../components/contexts";
import ParticipantManager from "../components/ParticipantManager";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const initialCards = {
  1: [
    {
      day: 1,
      id: uuidv4(),
      destination: "目的地",
      mapLink: "",
      startTime: "12:00",
      endTime: "13:00",
      status: 0,
      reserver: 0,
      reserve: 1,
      participantsInCard: ["太郎", "二郎", "三郎"],
      notes: "",
      order: 0,
    },
  ],
  2: [
  //   {
  //     day: 2,
  //     id: uuidv4(),
  //     destination: "目的地2",
  //     mapLink: "",
  //     startTime: "12:00",
  //     endTime: "13:00",
  //     status: 0,
  //     reserver: 0,
  //     reserve: 1,
  //     participantsInCard: ["太郎", "二郎", "三郎"],
  //     notes: "",
  //     order: 0,
  //   },
  ],
  3: [
  //   {
  //     day: 3,
  //     id: uuidv4(),
  //     destination: "目的地3",
  //     mapLink: "",
  //     startTime: "12:00",
  //     endTime: "13:00",
  //     status: 0,
  //     reserver: 0,
  //     reserve: 1,
  //     participantsInCard: ["太郎", "二郎", "三郎"],
  //     notes: "",
  //     order: 0,
  //   },
  ],
};

const initialParticipants = ["太郎", "二郎", "三郎"];



const Trip = () => {
  const { tripId } = useParams();
  const initialTrip = {
    tripId: tripId,
    tripTitle: "旅行のタイトル",
    cards: initialCards,
    participants: initialParticipants,
  };

  const [participants, setParticipants] = useState(initialTrip.participants);
  const [cards, setCards] = useState(initialTrip.cards);
  const [days, setDays] = useState([1, 2, 3]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showPlans, setShowPlans] = useState(true);
  const [tripTitle, setTripTitle] = useState(initialTrip.tripTitle);

  console.log(tripId)

  useEffect(() => {
    const dayList = document.getElementById(`day${selectedDay}-list`);
    if (dayList) {
      dayList.scrollIntoView({ behavior: "smooth", inline: "start", block: "end" });
    }

  }, [selectedDay])
  

  const handleAddCard = useCallback(() => {
    let date = new Date();
    var d1 =
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2);

    const lastOrder =
      cards[selectedDay].length > 0
        ? cards[selectedDay][cards[selectedDay]?.length - 1].order
        : -1;

    const newCard = {
      day: selectedDay,
      id: uuidv4(),
      destination: "目的地",
      mapLink: "",
      startTime: d1,
      endTime: d1,
      status: 1,
      reserver: 0,
      reserve: 1,
      participantsInCard: participants,
      notes: "",
      order: lastOrder + 1,
    };

    setCards((prevCards) => ({
      ...prevCards,
      [selectedDay]: [...(prevCards[selectedDay] || []), newCard],
    }));
    console.log(cards);

    // スクロールを行う
    setTimeout(() => {
      const addButton = document.getElementById("add-card-button");
      if (addButton) {
        addButton.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, [selectedDay, participants, setCards, cards]);

  const handleDragEnd = useCallback(
    (result) => {
      console.log("result: " + result.destination);
      if (!result.destination) return;

      const sourceDay = parseInt(result.source.droppableId);
      const destinationDay = parseInt(result.destination.droppableId);

      const sourceItems = Array.from(cards[sourceDay]);
      const [movedItem] = sourceItems.splice(result.source.index, 1);

      if (sourceDay === destinationDay) {
        sourceItems.splice(result.destination.index, 0, movedItem);
        setCards((prevCards) => ({
          ...prevCards,
          [sourceDay]: sourceItems,
        }));
      } else {
        console.log(destinationDay)
        const destinationItems = Array.from(cards[destinationDay]);
        destinationItems.splice(result.destination.index, 0, movedItem);
        setCards((prevCards) => ({
          ...prevCards,
          [sourceDay]: sourceItems,
          [destinationDay]: destinationItems,
        }));
      }

      setTimeout(() => {
        setSelectedDay(destinationDay)
        const dayList = document.getElementById(`day${destinationDay}-list`);
        if (dayList) {
          dayList.scrollIntoView({ behavior: "smooth", inline: "start" });
        }
      }, 0);

    },

    [cards]
  );

  const handleDragUpdate = useCallback(
    (update) => {
      if (!update.destination) return;

      const destinationDay = parseInt(update.destination.droppableId);
      setTimeout(() => {
        setSelectedDay(destinationDay)
        
      }, 0);
    },
    []
  );

  const updateCard = (day, updatedCard) => {
    setCards((prevCards) => ({
      ...prevCards,
      [day]: prevCards[day].map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      ),
    }));
  };

  const daysContextValue = useMemo(() => ({ days, setDays }), [days]);
  const selectedDayContextValue = useMemo(
    () => ({ selectedDay, setSelectedDay }),
    [selectedDay]
  );

  return (
    <daysContext.Provider value={daysContextValue}>
      <selectedDayContext.Provider value={selectedDayContextValue}>
        <ChakraProvider>
          <Box bg="white" minH="100vh">
            <Box>
              <Header tripTitle={tripTitle} setTripTitle={setTripTitle} />
            </Box>
            <Navbar
              setShowParticipants={setShowParticipants}
              setShowPlans={setShowPlans}
            />

            {showPlans && (
              <>
                <DaySelector cards={cards} setCards={setCards} />
                <Container maxW="container.md" pb={"100px"} pt={"175px"}>
                  <DragDropContext
                    onDragEnd={handleDragEnd}
                    onDragUpdate={handleDragUpdate}
                  >
                    <Flex
                      overflowY="scroll"
                      position="relative"
                      id="droppableContextOuter"
                      mb={10}
                    >
                      {days.map((day) => (

                        <Droppable key={day} droppableId={String(day)} >
                          {(provided) => (
                            <VStack
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              spacing={4}
                              display="block"
                              minWidth={"100%"}
                              m={2}
                              p={2}
                              borderRadius={16}
                              bg={"gray.100"}
                              id={`day${day}-list`}
                            >
                              {(cards[day] && cards[day].length > 0) || (selectedDay == day && cards[day].length != 0) ? (
                                cards[day]?.map((card, index) => (
                                <Draggable
                                  key={card.id}
                                  draggableId={String(card.id)}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Card
                                        updateCard={updateCard}
                                        card={card}
                                        day={day}
                                        participants={participants}
                                        id={`${card.day}-${card.order}`}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))
                          ) : (
                            <Text textAlign={"center"}>{day}日目にはまだ予定がありません</Text>

                          )
                            }
                              {provided.placeholder}
                            </VStack>
                          )}
                        </Droppable>
                      ))}
                    </Flex>
                  </DragDropContext>
                  <Button
                    id="add-card-button"
                    onClick={handleAddCard}
                    mt={4}
                    w="100%"
                  >
                    カードを追加
                  </Button>
                </Container>
              </>
            )}

            {showParticipants && (
              <ParticipantManager
                participants={participants}
                setParticipants={setParticipants}
              />
            )}
          </Box>
        </ChakraProvider>
      </selectedDayContext.Provider>
    </daysContext.Provider>
  );
};

export default Trip;
