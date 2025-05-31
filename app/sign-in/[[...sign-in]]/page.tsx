import { SignIn } from "@clerk/nextjs";
import BgGradient from "@/components/common/bg-gradient";

export default function Page() {
  return (
    <section className="relative flex justify-center items-center lg:min-h-[40vh]">
      <BgGradient className="from-blue-400 via-blue-300 to-orange-200" />
      <div className="relative py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <SignIn signUpUrl="/sign-up" />
      </div>
    </section>
  );
}
