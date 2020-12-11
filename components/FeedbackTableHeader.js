import {
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function FeedbackTableHeader({ site, routeName }) {
  let title = 'Feedback';
  if (site) title = site.name;
  if (routeName) title = routeName;

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/feedback">
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      {site && (
        <BreadcrumbItem>
          <NextLink href={'/feedback/' + site.id}>
            <BreadcrumbLink>{site.name}</BreadcrumbLink>
          </NextLink>
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
