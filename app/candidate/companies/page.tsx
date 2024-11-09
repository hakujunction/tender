"use client";
import {useEffect, useRef, useState} from "react";
import {
  AimOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {Button, List, notification} from "antd";

import {Content} from "antd/lib/layout/layout";
import {applyToCompany, getCompanies} from "./actions";

import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps['placement'];

export default function RecommendationsPage() {
  const applicationsRef = useRef(new Set<number>());
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

  const fetchCompanies = async () => {
    const {companies, applications} = await getCompanies();
    applications.forEach((application: any) => {
      applicationsRef.current.add(application.company_id);
    });
    setCompanies(companies);
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchCompanies();
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
              !applicationsRef.current.has(Number(item.id)) ? <Button
                key="Apply"
                onClick={async () => {
                  applicationsRef.current.add(Number(item.id));
                  setIsApplying(true);
                  await applyToCompany(item);
                  openNotification("topRight");
                  setIsApplying(false);
                }}
                disabled={isApplying}
              >
                Create roadmap to apply
              </Button> : <Button key="Applied" disabled icon={<CheckOutlined />}>Applied</Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={
                <div data-id={item.id}>
                  <p>
                    <AimOutlined /> {item.location}
                  </p>
                  <p>Industry: {item.industry}</p>
                  <p>Description: {item.description}</p>
                  <p>Requirements: {item.requirements}</p>
                  <p>Match percent: {item.match_percent}</p>
                </div>
              }
            />
          </List.Item>
        )}
      ></List>
    </Content>
  );
}
