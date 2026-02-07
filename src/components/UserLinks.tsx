"use client";
import { type Link as LinkType } from "@/lib/types/link";
import { Link as LinkComponent } from "./Link";
import { useState } from "react";

export default function UserLinks({
  linksArray,
  id,
}: {
  linksArray: LinkType[];
  id: string;
}) {
  const [links, setLinks] = useState(linksArray);
  return (
    <div className="flex flex-col gap-5 mt-10">
      {links?.map((link: LinkType) => (
        <LinkComponent
          link={link}
          links={links}
          setLinks={setLinks}
          id={id}
          key={link.id}
        />
      ))}
    </div>
  );
}
