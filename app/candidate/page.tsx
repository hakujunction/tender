import { redirect } from "next/navigation";

export default async function CandidatePage() {
  redirect("/candidate/chat");
}
