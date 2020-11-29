import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Heading, Text, Code, Icon, Box, Flex } from '@chakra-ui/react';

import { Github, Google, Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      bg="gray.100"
      direction="column"
      align="center"
      justify="center"
      h="100vh">
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />
      </Head>
      <Logo boxSize="64px" />

      {auth.user ? (
        <>
          <NextLink href="/dashboard">
            <Button
              mt={2}
              variant="outline"
              backgroundColor="white"
              color="gray.900"
              size="md"
              _hover={{ bg: 'gray.200' }}
              _active={{ bg: 'gray.200', transform: 'scale(0.95)' }}>
              Dashboard
            </Button>
          </NextLink>
        </>
      ) : (
        <>
          <Button
            onClick={(e) => {
              auth.signinWithGithub();
            }}
            mt={8}
            variant="outline"
            backgroundColor="gray.900"
            color="white"
            size="md"
            _hover={{ bg: 'gray.800' }}
            _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}>
            <Github boxSize="24px" mr={2} />
            Sign In with Github
          </Button>
          <Button
            onClick={(e) => {
              auth.signinWithGoogle();
            }}
            mt={2}
            variant="outline"
            backgroundColor="white"
            color="gray.900"
            size="md"
            _hover={{ bg: 'gray.200' }}
            _active={{ bg: 'gray.200', transform: 'scale(0.95)' }}>
            <Google boxSize="24px" mr={2} />
            Sign In with Google
          </Button>
        </>
      )}
    </Flex>
  );
}
