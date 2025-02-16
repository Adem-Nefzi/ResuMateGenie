import ResumePreview from "@/components/ResumePreview";
import { cn } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";

interface ResumePreviewSectionProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
  className?: string;
}
export default function ResumePreviewSection({
  resumeData,
  className,
}: ResumePreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
