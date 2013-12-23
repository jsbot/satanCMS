define(["service/pupsub", "service/messageHelper"], function (pupsub, messageHelper) {
	messageStore={};
	var communicatorMediator = function (){
        if ( arguments.callee.instance )
        return arguments.callee.instance;
        arguments.callee.instance = this;
    }

    communicatorMediator.prototype.setSocket = function(socket){
        this.io = socket;
        this.startListenSocket();
    }

    communicatorMediator.prototype.startListenSocket = function(){
        this.io.on("serverResponse", function (messageId,data){
            if(messageStore.hasOwnProperty(messageId)){
                pubsub.publish(messageStore[messageId](data));
                delete messageStore[messageId];
            }
        });
    }
    communicatorMediator.prototype.socketSend = function(mId, messageType, data){
	    /**
	     * [
	     "request":"get|set|delete|auth"
	     "qualifier": "IMSContent.Games",
	     "contextId": "",
	     "correlationId":"#ID",
	     data:{}
	     ]

	     * */

	    console.log(mId);
	    console.log(messageType);
	    console.log(data);
        this.io.emit('serverRequest',mId, messageType, data);
    }

    /**
    * Later onn Add REST AJAX request POST GET
    *  */

	communicatorMediator.prototype.req = function(){
		var mId =  messageHelper.generateId();
		var data = [];


		if (arguments.length>2){
			data = messageHelper.createDataObj(arguments);
		}

        if(this.io){
            this.socketSend(mId, arguments[0], data);
        }

		pubsub.subscribe(messageStore[mId]=arguments[arguments.length-1]);
	}
	return CM = new communicatorMediator;
});
