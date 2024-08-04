import { Box, Text } from '@chakra-ui/react';

const TimeColumn = () => {
  return (
    <Box w="50px" mr={4}>
      {Array.from({ length: 24 }).map((_, i) => (
        <Box key={i} h={12} textAlign="right" pr={2}>
          <Text fontSize="sm">{`${i}:00`}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default TimeColumn;