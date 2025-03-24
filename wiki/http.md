# HTTP 请求模块 (http)

HTTP 请求模块提供了一个功能强大的 HTTP 客户端，支持请求拦截、缓存管理、文件上传下载等功能，同时提供了专门的 API 接口处理机制。

## 全局变量

### $http

全局 HTTP 客户端实例，提供基础的 HTTP 请求功能和扩展方法。

```typescript
interface $Http extends $Fetch {
	/** 运行配置 */
	runtime: HttpRuntime;

	/** 带缓存的 HTTP 请求 */
	cache: <T = any, R extends ResponseType = 'json'>(
		request: HttpRequest,
		options?: HttpCacheOptions<R>
	) => Promise<MappedResponseType<R, T>>;

	/** GET 请求 */
	GET: HttpFetch;
	/** POST 请求 */
	POST: HttpFetch;
	/** PUT 请求 */
	PUT: HttpFetch;
	/** PATCH 请求 */
	PATCH: HttpFetch;
	/** DELETE 请求 */
	DELETE: HttpFetch;
	/** 表单提交 */
	FORM: HttpFetch;

	/** 文件上传 */
	upload: (files: any, request: HttpRequest, options?: HttpOptions) => Promise<any>;
	/** 文件下载 */
	download: (request: HttpRequest, options?: HttpOptions) => Promise<any>;
	/** API 接口请求 */
	api: (api: ApiData) => Promise<any>;
}
```

## 请求配置

### HttpOptions

请求配置选项，用于自定义请求行为。

```typescript
interface HttpOptions<R extends ResponseType = ResponseType, T = any> {
	/** 认证令牌 */
	token?: TokenContent;
	/** API 权限验证开关 */
	auth?: boolean;
	/** 自动登录开关 */
	autoLogin?: boolean;
	/** ID 转换开关 */
	convert?: boolean;
	/** 错误提示方式 */
	alert?: AlertNotifyMode;
	/** Base64 编码字段 */
	encode?: string[];
}
```

### HttpCacheOptions

缓存请求配置选项，继承自 HttpOptions。

```typescript
interface HttpCacheOptions<R extends ResponseType = ResponseType, T = any>
	extends HttpOptions<R, T> {
	/** 缓存时长(毫秒) */
	cacheTime?: number | false;
	/** 是否缓存异常 */
	cacheError?: boolean;
}
```

## 使用示例

### 基础请求

```typescript
// GET 请求
await $http.GET('/api/data');

// POST 请求
await $http.POST('/api/create', { name: 'test' });

// 自定义请求
await $http('/api/data', {
	method: 'GET',
	params: { id: 1 },
	token: 'xxx',
	auth: true
});
```

### 缓存请求

```typescript
// 带缓存的请求
await $http.cache('/api/data', {
	cacheTime: 5000, // 缓存5秒
	cacheError: false // 不缓存错误
});
```

### 文件操作

```typescript
// 文件上传
await $http.upload(files, '/api/upload', {
	onUploadProgress: (progress) => {
		console.log('Upload progress:', progress);
	}
});

// 文件下载
await $http.download('/api/download', {
	onDownloadProgress: (progress) => {
		console.log('Download progress:', progress);
	}
});
```

### API 接口

```typescript
// API 接口请求
await $http.api({
	url: '/api/data',
	method: 'GET',
	params: { id: 1 }
});
```

## 特点说明

1. **全局可用**：HTTP 客户端实例挂载在全局作用域，可以在任何地方使用
2. **请求拦截**：支持请求和响应拦截器，可以统一处理认证、错误等
3. **缓存管理**：内置缓存机制，支持自定义缓存时长和错误处理
4. **文件处理**：提供专门的文件上传下载接口，支持进度监控
5. **类型支持**：完整的 TypeScript 类型定义，提供良好的开发体验
6. **错误处理**：统一的错误处理机制，支持自定义错误提示
7. **权限控制**：支持 API 权限验证和自动登录
8. **数据转换**：支持大数字 ID 转换和 Base64 编码
