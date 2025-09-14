"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";

export default function SignInForm() {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const { isSignedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/dashboard");
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const result = await signIn.create({
        identifier: data.identifier,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Sign-in incomplete:", result);
        setAuthError("Sign-in could not be completed. Please try again.");
      }
    } catch (error: any) {
      console.error("Sign-in error:", error);
      setAuthError(
        error.errors?.[0]?.message ||
          "An error occurred during sign-in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 px-14 py-40 overflow-hidden">
      <Card className="w-full max-w-sm rounded-2xl border border-white/15 shadow-2xl shadow-blue-950/40 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 text-white">
        <CardHeader className="flex flex-col gap-1 items-center pt-8 pb-4">
          <h1 className="text-2xl font-bold text-white mt-2">Welcome Back</h1>
          <p className="text-gray-300 text-center">
            Sign in to access your secure cloud storage
          </p>
        </CardHeader>

        <Divider />

        <CardBody className="py-6">
          {authError && (
            <div className="bg-red-500/10 text-red-300 border border-red-500/20 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="identifier"
                className="text-sm font-medium text-white/90"
              >
                Email
              </label>
              <Input
                id="identifier"
                type="email"
                placeholder="your.email@example.com"
                startContent={<Mail className="h-4 w-4 text-gray-400" />}
                isInvalid={!!errors.identifier}
                errorMessage={errors.identifier?.message}
                {...register("identifier")}
                className="w-full text-white/90 placeholder:text-white/50 bg-white/5 border border-white/20 rounded-xl focus:bg-white/10 focus:border-white/30 shadow-lg shadow-blue-950/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white/90"
                >
                  Password
                </label>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                startContent={<Lock className="h-4 w-4 text-gray-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none text-gray-300 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                {...register("password")}
                className="w-full text-white/90 placeholder:text-white/50 bg-white/5 border border-white/20 rounded-xl focus:bg-white/10 focus:border-white/30 shadow-lg shadow-blue-950/20"
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-medium mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/30"
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardBody>

        <Divider />

        <CardFooter className="flex justify-center py-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
