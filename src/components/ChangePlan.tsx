"use client";
import { useProfile } from "@/components/ProfileProvider";
import { useEffect } from "react";
export default function ChangePlan() {
  const { setProfile } = useProfile();

  useEffect(() => {
    setProfile((prev) => ({ ...prev, plan: "premium" }));
  },[]);
  return <div></div>;
}
