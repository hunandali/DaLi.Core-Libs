import {
  ConsoleEcho
} from "./chunk-3FY5QCYJ.js";
import {
  $Global
} from "./chunk-C63VA6BJ.js";

// src/console/global.ts
if (!$Global.con) {
  $Global.con = new ConsoleEcho();
  $Global.echo = (...optionalParams) => $Global.con.debug(...optionalParams);
}
