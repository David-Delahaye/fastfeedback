import {
  Heading,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

export default function FeedbackTableHeader() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Feedback</BreadcrumbLink>
      </BreadcrumbItem>
      <Flex justify="space-between">
        <Heading mb={8}>My Feedback</Heading>
      </Flex>
    </Breadcrumb>
  );
}
