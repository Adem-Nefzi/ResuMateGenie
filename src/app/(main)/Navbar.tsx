"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "@/components/ThemeTgl";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
export default function Navbar() {
  const { theme } = useTheme();
  return (
    <header className="shadow-sm bg-gray-100 dark:bg-secondary">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight animate-pulse bg-gradient-to-r from-sky-500 to-blue-700 bg-clip-text text-transparent">
            ResuMateGenie
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-primary to-accent blur-[40px] opacity-70 dark:opacity-40"></div>
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Payement"
                labelIcon={<CreditCard className="size-4" />}
                href="/payement"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
