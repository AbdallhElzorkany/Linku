import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SidebarComponent";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarInset } from "@/components/ui/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main
          className={`bg-sidebar border-sidebar-border h-[98vh] not-md:w-[98vw] not-md:m-auto p-2 rounded-lg border shadow-sm `}
        >
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
