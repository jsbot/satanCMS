function DbWorker(shemaInstance){
	this.shema = shemaInstance;
}
DbWorker.prototype.find = function(cb){
	var query ={};
	(arguments.length>1) ?	query[arguments[1]]={$exists:true} : query = {}
	console.log("query:");
	console.log(query);
	this.shema.find(
		query
		, function(err, data) {
			cb(data);
		});
}
DbWorker.prototype.findOne = function(cb){
	(arguments.length>1) ?	query = arguments[1] : query = {}
	console.log("query:");
	console.log(query);

	this.shema.findOne(
		{},{query:1}
	, function(err, data) {
	cb(data);
});
}
DbWorker.prototype.update = function(cb){
    var query ={};
    (arguments.length>3) ?   query[arguments[2]]=arguments[3] : query = arguments[2]
    console.log("query:");
    console.log(query);

	this.shema.update(
		{_id:arguments[1]}
		,{$set:
            query
        }
		, function(error, result) {
			cb(error, result);
		});
}
DbWorker.prototype.save = function(obj){
	var item = new this.shema(obj);
	item.save(function(err) {
		if (err) console.log(err) ;
	});
}

exports.DbWorker = DbWorker;