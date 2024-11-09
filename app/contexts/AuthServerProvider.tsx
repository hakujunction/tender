import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { User } from "../types";

type Props = {
  children: React.ReactNode;
  redirectUrl: string;
  auth: () => Promise<Session | null>;
};

export default async function AuthServerProvider({
  children,
  redirectUrl,
  auth,
}: Props) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(redirectUrl);
    return null;
  }

  const sessionObject = {} as User;

  if (session.user.id) {
    sessionObject.id = session.user.id;
  }
  if (session.user.email) {
    sessionObject.email = session.user.email;
  }
  if (session.user.avatar) {
    sessionObject.avatar = session.user.avatar;
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: `window.user = ${JSON.stringify(sessionObject)};` }}
      />
      {children}
    </>
  );
}
