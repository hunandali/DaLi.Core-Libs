import {
	debounce,
	throttle,
	errorTrace,
	globalId,
	fnId,
	execute,
	sleep,
	fingerprint
} from '../../src/base/utils';

describe('utils', () => {
	describe('debounce', () => {
		it('should debounce function calls', async () => {
			let counter = 0;
			const increment = () => counter++;
			const debouncedIncrement = debounce(increment, 100);

			debouncedIncrement();
			debouncedIncrement();
			debouncedIncrement();

			expect(counter).toBe(0);
			await sleep(150);
			expect(counter).toBe(1);
		});

		it('should execute immediately when immediate is true', () => {
			let counter = 0;
			const increment = () => counter++;
			const debouncedIncrement = debounce(increment, 100, true);

			debouncedIncrement();
			expect(counter).toBe(1);
		});
	});

	describe('throttle', () => {
		it('should throttle function calls with timestamp', async () => {
			let counter = 0;
			const increment = () => counter++;
			const throttledIncrement = throttle(increment, 100, true);

			throttledIncrement();
			throttledIncrement();
			throttledIncrement();

			expect(counter).toBe(1);
			await sleep(150);
			throttledIncrement();
			expect(counter).toBe(2);
		});

		it('should throttle function calls with timer', async () => {
			let counter = 0;
			const increment = () => counter++;
			const throttledIncrement = throttle(increment, 100, false);

			throttledIncrement();
			throttledIncrement();
			throttledIncrement();

			expect(counter).toBe(0);
			await sleep(150);
			expect(counter).toBe(1);
		});
	});

	describe('errorTrace', () => {
		it('should return trace information', () => {
			const trace = errorTrace();
			expect(typeof trace).toBe('string');
		});

		it('should return multiple traces when requested', () => {
			const traces = errorTrace(2);
			expect(Array.isArray(traces)).toBe(true);
			expect(traces.length).toBeLessThanOrEqual(2);
		});

		it('should handle removeContents parameter', () => {
			const trace = errorTrace(1, 1, ['node_modules']);
			expect(trace.toString().includes('node_modules')).toBe(false);
		});
	});

	describe('globalId', () => {
		it('should generate unique ids', () => {
			const id1 = globalId();
			const id2 = globalId();
			expect(id1).not.toBe(id2);
		});

		it('should include prefix when provided', () => {
			const id = globalId('test');
			expect(id.startsWith('test-')).toBe(true);
		});
	});

	describe('fnId', () => {
		it('should generate consistent ids for same function', () => {
			const fn = () => {};
			const id1 = fnId(fn);
			const id2 = fnId(fn);
			expect(id1).toBe(id2);
		});

		it('should remove function when remove is true', () => {
			const fn = () => {};
			const id1 = fnId(fn);
			const id2 = fnId(fn, true);
			const id3 = fnId(fn);
			expect(id1).toBe(id2);
			expect(id1).not.toBe(id3);
		});
	});

	describe('execute', () => {
		it('should execute function specified times', () => {
			let counter = 0;
			const increment = () => counter++;
			const limitedIncrement = execute(increment, 2);

			limitedIncrement();
			limitedIncrement();
			limitedIncrement();

			expect(counter).toBe(2);
		});

		it('should execute at least once', () => {
			let counter = 0;
			const increment = () => counter++;
			const limitedIncrement = execute(increment, 0);

			limitedIncrement();
			expect(counter).toBe(1);
		});
	});

	describe('sleep', () => {
		it('should delay execution', async () => {
			const start = Date.now();
			await sleep(100);
			const elapsed = Date.now() - start;
			expect(elapsed).toBeGreaterThanOrEqual(100);
		});
	});

	describe('fingerprint', () => {
		it('should return server fingerprint in server mode', async () => {
			const fp = await fingerprint();
			expect(fp).toEqual({ id: 'server', score: 1 });
		});
	});
});
