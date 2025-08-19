import {
  ConsoleEcho
} from "./chunk-7FLXMEVC.js";
import {
  $Global
} from "./chunk-IESO4G4V.js";

// src/console/global.ts
if (!$Global.con) {
  $Global.con = new ConsoleEcho();
  $Global.echo = (...optionalParams) => $Global.con.debug(...optionalParams);
}
