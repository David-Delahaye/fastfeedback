import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function FeedbackLink({ siteId }) {
  return (
    <Box maxW="700px" mx="auto" w="full" my={4}>
      <Flex justify="space-between" align="center">
        <NextLink href={`/p/${siteId}`}>
          <Link fontWeight="bold">
            Leave a comment <ArrowRightIcon ml={2} my="auto" />
          </Link>
        </NextLink>
        <Text color="gray.400">Powered by FastFeedback</Text>
      </Flex>
    </Box>
  );
}
