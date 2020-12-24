import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
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
  const details = useSWR(user ? ['/api/user', user.token] : null, fetcher);
  console.log(details?.data?.userDetails._fieldsProto.sitesCount.integerValue)
  const sitesCount = details?.data?.userDetails._fieldsProto.sitesCount.integerValue;
  const feedbackCount = details?.data?.userDetails._fieldsProto.feedbackCount.integerValue;
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
                      {feedbackCount}/∞
                    </Text>
                    <Text color="blackAlpha.500">{user?.stripeRole === 'premium' ? 'unlimited feedback' : '1000 feedback limit'}</Text>
                  </Box>
                  <Box width="50%">
                    <Text fontWeight="bold">Sites</Text>
                    <Text fontWeight="bold" fontSize="2xl">
                      {sitesCount}/∞
                    </Text>
                    <Text color="blackAlpha.500">{user?.stripeRole === 'premium' ? 'unlimited sites' : '1 site limit'}</Text>
                  </Box>
                </Flex>
                <Text mb={5}>
                Fast Feedback uses Stripe to update, change, or cancel your
            subscription. You can also update card information and billing
            addresses through the secure portal.
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
