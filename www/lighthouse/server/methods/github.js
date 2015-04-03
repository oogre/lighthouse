"use strict";
/*global Async : false */
/*global Meteor : false */

var GitHub = Meteor.npmRequire("github");
 
var github = new GitHub({
	version: "3.0.0",
	timeout: 5000,
});

github.authenticate({
    type: "basic",
    username: "oogre",
    password: "223a7fcd17"
});

Meteor.methods({
	repocontent : function(path){
		return Async.runSync(function(done){
			github.repos.getContent({
				user:"oogre",
				repo:"lighthouse",
				path: (!path||path)==="root" ? "" : path
			},function(err,data){
				done(null,data) ;
			}); 
		});
	}
});