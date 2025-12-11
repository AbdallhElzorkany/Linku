import Link from "next/link";
import { Link2 } from "lucide-react";

export function Header() {

  return (
    <header>
      <Link href={"/"} className="">
        <Link2 className="" /> <span className="">Linku</span>
      </Link>
      <nav className="">
        <Link href={"/login"} className="">
          Login
        </Link>
        <Link href={"/register"} className="">
          Get Started
        </Link>
      </nav>
    </header>
  );
}
