"use strict";
/*global _ : false */
/*global Meteor : false */
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
				content[path] = _.filter(r.result, function(elem){
					return !elem.name.match(/^\./);
				});
				Session.set(Meteor.CONTENT, content);
			});
		}
		return [];
	}
});
