import { Box, Avatar, Input, HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Header() {
  const [tripTitle, setTripTitle] = useState("旅行のタイトル");

  return (
    <Box
      bg="white"
      pt={4}
      pr={6}
      pl={6}
      pb={4}
      shadow="sm"
      position="fixed"
      top="0"
      width="100%"
      zIndex={1}
    >
      <HStack justifyContent="space-between">
        <Input
          value={tripTitle}
          onChange={(e) => setTripTitle(e.target.value)}
          fontSize="xl"
          border="none"
          _focus={{ border: "none" }}
        />
        <Avatar name="User" src="https://bit.ly/broken-link" w={10} h={10} />
      </HStack>
    </Box>
  );
}
Header.propTypes = {
  tripTitle: PropTypes.string,
  setTripTitle: PropTypes.func,
};
