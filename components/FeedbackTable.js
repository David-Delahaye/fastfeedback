import React from 'react';
import { Box, IconButton, Link, Skeleton, Switch } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Table, Tr, Th, Td } from './Table';
import RemoveButton from '@/components/RemoveButton';

const FeedbackTable = ({ feedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedback.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Link>{'/'}</Link>
            </Td>
            <Td>
              <Switch
                defaultIsChecked={feedback.status === 'active'}
                colorScheme="green"
              />
            </Td>
            <Td>
              <RemoveButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
