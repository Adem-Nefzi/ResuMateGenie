import { Metadata } from "next";
import ResumeEditor from "./EditResume";

export const metadata: Metadata = {
  title: "Customize Your Resume ",
};
export default function Page() {
  return <ResumeEditor />;
}
