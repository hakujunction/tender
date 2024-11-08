"use client";
import { Badge, BadgeProps, Calendar as AntCalendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { Meeting } from "app/db/calendar";

import styles from "./calendar.module.css";

type Props = {
  meetings: Meeting[];
};

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export default function Calendar({ meetings }: Props) {
  const getListData = (value: Dayjs) => {
    const meetingsOnDate = meetings.filter((meeting) => {
      const meetingDate = dayjs(meeting.date_start);
      return meetingDate.format("YYYY-MM-DD") === value.format("YYYY-MM-DD");
    });

    return meetingsOnDate.map((meeting) => {
      const meetingDate = dayjs(meeting.date_start);
      const time = meetingDate.format("HH:mm");
      return {
        type: meeting.type === 0 ? "warning" : "success",
        content: meeting.name,
        time,
      };
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.content}>
            <div className={styles.event} title={`${item.content ?? ""} at ${item.time}`}>
              <Badge status={item.type as BadgeProps["status"]} text={item.content} />
              <div className={styles.time}>{item.time}</div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <AntCalendar className={styles.calendar} cellRender={cellRender} />
    </div>
  );
}
