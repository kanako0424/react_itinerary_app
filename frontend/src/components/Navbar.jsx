import {
    Button,
    Box,
    HStack,
  } from "@chakra-ui/react";
import PropTypes from "prop-types";


function Navbar({setShowParticipants, setShowPlans}) {
  return (
    <Box
    bg="white"
    p={4}
    shadow="lg"
    position="fixed"
    bottom="0"
    width="100%"
    zIndex={1}
  >
    <HStack justifyContent="space-around">
      <Button
        onClick={() => {
          setShowParticipants(false);
          setShowPlans(true);
        }}
      >
        旅程
      </Button>
      <Button
        onClick={() => {
          setShowParticipants(true);
          setShowPlans(false);
        }}
      >
        参加者
      </Button>
    </HStack>
  </Box>
  )
}

Navbar.propTypes = {
    setShowPlans: PropTypes.func,
    setShowParticipants: PropTypes.func,

  };
  

export default Navbar