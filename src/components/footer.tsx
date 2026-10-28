import { ArrowUpRight } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 md:px-8">
        <h2 className="font-display text-6xl font-bold tracking-tight md:text-7xl">
          Wanderlast
        </h2>
        <p className="mt-4 text-sm text-white/70">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-sm tracking-wide uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-xs text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="relative mt-4 max-w-xs">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-10 w-full rounded-sm bg-neutral-700 px-3 pr-10 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-white/80 hover:text-white"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-cyan-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm tracking-wide uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-cyan-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <a href="tel:+17869011622" className="hover:text-cyan-500">
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@Wandarland.com"
                  className="hover:text-cyan-500"
                >
                  info@Wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2025 Wanderlust. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href="https://x.com"
              aria-label="X"
              className="text-white/60 hover:text-white"
            >
              <XIcon className="size-4" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-white/60 hover:text-white"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-white/60 hover:text-white"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
