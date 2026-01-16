"use client";
import Link from "next/link";
import Form from "next/form";
import { Link2, Mail, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useActionState, useState } from "react";
import { login, LoginFormState } from "@/lib/actions/login";

export default function Login() {
  const initialState: LoginFormState = {
    errors: {},
    inputs: {
      email: "",
      password: "",
    },
  };
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-50 via-gray-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="size-10 bg-neutral-800 rounded-xl flex items-center justify-center shadow-lg shadow-neutral-500/20">
            <Link2 className="size-6 text-white" />
          </div>
          <span className="text-3xl bg-neutral-800 bg-clip-text text-transparent">
            linku
          </span>
        </Link>
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <h1 className="text-4xl mb-3 text-center">Welcome back</h1>
          <p className="text-gray-600 text-center mb-10">
            Login to manage your linku
          </p>

          <Form action={formAction} className="space-y-2">
            {state?.errors?.message && (
              <div className="bg-red-50 text-center border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {state.errors.message}
              </div>
            )}

            <div>
              <label className="block text-sm mb-2.5 text-gray-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  defaultValue={state?.inputs?.email}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              {state?.errors?.email && (
                <p className="ml-1 text-sm text-red-600">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2.5 text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  defaultValue={state?.inputs?.password}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {state?.errors?.password && (
                <p className="ml-1 text-sm text-red-600">
                  {state.errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end text-sm pt-2">
              <Link
                href="/forgot-password"
                className="text-neutral-600 hover:text-neutral-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 bg-neutral-800 text-white rounded-xl hover:shadow-lg hover:shadow-neutral-500/30 transition-all hover:scale-[1.02] mt-6"
            >
              {isPending ? (
                <LoaderCircle className="animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </button>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-neutral-600 hover:text-neutral-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
