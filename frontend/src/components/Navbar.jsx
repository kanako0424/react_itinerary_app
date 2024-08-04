import {
  Box,
  Button,
  HStack,
} from '@chakra-ui/react';
import 'react-resizable/css/styles.css';
import PropTypes from 'prop-types';


export default function Navbar({ setShowPlans, setShowParticipants }) {

    return (
        <Box bg="white" p={4} shadow="md" position="fixed" bottom="0" width="100%">
            <HStack justifyContent="space-around">
            <Button onClick={() => {setShowParticipants(false), setShowPlans(true)}}>旅程</Button>
            <Button onClick={() => {setShowParticipants(true), setShowPlans(false)}}>参加者</Button>
            </HStack>
        </Box>
    )
}
Navbar.propTypes = {
    setShowPlans: PropTypes.func,
    setShowParticipants: PropTypes.func,

}
