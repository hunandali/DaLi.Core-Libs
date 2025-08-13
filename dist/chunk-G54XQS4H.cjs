"use strict";


var _chunk4A7EWPZWcjs = require('./chunk-4A7EWPZW.cjs');



var _chunkU4TVRTVKcjs = require('./chunk-U4TVRTVK.cjs');

// src/cache/global.ts
(() => {
  let _Cache;
  const createCache = () => {
    console.log("\u521D\u59CB\u5316\u7F13\u5B58\u5BF9\u8C61\u64CD\u4F5C");
    return new (_chunkU4TVRTVKcjs.SERVERMODE ? _chunk4A7EWPZWcjs.cache_server_default : (0, _chunk4A7EWPZWcjs.cache_client_default))();
  };
  Object.defineProperty(_chunkU4TVRTVKcjs.$Global, "$cache", {
    configurable: true,
    get() {
      !_Cache && (_Cache = createCache());
      return _Cache;
    }
  });
})();
