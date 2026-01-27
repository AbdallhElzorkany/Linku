import {
  User,
  Home,
  Eye,
  Share2,
  Settings,
  Link2,
  Crown,
  Sparkles,
} from "lucide-react";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Logout from "./Logout";
import { getProfile } from "@/lib/helpers/getprofile";
import { Badge } from "./ui/badge";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Preview",
    url: "/preview",
    icon: Eye,
  },
  {
    title: "Share",
    url: "/share",
    icon: Share2,
  },
];

export async function AppSidebar() {
  const profile = await getProfile();
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <Link2 />
                <span>Linku</span>
                <Badge variant="outline">{profile.plan}</Badge>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton size="lg" asChild>
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
          <SidebarSeparator />
          {
            profile.plan ==="free" && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                    <Link href="/premium">
                      <div>
                        <Crown />
                      </div>
                      <div>
                        <p className="text-sm ">Upgrade to Premium</p>
                        <p className="text-xs">Unlock advanced features</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarSeparator />
              </>
            )
          }
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <Avatar>
                  <AvatarImage src={profile.avatar || "pic.jpg"} />
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
