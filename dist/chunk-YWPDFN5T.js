import {
  cache_client_default,
  cache_server_default
} from "./chunk-XB5GV6QA.js";
import {
  $Global,
  SERVERMODE
} from "./chunk-C63VA6BJ.js";

// src/cache/global.ts
(() => {
  let _Cache;
  const createCache = () => {
    console.log("\u521D\u59CB\u5316\u7F13\u5B58\u5BF9\u8C61\u64CD\u4F5C");
    return new (SERVERMODE ? cache_server_default : cache_client_default)();
  };
  Object.defineProperty($Global, "$cache", {
    configurable: true,
    get() {
      !_Cache && (_Cache = createCache());
      return _Cache;
    }
  });
})();
