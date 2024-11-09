import { Avatar, List, Skeleton } from "antd";
import { getCompanyCandidates } from "../../db";
import CandidatesList from "../components/CandidatesList";

export default async function CompanyCandidates() {
  const candidates = await getCompanyCandidates(1);

  const candidatesList = candidates.map((candidate) => ({
    id: Number(candidate.CompanyCandidate.id),
    email: candidate.User?.email ?? "",
    description: "",
    match: candidate.CompanyCandidate.match_percent ?? 0,
  }));

  return (
    <div>
      <p>Candidates</p>

      <CandidatesList candidates={candidatesList} />
    </div>
  );
}
