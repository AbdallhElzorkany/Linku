import Link from "next/link";
import { Link2, CheckCircle, ArrowRight } from "lucide-react";

export default function EmailConfirmed() {
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

        {/* Confirmation Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-linear-to-br from-green-500 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 bg-linear-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-4xl mb-4">Email confirmed!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your email has been successfully verified. You can now continue
            setting up your linku profile and start sharing your links.
          </p>

          <div className="bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div className="text-sm text-left">
                <p className="text-green-900 mb-2">You&apos;re all set!</p>
                <p className="text-green-700">
                  Your account is now active and ready to use. Let&apos;s get
                  started with setting up your profile.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.02] group mb-4"
            >
              <span> Back to Login</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
