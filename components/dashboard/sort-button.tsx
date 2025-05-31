"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SortButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  Icon: LucideIcon;
}

export function SortButton({
  label,
  isActive,
  onClick,
  Icon,
}: SortButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
    >
      {label} <Icon className="ml-2 h-4 w-4" />
    </Button>
  );
}
