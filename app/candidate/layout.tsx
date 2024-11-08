import { auth } from "../auth";
import { User } from "../components/user";
import { getUser } from "../db";

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await getUser(session.user.email);
  return (
    <div>
      <User email={user.email ?? ""} />
      {children}
    </div>
  );
}
