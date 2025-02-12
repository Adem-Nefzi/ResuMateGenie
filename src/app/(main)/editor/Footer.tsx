import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

export default function Footer({ currentStep, setCurrentStep }: FooterProps) {
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
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="absolute inset-0 animate-pulse-slow opacity-50">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        </div>
      </div>

      {/* Main content */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <motion.p
                className="text-sm text-muted-foreground opacity-0"
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
