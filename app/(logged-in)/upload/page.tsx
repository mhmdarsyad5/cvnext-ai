import BgGradient from "@/components/common/bg-gradient";
import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";

export default function Page() {
  return (
    <section>
      <div className="flex flex-col text-center items-center justify-center gap-3 pb-32">
        <BgGradient />
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
}
