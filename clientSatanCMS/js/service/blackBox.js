// Filename: blackBox.js
define([
	"jquery",
	"service/pupsub"
], function ($, pupsub) {
	var blackBox = function () {
		if (arguments.callee.instance)
			return arguments.callee.instance;
		arguments.callee.instance = this;

		var topics = {},
			subUid = -1,
			rememberList = {},
			propose ={};

		this.getTopics = function () {
			return topics;
		}
		this.getRememberList = function () {
			return rememberList;
		}
		this.getPropositions = function () {
			return propose;
		}
		this.publish = function (topic, args) {

			if (!topics[topic]) {
				return false;
			}

			var subscribers = topics[topic],
				len = subscribers ? subscribers.length : 0;

			while (len--) {
				console.log(subscribers[len]);
				subscribers[len].func(topic, args);
			}

			return this;
		};

		this.subscribe = function (topic, func) {

			if (!topics[topic]) {
				topics[topic] = [];
			}

			var token = ( ++subUid ).toString();

			topics[topic].push({
				token: token,
				func: func
			});
			return token;
		};
		this.remember = function (topic, d) {
			if (!rememberList[topic]) {
				rememberList[topic] = [];
			}
			topics[topic].push({
				data: d
			});
		};
		this.addProposition = function (topic, o, c) {
			if (!propose[topic]) {
				propose[topic] = [];
			}
			propose[topic].push({
				obj: o,
				callback: c
			});
		};

		this.unsubscribe = function (token) {
			for (var m in topics) {
				if (topics[m]) {
					for (var i = 0, j = topics[m].length; i < j; i++) {
						if (topics[m][i].token === token) {
							topics[m].splice(i, 1);
							return token;
						}
					}
				}
			}
			return this;
		};
	}

	blackBox.prototype.checkIfInTopics = function (list, newTopic) {
		var persist = false;
		var data = {};
		switch(list){
			case "topic" :{
				data = this.getTopics();
				break;
			}
			case "propose" :{
				data = this.getPropositions();
				break;
			}
			case "remember" :{
				data = this.getRememberList();
				break;
			}
		}
		for (var m in data) {
			if (m == newTopic) {
				return true;
			}
		}
		return persist;
	}

	blackBox.prototype.listen = function (topic, callback) {
		this.subscribe(topic, callback);
		if (this.checkIfInTopics("propose", topic)) {
			this.runPropose(topic, callback); // TODO: ADD REALIZATION FOR RUN PROPOSE !!!!!!!!!!!!
		}
	}

	blackBox.prototype.notify = function (topic, data) {
		if (this.checkIfInTopics("topic",topic)) {
			this.publish(topic, data);
		}else{
			this.remember(newTopic, data)
		}
	}
	blackBox.prototype.propose = function (topic, obj, callback) {
		if (!this.checkIfInTopics("topic", topic)) {
			this.addProposition(topic, obj, callback);
		}
	}
	blackBox.prototype.presentTopics = function () {
		return {"topics": this.getTopics(), "remebers": this.getRememberList(), "proposals": this.getPropositions()};
	}
	var BB = new blackBox();
	return BB;
});
