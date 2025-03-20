# @da.li/core-libs

大沥网络公共函数库，提供了一系列常用的工具函数和组件。

## 安装

```bash
npm install @da.li/core-libs
# 或者
yarn add @da.li/core-libs
```

## 功能模块

### base - 基础工具函数

#### array - 数组操作

-   `compare`: 数组元素大小比较函数，支持自定义比较字段
-   `sort`: 数组排序，支持多字段排序和自定义排序规则

#### string - 字符串处理

-   `template`: 字符串模板替换，支持自定义替换规则
-   `trim`: 字符串修剪，支持自定义修剪字符

#### type - 类型判断

-   提供多种类型判断函数：isNumber、isString、isArray、isObject 等
-   支持中文、英文、URL、Email、手机号等格式验证

### encrypt - 加密相关

#### base64 - Base64 编码解码

```typescript
import { encrypt } from '@da.li/core-libs';

// 编码
const encoded = encrypt.base64Encode('Hello World');
// 解码
const decoded = encrypt.base64Decode(encoded);
```

### files - 文件处理

#### excel - Excel 文件处理

```typescript
import { files } from '@da.li/core-libs';

// 导出 JSON 数据到 Excel
files.excel.exportJson(
	[
		{ name: '张三', age: 25 },
		{ name: '李四', age: 30 }
	],
	'users.xlsx',
	'用户列表'
);
```

### formValidate - 表单验证

支持多种验证规则：

-   必填项验证
-   数值范围验证
-   字符串长度验证
-   日期范围验证
-   常用格式验证（URL、Email、手机号等）

```typescript
import { formValidate } from '@da.li/core-libs';

const rules = {
	name: { required: true, minLength: 2, maxLength: 20 },
	email: { type: 'email', required: true },
	age: { type: 'number', min: 0, max: 150 }
};

const isValid = formValidate.validate(rules, formData);
```

### waterMark - 水印功能

在页面上添加自定义水印：

```typescript
import { waterMark } from '@da.li/core-libs';

// 添加水印
waterMark('url("data:image/svg+xml;base64,...")', 5); // 第二个参数为刷新间隔（秒）
```

## 开发环境

-   Node.js >= 14.0.0
-   TypeScript >= 4.0.0

## 贡献指南

1. Fork 本仓库
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request

## 许可证

MIT License © 2024 湖南大沥网络科技有限公司
