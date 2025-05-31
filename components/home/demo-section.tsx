import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";
import {
  AnimateInView,
  AnimateStagger,
  AnimateStaggerItem,
} from "@/components/ui/animate-in-view";

type Step = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload CV Kamu",
    description: "Upload CV kamu dengan mudah dan cepat",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "Analisis AI",
    description:
      "Analisis AI akan mengevaluasi CV kamu dan memberikan feedback",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Hasil Review",
    description:
      "Hasil review CV kamu akan disajikan dalam bentuk laporan yang mudah dipahami",
  },
];

export default function DemoSection() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden py-16 lg:py-24 scroll-mt-32"
    >
      <div className="container px-4 mx-auto">
        <AnimateInView>
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold uppercase mb-4 text-blue-500">
              How it works
            </h2>
            <h3 className="font-bold text-3xl max-w-2xl mx-auto">
              Review CV kamu dengan AI agar lebih profesional dengan 3 langkah
              mudah
            </h3>
          </div>
        </AnimateInView>

        <AnimateStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <AnimateStaggerItem
              key={idx}
              className="relative flex items-stretch"
            >
              <StepItem {...step} />

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-blue-400"
                  />
                </div>
              )}
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: Step) {
  return (
    <div className="relative bg-white/5 rounded-2xl p-6 backdrop-blur-xs border border-white/10 hover:border-blue-500/5 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent group-hover:from-blue-500/20 transition-colors">
          <div className="text-blue-500">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center font-bold text-xl">{label}</h4>
          <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
