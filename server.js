var http = require("http"),
	io = require("socket.io"),
	mongoose = require('mongoose'),
	dbw = require('./DbWorker'),
	fs = require('fs');

function start() {
	function onRequest(request, response) {
		var pathname = request.url;
		console.log("Request for " + pathname + " received.");
		if (pathname == '/satanCMS/files/'){

			fs.readFile('../satanCMS/files/test.txt', function read(err, data) {
				if (err) {
					throw err;
				}
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write(data);
				response.end();
			});
		}else{
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write("Hello World");
			response.end();
		}

	}

	server = http.createServer(onRequest).listen(8880);
	console.log("Server has started.");

	var Schema = mongoose.Schema;

	var apiSh = new Schema({
		id:  String,
		protocol: String,
		path:   String,
		fallbackPath: String,
		urlPrefix: String,
		defaults: {casinoName: String, systemId: String}
	},{collection:'api'});

	mongoose.connection.on('open', function (ref) {
		console.log('Connected to mongo server.');
	});
	mongoose.connection.on('error', function (err) {
		console.log('Could not connect to mongo server!');
		console.log(err);
	});

/**
 * AREA FOR MONGOOSE CONNECTION
 * ****/

	mongoose.connect('mongodb://<user>:<password>@<server>');

	var Api = mongoose.model('api', apiSh);

	/**
	 * DB PART
	 */
	/*var test = new dbw.DbWorker(Api);
	test.find(function(data){
		console.log(data);
	});*/
	//test.save({"id":"test_id3","test":"blabla","path":"http"});
	//test.update({"id":"test_id3"},{"test":"UPPER CASE2","path":"http://blabla"});
	//test.find({"id":"IMS_API"});



/*
	 Api.find(
	 {}
	 , function(err, data) {
	 console.log(err, data, data.length);
	 });
	Api.update(
		 {"id":"IMS_API"}
		,{$set: {"test": "new_fiield_value2"}}
		, function(error, result) {
		console.dir(result);
	});
	Api.find({}, function(err, data) { console.log(err, data, data.length); });
	var item = new Api({"id":"test_id","test":"blabla","path":"http"});
	item.save(function(err) {
		if (err) console.log(err) ;
	});
	Api.find({}, function(err, data) { console.log(err, data, data.length); });*/


	//var res = Api.find({"id":"IMS_API"});

		//console.log(Api);


	/**
	 * Client part
	 *
	 */

	var socket = io.listen(server, {log: 0});

	socket.on('connection', function (client) {

		console.log("New client is here!");
		client.emit('wellcome', "Hey you!");

		client.on('serverRequest', function (mId, messageType, queryData) {
			//console.log("send responce to client: "+mId+" data: ");
			//console.log(queryData);
			//console.log(messageCofig);
			messageCofig[messageType](client, mId, queryData);

		});
	});
	function odjSringifyer(o){
		Object.keys(o).forEach(function(key) {
			if (o[key].charAt(0) =='{'){    o[key] = JSON.parse(o[key]);    }
		});
		return(o);
	}
	var dbApiInstance = new dbw.DbWorker(Api);
	function db(){}
	db.prototype.getApi = function(ioClient, mId){
		console.log("getApi called");
		dbApiInstance.find(function(data){
			ioClient.emit("serverResponse",mId, data);
		});
	}
	db.prototype.updateApi = function(ioClient, mId, objUpdtData){
		console.log("updateApi called");
		//console.log(objUpdtData);
		objUpdtData[1] = odjSringifyer(objUpdtData[1]);

		dbApiInstance.update(function(data){
			console.log(data);
		},objUpdtData[0],objUpdtData[1]);
		//update({"id":"test_id3"},{"test":"UPPER CASE2","path":"http://blabla"});
	}
	var caller = new db();
	messageCofig = {
		"getApi" : caller.getApi,
		"updateApi": caller.updateApi
	}

	/**
	 * FILE WRITE TEST
	 */
/*	fs.writeFile("../satanCMS/files/test.txt", "Hey there!", function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("The file was saved!");
		}
	});*/
}

exports.start = start;