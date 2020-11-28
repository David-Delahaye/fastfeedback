import React from 'react';
import {
  Flex,
  Box,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button
} from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="#ffffff"
        justifyContent="space-between"
        p={4}
        alignItems="center">
        <Stack isInline align="center">
          <Logo boxSize="24px" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        {auth.user && (
          <Stack isInline alignItems="center">
            <Link>Sign out</Link>
            <Avatar size="sm" src={auth?.user?.photoUrl} />
          </Stack>
        )}
      </Flex>

      <Flex maxWidth={1200} margin="8px auto" direction="column" p={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
          <Flex justify="space-between">
            <Heading mb={8}>My Sites</Heading>
            {/* <Button colorScheme="green" variant="outline">
              + Add Site
            </Button> */}
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
        </Breadcrumb>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
