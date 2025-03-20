/*
' ------------------------------------------------------------
'
' 	Copyright © 2022 湖南大沥网络科技有限公司.
'
' 	  author:	木炭(WOODCOAL)
' 	   email:	i@woodcoal.cn
' 	homepage:	http://www.hunandali.com/
'
' ------------------------------------------------------------
'
' 	LRU 缓存
'
' 	name: LRU
' 	create: 2023-11-02
' 	memo: 操作则移到队列，数据满则移除队尾
'		  https://github.com/jin5354/axios-cache-plugin/blob/master/src/lru.js
' 	
' ------------------------------------------------------------
*/

/** LRU 数据结构 */
class lruValue {
	/** 缓存键 */
	key: string;

	/** 缓存值 */
	value: any;

	/** 超时时长,单位:秒 */
	exp: number;

	/** 上一个元素 */
	prev: lruValue | undefined;

	/** 下一个元素 */
	next: lruValue | undefined;

	/** 构造,超时设置为 0 时,永不到期 时间单位:秒 */
	constructor(key: string, value: any, exp: number) {
		this.key = key;
		this.value = value;
		this.exp = exp && exp > 0 ? Date.now() + exp * 1000 : 0;
		this.prev = undefined;
		this.next = undefined;
	}

	/** 更新值 */
	update(value: any, exp: number) {
		this.value = value;
		this.exp = exp && exp > 0 ? Date.now() + exp * 1000 : 0;
	}

	// 是否到期
	isExp() {
		if (this.exp && this.exp > 0) {
			return Date.now() >= this.exp;
		} else {
			return false;
		}
	}
}

/** LRU 操作 */
export default class LRU {
	/** 缓存的键 */
	datas = new Map<string, lruValue>();

	/** 最大缓存数量 */
	capacity = 100;

	/** 头部元素 */
	private head: lruValue | undefined;

	/** 尾部元素 */
	private tail: lruValue | undefined;

	/**
	 * 构造
	 * @param capacity	最大元素数量
	 */
	constructor(capacity: number = 100) {
		this.capacity = capacity || 10;
	}

	/** 获取缓存，不存在返回 undefined */
	get(key: string) {
		if (!key) return;

		const item = this.datas.get(key);
		if (item === undefined) return;

		// 到期，检查大小
		if (item.isExp()) {
			this._checkSize();
			return;
		}

		// 调整位置
		this._updateItem(item);
		return item.value;
	}

	/**
	 * 获取缓存
	 * @param key	缓存键
	 * @param value	缓存内容
	 * @param exp	超时时长 单位:秒，0 为永不到期
	 */
	set(key: string, value: any, exp: number) {
		if (!key) return;
		let item = this.datas.get(key);

		// 已经存在，修改参数
		if (item) {
			item.update(value, exp);
		} else {
			// 检查缓存尺寸
			this._checkSize();

			// 直接添加
			item = new lruValue(key, value, exp);
			this.datas.set(key, item);
		}

		this._updateItem(item);
	}

	/** 移除缓存 */
	remove(key: string) {
		if (!key) return;
		const item = this.datas.get(key);
		if (item === undefined) return;

		this._remove(item);
	}

	/** 是否存在缓存键 */
	has(key: string) {
		if (!key) return false;
		return this.datas.has(key);
	}

	/** 清除所有缓存 */
	clear() {
		this.datas.clear();
		this.head = undefined;
		this.tail = undefined;
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
		// 移除所有到期数据
		for (const item of this.datas.values()) {
			// 到期移动
			if (item.isExp()) this._remove(item);
		}
	}

	/** 更新调整位置，将新数据移动到尾部 */
	private _updateItem(item: lruValue) {
		// 添加的第一个元素。初始化 head 和 tail
		if (!this.tail) {
			this.head = this.tail = item;
			return;
		}
		// 该元素本就是 tail，不变。
		if (this.tail === item) {
			return;
		}
		let prev = item.prev;
		let next = item.next;

		// 该元素在中间，移除，修正前后节点
		if (prev && next) {
			prev.next = next;
			next.prev = prev;
			item.next = undefined;
		}

		// 该元素是 head，放到最后面。head 更新
		if (!prev && next) {
			next.prev = undefined;
			this.head = next;
		}

		// 更新 tail
		this.tail.next = item;
		item.prev = this.tail;
		this.tail = item;
		item.next = undefined;
	}

	/** 移除最近最少使用节点 */
	private _checkSize() {
		if (this.length() < this.capacity) return;

		this.trim();

		// 如果仍然超量则移除头部数据
		const num = this.length();

		// 无数据则清除头尾数据
		if (num === 0) {
			this.head = undefined;
			this.tail = undefined;
		}

		if (num < this.capacity) return;

		let target = this.head;
		let next = this.head?.next;
		if (next) {
			next.prev = undefined;
			this.head = next;
		} else {
			this.head = undefined;
			this.tail = undefined;
		}

		this.datas.delete(target!.key);
	}

	/** 强制移除 */
	private _remove(item: lruValue) {
		const prev = item.prev;
		const next = item.next;

		if (next && prev) {
			// 中间数据
			next.prev = prev;
			prev.next = next;
		} else if (next && !prev) {
			// 头部数据
			this.head = next;
			next.prev = undefined;
		} else if (!next && prev) {
			// 尾部数据
			this.tail = prev;
			prev.next = undefined;
		}

		this.datas.delete(item!.key);
	}
}
