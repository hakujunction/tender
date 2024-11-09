import Link from "next/link";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import styles from "./layout.module.css";
import { getCompany } from "../db";

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompany();

  return (
    <>
      <div className={styles.header}>
        {company.name}

        <div className={styles.menu}>
          <Link href="/company/employees">
            <UserOutlined /> Employees
          </Link>
          <Link href="/company/candidates">
            <UsergroupAddOutlined /> Candidates
          </Link>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}
