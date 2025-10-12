import {
  ConsoleEcho
} from "./chunk-INFSZ6LF.js";
import {
  $Global
} from "./chunk-JSKPTUZJ.js";

// src/console/global.ts
if (!$Global.con) {
  $Global.con = new ConsoleEcho();
  $Global.echo = (...optionalParams) => $Global.con.debug(...optionalParams);
}
