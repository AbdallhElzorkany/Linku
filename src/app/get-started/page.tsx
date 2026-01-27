import GetStarted from "@/components/getStarted";
import { createClient } from "@/lib/supabase/server";
export default async function GetStartedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <GetStarted id={user?.id} />;
}
