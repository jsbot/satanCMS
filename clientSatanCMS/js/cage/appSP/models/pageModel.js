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
	        defaults: {casinoName: "", systemId: ""},
            testObj: {field: "", innerObj: {data: "",someField:""}}
        }
    });
    // Return the model for the module
    return PageModel;
});
