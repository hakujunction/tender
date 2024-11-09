import Link from "next/link";
import {MessageOutlined, CalendarOutlined, StarOutlined} from "@ant-design/icons";

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
          <Link href="/candidate/chat"><MessageOutlined /> Chat</Link>
          <Link href="/candidate/companies"><StarOutlined /> Companies</Link>
          <Link href="/candidate/calendar"><CalendarOutlined /> Calendar</Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
