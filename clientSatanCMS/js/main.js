// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
	shim: {
		'socketio': {
			exports: 'io'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
        backboneNested: {
			deps: ['underscore', 'jquery','backbone'],
			exports: 'backboneNested'
		},
		handlebars: {
			exports: 'Handlebars'
		},
		json2: {
			exports: 'json2'
		}
	},

	paths: {
		jquery: 'lib/ext/jquery',
		underscore: 'lib/ext/underscore',
		backbone: 'lib/ext/backbone',
		handlebars: 'lib/ext/handlebars',
		socketio: 'lib/ext/socket.io',
		json2: 'lib/ext/json2',
        backboneNested:'lib/ext/backbone-nested'
	}

});

require([
	// Load our app module and pass it to our definition function
	'app',
], function (App) {
	// The "app" dependency is passed in as "App"
	App.initialize();

});