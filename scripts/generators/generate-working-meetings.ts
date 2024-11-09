import dayjs, { Dayjs } from "dayjs";

const dailyMeetings = [
  "Daily Standup",
  "Daily Sync",
  "Morning Huddle",
  "Daily Check-in",
  "Sprint Standup",
  "Daily Planning",
  "Status Update",
  "Team Sync-up",
];

const eveningMeetings = [
  "Wrap-Up",
  "Daily Retrospective",
  "Daily Recap",
  "Evening Sync",
  "Daily Review",
];

const weeklyMeetings = [
  "Sprint Planning",
  "Backlog Grooming",
  "Sprint Retrospective",
  "Weekly Sync",
  "Team Retrospective",
  "Product Review",
  "Roadmap Review",
  "Weekly Demo",
  "Tech Debt Review",
  "Progress Review",
];

const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const utcFormat = "YYYY-MM-DDTHH:mm:ss";

const generateMeetings = (date: Dayjs, userId: number) => {
  let startDate = date.startOf("month").subtract(1, "week").startOf("day");
  const endDate = date.endOf("month").add(1, "week").endOf("day");

  const meetings = [];

  const dailyMeeting = dailyMeetings[getRandomValue(0, dailyMeetings.length - 1)];
  const dailyMeetingStart = getRandomValue(9, 12);

  while (startDate.isBefore(endDate)) {
    if (startDate.day() === 1) {
      const meetingStartDate = startDate.set("hour", getRandomValue(13, 15));
      const meetingEndDate = meetingStartDate.add(1, "hour");

      meetings.push({
        userId,
        name: weeklyMeetings[getRandomValue(0, weeklyMeetings.length - 1)],
        dateStart: meetingStartDate.format(utcFormat),
        dateEnd: meetingEndDate.format(utcFormat),
      });

      const dailyMeetingStartDate = startDate.set("hour", dailyMeetingStart);
      const dailyMeetingEndDate = dailyMeetingStartDate.add(15, "minutes");

      meetings.push({
        userId,
        name: dailyMeeting,
        dateStart: dailyMeetingStartDate.format(utcFormat),
        dateEnd: dailyMeetingEndDate.format(utcFormat),
      });
    }

    if (startDate.day() > 1 && startDate.day() < 6) {
      const dailyMeetingStartDate = startDate.set("hour", dailyMeetingStart);
      const dailyMeetingEndDate = dailyMeetingStartDate.add(15, "minutes");

      meetings.push({
        userId,
        name: dailyMeeting,
        dateStart: dailyMeetingStartDate.format(utcFormat),
        dateEnd: dailyMeetingEndDate.format(utcFormat),
      });
    }

    const addEveningMeeting = getRandomValue(0, 2);
    if (addEveningMeeting === 1) {
      const eveningMeeting = eveningMeetings[getRandomValue(0, eveningMeetings.length - 1)];

      const eveningMeetingStartDate = startDate.set("hour", getRandomValue(17, 18));
      const eveningMeetingEndDate = eveningMeetingStartDate.add(30, "minutes");

      meetings.push({
        userId,
        name: eveningMeeting,
        dateStart: eveningMeetingStartDate.format(utcFormat),
        dateEnd: eveningMeetingEndDate.format(utcFormat),
      });
    }

    startDate = startDate.add(1, "day");
  }

  const csvHeader = "user_id,name,date_start,date_end,type";
  const csvData = meetings
    .map((meeting) => `${meeting.userId},${meeting.name},${meeting.dateStart},${meeting.dateEnd},0`)
    .join("\n");

  console.log(csvHeader);
  console.log(csvData);
};

generateMeetings(dayjs(), 2);
