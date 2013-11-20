// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'cage/appSP/views/page/pageView'
], function ($, _, Backbone, PageView) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"page": "page"
		},

		index: function () {
			alert("page");
		},
		page: function () {
			pv.render();
		}
	});

	initialize = function () {
		pv = new PageView();
		appRouterInstance = new AppRouter();
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});