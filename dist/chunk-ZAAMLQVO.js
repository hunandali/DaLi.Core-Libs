import {
  ConsoleEcho
} from "./chunk-MYTJ4CGM.js";
import {
  $Global
} from "./chunk-BLLA2SCS.js";

// src/console/global.ts
if (!$Global.con) {
  $Global.con = new ConsoleEcho();
  $Global.echo = (...optionalParams) => $Global.con.debug(...optionalParams);
}
