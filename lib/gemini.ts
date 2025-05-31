import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-05-20",
});

export async function generatePdfReviewFromGemini(cvText: string) {
  try {
    // First, get the name with clear instruction
    const namePrompt = `As a professional CV reviewer, extract the candidate's full name from this CV.
Rules:
- Return ONLY the full name, with proper capitalization
- Remove any titles (Dr., Mr., Mrs., etc.)
- If no clear name is found, return exactly "Unnamed"
- Do not include any other text or explanation

CV Text:
${cvText}`;

    const nameResult = await geminiModel.generateContent(namePrompt);
    const ownerName = (await nameResult.response.text()).trim();

    // Main analysis with structured scoring criteria
    const prompt = `Bertindaklah sebagai penilai CV profesional senior dengan pengalaman luas di bidang HR dan rekrutmen. Tinjau CV berikut sesuai format terstruktur dan kriteria spesifik di bawah ini.

  ATURAN KRITIS:
  1. Gunakan judul bagian persis seperti yang diberikan dalam [tanda kurung]
  2. Evaluasi setiap poin secara sistematis
  3. Berikan masukan yang spesifik dan dapat ditindaklanjuti
  4. Skor harus dijumlah berdasarkan kriteria poin
  5. Fokus pada standar profesional dan best-practice industri sesuai dengan keadaan indonesia saat ini
  6. CV ATS-friendly sangat direkomendasikan

  [Format dan Tata Letak] (30 poin)
  • Hirarki visual dan keterbacaan (10 poin)
  • Konsistensi format dan spasi (10 poin)
  • Pemilihan font dan tata letak profesional (10 poin)

  [Kualitas Konten] (35 poin)
  • Relevansi dan dampak pengalaman (15 poin)
  • Kesesuaian keterampilan dan kompetensi (10 poin)
  • Evaluasi pencapaian (10 poin)

  [Cara Penyampaian] (35 poin)
  • Penggunaan kata (15 poin)
  • Penggunaan Bahasa yang jelas (20 poin)

  [Saran Perbaikan]
  • Perbaikan spesifik untuk area yang lemah
  • Rekomendasi konten tambahan
  • Saran optimalisasi format
  • Prioritas peningkatan

  [Kesimpulan]
  • Kesan profesional secara keseluruhan
  • 3 kekuatan utama CV
  • 2 area kritis untuk perbaikan
  • Skor Akhir: [Jumlah seluruh poin bagian]
  • Skor: XX/100

  Teks CV untuk DiReview:
  ${cvText}`;

    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      console.log("Gemini raw response:", text);

      if (!text) {
        throw new Error("Empty response from Gemini");
      }

      // Validate format with stricter criteria
      const requiredSections = [
        "[Format dan Tata Letak]",
        "[Kualitas Konten]",
        "[Cara Penyampaian]",
        "[Saran Perbaikan]",
        "[Kesimpulan]",
      ];

      const hasAllSections = requiredSections.every((section) =>
        text.includes(section)
      );
      const hasScore = /Skor:\s*\d+\/100/.test(text);

      if (!hasAllSections || !hasScore) {
        console.log("Response format invalid, retrying with same criteria...");
        return await generatePdfReviewFromGemini(cvText);
      }

      // Clean up any potential inconsistencies in formatting
      const cleanedText = text
        .replace(/\n{3,}/g, "\n\n") // Remove excess newlines
        .replace(/•\s+/g, "• ") // Standardize bullet points
        .trim();

      return {
        success: true,
        analysis: cleanedText,
        ownerName: ownerName === "Unnamed" ? undefined : ownerName,
      };
    } catch (error) {
      console.error("Error in Gemini generation:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error analyzing CV:", error);
    return {
      success: false,
      error: "Failed to analyze CV",
    };
  }
}
