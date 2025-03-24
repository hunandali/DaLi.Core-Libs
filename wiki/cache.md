# 缓存模块 (cache)

缓存模块提供了统一的缓存操作接口，包括客户端缓存和服务器端缓存实现。客户端使用 localForage 实现本地存储，服务器端使用内存缓存实现。

## 缓存接口

### get

获取缓存数据。

```typescript
function get<T>(
	key: string, // 缓存键名
	valueFunc?: () => T, // 当值不存在时的回调函数
	delay?: number // 缓存时长(秒)
): Promise<T>;
```

### set

设置缓存数据。

```typescript
function set<T>(
	key: string, // 缓存键名
	value: T, // 缓存值
	delay?: number // 缓存时长(秒)
): Promise<void>;
```

### remove

移除缓存数据。

```typescript
function remove(key: string): Promise<void>;
```

### clear

清空所有缓存数据。

```typescript
function clear(): Promise<void>;
```

### keys

获取所有缓存键名。

```typescript
function keys(): Promise<string[]>;
```

### length

获取缓存数量。

```typescript
function length(): Promise<number>;
```

## 客户端缓存

客户端缓存基于 localForage 实现，提供了持久化的本地存储功能。

### 特点

1. 使用 localForage 实现本地存储
2. 支持数据过期时间设置
3. 自动清理过期数据
4. 异步操作接口

### 使用示例

```typescript
import { cache } from '@da.li/core-libs';

// 设置缓存
await cache.set('user', { name: '张三', age: 20 }, 3600); // 缓存1小时

// 获取缓存
const user = await cache.get('user');
console.log(user); // { name: '张三', age: 20 }

// 获取缓存，值不存在时通过函数获取
const data = await cache.get(
	'api-data',
	async () => {
		const response = await fetch('https://api.example.com/data');
		return response.json();
	},
	3600
);

// 移除缓存
await cache.remove('user');

// 清空所有缓存
await cache.clear();

// 获取所有缓存键名
const keys = await cache.keys();
console.log(keys);

// 获取缓存数量
const count = await cache.length();
console.log(count);
```

## 服务器端缓存

服务器端缓存使用内存缓存实现，基于 LRU (最近最少使用) 算法。

### 特点

1. 使用 LRU 算法管理缓存
2. 默认最大缓存 10000 个项目
3. 支持数据过期时间设置
4. 高性能内存缓存

### 使用示例

```typescript
import { cache } from '@da.li/core-libs';

// 设置缓存
await cache.set('config', { theme: 'dark' }, 3600); // 缓存1小时

// 获取缓存
const config = await cache.get('config');
console.log(config); // { theme: 'dark' }

// 获取缓存，值不存在时通过函数获取
const data = await cache.get(
	'db-data',
	async () => {
		const result = await db.query('SELECT * FROM users');
		return result;
	},
	3600
);

// 移除缓存
await cache.remove('config');

// 清空所有缓存
await cache.clear();
```

## 特点说明

1. **统一接口**：客户端和服务器端使用相同的接口
2. **类型支持**：完整的 TypeScript 类型定义
3. **异步操作**：所有操作都返回 Promise
4. **过期管理**：支持设置数据过期时间
5. **自动清理**：客户端自动清理过期数据
6. **高性能**：服务器端使用 LRU 算法优化性能
