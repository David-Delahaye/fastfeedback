import React from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => (
  <Box width="100%" borderRadius={8} backgroundColor="#ffffff" p={8}>
    <Heading as="h2" size="md">
      Get feedback on your site instantly
    </Heading>
    <Text>Start today, then grow with us</Text>
    <Button>Upgrade to starter</Button>
  </Box>
);
export default FreePlanEmptyState;
