import { Metadata } from "next";
import { BuilderLayout } from "@/components/builder/BuilderLayout";

export const metadata: Metadata = {
  title: "Resume Builder & Editor | QuickCV",
  description:
    "Design and customize professional, ATS-friendly resumes in real-time with instant live preview and 1-click PDF download.",
};

export default function BuilderPage() {
  return <BuilderLayout />;
}
