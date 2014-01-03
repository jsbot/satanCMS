// Filename: models/project
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var PageModel = Backbone.Model.extend({
		defaults: {
			userName: "none",
			userStatus: "none",
			userBallance: 0
		}
	});

    return PageModel;
});
