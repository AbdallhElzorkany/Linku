import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Check, Sparkles, Crown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function PremiumSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/premium");
  }
  const { status } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    redirect("/premium");
  }

  if (status === "complete") {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase
      .from("profiles")
      .update({ plan: "premium" })
      .eq("id", user?.id);
  }

  return (
    <div className="bg-linear-to-b from-white via-gray-50 to-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-linear-to-r from-neutral-400 to-gray-500 rounded-full animate-pulse opacity-20"></div>
            <div className="relative w-20 h-20 bg-linear-to-r from-neutral-400 to-gray-500 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-neutral-50 to-gray-50 border border-neutral-200/60 text-neutral-700 rounded-full mb-6 shadow-sm">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">Welcome to Premium!</span>
            </div>

            <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Payment Successful
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for upgrading to Linku Premium!
            </p>
            <p className="text-gray-500">
              You now have lifetime access to all premium features.
            </p>
          </div>

          {/* Premium Features */}
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-r from-neutral-800 to-neutral-700 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-semibold">Premium Unlocked</h3>
                <p className="text-gray-600">
                  All features are now available to you
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                "Advanced analytics",
                "QR code generation",
                "Remove Linku branding",
                "Priority support",
                "Unlimited links",
                "Custom username",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-neutral-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-neutral-800 text-white hover:shadow-lg hover:shadow-neutral-500/30 transition-all font-medium text-lg"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/premium"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-all font-medium text-lg"
            >
              View Premium Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
