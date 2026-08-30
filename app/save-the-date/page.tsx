import type {
  Metadata,
} from "next";

import SaveTheDateExperience from "@/components/save-the-date/SaveTheDateExperience";

export const metadata: Metadata = {
  title:
    "Nishita & Mayur | Save the Date",
  description:
    "Save the date — 14 & 15 February 2027, Mumbai. Nishita & Mayur.",
};

export default function SaveTheDatePage() {
  return (
    <SaveTheDateExperience />
  );
}