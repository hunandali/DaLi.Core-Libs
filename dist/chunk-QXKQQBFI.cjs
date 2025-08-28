"use strict";


var _chunkY26YVEX4cjs = require('./chunk-Y26YVEX4.cjs');



var _chunkXDQMWDHBcjs = require('./chunk-XDQMWDHB.cjs');

// src/cache/global.ts
(() => {
  let _Cache;
  const createCache = () => {
    console.log("\u521D\u59CB\u5316\u7F13\u5B58\u5BF9\u8C61\u64CD\u4F5C");
    return new (_chunkXDQMWDHBcjs.SERVERMODE ? _chunkY26YVEX4cjs.cache_server_default : (0, _chunkY26YVEX4cjs.cache_client_default))();
  };
  Object.defineProperty(_chunkXDQMWDHBcjs.$Global, "$cache", {
    configurable: true,
    get() {
      !_Cache && (_Cache = createCache());
      return _Cache;
    }
  });
})();
