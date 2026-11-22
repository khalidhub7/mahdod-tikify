import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account to access your dashboard.",
  alternates: {
    canonical: "/login",
  },
};

// Suspense required because LoginForm uses useSearchParams()

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center">Loading...</div>
      }
    >
      <main className="flex min-h-screen items-center justify-center p-4">
        <LoginForm />
      </main>
    </Suspense>
  );
};

export default LoginPage;
