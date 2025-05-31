"use server";

import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePdfReviewFromGemini } from "@/lib/gemini";

export async function generatePdfReview(uploadResponse: any) {
  if (!uploadResponse || !uploadResponse.serverData) {
    return {
      success: false,
      message: "Upload file gagal",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse;

  if (!pdfUrl) {
    return {
      success: false,
      message: "Upload file gagal",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });
    const review = await generatePdfReviewFromGemini(pdfText);

    if (!review.success) {
      return {
        success: false,
        message: "Gagal menghasilkan review CV",
        data: null,
      };
    }

    return {
      success: true,
      message: "Berhasil menganalisis CV",
      data: {
        text: pdfText,
        analysis: review.analysis,
        fileName: fileName,
        ownerName: review.ownerName,
        userId: userId,
      },
    };
  } catch (err) {
    console.error("Error extracting PDF:", err);
    return {
      success: false,
      message: "Gagal mengekstrak PDF",
      data: null,
    };
  }
}
