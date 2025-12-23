"use client";
import { useState, useActionState } from "react";
import { register, registerFormState } from "../actions";
import Link from "next/link";
import { Link2, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Form from "next/form";

export default function Register() {
  const initialState: registerFormState = {
    errors: {},
    inputs: { email: "", password: "", confirmPassword: "" },
  };
  const [state, formAction, isPending] = useActionState(register, initialState);
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            linku
          </span>
        </Link>

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <h1 className="text-4xl mb-3 text-center">Get started free</h1>
          <p className="text-gray-600 text-center mb-10">
            Create your linku in minutes
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
                  defaultValue={state.inputs?.email}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              {state.errors?.email && (
                <p className={`transition-all text-red-600 text-xs ml-1 mt-2`}>
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
                  type={showPasswords.password ? "text" : "password"}
                  defaultValue={state.inputs?.password}
                  name="password"
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      password: !showPasswords.password,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.password ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {state.errors?.password && (
                <p className={`transition-all text-red-600 text-xs mt-2 ml-1`}>
                  {state.errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2.5 text-gray-700">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  defaultValue={state.inputs?.confirmPassword}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      confirmPassword: !showPasswords.confirmPassword,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {state.errors?.confirmPassword && (
                <p className={`text-xs mt-2 text-red-600 ml-1 `}>
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.02] mt-6"
            >
              {isPending ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </Form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          By creating an account, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
}
