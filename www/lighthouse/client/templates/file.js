"use strict";
/*global _ : false */
/*global hljs : false */
/*global Meteor : false */
/*global Template : false */
/*global Session : false */


Template.file.rendered = function(){
	hljs.configure({
		tabReplace: "  ",
		classPrefix: ""
	});
	hljs.initHighlighting();
};

Template.file.helpers({
	picture : function(){
		return _.isString(this.download_url) && this.download_url.toLowerCase().match(/\.jpg|\.jpeg|\.png|\.gif$/) && this.download_url;
	},
	data : function(){
		Meteor.call("getFile", this.download_url, function(e,r){
			Session.set(Meteor.FILE_CONTENT, r);
		});
		return Session.get(Meteor.FILE_CONTENT);
	}
});
