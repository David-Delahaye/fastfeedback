import {
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function FeedbackTableHeader({ siteName }) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/feedback">
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      {siteName ? (
        <BreadcrumbItem>
          <BreadcrumbLink>{siteName}</BreadcrumbLink>
        </BreadcrumbItem>
      ) : (
        ''
      )}
      <Flex justify="space-between">
        <Heading mb={8}>{siteName || 'Feedback'}</Heading>
      </Flex>
    </Breadcrumb>
  );
}
