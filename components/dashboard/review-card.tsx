import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { CVReview } from "@/lib/types";
import { deleteReview } from "@/lib/db-utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

interface ReviewCardProps {
  review: CVReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
      toast.success("Review berhasil dihapus");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Gagal menghapus review");
    }
    setOpen(false);
  };

  return (
    <>
      <div className="mb-4">
        <Card className="relative group">
          <Link href={`/dashboard/review/${review.id}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {review.owner_name || "Tanpa Nama"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {review.file_name || "Tidak ada nama file"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2 flex justify-between items-center">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {new Date(review.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Badge
                variant={
                  review.score >= 80
                    ? "default"
                    : review.score >= 60
                    ? "secondary"
                    : "destructive"
                }
                className="ml-2"
              >
                {review.score}/100
              </Badge>
            </CardContent>
          </Link>
          <CardFooter className="absolute top-6 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hapus Review ini?</DialogTitle>
              <DialogDescription>
                Apakah kamu yakin ingin menghapus review ini?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
