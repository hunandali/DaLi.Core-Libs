"use strict";

var _chunkCHGJVRTAcjs = require('./chunk-CHGJVRTA.cjs');





var _chunkFMCVNC7Qcjs = require('./chunk-FMCVNC7Q.cjs');

// src/eventBus/global.ts
if (!_chunkFMCVNC7Qcjs.$Global.$on) {
  const defaultEvents = new (0, _chunkCHGJVRTAcjs.EventBus)();
  const resizeEvent = _chunkFMCVNC7Qcjs.debounce.call(void 0, 
    () => !_chunkFMCVNC7Qcjs.SERVERMODE && defaultEvents.emit("window:resize"),
    _chunkFMCVNC7Qcjs.DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : _chunkFMCVNC7Qcjs.DEBOUNCE_WINDOW_RESIZE,
    false
  );
  _chunkFMCVNC7Qcjs.$Global.$on = defaultEvents.on;
  _chunkFMCVNC7Qcjs.$Global.$off = defaultEvents.off;
  _chunkFMCVNC7Qcjs.$Global.$emit = defaultEvents.emit;
  _chunkFMCVNC7Qcjs.$Global.$resize = {
    /** 注册 */
    register: () => !_chunkFMCVNC7Qcjs.SERVERMODE && window.addEventListener("resize", resizeEvent),
    /** 注销 */
    unregister: () => !_chunkFMCVNC7Qcjs.SERVERMODE && window.removeEventListener("resize", resizeEvent),
    /** 添加 */
    on: (event, immediate = false, ...args) => {
      !_chunkFMCVNC7Qcjs.SERVERMODE && defaultEvents.on("window:resize", event, false, immediate, args);
    },
    /** 移除 */
    off: (event) => !_chunkFMCVNC7Qcjs.SERVERMODE && defaultEvents.off("window:resize", event),
    /** 强制执行 */
    execute: () => !_chunkFMCVNC7Qcjs.SERVERMODE && resizeEvent()
  };
}
