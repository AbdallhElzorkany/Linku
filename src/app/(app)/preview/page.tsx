"use client";
import Image from "next/image";
import { useProfile } from "@/components/ProfileProvider";
import { ExternalLink } from "lucide-react";

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
              src={userData.avatar_url ? userData.avatar_url : "/pic.jpg"}
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
              <a
                key={index}
                className="relative"
                target="_blank"
                href={
                  link.url.startsWith("http") ? link.url : `https://${link.url}`
                }
              >
                <div className="absolute inset-0 bg-linear-to-r from-neutral-500 to-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl blur-xl" />
                <div className="relative w-full p-5 bg-white hover:bg-linear-to-r hover:from-neutral-50 hover:to-gray-50 rounded-2xl transition-all border-2 border-gray-200 hover:border-neutral-300 flex items-center justify-between shadow-md hover:shadow-xl hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-900 group-hover:text-neutral-700 transition-colors">
                      {link.title}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-neutral-600 transition-all group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
