"use client";
import { supabase } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
export default function Logout() {
  return (
    <button onClick={() => supabase.auth.signOut()}>
      <LogOut /> Logout
    </button>
  );
}
