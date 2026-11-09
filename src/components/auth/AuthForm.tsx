"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/shadcn/button";
import { authSchema } from "@/lib/validations/auth.schema";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { type AuthFormValues } from "@/lib/validations/auth.schema";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const isRegister = mode === "register";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      mode,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    try {
      if (mode === "login") {
        console.log("Login:", data);
        // Call login API
      } else {
        console.log("Register:", data);
        // Call register API
      }
    } catch {
      console.error("Authentication failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {isRegister ? "Create an account" : "Welcome back"}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            {isRegister
              ? "Create your account to get started."
              : "Sign in to your account."}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input type="hidden" {...register("mode")} />

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2 overflow-hidden"
              >
                <Label htmlFor="confirmPassword">Confirm password</Label>

                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />

                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </motion.div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? "Please wait..."
                : isRegister
                  ? "Create account"
                  : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {isRegister ? "Already have an account?" : "Don't have an account?"}

            <Link
              href={isRegister ? "/login" : "/register"}
              className="ml-1 font-medium text-primary hover:underline"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export { AuthForm };
