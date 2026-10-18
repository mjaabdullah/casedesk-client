"use client";

import { Button } from "@heroui/react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ChamberForm } from "@/components/dashboard/ChamberForm";
import type { UserType } from "@/components/profile/profile";
import type { Chamber, ChamberCasesResponse } from "@/types/chamber";

interface ChamberPageProps {
  userType: UserType;
  chamber?: Chamber | null;
  chamberCases?: ChamberCasesResponse;
}

function ChamberIntegrationNotice() {
  return (
    <div
      role="status"
      className="rounded-xl border border-border bg-card p-5 sm:p-6"
    >
      <h2 className="font-semibold text-foreground">Chamber data unavailable</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
        Chamber information is not connected to an API yet. No membership or
        case data is being assumed or displayed.
      </p>
    </div>
  );
}

function MemberManagement({ chamber }: { chamber: Chamber }) {
  const [message, setMessage] = useState("");

  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Users className="mt-0.5 size-5 text-muted" aria-hidden="true" />
        <div>
          <h3 className="font-semibold text-foreground">Manage Members</h3>
          <p className="mt-1 text-sm text-muted">
            Member updates are not connected to a server action or API.
          </p>
        </div>
      </div>
      {chamber.members ? (
        chamber.members.length ? (
          <ul className="mt-5 divide-y divide-border">
            {chamber.members.map((member) => (
              <li
                key={member.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {member.name}
                  </p>
                  <p className="text-sm text-muted">{member.email}</p>
                </div>
                {member.role ? (
                  <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
                    {member.role}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-muted">
            No chamber members were returned.
          </p>
        )
      ) : (
        <p className="mt-5 text-sm text-muted">
          Member information will appear when chamber members are returned by
          the API.
        </p>
      )}
      <form
        className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(
            "Member management is not connected. No invitation was sent.",
          );
        }}
        onChange={() => setMessage("")}
      >
        <label className="sr-only" htmlFor="member-email">
          Member email address
        </label>
        <input
          id="member-email"
          type="email"
          required
          placeholder="Member email address"
          className="min-h-10 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-foreground"
        />
        <Button type="submit" variant="secondary">
          Add Member
        </Button>
      </form>
      {message ? (
        <p role="alert" className="mt-3 text-sm text-foreground">
          {message}
        </p>
      ) : null}
    </section>
  );
}

export function ChamberPage({
  userType,
  chamber,
  chamberCases,
}: ChamberPageProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isManagingMembers, setIsManagingMembers] = useState(false);
  const isLawyer = userType === "lawyer";

  if (userType === "general") {
    return (
      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-semibold text-foreground">Unavailable</h2>
        <p className="mt-2 text-sm text-muted">
          My Chamber is available to lawyers and lawyer assistants.
        </p>
      </section>
    );
  }

  const hasChamber = chamber !== undefined && chamber !== null;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted">Chamber workspace</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            My Chamber
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Chamber profile, members, and associated cases.
          </p>
        </div>
        {hasChamber && isLawyer ? (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onPress={() => {
                setIsEditing((value) => !value);
                setIsManagingMembers(false);
              }}
            >
              {isEditing ? "Close Edit" : "Edit Chamber"}
            </Button>
            <Button
              variant="ghost"
              onPress={() => {
                setIsManagingMembers((value) => !value);
                setIsEditing(false);
              }}
            >
              {isManagingMembers ? "Close Members" : "Manage Members"}
            </Button>
          </div>
        ) : null}
      </section>

      {isCreating ? (
        <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-foreground">
              Create Chamber
            </h3>
            <p className="mt-1 text-sm text-muted">
              Complete the chamber details below. Submission is not connected
              and will not save data.
            </p>
          </div>
          <ChamberForm onCancel={() => setIsCreating(false)} />
        </section>
      ) : null}

      {isEditing && chamber ? (
        <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-foreground">
              Edit Chamber
            </h3>
            <p className="mt-1 text-sm text-muted">
              Changes are not sent or saved until an API is connected.
            </p>
          </div>
          <ChamberForm
            chamber={chamber}
            onCancel={() => setIsEditing(false)}
          />
        </section>
      ) : null}

      {!hasChamber ? (
        <div className="space-y-4">
          <ChamberIntegrationNotice />
          {isLawyer ? (
            <div className="rounded-xl border border-dashed border-border p-5 sm:p-6">
              <h3 className="font-semibold text-foreground">
                {chamber === null
                  ? "No chamber is associated with this account"
                  : "Chamber membership hasn't been checked"}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {chamber === null
                  ? "You can prepare chamber details below. The form is UI-only until chamber creation is connected."
                  : "If you don't yet belong to a chamber, you can prepare its details below. The current UI cannot check existing membership."}
              </p>
              {!isCreating ? (
                <Button
                  className="mt-4"
                  variant="primary"
                  onPress={() => setIsCreating(true)}
                >
                  <Building2 className="size-4" aria-hidden="true" />
                  Create Chamber
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-foreground">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-foreground">
                  {chamber.name}
                </h3>
                {chamber.description ? (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {chamber.description}
                  </p>
                ) : null}
              </div>
            </div>
            <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-medium text-muted">Address</dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {chamber.address}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-muted"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-medium text-muted">
                    Contact Number
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {chamber.contactNumber}
                  </dd>
                </div>
              </div>
              {chamber.email ? (
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-muted"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-muted">Email</dt>
                    <dd className="mt-1 break-all text-sm text-foreground">
                      {chamber.email}
                    </dd>
                  </div>
                </div>
              ) : null}
            </dl>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-foreground">
                  Chamber cases
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {chamberCases
                    ? `${chamberCases.totalCount ?? chamberCases.cases.length} cases`
                    : "Case data not connected"}
                </p>
              </div>
              <BriefcaseBusiness
                className="size-5 text-muted"
                aria-hidden="true"
              />
            </div>
            <Link
              href="/dashboard/chamber-cases"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              View chamber cases
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      )}

      {isManagingMembers && chamber ? (
        <MemberManagement chamber={chamber} />
      ) : null}
    </div>
  );
}
