// Filename: views/project/list
define([
	'jquery',
	'underscore',
	'backbone',
	'backboneNested',
	'cage/appTest/models/testModel',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'text!cage/appTest/templates/page/page.html',
	'text!cage/appTest/templates/page/subObj.html',
	'handlebars'
], function ($, _, Backbone, backboneNested, TestPageModel, pageTemplate, subObjTemplate, Handlebars) {


	testPageView = Backbone.View.extend({
		el: $('#container'),
		template: Handlebars.compile(pageTemplate),
		subObjtemplate: Handlebars.compile(subObjTemplate),
		events: {
			"click .gtreg": "updateData"
		},
		render: function () {

        /*			var context = this.model;*/
			var html = this.template();
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
            var gameListObjArr = [{
                "id": "mobro",
                "alias": "premium-roulette",
                "supportedDevices": {
                    "ipad":true,
                    "iphone4":true,
                    "iphone5":true,
                    "galaxy_tab_2_10":true,
                    "galaxys2":true,
                    "galaxys3":true,
                    "htc_one":true
                },
                "PVID": "PGP",
                "type": "GAMETYPE_TABLE"

            },{
                "id": "ir2",
                "alias": "ironman",
                "supportedDevices": {
                    "ipad":true,
                    "iphone4":false,
                    "iphone5":false,
                    "galaxy_tab_2_10":true,
                    "galaxys2":true,
                    "galaxys3":true,
                    "htc_one":true
                },
                "PVID": "PGP",
                "type": "GAMETYPE_TABLE"

            },{
                "id": "hulk",
                "alias": "hulk",
                "supportedDevices": {
                    "galaxy_tab_2_10":true,
                    "galaxys2":true,
                    "galaxys3":true,
                    "htc_one":true
                },
                "PVID": "PGP",
                "type": "GAMETYPE_TABLE"

            }];


            //supportedDevicesModel-->supportedDevicesCollection-->gameModel
            var supportedDevicesModel = Backbone.NestedModel.extend({
                initialize : function(){
                    this.type = this.get('tpl');
                    this.data = this.get('data');
                }

            });
            var gamesModel = Backbone.NestedModel.extend({
                initialize : function(){
                    this.set('id',"BNSBDANSBDNASBNBNSDBNSADNAS")// = this.get('id'),
                    this.alias = this.get('alias'),
                    this.supportedDevices = new supportedDevicesModel({"tpl":"group","data":this.get('supportedDevices')}),
                    this.PVID = this.get('PVID'),
                    this.type = this.get('type')
                }

            });
            var gameCollection = Backbone.Collection.extend({
                model: gamesModel
            });
            var collection = new gameCollection(gameListObjArr);


            var game = new gamesModel({
                "id": "mobro",
                "alias": "premium-roulette",
                "supportedDevices": {
                    "ipad":true,
                    "iphone4":true,
                    "iphone5":true,
                    "galaxy_tab_2_10":true,
                    "galaxys2":true,
                    "galaxys3":true,
                    "htc_one":true
                },
                "PVID": "PGP",
                "type": "GAMETYPE_TABLE"

            });
            console.log(game.toJSON());


            var template = {
                "gameInfo":{
                    "grid":[
                        {
                            "id": "",
                            "alias": "",
                            "supportedDevices":supportedDevicesModel,
                            "PVID": "",
                            "type": ""
                        }
                    ]
                }
            }
            var nestedObj = {
                "name":"bla",
                "value=":"100",
                "gameInfo":{
                        gamelist:[
                                {
                                    "id": "baws",
                                    "alias": "baccarat-wo-sidebets",
                                    "PVID": "NGM",
                                    "type": "GAMETYPE_TABLE"
                                },
                                {
                                    "id": "bj_mh5",
                                    "alias": "blackjack-multihand",
                                    "PVID": "NGM",
                                    "type": "GAMETYPE_TABLE"
                                },
                                {
                                    "id": "mobro",
                                    "alias": "premium-roulette",
                                    "supportedDevices": {
                                        "ipad":true,
                                        "iphone4":true,
                                        "iphone5":true,
                                        "galaxy_tab_2_10":true,
                                        "galaxys2":true,
                                        "galaxys3":true,
                                        "htc_one":true
                                    },
                                    "PVID": "PGP",
                                    "type": "GAMETYPE_TABLE"
                                }
                        ]
                }
            }


            // supportedDevicesModel->gameModel->gameInfo->nestedModel

			Handlebars.registerHelper('ifObject', function (item, target, options) {
				if (typeof item == "object") {
					var html = _this.subObjtemplate({obj: item, target: target});

					//console.log(html);

					return new Handlebars.SafeString(html);
				} else {
					return options.inverse(this);
				}
			});

			_this.model = new TestPageModel();
			_this.render();


		}


	});
	return testPageView;
});
