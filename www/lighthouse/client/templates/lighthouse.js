"use strict";
/*global _ : false */
/*global Meteor : false */
/*global Template : false */
/*global Session : false */


Meteor.CONTENT					= "content";
Session.setDefault(Meteor.CONTENT, false);

Meteor.DIR					= "dirOpen";
Session.setDefault(Meteor.DIR, false);

Meteor.FILE					= "fileOpen";
Session.setDefault(Meteor.OPEN, false);


Template.list.helpers({
	content : function(path){
		path = path||"root";

		var content = Session.get("content")||{};

		if(content[path]){
			return content[path];
		}
		else{
			Meteor.call("repocontent", path, function(e,r){
				var content = Session.get("content")||{};
				console.log(path);
				console.log(content);
				console.log("");
				content[path] = r.result;
				Session.set("content", content);
			});
		}
		return [];
	}
});
Template.preview.helpers({
	currentFile : function(){
		return Session.get(Meteor.FILE, this);
	}
});

Template.item.helpers({
	isOpenable : function(){
		var path = Session.get(Meteor.DIR);
		return this.type === "dir" && _.isString(path) && path.indexOf(this.path)>-1;
	}
});

Template.item.events({
	"click li" : function(event){
		if(this.type === "dir"){
			Session.set(Meteor.FILE, false);
			if(Session.equals(Meteor.DIR, this.path)){
				var path = Session.get(Meteor.DIR);
				path = path.split(new RegExp(this.name + "|"+ "/"+this.name, "g"))[0];
				Session.set(Meteor.DIR, path);
			}else{
				Session.set(Meteor.DIR, this.path);
			}
		}
		else{
			Session.set(Meteor.FILE, this);
		}
		return false;
	}
});