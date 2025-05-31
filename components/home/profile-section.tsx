"use client";

import { memo } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import { AnimateInView } from "@/components/ui/animate-in-view";

export const ProfileSection = memo(function ProfileSection() {
  return (
    <section className="relative py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl">
          <AnimateInView>
            <Card className="max-w-2xl w-full mx-auto py-4 px-0">
              <div className="flex flex-col">
                <div className="flex items-center justify-between px-6 pt-2 pb-0">
                  <div className="flex gap-4 items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 shadow-md">
                      <Image
                        src="/arsyad.png"
                        alt="mhmdarsyad5"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 items-start justify-center">
                      <h4 className="text-base font-semibold leading-none text-primary">
                        mhmdarsyad5
                      </h4>
                      <h5 className="text-xs tracking-tight text-muted-foreground">
                        @mhmdarsyad5
                      </h5>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4 py-1 text-xs"
                  >
                    <a
                      href="https://github.com/mhmdarsyad5"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Follow
                    </a>
                  </Button>
                </div>
                <div className="px-6 py-2 text-sm text-muted-foreground">
                  <p>
                    Fullstack developer, Graphic Designer, and UI/UX enthusiast.
                    Yuk gabung ke perjalanan coding aku!
                  </p>
                  <span className="pt-1 block text-xs">
                    #FullstackWithArsyad
                    <span aria-label="computer" className="pl-1" role="img">
                      💻
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center px-6 pb-2 pt-1 gap-4">
                  <div className="flex gap-1">
                    <p className="font-semibold text-muted-foreground text-xs">
                      1K
                    </p>
                    <p className="text-muted-foreground text-xs">Following</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-muted-foreground text-xs">
                      1K
                    </p>
                    <p className="text-muted-foreground text-xs">Followers</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-7 w-7"
                    >
                      <a
                        href="https://github.com/mhmdarsyad5"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-7 w-7"
                    >
                      <a
                        href="https://linkedin.com/in/mhmdarsyad"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
});
