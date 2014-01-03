// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'cage/appSP/views/page/pageView',
	'cage/appTest/views/page/ballanceView',
	'cage/appAuth/views/page/authView',
	'cage/API/API'
], function ($, _, Backbone, PageView, ballanceView, authView, API ) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			"": "index",
			"page": "page",
            "test": "testp",
			"auth": "auth"
		},

		index: function () {
			alert("page");
		},
		page: function () {
			pv.render();
		},
        testp: function () {
			tv.render();
		},
		auth: function(){
			auth.render();
		}
	});

	initialize = function () {
		api = new API();
		api.initialize();

		//pv = new PageView();
		tv = new ballanceView();
		auth = new authView();
		appRouterInstance = new AppRouter();
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});