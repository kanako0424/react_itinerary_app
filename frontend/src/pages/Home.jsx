import { Box, Container, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <Container maxW="container.md" pt="150px">
      <Box textAlign="center">
        <Heading>Welcome to the Trip Planner</Heading>
        <Text mt={4}>Please select a trip to get started.</Text>
        <a href="/1">1の旅行サイトです</a>
      </Box>
    </Container>
  );
};

export default Home;