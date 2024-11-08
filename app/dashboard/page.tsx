import { auth, signOut } from "app/auth";
import { User } from "app/components/user";

export default async function CompaniesPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  return <User email={session.user.email} />;
}

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
