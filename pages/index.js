import Head from 'next/head';
import { Button, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/react';

import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh">
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Logo boxSize="64px" />

      {auth.user ? (
        <>
          <Button
            onClick={(e) => {
              auth.signout();
            }}>
            Sign Out
          </Button>
        </>
      ) : (
        <Button
          variant="link"
          size="sm"
          onClick={(e) => {
            auth.signinWithGithub();
          }}>
          Sign in
        </Button>
      )}
    </Flex>
  );
}
