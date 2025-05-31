import HeroSection from "@/components/home/hero-section";
import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/home/demo-section";
import { FaqSection } from "@/components/home/faq-section";
import { ProfileSection } from "@/components/home/profile-section";

export default function Home() {
  return (
    <div className="relative isolate">
      <BgGradient />
      <div className="relative z-10">
        <HeroSection />
        <DemoSection />
        <FaqSection />
        <ProfileSection />
      </div>
    </div>
  );
}
