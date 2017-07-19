module.exports = (() => {
	let path = require('path');
	let packpath = require('packpath');

	let config = require('./config');

	let root = packpath.parent();

	this.isExternal = (module/*, count*/) => {
		let context = module.context;
		if(typeof context !== 'string') {
			return false;
		}
		return context.indexOf('node_modules') !== -1;
	};

	this.getJsDeps = (packageJson) => {
		return Object.keys(packageJson.dependencies).filter((lib) => {
			lib = require.resolve(lib);
			return lib.endsWith('.js');
		});
	};

	config.path = {
		root: root,
		build: path.resolve(root, config.dir.build),
		dist: path.resolve(root, config.dir.dist)
	};

	config.vendor.path = path.resolve(
		config.path.build,
		config.vendor.name + '.json'
	);
	config.vendor.distpath = path.resolve(
		config.path.dist, 'js',
		config.vendor.name + '.js'
	);
	config.vendor.js = this.getJsDeps(
		require(path.resolve(root, 'package.json'))
	);
	config.vendor.files = config.vendor.js.concat(config.vendor.css);

	this.config = config;

	return this;
})();
