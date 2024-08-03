import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Stack,
  Text,
  IconButton,
  Avatar,
  Input,
  Textarea,
  Select,
  HStack,
  VStack,
  Container,
  Tag,
  TagLabel,
  TagCloseButton,
  Badge,
  Link,
} from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const initialCards = {
  day1: [{ id: '1', destination: '', mapLink: '', stayTime: '', status: '', reserver: '', notes: '', height: 100, isEditing: false }],
  day2: [],
  day3: [],
};

const App = () => {
  const [cards, setCards] = useState(initialCards);
  const [selectedDay, setSelectedDay] = useState('day1');
  const [participants, setParticipants] = useState([]);
  const [showPlans, setShowPlans] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [newParticipant, setNewParticipant] = useState('');
  const [days, setDays] = useState(['day1', 'day2', 'day3']);
  const [tripTitle, setTripTitle] = useState('旅行のタイトル');

  const handleAddCard = () => {
    const newCard = { id: `${cards[selectedDay].length + 1}`, destination: '', mapLink: '', stayTime: '', status: '', reserver: '', notes: '', height: 100, isEditing: true };
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
    const durationMinutes = endMinute - startMinute;

    newCards[index].stayTime = `${durationHours}時間${Math.floor(durationMinutes,2)}分`;
    setCards({ ...cards, [day]: newCards });
  };

  const handleSaveCard = (day, index) => {
    const newCards = [...cards[day]];
    newCards[index].isEditing = false;
    setCards({ ...cards, [day]: newCards });
  };

  const handleEditCard = (day, index) => {
    const newCards = [...cards[day]];
    newCards[index].isEditing = true;
    setCards({ ...cards, [day]: newCards });
  };

  return (
    <ChakraProvider>
      <Box bg="gray.100" minH="100vh">
        <Box bg="white" p={4} shadow="md">
          <HStack justifyContent="space-between">
            <Input
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              fontSize="xl"
              border="none"
              _focus={{ border: 'none' }}
            />
            <Avatar name="User" src="https://bit.ly/broken-link" />
          </HStack>
        </Box>

        {showPlans && (
          <Container pb={10}>

            <Box bg="white" p={4} shadow="md" mt={4}>
              <HStack spacing={4}>
                {days.map((day) => (
                  <Button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    bg={selectedDay === day ? 'blue.500' : 'gray.200'}
                    color={selectedDay === day ? 'white' : 'black'}
                  >
                    {day}
                  </Button>
                ))}
                <Button onClick={handleAddDay}>+</Button>
              </HStack>
            </Box>

            <Container maxW="container.md" mt={4} display="flex">
              <Box w="50px" mr={4}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <Box key={i} h={12} textAlign="right" pr={2}>
                    <Text fontSize="sm">{`${i}:00`}</Text>
                  </Box>
                ))}
              </Box>
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
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                              {(provided) => (
                                <ResizableBox
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  width="100%"
                                  height={card.height}
                                  minConstraints={[100, 50]}
                                  maxConstraints={[100, 600]}
                                  onResize={(e, data) => handleResize(day, index, e, data)}
                                >
                                  <Box
                                    bg="white"
                                    p={4}
                                    shadow="md"
                                    w="100%"
                                    h="100%"
                                  >
                                    {card.isEditing ? (
                                      <>
                                        <HStack justifyContent="space-between">
                                          <Box>
                                            <Input
                                              placeholder="目的地"
                                              value={card.destination}
                                              onChange={(e) => handleCardChange(day, index, 'destination', e.target.value)}
                                            />
                                            <Input
                                              placeholder="GoogleMapのリンク"
                                              value={card.mapLink}
                                              mt={2}
                                              onChange={(e) => handleCardChange(day, index, 'mapLink', e.target.value)}
                                            />
                                            <Select
                                              placeholder="滞在予定時間"
                                              value={card.stayTime}
                                              mt={2}
                                              onChange={(e) => handleCardChange(day, index, 'stayTime', e.target.value)}
                                            >
                                              <option value="1h">1時間</option>
                                              <option value="2h">2時間</option>
                                              <option value="30m">30分</option>
                                            </Select>
                                            <Select
                                              placeholder="予約のステータス"
                                              value={card.status}
                                              mt={2}
                                              onChange={(e) => handleCardChange(day, index, 'status', e.target.value)}
                                            >
                                              <option value="reserved">予約済み</option>
                                              <option value="not_reserved">未予約</option>
                                              <option value="no_reservation_needed">予約不要</option>
                                            </Select>
                                            <Select
                                              placeholder="予約予定者"
                                              value={card.reserver}
                                              mt={2}
                                              onChange={(e) => handleCardChange(day, index, 'reserver', e.target.value)}
                                            >
                                              {participants.map((participant, i) => (
                                                <option key={i} value={participant}>{participant}</option>
                                              ))}
                                            </Select>
                                            <Textarea
                                              placeholder="メモ"
                                              value={card.notes}
                                              mt={2}
                                              onChange={(e) => handleCardChange(day, index, 'notes', e.target.value)}
                                            />
                                          </Box>
                                        </HStack>
                                        <Button mt={2} onClick={() => handleSaveCard(day, index)}>保存</Button>
                                      </>
                                    ) : (
                                      <>
                                        <HStack justifyContent="space-between">
                                          <Box>
                                            <Text fontWeight="bold">{card.destination}</Text>
                                            <Link href={card.mapLink} color="blue.500" isExternal>Google Mapで見る</Link>
                                            <Text>{card.stayTime}</Text>
                                            <Badge colorScheme="green">予約者: {card.reserver}</Badge>
                                            <Text>{card.notes}</Text>
                                          </Box>
                                        </HStack>
                                        <Button mt={2} onClick={() => handleEditCard(day, index)}>編集</Button>
                                      </>
                                    )}
                                  </Box>
                                </ResizableBox>
                              )}
                            </Draggable>
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

        <Box bg="white" p={4} shadow="md" position="fixed" bottom="0" width="100%">
          <HStack justifyContent="space-around">
            <Button onClick={() => {setShowParticipants(false), setShowPlans(true)}}>旅程</Button>
            <Button onClick={() => {setShowParticipants(true), setShowPlans(false)}}>参加者</Button>
          </HStack>
        </Box>

        {showParticipants && (
          <Box bg="white" p={4} shadow="md" mt={4}>
            <Text fontSize="xl" mb={4}>参加者を登録</Text>
            <HStack>
              <Input
                placeholder="参加者名"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
              />
              <Button onClick={handleAddParticipant}>追加</Button>
            </HStack>
            <HStack mt={4} spacing={2} wrap="wrap">
              {participants.map((participant, index) => (
                <Tag key={index} size="lg" colorScheme="blue" borderRadius="full">
                  <TagLabel>{participant}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveParticipant(participant)} />
                </Tag>
              ))}
            </HStack>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default App;