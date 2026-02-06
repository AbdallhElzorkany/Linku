import GetStarted from "@/components/getStarted";
import { getProfile } from "@/lib/helpers/get-profile";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Get started with linku - create your profile",
};

export default async function GetStartedPage() {
  const user = await getProfile();
  if (user.username) {
    redirect("/dashboard");
  }

  return <GetStarted id={user?.id} />;
}
