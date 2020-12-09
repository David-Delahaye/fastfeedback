import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import { createFeedback } from '@/lib/db';
import DashboardShell from '@/components/DashboardShell';
import FeedbackLink from '@/components/FeedbackLink';

export default function EmbedFeedback({ initialFeedback, slug, site }) {
  const router = useRouter();
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  return (
    <>
      <FeedbackLink slug={slug} />
      {allFeedback && allFeedback.length === 0 ? (
        <h2>No Feedback yet, be the first!</h2>
      ) : (
        ''
      )}
      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} settings={site?.settings} />
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
  const { site } = await getSite(siteId);
  let slug = siteId;
  if (route) slug += '/' + route;

  return {
    props: {
      initialFeedback: feedback,
      slug,
      site
    },
    revalidate: 1
  };
}
