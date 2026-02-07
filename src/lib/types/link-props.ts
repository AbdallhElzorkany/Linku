import { Dispatch, SetStateAction } from "react";
import { Link } from "../types/link";

export type LinkProps = {
  link: Link;
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
  id: string;
}