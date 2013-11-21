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
        newObj: {},

		updateData: function(){
			var defaults = {};
			defaults.casinoName= $('#api_casinoName').val();
			defaults.systemId= $('#api_systemId').val();
            this.preverse($(".entry"));
			/*conn.req('updateApi', " id="+$('#api_id').val()
				,   "  protocol="+$('#api_protocol').val()+
					"| path="+$('#api_path').val()+
					"| fallbackPath="+$('#api_fallbackPath').val()+
					"| urlPrefix= "+ $('#api_urlPrefix').val()+
					"| defaults = "+JSON.stringify(defaults)
				, function (data) {
				console.log(data);
			});*/
		},
		render: function () {
			var context = this.model;
			var html = this.template({api: context.toJSON()});
			this.$el.html(html);
		},
        preverse: function(elem){
            var _this = this;
            //$(elem).children().each(function(i,e){

                $(elem).children().each(function(i,el){
                    if($(el).children().length>0){

                        _this.preverse($(el));

                    }else{

                        if ($(el).attr('d-bind')!= undefined){


                        if ($(el).parent().attr("d-bind")!=undefined){
                            console.log($(el).attr('d-bind'));
                            var tobj = {};

                            tobj[$(el).attr('d-bind')]=$(el).val();
                            console.log(tobj);
                            _this.newObj[$(el).parent().attr("d-bind")]=tobj;
                        }else{
                            _this.newObj[$(el).attr('d-bind')]=$(el).val();
                        }

                        }

                    }
                    //console.log($(el).attr('d-bind'));

                });
                console.log(_this.newObj);
                //console.log("length:"+ $(e).children().length);

            //});
        },
		initialize: function () {
			var _this = this;
			Handlebars.registerHelper('ifObject', function(item, target, options) {
				if(typeof item == "object") {
					var html = _this.subObjtemplate({obj:item, target:target});

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

				/*{
					id:  modelData.id,
						protocol: modelData.protocol,
					path:   modelData.path,
					fallbackPath: modelData.fallbackPath,
					urlPrefix: modelData.urlPrefix,
					defaults: {casinoName: modelData.defaults.casinoName, systemId: modelData.defaults.systemId},
					testObj: {field:modelData.testObj.field ,innerObj: {data:modelData.testObj.innerObj.data,someField:modelData.testObj.innerObj.someField}}
				}*/
                //console.log(modelData);
				_this.model.set(modelData);

				_this.render();


			});

		}


	});
	return pageView;
});
