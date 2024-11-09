import { getCompanyCandidates } from "../../db";

export default async function CompanyCandidates() {
  const candidates = await getCompanyCandidates(1);
  console.log({ candidates });
  return <div>{JSON.stringify(candidates)}</div>;
}
