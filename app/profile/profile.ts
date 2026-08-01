export type UserType = "lawyer" | "assistant" | "general";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  image?: string | null;
  userType: UserType;
  authProvider?: string | null;
  emailVerified?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  barCouncilIdNo?: string | null;
  enrollmentDate?: string | null;
  advocateClerkIdNo?: string | null;
  advocateId?: string | null;
  startedDate?: string | null;
  passwordLastChangedAt?: string | null;
  isTwoFactorEnabled?: boolean | null;
};
