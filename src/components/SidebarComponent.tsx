import { User, Home, Eye, Share2, Settings, Link2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Logout from "./Logout";
import { getProfile } from "@/lib/helpers/getprofile";
// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Preview",
    url: "/preview",
    icon: Eye,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Share",
    url: "/share",
    icon: Share2,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const profile = await getProfile();
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Link2 />
                <span>Linku</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuItem>
              <SidebarTrigger />
            </SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton size="lg" variant="outline" asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logout />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <Avatar className="size-6">
                  <AvatarImage
                    src={profile.avatar || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {profile.display_name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p>{profile.display_name}</p>
                  <p className="text-xs text-muted-foreground">
                    @{profile.username || "username"}
                  </p>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
