import {
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import NextLink from 'next/link';
import AddSiteModal from './AddSiteModal';

export default function SiteTableHeader({ isPaidAccount, site, routeName }) {
  let title = 'Sites';
  if (site) title = site.name;
  if (routeName) title = routeName;
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/sites">
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      {site && (
        <BreadcrumbItem>
          <NextLink href={`/sites/${site.id}`}>
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
        {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </Breadcrumb>
  );
}
