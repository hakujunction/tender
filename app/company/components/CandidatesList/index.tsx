"use client";

import { Avatar, List } from "antd";
import { CompanyCandidate } from "../../../types";

import styles from "./CandidatesList.module.css";

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
          actions={
            item.match < 80
              ? ["Prepearing..."]
              : [
                  <a key="list-loadmore-edit" href={`mailto:${item.email}`}>
                    contact
                  </a>,
                ]
          }
        >
          <List.Item.Meta
            avatar={<Avatar />}
            title={<div className={item.match < 80 ? styles.blurred : ""}>{item.email}</div>}
            description={`Match: ${item.match}%`}
          />
        </List.Item>
      )}
    />
  );
}
