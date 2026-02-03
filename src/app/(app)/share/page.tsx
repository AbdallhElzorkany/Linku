import { Metadata } from "next";
import {getProfile} from "@/lib/helpers/getProfile";
export const metadata: Metadata = {
  title: "Share",
  description: "Share your Linku",
};

export default async function Share() {
  const profile = await getProfile();
  return (
    <main>
      <h1>Share {profile.username}</h1>
    </main>
  );
}
