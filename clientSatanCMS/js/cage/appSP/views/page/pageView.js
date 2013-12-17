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
			"click .gtreg": "updateData",
			"click .vert": "updateVerticals",
			"click .ngm": "getNgm"
		},
		getNgm: function(){
			var _this = this;
			conn.req('getVerticals',"NGM", function (d) {
                console.log(d);
				var data = JSON.parse(d[0].NGM);
				var modelData = data;
				console.log("MODEL_DATA");
				console.log(modelData);
				//_this.model.set(modelData.NGM[0]);

				_this.model.clear();
				_this.model.set("_id",d[0]._id);
				_this.model.set(modelData);

				_this.render();


			});
		},
		updateData: function () {
			var output = {};
			this.preverse($(".entry"), output);
			delete output["_id"];
			conn.req('updateApi', $("[d-bind='_id']").val()
			 ,  JSON.stringify(output)
			 , function (data) {
			 console.log(data);
			 });

			console.log(output);
		},
		updateVerticals: function () {
			var output = {};
			this.preverse($(".entry"), output);
			delete output["_id"];
			conn.req('updateVerticals'
                , $("[d-bind='_id']").val() //verticalId
                , "NGM" //verticalType
			    ,  JSON.stringify(output)
			    , function (data) {
			    console.log(data);
			 });

			console.log(output);
		},
		render: function () {
			var context = this.model;
			//console.log("CONTEXT______________________________");
			//console.log(context);
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

			_this.model = new PageModel();

			connector.req('getApi', function (data) {
				var modelData = data[0];
				_this.model.set(modelData);

				_this.render();


			});

		}


	});
	return pageView;
});
