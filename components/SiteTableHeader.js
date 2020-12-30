import { SettingsIcon, EditIcon } from '@chakra-ui/icons';
import {
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import NextLink from 'next/link';
import AddSiteModal from './AddSiteModal';
import CodeSiteModal from './CodeSiteModal';
import EditSiteModal from './EditSiteModal';

export default function SiteTableHeader({
  isPaidAccount,
  isOwner,
  site,
  routeName
}) {
  let title = 'Sites';
  if (site) title = site.name;
  if (routeName) title = routeName;

  if (isOwner) {
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
          <div>
          {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
          <CodeSiteModal mr={2} site={site} route={routeName}><EditIcon mr={2}/> View Code</CodeSiteModal>
          {site?.name && (
            <EditSiteModal site={site}>
              <SettingsIcon mr={2} />
              Edit Site
            </EditSiteModal>
          )}
          </div>
        </Flex>
      </Breadcrumb>
    );
  }
  return '';
}
