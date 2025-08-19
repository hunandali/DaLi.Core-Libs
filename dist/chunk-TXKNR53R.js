import {
  LRU
} from "./chunk-6QCBU3HR.js";
import {
  CACHE_TIME_MAX,
  hasArray,
  isEmpty,
  isFn
} from "./chunk-IESO4G4V.js";

// src/cache/cache.server.ts
var DEFAULT_TIME = CACHE_TIME_MAX * 86400;
var DEFAULT_COUNT = 1e4;
var cache_server_default = class {
  constructor() {
    /** LUR 缓存对象，最大缓存 1000 个项目 */
    this.instance = new LRU(DEFAULT_COUNT);
  }
  /**
   * 获取缓存数据
   * @param key		键名
   * @param valueFunc 当值不存在时，返回值的函数
   * @param delay		缓存时长，单位：秒
   */
  async get(key, valueFunc, delay = 0) {
    if (!key) return;
    let value = this.instance.get(key);
    if (isEmpty(value) && isFn(valueFunc)) {
      try {
        value = await valueFunc();
        await this.set(key, value, delay);
      } catch (e) {
        console.error(e);
      }
    }
    return value;
  }
  /**
   * 缓存数据
   * @param key	键名
   * @param value	值
   * @param delay	缓存时长，单位：秒
   */
  async set(key, value, delay = 0) {
    delay = delay || DEFAULT_TIME;
    delay = delay > 0 ? delay : 0;
    this.instance.set(key, value, delay);
  }
  /** 移除缓存 */
  async remove(key) {
    if (!key) return;
    this.instance.remove(key);
  }
  /** 清空缓存 */
  async clear() {
    this.instance.clear();
  }
  /** 所有缓存的键 */
  async keys() {
    const keys = this.instance.keys();
    return Array.from(keys);
  }
  /** 缓存数量 */
  async length() {
    return this.instance.length();
  }
};

// src/cache/cache.client.ts
import localforage from "localforage";
var DEFAULT_TIME2 = CACHE_TIME_MAX * 86400;
var cache_client_default = class {
  constructor() {
    /** 缓存对象 */
    this.instance = localforage;
    /** 正在检查缓存 */
    this.checkStatus = false;
  }
  /**
   * 获取缓存数据
   * @param key		键名
   * @param valueFunc 当值不存在时，返回值的函数
   * @param delay		缓存时长，单位：秒
   */
  async get(key, valueFunc, delay = 0) {
    if (!key) return;
    let value;
    const ret = await this.instance.getItem(key);
    if (ret) {
      const last = ret.last;
      if (last === 0 || last >= Date.now()) {
        value = ret.data;
      } else {
        await this.remove(key);
      }
    }
    if (isEmpty(value) && isFn(valueFunc)) {
      try {
        value = await valueFunc();
        await this.set(key, value, delay);
      } catch (e) {
        console.error(e);
      }
    }
    this.checkCache();
    return value;
  }
  /**
   * 缓存数据
   * @param key	键名
   * @param value	值
   * @param delay	缓存时长，单位：秒
   */
  async set(key, value, delay = 0) {
    if (!key) return;
    delay = delay || DEFAULT_TIME2;
    delay = delay > 0 ? delay : 0;
    const data = {
      last: delay > 0 ? Date.now() + delay * 1e3 : 0,
      data: value
    };
    await this.instance.setItem(key, data);
  }
  /** 移除缓存 */
  async remove(key) {
    if (!key) return;
    await this.instance.removeItem(key);
  }
  /** 清空缓存 */
  async clear() {
    this.instance.clear();
  }
  /** 所有缓存的键 */
  async keys() {
    return await this.instance.keys();
  }
  /** 缓存数量 */
  async length() {
    return await this.instance.length();
  }
  /** 检查并清除无效缓存 */
  async checkCache() {
    if (this.checkStatus) return;
    const cacheKey = "_last_cache_check";
    const last = await this.instance.getItem(cacheKey) || 0;
    const exp = Date.now() - 36e5;
    if (last > exp) return;
    this.checkStatus = true;
    const keys = await this.instance.keys();
    if (!hasArray(keys)) return;
    await Promise.all(keys.map((key) => this.get(key)));
    await this.instance.setItem(cacheKey, Date.now());
    this.checkStatus = false;
  }
};

export {
  cache_server_default,
  cache_client_default
};
