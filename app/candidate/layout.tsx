import Link from "next/link";
import {MessageOutlined, CalendarOutlined, StarOutlined} from "@ant-design/icons";

import { auth } from "../auth";
import styles from "./layout.module.css";
import AuthServerProvider from "../contexts/AuthServerProvider";
import { getUser } from "../user";
import { User } from "../components/user";

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <AuthServerProvider redirectUrl="/login" auth={auth}>
      <div className={styles.header}>
        <User email={user.email ?? ""} />

        <div className={styles.menu}>
          <Link href="/candidate/chat">
            <MessageOutlined /> Chat
          </Link>
          <Link href="/candidate/companies">
            <StarOutlined /> Companies
          </Link>
          <Link href="/candidate/calendar">
            <CalendarOutlined /> Calendar
          </Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </AuthServerProvider>
  );
}
