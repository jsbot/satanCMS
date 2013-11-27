function DbWorker(shemaInstance){
	this.shema = shemaInstance;
}
DbWorker.prototype.find = function(cb){
	var query ={};
	(arguments.length>1) ?	query[arguments[1]]=1 : query = {}
	console.log("query:");
	console.log(query);
	this.shema.find(
		{},query
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
DbWorker.prototype.update = function(cb, query, updateData){
	this.shema.update(
		query
		,{$set: updateData}
		, function(error, result) {
			cb(result);
		});
}
DbWorker.prototype.save = function(obj){
	var item = new this.shema(obj);
	item.save(function(err) {
		if (err) console.log(err) ;
	});
}

exports.DbWorker = DbWorker;