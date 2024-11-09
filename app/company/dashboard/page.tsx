import { getCompanyUsers } from "../../db";
import PieChart from "../components/PieChart";

export default async function CompanyDashboard() {
  const companyUsers = await getCompanyUsers(1);

  const skills = companyUsers.reduce((acc, item) => {
    if (!item.search_params) {
      return acc;
    }

    if (!item.search_params?.skills?.length) {
      return acc;
    }

    item.search_params.skills.forEach((skill) => {
      acc.set(skill, (acc.get(skill) || 0) + 1);
    });

    return acc;
  }, new Map<string, number>());

  const tags = companyUsers.reduce((acc, item) => {
    if (!item.search_params) {
      return acc;
    }

    if (!item.search_params?.tags?.length) {
      return acc;
    }

    item.search_params.tags.forEach((tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });

    return acc;
  }, new Map<string, number>());

  const workLifeBalanceMap = new Map<string, number>();
  workLifeBalanceMap.set(
    "Work",
    Array.from(skills.values()).reduce((acc, item) => acc + item, 0)
  );
  workLifeBalanceMap.set(
    "Life",
    Array.from(tags.values()).reduce((acc, item) => acc + item, 0)
  );

  return (
    <div>
      <div style={{ paddingBottom: 20 }}>
        <PieChart title="Employees skills" data={skills} />
      </div>
      <div style={{ paddingBottom: 20 }}>
        <PieChart title="Employees values" data={tags} />
      </div>
      <div style={{ paddingBottom: 20 }}>
        <PieChart title="Work/Life balance" data={workLifeBalanceMap} />
      </div>
    </div>
  );
}
