import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { createFeedback } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import SiteTableHeader from '@/components/SiteTableHeader';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

export default function SiteFeedback({ initialFeedback, site }) {
  const auth = useAuth();
  const inputEl = useRef(null);
  const router = useRouter();
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : '';
  const route = siteAndRoute ? siteAndRoute[1] : '';
  //const [siteID, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId,
      route: route || '/',
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };
  return (
    <DashboardShell>
      <SiteTableHeader site={site} routeName={route} />
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        p={4}>
        <Box as="form" onSubmit={onSubmit}>
          <FormControl py={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" />
            <Button type="submit" fontWeight="medium" mt={2}>
              Add Comment
            </Button>
          </FormControl>
        </Box>

        {allFeedback &&
          allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Box>
    </DashboardShell>
  );
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = await sites.map((site) => ({
    params: {
      site: [site.id.toString()]
    }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { site } = await getSite(siteId);
  const { feedback } = await getAllFeedback(siteId, route);

  return {
    props: {
      initialFeedback: feedback,
      site
    },
    revalidate: 1
  };
}
