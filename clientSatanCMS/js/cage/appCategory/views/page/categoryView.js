// Filename: views/project/list
define([
	'jquery',
	'underscore',
	'backbone',
	'text!cage/appAuth/templates/page/categoryPage.html',
	'handlebars',
	'service/blackBox'
], function ($, _, Backbone, pageTemplate, Handlebars, BB) {

	authView = Backbone.View.extend({
		el: $('#auth'),
		template: Handlebars.compile(pageTemplate),
		events: {

		},

		render: function () {

		/*		var context = this.model;*/
			var html = this.template();
			this.$el.html(html);
		},

		initialize: function () {
			var _this = this;
			_this.render();
			BB.listen("getCategory",function(t, d){
				console.log("received Category: ");
				console.log(d);
			})
		}


	});
	return authView;
});
