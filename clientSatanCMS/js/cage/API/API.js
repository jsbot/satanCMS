// Filename: API.js
define([
	'service/blackBox',
	'service/connector'
], function (BB, connector) {
	var API = function(){
		this.getCategory = function(){
			//connector.req('getCategory', function (data) {
			data = {"test":"bla"};
			BB.notify("getCategory",data);
					return data;
			//});
		}
		this.initialize = function(){
			BB.propose("getCategory" , this, "getCategory");
		}
	}

	return API;
});
