import { Link } from "./link";

export type Profile = {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string ;
  created_at?: string;
  username: string;
  links?: Link[];
  views?: number;
  plan?: "free" | "premium";
  bio?: string;
};
