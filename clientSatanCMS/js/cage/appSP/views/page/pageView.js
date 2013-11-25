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
            this.preverse($(".test"),'');
			/*conn.req('updateApi', " id="+$('#api_id').val()
				,   "  protocol="+$('#api_protocol').val()+
					"| path="+$('#api_path').val()+
					"| fallbackPath="+$('#api_fallbackPath').val()+
					"| urlPrefix= "+ $('#api_urlPrefix').val()+
					"| defaults = "+JSON.stringify(defaults)
				, function (data) {
				console.log(data);
			});*/
            console.log(this.newObj);
		},
		render: function () {
			var context = this.model;
			var html = this.template({api: context.toJSON()});
			this.$el.html(html);
		},
        preverse: function(elem, hyerarchy){
            var _this = this;

            $($(elem).find("[d\-bind]")).each(function(i,value){
                if($(value).is("input")){
                    //console.log("hyerarchy: "+ hyerarchy);
                    //console.log("parent data bind: "+$(value).parent().attr("d\-bind" ));

                        if(hyerarchy=='' && $(value).parent().attr("d\-bind" ) == undefined){

                            _this.newObj[$(value).attr("d\-bind" )] = $(value).val();
                        }
                        if(hyerarchy!='' && $(value).parent().attr("d\-bind" )!=hyerarchy.substr(hyerarchy.length-$(value).parent().attr("d\-bind").length,hyerarchy.length)){
                            console.log($(value).parent().attr("d\-bind" )+' '+hyerarchy);
                            var h = hyerarchy.substr(1,hyerarchy.length)
                            var o = _this.namespace(h,'.',_this.newObj);
                            o[$(value).attr("d\-bind" )] = $(value).val();
                        }
                    }
                else{
                    //console.log(hyerarchy+'.'+$(value).attr("d\-bind" ));
                    _this.preverse($(value), hyerarchy+'.'+$(value).attr("d\-bind" ));
                }

            });


        },
        namespace: function(name, separator, container){
            var ns = name.split(separator || '.'),
                o = container || window,
                i,
                len;
            for(i = 0, len = ns.length; i < len; i++){
                o = o[ns[i]] = o[ns[i]] || {};
            }
            return o;
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
