import { Avatar, List, Skeleton } from "antd";
import { getCompanyCandidates } from "../../db";
import CandidatesList from "../components/CandidatesList";

export default async function CompanyCandidates() {
  const candidates = await getCompanyCandidates(1);

  const candidatesList = candidates
    .map((candidate) => ({
      id: candidate.CompanyCandidate.id,
      email: candidate.User?.email ?? "",
      description: "",
      match: candidate.CompanyCandidate.match_percent ?? 0,
      avatar: candidate.User?.avatar ?? null,
    }))
    .sort((a, b) => b.match - a.match);

  return (
    <div>
      <p>Candidates</p>

      <CandidatesList candidates={candidatesList} />
    </div>
  );
}
