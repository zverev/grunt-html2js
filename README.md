# grunt-html2jsobject

> Converts HTML templates to a single JavaScript object

## Usage

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		html2jsobject: {
			options: {
				// custom options
			},
			subscriptions: {
				container: "nsGmx.Templates.Subscriptions",
				src: ['src/**/*.html'],
				dest: 'tmp/templates.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-html2jsobject');
}
```