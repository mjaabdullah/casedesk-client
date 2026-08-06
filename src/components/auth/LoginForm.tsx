"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { AppButton } from "@/components/form/AppButton";
import { AppInput } from "@/components/form/AppInput";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AppPasswordInput } from "../form/AppPasswordInput";

type LoginFormValues = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  const handleLogin = async (userData: LoginFormValues) => {
    const { data, error } = await authClient.signIn.email(userData);

    if (data?.user) {
      toast.success("Login Successful!");
      router.push("/");
      router.refresh();
    }

    if (error) {
      toast.warning(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back"
        description="Sign in to continue managing your legal matters securely."
      />

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <AppInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          placeholder="Enter your email"
          autoComplete="email"
        />

        <AppPasswordInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <AppButton>Login</AppButton>
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
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#D4A017] hover:underline"
        >
          Register
        </Link>
      </p>
    </AuthCard>
  );
}
