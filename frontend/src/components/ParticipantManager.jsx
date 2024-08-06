import {
  Box,
  Text,
  HStack,
  FormControl,
  Input,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";

const ParticipantManager = ({ participants, setParticipants }) => {
  const [newParticipant, setNewParticipant] = useState("");

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (newParticipant.trim() !== "") {
      setParticipants([...participants, newParticipant]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (participantToRemove) => {
    setParticipants(
      participants.filter((participant) => participant !== participantToRemove)
    );
  };

  return (
    <Box bg="white" p={4} shadow="md" h={"100vh"} pt={"100px"}>
      <Text fontSize="xl" mb={4}>
        参加者を登録
      </Text>
      <HStack>
        <FormControl onSubmit={handleAddParticipant}>
          <Input
            placeholder="参加者名"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            width={"75%"}
            mr={2}
          />
          <Button onClick={handleAddParticipant}>
            追加
          </Button>
        </FormControl>
      </HStack>
      <HStack mt={4} spacing={2} wrap="wrap">
        {participants.map((participant, index) => (
          <Tag key={index} size="lg" colorScheme="blue" borderRadius="full">
            <TagLabel>{participant}</TagLabel>
            <TagCloseButton
              onClick={() => handleRemoveParticipant(participant)}
            />
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
};

export default ParticipantManager;
