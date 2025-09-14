"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Progress } from "@heroui/progress";
import {
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  UserPlus
} from "lucide-react";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const passwordValue = watch("password", "");

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (error: any) {
      const errorMsg = error.errors?.[0]?.message || "An error occurred during sign-up. Please try again.";
      if (errorMsg.includes("online data breach")) {
        setAuthError(
          "Your password was found in a known data breach. Please choose a stronger, unique password for your account.\n\nTips for a strong password:\n- Use at least 8 characters\n- Mix uppercase, lowercase, numbers, and symbols\n- Avoid common words and patterns"
        );
      } else {
        console.error("Sign-up error:", error);
        setAuthError(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    if (signUp.status === "complete") {
      setVerificationError("You're already signed in. Please continue to your dashboard.");
      return;
    }

    setIsSubmitting(true);
    setVerificationError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Verification incomplete:", result);
        setVerificationError(
          "Verification could not be completed. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      const errorMsg = error.errors?.[0]?.message || "An error occurred during verification. Please try again.";
      if (errorMsg.includes("already signed in")) {
        setVerificationError("You're already signed in. Please continue to your dashboard.");
      } else {
        setVerificationError(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifying) {
    return (
      
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 px-8 py-6 overflow-hidden">
        <Card className="w-full max-w-md rounded-2xl border border-white/15 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
          <CardHeader className="flex flex-col gap-1 items-center pt-8 pb-4">
            <div className="p-3 rounded-full bg-blue-500/15">
              <Shield className="h-8 w-8 text-blue-300" />
            </div>
            <h1 className="text-2xl font-bold text-white mt-2">
              Verify Your Email
            </h1>
            <p className="text-gray-300 text-center text-sm">
              We've sent a 6-digit verification code to your email address
            </p>
          </CardHeader>

          <CardBody className="py-4">
            {verificationError && (
              <div className="bg-red-500/10 text-red-300 border border-red-500/20 p-3 rounded-lg mb-4 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{verificationError}</p>
              </div>
            )}

            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="verificationCode"
                  className="text-sm font-medium text-white/90"
                >
                  Verification Code
                </label>
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-medium text-white/90 bg-white/5 border border-white/20 rounded-xl focus:bg-white/10 focus:border-white/30 shadow-lg shadow-blue-950/20"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-gray-300">
                  Check your inbox for the verification code
                </p>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/30"
                isLoading={isSubmitting}
                size="lg"
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                Didn't receive a code?{" "}
                <button
                  onClick={async () => {
                    if (signUp) {
                      await signUp.prepareEmailAddressVerification({
                        strategy: "email_code",
                      });
                    }
                  }}
                  className="text-blue-300 hover:text-blue-200 underline underline-offset-4 font-medium"
                >
                  Resend code
                </button>
              </p>
            </div>
          </CardBody>
          
          <CardFooter className="flex justify-center py-4">
            <button
              onClick={() => setVerifying(false)}
              className="text-sm text-white/80 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign up
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 px-16 py-6 overflow-hidden">
      <Card className="w-full max-w-xl rounded-2xl border border-white/15 shadow-2xl shadow-blue-950/40 backdrop-blur-xl text-white">
        <CardHeader className="flex flex-col gap-1 items-center pt-8 pb-4">
          <div className="p-3 rounded-full bg-blue-500/15">
            <UserPlus className="h-8 w-8 text-blue-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">
            Create Your Account
          </h1>
          <p className="text-gray-300 text-center text-sm">
            Sign up to start managing your images securely
          </p>
        </CardHeader>

        <CardBody className="py-4">
          {authError && (
            <div className="bg-red-500/10 text-red-300 border border-red-500/20 p-3 rounded-lg mb-4 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                {authError.split("\n").map((line, idx) => (
                  <p key={idx} className={idx === 0 ? "font-medium text-sm" : "text-xs mt-1"}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/90"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                startContent={<Mail className="h-4 w-4 text-gray-400" />}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register("email")}
                className="w-full text-white/90 placeholder:text-white/50 bg-white/5 border border-white/20 rounded-xl focus:bg-white/10 focus:border-white/30 shadow-lg shadow-blue-950/20"
                size="lg"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/90"
              >
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
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
                {...register("password", {
                  onChange: (e) => {
                    setPasswordStrength(calculatePasswordStrength(e.target.value));
                  }
                })}
                className="w-full text-white/90 placeholder:text-white/50 bg-white/5 border border-white/20 rounded-xl focus:bg-white/10 focus:border-white/30 shadow-lg shadow-blue-950/20"
                size="lg"
              />
              
              {passwordValue && (
                <div className="space-y-1">
                  <Progress 
                    value={passwordStrength} 
                    className="w-full" 
                    color={
                      passwordStrength < 50 ? "danger" : 
                      passwordStrength < 75 ? "warning" : "success"
                    }
                    size="sm"
                  />
                  <p className="text-xs text-white/80">
                    Password strength:{" "}
                    <span className={
                      passwordStrength < 50 ? "text-red-300" : 
                      passwordStrength < 75 ? "text-yellow-300" : "text-green-300"
                    }>
                      {passwordStrength < 50 ? "Weak" : 
                       passwordStrength < 75 ? "Medium" : "Strong"}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="passwordConfirmation"
                className="text-sm font-medium text-white/90"
              >
                Confirm Password
              </label>
              <Input
                id="passwordConfirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                startContent={<Lock className="h-4 w-4 text-gray-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none text-gray-300 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                isInvalid={!!errors.passwordConfirmation}
                errorMessage={errors.passwordConfirmation?.message}
                {...register("passwordConfirmation")}
                className="w-full text-white/90 placeholder:text-white/50 bg-white/5 border border-white/20 rounded-xl focus:bg-white/10 focus:border-white/30 shadow-lg shadow-blue-950/20"
                size="lg"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/80">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div id="clerk-captcha" />
            <Button
              type="submit"
              color="primary"
              className="w-full font-medium mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/30"
              isLoading={isSubmitting}
              size="lg"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardBody>

        <Divider />

        <CardFooter className="flex justify-center py-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}