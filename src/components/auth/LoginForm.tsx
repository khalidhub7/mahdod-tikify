"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Brand } from "../layout/Brand";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/shadcn/button";
import { loginSchema } from "@/lib/validations/auth.schema";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { type LoginFormValues } from "@/lib/validations/auth.schema";
import { isSafeRedirect } from "@/lib/validations/redirect-validation";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const messages: Record<string, string> = {
  email_not_confirmed: "Please confirm your email before signing in.",
  invalid_credentials: "Invalid email or password.",
  over_request_rate_limit: "Too many attempts. Try again later.",
  over_email_send_rate_limit:
    "Please wait a minute before requesting another email.",
};

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const form = useForm<LoginFormValues>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const register = form.register;
  const handleSubmit = form.handleSubmit;
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;
  const isValid = form.formState.isValid;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.code === "email_not_confirmed") {
          toast.error(messages.email_not_confirmed, {
            id: "email-not-confirmed",
            duration: 15000,
            action: {
              label: "Resend email",
              onClick: async () => {
                const { error } = await supabase.auth.resend({
                  type: "signup",
                  email: data.email,
                });

                if (error) {
                  toast.error(
                    messages[error.code || ""] || "Unable to resend the email.",
                  );
                  return;
                }
                toast.success("Confirmation email sent. Check your inbox.");
              },
            },
          });
          return;
        }
        toast.error(
          messages[error.code || ""] || "Unable to sign in. Please try again.",
        );
        return;
      }
      const redirectTo = searchParams.get("redirect");

      router.replace(
        redirectTo && isSafeRedirect(redirectTo) ? redirectTo : "/dashboard",
      );
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // verify email status
  useEffect(() => {
    if (searchParams.get("verification-status") === "failed") {
      // id prevents a duplicate toast from Strict Mode's double effect in dev
      toast.error("Email verification failed. Please try again.", {
        id: "verification-failed",
      });

      const params = new URLSearchParams(searchParams.toString());
      params.delete("verification-status");
      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname);
    }
  }, [searchParams, pathname, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card className="bg-background/45 ring-2 ring-ring/30">
        <CardHeader className="space-y-3 text-center">
          <Brand withAvatar={false} className="mx-auto" />

          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Welcome back
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Sign in to your account.
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />

              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
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
                autoComplete="current-password"

                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
              />

              {errors.password && (
                <p id="password-error" className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              aria-busy={isSubmitting}
              className="w-full cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : undefined}
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm">
            Don't have an account?
            <Link
              href="/register"
              className="ml-1 font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export { LoginForm };
