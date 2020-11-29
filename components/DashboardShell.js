import React from 'react';
import { Flex, Box, Link, Stack, Avatar, Button } from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';
import NextLink from 'next/link';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="#ffffff"
        justifyContent="space-between"
        p={4}
        alignItems="center">
        <Stack isInline align="center">
          <NextLink href="/" passHref>
            <Link>
              <Logo boxSize="24px" />
            </Link>
          </NextLink>
          <NextLink href="/feedback">
            <Link>Feedback</Link>
          </NextLink>
          <NextLink href="/dashboard">
            <Link>Sites</Link>
          </NextLink>
        </Stack>

        <Stack isInline alignItems="center">
          {user && (
            <Button variant="ghost" mr={2} onClick={() => signout()}>
              Sign out
            </Button>
          )}
          <Avatar size="sm" src={user?.photoUrl} />
        </Stack>
      </Flex>
      <Flex maxWidth={1200} margin="8px auto" direction="column" p={8}>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
