import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { resumeValues } from "@/lib/validation";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: resumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);

      // Convert ContentChunk[] to string if needed
      const summary = Array.isArray(aiResponse)
        ? aiResponse.map((chunk) => chunk.toString()).join(" ") // Ensure `chunk.toString()` is valid
        : aiResponse;

      onSummaryGenerated(summary);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
    >
      <WandSparkles className="size-4" />
      Generate (AI)
    </LoadingButton>
  );
}
