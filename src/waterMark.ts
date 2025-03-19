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
' 	水印
'
' 	name: lib.waterMark
' 	create: 2024-07-12
' 	memo: 水印
' 	
' ------------------------------------------------------------
*/

import { SERVERMODE } from '../config';
import { isFn } from './base';

export default (background: string | (() => string), interval = 5) => {
	if (SERVERMODE || !background) return;

	/** 验证水印框 */
	const validate = () => {
		const img = isFn(background) ? background() : background;
		if (!img) return;

		let el = document.body.querySelector('.dl-watermark') as HTMLDivElement;

		// 组件不存在
		if (!el) {
			el = document.createElement('div');
			el.classList.add('dl-watermark');
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
		el.style.backgroundPosition = '0 -100px';
		el.style.backgroundImage = img;
		el.style.opacity = '0.8';
	};

	validate();
	setInterval(validate, interval * 1000);
};
