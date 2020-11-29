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

export default function MyFeedback() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback && data.feedback.length !== 0 ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
