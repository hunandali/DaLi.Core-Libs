"use strict";

var _chunkKEHOTFN4cjs = require('./chunk-KEHOTFN4.cjs');


var _chunkXDQMWDHBcjs = require('./chunk-XDQMWDHB.cjs');

// src/console/global.ts
if (!_chunkXDQMWDHBcjs.$Global.con) {
  _chunkXDQMWDHBcjs.$Global.con = new (0, _chunkKEHOTFN4cjs.ConsoleEcho)();
  _chunkXDQMWDHBcjs.$Global.echo = (...optionalParams) => _chunkXDQMWDHBcjs.$Global.con.debug(...optionalParams);
}
