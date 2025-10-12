"use strict";


var _chunkW6G3NYSBcjs = require('./chunk-W6G3NYSB.cjs');



var _chunkU4AQ4RPTcjs = require('./chunk-U4AQ4RPT.cjs');

// src/cache/global.ts
(() => {
  let _Cache;
  const createCache = () => {
    console.log("\u521D\u59CB\u5316\u7F13\u5B58\u5BF9\u8C61\u64CD\u4F5C");
    return new (_chunkU4AQ4RPTcjs.SERVERMODE ? _chunkW6G3NYSBcjs.cache_server_default : (0, _chunkW6G3NYSBcjs.cache_client_default))();
  };
  Object.defineProperty(_chunkU4AQ4RPTcjs.$Global, "$cache", {
    configurable: true,
    get() {
      !_Cache && (_Cache = createCache());
      return _Cache;
    }
  });
})();
