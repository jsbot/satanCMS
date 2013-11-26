// Filename: views/project/list
define([
	'jquery',
	'underscore',
	'backbone',
	'cage/appSP/models/pageModel',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'text!cage/appSP/templates/page/page.html',
	'text!cage/appSP/templates/page/subObj.html',
	'handlebars',
	'service/connector'
], function ($, _, Backbone, PageModel, pageTemplate, subObjTemplate, Handlebars, connector) {


	pageView = Backbone.View.extend({
		el: $('#container'),
		template: Handlebars.compile(pageTemplate),
		subObjtemplate: Handlebars.compile(subObjTemplate),
		events: {
			"click .gtreg": "updateData"
		},

		updateData: function () {
			var defaults = {};
			defaults.casinoName = $('#api_casinoName').val();
			defaults.systemId = $('#api_systemId').val();
			var output = {};
			this.preverse($(".entry"), output);
			conn.req('updateApi', " id="+$("[d-bind='id']").val()
			 ,  output
			 , function (data) {
			 console.log(data);
			 });
			console.log(output);
		},
		render: function () {
			var context = this.model;
			var html = this.template({api: context.toJSON()});
			this.$el.html(html);
		},
		preverse: function ($item, target) {
			var _this = this;
			$item.children("[d-bind]").each(function (i, value) {
				var $node = $(this);
				if ($node.is("input"))
					target[$node.attr("d-bind")] = $node.val();
				else
					_this.preverse($node, target[$node.attr("d-bind")] = {});
			});
		},

		initialize: function () {
			var _this = this;
			Handlebars.registerHelper('ifObject', function (item, target, options) {
				if (typeof item == "object") {
					var html = _this.subObjtemplate({obj: item, target: target});

					//console.log(html);

					return new Handlebars.SafeString(html);
				} else {
					return options.inverse(this);
				}
			});

			conn = connector;
			conn.getMessage('wellcome', function (data) {
				console.log(data);

			});

			_this.model = new PageModel();

			conn.req('getApi', function (data) {
				var modelData = data[0];
				_this.model.set(modelData);

				_this.render();


			});

		}


	});
	return pageView;
});
