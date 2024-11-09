"use client";

import { Avatar, List } from "antd";
import { CompanyCandidate } from "../../../types";

import styles from "./CandidatesList.module.css";

type Props = {
  candidates: CompanyCandidate[];
};

const getMatchColor = (match: number) => {
  if (match >= 80) {
    return "green";
  }
  if (match >= 60) {
    return "orange";
  }
  return "red";
};

export default function CandidatesList({ candidates }: Props) {
  return (
    <List
      bordered
      style={{ width: "50%" }}
      itemLayout="horizontal"
      dataSource={candidates}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={
            item.match < 80
              ? ["Candidate is being prepared..."]
              : [
                  <a key="list-loadmore-edit" href={`mailto:${item.email}`}>
                    contact
                  </a>,
                ]
          }
        >
          <List.Item.Meta
            avatar={
              <div style={{ maxWidth: "30px", maxHeight: "30px" }}>
                <Avatar src={item.avatar ?? undefined} />
              </div>
            }
            title={<div className={item.match < 80 ? styles.blurred : ""}>{item.email}</div>}
            description={
              <>
                {"Match: "}
                <span style={{ color: getMatchColor(item.match) }}>{item.match}%</span>
              </>
            }
          />
        </List.Item>
      )}
    />
  );
}
