import React from 'react';
import { Box, IconButton, Link, Skeleton, Switch } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Table, Tr, Th, Td } from './Table';
import RemoveButton from '@/components/RemoveButton';
import FeedbackRow from './FeedbackRow';

const FeedbackTable = ({ feedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Author</Th>
          <Th>Feedback</Th>
          <Th>Site/Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedback.map((feedback) => (
          <FeedbackRow key={feedback.id} {...feedback} />
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
