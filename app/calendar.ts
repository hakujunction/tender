import * as google from "@googleapis/calendar";

const googleAuth = new google.auth.GoogleAuth();

const calendar = google.calendar({
  version: "v3",
  auth: googleAuth,
});

export default calendar;
