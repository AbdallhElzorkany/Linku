"use client"
import { Link2 } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl bg-neutral-800 bg-clip-text text-transparent">
                  linku
                </span>
              </div>
              <SidebarTrigger title="sidebar"/>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
