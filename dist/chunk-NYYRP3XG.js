import {
  EventBus
} from "./chunk-Y3WKXNL3.js";
import {
  $Global,
  DEBOUNCE_WINDOW_RESIZE,
  SERVERMODE,
  debounce
} from "./chunk-3PM3PNI2.js";

// src/eventBus/global.ts
if (!$Global.$on) {
  const defaultEvents = new EventBus();
  const resizeEvent = debounce(
    () => !SERVERMODE && defaultEvents.emit("window:resize"),
    DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : DEBOUNCE_WINDOW_RESIZE,
    false
  );
  $Global.$on = defaultEvents.on;
  $Global.$off = defaultEvents.off;
  $Global.$emit = defaultEvents.emit;
  $Global.$resize = {
    /** 注册 */
    register: () => !SERVERMODE && window.addEventListener("resize", resizeEvent),
    /** 注销 */
    unregister: () => !SERVERMODE && window.removeEventListener("resize", resizeEvent),
    /** 添加 */
    on: (event, immediate = false, ...args) => {
      !SERVERMODE && defaultEvents.on("window:resize", event, false, immediate, args);
    },
    /** 移除 */
    off: (event) => !SERVERMODE && defaultEvents.off("window:resize", event),
    /** 强制执行 */
    execute: () => !SERVERMODE && resizeEvent()
  };
}
