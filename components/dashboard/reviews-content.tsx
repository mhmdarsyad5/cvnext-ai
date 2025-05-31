"use client";

import { CVReview } from "@/lib/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";
import ReviewCard from "@/components/dashboard/review-card";
import { SortButtons } from "@/components/dashboard/sort-buttons";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Pagination } from "@/components/common/pagination";

interface ReviewsContentProps {
  reviews: CVReview[];
}

const ITEMS_PER_PAGE = 6;

export function ReviewsContent({ reviews }: ReviewsContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;

  const sortedReviews = [...reviews].sort((a, b) => {
    const aDate = new Date(a.created_at).getTime();
    const bDate = new Date(b.created_at).getTime();

    switch (sort) {
      case "score-asc":
        return a.score === b.score ? bDate - aDate : a.score - b.score;
      case "score-desc":
        return a.score === b.score ? bDate - aDate : b.score - a.score;
      case "date-asc":
        return aDate - bDate;
      case "date-desc":
      default:
        return bDate - aDate;
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedReviews.length / ITEMS_PER_PAGE)
  );
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = sortedReviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  console.log({
    totalItems: reviews.length,
    totalPages,
    currentPage: page,
    itemsPerPage: ITEMS_PER_PAGE,
    visibleItems: paginatedReviews.length,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    if (sort) {
      params.set("sort", sort);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="container mx-auto px-4 sm:px-8 lg:px-16 py-8 min-h-[calc(100vh-6rem)]">
      <div className="relative">
        <BgGradient />
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Hasil <AuroraText>Review CV</AuroraText> Kamu
          </h1>
          <p className="text-muted-foreground mt-2">
            Lihat dan kelola hasil review CV kamu
          </p>
        </div>
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-background/50 backdrop-blur-sm rounded-lg border shadow-sm">
            <h3 className="text-xl font-semibold mb-2">
              Belum ada hasil review disini
            </h3>
            <p className="text-muted-foreground">
              Upload CV kamu di halaman upload CV untuk mendapatkan hasil review
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <SortButtons />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
}
