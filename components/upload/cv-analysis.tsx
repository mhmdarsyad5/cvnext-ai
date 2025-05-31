"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface CVAnalysisProps {
  analysis: string;
  filename?: string;
  ownerName?: string;
}

interface Section {
  title: string;
  content: string[];
}

interface ParsedAnalysis {
  documentInfo: {
    score: number;
  };
  sections: Section[];
}

function parseAnalysis(text: string): ParsedAnalysis {
  if (!text) return { documentInfo: { score: 0 }, sections: [] };

  const sections: Section[] = [];
  let currentSection: Section | null = null;
  let score = 0;

  // Define the expected section titles
  const sectionTitles = [
    "Format dan Tata Letak",
    "Kualitas Konten",
    "Cara Penyampaian",
    "Saran Perbaikan",
    "Kesimpulan",
  ];

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    // Extract score from the text
    if (line.toLowerCase().includes("skor:")) {
      const scoreMatch = line.match(/skor:\s*(\d+)/i);
      if (scoreMatch) {
        score = parseInt(scoreMatch[1]);
      }
      continue;
    } // Check for section headers with more flexible matching
    const sectionMatch = line.match(
      /\[([^\]]+)\]|^(Format dan Tata Letak|Kualitas Konten|Cara Penyampaian|Saran Perbaikan|Kesimpulan)/
    );
    if (sectionMatch) {
      const title = (sectionMatch[1] || sectionMatch[2]).trim();
      console.log("Found potential section:", title); // Debug log

      if (sectionTitles.includes(title)) {
        console.log("Matched section title:", title); // Debug log
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title,
          content: [],
        };
      }
    } else if (currentSection) {
      // Process content lines
      const cleanLine = line
        .replace(/^[•\-\*]\s*/, "") // Remove bullet points
        // .replace(/\*\*/g, "") // Remove double asterisks
        .trim();
      if (cleanLine) {
        console.log(
          `Adding content to section "${currentSection.title}":`,
          cleanLine
        ); // Debug log
        currentSection.content.push(`• ${cleanLine}`);
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return {
    documentInfo: { score },
    sections,
  };
}

export default function CVAnalysis({
  analysis,
  filename,
  ownerName,
}: CVAnalysisProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const parsedAnalysis = useMemo(() => {
    if (!analysis) return { documentInfo: { score: 0 }, sections: [] };

    setIsProcessing(true);
    setParseError(null);
    try {
      console.log(
        "Starting analysis parsing with text:",
        analysis.substring(0, 200) + "..."
      ); // Show first 200 chars
      const result = parseAnalysis(analysis);

      console.log("Parsing result:", {
        sectionCount: result.sections.length,
        sections: result.sections.map((s) => s.title),
        score: result.documentInfo.score,
      });

      // Only set error if we truly have no valid sections
      if (result.sections.length === 0) {
        setParseError(
          "Tidak dapat memproses format analisis. Silakan coba lagi."
        );
      }

      return result;
    } catch (error) {
      console.error("Error parsing analysis:", error);
      setParseError("Terjadi kesalahan saat memproses analisis.");
      return { documentInfo: { score: 0 }, sections: [] };
    } finally {
      setIsProcessing(false);
    }
  }, [analysis]);

  useEffect(() => {
    if (analysis) {
      const timeout = setTimeout(() => {
        if (isProcessing) {
          setIsProcessing(false);
          setParseError("Waktu pemrosesan terlalu lama. Silakan coba lagi.");
        }
      }, 10000); // 10 second timeout

      return () => clearTimeout(timeout);
    }
  }, [analysis, isProcessing]);

  const { sections, documentInfo } = parsedAnalysis;

  // Handle loading and error states
  if (!analysis) return null;

  if (isProcessing) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-6">
        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Memproses Analisis CV
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-pulse text-muted-foreground">
                Mohon tunggu sebentar...
              </div>
              <div className="h-2 w-40 bg-muted rounded overflow-hidden">
                <div className="h-full bg-primary animate-progress" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (parseError || sections.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-6">
        <Card className="bg-white/50 backdrop-blur-sm border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-red-500">
              Gagal Memproses
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            {parseError ||
              "Tidak dapat memproses analisis CV. Silakan coba lagi."}
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 mb-8 space-y-6">
      <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Hasil Analisis CV
            </CardTitle>
            <div className="flex items-center gap-2">
              {ownerName && (
                <Badge variant="outline" className="text-sm font-medium">
                  {ownerName}
                </Badge>
              )}
              {filename && (
                <p className="text-sm text-muted-foreground">{filename}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm text-muted-foreground">Skor CV Kamu</span>
            <Badge
              variant={
                documentInfo.score >= 80
                  ? "default"
                  : documentInfo.score >= 60
                  ? "secondary"
                  : "destructive"
              }
              className="text-lg px-4 py-1"
            >
              {documentInfo.score}/100
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
        {sections.map((section, index) => (
          <Badge
            key={index}
            variant={currentSectionIndex === index ? "default" : "outline"}
            className="cursor-pointer px-3 py-1.5 text-sm hover:opacity-80 transition-opacity dark:hover:bg-gray-800"
            onClick={() => setCurrentSectionIndex(index)}
          >
            {section.title}
          </Badge>
        ))}
      </div>

      <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {sections[currentSectionIndex]?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert pt-2 pb-4">
          {sections[currentSectionIndex]?.content.map((line, index) => {
            // Replace *text* and **text** with <b>text</b>
            const formattedLine = line
              .replace(/^•\s*/, "")
              .replace(/\*\*([^\*]+)\*\*/g, "<b>$1</b>")
              .replace(/\*([^\*]+)\*/g, "<b>$1</b>");
            return (
              <div
                key={index}
                className="flex items-start gap-2 mb-2 text-justify leading-relaxed"
              >
                <p
                  className="flex-1 text-gray-800 dark:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: formattedLine }}
                />
              </div>
            );
          })}
        </CardContent>

        <div className="flex items-center justify-center gap-6 py-4 px-4 border-t border-gray-200 dark:border-gray-800">
          <Button
            variant="outline"
            onClick={() => setCurrentSectionIndex((prev) => prev - 1)}
            disabled={currentSectionIndex === 0}
            className="flex items-center gap-2 min-w-[120px] hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </Button>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {currentSectionIndex + 1} dari {sections.length}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentSectionIndex((prev) => prev + 1)}
            disabled={currentSectionIndex === sections.length - 1}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
