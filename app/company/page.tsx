import { redirect } from "next/navigation";

export default async function CompanyPage() {
  redirect("/company/employees");
}
