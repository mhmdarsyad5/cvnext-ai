"use client";

import { memo } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AnimateInView,
  AnimateStagger,
  AnimateStaggerItem,
} from "@/components/ui/animate-in-view";

const faqItems = [
  {
    question: "Bagaimana cara kerja CVNext?",
    answer:
      "CVNext menggunakan teknologi AI canggih untuk menganalisis CV Kamu. Cukup upload CV Kamu, dan dalam hitungan detik Kamu akan menerima analisis mendalam beserta saran perbaikan yang personal.",
  },
  {
    question: "Format file apa yang didukung?",
    answer:
      "CVNext hanya mendukung file CV dalam format PDF. Pastikan file Kamu dalam format yang benar untuk hasil terbaik.",
  },
  {
    question: "Apakah data CV saya aman?",
    answer:
      "Keamanan data adalah prioritas utama kami. Kami menggunakan enkripsi end-to-end dan tidak pernah membagikan data Kamu dengan pihak ketiga tanpa izin Kamu.",
  },
  {
    question: "Berapa lama proses review berlangsung?",
    answer:
      "Proses review CV biasanya selesai dalam hitungan detik hingga satu menit, tergantung panjang CV. Kamu akan langsung mendapatkan hasil analisis begitu proses selesai.",
  },
  {
    question: "Apakah ada batasan jumlah review?",
    answer:
      "CVNext memberikan Kamu kebebasan untuk melakukan review CV sebanyak yang kamu butuhkan. Setiap review akan memberikan insight baru untuk terus meningkatkan kualitas CV Kamu.",
  },
];

export const FaqSection = memo(function FaqSection() {
  return (
    <section className="relative py-20" id="faq">
      <div className="container px-4 md:px-6 mb-8">
        <AnimateInView>
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Pertanyaan yang Sering <AuroraText>Ditanyakan</AuroraText>
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Temukan jawaban untuk pertanyaan umum tentang CVNext
            </p>
          </div>
        </AnimateInView>

        <div className="mx-auto max-w-3xl">
          <AnimateStagger>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AnimateStaggerItem key={index}>
                  <AccordionItem
                    value={`item-${index}`}
                    className={`bg-transparent backdrop-blur-sm border rounded-lg overflow-hidden ${
                      index === faqItems.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <AccordionTrigger className="px-6 py-4 text-base hover:no-underline bg-transparent">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-muted-foreground bg-transparent">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </AnimateStaggerItem>
              ))}
            </Accordion>
          </AnimateStagger>
        </div>
      </div>
    </section>
  );
});
