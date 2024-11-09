"use client";

import { Avatar, List } from "antd";
import { CompanyCandidate } from "../../../types";

type Props = {
  candidates: CompanyCandidate[];
};

export default function CandidatesList({ candidates }: Props) {
  return (
    <List
      bordered
      style={{ width: 500 }}
      itemLayout="horizontal"
      dataSource={candidates}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <a key="list-loadmore-edit" href={`mailto:${item.email}`}>
              contact
            </a>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar />}
            title={item.email}
            description={`Match: ${item.match}%`}
          />
        </List.Item>
      )}
    />
  );
}
