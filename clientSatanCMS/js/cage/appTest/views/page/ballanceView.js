// Filename: views/project/list
define([
	'jquery',
	'underscore',
	'backbone',
	'cage/appTest/models/testModel',
	'text!cage/appTest/templates/page/page.html',
	'handlebars',
	'service/blackBox'
], function ($, _, Backbone, ballanceModel, pageTemplate, Handlebars, blackBox) {

	ballanceView = Backbone.View.extend({
		el: $('#container'),
		template: Handlebars.compile(pageTemplate),
		events: {
			"click .gtreg": "updateData"
		},
		render: function () {
			var context = this.model;
			var html = this.template(context.toJSON());
			this.$el.html(html);
		},

		initialize: function () {
			var _this = this;
			_this.model = new ballanceModel();
			_this.render();

			blackBox.listen("userName", function(topic,data){
				console.log(data);
				_this.model.set("userName",data.userName);
			});
			blackBox.listen("userStatus", function(topic,data){
				_this.model.set("userStatus",data.userStatus);
			});
			console.log(blackBox.presentTopics());

			_this.model.on("change:userStatus", function() {
				setTimeout(function(){
					_this.model.set({"userBallance":"200"});
				},4000);

			});
			_this.model.on("change", function() {
				_this.render();
			});



		}


	});
	return ballanceView;
});
