"use server";

import { Mistral } from "@mistralai/mistralai";
import {
  generateSummaryInput,
  generateSummarySchema,
  generateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";

// Initialize Mistral API client
const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) throw new Error("MISTRAL_API_KEY is missing");

const mistral = new Mistral({ apiKey });

export async function generateSummary(input: generateSummaryInput) {
  // TODO: Block for non-premium users

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a **professional introduction summary** for a resume given the user's data.
    Keep it **concise, engaging, and formatted for job applications**. Only return the summary.`;

  const userMessage = `
      Craft a **compelling and highly professional portfolio summary** based on the details provided below. 
  The summary should be **concise, engaging, and tailored** for potential employers or clients, 
  effectively showcasing my **expertise, key skills, and notable achievements**.

  Guidelines:
  - Maintain a **strong, confident, and engaging tone**.
  - Ensure the summary is **impactful yet succinct** (around 3-5 sentences).
  - Highlight **key accomplishments** in a way that demonstrates value.
  - Optimize for **clarity, readability, and professional appeal**.
  - Avoid generic statements—**personalize the response based on the provided details**.

  Provided Information:
  (Insert relevant details such as job title, skills, experience, and achievements):

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (
          exp
        ) => `Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
        
        Description:
        ${exp.description || "N/A"}
        `
      )
      .join("\n\n")}

    Education:
    ${educations
      ?.map(
        (edu) =>
          `Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}`
      )
      .join("\n\n")}

    Skills: ${skills}
  `;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  const client = new Mistral({ apiKey: apiKey });
  const completion = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0]?.message?.content;
  if (!aiResponse) throw new Error("Failed to generate AI response");

  return aiResponse;
}

export async function generateWorkExperience(
  input: generateWorkExperienceInput
) {
  // TODO: Block for non-premium users

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a **structured work experience entry** based on user input.
  Format the response using the following structure:

  Job title: <job title>
  Company: <company name>
  Start date: YYYY-MM-DD (if provided)
  End date: YYYY-MM-DD (if provided)
  Description: Bullet points of key responsibilities (optimized for a resume)
  `;

  const userMessage = `Please provide a work experience entry from this description:\n${description}`;

  const completion = await mistral.chat.complete({
    model: "mistral-large-latest",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0]?.message?.content?.toString() || "";

  if (!aiResponse) throw new Error("Failed to generate AI response");

  console.log("aiResponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}
