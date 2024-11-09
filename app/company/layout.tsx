import Link from "next/link";
import { CalendarOutlined } from "@ant-design/icons";

import styles from "./layout.module.css";
import AuthServerProvider from "../contexts/AuthServerProvider";
import { getUser } from "../user";
import { getCompany } from "../db";

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompany();

  return (
    <>
      <div className={styles.header}>
        {company.name}

        <div className={styles.menu}>
          <Link href="/company/dashboard">
            <CalendarOutlined /> Dashboard
          </Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}
