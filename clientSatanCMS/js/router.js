// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'cage/appSP/views/page/pageView',
	'cage/appTest/views/page/testPageView'
], function ($, _, Backbone, PageView, TestPageView) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"page": "page",
            "test": "testp"
		},

		index: function () {
			alert("page");
		},
		page: function () {
			pv.render();
		},
        testp: function () {
			tv.render();
		}
	});

	initialize = function () {
		//pv = new PageView();
		tv = new TestPageView();
		appRouterInstance = new AppRouter();
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});