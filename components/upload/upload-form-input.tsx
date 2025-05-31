"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { FileText } from "lucide-react";
import { AnimateStaggerItem } from "@/components/ui/animate-in-view";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export const UploadFormInput = forwardRef<
  HTMLFormElement,
  UploadFormInputProps
>(({ onSubmit, isLoading }, ref) => {
  return (
    <AnimateStaggerItem>
      <Card className="p-6">
        <form
          ref={ref}
          onSubmit={onSubmit}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <FileText className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold">Upload CV Kamu</h3>
            <p className="text-sm text-muted-foreground">
              Format yang didukung: PDF (Maks. 20MB)
            </p>
          </div>

          <Input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            required
            className={cn(
              "w-full max-w-xs cursor-pointer file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-xs"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
              </>
            ) : (
              "Upload CV Kamu"
            )}
          </Button>
        </form>
      </Card>
    </AnimateStaggerItem>
  );
});

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
