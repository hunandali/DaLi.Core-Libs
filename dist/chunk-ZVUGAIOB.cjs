"use strict";


var _chunkQUWPGWIPcjs = require('./chunk-QUWPGWIP.cjs');



var _chunkFMCVNC7Qcjs = require('./chunk-FMCVNC7Q.cjs');

// src/cache/global.ts
(() => {
  let _Cache;
  const createCache = () => {
    console.log("\u521D\u59CB\u5316\u7F13\u5B58\u5BF9\u8C61\u64CD\u4F5C");
    return new (_chunkFMCVNC7Qcjs.SERVERMODE ? _chunkQUWPGWIPcjs.cache_server_default : (0, _chunkQUWPGWIPcjs.cache_client_default))();
  };
  Object.defineProperty(_chunkFMCVNC7Qcjs.$Global, "$cache", {
    configurable: true,
    get() {
      !_Cache && (_Cache = createCache());
      return _Cache;
    }
  });
})();
