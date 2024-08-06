import { Box, Text, HStack, Input, Button, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import { useState } from "react";
import PropTypes from 'prop-types';


const ParticipantManager = ({participants, setParticipants}) => {
    const [newParticipant, setNewParticipant] = useState('');

    const handleAddParticipant = () => {
        if (newParticipant.trim() !== '') {
          setParticipants([...participants, newParticipant]);
          setNewParticipant('');
        }
      };

    const handleRemoveParticipant = (participantToRemove) => {
    setParticipants(participants.filter(participant => participant !== participantToRemove));
    };

  return (
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
  );
};

ParticipantManager.propTypes = {
    participants: PropTypes.array,
    newParticipant: PropTypes.string,
    setParticipants: PropTypes.func,
    setNewParticipant: PropTypes.func,
    handleAddParticipant: PropTypes.func,
    handleRemoveParticipant: PropTypes.func,
}


export default ParticipantManager;