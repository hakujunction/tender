"use client";
import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

import { Meeting } from "app/db/calendar";

type Props = {
  meetings: Meeting[];
};

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});

export default function CalendarComponent({ meetings }: Props) {
  const getListData = (value: Dayjs) => {
    const meetingsOnDate = meetings.filter((meeting) => {
      const meetingDate = dayjs(meeting.date_start);
      return meetingDate.format("YYYY-MM-DD") === value.format("YYYY-MM-DD");
    });

    return meetingsOnDate.map((meeting) => ({
      type: meeting.type === 0 ? "warning" : "success",
      content: meeting.name,
    }));
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
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
      <Calendar cellRender={cellRender} />
    </div>
  );
}
