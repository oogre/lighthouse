"use strict";
/*global Meteor : false */
/*global Template : false */
/*global Session : false */


Template.preview.helpers({
	currentFile : function(){
		return Session.get(Meteor.FILE);
	}
});
