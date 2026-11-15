"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Brand } from "../layout/Brand";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/shadcn/button";
import { registerSchema } from "@/lib/validations/auth.schema";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { type RegisterFormValues } from "@/lib/validations/auth.schema";

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const register = form.register;
  const handleSubmit = form.handleSubmit;
  const errors = form.formState.errors;
  const isSubmitting = form.formState.isSubmitting;
  const isValid = form.formState.isValid;

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error("Unable to create your account. Please try again.");
        return;
      }

      toast.success("Account created successfully!");
      router.replace("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

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
              Create an account
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Create your account to get started.
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
                autoComplete="new-password"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
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
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {/* {errors.root && (
            <p role="alert" className="text-center text-sm text-destructive">
              {errors.root.message}
            </p>
          )} */}

          <p className="mt-6 text-center text-sm">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export { RegisterForm };
