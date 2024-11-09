import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import styles from "./layout.module.css";
import { getCompany } from "../db";
import Header from "../components/header";

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const company = await getCompany();

  return (
    <>
      <Header
        avatar={<div className={styles.companyName}>{company.name}</div>}
        items={[
          {
            name: "Employees",
            href: "/company/employees",
            icon: <UserOutlined />,
          },
          {
            name: "Candidates",
            href: "/company/candidates",
            icon: <UsergroupAddOutlined />,
          },
        ]}
      />
      <div className={styles.content}>{children}</div>
    </>
  );
}
