import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/types/profile";
import { Link2 } from "lucide-react";
import NotFound from "@/app/not-found";
import type { Metadata } from "next";
import UserLinks from "@/components/UserLinks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  return {
    title: username.substring(3),
    description: `View ${username.substring(3)}'s profile on linku`,
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const [{ username }, supabase] = await Promise.all([params, createClient()]);
  if (!(username.startsWith("%40") && username.length > 3)) {
    return <NotFound />;
  }
  const { error, data } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.substring(3))
    .single();
  if (error) {
    return <NotFound />;
  }
  const userData: Profile = data;
  await supabase
    .from("profiles")
    .update({ views: userData.views + 1 })
    .eq("id", userData.id);
  return (
    <div className=" not-md:mt-6 not-sm:w-11/12 sm:w-9/12 lg:w-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute ">
      <Link href="/" className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 bg-linear-to-br from-neutral-600 to-neutral-800 rounded-xl flex items-center justify-center shadow-lg shadow-neutral-500/20">
          <Link2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-3xl bg-linear-to-r from-neutral-600 to-neutral-800 bg-clip-text text-transparent">
          linku
        </span>
      </Link>

      {/* Profile Card */}
      <div>
        <div className="p-10 not-md:p-5  bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white">
          {/* Avatar */}

          <div className="text-center mb-8">
            <Image
              src={userData.avatar_url || "/pic.jpg"}
              width={100}
              height={100}
              className="rounded-full size-32 border-2 border-neutral-800 mx-auto mb-2"
              alt={userData.display_name}
            />
            <h1 className="text-4xl mb-3">{userData.display_name}</h1>
            <p className="text-neutral-600 mb-2">@{userData.username}</p>
            {userData.bio && (
              <p className="text-gray-700 text-lg">{userData.bio}</p>
            )}
          </div>

          {/* Links */}
          {userData?.links && (
            <UserLinks linksArray={userData.links} id={userData.id} />
          )}
        </div>
      </div>
      {userData.plan === "free" && (
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4 text-lg">Create your own linku</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-neutral-600 to-neutral-800 text-white rounded-2xl hover:shadow-xl hover:shadow-neutral-500/30 transition-all hover:scale-105 shadow-lg"
          >
            <Link2 className="w-5 h-5" />
            <span>Get Started Free</span>
          </Link>
        </div>
      )}
    </div>
  );
}
