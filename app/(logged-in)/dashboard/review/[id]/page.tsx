import { notFound } from "next/navigation";
import Link from "next/link";
import { getReviewById } from "@/lib/db-utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReviewAnalysis } from "@/components/dashboard/review-analysis";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReviewPage({ params }: PageProps) {
  const { id } = await params;
  const reviewId = parseInt(id);

  if (isNaN(reviewId)) {
    notFound();
  }

  const review = await getReviewById(reviewId);

  if (!review) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
        <Card>
          {" "}
          <CardHeader className="px-6 sm:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {review.owner_name || "Unnamed"}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {review.file_name || "No filename"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(review.created_at)}
                  </div>
                  <Badge
                    variant={
                      review.score >= 80
                        ? "default"
                        : review.score >= 60
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    Skor CV: {review.score}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ReviewAnalysis analysis={review.analysis_text} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
