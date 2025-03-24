# LRU 缓存 (LRU)

LRU (Least Recently Used) 缓存模块实现了一个基于最近最少使用原理的缓存机制。当缓存达到容量上限时，会优先移除最久未使用的数据。

## 类说明

### lruValue

内部类，用于存储缓存项的数据结构。

```typescript
class lruValue {
	key: string; // 缓存键
	value: any; // 缓存值
	exp: number; // 超时时长（秒）
	prev: lruValue; // 上一个元素
	next: lruValue; // 下一个元素
}
```

### LRU

主类，提供 LRU 缓存的核心功能。

```typescript
class LRU {
	constructor(capacity: number = 100);
}
```

**参数：**

-   `capacity` - 缓存容量，默认为 100

## 方法列表

### get

获取缓存值。如果键不存在或已过期，返回 undefined。获取操作会将该项移至缓存队列头部。

```typescript
get(key: string): any;
```

**参数：**

-   `key` - 缓存键

### set

设置缓存值。如果键已存在，会更新值和过期时间；如果不存在，则新增缓存项。当缓存达到容量上限时，会移除最久未使用的项。

```typescript
set(key: string, value: any, exp: number): void;
```

**参数：**

-   `key` - 缓存键
-   `value` - 缓存值
-   `exp` - 过期时间（秒），0 表示永不过期

### remove

移除指定的缓存项。

```typescript
remove(key: string): void;
```

**参数：**

-   `key` - 要移除的缓存键

### has

检查是否存在指定的缓存键。

```typescript
has(key: string): boolean;
```

**参数：**

-   `key` - 要检查的缓存键

### clear

清除所有缓存。

```typescript
clear(): void;
```

### keys

获取所有缓存键。

```typescript
keys(): IterableIterator<string>;
```

### length

获取当前缓存项数量。

```typescript
length(): number;
```

### trim

清除所有已过期的缓存项。

```typescript
trim(): void;
```

## 使用示例

```typescript
// 创建一个容量为 100 的 LRU 缓存
const cache = new LRU(100);

// 设置缓存，10秒后过期
cache.set('key1', 'value1', 10);

// 获取缓存值
const value = cache.get('key1');

// 检查键是否存在
if (cache.has('key1')) {
	// 存在该缓存项
}

// 移除缓存项
cache.remove('key1');

// 获取当前缓存数量
const count = cache.length();

// 清理过期缓存
cache.trim();

// 清除所有缓存
cache.clear();
```

## 实现原理

1. 使用双向链表存储缓存项，便于快速调整项目位置
2. 使用 Map 存储键值对，保证 O(1) 的查找性能
3. 最近使用的项会移到链表头部
4. 缓存满时，移除链表尾部的项（最久未使用）
5. 支持数据过期机制，可以设置每个缓存项的过期时间
6. 获取数据时自动检查是否过期
7. 提供手动清理过期数据的方法
