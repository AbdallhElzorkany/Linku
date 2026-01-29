import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/types/profile";
export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();
  const profile: Profile = data;
  return profile;
}
