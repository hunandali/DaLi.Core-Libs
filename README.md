# 大沥网络函数库 (@da.li/core-libs)

[![NPM version](https://img.shields.io/npm/v/@da.li/core-libs.svg?style=flat)](https://npmjs.org/package/@da.li/core-libs)
[![NPM downloads](https://img.shields.io/npm/dm/@da.li/core-libs.svg?style=flat)](https://npmjs.org/package/@da.li/core-libs)

大沥网络函数库是大沥网络提供的一个公共 TypeScript 函数库，封装了基础操作、缓存、加密、文件处理、HTTP 请求等常用功能模块，旨在提高开发效率。

## 安装

你可以使用 npm 或 yarn 来安装 `@da.li/core-libs`：

```bash
npm install @da.li/core-libs
# 或者
yarn add @da.li/core-libs
```

## 功能模块

-   [基础工具函数 (base)](./wiki/base/index.md)
    -   [数组操作 (array)](./wiki/base/array.md)
    -   [颜色处理 (color)](./wiki/base/color.md)
    -   [数字操作 (number)](./wiki/base/number.md)
    -   [对象操作 (object)](./wiki/base/object.md)
    -   [字符串处理 (string)](./wiki/base/string.md)
    -   [树形结构 (treeList)](./wiki/base/treeList.md)
    -   [类型判断 (type)](./wiki/base/type.md)
    -   [工具函数 (utils)](./wiki/base/utils.md)
    -   [值比较 (value)](./wiki/base/value.md)
-   [缓存 (cache)](./wiki/cache/index.md)
-   [控制台 (console)](./wiki/console.md)
-   [加密 (encrypt)](./wiki/encrypt/index.md)
    -   [Base64 编码解码](./wiki/encrypt/base64.md)
    -   [MD5 加密](./wiki/encrypt/md5.md)
-   [事件总线 (eventBus)](./wiki/eventBus.md)
-   [文件处理 (files)](./wiki/files/index.md)
    -   [Excel 处理](./wiki/files/excel.md)
    -   [JSON 处理](./wiki/files/json.md)
    -   [二维码生成](./wiki/files/qr.md)
-   [表单验证 (formValidate)](./wiki/formValidate.md)
-   [HTTP 请求 (http)](./wiki/http/index.md)
-   [LRU 缓存 (LRU)](./wiki/LRU.md)
-   [水印 (waterMark)](./wiki/waterMark.md)

## 注意事项

### 全局对象

`$console`，`$cache`，`$on, $off, $emit` 等全局对象已经从默认导入中移除，如需加载就使用请自行导入。

1. 按需导入：

```typescript
// $con 控制台输出
import '@da.li/core-libs/console';

// $cache 缓存
import '@da.li/core-libs/cache';

// $on, $off, $emit 事件总线
import '@da.li/core-libs/eventBus';
```

2. 一次性全部导入：

```typescript
import '@da.li/core-libs/global';
```

### 导入调整

为了避免全局对象的污染，我们将全局对象的导入方式调整为按需导入。

```typescript
// 全局基础导入，不含第三发库，不含初始启动的全局对象
// 仅常用的基础函数，不含：缓存、定时任务、http 请求
import { xxx } from '@da.li/core-libs/base';

// 全局基础导入，不含第三发库，不含初始启动的全局对象
// 相比 base 模块，包含：缓存、定时任务、http 请求
import { xxx } from '@da.li/core-libs/limit';

// 默认导入方式，含第三发库，不含初始启动的全局对象
// 相比 limit 模块，包含了第三发库的引用，如：dayjs
import { xxx } from '@da.li/core-libs';

// 全量导入方式，包含所有功能模块，含初始启动的全局对象
import { xxx } from '@da.li/core-libs/global';
```

## 许可证

MIT License © 2024 湖南大沥网络科技有限公司
