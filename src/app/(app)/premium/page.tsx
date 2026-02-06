import { Metadata } from "next";
import { getProfile } from "@/lib/helpers/get-profile";
import { Check, Link2, Sparkles } from "lucide-react";
import CouponComponent from "@/components/CouponComponent";

export const metadata: Metadata = {
  title: "Premium",
  description: "Upgrade to premium to get more features",
};
export default async function PremiumPage() {
  const profile = await getProfile();

  return (
    <div className="bg-linear-to-b from-white via-gray-50 to-white pt-20 not-lg:pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">

          <h2 className="text-5xl mb-4">Pricing</h2>
          <p className="text-xl text-gray-600">Start free, upgrade once.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="relative bg-white rounded-3xl border border-gray-200 p-10 shadow-sm hover:shadow-xl transition-all">
            {profile.plan === "free" && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 rounded-full bg-neutral-800 text-white text-sm shadow-lg">
                  Current Plan
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-2xl">Free</h3>
                <p className="text-gray-600">Everything you need to start</p>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-6xl">$0</span>
              <span className="text-gray-600 mb-2">forever</span>
            </div>

            <div className="space-y-4 mb-10">
              {["Unlimited links", "Custom username", "Mobile responsive"].map(
                (feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative bg-white rounded-3xl border-2 border-neutral-800 p-10 shadow-xl hover:shadow-2xl transition-all">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1 rounded-full bg-neutral-800 text-white text-sm shadow-lg">
                {profile.plan === "premium" ? "Current Plan" : "Best Value"}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl">Premium</h3>
                <p className="text-gray-600">
                  One-time payment, lifetime access
                </p>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="text-6xl">$10</span>
              <span className="text-gray-600 mb-2">forever</span>
            </div>

            <div className="space-y-4 mb-10">
              {[
                "Everything in Free",
                "Advanced analytics",
                "QR code generation",
                "Remove Linku branding",
                "Priority support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {profile.plan === "free" && <CouponComponent />}

            {profile.plan === "free" && (
              <form action="/api/premium/checkout" method="post">
                <button
                  type="submit"
                  role="link"
                  className="block w-full cursor-pointer text-center px-6 py-3 rounded-2xl bg-neutral-800 text-white hover:shadow-lg hover:shadow-neutral-500/30 transition-all font-medium"
                >
                  Get Premium - $10
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
