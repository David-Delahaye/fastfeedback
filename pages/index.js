import Head from 'next/head';
import { Button, Heading, Text, Code } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <Text>
          Current User: <Code>{auth?.user?.email}</Code>
        </Text>

        {auth.user ? (
          <Button
            onClick={(e) => {
              auth.signout();
            }}>
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              auth.signinWithGithub();
            }}>
            Sign in
          </Button>
        )}
      </main>
    </div>
  );
}
