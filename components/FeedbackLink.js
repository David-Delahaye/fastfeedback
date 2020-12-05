import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function FeedbackLink({ slug }) {
  return (
    <Box mx="auto" w="full">
      <Flex justify="space-between" align="center">
        <NextLink href={`/sites/${slug}`}>
          <Link>
            <Flex fontWeight="bold" align="center">
              Leave a comment <ArrowRightIcon my="auto" />
            </Flex>
          </Link>
        </NextLink>
        <Text color="gray.400">Powered by FastFeedback</Text>
      </Flex>
    </Box>
  );
}
