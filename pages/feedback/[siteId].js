import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import FreePlanEmptyState from '@/components/FreePlanEmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import SiteTable from '@/components/SiteTable';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';
import { useRouter } from 'next/router';

export default function SiteFeedback() {
  const { user } = useAuth();
  const { query } = useRouter();
  console.log(query);
  const { data } = useSWR(
    user ? [`/api/feedback/${query.siteId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader siteName={data.site.name} />
      {data.feedback && data.feedback.length !== 0 ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
}
