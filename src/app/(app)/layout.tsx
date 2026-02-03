import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SidebarComponent";
import { SidebarInset } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { getProfile } from "@/lib/helpers/getProfile";
import { redirect } from "next/navigation";
import { Profile } from "@/lib/types/profile";
import { ProfileProvider } from "@/components/ProfileProvider";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile: Profile = await getProfile();
  if (!profile.username) {
    redirect("/get-started");
  }
  return (
    <ProfileProvider profileProp={profile}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <main className=" h-[98.2vh] not-md:h-screen relative overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProfileProvider>
  );
}
