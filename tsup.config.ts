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
 * 	打包配置
 *
 * 	file: tsup.config.ts
 * 	time: 2025-08-13 10:34:09
 *
 * ------------------------------------------------------------
 */

import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: {
			index: 'src/index.ts',
			base: 'src/index_base.ts',
			limit: 'src/index_limit.ts',
			global: 'src/index_all.ts',
			cache: 'src/cache/global.ts',
			eventBus: 'src/eventBus/global.ts',
			console: 'src/console/global.ts'
		},
		format: ['esm', 'cjs'],
		dts: true,
		splitting: true,
		clean: true,
		minify: false,
		sourcemap: false
	}
]);
