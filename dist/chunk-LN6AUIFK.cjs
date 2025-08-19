"use strict";

var _chunkDJ336TBScjs = require('./chunk-DJ336TBS.cjs');


var _chunkFMCVNC7Qcjs = require('./chunk-FMCVNC7Q.cjs');

// src/console/global.ts
if (!_chunkFMCVNC7Qcjs.$Global.con) {
  _chunkFMCVNC7Qcjs.$Global.con = new (0, _chunkDJ336TBScjs.ConsoleEcho)();
  _chunkFMCVNC7Qcjs.$Global.echo = (...optionalParams) => _chunkFMCVNC7Qcjs.$Global.con.debug(...optionalParams);
}
