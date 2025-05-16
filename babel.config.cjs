// babel.config.js
/**
 * @function
 * @name babelConfig
 * @description Babel 配置文件，用于 Jest 转换 ES Module。
 * @returns {object} Babel 配置对象
 */
module.exports = {
	presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
};
