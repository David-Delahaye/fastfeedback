import React, { useState } from 'react';
import { Box, Link, Switch } from '@chakra-ui/react';
import RemoveButton from '@/components/RemoveButton';
import { Td } from './Table';
import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';

const FeedbackRow = ({ id, author, text, route, status, siteId }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(status === 'active');
  const toggleFeedback = (e) => {
    setChecked(!checked);
    updateFeedback(id, { status: checked ? 'active' : 'pending' });
    mutate(['/api/feedback', auth.user.token]);
  };
  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Link>{`/sites/${siteId}${route ? '/' + route : ''}`}</Link>
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
