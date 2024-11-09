import Link from "next/link";
import { CalendarOutlined } from "@ant-design/icons";

import styles from "./layout.module.css";
import { auth } from "./login/auth";
import AuthServerProvider from "../contexts/AuthServerProvider";
import { getUser } from "../user";

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <AuthServerProvider redirectUrl="/company/login" auth={auth} isCompany={true}>
      <div className={styles.header}>
        {user.name}

        <div className={styles.menu}>
          <Link href="/company/dashboard">
            <CalendarOutlined /> Dashboard
          </Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </AuthServerProvider>
  );
}
