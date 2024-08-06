import { Box, HStack, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { daysContext, selectedDayContext } from "./contexts";

const DaySelector = ({ cards, setCards }) => {
  const { days, setDays } = useContext(daysContext);
  const { selectedDay, setSelectedDay } = useContext(selectedDayContext);

  const handleAddDay = () => {
    const newDay = String(days.length + 1);
    setDays([...days, newDay]);
    setCards({ ...cards, [newDay]: [] });
    // スクロールを行う
    setTimeout(() => {
      const addButton = document.getElementById("add-day-button");
      if (addButton) {
        addButton.scrollIntoView({ behavior: "smooth", inline: "start" });
      }
    }, 100);
  };

  return (
    <Box
      bg="white"
      p={4}
      shadow="md"
      mt={1}
      borderRadius={0}
      overflowX="auto"
      position="fixed"
      top={76}
      w={"100%"}
    >
      <HStack spacing={4} minW="max-content">
        {days.map((day) => (
          <Button
            key={day}
            onClick={() => setSelectedDay(day)}
            bg={selectedDay === day ? "blue.500" : "gray.200"}
            color={selectedDay === day ? "white" : "black"}
          >
            {day} 日目
          </Button>
        ))}
        <Button id="add-day-button" onClick={handleAddDay}>
          +
        </Button>
      </HStack>
    </Box>
  );
};

DaySelector.propTypes = {
  cards: PropTypes.object,
  setCards: PropTypes.func,
};

export default DaySelector;
