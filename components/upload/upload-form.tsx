"use client";

import { useState, useRef } from "react";
import UploadFormInput from "./upload-form-input";
import CVAnalysis from "./cv-analysis";
import { z } from "zod";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import { generatePdfReview } from "@/actions/upload-action";
import { saveReview } from "@/lib/db-utils";
import { AnimateInView, AnimateStagger } from "@/components/ui/animate-in-view";

const schema = z.object({
  file: z
    .instanceof(File, { message: "File harus berupa PDF" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File harus berukuran kurang dari 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File harus berupa PDF",
    }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>("");
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("Terjadi error saat upload file");
    },
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });
  const [uploadResponse, setUploadResponse] = useState<{ name: string } | null>(
    null
  );
  const [reviewData, setReviewData] = useState<{ ownerName?: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validateing the fields
      const validatedFields = schema.safeParse({ file });
      console.log(validatedFields);

      if (!validatedFields.success) {
        console.log(
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "File tidak valid"
        );
        toast.warning("File tidak valid");
        setIsLoading(false);
        return;
      }

      toast.info("Uploading file...");

      //upload the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Gagal mengupload file");
        setIsLoading(false);
        return;
      }

      setUploadResponse(resp[0]);
      toast.info("Tunggu sebentar, AI sedang memproses dokumen Kamu...");

      const review = await generatePdfReview({
        serverData: {
          userId: resp[0].key,
          file: {
            url: resp[0].ufsUrl,
            name: resp[0].name,
          },
        },
      });

      if (!review.success) {
        toast.error(review.message);
        setIsLoading(false);
        return;
      }
      if (review.data?.analysis) {
        // Extract score from analysis text
        const scoreMatch = review.data.analysis.match(/Skor:\s*(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

        // Save to database
        await saveReview({
          fileName: resp[0].name,
          ownerName: review.data.ownerName || null,
          analysisText: review.data.analysis,
          score: score,
        });

        toast.success("Berhasil menganalisis CV!");
        formRef.current?.reset();
        setAnalysis(review.data.analysis);
        setReviewData(review.data);
      }
      setIsLoading(false); // Reset loading state after analysis is complete, whether successful or not
    } catch (error) {
      setIsLoading(false);
      console.error("Terjadi error", error);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <AnimateInView>
        <UploadFormInput
          isLoading={isLoading}
          ref={formRef}
          onSubmit={handleSubmit}
        />
      </AnimateInView>

      {analysis && (
        <AnimateStagger>
          <CVAnalysis
            analysis={analysis}
            filename={uploadResponse?.name}
            ownerName={reviewData?.ownerName}
          />
        </AnimateStagger>
      )}
    </div>
  );
}
