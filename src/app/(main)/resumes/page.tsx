"use client";
import { Button } from "@/components/ui/button";
import { PlusSquare, FileText, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { useEffect } from "react";

export default function ResumePage() {
  useEffect(() => {
    document.documentElement.classList.add("overflow-x-hidden");
    document.body.classList.add("overflow-x-hidden");
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-background">
      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.05] dark:hidden" />
        <div className="absolute inset-0 hidden dark:block dark:bg-grid-white/[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Main Content */}
      <Spotlight />
      <main className="relative max-w-[100vw] mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-3 text-center">
            <h1
              className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent 
     bg-gradient-to-r from-primary via-[#ff8a00] to-accent 
     dark:from-primary dark:via-[#ff4d4d] dark:to-secondary 
     drop-shadow-md"
            >
              Your AI-Powered Resume Hub !
            </h1>

            <p className="text-lg text-muted-foreground font-medium opacity-90">
              Design and manage standout resumes effortlessly.
            </p>
          </div>

          <Button
            asChild
            className="w-full md:w-auto gap-2 bg-primary/90 hover:bg-primary transition-all duration-300"
            size="lg"
          >
            <Link href="/editor">
              <PlusSquare className="size-4" />
              Create New Resume
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <div className="flex items-center h-10 rounded-lg border bg-background/95 backdrop-blur px-3 text-muted-foreground">
            <Search className="size-4 mr-2" />
            <input
              type="text"
              placeholder="Search resumes..."
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        {/* Resume Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <Link
                href={`/editor/${i}`}
                className="block p-6 rounded-xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <FileText className="size-5 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    Last edited 2 days ago
                  </span>
                </div>
                <h3 className="font-semibold mb-2">Software Engineer Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored for tech companies with focus on full-stack
                  development
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {false && (
          <div className="text-center py-20">
            <FileText className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first resume to get started
            </p>
            <Button asChild>
              <Link href="/editor">Create Resume</Link>
            </Button>
          </div>
        )}
      </main>

      {/* Decorative Blur Elements */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/2 -translate-x-1/2 w-1/3 h-1/3 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />
    </div>
  );
}
