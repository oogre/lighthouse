"use strict";
/*global _ : false */
/*global Meteor : false */
/*global Template : false */
/*global Session : false */

Template.item.helpers({
	isDir : function(){
		return this.type === "dir";
	},
	isOpen : function(){
		var path = Session.get(Meteor.DIR);
		var file = Session.get(Meteor.FILE);
		return (_.isString(path) && path.indexOf(this.path)>-1) || (_.isObject(file) && _.isString(file.path) && file.path.indexOf(this.path)>-1);
	},
	level : function(){
		var lvl = this.path.split("/").length - 1;
		var level = "";
		for(var i = 0; i < lvl ; i ++){
			level += "–";
		}
		return level;
	}
});

Template.item.events({
	"click li" : function(){
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