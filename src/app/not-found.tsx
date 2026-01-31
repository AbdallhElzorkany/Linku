import Link from "next/link";
import { Home, Search, Link2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-br from-neutral-100 via-gray-50 to-white flex items-center justify-center px-6 py-16">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Decorative blur */}
          <div className="absolute inset-0 bg-linear-to-r from-neutral-300 to-gray-300 rounded-full blur-3xl opacity-20" />

          <div className="relative">
            <h1 className="text-9xl lg:text-[12rem] bg-linear-to-r from-neutral-600 via-neutral-700 to-gray-600 bg-clip-text text-transparent">
              404
            </h1>

            {/* Floating elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-linear-to-br from-neutral-400 to-neutral-600 rounded-full blur-xl opacity-40" />
            <div className="absolute -top-4 -right-12 w-16 h-16 bg-linear-to-br from-gray-400 to-gray-600 rounded-full blur-xl opacity-40" />
          </div>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-2">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <p className="text-gray-500">It might have been moved or deleted.</p>
        </div>

        {/* Illustration */}
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-linear-to-br from-neutral-500 to-gray-600 rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="relative w-32 h-32 bg-linear-to-br from-neutral-100 to-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
              <Search className="w-16 h-16 text-neutral-600" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-neutral-600 to-gray-600 text-white rounded-2xl hover:shadow-xl hover:shadow-neutral-500/30 transition-all hover:scale-105 shadow-lg group"
        >
          <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Go to Homepage</span>
        </Link>

        {/* Branding */}
        <div className="mt-12">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-linear-to-br from-neutral-600 to-gray-600 rounded-lg flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg">linku</span>
          </div>
        </div>
      </div>
    </div>
  );
}
