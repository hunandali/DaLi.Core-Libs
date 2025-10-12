"use strict";

var _chunkVDUPGWLPcjs = require('./chunk-VDUPGWLP.cjs');


var _chunkU4AQ4RPTcjs = require('./chunk-U4AQ4RPT.cjs');

// src/console/global.ts
if (!_chunkU4AQ4RPTcjs.$Global.con) {
  _chunkU4AQ4RPTcjs.$Global.con = new (0, _chunkVDUPGWLPcjs.ConsoleEcho)();
  _chunkU4AQ4RPTcjs.$Global.echo = (...optionalParams) => _chunkU4AQ4RPTcjs.$Global.con.debug(...optionalParams);
}
