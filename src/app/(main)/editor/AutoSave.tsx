import { useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { resumeValues } from "@/lib/validation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { saveResume } from "./actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveResume(resumeData: resumeValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const debouncedResumeData = useDebounce(resumeData, 2000);

  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSaved, setLastSaved] = useState(
    //This Function create clone of the current page to trigger AutoSave when change is made
    structuredClone(resumeData)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newData,
          ...(JSON.stringify(lastSaved.photo, fileReplacer) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });
        setResumeId(updatedResume.id);
        setLastSaved(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save changes..</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSaved, fileReplacer);
    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSaved,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSaved),
  };
}
