"use client";
import {useEffect, useState} from "react";
import {
  AimOutlined,
} from "@ant-design/icons";
import {Button, List, notification} from "antd";

import {Content} from "antd/lib/layout/layout";
import {applyToCompany, getCompanies} from "./actions";

import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps['placement'];

export default function RecommendationsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const [isApplying, setIsApplying] = useState(false);

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Events added to calendar`,
      description: (
        <>
          <p>
            The events have been added to your calendar. You can check them{" "}
            <a href="/candidate/calendar">here</a>
          </p>
        </>
      ),
      placement,
    });
  };

  useEffect(() => {
    (async () => {
      setCompanies(await getCompanies());
      setIsLoaded(true);
    })();
  }, []);

  return (
    <Content style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
      {contextHolder}
      <List
        loading={!isLoaded}
        dataSource={companies}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Button
                key="Apply"
                onClick={async () => {
                  setIsApplying(true);
                  await applyToCompany(item);
                  openNotification("topRight");
                  setIsApplying(false);
                }}
                disabled={isApplying}
              >
                Create roadmap to apply
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={
                <>
                  <p>
                    <AimOutlined /> {item.location}
                  </p>
                  <p>Industry: {item.industry}</p>
                  <p>Description: {item.description}</p>
                  <p>Requirements: {item.requirements}</p>
                </>
              }
            />
          </List.Item>
        )}
      ></List>
    </Content>
  );
}
