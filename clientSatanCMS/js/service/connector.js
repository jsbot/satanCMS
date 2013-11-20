// Filename: connector.js
define([
	'jquery',
	'socketio',
	'service/comunicatorMediator'
], function ($, io, communicatorMediator) {

	var socket = io.connect('http://127.0.0.1:8880');
	var cF = new communicatorMediator(socket);
	console.log("connector called");
	return cF;
});
