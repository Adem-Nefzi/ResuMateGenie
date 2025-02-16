import { Prisma } from "@prisma/client";
import { resumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;
