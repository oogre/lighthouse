"use strict";
/*global Meteor : false */
/*global Template : false */
/*global Session : false */


Template.list.helpers({
	githubContent : function(path){
		path = path||"root";

		var content = Session.get(Meteor.CONTENT)||{};

		if(content[path]){
			return content[path];
		}
		else{
			Meteor.call("repocontent", path, function(e,r){
				var content = Session.get(Meteor.CONTENT)||{};
				content[path] = r.result;
				Session.set(Meteor.CONTENT, content);
			});
		}
		return [];
	}
});
