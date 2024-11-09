"use client";
import { Badge, BadgeProps, Calendar as AntCalendar, CalendarProps, Popover } from "antd";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { Meeting } from "app/db/calendar";

import styles from "./calendar.module.css";
import { useState } from "react";
import Link from "next/link";

type Props = {
  meetings: Meeting[];
};

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <Link key={`${part}-${index}`} href={part} target="_blank">
          {part}
        </Link>
      );
    }
    return part;
  });
};

const renderTextWithNewLines = (texts: Array<string | JSX.Element>) => {
  return texts.reduce((acc: Array<string | JSX.Element>, text, index) => {
    if (typeof text === "string") {
      const strings = text.split("\n");
      strings.forEach((string) => {
        acc.push(string);
      });
    } else {
      acc.push(text);
    }
    return acc;
  }, []);
};

export default function Calendar({ meetings }: Props) {
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null);

  const hide = () => {
    setSelectedMeeting(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) hide();
  };

  const getListData = (value: Dayjs) => {
    const meetingsOnDate = meetings.filter((meeting) => {
      const meetingDate = dayjs(meeting.date_start);
      return meetingDate.format("YYYY-MM-DD") === value.format("YYYY-MM-DD");
    });

    return meetingsOnDate.map((meeting) => {
      const meetingDate = dayjs(meeting.date_start);
      const time = meetingDate.format("HH:mm");

      return {
        id: meeting.id,
        type: meeting.type === 0 ? "warning" : "success",
        content: meeting.name,
        description: renderTextWithNewLines(renderTextWithLinks(meeting.description ?? "")),
        time,
      };
    });
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={styles.events} key={value.toISOString()}>
        {listData.map((item) => (
          <Popover
            key={item.content}
            content={<div style={{ maxWidth: "300px" }}>{item.description}</div>}
            title={item.content}
            trigger="click"
            open={selectedMeeting?.id === item.id}
            onOpenChange={handleOpenChange}
          >
            <li>
              <div
                className={styles.event}
                title={`${item.content ?? ""} at ${item.time}`}
                onClick={() => setSelectedMeeting(item)}
              >
                <Badge status={item.type as BadgeProps["status"]} text={item.content} />
                <div className={styles.time}>{item.time}</div>
              </div>
            </li>
          </Popover>
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
