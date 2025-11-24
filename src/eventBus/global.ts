/*
 * ------------------------------------------------------------
 *
 * 	Copyright © 2025 湖南大沥网络科技有限公司.
 *
 * 	  author: 木炭
 * 	   email: woodcoal@qq.com
 * 	homepage: http://www.hunandali.com/
 *
 * ------------------------------------------------------------
 *
 * 	全局事件总线
 *
 * 	name: eventBus
 * 	create: 2025-08-13
 * 	memo: 全局事件总线
 *
 * ------------------------------------------------------------
 */

import { $Global, debounce } from '../base';
import { SERVERMODE, DEBOUNCE_WINDOW_RESIZE } from '../../config';
import eventBus from '.';
import { Action } from '../types';

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
/** 全局默认事件总线 */
const defaultEvents = new eventBus();

/** 全局挂载 */
if (!$Global.$on) {
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

export default defaultEvents;
