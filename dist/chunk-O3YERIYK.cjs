"use strict";Object.defineProperty(exports, "__esModule", {value: true});



var _chunkU4AQ4RPTcjs = require('./chunk-U4AQ4RPT.cjs');

// src/eventBus/index.ts
var EventBus = class {
  constructor() {
    /** 注册的事件 */
    this.instance = /* @__PURE__ */ new Map();
    /**
     * 注册事件，名称如果已经存在则将被覆盖
     * @param name 事件名称，忽略大小写
     * @param action 事件
     * @param duplicate 当注册相同事件时是否允许重复
     * @param immediate 是否立即执行一次
     */
    this.on = (name, event, duplicate = false, immediate = false, ...args) => {
      if (!_chunkU4AQ4RPTcjs.isString.call(void 0, name) || !name || !_chunkU4AQ4RPTcjs.isFn.call(void 0, event)) return;
      name = name.toLowerCase();
      if (this.instance.has(name)) {
        const events = this.instance.get(name);
        if (duplicate) {
          events.push(event);
        } else {
          !events.includes(event) && events.push(event);
        }
      } else {
        this.instance.set(name, [event]);
      }
      immediate && event(...args);
    };
    /**
     * 注销指定事件，如果不存在则忽略
     * @param name 事件名称，忽略大小写
     * @param event 要移除的事件，不设置则所有都移除
     */
    this.off = (name, event) => {
      if (!_chunkU4AQ4RPTcjs.isString.call(void 0, name) || !name) return;
      name = name.toLowerCase();
      if (!this.instance.has(name)) return;
      if (!event) this.instance.delete(name);
      if (!_chunkU4AQ4RPTcjs.isFn.call(void 0, event)) return;
      const list = this.instance.get(name);
      if (!list) return;
      const index = list.indexOf(event);
      if (index > -1) list.splice(index, 1);
      if (!_chunkU4AQ4RPTcjs.hasArray.call(void 0, list)) this.instance.delete(name);
    };
    /**
     * 执行事件
     * @param name 事件名称，忽略大小写
     * @param args 提交参数
     */
    this.emit = (name, ...args) => {
      if (!_chunkU4AQ4RPTcjs.isString.call(void 0, name) || !name) return;
      name = name.toLowerCase();
      if (!this.instance.has(name)) return;
      const list = this.instance.get(name);
      list == null ? void 0 : list.forEach((event) => event(...args));
    };
  }
};
var createEventBus = () => new EventBus();




exports.EventBus = EventBus; exports.createEventBus = createEventBus;
