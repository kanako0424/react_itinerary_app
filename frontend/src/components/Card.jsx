import { useState } from 'react';
import { Box, HStack, Input, Select, Textarea, Button, Text, Badge, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import 'react-resizable/css/styles.css';
import PropTypes from 'prop-types';
import ResizableCard from './ResizableCard';

const Card = ({ card, index, day, participants, handleCardChange, handleResize }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onClose();
    setIsEditing(false);
  };

  const handleCancel = () => {
    onClose();
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>編集</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSave}>
                  保存
                </Button>
                <Button variant="ghost" onClick={handleCancel}>キャンセル</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <Draggable key={card.id} draggableId={card.id} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <ResizableCard height={card.height} onResize={(e, data) => handleResize(day, index, e, data)}>
                <HStack justifyContent="space-between">
                  <Box>
                    <Text fontWeight="bold">{card.destination}</Text>
                    <Link href={card.mapLink} color="blue.500" isExternal>Google Mapで見る</Link>
                    <Text>{card.stayTime}</Text>
                    <Badge colorScheme="green">予約者: {card.reserver}</Badge>
                    <Text>{card.notes}</Text>
                  </Box>
                </HStack>
                <Button mt={2} onClick={() => { setIsEditing(true); onOpen(); }}>編集</Button>
              </ResizableCard>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

Card.propTypes = {
  card: PropTypes.any,
  index: PropTypes.number,
  day: PropTypes.any,
  participants: PropTypes.array,
  handleCardChange: PropTypes.func,
  handleResize: PropTypes.func,
};

export default Card;