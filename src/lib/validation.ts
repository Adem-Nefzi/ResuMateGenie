import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "The File Must be an Image !"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "The Imported File Must be less than 4MB"
    ),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  country: optionalString,
  city: optionalString,
  email: optionalString,
  phone: optionalString,
});
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        position: optionalString,
        company: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
    )
    .optional(),
});

export type workExperienceValues = z.infer<typeof workExperienceSchema>;

export const educationSchema = z.object({
  educations: z
    .array(
      z.object({
        degree: optionalString,
        school: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      })
    )
    .optional(),
});
export type EducationValues = z.infer<typeof educationSchema>;
export const SkillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});
export const summarySchema = z.object({
  summary: optionalString,
});

export type SkillsValues = z.infer<typeof SkillsSchema>;
export type SummaryValues = z.infer<typeof summarySchema>;
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...SkillsSchema.shape,
  ...summarySchema.shape,
});
export type resumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...SkillsSchema.shape,
});

export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];
export type generateSummaryInput = z.infer<typeof generateSummarySchema>;

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type generateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;
