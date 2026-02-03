"use client";
import ProfileComponent from "@/components/ProfileComponent";
import { useProfile } from "@/components/ProfileProvider";


export default function ProfilePage() {
  const { profile } = useProfile();
  return <ProfileComponent profile={profile} />;
}
