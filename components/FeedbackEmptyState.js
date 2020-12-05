import React from 'react';
import { Heading, Box, Text, Button, Flex } from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import DashboardShell from './DashboardShell';
import AddSiteModal from './AddSiteModal';

const FeedbackEmptyState = () => (
  <Flex
    width="100%"
    justify="center"
    align="center"
    direction="column"
    borderRadius={8}
    backgroundColor="#ffffff"
    p={16}>
    <Heading as="h2" size="md" mb="2">
      No Feedback Yet
    </Heading>
    <Text mb="4">You don't currently have any feedback submitted</Text>
  </Flex>
);
export default FeedbackEmptyState;
