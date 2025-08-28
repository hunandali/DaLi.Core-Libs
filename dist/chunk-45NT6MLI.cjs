"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



var _chunkXDQMWDHBcjs = require('./chunk-XDQMWDHB.cjs');

// src/external/utils.ts
var _fingerprintjs = require('@fingerprintjs/fingerprintjs'); var _fingerprintjs2 = _interopRequireDefault(_fingerprintjs);
async function fingerprint() {
  if (_chunkXDQMWDHBcjs.SERVERMODE) return { id: "server", score: 1 };
  const fpJs = await _fingerprintjs2.default.load().then((fg) => fg.get());
  return { id: fpJs.visitorId, score: fpJs.confidence.score };
}

// src/external/string.ts
var _isomorphicdompurify = require('isomorphic-dompurify'); var _isomorphicdompurify2 = _interopRequireDefault(_isomorphicdompurify);
function htmlSafe(dirty, config) {
  return _isomorphicdompurify2.default.sanitize(dirty, config || { USE_PROFILES: { html: true } });
}

// src/external/date.ts
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var date = (date2) => !date2 || date2 === "now" ? _dayjs2.default.call(void 0, ) : date2 === "yesterday" ? _dayjs2.default.call(void 0, ).subtract(1, "day") : date2 === "tomorrow" ? _dayjs2.default.call(void 0, ).add(1, "day") : _dayjs2.default.call(void 0, date2);
var dateFormat = (date2, format = "YYYY-MM-DD") => {
  if (_chunkXDQMWDHBcjs.isEmpty.call(void 0, date2)) return "";
  if (_chunkXDQMWDHBcjs.isString.call(void 0, date2)) date2 = date2.toLowerCase();
  const day = !date2 || date2 === "now" || date2 === "today" ? _dayjs2.default.call(void 0, ) : date2 === "yesterday" ? _dayjs2.default.call(void 0, ).subtract(1, "day") : date2 === "tomorrow" ? _dayjs2.default.call(void 0, ).add(1, "day") : (
    /* 开始时间 */
    date2 === "weekstart" ? _dayjs2.default.call(void 0, ).startOf("week") : date2 === "monthstart" ? _dayjs2.default.call(void 0, ).startOf("month") : date2 === "yearstart" ? _dayjs2.default.call(void 0, ).startOf("year") : (
      /* 结束时间 */
      date2 === "weekend" ? _dayjs2.default.call(void 0, ).endOf("week") : date2 === "monthend" ? _dayjs2.default.call(void 0, ).endOf("month") : date2 === "yearend" ? _dayjs2.default.call(void 0, ).endOf("year") : (
        /* 自定义时间 */
        _dayjs2.default.call(void 0, date2)
      )
    )
  );
  if (!day.isValid()) return "\u2716";
  if (day.isBefore("2000-01-01", "day")) return "\u2796";
  if (format !== "desc") return day.format(format);
  return dateLong(day, null, false, true);
};
var dateLong = (start, end, isEn = false, incSuffix = false) => {
  const dayStart = _dayjs2.default.call(void 0, start);
  if (!dayStart.isValid()) return "\u2716";
  const dayEnd = end ? _dayjs2.default.call(void 0, end) : _dayjs2.default.call(void 0, );
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







exports.fingerprint = fingerprint; exports.htmlSafe = htmlSafe; exports.date = date; exports.dateFormat = dateFormat; exports.dateLong = dateLong;
