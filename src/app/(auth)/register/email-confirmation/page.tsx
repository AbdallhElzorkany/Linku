import Link from "next/link";
import { Link2, Mail, CheckCircle, ArrowRight } from "lucide-react";

export default function ConfirmEmail() {
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

        {/* Confirmation Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 bg-linear-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <h1 className="text-4xl mb-4">Check your email</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We&apos;ve sent a confirmation link to your email address. Click the
            link to verify your account and continue setting up your linku.
          </p>

          <div className="bg-linear-to-r from-blue-50 to-purple-50 border-2 border-blue-200/50 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="text-sm text-left">
                <p className="text-blue-900 mb-2">
                  Didn&apos;t receive the email?
                </p>
                <p className="text-blue-700">
                  Check your spam folder or request a new confirmation link
                  below.
                </p>
              </div>
            </div>
          </div>

          {/* Mock "I've confirmed" button for demo purposes */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-600 mb-3">
              Already confirmed your email?
            </p>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors group"
            >
              <span> Back to Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
