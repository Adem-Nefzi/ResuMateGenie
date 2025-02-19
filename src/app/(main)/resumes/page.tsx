import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import ResumeItem from "./ResumeItem";
import { Spotlight } from "@/components/ui/Spotlight";

export const metadata: Metadata = {
  title: "Your resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  // TODO: Check quota for non-premium users

  return (
    <main className="min-h-screen w-full overflow-hidden relative bg-background ">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.05] dark:hidden" />
        <div className="absolute inset-0 hidden dark:block dark:bg-grid-white/[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <Spotlight />
      <div className="relative max-w-[100vw] mx-auto px-6 py-12">
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
          <Spotlight />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Your Resumes
            <hr />
          </h1>
          <p className="text-md text-muted-foreground font-medium opacity-80 mt-2">
            Your total of created Resumes :{" "}
            <span className="text-primary">{totalCount}</span>
          </p>
        </div>
        <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4 mt-7">
          {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </div>
      </div>
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/2 -translate-x-1/2 w-1/3 h-1/3 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />
    </main>
  );
}
