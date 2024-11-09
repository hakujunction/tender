import {AimOutlined} from "@ant-design/icons";
import {Button} from "antd";

import {auth} from "app/auth";
import {openai} from "app/ai";
import {getSearchParams} from "app/db/user";
import Title from "antd/lib/typography/Title";
import {Content} from "antd/lib/layout/layout";

export default async function RecommendationsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const searchParams = await getSearchParams(session.user.email);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {"role": "system", "content": `Generate a list of 10 companies that match the provided information about candidate in strict one-line JSON format one JSON per line without any additional symbols: {"name": "Company Name", "location": "City, Country", "industry": "Industry", "size": "Size", "description": "Long enough description", "requirements": "Requirements"}.`},
      {"role": "user", "content": `I have ${searchParams.skills.length} skills: ${searchParams.skills.join(", ")}. I have the following interests: ${searchParams.tags.join(', ')}.`},
    ]
  });

  const companies = completion.choices[0].message.content!.split("\n").map((line: string) => JSON.parse(line));

  return (
    <Content style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
      {companies.map((company: any) => (
        <div style={{marginBottom: '16px'}} key={company.name}>
          <Title level={3}>{company.name}</Title>
          <p><AimOutlined /> {company.location}</p>
          <p>Industry: {company.industry}</p>
          <p>Description: {company.description}</p>
          <p>Requirements: {company.requirements}</p>
          <div style={{marginTop: '12px'}}>
            <Button>Apply</Button>
          </div>
        </div>
      ))}
    </Content>
  );
}
