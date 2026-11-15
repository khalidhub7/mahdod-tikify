import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new account and get started today.",
  alternates: {
    canonical: "/register",
  },
};

// Suspense required because RegisterForm uses useSearchParams()

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="flex min-h-screen items-center justify-center p-4">
        <RegisterForm />
      </main>
    </Suspense>
  );
};

export default RegisterPage;
