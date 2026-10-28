"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CircleUserRound, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const onSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="bg-background">
      <nav className="mx-auto grid h-14 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 md:h-16 md:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        {/* Mobile menu toggle (left slot below lg) */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-5 whitespace-nowrap lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-cyan-600 decoration-cyan-600 decoration-2 underline underline-offset-4"
                    : "hover:text-cyan-600",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="justify-self-center font-display text-2xl font-semibold text-cyan-600"
        >
          Wanderlast
        </Link>

        <div className="flex items-center justify-end gap-5">
          {isPending ? (
            <Skeleton className="size-8 rounded-full" />
          ) : user ? (
            <Popover>
              <PopoverTrigger className="flex items-center gap-2 rounded-full p-0.5 text-sm font-medium transition-colors outline-none hover:text-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-600/50 sm:pr-3">
                <Avatar>
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={user.image ?? undefined}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden max-w-32 truncate sm:inline">
                  {user.name}
                </span>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-60 gap-1 p-1.5">
                <PopoverHeader className="border-b px-2 pt-1 pb-2">
                  <PopoverTitle className="truncate">{user.name}</PopoverTitle>
                  <PopoverDescription className="truncate text-xs">
                    {user.email}
                  </PopoverDescription>
                </PopoverHeader>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted hover:text-cyan-600"
                >
                  <CircleUserRound className="size-4" />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-destructive transition-colors hover:bg-destructive/10"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "hidden text-sm font-medium hover:text-cyan-600 sm:block",
                  link.href === "/signup" && "text-muted-foreground",
                  isActive(link.href) && "text-cyan-600",
                )}
              >
                {link.label}
              </Link>
            ))
          )}
        </div>
      </nav>

      {open ? (
        <ul className="border-t px-4 py-3 lg:hidden">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-2 text-sm font-medium",
                  isActive(link.href) ? "text-cyan-600" : "hover:text-cyan-600",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Login/Sign Up are hidden in the top bar below sm */}
          {!isPending && !user
            ? authLinks.map((link, i) => (
                <li
                  key={link.label}
                  className={cn("sm:hidden", i === 0 && "mt-2 border-t pt-2")}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-2 text-sm font-medium",
                      isActive(link.href) ? "text-cyan-600" : "hover:text-cyan-600",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      ) : null}
    </header>
  );
}
