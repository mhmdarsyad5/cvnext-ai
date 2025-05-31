import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-05-20",
});

export async function generatePdfReviewFromGemini(cvText: string) {
  try {
    // Step 1: Ekstrak Nama
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

    // Step 2: Prompt Analisis (VERSI KUAT & FINAL)
    const prompt = `Anda adalah penilai CV profesional senior dengan pengalaman lebih dari 10 tahun di bidang HR, rekrutmen, dan pengembangan karier di Indonesia. Tugas Anda adalah menilai CV dengan format yang *Wajib Diikuti Secara Ketat*. Semua bagian yang diminta harus muncul dalam urutan dan format yang tepat, **tanpa terkecuali**.

🔒 PENTING — ATURAN WAJIB:
- Gunakan judul bagian **persis** seperti di bawah ini (dengan tanda kurung [])
- **Jangan ubah atau hilangkan judul bagian**
- Jangan buat bagian tambahan
- Gunakan bullet (•) dengan konsisten
- Jawaban harus langsung ke poin, padat, dan profesional
- Output harus sesuai dalam 1 kali generate. Jangan menunda atau menyimpan evaluasi.
- Jika Anda tidak mengikuti format, hasil akan ditolak.

🎯 STRUKTUR FORMAT YANG WAJIB DIGUNAKAN:

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

📄 Tinjau CV berikut sesuai struktur di atas:

${cvText}

⚠️ Ingat: Format Wajib. Jika Anda tidak mengikuti struktur dengan seksama, hasil dianggap tidak valid.`;

    // Step 3: Generate Sekali Saja
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Step 4: Validasi Format
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
      return {
        success: false,
        error: "Hasil tidak sesuai format yang ditentukan",
        analysis: text,
        ownerName: ownerName === "Unnamed" ? undefined : ownerName,
      };
    }

    const cleanedText = text
      .replace(/\n{3,}/g, "\n\n")
      .replace(/•\s+/g, "• ")
      .trim();

    return {
      success: true,
      analysis: cleanedText,
      ownerName: ownerName === "Unnamed" ? undefined : ownerName,
    };
  } catch (error) {
    console.error("Error analyzing CV:", error);
    return {
      success: false,
      error: "Failed to analyze CV",
    };
  }
}
