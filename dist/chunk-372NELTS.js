import {
  ConsoleEcho
} from "./chunk-JRQ3M2ZW.js";
import {
  $Global
} from "./chunk-3PM3PNI2.js";

// src/console/global.ts
if (!$Global.con) {
  $Global.con = new ConsoleEcho();
  $Global.echo = (...optionalParams) => $Global.con.debug(...optionalParams);
}
