// src/LRU.ts
var lruValue = class {
  /** 构造,超时设置为 0 时,永不到期 时间单位:秒 */
  constructor(key, value, exp) {
    this.key = key;
    this.value = value;
    this.exp = exp && exp > 0 ? Date.now() + exp * 1e3 : 0;
    this.prev = void 0;
    this.next = void 0;
  }
  /** 更新值 */
  update(value, exp) {
    this.value = value;
    this.exp = exp && exp > 0 ? Date.now() + exp * 1e3 : 0;
  }
  // 是否到期
  isExp() {
    if (this.exp && this.exp > 0) {
      return Date.now() >= this.exp;
    } else {
      return false;
    }
  }
};
var LRU = class {
  /**
   * 构造
   * @param capacity	最大元素数量
   */
  constructor(capacity = 100) {
    /** 缓存的键 */
    this.datas = /* @__PURE__ */ new Map();
    /** 最大缓存数量 */
    this.capacity = 100;
    this.capacity = capacity || 10;
  }
  /** 获取缓存，不存在返回 undefined */
  get(key) {
    if (!key) return;
    const item = this.datas.get(key);
    if (item === void 0) return;
    if (item.isExp()) {
      this._checkSize();
      return;
    }
    this._updateItem(item);
    return item.value;
  }
  /**
   * 获取缓存
   * @param key	缓存键
   * @param value	缓存内容
   * @param exp	超时时长 单位:秒，0 为永不到期
   */
  set(key, value, exp) {
    if (!key) return;
    let item = this.datas.get(key);
    if (item) {
      item.update(value, exp);
    } else {
      this._checkSize();
      item = new lruValue(key, value, exp);
      this.datas.set(key, item);
    }
    this._updateItem(item);
  }
  /** 移除缓存 */
  remove(key) {
    if (!key) return;
    const item = this.datas.get(key);
    if (item === void 0) return;
    this._remove(item);
  }
  /** 是否存在缓存键 */
  has(key) {
    if (!key) return false;
    return this.datas.has(key);
  }
  /** 清除所有缓存 */
  clear() {
    this.datas.clear();
    this.head = void 0;
    this.tail = void 0;
  }
  /** 所有缓存的键 */
  keys() {
    return this.datas.keys();
  }
  /** 缓存数量 */
  length() {
    return this.datas.size;
  }
  /** 强制清除到期缓存 */
  trim() {
    for (const item of this.datas.values()) {
      if (item.isExp()) this._remove(item);
    }
  }
  /** 更新调整位置，将新数据移动到尾部 */
  _updateItem(item) {
    if (!this.tail) {
      this.head = this.tail = item;
      return;
    }
    if (this.tail === item) {
      return;
    }
    let prev = item.prev;
    let next = item.next;
    if (prev && next) {
      prev.next = next;
      next.prev = prev;
      item.next = void 0;
    }
    if (!prev && next) {
      next.prev = void 0;
      this.head = next;
    }
    this.tail.next = item;
    item.prev = this.tail;
    this.tail = item;
    item.next = void 0;
  }
  /** 移除最近最少使用节点 */
  _checkSize() {
    var _a;
    if (this.length() < this.capacity) return;
    this.trim();
    const num = this.length();
    if (num === 0) {
      this.head = void 0;
      this.tail = void 0;
    }
    if (num < this.capacity) return;
    let target = this.head;
    let next = (_a = this.head) == null ? void 0 : _a.next;
    if (next) {
      next.prev = void 0;
      this.head = next;
    } else {
      this.head = void 0;
      this.tail = void 0;
    }
    this.datas.delete(target.key);
  }
  /** 强制移除 */
  _remove(item) {
    const prev = item.prev;
    const next = item.next;
    if (next && prev) {
      next.prev = prev;
      prev.next = next;
    } else if (next && !prev) {
      this.head = next;
      next.prev = void 0;
    } else if (!next && prev) {
      this.tail = prev;
      prev.next = void 0;
    }
    this.datas.delete(item.key);
  }
};

export {
  LRU
};
