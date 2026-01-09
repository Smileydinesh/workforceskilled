import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export function formatPstEst(utcDate) {
  const pstZone = "America/Los_Angeles";
  const estZone = "America/New_York";

  const pstDate = toZonedTime(utcDate, pstZone);

  return {
    // Full readable date (PST-based)
    date: formatInTimeZone(pstDate, pstZone, "EEE, MMM dd yyyy"),

    // Calendar badge
    day: formatInTimeZone(pstDate, pstZone, "dd"),
    month: formatInTimeZone(pstDate, pstZone, "MMM"),

    // Timezones (FORCED)
    pst: formatInTimeZone(utcDate, pstZone, "hh:mm a zzz"),
    est: formatInTimeZone(utcDate, estZone, "hh:mm a zzz"),
  };
}
