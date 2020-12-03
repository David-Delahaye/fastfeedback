import {
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

export default function SiteTableHeader({ isPaidAccount }) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
      <Flex justify="space-between">
        <Heading mb={8}>My Sites</Heading>
        {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </Breadcrumb>
  );
}
