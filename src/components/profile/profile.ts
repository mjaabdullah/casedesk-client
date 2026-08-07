export type UserType = "lawyer" | "assistant" | "general";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  image?: string | null | undefined;
  userType: UserType;
  authProvider?: string | null;
  emailVerified?: boolean | null;
  createdAt?: object | null;
  updatedAt?: object | null;
  barCouncilIdNo?: string | null;
  enrollmentDate?: string | null;
  advocateClerkIdNo?: string | null;
  advocateId?: string | null;
  startedDate?: string | null;
  passwordLastChangedAt?: string | null;
  isTwoFactorEnabled?: boolean | null;
};
