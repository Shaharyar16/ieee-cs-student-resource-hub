import { Link } from 'react-router-dom';
import EmptyState from '@/components/ui/EmptyState';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20">
      <EmptyState
        icon="compass"
        title="Page not found"
        description="The page you're looking for doesn't exist or may have moved."
        action={
          <Link to="/" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            Back to Home
          </Link>
        }
      />
    </div>
  );
}
