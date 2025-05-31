"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

interface ReviewAnalysisProps {
  analysis: string;
}

interface Section {
  title: string;
  content: string[];
}

function parseAnalysis(text: string) {
  const sections: Section[] = [];
  let currentSection: Section | null = null;

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
    const sectionMatch = line.match(
      /\[([^\]]+)\]|^(Format dan Tata Letak|Kualitas Konten|Cara Penyampaian|Saran Perbaikan|Kesimpulan)/
    );
    if (sectionMatch) {
      const title = (sectionMatch[1] || sectionMatch[2]).trim();
      if (sectionTitles.includes(title)) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title,
          content: [],
        };
      }
    } else if (currentSection) {
      const cleanLine = line.replace(/^[•\-\*]\s*/, "").trim();
      if (cleanLine) {
        currentSection.content.push(`• ${cleanLine}`);
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

export function ReviewAnalysis({ analysis }: ReviewAnalysisProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sections = useMemo(() => parseAnalysis(analysis), [analysis]);

  if (sections.length === 0) {
    return (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap">{analysis}</div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 flex-wrap mb-4 px-2 sm:px-4">
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

      <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {sections[currentSectionIndex]?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert pt-2 pb-4">
          {sections[currentSectionIndex]?.content.map((line, index) => {
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

        <div className="flex items-center justify-center gap-3 py-4 px-4 border-t border-gray-200 dark:border-gray-800">
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
