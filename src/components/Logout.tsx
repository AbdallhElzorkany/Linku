"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
export default function Logout() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        createClient().auth.signOut();
        router.push("/");
      }}
      className="flex items-center gap-2"
    >
      <LogOut /> Logout
    </button>
  );
}
