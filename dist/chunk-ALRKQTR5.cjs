"use strict";

var _chunkAUK5KJPXcjs = require('./chunk-AUK5KJPX.cjs');





var _chunkXDQMWDHBcjs = require('./chunk-XDQMWDHB.cjs');

// src/eventBus/global.ts
if (!_chunkXDQMWDHBcjs.$Global.$on) {
  const defaultEvents = new (0, _chunkAUK5KJPXcjs.EventBus)();
  const resizeEvent = _chunkXDQMWDHBcjs.debounce.call(void 0, 
    () => !_chunkXDQMWDHBcjs.SERVERMODE && defaultEvents.emit("window:resize"),
    _chunkXDQMWDHBcjs.DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : _chunkXDQMWDHBcjs.DEBOUNCE_WINDOW_RESIZE,
    false
  );
  _chunkXDQMWDHBcjs.$Global.$on = defaultEvents.on;
  _chunkXDQMWDHBcjs.$Global.$off = defaultEvents.off;
  _chunkXDQMWDHBcjs.$Global.$emit = defaultEvents.emit;
  _chunkXDQMWDHBcjs.$Global.$resize = {
    /** 注册 */
    register: () => !_chunkXDQMWDHBcjs.SERVERMODE && window.addEventListener("resize", resizeEvent),
    /** 注销 */
    unregister: () => !_chunkXDQMWDHBcjs.SERVERMODE && window.removeEventListener("resize", resizeEvent),
    /** 添加 */
    on: (event, immediate = false, ...args) => {
      !_chunkXDQMWDHBcjs.SERVERMODE && defaultEvents.on("window:resize", event, false, immediate, args);
    },
    /** 移除 */
    off: (event) => !_chunkXDQMWDHBcjs.SERVERMODE && defaultEvents.off("window:resize", event),
    /** 强制执行 */
    execute: () => !_chunkXDQMWDHBcjs.SERVERMODE && resizeEvent()
  };
}
