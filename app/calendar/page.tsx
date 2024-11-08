import { auth } from "app/auth";
import { getMeetings } from "../db";
import { getUser } from "../db";
import CalendarComponent from "../components/calendar";

export default async function CalendarPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await getUser(session.user.email);
  const meetings = await getMeetings(user.id);

  return <CalendarComponent meetings={meetings} />;
}
