import { Box } from '@chakra-ui/react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import PropTypes from 'prop-types';

const ResizableCard = ({ children, width, height, onResize }) => {
  return (
    <ResizableBox
      width={width}
      height={height}
      minConstraints={[100, 50]}
      maxConstraints={[100, 600]}
      onResize={onResize}
    >
      <Box
        bg="white"
        p={4}
        shadow="md"
        w="100%"
        h="100%"
      >
        {children}
      </Box>
    </ResizableBox>
  );
};

ResizableCard.propTypes = {
    children: PropTypes.any,
    width: PropTypes.any,
    height: PropTypes.any,
    onResize: PropTypes.any,
}

export default ResizableCard;