import { Box } from "@mui/material";
import { auth, signOut } from "app/auth";
import {User} from "app/components/user"

export default async function CompaniesPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  return (
    <Box display="flex" padding={2}>
      <User email={session.user.email} />
    </Box>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}