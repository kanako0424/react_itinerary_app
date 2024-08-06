import { Box, HStack, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { daysContext, selectedDayContext } from "./contexts";

const DaySelector = ({ cards, setCards }) => {
  const { days, setDays } = useContext(daysContext);
  const { selectedDay, setSelectedDay } = useContext(selectedDayContext);

  const handleMoveDay = (day) => {
    setSelectedDay(day);
    const dayButton = document.getElementById(`day-button-${day}`);
    const dayList = document.getElementById(`day${day}-list`);
    if (dayButton) {
      dayButton.scrollIntoView({ behavior: "smooth", inline: "start" });
      dayList.scrollIntoView({ behavior: "smooth", inline: "start", block: "end" });
    }
  }

  const handleAddDay = () => {
    const newDay = String(days.length + 1);
    setDays([...days, newDay]);
    setCards({ ...cards, [newDay]: [] });
    // スクロールを行う
    setTimeout(() => {
      const addButton = document.getElementById("add-day-button");
      if (addButton) {
        addButton.scrollIntoView({ behavior: "smooth", inline: "end" });
      }
    }, 100);
  };

  return (
    <Box
      bg="white"
      p={4}
      shadow="md"
      borderRadius={0}
      overflowX="auto"
      position="fixed"
      top={"72px"}
      w={"100%"}
      zIndex={1}
    >
      <HStack minW="max-content">
        {days.map((day) => (
          <Button
            key={day}
            onClick={() => handleMoveDay(day)}
            bg={selectedDay === day ? "blue.500" : "gray.200"}
            color={selectedDay === day ? "white" : "black"}
            id={`day-button-${day}`}
          >
            {day} 日目
          </Button>
        ))}
        <Button id="add-day-button" onClick={(day) => handleAddDay(day)}>
          +
        </Button>
      </HStack>
    </Box>
  );
};

DaySelector.propTypes = {
  dayList: PropTypes.string,
  cards: PropTypes.object,
  setCards: PropTypes.func,
};

export default DaySelector;
