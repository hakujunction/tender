import Link from "next/link";

import { auth } from "../auth";
import { User } from "../components/user";
import { getUser } from "../db";
import styles from "./layout.module.css";

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await getUser(session.user.email);
  return (
    <div>
      <div className={styles.header}>
        <User email={user.email ?? ""} />

        <div className={styles.menu}>
          <Link href="/candidate/chat">Chat</Link>
          <Link href="/candidate/calendar">Calendar</Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
