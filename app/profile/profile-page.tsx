"use client";

import { UserX } from "lucide-react";

import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { LoadingSkeleton } from "./loading-skeleton";
import { ProfileHeader } from "./profile-header";
import { ProfileInformationCard } from "./profile-information-card";
import { useProfile } from "./use-profile";

/**
 * Top-level Profile page component. Owns data fetching via `useProfile`
 * and switches between loading, error, empty, and success UI. Only ever
 * renders the actual profile layout once `profile` is present.
 */
export function ProfilePage() {
  const { data: profile, isPending, isError, error, refetch } = useProfile();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">My Profile</h1>
        <p className="text-sm text-foreground/60">
          View your personal, professional, and account details.
        </p>
      </div>

      {isPending ? <LoadingSkeleton /> : null}

      {!isPending && isError ? (
        <ErrorState message={error.message} onRetry={() => void refetch()} />
      ) : null}

      {!isPending && !isError && !profile ? (
        <EmptyState
          icon={<UserX className="size-5" aria-hidden="true" />}
          title="No profile data available"
          description="We couldn't find any profile information for this account."
        />
      ) : null}

      {!isPending && !isError && profile ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
          <ProfileHeader profile={profile} />
          <ProfileInformationCard profile={profile} />
        </div>
      ) : null}
    </main>
  );
}
