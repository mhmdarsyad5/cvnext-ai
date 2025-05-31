"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedIn),
  { ssr: false }
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignedOut),
  { ssr: false }
);
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.UserButton),
  { ssr: false }
);
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const navItems = [
    { name: "Tutorial", link: "/#demo-section" },
    { name: "Upload CV", link: "/upload" },
    { name: "Hasil Review", link: "/dashboard" },
    { name: "About", link: "/about" },
  ];

  return (
    <motion.div
      ref={ref}
      className={cn(
        "sticky inset-x-0 top-0 z-50 w-full",
        visible ? "pt-0" : "pt-4"
      )}
    >
      <motion.nav
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          width: visible ? "40%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        style={{
          minWidth: "800px",
        }}
        className={cn(
          "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
          visible && "bg-background/80 dark:bg-background/80"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative z-20 flex items-center gap-2 px-2 py-1 text-sm font-normal group"
        >
          <span className="relative w-8 h-8 flex items-center">
            <img
              src="/cvnext-black.png"
              alt="CVNext Logo"
              className="block dark:hidden w-8 h-8 object-contain"
              width={32}
              height={32}
            />
            <img
              src="/cvnext-white.png"
              alt="CVNext Logo"
              className="hidden dark:block w-8 h-8 object-contain"
              width={32}
              height={32}
            />
          </span>
          <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            CVNext
          </span>
        </Link>

        {/* Nav Items */}
        <div className="absolute inset-0 flex flex-1 items-center justify-center space-x-4">
          <Link
            href="/#demo-section"
            className="relative px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors"
          >
            Tutorial
          </Link>
          <SignedIn>
            <Link
              href="/upload"
              className="relative px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors"
            >
              Upload CV
            </Link>
            <Link
              href="/dashboard"
              className="relative px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors"
            >
              Hasil Review
            </Link>
          </SignedIn>
          <Link
            href="/about"
            className="relative px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-500 transition-colors"
          >
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className="relative z-20 flex items-center gap-4">
          {" "}
          <ThemeToggle />
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-8 h-8 ring-2 ring-blue-100 hover:ring-blue-500 transition-all duration-300",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-up"
              className="relative px-4 py-2 text-sm font-medium border border-transparent rounded-full text-black dark:text-white bg-transparent hover:text-blue-500 transition-colors"
            >
              Daftar
            </Link>
            <Link
              href="/sign-in"
              className="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-full hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </SignedOut>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <motion.nav
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05)"
            : "none",
          width: visible ? "90%" : "100%",
          y: visible ? 20 : 0,
        }}
        className={cn(
          "relative z-50 mx-auto flex lg:hidden w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-4 py-2 rounded-full",
          visible && "bg-background/80 dark:bg-background/80"
        )}
      >
        <div className="flex w-full items-center justify-between">
          {" "}
          <Link
            href="/"
            className="relative z-20 flex items-center gap-2 px-2 py-1 text-sm font-normal group"
          >
            <span className="relative w-8 h-8 flex items-center">
              <img
                src="/cvnext-black.png"
                alt="CVNext Logo"
                className="block dark:hidden w-8 h-8 object-contain"
                width={32}
                height={32}
              />
              <img
                src="/cvnext-white.png"
                alt="CVNext Logo"
                className="hidden dark:block w-8 h-8 object-contain"
                width={32}
                height={32}
              />
            </span>
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              CVNext
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 ring-2 ring-blue-100 hover:ring-blue-500 transition-all duration-300",
                  },
                }}
              />
            </SignedIn>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden rounded-md bg-transparent"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 top-16 z-50 w-full flex-col items-center justify-center gap-4 rounded-3xl bg-background p-6 shadow-lg border border-border"
            >
              <div className="flex flex-col gap-4">
                <Link
                  href="/#demo-section"
                  className="text-neutral-600 hover:text-blue-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Tutorial
                </Link>
                <SignedIn>
                  <Link
                    href="/upload"
                    className="text-neutral-600 hover:text-blue-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Upload CV
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-neutral-600 hover:text-blue-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Hasil Review
                  </Link>
                </SignedIn>
                <Link
                  href="/about"
                  className="text-neutral-600 hover:text-blue-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <SignedOut>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-full hover:opacity-90 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Daftar
                  </Link>
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-full hover:opacity-90 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </SignedOut>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
};
