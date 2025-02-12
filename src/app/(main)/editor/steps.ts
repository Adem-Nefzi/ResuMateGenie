import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./form/GeneralinfoForm";
import PersonalInfoForm from "./form/PersonalinfoForm";
import WorkExperienceForm from "./form/WorkExperienceForm";
import EducationForm from "./form/EducationForm";
import SkillsForm from "./form/SkillsForm";
import SummaryForm from "./form/SummaryForm";

export const steps: {
  title: string;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    title: "General informations",
    component: GeneralInfoForm,
    key: "general-informations",
  },
  {
    title: "Personal informations",
    component: PersonalInfoForm,
    key: "personal-informations",
  },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    title: "Education",
    component: EducationForm,
    key: "education",
  },
  {
    title: "Skills",
    component: SkillsForm,
    key: "skill",
  },
  {
    title: "Summary",
    component: SummaryForm,
    key: "summary",
  },
];
