import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SidebarComponent";
import { SidebarInset } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
