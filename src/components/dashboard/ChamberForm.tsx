"use client";

import { useState } from "react";

import type { Chamber } from "@/types/chamber";

interface ChamberFormProps {
  chamber?: Chamber;
  onCancel: () => void;
}

const inputClassName =
  "mt-1.5 block min-h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted focus-visible:ring-2 focus-visible:ring-foreground";

export function ChamberForm({ chamber, onCancel }: ChamberFormProps) {
  const [integrationError, setIntegrationError] = useState("");
  const isEditing = Boolean(chamber);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIntegrationError(
      "Chamber submission is not connected yet. No data was sent or saved.",
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit}
      onChange={() => setIntegrationError("")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="chamber-name"
            className="text-sm font-medium text-foreground"
          >
            Chamber Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="chamber-name"
            name="name"
            required
            defaultValue={chamber?.name}
            autoComplete="organization"
            className={inputClassName}
          />
        </div>
        <div>
          <label
            htmlFor="chamber-contact"
            className="text-sm font-medium text-foreground"
          >
            Contact Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="chamber-contact"
            name="contactNumber"
            type="tel"
            required
            defaultValue={chamber?.contactNumber}
            autoComplete="tel"
            className={inputClassName}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="chamber-address"
            className="text-sm font-medium text-foreground"
          >
            Chamber Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="chamber-address"
            name="address"
            required
            defaultValue={chamber?.address}
            autoComplete="street-address"
            className={inputClassName}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="chamber-email"
            className="text-sm font-medium text-foreground"
          >
            Email Address <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="chamber-email"
            name="email"
            type="email"
            defaultValue={chamber?.email ?? ""}
            autoComplete="email"
            className={inputClassName}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="chamber-description"
            className="text-sm font-medium text-foreground"
          >
            Description <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="chamber-description"
            name="description"
            rows={4}
            defaultValue={chamber?.description ?? ""}
            className={inputClassName}
          />
        </div>
      </div>

      {integrationError ? (
        <p
          role="alert"
          className="rounded-lg border border-border bg-background p-3 text-sm text-foreground"
        >
          {integrationError}
        </p>
      ) : null}

      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-10 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="min-h-10 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
        >
          {isEditing ? "Save Changes" : "Submit Chamber"}
        </button>
      </div>
    </form>
  );
}
