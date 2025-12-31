"use client";
import { useActionState } from "react";
import Form from "next/form";
import Link from "next/link";
import { Link2, Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { resetRequest, resetRequestFormState } from "@/actions/reset-password";
export default function ResetPassword() {
  const initialState: resetRequestFormState = {
    errors: {},
    inputs: {
      email: "",
    },
    success: false,
  };
  const [state, action, isPending] = useActionState(resetRequest, initialState);

  if (state?.success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-10"
          >
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Link2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              linku
            </span>
          </Link>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 bg-linear-to-br from-green-500 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-24 h-24 bg-linear-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h1 className="text-4xl mb-4">Check your email</h1>
            <p className="text-gray-600 mb-3 leading-relaxed">
              We&apos;ve sent password reset instructions to
            </p>
            <p className="text-purple-600 mb-8">{state.inputs?.email}</p>

            <Link
              href="/login"
              className="block w-full py-3.5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center px-6">
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

        {/* Reset Password Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Login</span>
          </Link>

          <h1 className="text-4xl mb-3 text-center">Reset password</h1>
          <p className="text-gray-600 mb-10 leading-relaxed text-center">
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </p>

          <Form action={action} className="space-y-6">
            {state?.errors?.message && (
              <div className="bg-red-50 text-center border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {state.errors.message}
              </div>
            )}
            <div>
              <label className={`block text-sm mb-2.5 text-gray-700 ${state?.errors?.email ? "text-red-600" : ""}`}>
                Email address
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${state?.errors?.email ? "text-red-600" : ""}`} />
                <input
                  type="email"
                  name="email"
                  defaultValue={state.inputs?.email}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${state?.errors?.email ? "border-red-600" : ""}`}
                />
              </div>
              {state?.errors?.email && (
                <p className="text-sm text-red-600">
                  {state.errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin mx-auto" /> : "Submit"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
