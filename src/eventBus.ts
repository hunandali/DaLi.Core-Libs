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

import { $Global, hasArray, isFn, isString, debounce } from './base';
import { SERVERMODE, DEBOUNCE_WINDOW_RESIZE } from '../config';

import type { Action } from './types';

/** 全局类型申明 */
declare global {
	/**
	 * 注册事件，名称如果已经存在则将被覆盖
	 * @param name 事件名称，忽略大小写
	 * @param action 事件
	 */
	var $on: eventBus['on'];

	/**
	 *
	 * @param name 事件名称，忽略大小写
	 * @param event 要移除的事件，不设置则所有都移除
	 */
	var $off: eventBus['off'];

	/**
	 * 执行事件
	 * @param name 事件名称，忽略大小写
	 * @param args 提交参数
	 */
	var $emit: eventBus['emit'];

	/** 窗口大小调整事件 */
	var $resize: {
		/** 注册 */
		register: () => void;

		/** 注销 */
		unregister: () => void;

		/** 添加事件 */
		on: (event: Action, immediate: boolean, ...args: any[]) => void;

		/** 移除事件 */
		off: (event: Action) => void;

		/** 强制执行 */
		execute: () => void;
	};
}

/** 事件总线 */
export default class eventBus {
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

/** 全局挂载 */
if (!$Global.$on) {
	/** 全局默认事件总线 */
	const defaultEvents = new eventBus();

	/** 窗口调整事件, 最小 100ms 防抖 */
	const resizeEvent = debounce(
		() => !SERVERMODE && defaultEvents.emit('window:resize'),
		DEBOUNCE_WINDOW_RESIZE < 100 ? 100 : DEBOUNCE_WINDOW_RESIZE,
		false
	);

	/** 注册事件 */
	$Global.$on = defaultEvents.on;

	/** 移除事件 */
	$Global.$off = defaultEvents.off;

	/** 执行事件 */
	$Global.$emit = defaultEvents.emit;

	/** 窗口尺寸调整事件,仅客户端生效 */
	$Global.$resize = {
		/** 注册 */
		register: () => !SERVERMODE && window.addEventListener('resize', resizeEvent),

		/** 注销 */
		unregister: () => !SERVERMODE && window.removeEventListener('resize', resizeEvent),

		/** 添加 */
		on: (event: Action, immediate = false, ...args) => {
			!SERVERMODE && defaultEvents.on('window:resize', event, false, immediate, args);
		},

		/** 移除 */
		off: (event: Action) => !SERVERMODE && defaultEvents.off('window:resize', event),

		/** 强制执行 */
		execute: () => !SERVERMODE && resizeEvent()
	};
}
