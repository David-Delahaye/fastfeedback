import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function FeedbackLink({ slug }) {
  return (
    <Box mx="auto" w="full">
      <Flex justify="space-between" align="center">
        <a href={`/sites/${slug}`} target='_blank'>
          <Link>
            <Flex fontWeight="bold" align="center" justifyContent='space-between'>
              <Text mr='8px'>Leave a comment</Text> <ArrowRightIcon my="auto"/>
            </Flex>
          </Link>
        </a>
        <Text color="gray.400">Powered by FastFeedback</Text>
      </Flex>
    </Box>
  );
}
