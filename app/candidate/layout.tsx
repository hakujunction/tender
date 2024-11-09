import { MessageOutlined, CalendarOutlined, StarOutlined } from "@ant-design/icons";

import { auth } from "../auth";
import styles from "./layout.module.css";
import AuthServerProvider from "../contexts/AuthServerProvider";
import { getUser } from "../user";
import { User } from "../components/user";
import Header from "../components/header";

export default async function CandidateLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  return (
    <AuthServerProvider redirectUrl="/login" auth={auth}>
      <Header
        avatar={<User email={user.email ?? ""} />}
        items={[
          {
            name: "Chat",
            href: "/candidate/chat",
            icon: <MessageOutlined />,
          },
          {
            name: "Companies",
            href: "/candidate/companies",
            icon: <StarOutlined />,
          },
          {
            name: "Calendar",
            href: "/candidate/calendar",
            icon: <CalendarOutlined />,
          },
        ]}
      />
      <div className={styles.content}>{children}</div>
    </AuthServerProvider>
  );
}
