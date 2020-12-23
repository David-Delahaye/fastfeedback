import React from 'react';
import { Box, Link, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';
import { parseISO } from 'date-fns';
import { format } from 'date-fns';
import NextLink from 'next/link';
import DeleteSiteModal from './DeleteSiteModal';

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.url}>
            <Td fontWeight="medium">
              <NextLink href={`/sites/${site.id}`}>
                <Link>{site.name}</Link>
              </NextLink>
            </Td>

            <Td>{site.url}</Td>
            <Td>
              <NextLink href={`/feedback/${site.id}`}>
                <Link>View Feedback</Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPp')}</Td>
            <Td>
            <DeleteSiteModal siteRef={site}/>
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
