"use client";
import Image from "next/image";
import { Link } from "@/components/Link";
import { useProfile } from "@/components/ProfileProvider";

export default function Preview() {
  const { profile: userData } = useProfile();
  return (
    <div className=" not-md:mt-6 not-sm:w-11/12 sm:w-9/12 lg:w-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute  ">
      {/* Profile Card */}
      <div>
        <div className="p-10 not-md:p-5  bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white">
          {/* Avatar */}
          <div className="text-center mb-8">
            <Image
              src={userData.avatar_url || "/pic.jpg"}
              width={100}
              height={100}
              className="rounded-full aspect-square object-cover size-32 border-2 border-neutral-800 mx-auto mb-2"
              alt={userData.display_name}
            />
            <h1 className="text-4xl mb-3">{userData.display_name}</h1>
            <p className="text-neutral-600 mb-2">@{userData.username}</p>
            {userData.bio && (
              <p className="text-gray-700 text-lg">{userData.bio}</p>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-col gap-5 mt-10">
            {userData.links?.map((link, index) => (
              <Link link={link} profile={userData} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
