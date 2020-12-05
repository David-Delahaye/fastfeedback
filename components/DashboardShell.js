import React from 'react';
import {
  Flex,
  Box,
  Link,
  Stack,
  Avatar,
  Button,
  Text,
  useFormControlContext
} from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';
import NextLink from 'next/link';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();

  return (
    <>
      <Box backgroundColor="gray.100" h="100vh">
        <Flex backgroundColor="#ffffff" w="full" alignItems="center">
          <Flex
            justifyContent="space-between"
            p={8}
            py={4}
            alignItems="center"
            w="full"
            m="auto"
            maxW={1200}>
            <Stack isInline align="center">
              <NextLink href="/" passHref>
                <Link>
                  <Logo boxSize="24px" />
                </Link>
              </NextLink>
              <NextLink href="/feedback">
                <Link>Feedback</Link>
              </NextLink>
              <NextLink href="/sites">
                <Link>Sites</Link>
              </NextLink>
            </Stack>

            <Stack isInline alignItems="center">
              {user && (
                <>
                  <NextLink href="account">
                    <Link>
                      <Flex align="center">
                        <Text mr={2}>{user.name}</Text>
                        <Avatar size="sm" src={user?.photoUrl} />
                      </Flex>
                    </Link>
                  </NextLink>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
        <Flex maxWidth={1200} margin="8px auto" direction="column" p={8}>
          {children}
        </Flex>
      </Box>
    </>
  );
};

export default DashboardShell;
