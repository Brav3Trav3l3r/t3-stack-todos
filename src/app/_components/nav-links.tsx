"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Global">
      <ul className="flex items-center gap-6 font-medium">
        <li>
          <Link
            className={`${
              pathname === "/" ? "text-primary" : "text-card-foreground"
            }  transition hover:opacity-95`}
            href="/"
          >
            {" "}
            Home{" "}
          </Link>
        </li>
        {/* <li>
          <Link
            className={`${
              pathname === "/movies" ? "text-primary" : "text-card-foreground"
            }  transition hover:opacity-95`}
            href="#"
          >
            {" "}
            Movies{" "}
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathname === "/anime" ? "text-primary" : "text-card-foreground"
            }  transition hover:opacity-95`}
            href="#"
          >
            {" "}
            Anime{" "}
          </Link>
        </li> */}
        <li>
          <Link
            className={`${
              pathname === "/library" ? "text-primary" : "text-card-foreground"
            }  transition hover:opacity-95`}
            href="/library"
          >
            {" "}
            Library{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
