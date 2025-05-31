import { cn } from "@/lib/utils";

export default function BgGradient({ className }: { className?: string }) {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* Grid Pattern - Light/Dark Mode Aware */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,#1f1f1f_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-[size:40px_40px] opacity-[0.15] dark:opacity-[0.08]" />

      {/* Gradient Overlay - Light Mode */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 via-slate-50/25 to-white/0 z-10 dark:hidden" />

      {/* Gradient Overlay - Dark Mode */}
      <div className="absolute inset-0 hidden dark:block bg-neutral-900 to-transparent opacity-50 z-10" />

      {/* Accent Gradient Blob */}
      <div className="absolute right-1/4 -top-48 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className={cn(
            "aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-blue-100 via-blue-500 to-[#0A0A0A] opacity-20 dark:opacity-30",
            className
          )}
        />
      </div>
    </div>
  );
}
