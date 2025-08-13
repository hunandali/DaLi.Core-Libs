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
' 	主题样式
'
' 	name: theme
' 	create: 2025-07-24
' 	memo: 浏览器主题样式操作
' 	
' ------------------------------------------------------------
*/

import dayjs from 'dayjs';
import { SERVERMODE } from '../config';
import { cleanDuplicate, hasArray, hasObject, isArray, isObject, isString } from './base';
import { NVs } from './types';

/** 获取浏览器自动样式 */
export function UIThemeQuery(options?: {
	/** 深色与浅色模式自动切换开始时间 */
	start: number;

	/** 深色与浅色模式自动切换结束时间 */
	end: number;

	/** 默认支持的主题，不论是否设置都包含 'dark' 和 'light'，主要用于从 class 中获取样式类型 */
	defaultThemes?: string[];
}) {
	// 客户端
	if (!SERVERMODE) {
		// 检测系统颜色主题（浏览器参数）
		if (typeof window !== 'undefined') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
			if (prefersDark.matches) return 'dark';

			const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
			if (prefersLight.matches) return 'light';
		}

		let defaultThemes = options?.defaultThemes || [];
		!hasArray(defaultThemes) && (defaultThemes = []);
		!defaultThemes.includes('dark') && defaultThemes.push('dark');
		!defaultThemes.includes('light') && defaultThemes.push('light');

		// 从指定元素中获取样式数据
		function getTheme(el: HTMLElement) {
			// 从元素 data-theme 中获取（bootstrap 方式 <html data-theme="dark" />）
			const theme = el.dataset.theme;
			if (theme) return theme;

			// 从元素样式获取(unocss theme 插件 <html class="dark" />)
			const classList = el.classList;
			return defaultThemes.find((item) => classList.contains(item));
		}

		const theme = getTheme(document.documentElement) || getTheme(document.body);
		if (!theme) return theme;
	}

	// 服务端渲染或者无法自动获取到样式时使用时间判断
	const hour = new Date().getHours();
	const start = options?.start || 6;
	const end = options?.end || 18;
	return hour > start && hour <= end ? 'light' : 'dark';
}

/**
 * 设置浏览器样式
 * 从 html 根节点调整样式
 * @param theme 主题
 * @param el 样式元素，默认 html 根节点
 * @param defaultClass 节点默认样式类名
 */
export function UIThemeSet(
	theme: 'light' | 'dark' | string,
	el?: HTMLElement,
	defaultClass?: string
) {
	if (SERVERMODE) return;

	theme = theme || 'light';
	el = el || document.documentElement;

	// 客户端，设置顶级样式

	// 从页面顶级样式 (unocss theme 插件 <html class="dark" />)
	defaultClass && (el.className = defaultClass);
	el.classList.add(theme);

	// 从页面顶级 data-theme 中设置（bootstrap 方式 <html data-theme="dark" />）
	el.dataset.theme = theme;
}

/**
 * 重要日期样式变灰
 * @param days 日期，日期组，{日期：水印文本}。如果日期为长日期比较当天，短日期每年比较。如果水印文本以 * 开头，页面变灰。
 */
export const createImportantStyle = (days: string | string[] | NVs) => {
	if (!days || SERVERMODE) return;

	// 分析原始日期数据
	// 字符转数组
	if (isString(days)) days = (days as string).split(',');

	// 数组转对象
	if (hasArray(days)) {
		const list: NVs = {};

		(days as string[]).forEach((day) => {
			day = day.trim();
			day && (list[day] = '');
		});

		days = list;
	}

	// 无对象数据不处理
	if (!hasObject(days)) return;

	const day = Object.keys(days).find((day) => {
		// 调整日期格式
		if (day.length < 8) day = `${new Date().getFullYear()}-${day}`;

		// 是否今天
		return dayjs().isSame(day, 'day');
	});

	// 非今天
	if (!day) return;

	// 信息
	let info = (days as NVs)[day];

	// 背景
	let background = '';
	if (isString(info) && info !== '') {
		// * 开头，页面变灰
		if (info.startsWith('*')) {
			info = info.slice(1);

			document.body.style.webkitFilter = 'grayscale(100%)';
			document.body.style.filter = 'grayscale(100%)';
		}

		const img = (text: string, size: number, top: number) => {
			return `%3Ctext x='0' y='${top}%25' font-size='${size}' text-anchor='left' transform='rotate(-25)' opacity='0.06' font-weight='500' dominant-baseline='middle'%3E${text}%3C/text%3E`;
		};

		const texts = `${info},${new Date().toLocaleDateString('en-CA')}`
			.replace(/[\;\:；：，]/g, ',')
			.split(',')
			.filter((text) => !!text);

		let size = 32;
		let top = 48;
		for (let index = 0; index < texts.length; index++) {
			const text = texts[index];
			if (!text) continue;

			background += img(text, size, top);

			index < 1 && (top += 5);
			size = 18;
			top += 8;
		}

		background = `url("data:image/svg+xml,%3Csvg width='375' height='360' xmlns='http://www.w3.org/2000/svg'%3E${background}%3C/svg%3E")`;
	}

	let el = document.body.querySelector('.dl-global-style') as HTMLDivElement;

	// 组件不存在
	if (!el) {
		el = document.createElement('div');
		el.classList.add('dl-global-style');
		document.body.appendChild(el);
	}

	el.style.pointerEvents = 'none';
	el.style.position = 'fixed';
	el.style.zIndex = '999999999999999999';
	el.style.left = '0';
	el.style.top = '0';
	el.style.width = '100vw';
	el.style.height = '100vh';
	el.style.backgroundRepeat = 'repeat';
	el.style.backgroundPosition = 'center top';
	el.style.backgroundImage = background;
};

/** 样式类名类型 */
export type ClassName = string | boolean | undefined | string[] | Record<string, boolean>;

/** 合并样式中的类名，自动移除重复类名、空值 */
export const mergeClass = (...classNames: ClassName[]) => {
	let result: string[] = [];

	for (const className of classNames) {
		if (isString(className)) {
			result.push(className);
		} else if (isArray(className)) {
			result.push(...className);
		} else if (isObject(className)) {
			for (const key in className) {
				if (className[key]) result.push(key);
			}
		}
	}

	if (result.length < 1) return result;

	// 转成文本后转数组，过滤重复内容
	result = result
		.join('|')
		.replace(/\s+/g, '|')
		.trim()
		.split('|')
		.filter((x) => !!x);

	return cleanDuplicate(result);
};
