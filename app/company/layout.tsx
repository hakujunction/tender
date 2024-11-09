import Link from "next/link";
import { CalendarOutlined } from "@ant-design/icons";

import styles from "./layout.module.css";
import { auth } from "./login/auth";

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return (
    <div>
      <div className={styles.header}>
        {session.user.name ?? ""}

        <div className={styles.menu}>
          <Link href="/company/dashboard">
            <CalendarOutlined /> Dashboard
          </Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
