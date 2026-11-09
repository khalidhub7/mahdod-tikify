import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account to access your dashboard.",
  alternates: {
    canonical: "/login",
  },
};

const LoginPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <AuthForm mode="login" />
    </main>
  );
};
export default LoginPage;
