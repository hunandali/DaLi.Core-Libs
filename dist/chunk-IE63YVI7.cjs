"use strict";

var _chunk4J72OB72cjs = require('./chunk-4J72OB72.cjs');





var _chunkEPHQJHZHcjs = require('./chunk-EPHQJHZH.cjs');

// src/eventBus/global.ts
if (!_chunkEPHQJHZHcjs.$Global.$on) {
  const defaultEvents = new (0, _chunk4J72OB72cjs.EventBus)();
  const resizeEvent = _chunkEPHQJHZHcjs.debounce.call(void 0, 
    () => !_chunkEPHQJHZHcjs.SERVERMODE && defaultEvents.emit("window:resize"),
    _chunkEPHQJHZHcjs.DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : _chunkEPHQJHZHcjs.DEBOUNCE_WINDOW_RESIZE,
    false
  );
  _chunkEPHQJHZHcjs.$Global.$on = defaultEvents.on;
  _chunkEPHQJHZHcjs.$Global.$off = defaultEvents.off;
  _chunkEPHQJHZHcjs.$Global.$emit = defaultEvents.emit;
  _chunkEPHQJHZHcjs.$Global.$resize = {
    /** 注册 */
    register: () => !_chunkEPHQJHZHcjs.SERVERMODE && window.addEventListener("resize", resizeEvent),
    /** 注销 */
    unregister: () => !_chunkEPHQJHZHcjs.SERVERMODE && window.removeEventListener("resize", resizeEvent),
    /** 添加 */
    on: (event, immediate = false, ...args) => {
      !_chunkEPHQJHZHcjs.SERVERMODE && defaultEvents.on("window:resize", event, false, immediate, args);
    },
    /** 移除 */
    off: (event) => !_chunkEPHQJHZHcjs.SERVERMODE && defaultEvents.off("window:resize", event),
    /** 强制执行 */
    execute: () => !_chunkEPHQJHZHcjs.SERVERMODE && resizeEvent()
  };
}
