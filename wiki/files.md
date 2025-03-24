# 文件操作模块 (files)

文件操作模块提供了一系列文件处理功能，包括 Excel 导出、JSON 文件操作和二维码生成等功能。

## Excel 导出

提供了将数据导出为 Excel 文件的功能，支持从 JSON 数据或 HTML 表格导出。

### exportJson

通过 JSON 数据导出 Excel 文件。

```typescript
function exportJson(
	data: any, // 要导出的 JSON 数据
	fileName: string, // 导出文件名
	title: string, // 工作区标题
	filter?: string[] // 过滤字段
): void;
```

### exportTable

通过 HTML 表格内容导出 Excel 文件。

```typescript
function exportTable(
	tableHtml: string, // 要导出的表格内容(HTML 代码)
	fileName: string, // 导出文件名
	title: string // 工作区标题
): void;
```

### 使用示例

```typescript
// 导出 JSON 数据
const data = [
	{ name: '张三', age: 20 },
	{ name: '李四', age: 25 }
];
exportJson(data, '用户列表', '用户信息');

// 导出表格
const html = `
<table>
    <tr><td>姓名</td><td>年龄</td></tr>
    <tr><td>张三</td><td>20</td></tr>
    <tr><td>李四</td><td>25</td></tr>
</table>
`;
exportTable(html, '用户列表', '用户信息');
```

## JSON 文件

提供了 JSON 文件的下载功能。

### download

下载 JSON 数据为文件。系统将先尝试将 JSON 字符串反序列化为对象，无法反序列化的 JSON 将无法下载。

```typescript
function download(
	json: string, // JSON 字符串
	fileName?: string // 文件名，默认为"结果"
): void;
```

### downloadObject

将对象数据转换成 JSON 后下载。

```typescript
function downloadObject(
	obj: any, // 要下载的数据
	fileName?: string // 文件名，默认为"结果"
): void;
```

### 使用示例

```typescript
// 下载 JSON 字符串
const jsonStr = '{"name":"张三","age":20}';
download(jsonStr, '用户信息');

// 下载对象数据
const data = { name: '张三', age: 20 };
downloadObject(data, '用户信息');
```

## 二维码生成

提供了二维码生成功能，基于 uQRCode 实现。

### IQR

二维码生成参数接口。

```typescript
interface IQR {
	code: string; // 二维码内容
	size?: number; // 尺寸，默认 200
	level?: string; // 纠错等级，可选值：L、M、Q、H，默认 H
	color?: string; // 前景色
	backColor?: string; // 背景色
	logo?: string; // Logo 图片路径
}
```

### QRCreate

创建二维码图片。

```typescript
function QRCreate(params: IQR): string; // 返回 SVG 图片内容
```

### QRObject

创建 QR 对象，用于进一步处理。

```typescript
function QRObject(params: IQR): any; // 返回 uQRCode 实例
```

### 使用示例

```typescript
// 创建二维码图片
const svg = QRCreate({
	code: 'https://www.example.com',
	size: 300,
	level: 'H',
	color: '#000000',
	backColor: '#FFFFFF',
	logo: '/logo.png'
});

// 创建 QR 对象
const qr = QRObject({
	code: 'https://www.example.com',
	size: 300
});
```

## 特点说明

1. **Excel 导出**：支持从 JSON 数据和 HTML 表格导出 Excel 文件
2. **JSON 处理**：提供 JSON 文件下载功能，支持字符串和对象格式
3. **二维码生成**：基于 uQRCode 实现，支持自定义样式和 Logo
4. **类型支持**：完整的 TypeScript 类型定义
5. **易用性**：API 设计简洁，使用方便
6. **可扩展**：模块化设计，易于扩展新功能
