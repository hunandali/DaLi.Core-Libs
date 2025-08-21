"use strict";

var _chunk3MTWWC6Pcjs = require('./chunk-3MTWWC6P.cjs');


var _chunkEPHQJHZHcjs = require('./chunk-EPHQJHZH.cjs');

// src/console/global.ts
if (!_chunkEPHQJHZHcjs.$Global.con) {
  _chunkEPHQJHZHcjs.$Global.con = new (0, _chunk3MTWWC6Pcjs.ConsoleEcho)();
  _chunkEPHQJHZHcjs.$Global.echo = (...optionalParams) => _chunkEPHQJHZHcjs.$Global.con.debug(...optionalParams);
}
