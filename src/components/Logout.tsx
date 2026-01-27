"use client";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
export default function Logout() {
  const router = useRouter();
  return (
    <SidebarMenuButton
      asChild
      onClick={() => {
        supabase.auth.signOut();
        router.push("/");
      }}
      size="lg"
      className="flex items-center gap-2 hover:cursor-pointer hover:text-red-500 transition-colors"
    >
      <div>
        <LogOut /> Logout
      </div>
    </SidebarMenuButton>
  );
}
