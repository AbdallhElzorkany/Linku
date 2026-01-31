import { redirect } from "next/navigation";
import { getProfile } from "@/lib/helpers/getProfile";
import { type Profile } from "@/lib/types/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your Linku",
};

export default async function Dashboard() {
  const profile: Profile = await getProfile();
  if (!profile.username) {
    redirect("/get-started");
  }
  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
}
