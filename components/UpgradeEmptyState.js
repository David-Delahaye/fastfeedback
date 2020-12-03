import React from 'react';
import { Heading, Box, Text, Button, Flex } from '@chakra-ui/react';
import { createCheckoutSession } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const UpgradeEmptyState = () => {
  const { user } = useAuth();
  return (
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
      <Text mb="4">Get feedback on your site instantly</Text>
      <Button
        onClick={(e) => {
          createCheckoutSession(user.uid);
        }}
        mt={8}
        variant="outline"
        backgroundColor="gray.900"
        color="white"
        size="md"
        _hover={{ bg: 'gray.800' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}>
        Upgrade to Starter
      </Button>
    </Flex>
  );
};
export default UpgradeEmptyState;
