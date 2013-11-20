// Filename: views/project/list
define([
	'jquery',
	'underscore',
	'backbone',
	'cage/appSP/models/pageModel',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'text!cage/appSP/templates/page/page.html',
	'handlebars',
	'service/connector'
], function ($, _, Backbone, PageModel, pageTemplate, Handlebars, connector) {


	pageView = Backbone.View.extend({
		el: $('#container'),
		template: Handlebars.compile(pageTemplate),
		events: {
			"click .gtreg": "updateData"
		},
		updateData: function(){
			var defaults = {};
			defaults.casinoName= $('#api_casinoName').val();
			defaults.systemId= $('#api_systemId').val();

			conn.req('updateApi', " id="+$('#api_id').val()
				,   "  protocol="+$('#api_protocol').val()+
					"| path="+$('#api_path').val()+
					"| fallbackPath="+$('#api_fallbackPath').val()+
					"| urlPrefix= "+ $('#api_urlPrefix').val()+
					"| defaults = "+JSON.stringify(defaults)
				, function (data) {
				console.log(data);
			});
		},
		render: function () {
			var context = this.model;
			var html = this.template({api: context.toJSON()});
			this.$el.html(html);
		},

		initialize: function () {
			var _this = this;
			Handlebars.registerHelper('ifObject', function(item, options) {
				if(typeof item == "object") {
					var html = _this.template(this);

					return options.fn(html);
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
				console.log(modelData);
				_this.model.set({
					id:  modelData.id,
					protocol: modelData.protocol,
					path:   modelData.path,
					fallbackPath: modelData.fallbackPath,
					urlPrefix: modelData.urlPrefix,
					defaults: {casinoName: modelData.defaults.casinoName, systemId: modelData.defaults.systemId}
				});
				_this.render();
			});

		}


	});
	return pageView;
});
