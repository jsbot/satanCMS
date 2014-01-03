// Filename: views/project/list
define([
	'jquery',
	'underscore',
	'backbone',
	'text!cage/appAuth/templates/page/authPage.html',
	'handlebars',
	'service/blackBox'
], function ($, _, Backbone, pageTemplate, Handlebars, BB) {

	authView = Backbone.View.extend({
		el: $('#auth'),
		template: Handlebars.compile(pageTemplate),
		events: {
			"click .gtreg": "login"
		},
		login: function(){
			BB.notify("userName", {"userName":"satan"});
			BB.notify("userStatus", {"userStatus":"loggedIn"});
		},
		render: function () {

		/*		var context = this.model;*/
			var html = this.template();
			this.$el.html(html);
		},

		initialize: function () {

			var _this = this;
			_this.render();

		}


	});
	return authView;
});
