import Link from "next/link";
import { Link2 } from "lucide-react";
import ResetPasswordComponent from "@/components/ResetPasswordComponent";
import { createClient } from "@/lib/supabase/server";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ code: string }>;
}) {
  const { code } = await searchParams;
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

        {/* Register Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <h1 className="text-4xl mb-3 text-center">Reset Password</h1>
          <p className="text-gray-600 text-center mb-10">
            Create a new password
          </p>
          <ResetPasswordComponent code={code} />
        </div>
      </div>
    </div>
  );
}
