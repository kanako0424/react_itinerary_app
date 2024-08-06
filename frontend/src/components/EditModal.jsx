import {
  Button,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Select,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function EditModal({ updateCard, card, day, participants }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    destination: card.destination,
    mapLink: card.mapLink,
    startTime: card.startTime,
    endTime: card.endTime,
    status: card.status,
    reserver: card.reserver,
    reserve: card.reserve,
    participantsInCard: card.participantsInCard,
    notes: card.notes,
  });
  // console.log(card);

  // モーダルが開かれたときに最新のCard情報でinputsを更新
  useEffect(() => {
    if (isOpen) {
      setInputs({
        destination: card.destination,
        mapLink: card.mapLink,
        startTime: card.startTime,
        endTime: card.endTime,
        status: card.status,
        reserver: card.reserver,
        reserve: card.reserve,
        participantsInCard: card.participantsInCard,
        notes: card.notes,
      });
    }
  }, [isOpen, card]);

  const handleSaveCard = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // カードの更新
    updateCard(day, { ...card, ...inputs });

    onClose();
    setIsLoading(false);
  };

  return (
    <>
    <HStack>
      <EditIcon
        onClick={onOpen}
        variant="ghost"
        colorscheme="blue"
        aria-label="See menu"
      />
    </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSaveCard}>
          <ModalContent>
            <ModalHeader>編集</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack justifyContent="space-between">
                <FormControl>
                  <FormLabel>目的地</FormLabel>
                  <Input
                    placeholder="目的地"
                    value={inputs.destination}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>地図のリンク</FormLabel>
                  <Input
                    placeholder="地図のリンク"
                    value={inputs.mapLink}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        mapLink: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>開始時間</FormLabel>
                  <Input
                    placeholder="開始時間"
                    value={inputs.startTime}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>終了時間</FormLabel>
                  <Input
                    placeholder="終了時間"
                    value={inputs.endTime}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>ここに行く</FormLabel>
                  <Select
                    value={inputs.status}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, status: e.target.value }))
                    }
                  >
                    <option value="1">決定</option>
                    <option value="0">候補</option>
                  </Select>
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>予約者</FormLabel>
                  <Select
                    value={inputs.reserver}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        reserver: e.target.value,
                      }))
                    }
                  >
                    {participants.map((participant, i) => (
                      <option key={i} value={i}>
                        {participant}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>予約状況</FormLabel>
                  <Select
                    value={inputs.reserve}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        reserve: e.target.value,
                      }))
                    }
                  >
                    <option value="1">済み（不要）</option>
                    <option value="0">まだ</option>
                  </Select>
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>参加者</FormLabel>
                  <CheckboxGroup
                    value={inputs.participantsInCard}
                    onChange={(values) =>
                      setInputs((prev) => ({
                        ...prev,
                        participantsInCard: values,
                      }))
                    }
                  >
                    {participants?.map((participant, i) => (
                      <Checkbox key={i} value={participant} mr={4}>
                        {participant}
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                </FormControl>
                <FormControl mt={2}>
                  <FormLabel>メモ</FormLabel>
                  <Textarea
                    placeholder="メモ"
                    value={inputs.notes}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, notes: e.target.value }))
                    }
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={isLoading}
                type="submit"
              >
                保存
              </Button>
              <Button variant="ghost" onClick={onClose}>
                キャンセル
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

EditModal.propTypes = {
  updateCard: PropTypes.func,
  card: PropTypes.object,
  day: PropTypes.any,
  participants: PropTypes.array,
};

export default EditModal;