import { Avatar } from "antd";
import * as React from "react";

export async function User({ email }: { email: string }) {
  return <Avatar>{email[0]?.toUpperCase() ?? ""}</Avatar>;
}
