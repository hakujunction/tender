import {signOut} from "app/auth";
import {Avatar, Dropdown, MenuProps} from "antd";
import * as React from "react";

export function User({ email }: { email: string }) {
  const items: MenuProps['items'] = [
    {
      label: <form action={async () => {
        "use server"
        await signOut({redirectTo: "/"});
      }}>
        <button type="submit" style={{background: 'none', border: 'none', cursor: 'pointer'}}>Sign out</button>
      </form>,
      key: '0',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <Avatar style={{ userSelect: "none", backgroundColor: "#ccc", color: "#000" }}>
        {email[0]?.toUpperCase() ?? ""}
      </Avatar>
    </Dropdown>
  );
}
