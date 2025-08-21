"use strict";


var _chunkX34CIJFScjs = require('./chunk-X34CIJFS.cjs');



var _chunkEPHQJHZHcjs = require('./chunk-EPHQJHZH.cjs');

// src/cache/global.ts
(() => {
  let _Cache;
  const createCache = () => {
    console.log("\u521D\u59CB\u5316\u7F13\u5B58\u5BF9\u8C61\u64CD\u4F5C");
    return new (_chunkEPHQJHZHcjs.SERVERMODE ? _chunkX34CIJFScjs.cache_server_default : (0, _chunkX34CIJFScjs.cache_client_default))();
  };
  Object.defineProperty(_chunkEPHQJHZHcjs.$Global, "$cache", {
    configurable: true,
    get() {
      !_Cache && (_Cache = createCache());
      return _Cache;
    }
  });
})();
