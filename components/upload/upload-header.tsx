import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function UploadHeader() {
  return (
    <section>
      <div className="relative mx-auto flex flex-col z-0 items-center justify-center py-10 sm:py-12 lg:pb-12 transition-all animate-in fade-in slide-in-from-bottom-5 lg:px-12 max-w-7xl">
        <button className="group relative grid overflow-hidden rounded-full px-4 py-1 border border-neutral-300 dark:border-neutral-700 bg-transparent shadow-none transition-colors duration-200">
          <span>
            <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          </span>
          <span className="backdrop absolute inset-[1px] rounded-full bg-transparent transition-colors duration-200 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800" />
          <span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-primary/10 blur-md"></span>
          <span className="z-10 flex items-center justify-center gap-1 py-0.5 text-neutral-900 dark:text-neutral-100 text-sm">
            ✨ Powered by{" "}
            <span className="font-medium bg-gradient-to-r from-[#00C6FB] via-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">
              Gemini AI
            </span>
          </span>
          <BorderBeam
            size={40}
            initialOffset={20}
            className="from-transparent via-blue-500 to-transparent"
            duration={9}
          />
        </button>
        <h1 className="font-bold py-6 text-center">
          Mulai <AuroraText>Upload CV</AuroraText> <br />
          Kamu Disini!
        </h1>
        <h2 className="font-normal text-sm sm:text-md lg:text-sm text-center px-4 lg:px-0 lg:max-w-xl text-gray-600">
          Yuk upload CV kamu untuk mendapatkan review dari AI kami. Kami akan
          memberikan saran dan rekomendasi untuk meningkatkan kualitas CV kamu
          agar lebih profesional.
        </h2>
      </div>
    </section>
  );
}
