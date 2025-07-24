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
import { dateFormat, hasArray, hasObject, isString } from './base';
import { NVs } from './types';

/** 获取浏览器自动样式 */
export function UIThemeQuery(options?: {
	/** 自动切换开始时间 */
	start: number;
	/** 自动切换结束时间 */
	end: number;
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

		// 从页面顶级样式获取(unocss theme 插件 <html class="dark" />)
		const root = document.documentElement;
		if (root.classList.contains('dark')) return 'dark';
		if (root.classList.contains('light')) return 'light';

		// 从页面顶级 data-theme 中获取（bootstrap 方式 <html data-theme="dark" />）
		const theme = root.dataset.theme;
		if (theme) return theme;
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
 */
export function UIThemeSet(theme: 'light' | 'dark') {
	if (SERVERMODE) return;

	// 客户端，设置顶级样式
	// 从页面顶级样式 (unocss theme 插件 <html class="dark" />)
	// 从页面顶级 data-theme 中设置（bootstrap 方式 <html data-theme="dark" />）
	const root = document.documentElement;
	root.classList.contains('dark') && root.classList.remove('dark');
	root.classList.contains('light') && root.classList.remove('light');
	root.classList.add(theme);

	root.dataset.theme = theme;
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

		const texts = `${info},${dateFormat('', 'YYYY-MM-DD')}`
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
