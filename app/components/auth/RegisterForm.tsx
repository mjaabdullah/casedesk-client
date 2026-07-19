"use client";

import { AuthCard } from "@/app/components/auth/AuthCard";
import { AuthHeader } from "@/app/components/auth/AuthHeader";
import { GoogleLoginButton } from "@/app/components/auth/GoogleLoginButton";
import { AppButton } from "@/app/components/form/AppButton";
import { AppDateInput } from "@/app/components/form/AppDateInput";
import { AppInput } from "@/app/components/form/AppInput";
import { AppSelect } from "@/app/components/form/AppSelect";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AppPasswordInput } from "../form/AppPasswordInput";

type RegisterFormValues = {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  userType: string;
  barCouncilId?: string;
  enrollmentDate?: string;
  advocateClerkId?: string;
  advocateId?: string;
  startedDate?: string;
  password: string;
};

const phoneRegex = /^(?:\+88)?01[3-9]\d{8}$/;

const registerSchema = z
  .object({
    fullName: z.string().min(4, "Full name must be at least 4 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Enter a valid Bangladesh phone number"),
    dob: z.string().min(1, "Date of birth is required"),
    userType: z.string().min(1, "User type is required"),
    barCouncilId: z.string().optional(),
    enrollmentDate: z.string().optional(),
    advocateClerkId: z.string().optional(),
    advocateId: z.string().optional(),
    startedDate: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]*$/,
        "Password must contain at least one letter and one number",
      ),
  })
  .superRefine((data, ctx) => {
    const dobDate = new Date(data.dob);
    const today = new Date();

    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 18);

    const maxAgeDate = new Date();
    maxAgeDate.setFullYear(today.getFullYear() - 110);

    if (Number.isNaN(dobDate.getTime()) || dobDate > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dob"],
        message: "Date of birth cannot be in the future",
      });
    }

    if (dobDate > minAgeDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dob"],
        message: "You must be at least 18 years old",
      });
    }

    if (dobDate < maxAgeDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dob"],
        message: "Age cannot be more than 110 years",
      });
    }
    if (data.userType === "lawyer") {
      if (!data.barCouncilId || data.barCouncilId.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["barCouncilId"],
          message: "Bar Council ID is required",
        });
      }
      if (!data.enrollmentDate || data.enrollmentDate.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["enrollmentDate"],
          message: "Enrollment date is required",
        });
      }
    }
    if (data.userType === "assistant") {
      if (!data.advocateClerkId || data.advocateClerkId.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["advocateClerkId"],
          message: "Advocate Clerk ID is required",
        });
      }
      if (!data.advocateId || data.advocateId.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["advocateId"],
          message: "Advocate ID is required",
        });
      }
      if (!data.startedDate || data.startedDate.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["startedDate"],
          message: "Started date is required",
        });
      }
    }
  });

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const userType = watch("userType");

  const userTypeOptions = useMemo(
    () => [
      { label: "General User", value: "general" },
      { label: "Lawyer", value: "lawyer" },
      { label: "Lawyer Assistant", value: "assistant" },
    ],
    [],
  );

  const handleRegister = async (userData: RegisterFormValues) => {
    const { fullName, ...rest } = userData;

    const { data, error } = await authClient.signUp.email({
      ...rest,
      name: fullName,
    });

    if (data?.user) {
      toast.success("Account Created Successfully!");
    }

    if (error) {
      toast.warning(error.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        description="Set up your CaseDesk profile and start working with confidence."
      />

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <AppInput
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName}
            placeholder="A. Rahman"
            autoComplete="name"
          />
          <AppInput
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <AppInput
            label="Phone Number"
            name="phone"
            register={register}
            error={errors.phone}
            placeholder="01712345678"
            autoComplete="tel"
          />
          <AppDateInput
            label="Date of Birth"
            name="dob"
            register={register}
            error={errors.dob}
          />
        </div>

        <AppSelect
          label="User Type"
          name="userType"
          register={register}
          error={errors.userType}
          options={userTypeOptions}
          placeholder="Select your role"
        />

        {userType === "lawyer" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <AppInput
              label="Bar Council ID No"
              name="barCouncilId"
              register={register}
              error={errors.barCouncilId}
              placeholder="BC-12345"
            />
            <AppDateInput
              label="Enrollment Date"
              name="enrollmentDate"
              register={register}
              error={errors.enrollmentDate}
            />
          </div>
        ) : null}

        {userType === "assistant" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <AppInput
              label="Advocate Clerk ID No"
              name="advocateClerkId"
              register={register}
              error={errors.advocateClerkId}
              placeholder="AC-0001"
            />
            <AppInput
              label="Advocate ID"
              name="advocateId"
              register={register}
              error={errors.advocateId}
              placeholder="ADV-002"
            />
            <AppDateInput
              label="Started Date"
              name="startedDate"
              register={register}
              error={errors.startedDate}
            />
          </div>
        ) : null}

        <AppPasswordInput
          label="Password"
          name="password"
          register={register}
          error={errors.password}
          placeholder="Enter your password"
        />

        <AppButton variant="primary">Create account</AppButton>
      </form>

      <div className="mt-6">
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E5E7EB]" />
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">
            OR
          </span>
          <div className="h-px flex-1 bg-[#E5E7EB]" />
        </div>
        <div className="space-y-3">
          <GoogleLoginButton onClick={handleGoogleLogin} />
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#D4A017] hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
