import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new account and get started today.",
  alternates: {
    canonical: "/register",
  },
};

const RegisterPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
