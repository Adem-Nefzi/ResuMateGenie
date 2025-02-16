import UseDimensions from "@/hooks/Dimestions";
import { cn } from "@/lib/utils";
import { resumeValues } from "@/lib/validation";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";
interface ResumePreviewProps {
  resumeData: resumeValues;
  className?: string;
}
export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = UseDimensions(containerRef as RefObject<HTMLElement>);
  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}
interface ResumeSectionProps {
  resumeData: resumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { photo, firstName, lastName, jobTitle, city, country, phone, email } =
    resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);
  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);
  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          <p className="font-medium"> {jobTitle} </p>
        </div>
        <p className="text-xs text-gray-800">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {[phone, email].filter(Boolean).join(" • ")}
        </p>
      </div>
    </div>
  );
}
function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;

  if (!summary) return null;

  return (
    <>
      <hr className="border-1" />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold"> Professional Profile </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  );
}
function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences } = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperiencesNotEmpty?.length) return null;

  return (
    <>
      <div className="space-y-3">
        <p className="text-lg font-semibold">Work experience</p>
        {workExperiencesNotEmpty.map((exp, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{exp.position}</span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")} -{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="whitespace-pre-line text-xs">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations } = resumeData;

  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <hr className="border-1" />
      <div className="space-y-3">
        <p className="text-lg font-semibold">Education</p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{edu.degree}</span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <hr className="border-1" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold"> Skills </p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} className="bg-black hover:bg-black text-white ">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
