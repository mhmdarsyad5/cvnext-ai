import { getUserReviews } from "@/lib/db-utils";
import { ReviewsContent } from "@/components/dashboard/reviews-content";

export default async function Page() {
  const reviews = await getUserReviews();
  return <ReviewsContent reviews={reviews} />;
}
