import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { User } from "../types";

type Props = {
  children: React.ReactNode;
  redirectUrl: string;
  isCompany?: boolean;
  auth: () => Promise<Session | null>;
};

export default async function AuthServerProvider({
  children,
  redirectUrl,
  isCompany,
  auth,
}: Props) {
  const session = await auth();

  if (!isCompany && !session?.user?.email) {
    redirect(redirectUrl);
    return null;
  }

  if (isCompany && !session?.user?.name) {
    redirect(redirectUrl);
    return null;
  }

  const sessionObject = {} as User;
  if (session?.user?.email) {
    sessionObject.email = session.user.email;
  }
  if (session?.user?.name) {
    sessionObject.name = session.user.name;
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
