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
import { Github, Google } from '@/styles/icons';

const Feedback = ({ author, text, createdAt, id, settings, provider }) => {
  let providerIcon = '';
  if (provider === 'github.com') providerIcon = <Github ml={2} />;
  if (provider === 'google.com') providerIcon = <Google ml={2} />;
  return (
    <Box my={4}>
      <Flex direction="column">
        <Heading size="sm" as="h3" fontWeight="medium">
          {author}
          {settings?.icons ? providerIcon : ''}
        </Heading>
        <Text color="gray.500" fontSize="xs">
          {settings?.timestamp && format(parseISO(createdAt), 'PPp')}
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
