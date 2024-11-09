"use client";
import {useEffect, useState} from "react";
import {
  AimOutlined,
} from "@ant-design/icons";
import {Button, List, notification, Progress, Skeleton} from "antd";

import {Content} from "antd/lib/layout/layout";
import {applyToCompany, getCompanies} from "./actions";

import type { NotificationArgsProps } from 'antd';
import Link from "next/link";

type NotificationPlacement = NotificationArgsProps['placement'];

export default function RecommendationsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Events added to calendar`,
      description: <><p>The events have been added to your calendar. You can check them <Link href="/candidate/calendar">here</Link></p></>,
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
    <Content style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
      {contextHolder}
      <List
        loading={!isLoaded}
        dataSource={companies}
        renderItem={(item: any) => (
          <List.Item actions={[
            <Button key="Apply" onClick={async () => {
              await applyToCompany(item);
              openNotification('topRight');
            }}>Apply</Button>
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
