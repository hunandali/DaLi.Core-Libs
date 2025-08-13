"use strict";

var _chunkMJLWUK5Mcjs = require('./chunk-MJLWUK5M.cjs');


var _chunkU4TVRTVKcjs = require('./chunk-U4TVRTVK.cjs');

// src/console/global.ts
if (!_chunkU4TVRTVKcjs.$Global.con) {
  _chunkU4TVRTVKcjs.$Global.con = new (0, _chunkMJLWUK5Mcjs.ConsoleEcho)();
  _chunkU4TVRTVKcjs.$Global.echo = (...optionalParams) => _chunkU4TVRTVKcjs.$Global.con.debug(...optionalParams);
}
