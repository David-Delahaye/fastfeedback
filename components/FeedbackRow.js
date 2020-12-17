import React, { useState } from 'react';
import { Box, Flex, Link, Switch } from '@chakra-ui/react';
import NextLink from 'next/link';
import RemoveButton from '@/components/RemoveButton';
import { Td } from './Table';
import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';
import { Github, Google } from '@/styles/icons';

const FeedbackRow = ({
  id,
  author,
  siteName,
  text,
  route,
  status,
  siteId,
  provider
}) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(status === 'active');
  const toggleFeedback = (e) => {
    setChecked(!checked);
    updateFeedback(id, { status: checked ? 'active' : 'pending' });
    mutate(['/api/feedback', auth.user.token]);
  };
  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">
        {provider === 'github.com' ? <Github mr={2} /> : <Google mr={2} />}
        {author}
      </Td>
      <Td>{text}</Td>
      <Td>
        <NextLink href={'/feedback/' + siteId + (route ? '/' + route : '')}>
          <Link>{`${siteName}${route ? '/' + route : '/'}`}</Link>
        </NextLink>
      </Td>
      <Td>
        <Switch
          defaultIsChecked={checked}
          onClick={toggleFeedback}
          colorScheme="green"
        />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
