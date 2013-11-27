//facade for providing communication on top of socket
define(["service/pupsub", "service/messageHelper"], function (pupsub, messageHelper) {
	messageStore={};
	var communicatorMediator = function (socket){
		this.io = socket;

		console.log("create facade");

        //Server responce handler Area
		this.io.on("serverResponse", function (messageId,data){
			if(messageStore.hasOwnProperty(messageId)){
				pubsub.publish(messageStore[messageId](data));
				delete messageStore[messageId];
			}
		});
	}

	communicatorMediator.prototype.getMessage = function(messageType, callback){
		this.io.on("serverResponse", function (data){     //TODO: handle responce and publish event
			callback(data);
		});
		console.log("getMessageRequest: "+messageType);
	}

	communicatorMediator.prototype.req = function(messageType, callback){
		var mId =  messageHelper.generateId();
		var data = [];

		if (arguments.length>2){
			data = messageHelper.createDataObj(arguments);
		}
		console.log(data);
		this.io.emit('serverRequest',mId, messageType, data);
		//subscribe for event
		console.log("sendMessageRequest: "+messageType+" mId: "+mId);
		pubsub.subscribe(messageStore[mId]=arguments[arguments.length-1]);
		console.log("MESSAGESTORE");
		console.log(messageStore[mId]);
	}


	return communicatorMediator;
});
