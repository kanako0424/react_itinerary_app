import {
    Box,
    Avatar,
    Input,
    HStack,
  } from '@chakra-ui/react';
  import PropTypes from 'prop-types';



export default function Header({ tripTitle, setTripTitle }) {

    return (
        <Box bg="white" p={4} shadow="md">
            <HStack justifyContent="space-between">
                <Input
                value={tripTitle}
                onChange={(e) => setTripTitle(e.target.value)}
                fontSize="xl"
                border="none"
                _focus={{ border: 'none' }}
                />
                <Avatar name="User" src="https://bit.ly/broken-link" />
            </HStack>
        </Box>
    )
}
Header.propTypes = {
    tripTitle: PropTypes.string,
    setTripTitle: PropTypes.func

}