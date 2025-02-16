"use client";
// import GeneralInfoForm from "./form/GeneralinfoForm";
// import PersonalInfoForm from "./form/PersonalinfoForm";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { resumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { TextGenerateEffect } from "@/components/ui/TypingTextEffect";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn, mapToResumeValues } from "@/lib/utils";
import useWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "./AutoSave";
import { ResumeServerData } from "@/lib/types";

interface ResumeEditorProps {
  EditingResume: ResumeServerData | null;
}
export default function ResumeEditor({ EditingResume }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<resumeValues>(
    EditingResume ? mapToResumeValues(EditingResume) : {}
  );

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useWarning(hasUnsavedChanges);

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);

    //Rerender the Page without Reloading :
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  useWarning();
  const title = "Design your resume";
  return (
    <div className="flex grow flex-col">
      <header className="relative overflow-hidden border-b px-2 py-1 text-center bg-background rounded-sm shadow-sm">
        {/* Abstract Floating Elements for Branding */}
        <Spotlight />
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-primary to-accent blur-[40px] opacity-70 dark:opacity-40"></div>
        <div className="relative bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-sm px-2 py-1 shadow-sm border border-white/10 dark:border-white/20">
          <h1 className="text-lg font-semibold relative text-primary dark:text-primary-foreground tracking-wide drop-shadow-md animate-fade-in">
            <TextGenerateEffect duration={2} filter={false} words={title} />
          </h1>

          {/* Subtitle with Animated Underline */}
          <p className="text-[12px] text-muted-foreground relative mt-0.5 tracking-wide">
            Follow the steps below to create your AI-powered resume.
            <br />
            <span className="text-primary font-semibold animate-pulse">
              Progress is saved automatically.
            </span>
          </p>
        </div>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full overflow-y-auto p-3 md:w-1/2 space-y-6 md:block",
              showSmResumePreview && "hidden"
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
