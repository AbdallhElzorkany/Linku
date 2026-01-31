import GetStarted from "@/components/getStarted";
import { getProfile } from "@/lib/helpers/getProfile";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Get started with linku",
};

export default async function GetStartedPage() {
  const user = await getProfile();
  if (user.username) {
    redirect("/dashboard");
  }

  return <GetStarted id={user?.id} />;
}
