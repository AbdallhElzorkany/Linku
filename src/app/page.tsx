import { Link2, Sparkles, Palette, BarChart3, Check } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl bg-neutral-800 bg-clip-text text-transparent">
                linku
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 text-gray-700 hover:text-neutral-600 transition-all rounded-xl hover:bg-purple-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-neutral-800 text-white rounded-xl hover:shadow-lg hover:shadow-neutral-500/30 transition-all hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-50 to-blue-50 border border-purple-200/50 text-neutral-700 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Simple, powerful, and free</span>
          </div>

          <h1 className="text-7xl mb-6 bg-linear-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight">
            One link for
            <br />
            everything you are
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Share your content, social profiles, store, and more with a single
            beautiful link. Perfect for creators, businesses, and influencers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/register"
              className="px-8 py-4 bg-neutral-800 text-white rounded-xl hover:shadow-xl hover:shadow-neutral-500/30 transition-all text-lg hover:scale-105"
            >
              Claim Your Linku
            </Link>
            <Link
              href="/johndoe"
              className="px-8 py-4 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-lg"
            >
              View Example
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="max-w-sm mx-auto mt-24 relative">
          {/* Decorative blur */}
          <div className="absolute -inset-10 bg-linear-to-r from-purple-300 to-blue-300 rounded-full blur-3xl opacity-20" />

          <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-28 h-28 bg-linear-to-br from-purple-500 via-purple-600 to-blue-600 rounded-full mx-auto mb-5 shadow-lg" />
              <h3 className="text-2xl mb-2">Sarah Johnson</h3>
              <p className="text-gray-600">Content Creator & Designer ✨</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "My Portfolio",
                  linear: "from-purple-500 to-purple-600",
                },
                { title: "Instagram", linear: "from-pink-500 to-orange-500" },
                {
                  title: "YouTube Channel",
                  linear: "from-red-500 to-red-600",
                },
                {
                  title: "Shop My Store",
                  linear: "from-blue-500 to-blue-600",
                },
              ].map((link, i) => (
                <div
                  key={i}
                  className="group relative w-full p-4 bg-linear-to-r hover:shadow-lg from-gray-50 to-gray-50 hover:from-white hover:to-white rounded-xl transition-all text-center cursor-pointer border border-gray-200 hover:border-transparent hover:-translate-y-0.5"
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${link.linear} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}
                  />
                  <span className="relative">{link.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-linear-to-b from-gray-50 to-white py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Everything you need</h2>
            <p className="text-xl text-gray-600">
              Powerful features to grow your online presence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-neutral-500/20">
                <Link2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-3">Unlimited Links</h3>
              <p className="text-gray-600 leading-relaxed">
                Add as many links as you want. Share all your important content
                without any restrictions or limits.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-3">Beautiful Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Stand out with a clean, modern interface that showcases your
                content perfectly.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-3">Advanced Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track clicks, views, and engagement. Understand your audience
                and optimize your content.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Decorative blur */}
          <div className="absolute inset-0 bg-linear-to-r from-purple-300 to-blue-300 rounded-3xl blur-3xl opacity-20" />

          <div className="relative bg-linear-to-br from-purple-600 via-purple-700 to-blue-700 rounded-3xl p-16 text-white shadow-2xl">
            <h2 className="text-5xl mb-5">Ready to share your world?</h2>
            <p className="text-xl mb-10 opacity-90 leading-relaxed">
              Join thousands of creators, businesses, and influencers using
              linku
            </p>
            <Link
              href="/register"
              className="inline-block px-10 py-4 bg-white text-neutral-700 rounded-xl hover:bg-gray-50 transition-all text-lg shadow-xl hover:scale-105"
            >
              Create Your Free Linku
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="size-6 bg-neutral-800 rounded-lg flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl bg-neutral-800 bg-clip-text text-transparent">
              linku
            </span>
          </div>
          <p className="text-center text-gray-500">
            &copy; 2025 linku. Made with love for creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
