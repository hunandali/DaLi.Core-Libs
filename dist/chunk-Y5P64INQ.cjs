"use strict";

var _chunkO3YERIYKcjs = require('./chunk-O3YERIYK.cjs');





var _chunkU4AQ4RPTcjs = require('./chunk-U4AQ4RPT.cjs');

// src/eventBus/global.ts
if (!_chunkU4AQ4RPTcjs.$Global.$on) {
  const defaultEvents = new (0, _chunkO3YERIYKcjs.EventBus)();
  const resizeEvent = _chunkU4AQ4RPTcjs.debounce.call(void 0, 
    () => !_chunkU4AQ4RPTcjs.SERVERMODE && defaultEvents.emit("window:resize"),
    _chunkU4AQ4RPTcjs.DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : _chunkU4AQ4RPTcjs.DEBOUNCE_WINDOW_RESIZE,
    false
  );
  _chunkU4AQ4RPTcjs.$Global.$on = defaultEvents.on;
  _chunkU4AQ4RPTcjs.$Global.$off = defaultEvents.off;
  _chunkU4AQ4RPTcjs.$Global.$emit = defaultEvents.emit;
  _chunkU4AQ4RPTcjs.$Global.$resize = {
    /** 注册 */
    register: () => !_chunkU4AQ4RPTcjs.SERVERMODE && window.addEventListener("resize", resizeEvent),
    /** 注销 */
    unregister: () => !_chunkU4AQ4RPTcjs.SERVERMODE && window.removeEventListener("resize", resizeEvent),
    /** 添加 */
    on: (event, immediate = false, ...args) => {
      !_chunkU4AQ4RPTcjs.SERVERMODE && defaultEvents.on("window:resize", event, false, immediate, args);
    },
    /** 移除 */
    off: (event) => !_chunkU4AQ4RPTcjs.SERVERMODE && defaultEvents.off("window:resize", event),
    /** 强制执行 */
    execute: () => !_chunkU4AQ4RPTcjs.SERVERMODE && resizeEvent()
  };
}
