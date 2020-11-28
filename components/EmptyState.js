import React from 'react';
import { Heading, Box, Text, Button, Flex } from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import DashboardShell from './DashboardShell';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
  <Flex
    width="100%"
    justify="center"
    align="center"
    direction="column"
    borderRadius={8}
    backgroundColor="#ffffff"
    p={16}>
    <Heading as="h2" size="md" mb="2">
      You haven't added any sites.
    </Heading>
    <Text mb="4">Welcome, lets get started</Text>
    <AddSiteModal>Add your first site</AddSiteModal>
  </Flex>
);
export default EmptyState;
