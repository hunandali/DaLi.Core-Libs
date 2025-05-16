/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/tests'],
	testMatch: ['<rootDir>/tests/**/*.test.ts', '!<rootDir>/tests/http/https.test.ts'],
	moduleFileExtensions: ['ts', 'js'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	transform: {
		'^.+.ts$': 'ts-jest',
		'^.+.js$': 'babel-jest'
	},
	// 排除 node_modules 目录，但包含 chalk 模块，以便 Jest 能够正确转换其 ES Module 语法
	transformIgnorePatterns: ['node_modules/(?!(chalk|ansi-styles)/)']
};
