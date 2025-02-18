"use client";

import useWarning from "@/hooks/useUnloadWarning";
import { cn, mapToResumeValues } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "./breadcrumbs";
import Footer from "./Footer";
import ResumePreviewSection from "./ResumePreviewSection";
import { steps } from "./steps";
import useAutoSaveResume from "./AutoSave";
import { ResumeServerData } from "@/lib/types";
import { motion } from "framer-motion";
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
  return (
    <div className="flex grow flex-col">
      <motion.header
        className="relative px-2 py-2 border-b overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 bg-[size:16px_16px]">
          <div className="absolute inset-0 bg-grid-black/[0.03] dark:hidden" />
          <div className="absolute inset-0 hidden dark:block dark:bg-grid-white/[0.05]" />
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-80">
          <div className="absolute inset-0 animate-pulse-slow opacity-40" />
        </div>

        {/* Spotlight effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/15 rounded-full blur-xl opacity-20 dark:opacity-15" />
        </div>

        {/* Animated particles - reduced size */}
        <div className="absolute top-1 right-4 w-2 h-2 rounded-full border border-dashed border-primary/25 animate-spin-slow"></div>
        <div className="absolute bottom-1 left-10 w-1 h-1 bg-primary/25 rounded-sm rotate-45"></div>
        <div className="absolute top-3 left-1/4 w-0.5 h-0.5 bg-accent/35 rounded-full"></div>

        {/* Main content */}
        <div className="relative z-10 space-y-0.5 text-center">
          <motion.div
            className="inline-block mb-0.5"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center px-2 py-0.5 space-x-1 bg-primary/90 backdrop-blur-sm rounded-full text-primary-foreground dark:bg-primary/80">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </motion.svg>
              <span className="text-[10px] font-medium">Resume Builder</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-lg font-semibold relative"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary dark:to-accent/80">
              Design your resume
            </span>
          </motion.h1>

          <motion.p
            className="text-[12px] text-muted-foreground relative mt-0.5 tracking-wide"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Follow the steps below to create your AI-powered resume.
            <br />
            <span className="text-primary font-semibold animate-pulse">
              Progress is saved automatically.
            </span>
          </motion.p>
        </div>
      </motion.header>

      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
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
