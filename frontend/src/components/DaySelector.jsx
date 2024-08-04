import { Box, HStack, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DaySelector = ({ days, selectedDay, setSelectedDay, handleAddDay }) => {
  return (
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
  );
};

DaySelector.propTypes = {
    days: PropTypes.array,
    selectedDay: PropTypes.string,
    setSelectedDay: PropTypes.func,
    handleAddDay: PropTypes.func
}

export default DaySelector;
