"use client";
import { ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { LinkProps } from "@/lib/types/link-props";
export function Link({ link, links, setLinks, id }: LinkProps) {
  useEffect(() => {
    const clicksRequest = async () => {
      try {
        await supabase.from("profiles").update({ links: links }).eq("id", id);
      } catch (error) {
        console.log(error);
      }
    };
    clicksRequest();
  }, [links, id]);

  const handleClick = () => {
    setLinks((prevLinks) =>
      prevLinks?.map((linkObject) =>
        link.id === linkObject.id
          ? { ...linkObject, clicks: linkObject.clicks + 1 }
          : linkObject,
      ),
    );
  };
  return (
    <a
      className="relative"
      target="_blank"
      href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
      onClick={handleClick}
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
  );
}
