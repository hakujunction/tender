"use client";
import {useEffect, useState} from "react";
import {AimOutlined} from "@ant-design/icons";
import {Button, Layout, List} from "antd";

import Title from "antd/lib/typography/Title";
import {Content} from "antd/lib/layout/layout";
import {getCompanies} from "./actions";

export default function RecommendationsPage() {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      setCompanies(await getCompanies());
    })();
  }, []);

  return (
    <Content style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
      <List
        dataSource={companies}
        renderItem={(item: any) => (
          <List.Item actions={[
            <Button key="Apply">Apply</Button>
          ]}>
            <List.Item.Meta
              title={item.name}
              description={
                <>
                  <p><AimOutlined /> {item.location}</p>
                  <p>Industry: {item.industry}</p>
                  <p>Description: {item.description}</p>
                  <p>Requirements: {item.requirements}</p>
                </>
              }
            />
          </List.Item>
        )}
      >
      </List>
    </Content>
  );
}
