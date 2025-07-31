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
 * 	页面相关操作
 *
 * 	file: page.ts
 * 	time: 2025-07-25 18:02:59
 *
 * ------------------------------------------------------------
 */

import { SERVERMODE } from '../config';
import { isFn, isString } from './base';
import { Dict } from './types';

/**
 * 设备屏幕类型
 * @param options 配置参数 宽度(desktop：桌面端最小宽度（含）；mobile：移动端最大宽度（含）)
 * @returns 设备屏幕类型
 */
export const screenType = (options?: { desktop: number; mobile: number }) => {
	if (SERVERMODE) return 'server';

	options = { desktop: options?.desktop || 1024, mobile: options?.mobile || 640 };

	if (window.innerWidth >= options.desktop) return 'desktop';
	if (window.innerWidth <= options.mobile) return 'mobile';
	return 'tablet';
};

/** 判断是否全屏 */
export const isFullscreen = () => {
	if (SERVERMODE) return false;

	return (
		// @ts-ignore
		document.webkitIsFullScreen ||
		// @ts-ignore
		document.mozFullScreen ||
		// @ts-ignore
		document.msFullscreenElement ||
		// @ts-ignore
		document.fullscreenElement ||
		(window.innerHeight === window.screen.height && window.innerWidth === window.screen.width)
	);
};

/** 执行操作 */
const _elementAction = (element: Dict, elementFunctionName: string) => {
	try {
		const fun = element[elementFunctionName];
		if (isFn(fun)) {
			fun();
			return true;
		}
	} catch {}

	return false;
};

/** 进入全屏 */
export const fullscreenLaunch = (element: Element | string) => {
	if (SERVERMODE) return false;

	let ele = isString(element) ? document.querySelector(element) : element;
	ele = ele || document.querySelector('#app') || document.body;
	if (!ele) return false;

	return (
		_elementAction(ele, 'requestFullscreen') ||
		_elementAction(ele, 'webkitRequestFullScreen') ||
		_elementAction(ele, 'msRequestFullscreen') ||
		_elementAction(ele, 'mozRequestFullScreen') ||
		_elementAction(ele, 'oRequestFullscreen')
	);
};

/** 退出全屏 */
export const fullscreenExit = () => {
	if (SERVERMODE) return false;

	return (
		_elementAction(document, 'exitFullscreen') ||
		_elementAction(document, 'webkitExitFullscreen') ||
		_elementAction(document, 'msExitFullscreen') ||
		_elementAction(document, 'mozCancelFullScreen') ||
		_elementAction(document, 'oCancelFullScreen')
	);
};

// // 不能在异步中执行,火狐将出错
// if (ele.requestFullscreen) return ele.requestFullscreen();
// if (ele.webkitRequestFullScreen) return ele.webkitRequestFullScreen();
// if (ele.msRequestFullscreen) return ele.msRequestFullscreen();
// if (ele.mozRequestFullScreen) return ele.mozRequestFullScreen();
// if (ele.oRequestFullscreen) return ele.oRequestFullscreen();

// 	if (document.exitFullscreen) return document.exitFullscreen();
// 	if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
// 	if (document.msExitFullscreen) return document.msExitFullscreen();
// 	if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
// 	if (document.oCancelFullScreen) return document.oCancelFullScreen();
