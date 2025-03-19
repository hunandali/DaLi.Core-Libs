import { treeExecute, treeFind } from '../../src/base/treeList';
import { ITree } from '../../src/types';

describe('treeList utils', () => {
	const sampleTree: ITree = {
		label: 'root',
		value: 1,
		children: [
			{
				label: 'child1',
				value: 2,
				children: [
					{
						label: 'grandchild1',
						value: 3
					}
				]
			},
			{
				label: 'child2',
				value: 4,
				children: []
			}
		]
	};

	describe('treeExecute', () => {
		it('should execute function on all nodes', () => {
			const result: number[] = [];
			treeExecute(sampleTree, (item) => {
				result.push(item.value);
			});
			expect(result).toEqual([1, 2, 3, 4]);
		});

		it('should handle empty or invalid input', () => {
			const result: number[] = [];
			treeExecute(null as any, (item) => {
				result.push(item.value);
			});
			expect(result).toEqual([]);
		});

		it('should work with custom children key', () => {
			const customTree: ITree = {
				label: 'root',
				value: 1,
				items: [{ text: 'child', value: 2 }]
			};
			const result: number[] = [];
			treeExecute(
				customTree,
				(item) => {
					result.push(item.value);
				},
				'items'
			);
			expect(result).toEqual([1, 2]);
		});
	});

	describe('treeFind', () => {
		it('should find node by condition', () => {
			const result = treeFind(sampleTree, (item) => item.label === 'grandchild1');
			expect(result).toEqual({ label: 'grandchild1', value: 3 });
		});

		it('should return undefined if not found', () => {
			const result = treeFind(sampleTree, (item) => item.label === 'nonexistent');
			expect(result).toBeUndefined();
		});

		it('should handle empty or invalid input', () => {
			const result = treeFind(null as any, (item) => item.label === 'test');
			expect(result).toBeUndefined();
		});
	});
});
