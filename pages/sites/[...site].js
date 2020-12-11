import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { createFeedback } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import SiteTableHeader from '@/components/SiteTableHeader';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';

export default function SiteFeedback() {
  const { user } = useAuth();
  const inputEl = useRef(null);
  const router = useRouter();
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : '';
  const route = siteAndRoute ? siteAndRoute[1] : '';
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/sites/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const feedback = feedbackData?.feedback;
  const isOwner = site?.authorId === user?.uid;

  const onSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId,
      siteName: site.name,
      route: route || '',
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback]
      }),
      false
    );
    e.target.comment.value = '';
  };

  return (
    <DashboardShell>
      <SiteTableHeader site={site} routeName={route} isOwner={isOwner} />
      <Box display="flex" flexDirection="column" width="full" margin="0 auto">
        <Box as="form" onSubmit={onSubmit} mb={4}>
          <FormControl display="flex" flexDir="column">
            <Textarea
              ref={inputEl}
              id="comment"
              background="white"
              maxW={600}
              height={100}
              placeholder="Leave a comment..."
            />
            <Button
              type="submit"
              fontWeight="medium"
              mt={2}
              maxWidth="fit-content"
              variant="outline"
              backgroundColor="gray.900"
              color="white"
              size="md"
              _hover={{ bg: 'gray.800' }}
              _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}>
              Add Comment
            </Button>
          </FormControl>
        </Box>

        {feedback &&
          feedback.map((feedback) => (
            <Feedback
              key={feedback.id}
              {...feedback}
              settings={site?.settings}
            />
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
