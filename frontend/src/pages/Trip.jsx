import { useState, useCallback, useMemo } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import "react-resizable/css/styles.css";
import Header from "../components/Header";
import DaySelector from "../components/DaySelector";
import { daysContext, selectedDayContext } from "../components/contexts";
import ParticipantManager from "../components/ParticipantManager";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

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
  2: [],
  3: [],
};

const initialParticipants = ["太郎", "二郎", "三郎"];

const initialTrip = {
  tripId: "12345",
  cards: initialCards,
  participants: initialParticipants,
};

const Trip = () => {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState(initialTrip.participants);
  const [cards, setCards] = useState(initialTrip.cards);
  const [days, setDays] = useState([1, 2, 3]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showPlans, setShowPlans] = useState(true);

  const handleAddCard = useCallback(() => {
    let date = new Date();
    var d1 = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

    const lastOrder = cards[selectedDay].length > 0 ? cards[selectedDay][cards[selectedDay].length - 1].order : -1;

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
      if (!result.destination) return;

      const day = result.source.droppableId;

      const items = Array.from(cards[day]);
      const [movedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, movedItem);

      // Reassign order based on new position
      const reorderedItems = items.map((item, index) => ({
        ...item,
        order: index,
      }));

      setCards((prevCards) => ({
        ...prevCards,
        [day]: reorderedItems,
      }));
    },
    [cards]
  );

  // updateCard関数を定義
  const updateCard = (day, updatedCard) => {
    setCards((prevCards) => ({
      ...prevCards,
      [day]: prevCards[day].map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      ),
    }));
    // console.log(cards[day]);
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
            <Box     

            >
              <Header />
            </Box>
            <Navbar setShowParticipants={setShowParticipants} setShowPlans={setShowPlans} />

            {showPlans && (<>
                                  <DaySelector cards={cards} setCards={setCards} />
                <Container maxW="container.md" pb={"150px"} pt={"150px"}>

                  <Box
                    mt={4}
                    overflowY="auto"
                    position="relative"
                  >
                    <DragDropContext onDragEnd={handleDragEnd} >
                      {days.map((day) => (
                        <Droppable key={day} droppableId={String(day)}>
                          {(provided) => (
                            <VStack
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              spacing={4}
                              display={selectedDay === day ? "block" : "none"}
                            >
                              {(cards[String(day)] || []).map((card, index) => (
                                <Card
                                  updateCard={updateCard}
                                  key={card.id}
                                  card={card}
                                  index={index}
                                  day={day}
                                  participants={participants}
                                />
                              ))}
                              {provided.placeholder}
                            </VStack>
                          )}
                        </Droppable>
                      ))}
                    </DragDropContext>
                  </Box>
                  <Button
                    id="add-card-button"
                    onClick={handleAddCard}
                    mt={4}
                    w="100%"
                  >
                    カードを追加
                  </Button>
                </Container></>
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