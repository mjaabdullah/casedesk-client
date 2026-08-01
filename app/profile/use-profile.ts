"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { getSessionUserFromClient } from "../lib/getSessionFromClient";
import type { UserProfile, UserType } from "./profile";

const PROFILE_QUERY_KEY = ["profile", "me"] as const;

function normalizeUserType(value: string | null | undefined): UserType {
  const normalizedValue = value?.trim().toLowerCase();

  if (normalizedValue === "lawyer") {
    return "lawyer";
  }

  if (normalizedValue === "assistant" || normalizedValue === "lawyerassistant") {
    return "assistant";
  }

  return "general";
}

function normalizeProfile(
  sessionUser: { [key: string]: unknown } | null,
): UserProfile | null {
  if (!sessionUser) {
    return null;
  }

  return {
    id: typeof sessionUser.id === "string" ? sessionUser.id : "",
    name: typeof sessionUser.name === "string" ? sessionUser.name : "",
    email: typeof sessionUser.email === "string" ? sessionUser.email : "",
    phone: typeof sessionUser.phone === "string" ? sessionUser.phone : null,
    dateOfBirth:
      typeof sessionUser.dateOfBirth === "string"
        ? sessionUser.dateOfBirth
        : null,
    image: typeof sessionUser.image === "string" ? sessionUser.image : null,
    userType: normalizeUserType(
      typeof sessionUser.userType === "string" ? sessionUser.userType : null,
    ),
    authProvider:
      typeof sessionUser.authProvider === "string"
        ? sessionUser.authProvider
        : null,
    emailVerified:
      typeof sessionUser.emailVerified === "boolean"
        ? sessionUser.emailVerified
        : null,
    createdAt:
      typeof sessionUser.createdAt === "string" ? sessionUser.createdAt : null,
    updatedAt:
      typeof sessionUser.updatedAt === "string" ? sessionUser.updatedAt : null,
    barCouncilIdNo:
      typeof sessionUser.barCouncilIdNo === "string"
        ? sessionUser.barCouncilIdNo
        : null,
    enrollmentDate:
      typeof sessionUser.enrollmentDate === "string"
        ? sessionUser.enrollmentDate
        : null,
    advocateClerkIdNo:
      typeof sessionUser.advocateClerkIdNo === "string"
        ? sessionUser.advocateClerkIdNo
        : null,
    advocateId:
      typeof sessionUser.advocateId === "string" ? sessionUser.advocateId : null,
    startedDate:
      typeof sessionUser.startedDate === "string" ? sessionUser.startedDate : null,
    passwordLastChangedAt:
      typeof sessionUser.passwordLastChangedAt === "string"
        ? sessionUser.passwordLastChangedAt
        : null,
    isTwoFactorEnabled:
      typeof sessionUser.isTwoFactorEnabled === "boolean"
        ? sessionUser.isTwoFactorEnabled
        : null,
  };
}

async function fetchProfile(): Promise<UserProfile | null> {
  const sessionUser = await getSessionUserFromClient();
  return normalizeProfile(sessionUser);
}

export function useProfile(): UseQueryResult<UserProfile | null, Error> {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });
}
