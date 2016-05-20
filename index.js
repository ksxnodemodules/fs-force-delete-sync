
((module) => {
	'use strict';

	var {rmdirSync, unlinkSync, statSync, readdirSync} = require('fs');
	var path = require('path');
	var justTry = require('just-try');
	var Info = require('fs-force-utils/info');
	var Action = require('fs-force-utils/action');
	var _donothing = require('fs-force-utils/do-nothing');
	var flatArray = require('fs-force-utils/flat-array');

	var resolvePath = path.resolve;
	var getParent = path.dirname;
	var joinPath = path.join;

	var _rmSync = (entry, onaction) => {
		var callOnAction = (action) =>
			justTry(() => onaction(action), (error) => console.error(error));
		var createInfo = (...action) =>
			new Info('delete', entry, action);
		return justTry(() => statSync(entry), () => createInfo(), handleExist);
		function handleExist(stat) {
			if (stat.isFile()) {
				unlinkSync(entry);
				let action = new Action('delete', entry, 'file');
				callOnAction(action);
				return createInfo(action);
			}
			if (stat.isDirectory()) {
				let prevact = readdirSync(entry)
					.map((item) => _rmSync(joinPath(entry, item), onaction).action);
				rmdirSync(entry);
				let action = new Action('delete', entry, 'dir');
				callOnAction(action);
				return createInfo(...flatArray(prevact), action);
			}
			throw new Error(`Can't delete entry "${entry}"`);
		}
	};

	module.exports = (entry, onaction = _donothing) => _rmSync(resolvePath(entry), onaction);

})(module);
