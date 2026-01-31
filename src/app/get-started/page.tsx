import GetStarted from "@/components/getStarted";
import { getProfile } from "@/lib/helpers/getProfile";
import { redirect } from "next/navigation";
export default async function GetStartedPage() {
  const user = await getProfile();
  if (user.username) {
    redirect("/dashboard");
  }

  return <GetStarted id={user?.id} />;
}
