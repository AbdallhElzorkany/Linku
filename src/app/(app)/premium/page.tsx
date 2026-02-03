import { Metadata } from "next";
import { getProfile } from "@/lib/helpers/getProfile";
export const metadata: Metadata = {
  title: "Premium",
  description: "Upgrade to premium to get more features",
};
export default async function PremiumPage() {
  const profile = await getProfile();
  return <div>Premium Page plan: {profile.plan}</div>;
}

