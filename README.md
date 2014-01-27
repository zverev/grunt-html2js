# grunt-html2jsobject

> Converts HTML templates to a single JavaScript object

## Usage

```javascript
module.exports = function(grunt) {
	grunt.initConfig({
		html2jsobject: {
        	subscriptions: {
        		options: {
        			newObject: false,
        			fileHeaderString: "var nsGmx = nsGmx || {};",
        			fileFooterString: "/* --- footer --- */"
        		},
        	   	container: "nsGmx.Templates.Subscriptions",
            	src: ['client/js/Controls/Subscriptions/*.html'],
        		dest: 'client/js/Controls/Subscriptions/Templates.js'
        	}
       	}
	});

	grunt.loadNpmTasks('grunt-html2jsobject');
}
```