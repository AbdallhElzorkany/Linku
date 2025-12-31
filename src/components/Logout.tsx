"use client";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
export default function Logout() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        supabase.auth.signOut();
        router.refresh();
      }}
      className="flex items-center gap-2"
    >
      <LogOut /> Logout
    </button>
  );
}
