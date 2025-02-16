import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import {
  ChevronLeft,
  ChevronRight,
  FileUserIcon,
  PenLineIcon,
} from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.footer
      className="relative w-full border-t overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="secondary"
                onClick={
                  previousStep ? () => setCurrentStep(previousStep) : undefined
                }
                disabled={!previousStep}
                className="group relative overflow-hidden bg-secondary/80 backdrop-blur-sm border border-primary/10"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </motion.div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
                disabled={!nextStep}
                className="group relative overflow-hidden bg-primary/90 backdrop-blur-sm"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="default"
              size="icon"
              onClick={() => setShowSmResumePreview(!showSmResumePreview)}
              className="md:hidden"
              title={
                showSmResumePreview ? "Show input form" : "Show resume Preview"
              }
            >
              {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
            </Button>
          </motion.div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="secondary"
                asChild
                className="group relative overflow-hidden bg-secondary/80 backdrop-blur-sm border border-primary/10"
              >
                <Link href="/resumes">
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span>Close</span>
                  </motion.div>
                </Link>
              </Button>
            </motion.div>

            {/* Animated saving indicator */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-1"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-2 w-2 rounded-full bg-primary/50" />
                </motion.div>
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              {isSaving && (
                <motion.p
                  className="text-sm text-muted-foreground opacity-100"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Auto-saving...
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </motion.footer>
  );
}
