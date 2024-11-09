"use client";
import {useEffect, useRef, useState} from "react";
import {
  AimOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {Button, List, notification, Spin, Typography} from "antd";

import {applyToCompany, getCompanies} from "./actions";

import type { NotificationArgsProps } from "antd";
import { InfoBox } from "./infobox";

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
    <>
      {companies.length > 0 ? <div style={{padding: "16px"}}>
        <InfoBox title="How to find the dream company?" description="There is the list of companies which better match your experience and well-being priorities. You can apply to them by creating a roadmap and we will create a calendar events for you to track your progress. Finishing the roadmap will increase your match score. You can mark events as done in the calendar. It increases the chance of getting an intetrview and find the job of your dreams 🧑‍💻." />
      </div> : null}
      {companies.length === 0 ? <div style={{padding: "16px"}}>
        <InfoBox title="No companies found" description="There is no companies which better match your experience and well-being priorities. Update the information in your profile through the chat and come back here." />
      </div> : null}
      {contextHolder}
      {companies.length > 0 ? <List
        style={{padding: "36px", paddingTop: 0}}
        loading={!isLoaded}
        dataSource={companies}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              !applicationsRef.current.has(Number(item.id)) ? (
                <Button
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
                </Button>
              ) : (
                <Button key="Applied" disabled icon={<CheckOutlined />}>
                  Applied
                </Button>
              ),
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
      ></List> : <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Spin />
    </div>}
    </>
  );
}
