import { AuroraText } from "@/components/magicui/aurora-text";
import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative isolate min-h-[calc(100vh-4rem)]">
      <BgGradient />
      <div className="relative z-10">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">
              Tentang <AuroraText>CVNext</AuroraText>
            </h1>
            <p className="text-muted-foreground text-center mb-12">
              Platform AI untuk membantu kamu membuat CV yang lebih baik
            </p>

            <div className="space-y-8">
              <div className="bg-background/50 backdrop-blur-sm p-6 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4">Apa itu CVNext?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  CVNext adalah platform inovatif yang menggabungkan kecerdasan
                  buatan (AI) untuk membantu pencari kerja meningkatkan kualitas
                  CV mereka. Dengan menggunakan teknologi AI terbaru, kami
                  memberikan analisis mendalam dan saran perbaikan yang personal
                  untuk setiap CV yang diunggah.
                </p>
              </div>

              <div className="bg-background/50 backdrop-blur-sm p-6 rounded-lg border">
                <h2 className="text-2xl font-semibold mb-4">
                  Mengapa Memilih CVNext?
                </h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    CVNext hadir dengan misi untuk membantu setiap orang
                    mendapatkan pekerjaan impian mereka melalui CV yang lebih
                    baik. Platform kami menggunakan teknologi AI terbaru untuk
                    memberikan feedback yang akurat dan relevan.
                  </p>
                  <p>
                    Dengan CVNext, Kamu tidak hanya mendapatkan saran perbaikan,
                    tetapi juga pemahaman mendalam tentang bagaimana membuat CV
                    yang efektif dan menarik bagi rekruiter.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/sign-up">Yuk Mulai Tingkatkan CV Kamu</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
