import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { createFeedback } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import FeedbackLink from '@/components/FeedbackLink';

export default function SiteFeedback({ initialFeedback, siteId }) {
  const router = useRouter();
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  return (
    <>
      <FeedbackLink siteId={siteId} />
      {allFeedback.length === 0 ? <h2>No Feedback yet, be the first!</h2> : ''}
      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
    </>
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

export async function getStaticProps({ params }) {
  const [siteId, route] = params.site;
  const { feedback } = await getAllFeedback(siteId, route);

  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  };
}
