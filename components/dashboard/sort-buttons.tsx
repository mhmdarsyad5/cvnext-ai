"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortButton } from "./sort-button";

interface SortButtonsProps {
  initialSort?: string;
}

export function SortButtons({ initialSort }: SortButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = (sort: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === null || sort === "date-desc") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    return params.toString();
  };
  const currentSort = searchParams.get("sort") ?? initialSort;
  const sortOptions = [
    {
      sort: "date-desc",
      label: "Terbaru",
      icon: ArrowDownIcon,
      isActive: !currentSort || currentSort === "date-desc",
    },
    {
      sort: "date-asc",
      label: "Terlama",
      icon: ArrowUpIcon,
      isActive: currentSort === "date-asc",
    },
    {
      sort: "score-desc",
      label: "Skor Tertinggi",
      icon: ArrowUpIcon,
      isActive: currentSort === "score-desc",
    },
    {
      sort: "score-asc",
      label: "Skor Terendah",
      icon: ArrowDownIcon,
      isActive: currentSort === "score-asc",
    },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {sortOptions.map((option) => (
        <SortButton
          key={option.sort}
          label={option.label}
          isActive={option.isActive}
          Icon={option.icon}
          onClick={() => {
            const queryString = createQueryString(option.sort);
            router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
          }}
        />
      ))}
    </div>
  );
}
