// Filename: models/project
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var PageModel = Backbone.Model.extend({
        defaults: {
	        id:  "",
	        protocol: "",
	        path:   "",
	        fallbackPath: "",
	        urlPrefix: "",
	        defaults: {casinoName: "", systemId: ""}
        }
    });
    // Return the model for the module
    return PageModel;
});
