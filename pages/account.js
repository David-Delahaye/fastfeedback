import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { createBillingPortal, createCheckoutSession } from '@/lib/db';
import {
  ThemeProvider,
  CSSReset,
  theme,
  Flex,
  Avatar,
  Heading,
  Text,
  Box,
  Button,
  Badge
} from '@chakra-ui/react';

export default function Account() {
  const { user, signout } = useAuth();
  return (
    <DashboardShell>
      <>
        <Flex flexDirection="column" maxWidth="800px" m="auto">
          <Flex flexDirection="column" alignItems="center">
            <Avatar
              src={user?.photoUrl}
              alt={user?.name}
              boxSize="100px"
              mb={4}
              mt={4}
            />
            <Heading mb={2}>{user?.name}</Heading>
            <Text mb={16}>{user?.email}</Text>

            <Flex
              flexDirection="column"
              width="100%"
              borderRadius="8px"
              overflow="hidden"
              backgroundColor="white">
              <Box
                width="100%"
                backgroundColor="gray.50"
                display="flex"
                justifyContent="space-between"
                p={6}>
                <Badge
                  textTransform="uppercase"
                  variant="ghost"
                  textTransform="uppercase"
                  fontSize="xs"
                  color="gray.500"
                  fontWeight="medium">
                  Settings
                </Badge>
                <Badge
                  fontWeight="bold"
                  textTransform="uppercase"
                  variant="ghost">
                  {user?.stripeRole}
                </Badge>
              </Box>
              <Flex flexDirection="column" p={6}>
                <Flex mb="16px">
                  <Box width="50%">
                    <Text fontWeight="bold">Feedback</Text>
                    <Text fontWeight="bold" fontSize="2xl">
                      107
                    </Text>
                    <Text color="blackAlpha.500">10,000 limit</Text>
                  </Box>
                  <Box width="50%">
                    <Text fontWeight="bold">Sites</Text>
                    <Text fontWeight="bold" fontSize="2xl">
                      5
                    </Text>
                    <Text color="blackAlpha.500">Starter</Text>
                  </Box>
                </Flex>
                <Text mb={5}>
                  Lorem ipsum dolor amet doing words doing word Lorem ipsum
                  dolor amet doing words doing word Lorem ipsum dolor amet doing
                  words doing word Lorem
                </Text>
                <Box ml="auto" mt="auto">
                  <Button
                    mr={8}
                    variant="ghost"
                    variantColor="blackAlpha"
                    onClick={signout}>
                    Log Out
                  </Button>
                  <Button
                    onClick={(e) => {
                      createBillingPortal(user.uid);
                    }}
                    variant="outline"
                    backgroundColor="gray.900"
                    color="white"
                    size="md"
                    _hover={{ bg: 'gray.800' }}
                    _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}>
                    Manage Subscription
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </>
    </DashboardShell>
  );
}