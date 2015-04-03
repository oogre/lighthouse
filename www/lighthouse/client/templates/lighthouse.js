"use strict";
/*global Meteor : false */
/*global Template : false */
/*global Session : false */

Template.list.helpers({
	content : function(path){
		path = path||"root";
		var content = Session.get("content")||{};
		if(content[path]){
			return content[path];
		}
		else{
			Meteor.call("repocontent", path, function(e,r){
				content[path] = r;
				Session.set("content", content);
			});
		}
	}
});

Template.item.helpers({
	isDir : function(){
		return this.type === "dir";
	}
});

Template.item.events({
	"click li" : function(){
		var path = this.path;
		var content = Session.get("content")||{};
		if(content[path]){

		}
		else{
			Meteor.call("repocontent", path, function(e,r){
				content[path] = r;
				Session.set("content", content);
			});
		}
	}
});