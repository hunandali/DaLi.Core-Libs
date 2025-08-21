import {
  SERVERMODE,
  isEmpty,
  isString
} from "./chunk-3PM3PNI2.js";

// src/external/utils.ts
import fingerprintJs from "@fingerprintjs/fingerprintjs";
async function fingerprint() {
  if (SERVERMODE) return { id: "server", score: 1 };
  const fpJs = await fingerprintJs.load().then((fg) => fg.get());
  return { id: fpJs.visitorId, score: fpJs.confidence.score };
}

// src/external/string.ts
import DOMPurify from "isomorphic-dompurify";
function htmlSafe(dirty, config) {
  return DOMPurify.sanitize(dirty, config || { USE_PROFILES: { html: true } });
}

// src/external/date.ts
import dayjs from "dayjs";
var date = (date2) => !date2 || date2 === "now" ? dayjs() : date2 === "yesterday" ? dayjs().subtract(1, "day") : date2 === "tomorrow" ? dayjs().add(1, "day") : dayjs(date2);
var dateFormat = (date2, format = "YYYY-MM-DD") => {
  if (isEmpty(date2)) return "";
  if (isString(date2)) date2 = date2.toLowerCase();
  const day = !date2 || date2 === "now" || date2 === "today" ? dayjs() : date2 === "yesterday" ? dayjs().subtract(1, "day") : date2 === "tomorrow" ? dayjs().add(1, "day") : (
    /* 开始时间 */
    date2 === "weekstart" ? dayjs().startOf("week") : date2 === "monthstart" ? dayjs().startOf("month") : date2 === "yearstart" ? dayjs().startOf("year") : (
      /* 结束时间 */
      date2 === "weekend" ? dayjs().endOf("week") : date2 === "monthend" ? dayjs().endOf("month") : date2 === "yearend" ? dayjs().endOf("year") : (
        /* 自定义时间 */
        dayjs(date2)
      )
    )
  );
  if (!day.isValid()) return "\u2716";
  if (day.isBefore("2000-01-01", "day")) return "\u2796";
  if (format !== "desc") return day.format(format);
  return dateLong(day, null, false, true);
};
var dateLong = (start, end, isEn = false, incSuffix = false) => {
  const dayStart = dayjs(start);
  if (!dayStart.isValid()) return "\u2716";
  const dayEnd = end ? dayjs(end) : dayjs();
  if (!dayEnd.isValid()) return "\u2716";
  let long = dayEnd.unix() - dayStart.unix();
  const isAfter = long < 0;
  long = Math.abs(long);
  if (long <= 1) return incSuffix ? isEn ? "now" : "\u6B64\u523B" : isEn ? "0sec" : "0\u79D2";
  const s = isEn ? "sec" : "\u79D2";
  const m = isEn ? "min" : "\u5206";
  const h = isEn ? "hout" : "\u65F6";
  const d = isEn ? "day" : "\u5929";
  const suffix = incSuffix ? isAfter ? isEn ? "after" : "\u540E" : isEn ? "before" : "\u524D" : "";
  if (long < 60) return `${long}${s}${suffix}`;
  long = long / 60;
  if (long < 60) {
    const a2 = Math.floor(long);
    let ret2 = `${a2}${m}`;
    const b2 = Math.floor((long - a2) * 60);
    b2 > 0 && (ret2 += `${b2}${s}`);
    return ret2 + suffix;
  }
  long = long / 60;
  if (long < 24) {
    const a2 = Math.floor(long);
    let ret2 = `${a2}${h}`;
    const b2 = Math.floor((long - a2) * 60);
    b2 > 0 && (ret2 += `${b2}${m}`);
    return ret2 + suffix;
  }
  long = long / 24;
  const a = Math.floor(long);
  let ret = `${a}${d}`;
  const b = Math.floor((long - a) * 24);
  b > 0 && (ret += `${b}${h}`);
  return ret + suffix;
};

export {
  fingerprint,
  htmlSafe,
  date,
  dateFormat,
  dateLong
};
