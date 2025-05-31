import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <FileX className="w-16 h-16 mb-6 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">Review Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-6">
          Review yang Kamu cari tidak ditemukan atau Kamu tidak memiliki izin
          untuk melihatnya.
        </p>
        <Link href="/dashboard">
          <Button>Kembali ke Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
