"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

export default function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<resumeValues>({});
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
  const title = "Design your resume";
  return (
    <div className="flex grow flex-col">
      <header className="relative overflow-hidden border-b px-2 py-1 text-center bg-background rounded-sm shadow-sm">
        {/* Abstract Floating Elements for Branding */}
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
          <div className="w-full overflow-y-auto p-3 md:w-1/2 space-y-6">
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
          />
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
