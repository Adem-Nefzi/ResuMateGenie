import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import {
  ChevronLeft,
  ChevronRight,
  FileUserIcon,
  PenLineIcon,
} from "lucide-react";
import { useState } from "react";
import { Spotlight } from "@/components/ui/Spotlight";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
  isSaving: boolean;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
  isSaving,
}: FooterProps) {
  const [hovered, setHovered] = useState(false);

  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="relative w-full border-t overflow-hidden">
      {/* Grid background - applied earlier */}
      <div className="absolute inset-0 bg-[size:20px_20px]">
        {/* Light mode: Subtle grid */}
        <div className="absolute inset-0 bg-grid-black/[0.04] dark:hidden" />

        {/* Dark mode: More visible grid */}
        <div className="absolute inset-0 hidden dark:block dark:bg-grid-white/[0.06]" />
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="absolute inset-0 animate-pulse-slow opacity-50" />
      </div>

      {/* Main content */}
      <Spotlight />
      <div className="relative mx-auto px-4 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={
                previousStep ? () => setCurrentStep(previousStep) : undefined
              }
              disabled={!previousStep}
              className="group relative overflow-hidden bg-secondary/80 backdrop-blur-sm border border-primary/10 hover:bg-secondary/90 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </div>
            </Button>

            <Button
              onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
              disabled={!nextStep}
              className="group relative overflow-hidden bg-primary/90 backdrop-blur-sm hover:bg-primary/100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Button>
          </div>

          {/* Mobile toggle button */}
          <Button
            variant="default"
            size="icon"
            onClick={() => setShowSmResumePreview(!showSmResumePreview)}
            className="md:hidden hover:bg-primary/90 hover:shadow-md transition-all duration-300"
            title={
              showSmResumePreview ? "Show input form" : "Show resume Preview"
            }
          >
            {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
          </Button>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              asChild
              className="group relative overflow-hidden bg-secondary/80 backdrop-blur-sm border border-primary/10 hover:bg-secondary/90 hover:shadow-md transition-all duration-300"
            >
              <Link href="/resumes">
                <div className="flex items-center gap-2">
                  <span>Close</span>
                </div>
              </Link>
            </Button>

            {/* Saving indicator */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute -inset-1">
                  <div className="h-2 w-2 rounded-full bg-primary/50" />
                </div>
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              {isSaving && (
                <p className="text-sm text-muted-foreground opacity-100">
                  Auto-saving...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-primary" />
      </div>
    </footer>
  );
}
