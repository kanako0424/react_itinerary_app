import { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Container,
} from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import 'react-resizable/css/styles.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import DaySelector from './components/DaySelector';
import TimeColumn from './components/TimeColumn';
import ParticipantManager from './components/ParticipantManager';
import Card from './components/Card';

const initialCards = {
  day1: [{ id: '1', destination: '', mapLink: '', stayTime: '', status: '', reserver: '', notes: '', height: 100 }],
  day2: [],
  day3: [],
};

const App = () => {
  const [cards, setCards] = useState(initialCards);
  const [selectedDay, setSelectedDay] = useState('day1');
  const [participants, setParticipants] = useState([]);
  const [tripTitle, setTripTitle] = useState('旅行のタイトル');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showPlans, setShowPlans] = useState(true);
  const [newParticipant, setNewParticipant] = useState('');
  const [days, setDays] = useState(['day1', 'day2', 'day3']);

  const handleAddCard = () => {
    const newCard = { id: `${cards[selectedDay].length + 1}`, destination: '', mapLink: '', stayTime: '', status: '', reserver: '', notes: '', height: 100 };
    setCards({ ...cards, [selectedDay]: [...cards[selectedDay], newCard] });
  };

  const handleAddDay = () => {
    const newDay = `day${days.length + 1}`;
    setDays([...days, newDay]);
    setCards({ ...cards, [newDay]: [] });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDay = result.source.droppableId;
    const destinationDay = result.destination.droppableId;

    const sourceItems = Array.from(cards[sourceDay]);
    const [movedItem] = sourceItems.splice(result.source.index, 1);

    const destinationItems = Array.from(cards[destinationDay]);
    destinationItems.splice(result.destination.index, 0, movedItem);

    setCards({
      ...cards,
      [sourceDay]: sourceItems,
      [destinationDay]: destinationItems,
    });
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim() !== '') {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (participantToRemove) => {
    setParticipants(participants.filter(participant => participant !== participantToRemove));
  };

  const handleCardChange = (day, index, field, value) => {
    const newCards = [...cards[day]];
    newCards[index][field] = value;
    setCards({ ...cards, [day]: newCards });
  };

  const handleResize = (day, index, event, { size }) => {
    const newCards = [...cards[day]];
    newCards[index].height = size.height;

    // Calculate stay time based on height
    const startTime = index * 48; // Assuming each card starts at 100px intervals
    const endTime = startTime + size.height;
    const startHour = Math.floor(startTime / 48);
    const endHour = Math.floor(endTime / 48);
    const startMinute = (startTime % 48) * 0.6;
    const endMinute = (endTime % 48) * 0.6;
    const durationHours = endHour - startHour;
    const durationMinutes = (endMinute - startMinute).toFixed(0);

    newCards[index].stayTime = `${durationHours}時間${durationMinutes}分`;
    setCards({ ...cards, [day]: newCards });
  };

  return (
    <ChakraProvider>
      <Box bg="gray.100" minH="100vh">
        <Header tripTitle={tripTitle} setTripTitle={setTripTitle} />
        <Navbar setShowPlans={setShowPlans} setShowParticipants={setShowParticipants} />

        {showPlans && (
          <Container pb={10}>
            <DaySelector days={days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} handleAddDay={handleAddDay} />
            <Container maxW="container.md" mt={4} display="flex">
              <TimeColumn />
              <Box flex="1">
                <DragDropContext onDragEnd={handleDragEnd}>
                  {days.map((day) => (
                    <Droppable key={day} droppableId={day}>
                      {(provided) => (
                        <VStack
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          spacing={4}
                          display={selectedDay === day ? 'block' : 'none'}
                        >
                          {cards[day].map((card, index) => (
                            <Card
                              key={card.id}
                              card={card}
                              index={index}
                              day={day}
                              participants={participants}
                              handleCardChange={handleCardChange}
                              handleResize={handleResize}
                            />
                          ))}
                          {provided.placeholder}
                        </VStack>
                      )}
                    </Droppable>
                  ))}
                </DragDropContext>
                <Button onClick={handleAddCard} mt={4} w="100%">カードを追加</Button>
              </Box>
            </Container>
          </Container>
        )}

        {showParticipants && (
          <ParticipantManager
            participants={participants}
            newParticipant={newParticipant}
            setNewParticipant={setNewParticipant}
            handleAddParticipant={handleAddParticipant}
            handleRemoveParticipant={handleRemoveParticipant}
          />
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;