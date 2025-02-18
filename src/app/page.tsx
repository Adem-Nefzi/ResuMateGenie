"use client";

import { useTheme } from "next-themes";
import Navbar2 from "@/components/Navbar2";
import logo from "@/assets/logo.png";
import resumePreview from "@/assets/resumePreview.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure theme is loaded on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar2 />
      <main
        className={`relative flex min-h-screen flex-col items-center justify-center gap-6 px-5 py-12 text-center md:flex-row md:text-start lg:gap-12 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Grid background (full page, behind content but not Navbar) */}
        <div className="absolute inset-0 z-0 bg-[size:20px_20px]">
          {/* Light mode: Subtle grid */}
          <div className="absolute inset-0 bg-grid-black/[0.04] dark:hidden" />

          {/* Dark mode: More visible grid */}
          <div className="absolute inset-0 hidden dark:block dark:bg-grid-white/[0.06]" />
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
          <div className="absolute inset-0 animate-pulse-slow opacity-50" />
        </div>

        {/* Left side: Text and CTA */}
        <motion.div
          className="relative z-10 max-w-prose space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="mx-auto md:ms-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </motion.div>
          <motion.h1
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Create the{" "}
            <span className="inline-block bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Perfect Resume
            </span>{" "}
            in Minutes
          </motion.h1>
          <motion.p
            className="text-lg text-gray-500 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Our{" "}
            <span className="font-bold text-blue-500 dark:text-cyan-400">
              AI resume builder
            </span>{" "}
            helps you design a professional resume, even if you&apos;re not very
            smart.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/resumes">Get started</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right side: Resume preview image */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="relative group">
            <Image
              src={resumePreview}
              alt="Resume preview"
              width={600}
              className="rounded-xl shadow-2xl lg:rotate-[1.5deg] transform transition-all duration-500 hover:rotate-0 hover:scale-105"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500" />
            {/* Subtle border animation */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500" />
          </div>
        </motion.div>
      </main>
    </>
  );
}
