import React from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
  Icon,
  Flex,
  Code
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt, id }) => {
  return (
    <Box my={4}>
      <Flex direction="column">
        <Heading size="sm" as="h3" fontWeight="medium">
          {author}
        </Heading>
        <Text color="gray.500" fontSize="xs">
          {format(parseISO(createdAt), 'PPp')}
        </Text>
        <Text size="sm" as="h3" fontWeight="medium" mb={4}>
          {text}
        </Text>
      </Flex>
      <Divider />
    </Box>
  );
};

export default Feedback;
