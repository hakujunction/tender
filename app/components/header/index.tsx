"use client";

import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;

type Item = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

type Props = {
  items: Item[];
  avatar?: React.ReactNode;
};

const getPathname = (defaultPathname: string) => {
  if (typeof window === "undefined") {
    return defaultPathname;
  }

  return window.location.pathname;
};

export default function Header({ avatar, items }: Props) {
  const router = useRouter();
  const pathname = getPathname(items[0].href);
  const [selectedKey, setSelectedKey] = useState(pathname);

  const preparedItems = items.map((item) => ({
    label: item.name,
    key: item.href,
    icon: item.icon,
    onClick: () => router.push(item.href),
  }));

  useEffect(() => {
    setSelectedKey(pathname);
  }, [pathname]);

  return (
    <AntHeader style={{ display: "flex", alignItems: "center", gap: 32 }}>
      {avatar}
      <Menu
        theme="dark"
        mode="horizontal"
        activeKey={selectedKey}
        defaultActiveFirst
        items={preparedItems}
        style={{ flex: 1, minWidth: 0 }}
      />
    </AntHeader>
  );
}
