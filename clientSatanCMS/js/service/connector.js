// Filename: connector.js
define([
	'jquery',
	'socketio',
	'service/comunicatorMediator'
], function ($, io, communicatorMediator) {

	var socket = io.connect('http://127.0.0.1:8880');
    communicatorMediator.setSocket(socket);

	console.log("connector called");
    $.ajax({
        url: 'http://127.0.0.1:8880/satanCMS/files',
        dataType: 'jsonp',
        success: function(data){
            // we make a successful JSONP call!
            console.log(data);
        }
    });

	return communicatorMediator;
});
