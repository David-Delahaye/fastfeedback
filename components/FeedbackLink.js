import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function FeedbackLink({ siteId }) {
  return (
    <Box maxW="700px" mx="auto" w="full" my={6} padding={4}>
      <Flex justify="space-between" align="center">
        <NextLink href={`/sites/${siteId}`}>
          <Link>
            <Flex fontWeight="bold" align="center">
              Leave a comment <ArrowRightIcon ml={2} my="auto" />
            </Flex>
          </Link>
        </NextLink>
        <Text color="gray.400">Powered by FastFeedback</Text>
      </Flex>
    </Box>
  );
}
