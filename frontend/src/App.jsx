import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip";

const App = () => {
  return (
    <ChakraProvider>
      <Box bg="white" minH="100vh">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:tripId" element={<Trip />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App;