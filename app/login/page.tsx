import { LoginForm } from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FB] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <LoginForm />
      </div>
    </main>
  );
}
