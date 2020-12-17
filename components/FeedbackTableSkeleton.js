import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';

const SkeletonRow = ({ width }) => (
  <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box>
);

const FeedbackTableSkeleton = () => {
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
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="50px" />
      </tbody>
    </Table>
  );
};

export default FeedbackTableSkeleton;
