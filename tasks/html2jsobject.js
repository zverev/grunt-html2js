/* Forked from:
 *
 * grunt-html2js
 * https://github.com/karlgoldstein/grunt-html2js
 *
 * Copyright (c) 2013 Karl Goldstein
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var path = require('path');
	//var minify = require('html-minifier').minify;

	var escapeContent = function(content, quoteChar, indentString) {
		var bsRegexp = new RegExp('\\\\', 'g');
		var quoteRegexp = new RegExp('\\' + quoteChar, 'g');
		var nlReplace = '\\n' + quoteChar + ' +\n' + indentString + indentString + quoteChar;
		return content.replace(bsRegexp, '\\\\').replace(quoteRegexp, '\\' + quoteChar).replace(/\r?\n/g, nlReplace);
	};

	// convert Windows file separator URL path separator
	var normalizePath = function(p) {
		if ( path.sep !== '/' ) {
			p = p.replace(/\\/g, '/');
		}
		return p;
	};

	// Warn on and remove invalid source files (if nonull was set).
	var existsFilter = function(filepath) {
		if (!grunt.file.exists(filepath)) {
			grunt.log.warn('Source file "' + filepath + '" not found.');
			return false;
		} else {
			return true;
		}
	};

	// return template content
	var getContent = function(filepath, quoteChar, indentString, htmlmin, process) {
		var content = grunt.file.read(filepath);

		// Process files as templates if requested.
		if (typeof process === "function") {
			content = process(content, filepath);
		} else if (process) {
			if (process === true) {
				process = {};
			}
			content = grunt.template.process(content, process);
		}

		if (Object.keys(htmlmin).length) {
			try {
				//content = minify(content, htmlmin);
			} catch (err) {
				grunt.warn(filepath + '\n' + err);
			}
		} 

		return escapeContent(content, quoteChar, indentString);
	};

	// compile a template to an angular module
	var compileTemplate = function(moduleName, filepath, quoteChar, indentString, useStrict, htmlmin, process) {
		var content = getContent(filepath, quoteChar, indentString, htmlmin, process);

		return content;
	};

	// compile a template to an angular module
	var compileCoffeeTemplate = function(moduleName, filepath, quoteChar, indentString, htmlmin, process) {
		var content = getContent(filepath, quoteChar, indentString, htmlmin, process);
		var doubleIndent = indentString + indentString;

		var module = 'angular.module(' + quoteChar + moduleName +
			quoteChar + ', []).run([' + quoteChar + '$templateCache' + quoteChar + ', ($templateCache) ->\n' +
			indentString + '$templateCache.put(' + quoteChar + moduleName + quoteChar + ',\n' + doubleIndent  + quoteChar +  content +
			quoteChar + ')\n])\n';

		return module;
	};

	grunt.registerMultiTask('html2jsobject', 'Compiles HTML templates to a single JavaScript object.', function() {

		//Just have one output, so if we making thirty files it only does one line
		grunt.log.writeln("Successfully converted "+("green").green + " html templates to " + "red".red + ".");
	});
};
