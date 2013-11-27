// Filename: messageHelper.js
define(["json2", "text!service/messages.json"], function (json2, messages) {
	function MH() {
		this.test = 'OWOWW';
		this.createJSON = function () {
			//console.log(arguments);
			var data = new Array();
			data[0] = 'valideteUser';
			data[1] = '{"id":"0002","collection":"users", "login":"satan", "password":"test"}';
			var mes = JSON.parse(messages);

			for (prop in mes) {
				if (mes.hasOwnProperty(prop)) {
					if (prop == arguments[0]) {
						var parseObj =[];
						var arrSplit=[];
						var tArr = [];
						for (i = 0; i < arguments.length; i++) {
							arrSplit = arguments[i].split('=');
							for (j = 0; j < arrSplit.length; j++) {
								parseObj[i,j] = arrSplit[j];
								parseObj[i,3] = "blia";

								//alert("TEST ARRAY:");
								//console.log("i: "+i+" j: "+j);
								//console.log(parseObj[i,j]);
								tArr.push(parseObj);
							}
						}
						console.log(tArr);
						//mes[prop] = objToCreate;
						/*console.log("array valodation");
						 console.log(arguments.length);
						 console.log(prop);
						 console.log(mes[prop]);*/
					}
				}
			}
			return mes;
		}

	}
	MH.prototype.createDataObj = function(arr){
		var data = new Array();
		var queItm={};
		var queData = {};

			var arrSplit = arr[1].split('=');
			if (arrSplit.length>1){
				var arg0 = arrSplit[0];
				var arg1 = arrSplit[1];
				queItm[arg0.replace(/^\s+|\s+$/g,'')]=arg1.replace(/^\s+|\s+$/g,'');
			}else{
				queItm = arr[1];
			}
			data.push(queItm);
		/*if (arr.length>3){
			var arrDataSplit = new Array();
			for (var i=2; i<arr.length-1; i++){
				arrDataSplit = arr[i].split('|');
			}
			for (var j=0; j<arrDataSplit.length; j++){
				var arrSep = arrDataSplit[j].split('=');
				var arg0 = arrSep[0];
				var arg1 = arrSep[1];
				queData[arg0.replace(/^\s+|\s+$/g,'')]=arg1.replace(/^\s+|\s+$/g,'');;
			}
			data.push(queData);
		}*/
		if (arr.length>3){
			for (var i=2; i<arr.length-1; i++){
				data.push(arr[i]);
			}

		}

		return data;
	}
	MH.prototype.generateId = function(){
		var mId = "mId"+Math.floor((Math.random()*100)+1);
		return mId;
	}

	return new MH();
});
