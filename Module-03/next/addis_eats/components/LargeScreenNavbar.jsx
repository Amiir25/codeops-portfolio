"use client";

import Button from "./ui/Button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// Public nav links
const publicLinks = [
  { id: 1, text: "Home", to: "/" },
  { id: 2, text: "Menu", to: "/menu" },
];

// Protected nav links
const protectedLinks = [
  { id: 3, text: "Cart", to: "/cart" },
  { id: 4, text: "Checkout", to: "/checkout" },
];

const LargeScreenNavbar = () => {
  const isAuthenticated = false;
  const router = useRouter();

  return (
    <nav className="hidden md:flex items-center gap-2">
      <div className="flex items-center justify-center gap-5">
        {/* Public Links */}
        {publicLinks.map((link) => {
          const { id, text, to } = link;
          const pathname = usePathname();
          const isActive = pathname === link.to;

          return (
            <Link
              key={id}
              href={to}
              className={`${isActive} ? "text-brand font-black underline" : "" `}
            >
              {text}
            </Link>
          );
        })}

        {/* Protected Links */}
        {isAuthenticated &&
          protectedLinks.map((link) => {
            const { id, text, to } = link;
            const pathname = usePathname();
            const isActive = pathname === link.to;

            return (
              <Link
                key={id}
                href={to}
                className={`${isActive} ? "text-brand font-black underline" : "" `}
              >
                {text}
              </Link>
            );
          })}
      </div>

      {/* Login & Register button */}
      {!isAuthenticated && (
        <div className="flex items-center justify-center">
          <Button onClick={() => router.push("/login")} color="white">
            Login
          </Button>
          <Button onClick={() => router.push("/register")} color="light-red">
            Register
          </Button>
        </div>
      )}
    </nav>
  );
};

export default LargeScreenNavbar;
