"use strict";

var _chunkOKBN3ZKXcjs = require('./chunk-OKBN3ZKX.cjs');





var _chunkU4TVRTVKcjs = require('./chunk-U4TVRTVK.cjs');

// src/eventBus/global.ts
if (!_chunkU4TVRTVKcjs.$Global.$on) {
  const defaultEvents = new (0, _chunkOKBN3ZKXcjs.EventBus)();
  const resizeEvent = _chunkU4TVRTVKcjs.debounce.call(void 0, 
    () => !_chunkU4TVRTVKcjs.SERVERMODE && defaultEvents.emit("window:resize"),
    _chunkU4TVRTVKcjs.DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : _chunkU4TVRTVKcjs.DEBOUNCE_WINDOW_RESIZE,
    false
  );
  _chunkU4TVRTVKcjs.$Global.$on = defaultEvents.on;
  _chunkU4TVRTVKcjs.$Global.$off = defaultEvents.off;
  _chunkU4TVRTVKcjs.$Global.$emit = defaultEvents.emit;
  _chunkU4TVRTVKcjs.$Global.$resize = {
    /** 注册 */
    register: () => !_chunkU4TVRTVKcjs.SERVERMODE && window.addEventListener("resize", resizeEvent),
    /** 注销 */
    unregister: () => !_chunkU4TVRTVKcjs.SERVERMODE && window.removeEventListener("resize", resizeEvent),
    /** 添加 */
    on: (event, immediate = false, ...args) => {
      !_chunkU4TVRTVKcjs.SERVERMODE && defaultEvents.on("window:resize", event, false, immediate, args);
    },
    /** 移除 */
    off: (event) => !_chunkU4TVRTVKcjs.SERVERMODE && defaultEvents.off("window:resize", event),
    /** 强制执行 */
    execute: () => !_chunkU4TVRTVKcjs.SERVERMODE && resizeEvent()
  };
}
