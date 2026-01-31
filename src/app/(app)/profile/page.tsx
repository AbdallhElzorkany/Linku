import { type Profile } from "@/lib/types/profile";
import { getProfile } from "@/lib/helpers/getProfile";
import { redirect } from "next/navigation";
import ProfileComponent from "@/components/ProfileComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Linku profile",
};

export default async function ProfilePage() {
  const profile: Profile = await getProfile();
  if (!profile.username) {
    redirect("/get-started");
  }
  return <ProfileComponent profile={profile} />;
}
