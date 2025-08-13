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
' 	事件总线事件
'
' 	name: eventBus
' 	create: 2023-05-12
' 	memo: 事件总线事件
' 	
' ------------------------------------------------------------
*/

import { hasArray, isFn, isString } from '../base';
import type { Action } from '../types';

/** 事件总线 */
export default class EventBus {
	/** 注册的事件 */
	readonly instance = new Map<string, Action[]>();

	/**
	 * 注册事件，名称如果已经存在则将被覆盖
	 * @param name 事件名称，忽略大小写
	 * @param action 事件
	 * @param duplicate 当注册相同事件时是否允许重复
	 * @param immediate 是否立即执行一次
	 */
	on = (name: string, event: Action, duplicate = false, immediate = false, ...args: any[]) => {
		if (!isString(name) || !name || !isFn(event)) return;

		name = name.toLowerCase();

		if (this.instance.has(name)) {
			const events = this.instance.get(name)!;

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
	off = (name: string, event?: Action) => {
		if (!isString(name) || !name) return;

		name = name.toLowerCase();
		if (!this.instance.has(name)) return;

		// 未设置，全部移除
		if (!event) this.instance.delete(name);

		// 无效函数，不处理
		if (!isFn(event)) return;

		const list = this.instance.get(name);
		if (!list) return;

		// 移除
		const index = list.indexOf(event);
		if (index > -1) list.splice(index, 1);

		// 无任何事件则移除此值
		if (!hasArray(list)) this.instance.delete(name);
	};

	/**
	 * 执行事件
	 * @param name 事件名称，忽略大小写
	 * @param args 提交参数
	 */
	emit = (name: string, ...args: any[]) => {
		if (!isString(name) || !name) return;

		name = name.toLowerCase();
		if (!this.instance.has(name)) return;

		const list = this.instance.get(name);
		list?.forEach((event) => event(...args));
	};
}

/** 创建总线事件 */
export const createEventBus = () => new EventBus();
