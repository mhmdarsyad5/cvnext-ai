"use client";

import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

export default function StackedCircularFooter() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <Link
            href="/"
            className="relative z-20 flex items-center gap-2 px-2 py-1 text-sm font-normal mb-4"
          >
            {" "}
            <FileSpreadsheet className="w-6 h-6 text-gray-900 dark:text-gray-100 group-hover:text-blue-500 group-hover:rotate-12 transition-all duration-300 ease-out" />
            <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-300">
              CVNext
            </span>
          </Link>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-primary">
              Home
            </a>
            <a href="#demo" className="hover:text-primary">
              Tutorial
            </a>
            <a href="#faq" className="hover:text-primary">
              FAQ
            </a>
            <a href="about" className="hover:text-primary">
              About
            </a>
          </nav>
          <div className="mb-8 flex space-x-4">
            <a
              href="https://github.com/mhmdarsyad5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </a>
            <a
              href="https://instagram.com/mhmdarsyd_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </a>
            <a
              href="https://linkedin.com/in/mhmdarsyad"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 CVNext. Made with ❤️ by{" "}
              <a href="https://github.com/mhmdarsyad5">@mhmdarsyad</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
