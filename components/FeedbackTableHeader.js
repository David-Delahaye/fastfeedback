import {
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function FeedbackTableHeader({ siteName, routeName }) {
  let title = 'Feedback';
  if (siteName) title = siteName;
  if (routeName) title = routeName;

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/feedback">
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      {siteName && (
        <BreadcrumbItem>
          <BreadcrumbLink>{siteName}</BreadcrumbLink>
        </BreadcrumbItem>
      )}
      {routeName && (
        <BreadcrumbItem>
          <BreadcrumbLink>{routeName}</BreadcrumbLink>
        </BreadcrumbItem>
      )}
      <Flex justify="space-between">
        <Heading mb={8}>{title}</Heading>
      </Flex>
    </Breadcrumb>
  );
}
